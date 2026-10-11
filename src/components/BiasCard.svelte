<script lang="ts">
import { tilt } from "@levita-js/svelte";
import "@levita-js/svelte/style.css";
import { CheckCircle, Eye } from "lucide-svelte";
import { fade } from "svelte/transition";
import { difficultyBadgeStyle, difficultyDotStyle, familyBadgeStyle } from "@/lib/badges";
import type { BiasCardData } from "@/lib/constants";
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
</script>

<a
  {href}
  class="hoverlift block rounded-[22px] border bg-surface p-[22px] no-underline shadow-brand-sm {status === 'completed'
    ? 'border-accent/40'
    : 'border-transparent'}"
  use:tilt={{ scale: 1.02, glare: true, maxGlare: 0.15 }}
  in:fade={{ duration: 300, delay }}
>
  <div class="mb-3 flex items-start justify-between gap-2">
    <h3 class="text-[17px] font-bold text-text">{title}</h3>
    {#if status === "completed"}
      <CheckCircle size={18} class="shrink-0 text-accent" />
    {:else if status === "seen"}
      <Eye size={18} class="shrink-0 text-text-secondary" />
    {/if}
  </div>
  <div class="flex flex-wrap gap-[7px]">
    <span
      class="rounded-full px-[11px] py-[5px] text-[11px] font-bold"
      style={familyBadgeStyle(family)}
    >
      {familyLabel}
    </span>
    <span
      class="flex items-center gap-[5px] rounded-full py-[5px] pl-[8px] pr-[11px] text-[11px] font-bold"
      style={difficultyBadgeStyle(difficulty)}
    >
      <span class="inline-block h-1.5 w-1.5 rounded-full" style={difficultyDotStyle(difficulty)}></span>
      {difficultyLabel}
    </span>
  </div>
</a>
