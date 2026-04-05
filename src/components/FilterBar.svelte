<script lang="ts">
import { Search } from "lucide-svelte";
import { DIFFICULTY_COLORS, type Difficulty, type Family } from "@/lib/constants";

interface FamilyOption {
	key: Family;
	label: string;
}

interface DifficultyOption {
	key: Difficulty;
	label: string;
}

interface Props {
	families: FamilyOption[];
	difficulties: DifficultyOption[];
	activeFamilies: Set<Family>;
	activeDifficulties: Set<Difficulty>;
	searchQuery: string;
	onToggleFamily: (key: Family) => void;
	onToggleDifficulty: (key: Difficulty) => void;
	onSearchChange: (value: string) => void;
	labels: {
		family: string;
		difficulty: string;
		search: string;
		searchPlaceholder: string;
	};
}

const {
	families,
	difficulties,
	activeFamilies,
	activeDifficulties,
	searchQuery,
	onToggleFamily,
	onToggleDifficulty,
	onSearchChange,
	labels,
}: Props = $props();
</script>

<div class="sticky top-0 z-10 mb-6 flex flex-wrap gap-4 rounded-xl border border-accent/20 bg-accent-subtle p-3 shadow-sm sm:gap-6 sm:p-4">
  <div class="w-full sm:w-auto sm:min-w-[220px] sm:flex-1">
    <label for="bias-search" class="mb-2 block font-heading text-base font-semibold text-text">{labels.search}</label>
    <div class="relative">
      <Search size={16} class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
      <input
        id="bias-search"
        type="search"
        value={searchQuery}
        oninput={(e) => onSearchChange(e.currentTarget.value)}
        placeholder={labels.searchPlaceholder}
        class="w-full rounded-full border border-border bg-bg py-1.5 pl-9 pr-3 text-sm text-text placeholder:text-text-secondary focus:border-accent focus:outline-none"
      />
    </div>
  </div>

  <div>
    <span class="mb-2 block font-heading text-base font-semibold text-text">{labels.family}</span>
    <div class="flex flex-wrap gap-2">
      {#each families as { key, label }}
        <button
          class="family-pill cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors {activeFamilies.has(key)
            ? 'family-pill-active border-transparent'
            : 'border-border bg-bg text-text-secondary'}"
          style={`--family-color: var(--family-${key})`}
          onclick={() => onToggleFamily(key)}
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
          onclick={() => onToggleDifficulty(key)}
        >
          {label}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  /* Active family pill: filled with family color (text adapts to theme via --family-contrast) */
  .family-pill-active {
    background-color: var(--family-color);
    color: var(--family-contrast);
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
