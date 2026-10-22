/** Generates a sitemap <url> entry with hreflang alternates. */
export const urlEntry = (paths: Record<string, string>): string => {
	const locales = Object.keys(paths);
	const primaryUrl = paths[locales[0]];
	const hreflangs = locales
		.map(
			(locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${paths[locale]}" />`,
		)
		.join("\n");

	return `  <url>
    <loc>${primaryUrl}</loc>
${hreflangs}
  </url>`;
};

/** Wraps url entries in a sitemap XML document. */
export const wrapSitemap = (entries: string[]): string =>
	`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;
