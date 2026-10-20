<script lang="ts">
import { onMount } from "svelte";
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

const uid = $props.id();
const titleId = `recovery-title-${uid}`;
let panel = $state<HTMLElement>();

/** Keep Tab/Shift+Tab inside the dialog while it is open. */
const trapFocus = (event: KeyboardEvent) => {
	if (event.key !== "Tab" || !panel) return;
	const focusable = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
	if (focusable.length === 0) return;
	const first = focusable[0];
	const last = focusable[focusable.length - 1];
	if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
		event.preventDefault();
		last.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first.focus();
	}
};

// Move focus into the dialog when it appears and trap Tab while it is open.
onMount(() => {
	const node = panel;
	node?.focus();
	node?.addEventListener("keydown", trapFocus);
	return () => node?.removeEventListener("keydown", trapFocus);
});

const dismiss = () => {
	userStore.markRecoveryCodeSeen();
	onDismiss();
};
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
	role="dialog"
	aria-modal="true"
	aria-labelledby={titleId}
>
	<div bind:this={panel} tabindex="-1" class="w-full max-w-md rounded-xl border border-border bg-surface p-8 shadow-2xl">
		<h2 id={titleId} class="mb-4 text-xl font-bold">{labels.title}</h2>
		<p class="mb-4 text-sm text-text-secondary">{labels.description}</p>

		<div class="my-6 rounded-lg border border-border bg-bg p-4 text-center">
			<p class="font-mono text-2xl font-bold tracking-widest">{recoveryCode}</p>
			<div class="mt-3">
				<CopyButton text={recoveryCode} label={labels.copy} copiedLabel={labels.copied} />
			</div>
		</div>

		<p class="mb-6 text-sm text-text-secondary">
			{labels.profileHint} <a href={profileUrl} class="text-accent underline hover:no-underline">{labels.profileLink}</a>.
		</p>

		<button
			class="w-full cursor-pointer rounded-lg bg-accent px-4 py-3 font-medium text-on-accent transition-colors hover:opacity-80"
			onclick={dismiss}
		>
			{labels.dismiss}
		</button>
	</div>
</div>
