<script lang="ts">
interface LeaderboardEntry {
	pseudo: string;
	total: number;
}

interface Props {
	labels: {
		title: string;
		rank: string;
		pseudo: string;
		score: string;
		loading: string;
		empty: string;
	};
}

const { labels }: Props = $props();

let entries = $state<LeaderboardEntry[]>([]);
let loading = $state(true);
let error = $state(false);

const fetchLeaderboard = async () => {
	loading = true;
	error = false;
	try {
		const response = await fetch("/api/leaderboard?limit=20");
		if (!response.ok) throw new Error("Failed to fetch");
		entries = await response.json();
	} catch {
		error = true;
	} finally {
		loading = false;
	}
};

$effect(() => {
	fetchLeaderboard();
});

/** Top 3 rank styling. */
const rankStyle = (index: number): string => {
	if (index === 0) return "text-yellow-500 font-bold";
	if (index === 1) return "text-gray-400 font-bold";
	if (index === 2) return "text-amber-600 font-bold";
	return "text-text-secondary";
};
</script>

{#if loading}
  <p class="py-12 text-center text-text-secondary">{labels.loading}</p>
{:else if error || entries.length === 0}
  <p class="py-12 text-center text-text-secondary">{labels.empty}</p>
{:else}
  <div class="overflow-x-auto">
    <table class="w-full text-left">
      <thead>
        <tr class="border-b border-border text-sm text-text-secondary">
          <th class="px-4 py-3 font-medium">{labels.rank}</th>
          <th class="px-4 py-3 font-medium">{labels.pseudo}</th>
          <th class="px-4 py-3 text-right font-medium">{labels.score}</th>
        </tr>
      </thead>
      <tbody>
        {#each entries as entry, index}
          <tr class="border-b border-border/50 transition-colors hover:bg-surface">
            <td class="px-4 py-3 {rankStyle(index)}">{index + 1}</td>
            <td class="px-4 py-3 font-medium text-text">{entry.pseudo}</td>
            <td class="px-4 py-3 text-right text-accent font-semibold">{entry.total}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
