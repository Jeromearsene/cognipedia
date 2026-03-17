# Cognipedia

[![CI](https://github.com/Jeromearsene/cognipedia/actions/workflows/ci.yml/badge.svg)](https://github.com/Jeromearsene/cognipedia/actions/workflows/ci.yml)

Encyclopedie ludique des biais cognitifs. Decouvrez, testez et comprenez les biais qui influencent vos decisions au quotidien.

## Stack

- [Astro](https://astro.build) + [Svelte 5](https://svelte.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Cloudflare Pages](https://pages.cloudflare.com) + D1
- [Levita](https://github.com/Jeromearsene/levita) pour les effets tilt/parallax
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

## Licence

MIT
