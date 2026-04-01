<script lang="ts">
import { Monitor, Moon, Sun } from "lucide-svelte";
import { onMount } from "svelte";

type ThemeMode = "auto" | "light" | "dark";

let mode = $state<ThemeMode>("auto");

/** Toggle the `dark` class on <html> based on the chosen theme or system preference. */
const applyTheme = (themeMode: ThemeMode) => {
	const isDark =
		themeMode === "dark" ||
		(themeMode === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
	document.documentElement.classList.toggle("dark", isDark);
};

onMount(() => {
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

<div class="flex gap-0.5 rounded-xl border border-border bg-surface p-0.5">
  <button
    onclick={() => setMode('auto')}
    class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors {mode === 'auto' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text'}"
  >
    <Monitor size={14} />
    Auto
  </button>
  <button
    onclick={() => setMode('light')}
    class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors {mode === 'light' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text'}"
  >
    <Sun size={14} />
    Light
  </button>
  <button
    onclick={() => setMode('dark')}
    class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors {mode === 'dark' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text'}"
  >
    <Moon size={14} />
    Dark
  </button>
</div>
