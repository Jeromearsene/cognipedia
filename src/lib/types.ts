import type { z } from "astro/zod";
import type { DIFFICULTIES, FAMILIES } from "./constants";
import type { scoreEntrySchema } from "./schemas";

export type Family = (typeof FAMILIES)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];

/** A user's score entry for a single bias, derived from the zod schema. */
export type ScoreEntry = z.infer<typeof scoreEntrySchema>;
