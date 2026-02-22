import type { APIRoute } from "astro";
import { getD1 } from "@/lib/d1";
import { computeTotalScore } from "@/lib/scoring";

export const POST: APIRoute = async (context) => {
	const jsonHeaders = { "Content-Type": "application/json" };

	try {
		const body = await context.request.json();
		const { userUuid, biasSlug, situationScore, quizCorrect, quizTotal } = body;

		if (!userUuid || typeof userUuid !== "string") {
			return new Response(JSON.stringify({ error: "Missing or invalid userUuid" }), {
				status: 400,
				headers: jsonHeaders,
			});
		}

		if (!biasSlug || typeof biasSlug !== "string") {
			return new Response(JSON.stringify({ error: "Missing or invalid biasSlug" }), {
				status: 400,
				headers: jsonHeaders,
			});
		}

		if (
			typeof situationScore !== "number" ||
			typeof quizCorrect !== "number" ||
			typeof quizTotal !== "number"
		) {
			return new Response(
				JSON.stringify({ error: "situationScore, quizCorrect, and quizTotal must be numbers" }),
				{ status: 400, headers: jsonHeaders },
			);
		}

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
