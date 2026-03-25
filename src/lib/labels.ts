import type { Locale } from "@/i18n/i18n";
import { t } from "@/i18n/i18n";

// --- Label type definitions ---

/** Labels for the Quiz component. */
export interface QuizLabels {
	next: string;
	results: string;
	correct: string;
	incorrect: string;
}

/** Labels for score submission feedback. */
export interface ScoreLabels {
	submitting: string;
	submitted: string;
	error: string;
}

/** Labels for the recovery code modal. */
export interface RecoveryModalLabels {
	title: string;
	description: string;
	profileHint: string;
	dismiss: string;
	copied: string;
	copy: string;
}

/** Labels for the recovery form. */
export interface RecoveryFormLabels {
	title: string;
	placeholder: string;
	submit: string;
	errorInvalid: string;
	errorNotFound: string;
	success: string;
}

/** Labels for the pseudo editor. */
export interface PseudoEditorLabels {
	save: string;
	saving: string;
	placeholder: string;
	edit: string;
}

/** Labels for the BiasInteractive orchestrator. */
export interface BiasInteractiveLabels {
	quiz: QuizLabels;
	score: ScoreLabels;
	recovery: RecoveryModalLabels;
}

/** Labels for the ProfilePage component. */
export interface ProfilePageLabels {
	notRegistered: string;
	notRegisteredHint: string;
	pseudo: PseudoEditorLabels;
	recoveryCodeLabel: string;
	recoveryHint: string;
	copy: string;
	copied: string;
	progression: string;
	progressionBiases: string;
	totalScore: string;
	completedBiases: string;
	scoreColumn: string;
	noScores: string;
	recoveryForm: RecoveryFormLabels;
}

// --- Label helpers ---

/** Builds all labels needed by the BiasInteractive orchestrator. */
export const getBiasInteractiveLabels = (locale: Locale): BiasInteractiveLabels => ({
	quiz: {
		next: t(locale, "quiz.next"),
		results: t(locale, "quiz.results"),
		correct: t(locale, "quiz.correct"),
		incorrect: t(locale, "quiz.incorrect"),
	},
	score: {
		submitting: t(locale, "score.submitting"),
		submitted: t(locale, "score.submitted"),
		error: t(locale, "score.error"),
	},
	recovery: {
		title: t(locale, "recovery.modal.title"),
		description: t(locale, "recovery.modal.description"),
		profileHint: t(locale, "recovery.modal.profile-hint"),
		dismiss: t(locale, "recovery.modal.dismiss"),
		copied: t(locale, "recovery.modal.copied"),
		copy: t(locale, "user.recovery.copy"),
	},
});

/** Builds all labels needed by the ProfilePage component. */
export const getProfileLabels = (locale: Locale): ProfilePageLabels => ({
	notRegistered: t(locale, "profile.not-registered"),
	notRegisteredHint: t(locale, "profile.not-registered.hint"),
	pseudo: {
		save: t(locale, "profile.pseudo.save"),
		saving: t(locale, "profile.pseudo.saving"),
		placeholder: t(locale, "user.pseudo.placeholder"),
		edit: t(locale, "profile.pseudo.edit"),
	},
	recoveryCodeLabel: t(locale, "profile.recovery-code"),
	recoveryHint: t(locale, "profile.recovery-hint"),
	copy: t(locale, "user.recovery.copy"),
	copied: t(locale, "recovery.modal.copied"),
	progression: t(locale, "profile.progression"),
	progressionBiases: t(locale, "profile.progression.biases"),
	totalScore: t(locale, "profile.total-score"),
	completedBiases: t(locale, "profile.completed-biases"),
	scoreColumn: t(locale, "profile.score-column"),
	noScores: t(locale, "profile.no-scores"),
	recoveryForm: {
		title: t(locale, "recovery.form.title"),
		placeholder: t(locale, "recovery.form.placeholder"),
		submit: t(locale, "recovery.form.submit"),
		errorInvalid: t(locale, "recovery.form.error.invalid"),
		errorNotFound: t(locale, "recovery.form.error.not-found"),
		success: t(locale, "recovery.form.success"),
	},
});
