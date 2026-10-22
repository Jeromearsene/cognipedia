export const prerender = true;

import type { APIRoute } from "astro";
import { SUPPORTED_LOCALES } from "@/i18n/i18n";
import { getBiasesForLocale } from "@/lib/biases";
import { urlEntry, wrapSitemap } from "@/lib/sitemap";
import { m } from "@/paraglide/messages";

/** Static pages with their slug message function (or null for root). */
const STATIC_PAGES: { slug: typeof m.slug_leaderboard | null }[] = [
	{ slug: null },
	{ slug: m.slug_leaderboard },
	{ slug: m.slug_about },
	{ slug: m.slug_profile },
];

export const GET: APIRoute = async () => {
	const site = import.meta.env.SITE;
	const entries: string[] = [];

	// Static pages
	for (const page of STATIC_PAGES) {
		const paths: Record<string, string> = {};
		for (const locale of SUPPORTED_LOCALES) {
			const slug = page.slug ? page.slug({}, { locale }) : "";
			paths[locale] = `${site}/${locale}/${slug}`;
		}
		entries.push(urlEntry(paths));
	}

	// Bias pages — group by folder to pair FR/EN entries
	const allBiases = await Promise.all(
		SUPPORTED_LOCALES.map(async (locale) => {
			const { localized } = await getBiasesForLocale(locale);
			return { locale, biases: localized };
		}),
	);

	const biasByFolder = new Map<string, Record<string, string>>();
	for (const { locale, biases } of allBiases) {
		const biasSlug = m.slug_bias({}, { locale });
		for (const bias of biases) {
			const folder = bias.filePath?.replace(`/${locale}.md`, "").split("/").pop() ?? "";
			if (!biasByFolder.has(folder)) biasByFolder.set(folder, {});
			const paths = biasByFolder.get(folder);
			if (paths) {
				paths[locale] = `${site}/${locale}/${biasSlug}/${bias.data.slug}`;
			}
		}
	}

	for (const paths of biasByFolder.values()) {
		entries.push(urlEntry(paths));
	}

	return new Response(wrapSitemap(entries), {
		headers: { "Content-Type": "application/xml" },
	});
};
