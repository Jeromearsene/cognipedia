import type { Difficulty, Family } from "./constants";

/**
 * Inline styles for family/difficulty badges, built from the CSS custom
 * properties defined in `src/styles/families.css`. Centralized here so
 * `BiasCard.svelte`, `BiasGrid.svelte`, `BiasPage.astro`, and the homepage
 * all render the same gradients and colors, in both themes.
 */

/** Gradient pill background + contrast text for a bias family badge. */
export const familyBadgeStyle = (family: Family): string =>
	`background: linear-gradient(135deg, var(--family-${family}-1), var(--family-${family}-2)); color: var(--family-contrast)`;

/** Gradient dot used next to a family name (grouped section headers, filters). */
export const familyDotStyle = (family: Family): string =>
	`background: linear-gradient(135deg, var(--family-${family}-1), var(--family-${family}-2))`;

/** Soft background + colored text for a difficulty badge. */
export const difficultyBadgeStyle = (difficulty: Difficulty): string =>
	`background-color: var(--difficulty-${difficulty}-bg); color: var(--difficulty-${difficulty}-text)`;

/** Status dot used inside a difficulty badge. */
export const difficultyDotStyle = (difficulty: Difficulty): string =>
	`background-color: var(--difficulty-${difficulty}-dot)`;
