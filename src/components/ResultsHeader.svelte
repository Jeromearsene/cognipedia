<script lang="ts">
import { RotateCcw } from "lucide-svelte";

interface Props {
	/** Pre-formatted results label (e.g. "12 biais trouvés"). Hidden when count is 0. */
	resultsLabel: string;
	/** Whether to show the count — set to false when there are no results. */
	hasResults: boolean;
	/** Whether the reset button should be visible (i.e. at least one filter is narrowed). */
	hasActiveFilters: boolean;
	onReset: () => void;
	label: string;
}

const { resultsLabel, hasResults, hasActiveFilters, onReset, label }: Props = $props();
</script>

<div class="mb-3 flex flex-wrap items-center justify-between gap-2">
  {#if hasResults}
    <p class="text-sm text-text-secondary">{resultsLabel}</p>
  {:else}
    <span></span>
  {/if}
  {#if hasActiveFilters}
    <button
      type="button"
      onclick={onReset}
      class="flex cursor-pointer items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
    >
      <RotateCcw size={14} />
      {label}
    </button>
  {/if}
</div>
