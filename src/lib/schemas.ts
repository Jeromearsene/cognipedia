import { z } from "astro/zod";
import { DIFFICULTIES, FAMILIES } from "./constants";

const paperSchema = z.object({
	title: z.string().min(1),
	url: z.url(),
});

const videoSchema = z.object({
	title: z.string().min(1),
	url: z.url(),
	lang: z.string().min(2).max(5),
});

const sourcesSchema = z.object({
	wikipedia: z.url(),
	papers: z.array(paperSchema).optional(),
	videos: z.array(videoSchema).optional(),
});

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

export const biasSchema = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	originalName: z.string().min(1),
	family: z.enum(FAMILIES),
	tags: z.array(z.string().min(1)).min(1),
	difficulty: z.enum(DIFFICULTIES),
	sources: sourcesSchema,
	relatedBiases: z.array(z.string()).optional().default([]),
	situation: situationSchema.optional(),
	quiz: quizSchema.optional(),
});

export type BiasFrontmatter = z.infer<typeof biasSchema>;

// --- API response schemas ---
// Fields use snake_case to match D1 column names (returned as-is by the database).

export const scoreEntrySchema = z.object({
	bias_slug: z.string(),
	total_score: z.number(),
	situation_score: z.number(),
	quiz_correct: z.number(),
	quiz_total: z.number(),
	completed_at: z.string(),
});

export const userScoresResponseSchema = z.object({
	scores: z.array(scoreEntrySchema),
	totalScore: z.number(),
	biasCount: z.number(),
});

// --- API request body schemas ---

const recoveryCodeSchema = z.string().regex(/^COGNI-[A-Z0-9]{4}-[A-Z0-9]{4}$/);

export const registerBodySchema = z.object({
	uuid: z.uuid(),
	pseudo: z.string().min(1),
	recoveryCode: recoveryCodeSchema,
});

export const scoreBodySchema = z.object({
	userUuid: z.uuid(),
	biasSlug: z.string().min(1),
	situationScore: z.number(),
	quizCorrect: z.number().int().min(0),
	quizTotal: z.number().int().min(1),
});

export const recoverBodySchema = z.object({
	recoveryCode: recoveryCodeSchema,
});

export const pseudoBodySchema = z.object({
	uuid: z.uuid(),
	pseudo: z.string().min(1).max(30),
});
