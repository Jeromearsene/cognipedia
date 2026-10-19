import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { QUIZ_LEVELS } from "@/lib/constants";
import { getAllBiasFiles } from "./bias-content-utils";

interface RawQuestion {
	level: string | undefined;
	choicesCount: number;
	correct: number;
}

/**
 * Reads the quiz of a bias file straight from its frontmatter. The format is
 * regular enough to avoid pulling
 * a YAML parser into the test dependencies.
 */
const readQuiz = (content: string): RawQuestion[] => {
	const quiz = content.match(/^quiz:\n([\s\S]*?)^---$/m)?.[1] ?? "";
	return quiz
		.split(/^ {4}- question:/m)
		.slice(1)
		.map((block) => ({
			level: block.match(/^ {6}level: (\S+)$/m)?.[1],
			choicesCount: (block.match(/^ {8}- /gm) ?? []).length,
			correct: Number(block.match(/^ {6}correct: (\d+)$/m)?.[1]),
		}));
};

const biasFiles = getAllBiasFiles();

describe("bias quiz rules", () => {
	for (const { relativePath, filePath } of biasFiles) {
		const questions = readQuiz(readFileSync(filePath, "utf-8"));

		it(`${relativePath} — has exactly ${QUIZ_LEVELS.length} questions`, () => {
			expect(
				questions,
				`${relativePath} must have ${QUIZ_LEVELS.length} quiz questions`,
			).toHaveLength(QUIZ_LEVELS.length);
		});

		it(`${relativePath} — questions go ${QUIZ_LEVELS.join(" → ")}`, () => {
			expect(
				questions.map((q) => q.level),
				`Quiz levels of ${relativePath} must be ordered ${QUIZ_LEVELS.join(" → ")}`,
			).toEqual([...QUIZ_LEVELS]);
		});

		it(`${relativePath} — every correct answer points to a choice`, () => {
			for (const [i, q] of questions.entries()) {
				expect(
					q.correct,
					`Question ${i + 1} of ${relativePath}: "correct" is out of range`,
				).toBeLessThan(q.choicesCount);
			}
		});
	}
});

describe("bias quiz inter-language coherence", () => {
	const folders = [...new Set(biasFiles.map((f) => f.relativePath.split("/")[0]))];

	for (const folder of folders) {
		it(`${folder}/ — all locales share the same quiz structure`, () => {
			const [reference, ...others] = biasFiles
				.filter((f) => f.relativePath.startsWith(`${folder}/`))
				.map((f) => ({
					file: f.relativePath,
					questions: readQuiz(readFileSync(f.filePath, "utf-8")),
				}));

			for (const other of others) {
				expect(
					other.questions,
					`${other.file} quiz differs from ${reference.file} (levels, number of choices, correct answer)`,
				).toEqual(reference.questions);
			}
		});
	}
});
