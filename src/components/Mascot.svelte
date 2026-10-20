<script lang="ts" module>
let nextGradientId = 0;
</script>

<script lang="ts">
/**
 * Cogni, Cognipedia's mascot: a single reusable SVG character with a few
 * animated poses, standing in for per-bias illustration. See the "Cogni, la
 * mascotte" design-system board for the full pose reference.
 *
 * Colors: the body and the face are drawn on the purple gradient, which is the
 * same in light and dark mode, so they stay fixed (binding them to `--color-text`
 * would turn the face near-white on purple in dark mode). They are exposed as
 * `--cogni-*` custom properties so a parent can override them. Only the elements
 * drawn on top of the page background follow the theme: sparkles use
 * `--color-accent-2` and the thought bubble uses `--color-text-secondary`.
 *
 * Styles (colors, layout, animations) are in src/styles/mascot.css, not in a scoped
 * <style>: see the note there.
 *
 * Accessibility: decorative by default (hidden from assistive tech). Pass `label`
 * when the mascot carries meaning that is not already in the surrounding text.
 */
type Pose = "idle" | "happy" | "confused" | "thinking";

interface Props {
	/** Which expression/animation to render. Defaults to "idle". */
	pose?: Pose;
	/** Width in px (height follows). Shrinks below this size if its container is narrower. */
	size?: number;
	/** Accessible name. When set, the mascot is exposed as an image instead of being hidden. */
	label?: string;
	/** Extra class names, e.g. for layout. */
	class?: string;
}

const { pose = "idle", size = 84, label, class: className = "" }: Props = $props();

// Each instance needs its own gradient id. `$props.id()` is not enough on its own: Astro
// renders every non-hydrated component in a separate Svelte render call, so all the
// server-rendered mascots of a page get the same id ("s1"). Browsers resolve `url(#id)`
// to the first match in the document, so if that first <defs> sits in a hidden subtree
// (display: none) the body gradient fails and the whole mascot body disappears.
// A per-module counter makes the id unique across render calls.
const uid = $props.id();
const gradientId = `cogni-gradient-${uid}-${nextGradientId++}`;

/** The "happy" pose closes its eyes; every other pose shares the same white eyes. */
const hasOpenEyes = $derived(pose !== "happy");
</script>

<!-- The wrapper <div> only carries the size. The pose motion is applied to the <g class="motion">
     inside the <svg> (see src/styles/mascot.css), so the vector is re-drawn at every frame. -->
<div
  class="mascot mascot-{pose} {className}"
  style="width: {size}px"
  role={label ? "img" : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : "true"}
>
  <svg class="mascot-svg" viewBox="0 0 160 160" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
        <stop class="body-from" offset="0" />
        <stop class="body-to" offset="1" />
      </linearGradient>
    </defs>

    <g class="motion">
      <circle cx="80" cy="90" r="62" fill="url(#{gradientId})" />
      <path class="brow" d="M38,55 Q55,35 80,45 Q105,35 122,55" stroke-width="4" stroke-linecap="round" />

      {#if hasOpenEyes}
        <circle class="eye" cx="60" cy="85" r="16" />
        <circle class="eye" cx="100" cy="85" r="16" />
      {/if}

      {#if pose === "idle"}
        <circle class="ink" cx="60" cy="86" r="7" />
        <circle class="ink" cx="100" cy="86" r="7" />
        <path class="ink-stroke" d="M60,112 Q80,124 100,112" stroke-width="4" stroke-linecap="round" />
      {:else if pose === "happy"}
        <path class="ink-stroke" d="M46,88 Q60,74 74,88" stroke-width="5" stroke-linecap="round" />
        <path class="ink-stroke" d="M86,88 Q100,74 114,88" stroke-width="5" stroke-linecap="round" />
        <path class="ink-stroke" d="M52,108 Q80,132 108,108" stroke-width="6" stroke-linecap="round" />
        <!-- The 45° rotation lives on the <rect>; the animation drives the wrapping <g>.
             Animating the <rect> itself would replace its transform and flatten the diamond. -->
        <g class="sparkle">
          <rect class="spark" x="22" y="40" width="9" height="9" transform="rotate(45 26 44)" />
        </g>
        <g class="sparkle sparkle-2">
          <rect class="spark" x="128" y="30" width="7" height="7" transform="rotate(45 131 33)" />
        </g>
        <g class="sparkle sparkle-3">
          <rect class="spark" x="118" y="110" width="6" height="6" transform="rotate(45 121 113)" />
        </g>
      {:else if pose === "confused"}
        <g class="swirl swirl-a">
          <path class="ink-stroke" d="M60,85 m-6,0 a6,6 0 1,1 12,0 a4,4 0 1,1 -8,0 a2,2 0 1,1 4,0" stroke-width="2" />
        </g>
        <g class="swirl swirl-b">
          <path class="ink-stroke" d="M100,85 m-6,0 a6,6 0 1,1 12,0 a4,4 0 1,1 -8,0 a2,2 0 1,1 4,0" stroke-width="2" />
        </g>
        <path class="ink-stroke" d="M58,114 q6,-8 12,0 q6,8 12,0 q6,-8 12,0" stroke-width="4" stroke-linecap="round" />
        <ellipse class="sweat" cx="118" cy="56" rx="5" ry="8" />
      {:else if pose === "thinking"}
        <circle class="ink" cx="57" cy="81" r="7" />
        <circle class="ink" cx="97" cy="81" r="7" />
        <path class="ink-stroke" d="M65,114 L95,114" stroke-width="4" stroke-linecap="round" />
        <circle class="ink-stroke" cx="122" cy="66" r="10" stroke-width="3" />
        <line class="ink-stroke" x1="129" y1="73" x2="138" y2="83" stroke-width="4" stroke-linecap="round" />
        <circle class="thought-dot thought-dot-1" cx="132" cy="26" r="4" />
        <circle class="thought-dot thought-dot-2" cx="142" cy="18" r="5" />
        <circle class="thought-dot thought-dot-3" cx="153" cy="10" r="6" />
      {/if}
    </g>
  </svg>
</div>
