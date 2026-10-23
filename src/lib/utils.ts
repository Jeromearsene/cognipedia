import { DIFFICULTIES, FAMILIES } from "./constants";
import type { Difficulty, Family } from "./types";

/** Type guard for Family values. */
export const isFamily = (value: string): value is Family => FAMILIES.some((f) => f === value);

/** Type guard for Difficulty values. */
export const isDifficulty = (value: string): value is Difficulty =>
	DIFFICULTIES.some((d) => d === value);

/**
 * Locale-independent identifier of a bias: its content folder name (e.g. `anchoring`).
 * Entry IDs follow `<folder>/<locale>`, whereas the frontmatter `slug` is translated
 * (`ancrage` / `anchoring`), so only the folder is stable across languages.
 * Used as the key for scores and progress so a bias counts once whatever the language.
 */
export const getBiasId = (entry: { id: string }): string => entry.id.split("/")[0];

/** Returns a promise that resolves after `ms` milliseconds. */
export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
