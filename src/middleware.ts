import { defineMiddleware } from "astro:middleware";

/**
 * Production holding page: redirects all routes to "/" except
 * the root itself and static assets.
 */
export const onRequest = defineMiddleware((context, next) => {
	if (context.url.pathname === "/") {
		return next();
	}
	return context.redirect("/");
});
