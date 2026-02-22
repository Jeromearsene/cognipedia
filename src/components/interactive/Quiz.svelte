<script lang="ts">
import type { Quiz } from "@/lib/schemas";
import { computeQuizScore } from "@/lib/scoring";

interface Labels {
	next: string;
	results: string;
	correct: string;
	incorrect: string;
}

interface Props {
	data: Quiz;
	labels: Labels;
	onComplete?: (correct: number, total: number) => void;
}

let { data, labels, onComplete }: Props = $props();
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
	if (selectedAnswer === null) return;
	answers = [...answers, selectedAnswer];
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

<section class="rounded-lg border border-border bg-surface p-8">
  {#if !finished}
    <div class="mb-2 text-sm text-text-secondary">
      {currentIndex + 1} / {data.questions.length}
    </div>

    <p class="mb-8 text-lg font-semibold">{currentQuestion.question}</p>

    <div class="flex flex-col gap-2">
      {#each currentQuestion.choices as choice, i}
        <button
          class="cursor-pointer rounded-lg border-2 border-border bg-surface p-4 text-left text-base transition-colors hover:not-disabled:border-accent disabled:cursor-default"
          class:!border-emerald-500={showExplanation && i === currentQuestion.correct}
          class:!bg-emerald-50={showExplanation && i === currentQuestion.correct}
          class:!border-red-500={showExplanation && selectedAnswer === i && i !== currentQuestion.correct}
          class:!bg-red-50={showExplanation && selectedAnswer === i && i !== currentQuestion.correct}
          disabled={showExplanation}
          onclick={() => handleAnswer(i)}
        >
          {choice}
        </button>
      {/each}
    </div>

    {#if showExplanation}
      <div class="mt-8 rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4">
        <p><strong>{isCorrect ? '✓' : '✗'}</strong> {currentQuestion.explanation}</p>
        <button
          class="mt-4 cursor-pointer rounded bg-accent px-4 py-2 text-sm text-white"
          onclick={handleNext}
        >
          {currentIndex + 1 < data.questions.length ? labels.next : labels.results}
        </button>
      </div>
    {/if}
  {:else}
    <div class="text-center">
      <p class="text-3xl font-bold">{score.correct} / {score.total}</p>
    </div>
  {/if}
</section>
