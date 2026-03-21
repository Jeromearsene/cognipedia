import en from "./en.json";
import fr from "./fr.json";

/**
 * Translation dictionaries indexed by locale.
 * Values are `unknown` because some keys (e.g. `error.404.messages`) hold arrays, not strings.
 */
const locales = { fr, en } as const;

/** Supported locale code derived from the translation dictionaries. */
export type Locale = keyof typeof locales;

/** Union of all translation keys from the default (FR) dictionary. */
export type TranslationKey = keyof typeof fr;

/** All locales the site supports, derived from the `Locale` type. */
export const SUPPORTED_LOCALES = Object.keys(locales) as readonly Locale[];

/** Locale used when none can be detected. */
export const DEFAULT_LOCALE: Locale = "fr";

/** Type guard: checks if a string is a supported locale. */
export const isLocale = (value: string): value is Locale => Object.hasOwn(locales, value);

/**
 * Returns the translated value for `key`.
 * Falls back to the key itself when not found, so missing translations
 * are visible in the UI rather than silently blank.
 */
export const t = (locale: Locale, key: string): string => {
	const dict: Record<string, unknown> = locales[locale];
	const value = dict[key];
	if (typeof value === "string") return value;
	if (value === undefined) return key;
	throw new Error(
		`i18n key "${key}" is not a string (got ${typeof value}). Use tRaw() for non-string values.`,
	);
};

/** Returns the raw (untyped) value for `key`, useful for arrays or objects. */
export const tRaw = (locale: Locale, key: string): unknown => {
	const dict: Record<string, unknown> = locales[locale];
	return dict[key];
};

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
