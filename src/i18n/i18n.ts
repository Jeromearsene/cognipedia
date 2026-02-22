import en from "./en.json";
import fr from "./fr.json";

const locales = { fr, en } as const;

export type Locale = keyof typeof locales;
export type TranslationKey = keyof typeof fr;

const SUPPORTED_LOCALES: Locale[] = ["fr", "en"];
const DEFAULT_LOCALE: Locale = "fr";

/** Type guard: checks if a string is a supported locale. */
export const isLocale = (value: string): value is Locale =>
	SUPPORTED_LOCALES.includes(value as Locale);

/** Returns the translated string for a key, or the key itself as fallback. */
export const t = (locale: Locale, key: string): string =>
	(locales[locale] as Record<string, string>)?.[key] ?? key;

/** Extracts the locale from the first URL path segment. Defaults to `fr`. */
export const getLocaleFromUrl = (url: URL): Locale => {
	const segment = url.pathname.split("/")[1];
	return isLocale(segment) ? segment : DEFAULT_LOCALE;
};

/** Builds a localized path, e.g. `getLocalizedPath('en', '/about')` → `/en/about`. */
export const getLocalizedPath = (locale: Locale, path: string): string =>
	`/${locale}${path.startsWith("/") ? path : `/${path}`}`;
