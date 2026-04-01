<script lang="ts">
import {
	type BiasCardData,
	DIFFICULTY_COLORS,
	type Difficulty,
	type Family,
} from "@/lib/constants";
import { isDifficulty, isFamily } from "@/lib/utils";
import BiasCard from "./BiasCard.svelte";

interface FamilyOption {
	key: Family;
	label: string;
}

interface DifficultyOption {
	key: Difficulty;
	label: string;
}

interface Props {
	biases: BiasCardData[];
	families: FamilyOption[];
	difficulties: DifficultyOption[];
	/** Pre-selected family filter from query params (passed by Astro SSR). */
	initialFamily?: string | null;
	/** Pre-selected difficulty filter from query params (passed by Astro SSR). */
	initialDifficulty?: string | null;
	labels: {
		family: string;
		difficulty: string;
		noResults: string;
	};
}

const { biases, families, difficulties, initialFamily, initialDifficulty, labels }: Props =
	$props();

// svelte-ignore state_referenced_locally — props are static (from Astro), won't change after mount
const familyKeys = families.map((family) => family.key);
// svelte-ignore state_referenced_locally
const difficultyKeys = difficulties.map((difficulty) => difficulty.key);

/** Active family filters — narrowed to initial filter if provided, otherwise all enabled. */
// svelte-ignore state_referenced_locally — intentional: initialFamily is a static SSR prop, not reactive
let activeFamilies = $state(
	initialFamily && isFamily(initialFamily) ? new Set<Family>([initialFamily]) : new Set(familyKeys),
);
/** Active difficulty filters — narrowed to initial filter if provided, otherwise all enabled. */
// svelte-ignore state_referenced_locally — intentional: initialDifficulty is a static SSR prop, not reactive
let activeDifficulties = $state(
	initialDifficulty && isDifficulty(initialDifficulty)
		? new Set<Difficulty>([initialDifficulty])
		: new Set(difficultyKeys),
);

const toggleFamily = (key: Family) => {
	const next = new Set(activeFamilies);
	if (next.has(key)) next.delete(key);
	else next.add(key);
	activeFamilies = next;
};

const toggleDifficulty = (key: Difficulty) => {
	const next = new Set(activeDifficulties);
	if (next.has(key)) next.delete(key);
	else next.add(key);
	activeDifficulties = next;
};

const filtered = $derived(
	biases.filter(
		(bias) => activeFamilies.has(bias.family) && activeDifficulties.has(bias.difficulty),
	),
);
</script>

<div class="sticky top-0 z-10 mb-6 flex flex-wrap gap-6 rounded-xl border border-accent/20 bg-accent-subtle p-4 shadow-sm">
  <div>
    <span class="mb-2 block font-heading text-base font-semibold text-text">{labels.family}</span>
    <div class="flex flex-wrap gap-2">
      {#each families as { key, label }}
        <button
          class="family-pill cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors {activeFamilies.has(key)
            ? 'family-pill-active border-transparent'
            : 'border-border bg-bg text-text-secondary'}"
          style={`--family-color: var(--family-${key})`}
          onclick={() => toggleFamily(key)}
        >
          {label}
        </button>
      {/each}
    </div>
  </div>

  <div>
    <span class="mb-2 block font-heading text-base font-semibold text-text">{labels.difficulty}</span>
    <div class="flex flex-wrap gap-2">
      {#each difficulties as { key, label }}
        <button
          class="difficulty-pill cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors {activeDifficulties.has(key)
            ? DIFFICULTY_COLORS[key] + ' border-current'
            : 'border-border bg-bg text-text-secondary'}"
          style={`--difficulty-color: var(--difficulty-${key})`}
          onclick={() => toggleDifficulty(key)}
        >
          {label}
        </button>
      {/each}
    </div>
  </div>
</div>

{#if filtered.length === 0}
  <p class="py-12 text-center text-text-secondary">{labels.noResults}</p>
{:else}
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each filtered as bias (bias.href)}
      <BiasCard {...bias} />
    {/each}
  </div>
{/if}

<style>
  /* Active family pill: filled with family color */
  .family-pill-active {
    background-color: var(--family-color);
    color: white;
  }

  /* All family pills hover: border + text in family color, transparent background */
  .family-pill:hover {
    border-color: var(--family-color) !important;
    color: var(--family-color);
    background-color: transparent;
  }

  .difficulty-pill:hover {
    border-color: var(--difficulty-color);
    color: var(--difficulty-color);
    background-color: transparent;
  }
</style>
