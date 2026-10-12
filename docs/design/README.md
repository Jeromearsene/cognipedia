# Design system — refonte visuelle

Référence visuelle de la refonte implémentée dans ce dépôt (voir `src/styles/global.css` et `src/styles/families.css` pour les tokens réels). Les captures ci-dessous sont les maquettes validées qui ont servi de base à l'implémentation.

| # | Planche | Aperçu |
|---|---------|--------|
| 1 | [Fondations](01-fondations.webp) — palette, typographie, ombres, mode sombre | Tokens de couleur, Baloo 2 / Figtree, grain CSS |
| 2 | [Composants](02-composants.webp) — avant / après | Carte de biais, badges de difficulté, boutons |
| 3 | [Mascotte](03-mascotte.webp) — Cogni | Les 4 poses animées (repos, bonne réponse, biais détecté, réflexion) |
| 4 | [Accueil](04-accueil.webp) — clair | Hero, catalogue groupé par famille |
| 5 | [Accueil — sombre](05-accueil-sombre.webp) | Même page en mode sombre |
| 6 | [Fiche biais](06-fiche-biais.webp) | Exemple : biais de confirmation |

## Décisions clés

- **Palette** : indigo (`#4F46E5`) inchangé en accent, mais fond/surface/bordures recolorés en lavande clair plutôt qu'un gris froid, pour dialoguer avec l'accent au lieu de le contredire.
- **Couleurs de famille** : dégradés à deux teintes, volontairement cantonnés à la moitié froide du cercle chromatique (bleu → indigo → violet → cyan). Rouge/orange/ambre/vert restent réservés aux statuts (difficulté, bonne/mauvaise réponse) pour qu'une couleur de famille ne se lise jamais, même par association, comme un signal de correction.
- **Typographie** : Baloo 2 (titres, mascotte) + Figtree (texte courant), remplaçant Fraunces/Space Grotesk utilisés sur `staging`.
- **Profondeur** : ombres teintées d'indigo plutôt que des ombres grises neutres, un grain SVG très léger (~3 % d'opacité perçue, aucun asset chargé) sur le fond.
- **Mascotte — Cogni** : un seul personnage SVG + CSS réutilisé partout (pas d'illustration par biais), avec 4 poses : repos, bonne réponse, petit biais détecté, réflexion.
- **Mode sombre** : mêmes tokens, valeurs inversées — les familles s'éclaircissent pour rester lisibles sur fond sombre, les ombres perdent leur teinte indigo au profit d'un noir simple. Le dégradé de Cogni ne change pas entre les deux thèmes.

Deux suggestions explicitement écartées pendant la conception : une bordure indigo sur la carte "en cours", et un bouton "Explorer les biais" dans le hero (l'ancre vers le catalogue suffit).
