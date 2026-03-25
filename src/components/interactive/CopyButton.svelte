<script lang="ts">
interface Props {
	/** Text to copy to clipboard. */
	text: string;
	/** Default button label. */
	label: string;
	/** Label shown after copying. */
	copiedLabel: string;
	/** Optional CSS classes for the button. */
	class?: string;
}

let { text, label, copiedLabel, class: className = "" }: Props = $props();
let copied = $state(false);

const copy = async () => {
	await navigator.clipboard.writeText(text);
	copied = true;
	setTimeout(() => {
		copied = false;
	}, 2000);
};
</script>

<button
	class="cursor-pointer rounded px-4 py-1.5 text-sm text-white transition-all duration-300 hover:opacity-80 {copied ? 'bg-emerald-500 scale-105' : 'bg-accent'} {className}"
	onclick={copy}
>
	{#if copied}
		<span class="inline-flex items-center gap-1">
			<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
			</svg>
			{copiedLabel}
		</span>
	{:else}
		{label}
	{/if}
</button>
