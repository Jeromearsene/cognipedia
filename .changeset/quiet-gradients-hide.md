---
"cognipedia": patch
---

Fix the mascot rendering in production: it was black and faceless in the quiz (its scoped CSS was not shipped for a component only rendered client-side, so its styles now live in `src/styles/mascot.css`), its body could disappear when the first mascot of a page sat in a hidden section (each instance now gets a unique gradient id), and its animations looked stepped or did not run (the pose motion now moves a group inside the SVG, so the vector is re-drawn at each frame, and reduced motion is an opt-out instead of an opt-in).
