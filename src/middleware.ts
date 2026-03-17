import { defineMiddleware } from "astro:middleware";
import { getLocaleFromUrl } from "@/i18n/i18n";

/**
 * Populates `Astro.locals` with locale and current path,
 * so components don't need these passed as props through the tree.
 */
export const onRequest = defineMiddleware((context, next) => {
	context.locals.locale = getLocaleFromUrl(context.url);
	context.locals.currentPath = context.url.pathname;
	return next();
});
