<script lang="ts">
import { userStore } from "@/lib/userStore.svelte";
import CopyButton from "./CopyButton.svelte";

interface Props {
	labels: {
		title: string;
		hint: string;
		copy: string;
		copied: string;
	};
}

let { labels }: Props = $props();
</script>

<div class="rounded-lg border border-border bg-surface p-4">
	<p class="mb-1 text-xs uppercase tracking-wider text-text-secondary">{labels.title}</p>
	<div class="flex items-center gap-3">
		<span class="font-mono text-lg tracking-widest">{userStore.recoveryCode}</span>
		<CopyButton
			text={userStore.recoveryCode ?? ""}
			label={labels.copy}
			copiedLabel={labels.copied}
			class="px-3 py-1"
		/>
	</div>
	<p class="mt-3 text-sm text-text-secondary">{labels.hint}</p>
</div>
