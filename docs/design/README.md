# Design system — visual redesign

Visual reference for the redesign implemented in this repository (see `src/styles/global.css` and `src/styles/families.css` for the actual tokens). The captures below are the validated mockups the implementation is based on. They show the French UI.

| # | Board | Preview |
|---|-------|---------|
| 1 | [Foundations](01-fondations.webp) — palette, typography, shadows, dark mode | Color tokens, Baloo 2 / Figtree, CSS grain |
| 2 | [Components](02-composants.webp) — before / after | Bias card, difficulty badges, buttons |
| 3 | [Mascot](03-mascotte.webp) — Cogni | The 4 animated poses (idle, correct answer, bias detected, thinking) |
| 4 | [Home](04-accueil.webp) — light | Hero, catalog grouped by family |
| 5 | [Home — dark](05-accueil-sombre.webp) | Same page in dark mode |
| 6 | [Bias page](06-fiche-biais.webp) | Example: confirmation bias |

## Key decisions

- **Palette**: indigo (`#4F46E5`) is unchanged as the accent, but background/surface/borders are recolored in light lavender instead of a cold gray, so they work with the accent rather than against it.
- **Family colors**: two-tone gradients, deliberately kept to the cool half of the color wheel (blue → indigo → violet → cyan). Red/orange/amber/green stay reserved for statuses (difficulty, right/wrong answer), so a family color is never read as a correctness signal, even by association.
- **Typography**: Baloo 2 (headings, mascot) + Figtree (body text), replacing Fraunces/Space Grotesk used on `staging`. Both are self-hosted through `@fontsource-variable` packages, with no request to a third-party CDN.
- **Depth**: indigo-tinted shadows instead of neutral gray ones, plus a very light SVG grain (~3% perceived opacity) on the background, served as a small static file (`public/grain.svg`).
- **Mascot — Cogni**: a single SVG + CSS character reused everywhere (no per-bias illustration), with 4 poses: idle, correct answer, small bias detected, thinking.
- **Dark mode**: same tokens, inverted values — families get lighter to stay readable on a dark background, and shadows lose their indigo tint in favor of plain black. Cogni's gradient is the same in both themes.
- **Sizing**: components use Tailwind's predefined scale (spacing, font sizes, radii) rather than hardcoded pixel values.

Two suggestions were explicitly ruled out during the design: an indigo border on the "in progress" card, and an "Explore the biases" button in the hero (the anchor to the catalog is enough).
