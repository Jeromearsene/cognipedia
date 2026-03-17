/**
 * Extracts the D1 database binding from Astro's locals (via Cloudflare runtime).
 * Usage in API routes: `const db = getD1(context.locals);`
 */
export const getD1 = (locals: App.Locals): D1Database => {
	const runtime =
		"runtime" in locals ? (locals.runtime as { env?: { DB?: D1Database } }) : undefined;
	if (!runtime?.env?.DB) {
		throw new Error("D1 database binding not found. Is the Cloudflare runtime available?");
	}
	return runtime.env.DB;
};
