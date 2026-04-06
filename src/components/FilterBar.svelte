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
	activeStatus: string;
	onToggleFamily: (key: Family) => void;
	onToggleDifficulty: (key: Difficulty) => void;
	onSearchChange: (value: string) => void;
	onStatusChange: (value: string) => void;
	labels: {
		family: string;
		difficulty: string;
		search: string;
		searchPlaceholder: string;
		status: string;
		statusOptions: { key: string; label: string }[];
	};
}

const {
	families,
	difficulties,
	activeFamilies,
	activeDifficulties,
	searchQuery,
	activeStatus,
	onToggleFamily,
	onToggleDifficulty,
	onSearchChange,
	onStatusChange,
	labels,
}: Props = $props();
</script>

<div class="sticky top-0 z-10 mb-6 flex flex-col gap-4 rounded-xl border border-accent/20 bg-accent-subtle p-3 shadow-sm sm:p-4">
  <!-- Search: full width -->
  <div>
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

  <!-- Family + Difficulty: side by side on desktop, stacked on mobile -->
  <div class="flex flex-wrap gap-4 sm:gap-6">
  <div>
    <span class="mb-2 block font-heading text-base font-semibold text-text">{labels.family}</span>
    <div class="flex flex-wrap gap-2">
      {#each families as { key, label }}
        <button
          class="cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors hover:!border-[var(--family-color)] hover:bg-transparent hover:text-[var(--family-color)] {activeFamilies.has(key)
            ? 'border-transparent bg-[var(--family-color)] text-[var(--family-contrast)]'
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
          class="cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors hover:border-[var(--difficulty-color)] hover:bg-transparent hover:text-[var(--difficulty-color)] {activeDifficulties.has(key)
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

  <div>
    <span class="mb-2 block font-heading text-base font-semibold text-text">{labels.status}</span>
    <div class="flex flex-wrap gap-2">
      {#each labels.statusOptions as { key, label }}
        <button
          class="cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors hover:border-accent hover:bg-transparent hover:text-accent {activeStatus === key
            ? 'border-accent bg-accent text-white'
            : 'border-border bg-bg text-text-secondary'}"
          onclick={() => onStatusChange(key)}
        >
          {label}
        </button>
      {/each}
    </div>
  </div>
  </div>
</div>
