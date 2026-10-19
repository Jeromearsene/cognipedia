# Cognipedia

[![CI](https://github.com/Jeromearsene/cognipedia/actions/workflows/ci.yml/badge.svg)](https://github.com/Jeromearsene/cognipedia/actions/workflows/ci.yml)

Encyclopedie ludique des biais cognitifs. Decouvrez, testez et comprenez les biais qui influencent vos decisions au quotidien.

## Stack

- [Astro](https://astro.build) + [Svelte 5](https://svelte.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Cloudflare Pages](https://pages.cloudflare.com) + D1
- [Biome](https://biomejs.dev) (lint/format) + [Vitest](https://vitest.dev) (tests)

## Fonctionnalites

- Catalogue de biais cognitifs organise par famille (les 4 quadrants du codex)
- Situations interactives et quiz pour chaque biais
- Systeme de scoring avec leaderboard
- i18n francais/anglais avec detection automatique de la langue du navigateur
- Page 404 thematique avec messages humoristiques liés aux biais

## Demarrage

```sh
# Prerequis : Node 24+ et pnpm (via Volta)
pnpm install
pnpm dev
```

## Commandes

| Commande | Description |
| :--- | :--- |
| `pnpm dev` | Serveur de developpement (`localhost:4321`) |
| `pnpm build` | Build de production |
| `pnpm preview` | Preview du build en local |
| `pnpm lint` | Lint avec Biome |
| `pnpm test` | Tests avec Vitest |
| `pnpm check` | Type check (Astro + Svelte) |

## Structure du contenu

Chaque biais cognitif vit dans `src/content/biases/<nom>/` avec un fichier markdown par langue :

```
src/content/biases/
  anchoring-bias/
    fr.md
    en.md
```

Le frontmatter definit le titre, la famille, la difficulte, les sources, la situation interactive et le quiz.

### Regles du quiz

Chaque biais a un quiz de **3 questions**, une par niveau, toujours dans cet ordre. On entre par la definition, on finit par l'application ou le detail d'une etude :

| # | `level` | Role de la question |
| :--- | :--- | :--- |
| 1 | `easy` | Definition : reconnaitre le biais |
| 2 | `medium` | Application : mecanisme, exemple concret ou facon de s'en proteger |
| 3 | `hard` | Etude ou nuance : detail d'une experience, d'un chiffre, difference avec un biais voisin |

```yaml
quiz:
  questions:
    - question: "..."
      level: easy
      choices: ["...", "...", "..."]
      correct: 0
      explanation: "..."
```

Le `level` d'une question est independant de la `difficulty` du biais. Le schema (`src/lib/schemas.ts`) et `bias-quiz.test.ts` refusent un quiz qui n'a pas 3 questions ou dont les niveaux ne vont pas de `easy` a `hard`. Les fichiers `fr` et `en` doivent garder la meme structure (niveaux, nombre de choix, bonne reponse).

## Licence

MIT
