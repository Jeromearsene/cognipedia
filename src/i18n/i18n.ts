import { m } from "@/paraglide/messages";

/**
 * Locale type and constants.
 * Translations live in `project.inlang/messages/` and are compiled to Paraglide functions.
 */
export type Locale = "fr" | "en";

/** All locales the site supports. */
export const SUPPORTED_LOCALES = ["fr", "en"] as const satisfies readonly Locale[];

/** Locale used when none can be detected. */
export const DEFAULT_LOCALE: Locale = "fr";

/** Type guard: checks if a string is a supported locale. */
export const isLocale = (value: string): value is Locale =>
	(SUPPORTED_LOCALES as readonly string[]).includes(value);

/** Extracts the locale from the first URL path segment. Defaults to `fr`. */
export const getLocaleFromUrl = (url: URL): Locale => {
	const segment = url.pathname.split("/")[1];
	return isLocale(segment) ? segment : DEFAULT_LOCALE;
};

/** Builds a localized path, e.g. `getLocalizedPath('en', '/about')` → `/en/about`. */
export const getLocalizedPath = (locale: Locale, path: string): string =>
	`/${locale}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Detects the preferred locale from an `Accept-Language` header.
 * Matches the first supported locale found in the header, falls back to DEFAULT_LOCALE.
 */
export const getLocaleFromAcceptLanguage = (header: string | null): Locale => {
	if (!header) return DEFAULT_LOCALE;
	const preferred = header
		.split(",")
		.map((part) => part.split(";")[0].trim().split("-")[0].toLowerCase());
	const match = preferred.find((lang) => isLocale(lang));
	return match ?? DEFAULT_LOCALE;
};

/** Stable key names for localized slugs, used for slug-to-slug redirects across locales. */
export type SlugKey = "leaderboard" | "about" | "profile" | "bias";

/** Maps each slug key to its Paraglide message function. */
const SLUG_MESSAGES: Record<SlugKey, typeof m.slug_leaderboard> = {
	leaderboard: m.slug_leaderboard,
	about: m.slug_about,
	profile: m.slug_profile,
	bias: m.slug_bias,
};

/** Returns the localized slug for a key and locale (e.g. "leaderboard" + "fr" → "classement"). */
export const getSlug = (key: SlugKey, locale: Locale): string => SLUG_MESSAGES[key]({}, { locale });

/**
 * Reverse map from any localized slug to its canonical key and owning locale.
 * E.g. "classement" → { key: "leaderboard", locale: "fr" }
 * Built once at module load, supports any number of locales.
 */
export const slugToLocaleMap = new Map<string, { key: SlugKey; locale: Locale }>();

for (const locale of SUPPORTED_LOCALES) {
	for (const key of Object.keys(SLUG_MESSAGES) as SlugKey[]) {
		const slug = getSlug(key, locale);
		slugToLocaleMap.set(slug, { key, locale });
	}
}

/**
 * Builds altLangHrefs for a page identified by its slug key.
 * Returns a record mapping each non-current locale to its localized URL.
 * E.g. buildAltLangHrefs("fr", "leaderboard") → { en: "/en/leaderboard" }
 */
export const buildAltLangHrefs = (
	currentLocale: Locale,
	slugKey: SlugKey,
): Record<string, string> =>
	Object.fromEntries(
		SUPPORTED_LOCALES.filter((l) => l !== currentLocale).map((l) => [
			l,
			`/${l}/${getSlug(slugKey, l)}`,
		]),
	);

/**
 * Validates a route `lang` param and returns the locale.
 * Returns `null` if the param is missing or not a supported locale,
 * along with a fallback redirect URL based on Accept-Language.
 */
export const validateLocaleParam = (
	lang: string | undefined,
	acceptLanguage: string | null,
): { locale: Locale } | { locale: null; redirectTo: string } => {
	if (lang && isLocale(lang)) return { locale: lang };
	const fallback = getLocaleFromAcceptLanguage(acceptLanguage);
	return { locale: null, redirectTo: `/${fallback}/` };
};
