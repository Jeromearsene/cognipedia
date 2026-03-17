<script lang="ts">
import { tilt } from "@levita-js/svelte";
import "levita-js/style.css";
import type { Difficulty, Family } from "@/lib/constants";
import { DIFFICULTY_COLORS, FAMILY_BG_CLASSES } from "@/lib/constants";

export interface BiasCardProps {
	/** URL to the bias page. */
	href: string;
	/** Display title of the bias. */
	title: string;
	/** Family key (e.g. "too-much-information"). */
	family: Family;
	/** Translated family label. */
	familyLabel: string;
	/** Difficulty key (e.g. "easy", "medium", "hard"). */
	difficulty: Difficulty;
	/** Translated difficulty label. */
	difficultyLabel: string;
}

const { href, title, family, familyLabel, difficulty, difficultyLabel }: BiasCardProps = $props();
</script>

<a
  {href}
  class="block rounded-xl border border-border bg-surface p-5 no-underline shadow-sm transition-shadow hover:shadow-md"
  use:tilt={{ scale: 1.02, glare: true, maxGlare: 0.15 }}
>
  <h3 class="mb-3 text-lg font-semibold text-text">{title}</h3>
  <div class="flex flex-wrap gap-2">
    <span class="rounded-full px-2.5 py-0.5 text-xs font-medium text-white {FAMILY_BG_CLASSES[family]}">
      {familyLabel}
    </span>
    <span class="rounded-full px-2.5 py-0.5 text-xs font-medium {DIFFICULTY_COLORS[difficulty]}">
      {difficultyLabel}
    </span>
  </div>
</a>
