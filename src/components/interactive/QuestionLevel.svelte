<script lang="ts">
import { type Difficulty, QUIZ_LEVELS } from "@/lib/constants";

interface Props {
	/** Level of the quiz question. */
	level: Difficulty;
	/** Translated level name (e.g. "Facile"), shown next to the bars. */
	label: string;
	/** Translated accessible name (e.g. "Niveau de la question : Facile"). */
	ariaLabel: string;
}

const { level, label, ariaLabel }: Props = $props();

const levelIndex = $derived(QUIZ_LEVELS.indexOf(level));

/** Bar heights, one per level (static classes so Tailwind can detect them). */
const BAR_HEIGHTS = ["h-1.5", "h-2.5", "h-3.5"];
</script>

<!--
  Question level, deliberately unlike the bias difficulty badge (full pill with a
  status-colored dot): a squared tag with ascending bars, in the neutral accent
  color. Status colors (green/orange/red) stay reserved for the bias difficulty
  and for correct/incorrect feedback, so a "hard" question never reads as a
  wrong answer.
-->
<span
  role="img"
  aria-label={ariaLabel}
  data-level={level}
  class="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-bold text-accent-ink"
  style="background-color: color-mix(in srgb, var(--color-accent) 10%, transparent)"
>
  <span class="flex items-end gap-0.5" aria-hidden="true">
    {#each QUIZ_LEVELS as step, i (step)}
      <span
        class="w-1 rounded-xs {BAR_HEIGHTS[i]}"
        style="background-color: {i <= levelIndex
          ? 'var(--color-accent)'
          : 'color-mix(in srgb, var(--color-accent) 25%, transparent)'}"
      ></span>
    {/each}
  </span>
  <span aria-hidden="true">{label}</span>
</span>
