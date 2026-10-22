<script lang="ts">
import { Menu, X } from "lucide-svelte";
import ThemeToggle, { type ThemeLabels } from "./ThemeToggle.svelte";

interface NavLink {
	label: string;
	href: string;
	active: boolean;
}

interface LangLink {
	lang: string;
	href: string;
	active: boolean;
}

interface Props {
	navLinks: NavLink[];
	langLinks: LangLink[];
	labels: { title: string; open: string; close: string; theme: ThemeLabels };
}

const { navLinks, langLinks, labels }: Props = $props();

let open = $state(false);
let burger = $state<HTMLButtonElement>();
let dialog = $state<HTMLDivElement>();
let closeButton = $state<HTMLButtonElement>();

const toggle = () => {
	open = !open;
	document.body.style.overflow = open ? "hidden" : "";
};

/** Close the menu and hand focus back to the burger that opened it. */
const close = () => {
	open = false;
	document.body.style.overflow = "";
	burger?.focus();
};

// Move focus into the dialog when it opens.
$effect(() => {
	if (open) closeButton?.focus();
});

// Never leave the page scroll-locked if the menu is unmounted while open.
$effect(() => () => {
	document.body.style.overflow = "";
});

/** Escape closes the menu; Tab/Shift+Tab are kept inside the dialog while it is open. */
const onKeydown = (event: KeyboardEvent) => {
	if (!open || !dialog) return;
	if (event.key === "Escape") {
		event.preventDefault();
		close();
		return;
	}
	if (event.key !== "Tab") return;
	const focusable = dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
	if (focusable.length === 0) return;
	const first = focusable[0];
	const last = focusable[focusable.length - 1];
	if (event.shiftKey && document.activeElement === first) {
		event.preventDefault();
		last.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first.focus();
	}
};
</script>

<svelte:window onkeydown={onKeydown} />

<!-- Burger button -->
<button
	bind:this={burger}
	onclick={toggle}
	class="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-text transition-colors hover:bg-bg md:hidden"
	aria-label={labels.open}
	aria-expanded={open}
	aria-haspopup="dialog"
	type="button"
>
	<Menu size={24} aria-hidden="true" />
</button>

<!-- Fullscreen overlay menu -->
{#if open}
	<div
		bind:this={dialog}
		class="fixed inset-0 z-50 flex flex-col bg-bg md:hidden"
		role="dialog"
		aria-modal="true"
		aria-label={labels.title}
	>
		<div class="flex justify-end p-4">
			<button
				bind:this={closeButton}
				onclick={close}
				class="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-text transition-colors hover:bg-bg"
				aria-label={labels.close}
				type="button"
			>
				<X size={24} aria-hidden="true" />
			</button>
		</div>

		<nav class="flex flex-1 flex-col items-center justify-center gap-6" aria-label={labels.title}>
			{#each navLinks as { label, href, active }}
				<a
					{href}
					onclick={close}
					aria-current={active ? "page" : undefined}
					class="font-heading text-2xl font-semibold no-underline transition-colors {active
						? 'text-accent'
						: 'text-text hover:text-accent'}"
				>
					{label}
				</a>
			{/each}
		</nav>

		<div class="flex flex-col items-center gap-6 pb-8">
			<ThemeToggle labels={labels.theme} />
			<div class="flex justify-center gap-4 text-sm">
				{#each langLinks as { lang, href, active }}
					<a
						{href}
						hreflang={lang}
						{lang}
						aria-current={active ? "true" : undefined}
						class="uppercase no-underline transition-colors {active
							? 'font-bold text-accent'
							: 'text-text-secondary hover:text-accent'}"
					>
						{lang}
					</a>
				{/each}
			</div>
		</div>
	</div>
{/if}
