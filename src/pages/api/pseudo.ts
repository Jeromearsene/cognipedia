import type { APIRoute } from "astro";
import { getD1 } from "@/lib/d1";
import { pseudoBodySchema } from "@/lib/schemas";

/** PATCH /api/pseudo — Update a user's pseudo. */
export const PATCH: APIRoute = async (context) => {
	const jsonHeaders = { "Content-Type": "application/json" };

	try {
		const result = pseudoBodySchema.safeParse(await context.request.json());

		if (!result.success) {
			return new Response(JSON.stringify({ error: result.error.issues }), {
				status: 400,
				headers: jsonHeaders,
			});
		}

		const { uuid, pseudo } = result.data;
		const db = getD1();

		const { meta } = await db
			.prepare("UPDATE users SET pseudo = ? WHERE uuid = ?")
			.bind(pseudo, uuid)
			.run();

		if (meta.changes === 0) {
			return new Response(JSON.stringify({ error: "User not found" }), {
				status: 404,
				headers: jsonHeaders,
			});
		}

		return new Response(JSON.stringify({ uuid, pseudo }), {
			status: 200,
			headers: jsonHeaders,
		});
	} catch (_err) {
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: jsonHeaders,
		});
	}
};
