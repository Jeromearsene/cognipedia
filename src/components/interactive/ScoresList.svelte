<script lang="ts">
import type { ScoreEntry } from "@/lib/types";

interface Props {
	scores: ScoreEntry[];
	/** Map bias slug → { title, href } for translated names and links. */
	biasMap: Record<string, { title: string; href: string }>;
	labels: {
		title: string;
		biasColumn: string;
		scoreColumn: string;
		noScores: string;
	};
}

let { scores, biasMap, labels }: Props = $props();
</script>

<div>
	<h2 class="mb-4 text-lg font-semibold">{labels.title}</h2>
	{#if scores.length === 0}
		<p class="text-text-secondary">{labels.noScores}</p>
	{:else}
		<table class="w-full text-left">
			<thead>
				<tr class="border-b border-border text-sm text-text-secondary">
					<th class="px-4 py-2 font-medium">{labels.biasColumn}</th>
					<th class="px-4 py-2 text-right font-medium">{labels.scoreColumn}</th>
				</tr>
			</thead>
			<tbody>
				{#each scores as score}
					{@const bias = biasMap[score.bias_slug]}
					<tr class="border-b border-border/50">
						<td class="px-4 py-2 font-medium">
							{#if bias}
								<a href={bias.href} class="no-underline hover:text-accent hover:underline">
									{bias.title}
								</a>
							{:else}
								{score.bias_slug}
							{/if}
						</td>
						<td class="px-4 py-2 text-right font-semibold text-accent">
							{score.total_score} / {1 + score.quiz_total}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
