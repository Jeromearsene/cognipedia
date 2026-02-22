import type { APIRoute } from "astro";
import { getD1 } from "@/lib/d1";
import { isValidRecoveryCode } from "@/lib/identity";

/** POST /api/recover — Look up a user account by their recovery code. */
export const POST: APIRoute = async (context) => {
	const jsonHeaders = { "Content-Type": "application/json" };

	try {
		const body = await context.request.json();
		const { recoveryCode } = body;

		if (!recoveryCode || !isValidRecoveryCode(recoveryCode)) {
			return new Response(JSON.stringify({ error: "Missing or invalid recovery code" }), {
				status: 400,
				headers: jsonHeaders,
			});
		}

		const db = getD1(context.locals);

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
