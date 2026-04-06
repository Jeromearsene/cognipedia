<script lang="ts">
import type { ProfilePageLabels } from "@/lib/labels";
import { userScoresResponseSchema } from "@/lib/schemas";
import type { ScoreEntry } from "@/lib/types";
import { userStore } from "@/lib/userStore.svelte";
import { profile_progression_biases } from "@/paraglide/messages";
import PseudoEditor from "./PseudoEditor.svelte";
import RecoveryCodeSection from "./RecoveryCodeSection.svelte";
import RecoveryForm from "./RecoveryForm.svelte";
import ScoresList from "./ScoresList.svelte";

interface Props {
	totalBiasCount: number;
	/** Map bias slug → { title, href } for displaying translated titles and links. */
	biasMap: Record<string, { title: string; href: string }>;
	labels: ProfilePageLabels;
}

let { totalBiasCount, biasMap, labels }: Props = $props();

let scores = $state<ScoreEntry[]>([]);
let totalScore = $state(0);
let loading = $state(true);

const fetchScores = async () => {
	if (!userStore.uuid) {
		loading = false;
		return;
	}

	try {
		const response = await fetch(`/api/user-scores?user=${userStore.uuid}`);
		if (response.ok) {
			const data = userScoresResponseSchema.parse(await response.json());
			scores = data.scores;
			totalScore = data.totalScore;
		}
	} catch (err) {
		console.error("[ProfilePage] Failed to fetch scores:", err);
	} finally {
		loading = false;
	}
};

$effect(() => {
	userStore.load();
	fetchScores();
});

const progressPercent = $derived(
	totalBiasCount > 0 ? Math.round((scores.length / totalBiasCount) * 100) : 0,
);
</script>

{#if !userStore.isRegistered}
	<div class="mx-auto max-w-md">
		<p class="mb-2 text-xl font-bold">{labels.notRegistered}</p>
		<p class="mb-8 text-text-secondary">{labels.notRegisteredHint}</p>
		<RecoveryForm
			labels={labels.recoveryForm}
			onRecovered={fetchScores}
		/>
	</div>
{:else if loading}
	<p class="py-12 text-center text-text-secondary">...</p>
{:else}
	<div class="mx-auto max-w-2xl space-y-8">
		<PseudoEditor labels={labels.pseudo} />

		<RecoveryCodeSection
			labels={{
				title: labels.recoveryCodeLabel,
				hint: labels.recoveryHint,
				copy: labels.copy,
				copied: labels.copied,
			}}
		/>

		<div>
			<h2 class="mb-2 text-lg font-semibold">{labels.progression}</h2>
			<div class="mb-1 h-3 w-full overflow-hidden rounded-full bg-border">
				<div
					class="h-full rounded-full bg-accent transition-all duration-500"
					style="width: {progressPercent}%"
				></div>
			</div>
			<p class="text-sm text-text-secondary">
				{profile_progression_biases({ count: scores.length, total: totalBiasCount })}
			</p>
			<p class="mt-1 text-sm font-medium">{labels.totalScore} : {totalScore}</p>
		</div>

		<ScoresList
			{scores}
			{biasMap}
			labels={{
				title: labels.completedBiases,
				biasColumn: labels.biasColumn,
				scoreColumn: labels.scoreColumn,
				noScores: labels.noScores,
			}}
		/>
	</div>
{/if}
