<script lang="ts">
import { tilt } from "@levita-js/svelte";
import "@levita-js/svelte/style.css";
import { CheckCircle, Eye } from "lucide-svelte";
import { fade } from "svelte/transition";
import { difficultyBadgeStyle, difficultyDotStyle, familyBadgeStyle } from "@/lib/badges";
import type { BiasCardData } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";
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

const status = $derived(biasProgressStore.getStatus(slug));

/** Levita ignores `prefers-reduced-motion`, so only attach the tilt/glare when motion is welcome. */
const motionSafeTilt = (node: HTMLElement, options: Parameters<typeof tilt>[1]) =>
	prefersReducedMotion() ? undefined : tilt(node, options);
</script>

<a
  {href}
  class="block rounded-3xl border bg-surface p-5.5 no-underline shadow-brand-sm {status === 'completed'
    ? 'border-accent/40'
    : 'border-transparent'}"
  style="touch-action: manipulation"
  use:motionSafeTilt={{ scale: 1.02, glare: true, maxGlare: 0.15 }}
  in:fade={{ duration: prefersReducedMotion() ? 0 : 300, delay: prefersReducedMotion() ? 0 : delay }}
>
  <div class="mb-3 flex items-start justify-between gap-2">
    <h3 class="text-lg font-bold text-text">{title}</h3>
    {#if status === "completed"}
      <CheckCircle size={18} class="shrink-0 text-accent" />
    {:else if status === "seen"}
      <Eye size={18} class="shrink-0 text-text-secondary" />
    {/if}
  </div>
  <div class="flex flex-wrap gap-1.75">
    <span
      class="rounded-full px-2.75 py-1.25 text-xs font-bold"
      style={familyBadgeStyle(family)}
    >
      {familyLabel}
    </span>
    <span
      class="flex items-center gap-1.25 rounded-full py-1.25 pl-2 pr-2.75 text-xs font-bold"
      style={difficultyBadgeStyle(difficulty)}
    >
      <span class="inline-block h-1.5 w-1.5 rounded-full" style={difficultyDotStyle(difficulty)}></span>
      {difficultyLabel}
    </span>
  </div>
</a>
