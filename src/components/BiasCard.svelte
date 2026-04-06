<script lang="ts">
import { CheckCircle, Eye } from "lucide-svelte";
import { onMount } from "svelte";
import { fade } from "svelte/transition";
import type { BiasCardData } from "@/lib/constants";
import { DIFFICULTY_COLORS } from "@/lib/constants";
import { biasProgressStore } from "@/lib/seenBiasesStore.svelte";

interface Props extends BiasCardData {
	/** Stagger delay in ms for fade-in animation (defaults to 0). */
	delay?: number;
}

const {
	slug,
	href,
	title,
	family,
	familyLabel,
	difficulty,
	difficultyLabel,
	delay = 0,
}: Props = $props();

/** Read status from localStorage on mount (cross-island $state reactivity is unreliable). */
let status = $state<"new" | "seen" | "completed">("new");
onMount(() => {
	status = biasProgressStore.getStatus(slug);
});
</script>

<a
  {href}
  class="bias-card block rounded-xl border bg-surface p-5 no-underline shadow-sm {status === 'completed'
    ? 'border-accent/40'
    : 'border-border'}"
  style="--glow-color: var(--family-{family})"
  in:fade={{ duration: 300, delay }}
>
  <div class="flex items-start justify-between gap-2">
    <h3 class="mb-3 text-lg font-semibold text-text">{title}</h3>
    {#if status === "completed"}
      <CheckCircle size={18} class="shrink-0 text-accent" />
    {:else if status === "seen"}
      <Eye size={18} class="shrink-0 text-text-secondary" />
    {/if}
  </div>
  <div class="flex flex-wrap gap-2">
    <span
      class="rounded-full px-2.5 py-0.5 text-xs font-medium"
      style="background-color: var(--family-{family}); color: var(--family-contrast)"
    >
      {familyLabel}
    </span>
    <span class="rounded-full px-2.5 py-0.5 text-xs font-medium {DIFFICULTY_COLORS[difficulty]}">
      {difficultyLabel}
    </span>
  </div>
</a>

<style>
  .bias-card {
    transition: transform 0.2s, box-shadow 0.3s;
  }

  /* Lift + family-colored glow on hover. --glow-color is set inline from the family CSS variable. */
  .bias-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px color-mix(in srgb, var(--glow-color) 20%, transparent);
  }
</style>
