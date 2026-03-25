import { env } from "cloudflare:workers";

/** Returns the D1 database binding from Cloudflare Workers environment. */
export const getD1 = (): D1Database => {
	if (!env.DB) {
		throw new Error("D1 database binding 'DB' not found. Is wrangler configured?");
	}
	return env.DB;
};
