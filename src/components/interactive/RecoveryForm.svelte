<script lang="ts">
import { isValidRecoveryCode } from "@/lib/identity";
import type { RecoveryFormLabels } from "@/lib/labels";
import { userStore } from "@/lib/userStore.svelte";

interface Props {
	labels: RecoveryFormLabels;
	onRecovered?: () => void;
}

let { labels, onRecovered }: Props = $props();
let code = $state("");
let status = $state<"idle" | "loading" | "success" | "error-invalid" | "error-not-found">("idle");

const handleSubmit = async () => {
	const trimmed = code.trim().toUpperCase();

	if (!isValidRecoveryCode(trimmed)) {
		status = "error-invalid";
		return;
	}

	status = "loading";

	try {
		await userStore.recover(trimmed);
		status = "success";
		onRecovered?.();
	} catch (err) {
		console.error("[RecoveryForm] Recovery failed:", err);
		status = "error-not-found";
	}
};
</script>

<div>
	<h3 class="mb-4 text-lg font-semibold">{labels.title}</h3>
	<form class="flex gap-2" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
		<input
			type="text"
			bind:value={code}
			placeholder={labels.placeholder}
			class="flex-1 rounded-lg border border-border bg-surface px-4 py-2 font-mono uppercase tracking-wider"
			maxlength="15"
		/>
		<button
			type="submit"
			class="cursor-pointer rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:opacity-80 disabled:opacity-50"
			disabled={status === "loading"}
		>
			{labels.submit}
		</button>
	</form>

	{#if status === "error-invalid"}
		<p class="mt-2 text-sm text-red-600">{labels.errorInvalid}</p>
	{:else if status === "error-not-found"}
		<p class="mt-2 text-sm text-red-600">{labels.errorNotFound}</p>
	{:else if status === "success"}
		<p class="mt-2 text-sm font-medium text-emerald-600">{labels.success}</p>
	{/if}
</div>
