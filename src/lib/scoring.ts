export interface QuizScore {
	correct: number;
	total: number;
}

/** Compares user answers to correct answers and returns the score. */
export const computeQuizScore = (answers: number[], correctAnswers: number[]): QuizScore => ({
	correct: answers.filter((a, i) => a === correctAnswers[i]).length,
	total: answers.length,
});

/** Returns 1 if the user avoided the biased option, 0 otherwise. */
export const computeSituationScore = (choseBiasedOption: boolean): number =>
	choseBiasedOption ? 0 : 1;

export interface TotalScoreInput {
	situationScore: number;
	quizCorrect: number;
	quizTotal: number;
}

/** Computes the total score for a bias (situation + quiz). */
export const computeTotalScore = (input: TotalScoreInput): number =>
	input.situationScore + input.quizCorrect;
