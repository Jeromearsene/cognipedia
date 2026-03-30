import { DIFFICULTIES, FAMILIES } from "./constants";
import type { Difficulty, Family } from "./types";

/** Type guard for Family values. */
export const isFamily = (value: string): value is Family => FAMILIES.some((f) => f === value);

/** Type guard for Difficulty values. */
export const isDifficulty = (value: string): value is Difficulty =>
	DIFFICULTIES.some((d) => d === value);

/** Returns a promise that resolves after `ms` milliseconds. */
export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
