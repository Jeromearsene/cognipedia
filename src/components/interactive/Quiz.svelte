<script lang="ts">
import Mascot from "@/components/Mascot.svelte";
import { cn } from "@/lib/cn";
import type { Difficulty } from "@/lib/constants";
import type { Quiz } from "@/lib/schemas";
import { computeQuizScore } from "@/lib/scoring";
import QuestionLevel from "./QuestionLevel.svelte";

interface Labels {
	next: string;
	results: string;
	correct: string;
	incorrect: string;
	/** Level names, by question level (e.g. "Facile"). */
	levels: Record<Difficulty, string>;
	/** Accessible names of the level indicator, by question level. */
	levelAria: Record<Difficulty, string>;
}

interface Props {
	/** Quiz data parsed from the bias markdown. */
	data: Quiz;
	/** Translated UI labels, passed from the Astro page via t(). */
	labels: Labels;
	/** Called when all questions are answered, with the final correct/total counts. */
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
const isLastQuestion = $derived(currentIndex + 1 >= data.questions.length);

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

	if (isLastQuestion) {
		finished = true;
		const finalScore = computeQuizScore(
			answers,
			data.questions.map((q) => q.correct),
		);
		onComplete?.(finalScore.correct, finalScore.total);
	} else {
		currentIndex += 1;
	}
};
</script>

<section class="rounded-3xl bg-surface p-6.5 shadow-brand-sm">
  {#if !finished}
    <div class="mb-3.5 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <span class="text-xs font-bold text-text-secondary">
          {currentIndex + 1} / {data.questions.length}
        </span>
        <QuestionLevel
          level={currentQuestion.level}
          label={labels.levels[currentQuestion.level]}
          ariaLabel={labels.levelAria[currentQuestion.level]}
        />
      </div>
      <span class="text-sm font-bold tabular-nums">
        {score.correct} / {answers.length}
      </span>
    </div>

    <p class="mb-4.5 text-base font-semibold">{currentQuestion.question}</p>

    <div class="flex flex-col gap-2.5">
      {#each currentQuestion.choices as choice, i}
        <button
          class={cn(
            "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 border-border bg-surface px-4.5 py-3.5 text-left text-base transition-colors",
            "hover:not-disabled:border-accent disabled:cursor-default",
            showExplanation && i !== currentQuestion.correct && "opacity-60",
            showExplanation && i === currentQuestion.correct && "border-[color:var(--success-border)] font-semibold",
          )}
          style={showExplanation && i === currentQuestion.correct
            ? "background-color: var(--success-bg); color: var(--success-text)"
            : ""}
          disabled={showExplanation}
          onclick={() => handleAnswer(i)}
        >
          <span>{choice}</span>
          {#if showExplanation && i === currentQuestion.correct}
            <span class="text-sm font-bold">✓</span>
          {/if}
        </button>
      {/each}
    </div>

    {#if showExplanation}
      <div
        class="mt-4.5 flex items-center gap-4 rounded-2xl p-4"
        style="background-color: var(--success-bg)"
      >
        <Mascot pose={isCorrect ? "happy" : "confused"} size={56} />
        <div class="flex flex-col gap-1">
          <span class="text-base font-bold" style="color: var(--success-text)">
            {isCorrect ? labels.correct : labels.incorrect}
          </span>
          <span class="text-sm">{currentQuestion.explanation}</span>
        </div>
      </div>
      <button class="btn-primary float-right mt-4 cursor-pointer px-5.5 py-2.75 text-sm" onclick={handleNext}>
        {isLastQuestion ? labels.results : labels.next}
      </button>
    {/if}
  {:else}
    <div class="text-center">
      <p class="text-3xl font-bold">{score.correct} / {score.total}</p>
    </div>
  {/if}
</section>
