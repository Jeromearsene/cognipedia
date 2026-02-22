<script lang="ts">
import type { Quiz } from "@/lib/schemas";
import { computeQuizScore } from "@/lib/scoring";

interface Props {
	data: Quiz;
	onComplete?: (correct: number, total: number) => void;
}

let { data, onComplete }: Props = $props();
let currentIndex = $state(0);
let answers: number[] = $state([]);
let selectedAnswer: number | null = $state(null);
let showExplanation = $state(false);
let finished = $state(false);

const currentQuestion = $derived(data.questions[currentIndex]);
const isCorrect = $derived(selectedAnswer === currentQuestion?.correct);
const score = $derived(
	computeQuizScore(
		answers,
		data.questions.map((q) => q.correct),
	),
);

const handleAnswer = (index: number) => {
	if (showExplanation) return;
	selectedAnswer = index;
	showExplanation = true;
};

const handleNext = () => {
	answers = [...answers, selectedAnswer as number];
	selectedAnswer = null;
	showExplanation = false;

	if (currentIndex + 1 >= data.questions.length) {
		finished = true;
		const finalAnswers = [...answers];
		const finalScore = computeQuizScore(
			finalAnswers,
			data.questions.map((q) => q.correct),
		);
		onComplete?.(finalScore.correct, finalScore.total);
	} else {
		currentIndex += 1;
	}
};
</script>

<section class="quiz">
  {#if !finished}
    <div class="progress">
      {currentIndex + 1} / {data.questions.length}
    </div>

    <p class="question">{currentQuestion.question}</p>

    <div class="answers">
      {#each currentQuestion.choices as choice, i}
        <button
          class="answer"
          class:selected={selectedAnswer === i}
          class:correct={showExplanation && i === currentQuestion.correct}
          class:wrong={showExplanation && selectedAnswer === i && i !== currentQuestion.correct}
          disabled={showExplanation}
          onclick={() => handleAnswer(i)}
        >
          {choice}
        </button>
      {/each}
    </div>

    {#if showExplanation}
      <div class="explanation" class:is-correct={isCorrect}>
        <p><strong>{isCorrect ? '✓' : '✗'}</strong> {currentQuestion.explanation}</p>
        <button class="next-btn" onclick={handleNext}>
          {currentIndex + 1 < data.questions.length ? 'Suivant' : 'Resultats'}
        </button>
      </div>
    {/if}
  {:else}
    <div class="results">
      <p class="score-display">{score.correct} / {score.total}</p>
    </div>
  {/if}
</section>

<style>
  .quiz {
    padding: var(--space-lg);
    background: var(--color-surface);
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
  }

  .progress {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-block-end: var(--space-sm);
  }

  .question {
    font-size: 1.125rem;
    font-weight: 600;
    margin-block-end: var(--space-lg);
  }

  .answers {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .answer {
    padding: var(--space-md);
    border: 2px solid var(--color-border);
    border-radius: 0.5rem;
    background: var(--color-surface);
    cursor: pointer;
    text-align: left;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .answer:hover:not(:disabled) {
    border-color: var(--color-accent);
  }

  .answer:disabled {
    cursor: default;
  }

  .correct {
    border-color: #10b981;
    background: #f0fdf4;
  }

  .wrong {
    border-color: #ef4444;
    background: #fef2f2;
  }

  .explanation {
    margin-block-start: var(--space-lg);
    padding: var(--space-md);
    border-radius: 0.5rem;
    background: #f0fdf4;
    border-left: 4px solid #10b981;
  }

  .explanation.is-correct {
    background: #f0fdf4;
    border-left-color: #10b981;
  }

  .next-btn {
    margin-block-start: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .results {
    text-align: center;
  }

  .score-display {
    font-size: 2rem;
    font-weight: 700;
  }
</style>
