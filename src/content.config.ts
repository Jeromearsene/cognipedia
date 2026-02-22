import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { biasSchema } from "./lib/schemas";

const biases = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/biases" }),
	schema: biasSchema,
});

export const collections = { biases };
