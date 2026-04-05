<script lang="ts">
import { fade } from "svelte/transition";
import type { BiasCardData } from "@/lib/constants";
import { DIFFICULTY_COLORS } from "@/lib/constants";

interface Props extends BiasCardData {
	/** Stagger delay in ms for fade-in animation (defaults to 0). */
	delay?: number;
}

const {
	href,
	title,
	family,
	familyLabel,
	difficulty,
	difficultyLabel,
	delay = 0,
}: Props = $props();
</script>

<a
  {href}
  class="bias-card block rounded-xl border border-border bg-surface p-5 no-underline shadow-sm"
  style="--glow-color: var(--family-{family})"
  in:fade={{ duration: 300, delay }}
>
  <h3 class="mb-3 text-lg font-semibold text-text">{title}</h3>
  <div class="flex flex-wrap gap-2">
    <span
      class="rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
      style="background-color: var(--family-{family})"
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
