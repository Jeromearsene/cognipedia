import { describe, expect, it } from "vitest";
import { computeQuizScore, computeSituationScore, computeTotalScore } from "./scoring";

describe("computeQuizScore", () => {
	it("returns correct count and total", () => {
		const answers = [0, 1, 0];
		const correctAnswers = [0, 0, 0];
		expect(computeQuizScore(answers, correctAnswers)).toEqual({
			correct: 2,
			total: 3,
		});
	});

	it("returns 0 for all wrong", () => {
		expect(computeQuizScore([1, 1], [0, 0])).toEqual({
			correct: 0,
			total: 2,
		});
	});

	it("handles empty quiz", () => {
		expect(computeQuizScore([], [])).toEqual({ correct: 0, total: 0 });
	});
});

describe("computeSituationScore", () => {
	it("returns 1 for unbiased choice", () => {
		expect(computeSituationScore(false)).toBe(1);
	});

	it("returns 0 for biased choice", () => {
		expect(computeSituationScore(true)).toBe(0);
	});
});

describe("computeTotalScore", () => {
	it("sums situation + quiz points", () => {
		expect(computeTotalScore({ situationScore: 1, quizCorrect: 2, quizTotal: 3 })).toBe(3);
	});

	it("handles zero scores", () => {
		expect(computeTotalScore({ situationScore: 0, quizCorrect: 0, quizTotal: 2 })).toBe(0);
	});
});
