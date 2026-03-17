import { getCollection } from "astro:content";
import type { Locale } from "@/i18n/i18n";

/** Returns all bias entries for a given locale, filtered by filePath convention (`{locale}.md`). */
export const getBiasesForLocale = async (locale: Locale) => {
	const allBiases = await getCollection("biases");
	return {
		all: allBiases,
		localized: allBiases.filter((bias) => bias.filePath?.endsWith(`${locale}.md`)),
	};
};
