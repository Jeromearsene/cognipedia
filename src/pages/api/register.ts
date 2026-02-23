import type { APIRoute } from "astro";
import { getD1 } from "@/lib/d1";
import { registerBodySchema } from "@/lib/schemas";

/** POST /api/register — Create a new anonymous user with a pseudo and recovery code. */
export const POST: APIRoute = async (context) => {
	const jsonHeaders = { "Content-Type": "application/json" };

	try {
		const result = registerBodySchema.safeParse(await context.request.json());

		if (!result.success) {
			return new Response(JSON.stringify({ error: result.error.flatten().fieldErrors }), {
				status: 400,
				headers: jsonHeaders,
			});
		}

		const { uuid, pseudo, recoveryCode } = result.data;
		const db = getD1(context.locals);

		await db
			.prepare("INSERT INTO users (uuid, pseudo, recovery_code) VALUES (?, ?, ?)")
			.bind(uuid, pseudo, recoveryCode)
			.run();

		return new Response(JSON.stringify({ uuid, pseudo, recoveryCode }), {
			status: 201,
			headers: jsonHeaders,
		});
	} catch (err: unknown) {
		if (err instanceof Error && err.message.includes("UNIQUE constraint failed")) {
			return new Response(JSON.stringify({ error: "User already exists" }), {
				status: 409,
				headers: jsonHeaders,
			});
		}
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: jsonHeaders,
		});
	}
};
