import { getCollection } from "astro:content";
import type { Locale } from "@/i18n/i18n";
import { m } from "@/paraglide/messages";
import { getBiasId } from "./utils";

/** Returns all bias entries for a given locale, filtered by filePath convention (`{locale}.md`). */
export const getBiasesForLocale = async (locale: Locale) => {
	const allBiases = await getCollection("biases");
	return {
		all: allBiases,
		localized: allBiases.filter((bias) => bias.filePath?.endsWith(`${locale}.md`)),
	};
};

/** Builds a bias id → { title, href } map for linking biases (e.g. in profile scores). */
export const buildBiasMap = async (locale: Locale) => {
	const { localized } = await getBiasesForLocale(locale);
	return Object.fromEntries(
		localized.map((b) => [
			getBiasId(b),
			{ title: b.data.title, href: `/${locale}/${m.slug_bias()}/${b.data.slug}` },
		]),
	);
};
