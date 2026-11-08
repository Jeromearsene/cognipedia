<script lang="ts">
import { onMount, tick } from "svelte";
import Mascot from "@/components/Mascot.svelte";
import { cn } from "@/lib/cn";
import { fillLabel, type QuizLabels } from "@/lib/labels";
import type { Quiz } from "@/lib/schemas";
import { computeQuizScore } from "@/lib/scoring";
import { shuffledIndices } from "@/lib/shuffle";

interface Props {
	/** Quiz data parsed from the bias markdown. */
	data: Quiz;
	/** Translated UI labels, passed from the Astro page via t(). */
	labels: QuizLabels;
	/** Called when all questions are answered, with the final correct/total counts. */
	onComplete?: (correct: number, total: number) => void;
}

let { data, labels, onComplete }: Props = $props();
let currentIndex = $state(0);
let answers: number[] = $state([]);
let selectedAnswer: number | null = $state(null);
let showExplanation = $state(false);
let finished = $state(false);
let questionEl = $state<HTMLElement>();
let feedbackEl = $state<HTMLElement>();
let resultEl = $state<HTMLElement>();

/**
 * Display order of the choices, one permutation per question. Holds *original* choice indices,
 * so `selectedAnswer`, `answers` and `correct` keep referring to the frontmatter order and the
 * scoring is untouched. Starts in content order (what the server renders) and is shuffled on
 * mount: shuffling during render would make the server and client markup disagree.
 */
const identityOrder = () => data.questions.map((q) => q.choices.map((_, i) => i));
const shuffledOrder = () => data.questions.map((q) => shuffledIndices(q.choices.length));
let choiceOrder = $state(identityOrder());
let ready = $state(false);

onMount(() => {
	choiceOrder = shuffledOrder();
	ready = true;
});

const currentQuestion = $derived(data.questions[currentIndex]);
const isCorrect = $derived(selectedAnswer === currentQuestion?.correct);
const score = $derived(
	computeQuizScore(
		answers,
		data.questions.map((q) => q.correct),
	),
);
const isLastQuestion = $derived(currentIndex + 1 >= data.questions.length);

/** Questions answered so far, including the one whose feedback is on screen. */
const answeredCount = $derived(answers.length + (showExplanation ? 1 : 0));
const progressPercent = $derived(Math.round((answeredCount / data.questions.length) * 100));
const progressText = $derived(
	fillLabel(labels.progress, { current: currentIndex + 1, total: data.questions.length }),
);

/** Final message depends on how the quiz went: perfect, mostly right, or worth another try. */
const resultTier = $derived(
	score.correct === score.total
		? "perfect"
		: score.correct / score.total >= 2 / 3
			? "good"
			: "retry",
);
const resultMessage = $derived(
	{ perfect: labels.resultPerfect, good: labels.resultGood, retry: labels.resultRetry }[resultTier],
);

/** Answering disables the choices, so move focus to the feedback to keep keyboard and screen-reader users in flow. */
const handleAnswer = async (index: number) => {
	if (showExplanation) return;
	selectedAnswer = index;
	showExplanation = true;
	await tick();
	feedbackEl?.focus();
};

const handleNext = async () => {
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
		await tick();
		resultEl?.focus();
	} else {
		currentIndex += 1;
		await tick();
		questionEl?.focus();
	}
};

/** Start over. The API keeps the best score, so retrying can't lower a saved result. */
const handleRetry = async () => {
	answers = [];
	selectedAnswer = null;
	showExplanation = false;
	finished = false;
	currentIndex = 0;
	choiceOrder = shuffledOrder();
	await tick();
	questionEl?.focus();
};
</script>

<section class="rounded-3xl bg-surface p-6.5 shadow-brand-sm">
  {#if !finished}
    <div class="mb-2 flex items-center justify-between gap-3">
      <span class="text-xs font-bold text-text-secondary">{progressText}</span>
      {#if answers.length > 0}
        <span class="text-sm font-bold tabular-nums">
          {fillLabel(labels.runningScore, { score: score.correct, total: answers.length })}
        </span>
      {/if}
    </div>
    <div
      class="mb-4.5 h-1.5 overflow-hidden rounded-full bg-border"
      role="progressbar"
      aria-label={progressText}
      aria-valuemin={0}
      aria-valuemax={data.questions.length}
      aria-valuenow={answeredCount}
    >
      <div
        class="h-full rounded-full bg-accent motion-safe:transition-[width] motion-safe:duration-300"
        style="width: {progressPercent}%"
      ></div>
    </div>

    <p bind:this={questionEl} tabindex="-1" class="mb-4.5 text-base font-semibold">{currentQuestion.question}</p>

    <!-- Hidden (but laid out) until the choices are shuffled on mount, to avoid a visible reorder. -->
    <div class={cn("flex flex-col gap-2.5", !ready && "invisible")} aria-hidden={!ready}>
      {#each choiceOrder[currentIndex] as i (i)}
        {@const choice = currentQuestion.choices[i]}
        <button
          class={cn(
            "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 border-border bg-surface px-4.5 py-3.5 text-left text-base transition-colors",
            "hover:not-disabled:border-accent disabled:cursor-default",
            showExplanation && i !== currentQuestion.correct && selectedAnswer !== i && "text-text-secondary",
            showExplanation && i !== currentQuestion.correct && selectedAnswer === i && "border-text-secondary font-semibold",
            showExplanation && i === currentQuestion.correct && "border-[color:var(--success-border)] font-semibold",
          )}
          style={showExplanation && i === currentQuestion.correct
            ? "background-color: var(--success-bg); color: var(--success-text)"
            : ""}
          disabled={showExplanation || !ready}
          onclick={() => handleAnswer(i)}
        >
          <span>{choice}</span>
          {#if showExplanation && i === currentQuestion.correct}
            <span class="text-sm font-bold" aria-hidden="true">✓</span>
            <span class="sr-only">{labels.correctMark}</span>
          {:else if showExplanation && selectedAnswer === i}
            <span class="text-sm font-bold" aria-hidden="true">✗</span>
            <span class="sr-only">{labels.wrongMark}</span>
          {/if}
        </button>
      {/each}
    </div>

    {#if showExplanation}
      <div
        bind:this={feedbackEl}
        tabindex="-1"
        class={cn("mt-4.5 flex items-center gap-4 rounded-2xl p-4", !isCorrect && "bg-bg")}
        style={isCorrect ? "background-color: var(--success-bg)" : ""}
      >
        <Mascot pose={isCorrect ? "happy" : "confused"} size={56} />
        <div class="flex flex-col gap-1">
          <span
            class="text-base font-bold"
            style={isCorrect ? "color: var(--success-text)" : "color: var(--color-text)"}
          >
            {isCorrect ? labels.correct : labels.incorrect}
          </span>
          <span class="text-sm">{currentQuestion.explanation}</span>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button class="btn-primary cursor-pointer px-5.5 py-2.75 text-sm" onclick={handleNext}>
          {isLastQuestion ? labels.results : labels.next}
        </button>
      </div>
    {/if}
  {:else}
    <div bind:this={resultEl} tabindex="-1" class="flex flex-col items-center gap-2 text-center">
      <Mascot pose={resultTier === "retry" ? "thinking" : "happy"} size={72} />
      <p class="mt-2 text-xs font-bold uppercase tracking-wide text-text-secondary">{labels.scoreLabel}</p>
      <p class="text-4xl font-bold tabular-nums">{score.correct} / {score.total}</p>
      <p class="max-w-[36ch] text-base text-text-secondary">{resultMessage}</p>
      {#if resultTier !== "perfect"}
        <button class="btn-secondary mt-3 cursor-pointer px-5.5 py-2.75 text-sm" onclick={handleRetry}>
          {labels.retry}
        </button>
      {/if}
    </div>
  {/if}
</section>
