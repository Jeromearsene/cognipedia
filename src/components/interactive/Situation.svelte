<script lang="ts">
import { cn } from "@/lib/cn";
import type { Situation } from "@/lib/schemas";

interface Props {
	/** Situation data parsed from the bias markdown. */
	data: Situation;
	/** Called after the user picks a choice. `true` if the biased option was selected. */
	onComplete?: (choseBiased: boolean) => void;
}

let { data, onComplete }: Props = $props();
let selectedIndex: number | null = $state(null);
let revealed = $state(false);

const handleChoice = (index: number) => {
	if (revealed) return;
	selectedIndex = index;
	revealed = true;
	onComplete?.(data.choices[index].bias);
};
</script>

<section class="rounded-lg border border-border bg-surface p-8">
  <p class="mb-8 text-lg">{data.scenario}</p>

  <div class="flex flex-col gap-2">
    {#each data.choices as choice, i}
      <button
        class={cn(
          "cursor-pointer rounded-lg border-2 border-border bg-surface p-4 text-left text-base transition-colors",
          "hover:not-disabled:border-accent disabled:cursor-default disabled:opacity-70",
          revealed && selectedIndex === i && {
            "border-red-500 bg-red-50": choice.bias,
            "border-emerald-500 bg-emerald-50": !choice.bias,
          },
        )}
        disabled={revealed}
        onclick={() => handleChoice(i)}
      >
        {choice.label}
      </button>
    {/each}
  </div>

  {#if revealed}
    <div class="mt-8 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4">
      <p>{data.reveal}</p>
    </div>
  {/if}
</section>
