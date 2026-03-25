<script lang="ts">
import type { PseudoEditorLabels } from "@/lib/labels";
import { userStore } from "@/lib/userStore.svelte";

interface Props {
	labels: PseudoEditorLabels;
}

let { labels }: Props = $props();
let editing = $state(false);
let draft = $state(userStore.pseudo ?? "");
let saving = $state(false);
let error = $state(false);

const startEdit = () => {
	draft = userStore.pseudo ?? "";
	error = false;
	editing = true;
};

const save = async () => {
	const trimmed = draft.trim();
	if (!trimmed || trimmed === userStore.pseudo) {
		editing = false;
		return;
	}

	saving = true;
	error = false;
	try {
		await userStore.updatePseudo(trimmed);
		editing = false;
	} catch (err) {
		console.error("[PseudoEditor] Failed to update pseudo:", err);
		error = true;
	} finally {
		saving = false;
	}
};

const handleKeydown = (e: KeyboardEvent) => {
	if (e.key === "Enter") save();
	if (e.key === "Escape") {
		editing = false;
	}
};
</script>

{#if editing}
	<div>
		<div class="flex items-center gap-2">
			<input
				type="text"
				bind:value={draft}
				class="rounded-lg border border-border bg-surface px-3 py-1.5 text-lg font-semibold"
				placeholder={labels.placeholder}
				maxlength="30"
				onkeydown={handleKeydown}
			/>
			<button
				class="cursor-pointer rounded bg-accent px-3 py-1.5 text-sm text-white disabled:opacity-50"
				disabled={saving}
				onclick={save}
			>
				{saving ? labels.saving : labels.save}
			</button>
		</div>
		{#if error}
			<p class="mt-1 text-sm text-red-600">Erreur lors de la sauvegarde</p>
		{/if}
	</div>
{:else}
	<button
		class="cursor-pointer border-none bg-transparent text-2xl font-bold text-text hover:text-accent"
		onclick={startEdit}
	>
		{userStore.pseudo} <span class="text-sm font-normal text-text-secondary">({labels.edit})</span>
	</button>
{/if}
