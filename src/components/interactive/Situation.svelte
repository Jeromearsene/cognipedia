<script lang="ts">
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

const handleChoice = (index: number) => {
	if (revealed) return;
	selectedIndex = index;
	revealed = true;
	onComplete?.(data.choices[index].bias);
};
</script>

<section class="rounded-[22px] bg-surface p-[26px] shadow-brand-sm">
  <p class="mb-[18px] text-base">{data.scenario}</p>

  <div class="flex flex-col gap-[10px]">
    {#each data.choices as choice, i}
      <button
        class={cn(
          "flex cursor-pointer items-center justify-between gap-3 rounded-[14px] border-[1.5px] border-border bg-surface px-[18px] py-[14px] text-left text-[15px] transition-colors",
          "hover:not-disabled:border-accent disabled:cursor-default",
          revealed && selectedIndex !== i && "opacity-60",
          revealed && !choice.bias && "border-[color:var(--success-border)] font-semibold",
        )}
        style={revealed && !choice.bias ? "background-color: var(--success-bg); color: var(--success-text)" : ""}
        disabled={revealed}
        onclick={() => handleChoice(i)}
      >
        <span>{choice.label}</span>
        {#if revealed && !choice.bias}
          <span class="text-[13px] font-bold">✓</span>
        {/if}
      </button>
    {/each}
  </div>

  {#if revealed}
    <div class="mt-[18px] border-t border-border pt-4">
      <span class="text-xs font-bold uppercase tracking-wide text-accent-ink">{labels.revealLabel}</span>
      <p class="mt-1.5 text-[15px] text-text-secondary">{data.reveal}</p>
    </div>
  {/if}
</section>
