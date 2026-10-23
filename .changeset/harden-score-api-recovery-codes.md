---
"cognipedia": patch
---

`POST /api/scores` now validates its payload server-side: the situation score must be 0 or 1 and `quizCorrect` cannot exceed `quizTotal`, so a client can no longer push an arbitrary score onto the leaderboard. Recovery codes are now generated with `crypto.getRandomValues` instead of `Math.random`.
