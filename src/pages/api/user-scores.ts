import type { APIRoute } from "astro";
import { getD1 } from "@/lib/d1";

/** GET /api/user-scores?user=<uuid> — Return a user's scores per bias + aggregated total. */
export const GET: APIRoute = async (context) => {
	const jsonHeaders = { "Content-Type": "application/json" };

	try {
		const url = new URL(context.request.url);
		const userUuid = url.searchParams.get("user");

		if (!userUuid) {
			return new Response(JSON.stringify({ error: "Missing 'user' query parameter" }), {
				status: 400,
				headers: jsonHeaders,
			});
		}

		const db = getD1();

		const { results: scores } = await db
			.prepare(
				`SELECT bias_slug, situation_score, quiz_correct, quiz_total, total_score, completed_at
				FROM scores
				WHERE user_uuid = ?
				ORDER BY completed_at DESC`,
			)
			.bind(userUuid)
			.all();

		const totalScore = scores.reduce((sum, s) => sum + Number(s.total_score), 0);

		return new Response(JSON.stringify({ scores, totalScore, biasCount: scores.length }), {
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
