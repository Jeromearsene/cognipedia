export const FAMILIES = [
	"too-much-information",
	"not-enough-meaning",
	"need-to-act-fast",
	"what-to-remember",
] as const;

export type Family = (typeof FAMILIES)[number];

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

/** CSS classes for family background colors (defined in families.css). */
export const FAMILY_BG_CLASSES: Record<Family, string> = {
	"too-much-information": "bg-family-too-much-information",
	"not-enough-meaning": "bg-family-not-enough-meaning",
	"need-to-act-fast": "bg-family-need-to-act-fast",
	"what-to-remember": "bg-family-what-to-remember",
};

/** CSS classes for family border colors (defined in families.css). */
export const FAMILY_BORDER_CLASSES: Record<Family, string> = {
	"too-much-information": "border-family-too-much-information",
	"not-enough-meaning": "border-family-not-enough-meaning",
	"need-to-act-fast": "border-family-need-to-act-fast",
	"what-to-remember": "border-family-what-to-remember",
};

/** Tailwind classes for difficulty badge colors. */
export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
	easy: "bg-green-100 text-green-800",
	medium: "bg-orange-100 text-orange-800",
	hard: "bg-red-100 text-red-800",
};
