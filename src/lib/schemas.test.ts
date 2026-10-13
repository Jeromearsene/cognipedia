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
	const question = (level: string, overrides = {}) => ({
		question: `A ${level} question?`,
		level,
		choices: ["A", "B", "C"],
		correct: 0,
		explanation: "Because...",
		...overrides,
	});

	const validQuiz = {
		questions: [question("easy"), question("medium"), question("hard")],
	};

	it("validates a quiz with one question per level, from easy to hard", () => {
		expect(quizSchema.safeParse(validQuiz).success).toBe(true);
	});

	it("rejects a quiz with no questions", () => {
		expect(quizSchema.safeParse({ questions: [] }).success).toBe(false);
	});

	it("rejects a quiz with fewer than 3 questions", () => {
		const result = quizSchema.safeParse({ questions: [question("easy"), question("medium")] });
		expect(result.success).toBe(false);
	});

	it("rejects a quiz with more than 3 questions", () => {
		const result = quizSchema.safeParse({
			questions: [question("easy"), question("medium"), question("hard"), question("hard")],
		});
		expect(result.success).toBe(false);
	});

	it("rejects questions that are not ordered from easy to hard", () => {
		const result = quizSchema.safeParse({
			questions: [question("medium"), question("easy"), question("hard")],
		});
		expect(result.success).toBe(false);
	});

	it("rejects a quiz that repeats a level", () => {
		const result = quizSchema.safeParse({
			questions: [question("easy"), question("easy"), question("hard")],
		});
		expect(result.success).toBe(false);
	});

	it("rejects a question without a level", () => {
		const { level, ...withoutLevel } = question("easy");
		const result = quizSchema.safeParse({
			questions: [withoutLevel, question("medium"), question("hard")],
		});
		expect(result.success).toBe(false);
	});

	it("rejects an unknown level", () => {
		const result = quizSchema.safeParse({
			questions: [question("trivial"), question("medium"), question("hard")],
		});
		expect(result.success).toBe(false);
	});

	it("rejects a question with fewer than 2 choices", () => {
		const result = quizSchema.safeParse({
			questions: [question("easy", { choices: ["A"] }), question("medium"), question("hard")],
		});
		expect(result.success).toBe(false);
	});
});
