import type { APIRoute } from "astro";
import { getD1 } from "@/lib/d1";
import { scoreBodySchema } from "@/lib/schemas";
import { computeTotalScore } from "@/lib/scoring";

/** POST /api/scores — Save or update a user's score for a given bias (upsert). */
export const POST: APIRoute = async (context) => {
	const jsonHeaders = { "Content-Type": "application/json" };

	try {
		const result = scoreBodySchema.safeParse(await context.request.json());

		if (!result.success) {
			return new Response(JSON.stringify({ error: result.error.flatten().fieldErrors }), {
				status: 400,
				headers: jsonHeaders,
			});
		}

		const { userUuid, biasSlug, situationScore, quizCorrect, quizTotal } = result.data;
		const totalScore = computeTotalScore({ situationScore, quizCorrect, quizTotal });
		const db = getD1(context.locals);

		await db
			.prepare(
				`INSERT INTO scores (user_uuid, bias_slug, situation_score, quiz_correct, quiz_total, total_score)
				VALUES (?, ?, ?, ?, ?, ?)
				ON CONFLICT(user_uuid, bias_slug) DO UPDATE SET
					situation_score = excluded.situation_score,
					quiz_correct = excluded.quiz_correct,
					quiz_total = excluded.quiz_total,
					total_score = excluded.total_score,
					completed_at = datetime('now')`,
			)
			.bind(userUuid, biasSlug, situationScore, quizCorrect, quizTotal, totalScore)
			.run();

		return new Response(
			JSON.stringify({ userUuid, biasSlug, situationScore, quizCorrect, quizTotal, totalScore }),
			{ status: 200, headers: jsonHeaders },
		);
	} catch (_err) {
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: jsonHeaders,
		});
	}
};
