import { describe, expect, it } from "vitest";
import { biasSchema, quizSchema, situationSchema } from "./schemas";

describe("biasSchema", () => {
	const validFrontmatter = {
		slug: "biais-ancrage",
		title: "Biais d'ancrage",
		originalName: "Anchoring bias",
		family: "too-much-information",
		tags: ["decision", "estimation"],
		difficulty: "medium",
		sources: {
			wikipedia: "https://fr.wikipedia.org/wiki/Biais_d%27ancrage",
		},
		relatedBiases: ["confirmation-bias"],
	};

	it("validates correct frontmatter", () => {
		const result = biasSchema.safeParse(validFrontmatter);
		expect(result.success).toBe(true);
	});

	it("rejects missing slug", () => {
		const { slug, ...rest } = validFrontmatter;
		const result = biasSchema.safeParse(rest);
		expect(result.success).toBe(false);
	});

	it("rejects invalid family", () => {
		const result = biasSchema.safeParse({ ...validFrontmatter, family: "unknown" });
		expect(result.success).toBe(false);
	});

	it("rejects invalid difficulty", () => {
		const result = biasSchema.safeParse({ ...validFrontmatter, difficulty: "extreme" });
		expect(result.success).toBe(false);
	});

	it("accepts optional papers and videos", () => {
		const result = biasSchema.safeParse({
			...validFrontmatter,
			sources: {
				...validFrontmatter.sources,
				papers: [{ title: "Tversky 1974", urls: [{ label: "DOI", url: "https://doi.org/xxx" }] }],
				videos: [{ title: "Video", url: "https://youtube.com/xxx", lang: "fr" }],
			},
		});
		expect(result.success).toBe(true);
	});
});

describe("situationSchema", () => {
	it("validates a choice situation", () => {
		const result = situationSchema.safeParse({
			type: "choice",
			scenario: "A scenario...",
			choices: [
				{ label: "Option A", bias: true },
				{ label: "Option B", bias: false },
			],
			reveal: "You fell for it!",
		});
		expect(result.success).toBe(true);
	});

	it("rejects situation with no choices", () => {
		const result = situationSchema.safeParse({
			type: "choice",
			scenario: "A scenario...",
			choices: [],
			reveal: "Reveal",
		});
		expect(result.success).toBe(false);
	});
});

describe("quizSchema", () => {
	it("validates a quiz with questions", () => {
		const result = quizSchema.safeParse({
			questions: [
				{
					question: "What is anchoring?",
					choices: ["A", "B", "C"],
					correct: 0,
					explanation: "Because...",
				},
			],
		});
		expect(result.success).toBe(true);
	});

	it("rejects quiz with no questions", () => {
		const result = quizSchema.safeParse({ questions: [] });
		expect(result.success).toBe(false);
	});

	it("rejects question with fewer than 2 choices", () => {
		const result = quizSchema.safeParse({
			questions: [{ question: "Q?", choices: ["A"], correct: 0, explanation: "E" }],
		});
		expect(result.success).toBe(false);
	});
});
