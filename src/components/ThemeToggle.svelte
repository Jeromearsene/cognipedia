<script lang="ts">
import { Monitor, Moon, Sun } from "lucide-svelte";
export interface ThemeLabels {
	group: string;
	auto: string;
	light: string;
	dark: string;
}

interface Props {
	/** Translated labels, resolved server-side so they match the page locale on hydration. */
	labels: ThemeLabels;
}

const { labels }: Props = $props();

type ThemeMode = "auto" | "light" | "dark";

let mode = $state<ThemeMode>("auto");

/** Toggle the `dark` class on <html> based on the chosen theme or system preference. */
const applyTheme = (themeMode: ThemeMode) => {
	const isDark =
		themeMode === "dark" ||
		(themeMode === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
	document.documentElement.classList.toggle("dark", isDark);
};

$effect(() => {
	const stored = localStorage.getItem("theme");
	if (stored === "light" || stored === "dark") mode = stored;
	applyTheme(mode);

	// In auto mode, listen for OS-level theme changes to react in real time.
	if (mode === "auto") {
		const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
		const handler = () => applyTheme("auto");
		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}
});

/** Switch theme and persist choice. "auto" clears storage to fall back to system preference. */
const setMode = (themeMode: ThemeMode) => {
	mode = themeMode;
	applyTheme(themeMode);
	if (themeMode === "auto") localStorage.removeItem("theme");
	else localStorage.setItem("theme", themeMode);
};
</script>

<div role="group" aria-label={labels.group} class="flex gap-0.5 rounded-xl border border-border bg-surface p-0.5">
  <button
    type="button"
    aria-label={labels.auto}
    aria-pressed={mode === 'auto'}
    onclick={() => setMode('auto')}
    class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors {mode === 'auto' ? 'bg-accent text-on-accent' : 'text-text-secondary hover:text-text'}"
  >
    <Monitor size={14} />
  </button>
  <button
    type="button"
    aria-label={labels.light}
    aria-pressed={mode === 'light'}
    onclick={() => setMode('light')}
    class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors {mode === 'light' ? 'bg-accent text-on-accent' : 'text-text-secondary hover:text-text'}"
  >
    <Sun size={14} />
  </button>
  <button
    type="button"
    aria-label={labels.dark}
    aria-pressed={mode === 'dark'}
    onclick={() => setMode('dark')}
    class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors {mode === 'dark' ? 'bg-accent text-on-accent' : 'text-text-secondary hover:text-text'}"
  >
    <Moon size={14} />
  </button>
</div>
