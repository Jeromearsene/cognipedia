---
"cognipedia": patch
---

Fix the mascot rendering in production: it was black and faceless in the quiz (its scoped CSS was not shipped for a component only rendered client-side, so its styles now live in `src/styles/mascot.css`), its body could disappear when the first mascot of a page sat in a hidden section (each instance now gets a unique gradient id), and its animations did not run or looked stepped (reduced motion is now an opt-out instead of an opt-in, and in the browser a canvas redraws the mascot from the SVG at every frame, because Firefox shows small slow movements of SVG content in visible steps).
