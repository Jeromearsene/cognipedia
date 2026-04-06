import { getCollection } from "astro:content";
import type { Locale } from "@/i18n/i18n";
import { m } from "@/paraglide/messages";

/** Returns all bias entries for a given locale, filtered by filePath convention (`{locale}.md`). */
export const getBiasesForLocale = async (locale: Locale) => {
	const allBiases = await getCollection("biases");
	return {
		all: allBiases,
		localized: allBiases.filter((bias) => bias.filePath?.endsWith(`${locale}.md`)),
	};
};

/** Builds a slug → { title, href } map for linking biases (e.g. in profile scores). */
export const buildBiasMap = async (locale: Locale) => {
	const { localized } = await getBiasesForLocale(locale);
	return Object.fromEntries(
		localized.map((b) => [
			b.data.slug,
			{ title: b.data.title, href: `/${locale}/${m.slug_bias()}/${b.data.slug}` },
		]),
	);
};
