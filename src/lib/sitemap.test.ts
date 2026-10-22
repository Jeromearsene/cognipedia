import { describe, expect, it } from "vitest";
import { urlEntry, wrapSitemap } from "./sitemap";

describe("urlEntry", () => {
	it("generates a url entry with hreflang alternates", () => {
		const paths = {
			fr: "https://example.com/fr/page",
			en: "https://example.com/en/page",
		};
		const result = urlEntry(paths);

		expect(result).toContain("<loc>https://example.com/fr/page</loc>");
		expect(result).toContain('hreflang="fr" href="https://example.com/fr/page"');
		expect(result).toContain('hreflang="en" href="https://example.com/en/page"');
	});

	it("uses the first locale as primary URL", () => {
		const paths = {
			en: "https://example.com/en/",
			fr: "https://example.com/fr/",
		};
		const result = urlEntry(paths);

		expect(result).toContain("<loc>https://example.com/en/</loc>");
	});

	it("handles a single locale", () => {
		const paths = { fr: "https://example.com/fr/only" };
		const result = urlEntry(paths);

		expect(result).toContain("<loc>https://example.com/fr/only</loc>");
		expect(result).toContain('hreflang="fr"');
		expect(result).not.toContain('hreflang="en"');
	});
});

describe("wrapSitemap", () => {
	it("wraps entries in a valid XML sitemap", () => {
		const entries = ["  <url><loc>https://example.com</loc></url>"];
		const result = wrapSitemap(entries);

		expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
		expect(result).toContain("xmlns:xhtml");
		expect(result).toContain("<urlset");
		expect(result).toContain("</urlset>");
		expect(result).toContain("<loc>https://example.com</loc>");
	});

	it("joins multiple entries", () => {
		const entries = [
			"  <url><loc>https://a.com</loc></url>",
			"  <url><loc>https://b.com</loc></url>",
		];
		const result = wrapSitemap(entries);

		expect(result).toContain("https://a.com");
		expect(result).toContain("https://b.com");
	});
});
