<script lang="ts">
  import { tilt } from "@levita-js/svelte";
  import "levita-js/style.css";

  interface Props {
    /** URL to the bias page. */
    href: string;
    /** Display title of the bias. */
    title: string;
    /** Family key (e.g. "too-much-information"). */
    family: string;
    /** Translated family label. */
    familyLabel: string;
    /** Difficulty key (e.g. "easy", "medium", "hard"). */
    difficulty: string;
    /** Translated difficulty label. */
    difficultyLabel: string;
  }

  const { href, title, family, familyLabel, difficulty, difficultyLabel }: Props = $props();

  const difficultyColor: Record<string, string> = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-orange-100 text-orange-800",
    hard: "bg-red-100 text-red-800",
  };
</script>

<a
  {href}
  class="block rounded-xl border border-border bg-surface p-5 no-underline shadow-sm transition-shadow hover:shadow-md"
  use:tilt={{ scale: 1.02, glare: true, "max-glare": 0.15 }}
>
  <h3 class="mb-3 text-lg font-semibold text-text">{title}</h3>
  <div class="flex flex-wrap gap-2">
    <span
      class="rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
      style="background-color: var(--family-{family})"
    >
      {familyLabel}
    </span>
    <span class="rounded-full px-2.5 py-0.5 text-xs font-medium {difficultyColor[difficulty] ?? ''}">
      {difficultyLabel}
    </span>
  </div>
</a>
