<script lang="ts">
import autoAnimate from "@formkit/auto-animate";
import type { BiasCardData, Difficulty, Family } from "@/lib/constants";
import { isDifficulty, isFamily } from "@/lib/utils";
import BiasCard from "./BiasCard.svelte";
import FilterBar from "./FilterBar.svelte";
import ResultsHeader from "./ResultsHeader.svelte";

/** Svelte action wrapping @formkit/auto-animate for smooth list transitions. */
const autoAnimateAction = (node: HTMLElement) => {
	autoAnimate(node, { duration: 250, easing: "ease-in-out" });
};

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
	/** BCP 47 locale (e.g. "fr", "en") — used for Intl.PluralRules. */
	locale: string;
	labels: {
		family: string;
		difficulty: string;
		search: string;
		searchPlaceholder: string;
		reset: string;
		/** Plural forms indexed by CLDR category (one, other, ...) with {count} placeholder. */
		resultsCount: Record<string, string>;
		noResults: string;
	};
}

const { biases, families, difficulties, initialFamily, initialDifficulty, locale, labels }: Props =
	$props();

// svelte-ignore state_referenced_locally — locale is a static SSR prop, won't change after mount
const pluralRules = new Intl.PluralRules(locale);

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

/** Text search query — matches against bias title (case-insensitive). */
let searchQuery = $state("");

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

const filtered = $derived.by(() => {
	const normalizedQuery = searchQuery.trim().toLowerCase();
	return biases.filter((bias) => {
		if (!activeFamilies.has(bias.family)) return false;
		if (!activeDifficulties.has(bias.difficulty)) return false;
		if (normalizedQuery && !bias.title.toLowerCase().includes(normalizedQuery)) return false;
		return true;
	});
});

/** Formatted result count via Intl.PluralRules — selects the matching CLDR category. */
const resultsLabel = $derived.by(() => {
	const category = pluralRules.select(filtered.length);
	const template = labels.resultsCount[category] ?? labels.resultsCount.other ?? "";
	return template.replace("{count}", String(filtered.length));
});

/** True when any filter is narrowed (at least one family/difficulty disabled or search active). */
const hasActiveFilters = $derived(
	activeFamilies.size < familyKeys.length ||
		activeDifficulties.size < difficultyKeys.length ||
		searchQuery.trim().length > 0,
);

/** Restore all filters to their default state: everything enabled, search cleared. */
const resetFilters = () => {
	activeFamilies = new Set(familyKeys);
	activeDifficulties = new Set(difficultyKeys);
	searchQuery = "";
};
</script>

<FilterBar
  {families}
  {difficulties}
  {activeFamilies}
  {activeDifficulties}
  {searchQuery}
  onToggleFamily={toggleFamily}
  onToggleDifficulty={toggleDifficulty}
  onSearchChange={(value) => { searchQuery = value; }}
  labels={{
    family: labels.family,
    difficulty: labels.difficulty,
    search: labels.search,
    searchPlaceholder: labels.searchPlaceholder,
  }}
/>

<ResultsHeader
  {resultsLabel}
  hasResults={filtered.length > 0}
  {hasActiveFilters}
  onReset={resetFilters}
  label={labels.reset}
/>

{#if filtered.length === 0}
  <p class="py-12 text-center text-text-secondary">{labels.noResults}</p>
{:else}
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" use:autoAnimateAction>
    {#each filtered as bias, index (bias.href)}
      <BiasCard {...bias} delay={Math.min(index * 40, 400)} />
    {/each}
  </div>
{/if}
