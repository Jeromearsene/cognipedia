import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { biasSchema } from "@/lib/schemas";

/**
 * Biases collection — each bias lives in its own folder with one markdown
 * file per locale (e.g. `anchoring/fr.md`, `anchoring/en.md`).
 * Entry IDs follow the pattern `<bias-folder>/<locale>`.
 */
const biases = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/biases" }),
	schema: biasSchema,
});

export const collections = { biases };
