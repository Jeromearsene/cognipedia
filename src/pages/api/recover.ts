import type { APIRoute } from "astro";
import { getD1 } from "@/lib/d1";
import { recoverBodySchema } from "@/lib/schemas";

/** POST /api/recover — Look up a user account by their recovery code. */
export const POST: APIRoute = async (context) => {
	const jsonHeaders = { "Content-Type": "application/json" };

	try {
		const result = recoverBodySchema.safeParse(await context.request.json());

		if (!result.success) {
			return new Response(JSON.stringify({ error: result.error.issues }), {
				status: 400,
				headers: jsonHeaders,
			});
		}

		const { recoveryCode } = result.data;
		const db = getD1();

		const user = await db
			.prepare("SELECT uuid, pseudo FROM users WHERE recovery_code = ?")
			.bind(recoveryCode)
			.first();

		if (!user) {
			return new Response(JSON.stringify({ error: "No account found for this recovery code" }), {
				status: 404,
				headers: jsonHeaders,
			});
		}

		return new Response(JSON.stringify({ uuid: user.uuid, pseudo: user.pseudo }), {
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
