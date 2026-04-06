import type { Locale } from "@/i18n/i18n";
import { m } from "@/paraglide/messages";

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
	situationTitle: string;
	quizTitle: string;
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
	totalScore: string;
	completedBiases: string;
	biasColumn: string;
	scoreColumn: string;
	noScores: string;
	recoveryForm: RecoveryFormLabels;
}

// --- Label helpers ---

/** Builds all labels needed by the BiasInteractive orchestrator. */
export const getBiasInteractiveLabels = (locale: Locale): BiasInteractiveLabels => ({
	situationTitle: m.situation_title({}, { locale }),
	quizTitle: m.quiz_title({}, { locale }),
	quiz: {
		next: m.quiz_next({}, { locale }),
		results: m.quiz_results({}, { locale }),
		correct: m.quiz_correct({}, { locale }),
		incorrect: m.quiz_incorrect({}, { locale }),
	},
	score: {
		submitting: m.score_submitting({}, { locale }),
		submitted: m.score_submitted({}, { locale }),
		error: m.score_error({}, { locale }),
	},
	recovery: {
		title: m.recovery_modal_title({}, { locale }),
		description: m.recovery_modal_description({}, { locale }),
		profileHint: m.recovery_modal_profile_hint({}, { locale }),
		dismiss: m.recovery_modal_dismiss({}, { locale }),
		copied: m.recovery_modal_copied({}, { locale }),
		copy: m.user_recovery_copy({}, { locale }),
	},
});

/** Builds all labels needed by the ProfilePage component. */
export const getProfileLabels = (locale: Locale): ProfilePageLabels => ({
	notRegistered: m.profile_not_registered({}, { locale }),
	notRegisteredHint: m.profile_not_registered_hint({}, { locale }),
	pseudo: {
		save: m.profile_pseudo_save({}, { locale }),
		saving: m.profile_pseudo_saving({}, { locale }),
		placeholder: m.user_pseudo_placeholder({}, { locale }),
		edit: m.profile_pseudo_edit({}, { locale }),
	},
	recoveryCodeLabel: m.profile_recovery_code({}, { locale }),
	recoveryHint: m.profile_recovery_hint({}, { locale }),
	copy: m.user_recovery_copy({}, { locale }),
	copied: m.recovery_modal_copied({}, { locale }),
	progression: m.profile_progression({}, { locale }),
	totalScore: m.profile_total_score({}, { locale }),
	completedBiases: m.profile_completed_biases({}, { locale }),
	biasColumn: m.profile_bias_column({}, { locale }),
	scoreColumn: m.profile_score_column({}, { locale }),
	noScores: m.profile_no_scores({}, { locale }),
	recoveryForm: {
		title: m.recovery_form_title({}, { locale }),
		placeholder: m.recovery_form_placeholder({}, { locale }),
		submit: m.recovery_form_submit({}, { locale }),
		errorInvalid: m.recovery_form_error_invalid({}, { locale }),
		errorNotFound: m.recovery_form_error_not_found({}, { locale }),
		success: m.recovery_form_success({}, { locale }),
	},
});
