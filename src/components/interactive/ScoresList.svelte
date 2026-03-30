<script lang="ts">
import type { ScoreEntry } from "@/lib/types";

interface Props {
	scores: ScoreEntry[];
	labels: {
		title: string;
		scoreColumn: string;
		noScores: string;
	};
}

let { scores, labels }: Props = $props();
</script>

<div>
	<h2 class="mb-4 text-lg font-semibold">{labels.title}</h2>
	{#if scores.length === 0}
		<p class="text-text-secondary">{labels.noScores}</p>
	{:else}
		<table class="w-full text-left">
			<thead>
				<tr class="border-b border-border text-sm text-text-secondary">
					<th class="px-4 py-2 font-medium">Bias</th>
					<th class="px-4 py-2 text-right font-medium">{labels.scoreColumn}</th>
				</tr>
			</thead>
			<tbody>
				{#each scores as score}
					<tr class="border-b border-border/50">
						<td class="px-4 py-2 font-medium">{score.bias_slug}</td>
						<td class="px-4 py-2 text-right font-semibold text-accent">
							{score.total_score} / {1 + score.quiz_total}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
