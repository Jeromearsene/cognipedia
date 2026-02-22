import type { Quiz, Situation } from "./schemas";
import { quizSchema, situationSchema } from "./schemas";

/** Matches a fenced ```json code block and captures its content. */
const JSON_BLOCK_RE = /```json\s*\n([\s\S]*?)\n```/;

/**
 * Extracts and validates the Situation JSON from a markdown body.
 * Looks for a ```json block following the `## Situation` heading.
 */
export const parseSituation = (markdown: string): Situation | null => {
	const sectionMatch = markdown.match(/## Situation\s*\n([\s\S]*?)(?=\n## |\n*$)/);
	if (!sectionMatch) return null;

	const jsonMatch = sectionMatch[1].match(JSON_BLOCK_RE);
	if (!jsonMatch) return null;

	const parsed = situationSchema.safeParse(JSON.parse(jsonMatch[1]));
	return parsed.success ? parsed.data : null;
};

/**
 * Extracts and validates the Quiz JSON from a markdown body.
 * Looks for a ```json block following the `## Quiz` heading.
 */
export const parseQuiz = (markdown: string): Quiz | null => {
	const sectionMatch = markdown.match(/## Quiz\s*\n([\s\S]*?)(?=\n## |\n*$)/);
	if (!sectionMatch) return null;

	const jsonMatch = sectionMatch[1].match(JSON_BLOCK_RE);
	if (!jsonMatch) return null;

	const parsed = quizSchema.safeParse(JSON.parse(jsonMatch[1]));
	return parsed.success ? parsed.data : null;
};
