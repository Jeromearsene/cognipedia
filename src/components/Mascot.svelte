<script lang="ts">
/**
 * Cogni, Cognipedia's mascot: a single reusable SVG character with a few
 * animated poses, standing in for per-bias illustration. See the "Cogni, la
 * mascotte" design-system board for the full pose reference.
 */
type Pose = "idle" | "happy" | "confused" | "thinking";

interface Props {
	/** Which expression/animation to render. Defaults to "idle". */
	pose?: Pose;
	/** Pixel size (width = height). Defaults to 84. */
	size?: number;
	/** Extra class names, e.g. for layout. */
	class?: string;
}

const { pose = "idle", size = 84, class: className = "" }: Props = $props();

// Each instance needs its own gradient id — reusing one across multiple mascots on
// the same page would make later instances point at the first one's <defs>.
// `$props.id()` is stable between SSR and hydration, unlike Math.random().
const uid = $props.id();
const gradientId = `cogni-gradient-${uid}`;
</script>

<div
  class="mascot mascot-{pose} {className}"
  style="width: {size}px; height: {size}px"
  aria-hidden="true"
>
  <svg width={size} height={size} viewBox="0 0 160 160">
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#8B7CF6" />
        <stop offset="1" stop-color="#4F46E5" />
      </linearGradient>
    </defs>

    <circle cx="80" cy="90" r="62" fill="url(#{gradientId})" />
    <path
      d="M38,55 Q55,35 80,45 Q105,35 122,55"
      stroke="#2A2470"
      stroke-width="4"
      fill="none"
      stroke-linecap="round"
      opacity="0.3"
    />

    {#if pose === "idle"}
      <circle cx="60" cy="85" r="16" fill="#ffffff" />
      <circle cx="100" cy="85" r="16" fill="#ffffff" />
      <circle cx="60" cy="86" r="7" fill="#1E1B2E" />
      <circle cx="100" cy="86" r="7" fill="#1E1B2E" />
      <path
        d="M60,112 Q80,124 100,112"
        stroke="#1E1B2E"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
      />
    {:else if pose === "happy"}
      <path d="M46,88 Q60,74 74,88" stroke="#1E1B2E" stroke-width="5" fill="none" stroke-linecap="round" />
      <path d="M86,88 Q100,74 114,88" stroke="#1E1B2E" stroke-width="5" fill="none" stroke-linecap="round" />
      <path d="M52,108 Q80,132 108,108" stroke="#1E1B2E" stroke-width="6" fill="none" stroke-linecap="round" />
      <rect class="sparkle" x="22" y="40" width="9" height="9" fill="#F5A623" transform="rotate(45 26 44)" />
      <rect class="sparkle sparkle-2" x="128" y="30" width="7" height="7" fill="#F5A623" transform="rotate(45 131 33)" />
      <rect class="sparkle sparkle-3" x="118" y="110" width="6" height="6" fill="#F5A623" transform="rotate(45 121 113)" />
    {:else if pose === "confused"}
      <circle cx="60" cy="85" r="16" fill="#ffffff" />
      <circle cx="100" cy="85" r="16" fill="#ffffff" />
      <g class="swirl swirl-a">
        <path d="M60,85 m-6,0 a6,6 0 1,1 12,0 a4,4 0 1,1 -8,0 a2,2 0 1,1 4,0" stroke="#1E1B2E" stroke-width="2" fill="none" />
      </g>
      <g class="swirl swirl-b">
        <path d="M100,85 m-6,0 a6,6 0 1,1 12,0 a4,4 0 1,1 -8,0 a2,2 0 1,1 4,0" stroke="#1E1B2E" stroke-width="2" fill="none" />
      </g>
      <path d="M58,114 q6,-8 12,0 q6,8 12,0 q6,-8 12,0" stroke="#1E1B2E" stroke-width="4" fill="none" stroke-linecap="round" />
      <ellipse cx="118" cy="56" rx="5" ry="8" fill="#5B8DEF" opacity="0.85" />
    {:else if pose === "thinking"}
      <circle cx="60" cy="85" r="16" fill="#ffffff" />
      <circle cx="100" cy="85" r="16" fill="#ffffff" />
      <circle cx="57" cy="81" r="7" fill="#1E1B2E" />
      <circle cx="97" cy="81" r="7" fill="#1E1B2E" />
      <path d="M65,114 L95,114" stroke="#1E1B2E" stroke-width="4" stroke-linecap="round" />
      <circle cx="122" cy="66" r="10" stroke="#1E1B2E" stroke-width="3" fill="none" />
      <line x1="129" y1="73" x2="138" y2="83" stroke="#1E1B2E" stroke-width="4" stroke-linecap="round" />
      <circle class="thought-dot thought-dot-1" cx="132" cy="26" r="4" fill="#6F6B85" />
      <circle class="thought-dot thought-dot-2" cx="142" cy="18" r="5" fill="#6F6B85" />
      <circle class="thought-dot thought-dot-3" cx="153" cy="10" r="6" fill="#6F6B85" />
    {/if}
  </svg>
</div>

<style>
  .mascot-idle {
    animation: cogni-idle 2.6s ease-in-out infinite;
  }

  .mascot-happy {
    animation: cogni-pulse 1.8s ease-in-out infinite;
  }

  .mascot-confused {
    animation: cogni-wobble 1.1s ease-in-out infinite;
  }

  .swirl {
    transform-box: fill-box;
  }

  .swirl-a {
    transform-origin: center;
    animation: cogni-spin 1.6s linear infinite;
  }

  .swirl-b {
    transform-origin: center;
    animation: cogni-spin 1.6s linear infinite reverse;
  }

  .sparkle {
    transform-box: fill-box;
    transform-origin: center;
    animation: sparkle 1.4s ease-in-out infinite;
  }

  .sparkle-2 {
    animation-delay: 0.3s;
  }

  .sparkle-3 {
    animation-delay: 0.6s;
  }

  .thought-dot {
    animation: thought-dot 1.8s ease-in-out infinite;
  }

  .thought-dot-2 {
    animation-delay: 0.2s;
  }

  .thought-dot-3 {
    animation-delay: 0.4s;
  }

  @keyframes cogni-idle {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }

  @keyframes cogni-pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.06);
    }
  }

  @keyframes cogni-wobble {
    0%,
    100% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(5deg);
    }
  }

  @keyframes cogni-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes sparkle {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(0.7) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.15) rotate(20deg);
    }
  }

  @keyframes thought-dot {
    0%,
    30% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    70%,
    100% {
      opacity: 0.2;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mascot-idle,
    .mascot-happy,
    .mascot-confused,
    .swirl-a,
    .swirl-b,
    .sparkle,
    .thought-dot {
      animation: none !important;
    }
  }
</style>
