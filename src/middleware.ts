import { defineMiddleware } from "astro:middleware";
import { getLocaleFromAcceptLanguage, getLocaleFromUrl, isLocale } from "@/i18n/i18n";

/**
 * Populates `Astro.locals` with locale and current path.
 * Redirects to the browser's preferred locale if the URL lang segment is invalid.
 */
export const onRequest = defineMiddleware((context, next) => {
	const { url, request } = context;
	const langSegment = url.pathname.split("/")[1];

	// Skip locale validation for API routes and static assets
	if (langSegment === "api" || url.pathname === "/") {
		context.locals.locale = getLocaleFromUrl(url);
		context.locals.currentPath = url.pathname;
		return next();
	}

	// Redirect invalid locale prefixes to browser-preferred locale
	if (!isLocale(langSegment)) {
		const fallback = getLocaleFromAcceptLanguage(request.headers.get("accept-language"));
		return context.redirect(`/${fallback}/`);
	}

	context.locals.locale = langSegment;
	context.locals.currentPath = url.pathname;
	return next();
});
