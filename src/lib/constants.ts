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
 * Tailwind utility classes for difficulty badge colors.
 * Static class strings (not dynamic) so Tailwind can detect them at build time.
 * Pastel background + dark text is kept in both modes: the light badges pop
 * nicely against the dark theme background without needing dark variants.
 */
export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
	easy: "bg-green-100 text-green-800",
	medium: "bg-orange-100 text-orange-800",
	hard: "bg-red-100 text-red-800",
};

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
}
