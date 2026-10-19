export const FAMILIES = [
	"too-much-information",
	"not-enough-meaning",
	"need-to-act-fast",
	"what-to-remember",
] as const;

export type Family = (typeof FAMILIES)[number];

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

/**
 * Level of each quiz question, in the order the questions must appear.
 * Every quiz has exactly one question per level (so `QUIZ_LEVELS.length`
 * is also the number of questions): it starts easy and ends hard.
 */
export const QUIZ_LEVELS = DIFFICULTIES;

/** Serializable bias card data, shared between BiasCard and BiasGrid components. */
export interface BiasCardData {
	/** Bias slug for status tracking (seen/completed). */
	slug: string;
	/** URL to the bias page. */
	href: string;
	/** Display title of the bias. */
	title: string;
	/** Family key (e.g. "too-much-information"). */
	family: Family;
	/** Translated family label. */
	familyLabel: string;
	/** Difficulty key (e.g. "easy", "medium", "hard"). */
	difficulty: Difficulty;
	/** Translated difficulty label. */
	difficultyLabel: string;
	/** Accessible name of the "seen" status icon. */
	seenLabel: string;
	/** Accessible name of the "completed" status icon. */
	completedLabel: string;
}
