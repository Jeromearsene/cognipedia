import { z } from "zod";
import { DIFFICULTIES, FAMILIES } from "./constants";

const paperSchema = z.object({
	title: z.string().min(1),
	url: z.string().url(),
});

const videoSchema = z.object({
	title: z.string().min(1),
	url: z.string().url(),
	lang: z.string().min(2).max(5),
});

const sourcesSchema = z.object({
	wikipedia: z.string().url(),
	papers: z.array(paperSchema).optional(),
	videos: z.array(videoSchema).optional(),
});

export const biasSchema = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	originalName: z.string().min(1),
	family: z.enum(FAMILIES),
	tags: z.array(z.string().min(1)).min(1),
	difficulty: z.enum(DIFFICULTIES),
	sources: sourcesSchema,
	relatedBiases: z.array(z.string()).optional().default([]),
});

export type BiasFrontmatter = z.infer<typeof biasSchema>;

const choiceSchema = z.object({
	label: z.string().min(1),
	bias: z.boolean(),
});

export const situationSchema = z.object({
	type: z.literal("choice"),
	scenario: z.string().min(1),
	choices: z.array(choiceSchema).min(2),
	reveal: z.string().min(1),
});

export type Situation = z.infer<typeof situationSchema>;

const questionSchema = z.object({
	question: z.string().min(1),
	choices: z.array(z.string().min(1)).min(2),
	correct: z.number().int().min(0),
	explanation: z.string().min(1),
});

export const quizSchema = z.object({
	questions: z.array(questionSchema).min(1),
});

export type Quiz = z.infer<typeof quizSchema>;
