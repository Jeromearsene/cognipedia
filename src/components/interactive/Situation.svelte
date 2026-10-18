<script lang="ts">
import { tick } from "svelte";
import { cn } from "@/lib/cn";
import type { SituationLabels } from "@/lib/labels";
import type { Situation } from "@/lib/schemas";

interface Props {
	/** Situation data parsed from the bias markdown. */
	data: Situation;
	/** Translated UI labels. */
	labels: SituationLabels;
	/** Called after the user picks a choice. `true` if the biased option was selected. */
	onComplete?: (choseBiased: boolean) => void;
}

let { data, labels, onComplete }: Props = $props();
let selectedIndex: number | null = $state(null);
let revealed = $state(false);
let revealEl = $state<HTMLElement>();

/** Choosing disables the buttons, so move focus to the reveal to avoid dropping it on <body>. */
const handleChoice = async (index: number) => {
	if (revealed) return;
	selectedIndex = index;
	revealed = true;
	onComplete?.(data.choices[index].bias);
	await tick();
	revealEl?.focus();
};
</script>

<section class="rounded-3xl bg-surface p-6.5 shadow-brand-sm">
  <p class="mb-4.5 text-base">{data.scenario}</p>

  <div class="flex flex-col gap-2.5">
    {#each data.choices as choice, i}
      <button
        class={cn(
          "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 border-border bg-surface px-4.5 py-3.5 text-left text-base transition-colors",
          "hover:not-disabled:border-accent disabled:cursor-default",
          revealed && selectedIndex !== i && "opacity-60",
          revealed && selectedIndex === i && choice.bias && "border-text-secondary font-semibold",
          revealed && !choice.bias && "border-[color:var(--success-border)] font-semibold",
        )}
        style={revealed && !choice.bias ? "background-color: var(--success-bg); color: var(--success-text)" : ""}
        disabled={revealed}
        onclick={() => handleChoice(i)}
      >
        <span>{choice.label}</span>
        {#if revealed && !choice.bias}
          <span class="text-sm font-bold" aria-hidden="true">✓</span>
          <span class="sr-only">{labels.correctMark}</span>
        {:else if revealed && selectedIndex === i}
          <span class="text-sm font-bold" aria-hidden="true">✗</span>
          <span class="sr-only">{labels.wrongMark}</span>
        {/if}
      </button>
    {/each}
  </div>

  {#if revealed}
    <div bind:this={revealEl} tabindex="-1" class="mt-4.5 border-t border-border pt-4">
      <span class="text-xs font-bold uppercase tracking-wide text-accent-ink">{labels.revealLabel}</span>
      <p class="mt-1.5 text-base text-text-secondary">{data.reveal}</p>
    </div>
  {/if}
</section>
