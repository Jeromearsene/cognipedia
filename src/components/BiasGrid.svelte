<script lang="ts">
import BiasCard from "./BiasCard.svelte";

interface BiasItem {
	href: string;
	title: string;
	family: string;
	familyLabel: string;
	difficulty: string;
	difficultyLabel: string;
}

interface FamilyOption {
	key: string;
	label: string;
}

interface DifficultyOption {
	key: string;
	label: string;
}

interface Props {
	biases: BiasItem[];
	families: FamilyOption[];
	difficulties: DifficultyOption[];
	labels: {
		family: string;
		difficulty: string;
		noResults: string;
	};
}

const { biases, families, difficulties, labels }: Props = $props();

// svelte-ignore state_referenced_locally — props are static (from Astro), won't change after mount
const familyKeys = families.map((f) => f.key);
// svelte-ignore state_referenced_locally
const difficultyKeys = difficulties.map((d) => d.key);

/** Active family filters — all enabled by default. */
let activeFamilies = $state(new Set(familyKeys));
/** Active difficulty filters — all enabled by default. */
let activeDifficulties = $state(new Set(difficultyKeys));

const toggleFamily = (key: string) => {
	const next = new Set(activeFamilies);
	if (next.has(key)) next.delete(key);
	else next.add(key);
	activeFamilies = next;
};

const toggleDifficulty = (key: string) => {
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

<div class="mb-6 flex flex-wrap gap-6">
  <div>
    <span class="mb-2 block text-sm font-medium text-text-secondary">{labels.family}</span>
    <div class="flex flex-wrap gap-2">
      {#each families as { key, label }}
        <button
          class="rounded-full border px-3 py-1 text-sm transition-colors {activeFamilies.has(key)
            ? 'border-transparent text-white'
            : 'border-border bg-surface text-text-secondary'}"
          style={activeFamilies.has(key) ? `background-color: var(--family-${key})` : ""}
          onclick={() => toggleFamily(key)}
        >
          {label}
        </button>
      {/each}
    </div>
  </div>

  <div>
    <span class="mb-2 block text-sm font-medium text-text-secondary">{labels.difficulty}</span>
    <div class="flex flex-wrap gap-2">
      {#each difficulties as { key, label }}
        <button
          class="rounded-full border px-3 py-1 text-sm transition-colors {activeDifficulties.has(key)
            ? 'border-accent bg-accent text-white'
            : 'border-border bg-surface text-text-secondary'}"
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
