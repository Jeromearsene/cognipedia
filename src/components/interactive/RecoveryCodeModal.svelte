<script lang="ts">
import type { RecoveryModalLabels } from "@/lib/labels";
import { userStore } from "@/lib/userStore.svelte";
import CopyButton from "./CopyButton.svelte";

interface Props {
	recoveryCode: string;
	profileUrl: string;
	labels: RecoveryModalLabels;
	onDismiss: () => void;
}

let { recoveryCode, profileUrl, labels, onDismiss }: Props = $props();

const dismiss = () => {
	userStore.markRecoveryCodeSeen();
	onDismiss();
};
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
	role="dialog"
	aria-modal="true"
>
	<div class="w-full max-w-md rounded-xl border border-border bg-surface p-8 shadow-2xl">
		<h2 class="mb-4 text-xl font-bold">{labels.title}</h2>
		<p class="mb-4 text-sm text-text-secondary">{labels.description}</p>

		<div class="my-6 rounded-lg border border-border bg-bg p-4 text-center">
			<p class="font-mono text-2xl font-bold tracking-widest">{recoveryCode}</p>
			<div class="mt-3">
				<CopyButton text={recoveryCode} label={labels.copy} copiedLabel={labels.copied} />
			</div>
		</div>

		<p class="mb-6 text-sm text-text-secondary">
			{labels.profileHint} <a href={profileUrl} class="text-accent hover:underline">Profil</a>.
		</p>

		<button
			class="w-full cursor-pointer rounded-lg bg-accent px-4 py-3 font-medium text-white transition-colors hover:opacity-80"
			onclick={dismiss}
		>
			{labels.dismiss}
		</button>
	</div>
</div>
