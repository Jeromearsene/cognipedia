<script lang="ts">
import type { BiasInteractiveLabels } from "@/lib/labels";
import type { Quiz as QuizData, Situation as SituationData } from "@/lib/schemas";
import { userStore } from "@/lib/userStore.svelte";
import Quiz from "./Quiz.svelte";
import RecoveryCodeModal from "./RecoveryCodeModal.svelte";
import Situation from "./Situation.svelte";

interface Props {
	biasSlug: string;
	profileUrl: string;
	situation?: SituationData;
	quiz?: QuizData;
	labels: BiasInteractiveLabels;
}

let { biasSlug, profileUrl, situation, quiz, labels }: Props = $props();

let situationScore: number | null = $state(null);
let submitState = $state<"idle" | "submitting" | "submitted" | "error">("idle");
let showRecoveryModal = $state(false);

const handleSituationComplete = (choseBiased: boolean) => {
	situationScore = choseBiased ? 0 : 1;
};

const handleQuizComplete = async (correct: number, total: number) => {
	submitState = "submitting";

	try {
		if (!userStore.isRegistered) {
			await userStore.register();
		}

		const response = await fetch("/api/scores", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userUuid: userStore.uuid,
				biasSlug,
				situationScore: situationScore ?? 0,
				quizCorrect: correct,
				quizTotal: total,
			}),
		});

		if (!response.ok) throw new Error("Score submission failed");

		submitState = "submitted";

		if (!userStore.recoveryCodeSeen) {
			showRecoveryModal = true;
		}
	} catch (err) {
		console.error("[BiasInteractive] Score submission failed:", err);
		submitState = "error";
	}
};

const handleRecoveryDismiss = () => {
	showRecoveryModal = false;
	// Reload so the server reads the newly set cookie and renders the "Profile" nav link
	window.location.reload();
};
</script>

{#if situation}
	<section class="mt-12">
		<h2 class="mb-4 text-2xl font-bold">{labels.situationTitle}</h2>
		<Situation data={situation} onComplete={handleSituationComplete} />
	</section>
{/if}

{#if quiz}
	<section class="mt-12">
		<h2 class="mb-4 text-2xl font-bold">{labels.quizTitle}</h2>
		<Quiz data={quiz} labels={labels.quiz} onComplete={handleQuizComplete} />
	</section>

	{#if submitState === "submitting"}
		<p class="mt-4 text-center text-text-secondary">{labels.score.submitting}</p>
	{:else if submitState === "submitted"}
		<p class="mt-4 text-center font-medium text-emerald-600">{labels.score.submitted}</p>
	{:else if submitState === "error"}
		<p class="mt-4 text-center text-red-600">{labels.score.error}</p>
	{/if}
{/if}

{#if showRecoveryModal}
	<RecoveryCodeModal
		recoveryCode={userStore.recoveryCode ?? ""}
		{profileUrl}
		labels={labels.recovery}
		onDismiss={handleRecoveryDismiss}
	/>
{/if}
