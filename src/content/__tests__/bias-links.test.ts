import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { delay } from "@/lib/utils";
import { extractUrls, getAllBiasFiles } from "./bias-content-utils";

/**
 * Domains that block programmatic access (anti-scraping) but work in browsers.
 * These return 403 on all programmatic requests, even with browser-like User-Agent.
 * Truly broken links on these domains return 404, not 403 — so we still detect real issues.
 */
const ALLOW_403_DOMAINS = ["doi.org", "jstor.org", "sagepub.com", "apa.org"];

const is403Whitelisted = (url: string): boolean => {
	try {
		const hostname = new URL(url).hostname;
		return ALLOW_403_DOMAINS.some((d) => hostname.endsWith(d));
	} catch {
		return false;
	}
};

/**
 * Checks that a URL is reachable.
 * Tries HEAD first, falls back to GET on 403/405 (some servers block HEAD).
 * Retries once on network error.
 */
const checkUrl = async (url: string): Promise<{ ok: boolean; status: number | string }> => {
	const headers = { "User-Agent": "Mozilla/5.0 (compatible; CognipediaLinkChecker/1.0)" };

	for (let attempt = 0; attempt < 2; attempt++) {
		try {
			const headResponse = await fetch(url, {
				method: "HEAD",
				redirect: "follow",
				signal: AbortSignal.timeout(10_000),
				headers,
			});

			if (headResponse.status === 403 || headResponse.status === 405) {
				const getResponse = await fetch(url, {
					method: "GET",
					redirect: "follow",
					signal: AbortSignal.timeout(10_000),
					headers,
				});
				return { ok: getResponse.ok, status: getResponse.status };
			}

			return { ok: headResponse.ok, status: headResponse.status };
		} catch (err) {
			console.warn(
				`[link-checker] Attempt ${attempt + 1} failed for ${url}:`,
				err instanceof Error ? err.message : err,
			);
			if (attempt === 1) {
				return { ok: false, status: err instanceof Error ? err.message : "unknown error" };
			}
			await delay(1000);
		}
	}
	return { ok: false, status: "unreachable" };
};

describe("bias content links", () => {
	const files = getAllBiasFiles();

	for (const { relativePath, filePath } of files) {
		const content = readFileSync(filePath, "utf-8");
		const urls = extractUrls(content);

		for (const url of urls) {
			it(`${relativePath} — ${url}`, { timeout: 30_000 }, async () => {
				await delay(500);
				const result = await checkUrl(url);
				const acceptable = result.ok || (result.status === 403 && is403Whitelisted(url));
				expect(acceptable, `${url} returned ${result.status}`).toBe(true);
			});
		}
	}
});
