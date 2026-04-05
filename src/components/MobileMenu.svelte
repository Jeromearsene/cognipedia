<script lang="ts">
import { Menu, X } from "lucide-svelte";
import ThemeToggle from "./ThemeToggle.svelte";

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
}

const { navLinks, langLinks }: Props = $props();

let open = $state(false);

const toggle = () => {
	open = !open;
	document.body.style.overflow = open ? "hidden" : "";
};

const close = () => {
	open = false;
	document.body.style.overflow = "";
};
</script>

<!-- Burger button -->
<button
	onclick={toggle}
	class="cursor-pointer rounded-lg border border-border bg-surface p-2 text-text transition-colors hover:bg-bg lg:hidden"
	aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
	aria-expanded={open}
	type="button"
>
	{#if open}
		<X size={24} />
	{:else}
		<Menu size={24} />
	{/if}
</button>

<!-- Fullscreen overlay menu -->
{#if open}
	<div
		class="fixed inset-0 z-50 flex flex-col bg-bg lg:hidden"
		role="dialog"
		aria-modal="true"
	>
		<div class="flex justify-end p-4">
			<button
				onclick={close}
				class="cursor-pointer rounded-lg border border-border bg-surface p-2 text-text transition-colors hover:bg-bg"
				aria-label="Fermer le menu"
				type="button"
			>
				<X size={24} />
			</button>
		</div>

		<nav class="flex flex-1 flex-col items-center justify-center gap-6">
			{#each navLinks as { label, href, active }}
				<a
					{href}
					class="font-heading text-2xl font-semibold no-underline transition-colors {active
						? 'text-accent'
						: 'text-text hover:text-accent'}"
				>
					{label}
				</a>
			{/each}
		</nav>

		<div class="flex flex-col items-center gap-6 pb-8">
			<ThemeToggle />
			<div class="flex justify-center gap-4 text-sm">
				{#each langLinks as { lang, href, active }}
					<a
						{href}
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
