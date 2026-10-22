import { defineMiddleware } from "astro:middleware";
import {
	getLocaleFromAcceptLanguage,
	getLocaleFromUrl,
	getSlug,
	isLocale,
	slugToLocaleMap,
} from "@/i18n/i18n";
import { setLocale } from "@/paraglide/runtime";

/**
 * Populates `Astro.locals` with locale, current path, and registration status.
 * Handles two types of redirects:
 * 1. Invalid locale prefix → redirect to browser-preferred locale
 * 2. Wrong locale slug → redirect to the correct slug for the current locale
 *    (e.g. /fr/leaderboard → /fr/classement, /en/biais/ancrage → /en/bias/ancrage)
 */
export const onRequest = defineMiddleware((context, next) => {
	const { url, request } = context;
	const langSegment = url.pathname.split("/")[1];

	// Skip locale validation for API routes, sitemap, and root
	if (langSegment === "api" || langSegment === "sitemap.xml" || url.pathname === "/") {
		context.locals.locale = getLocaleFromUrl(url);
		context.locals.currentPath = url.pathname;
		setLocale(context.locals.locale, { reload: false });
		return next();
	}

	// Redirect invalid locale prefixes to browser-preferred locale
	if (!isLocale(langSegment)) {
		const fallback = getLocaleFromAcceptLanguage(request.headers.get("accept-language"));
		return context.redirect(`/${fallback}/`);
	}

	const locale = langSegment;
	context.locals.locale = locale;
	context.locals.currentPath = url.pathname;
	setLocale(locale, { reload: false });

	// Redirect localized slugs that don't match the current locale.
	// E.g. /fr/leaderboard → /fr/classement, /en/biais/ancrage → /en/bias/ancrage
	const segments = url.pathname.split("/").filter(Boolean);
	const pageSlug = segments[1];

	if (pageSlug) {
		const match = slugToLocaleMap.get(pageSlug);

		if (match && match.locale !== locale) {
			// This slug belongs to another locale — redirect to the correct one
			const correctSlug = getSlug(match.key, locale);
			const rest = segments.slice(2).join("/");
			const redirectPath = rest ? `/${locale}/${correctSlug}/${rest}` : `/${locale}/${correctSlug}`;
			return context.redirect(redirectPath);
		}
	}

	return next();
});
