import type { APIRoute } from "astro";
import { getD1 } from "../../lib/d1";

export const GET: APIRoute = async (context) => {
	const jsonHeaders = { "Content-Type": "application/json" };

	try {
		const url = new URL(context.request.url);
		const limitParam = url.searchParams.get("limit");
		let limit = limitParam ? Number.parseInt(limitParam, 10) : 10;

		if (Number.isNaN(limit) || limit < 1) {
			limit = 10;
		}
		if (limit > 100) {
			limit = 100;
		}

		const db = getD1(context.locals);

		const { results } = await db
			.prepare(
				`SELECT u.pseudo, s.user_uuid, SUM(s.total_score) AS total
				FROM scores s
				JOIN users u ON u.uuid = s.user_uuid
				GROUP BY s.user_uuid
				ORDER BY total DESC
				LIMIT ?`,
			)
			.bind(limit)
			.all();

		return new Response(JSON.stringify(results), {
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
