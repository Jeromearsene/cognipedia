---
slug: "ancrage"
title: "Biais d'ancrage"
originalName: "Anchoring bias"
family: "too-much-information"
tags: ["décision", "estimation", "négociation"]
difficulty: "medium"
sources:
  wikipedia: "https://fr.wikipedia.org/wiki/Biais_d%27ancrage"
  papers:
    - title: "Judgment under Uncertainty: Heuristics and Biases — Tversky & Kahneman, 1974"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1126/science.185.4157.1124"
  videos:
    - title: "Le biais d'ancrage — ScienceÉtonnante"
      url: "https://www.youtube.com/watch?v=example"
      lang: "fr"
relatedBiases: ["framing-effect"]
situation:
  type: "choice"
  scenario: "Un agent immobilier vous montre d'abord une maison à 500 000€, puis une autre à 320 000€. Quel est votre sentiment ?"
  choices:
    - label: "320 000€, c'est une bonne affaire !"
      bias: true
    - label: "Je dois vérifier les prix du marché avant de juger"
      bias: false
  reveal: "Le prix de 500 000€ a servi d'ancre : il a rendu 320 000€ attractif sans que vous connaissiez la valeur réelle du bien."
quiz:
  questions:
    - question: "Le biais d'ancrage est plus fort quand..."
      choices:
        - "On manque d'information sur le sujet"
        - "On est expert du domaine"
        - "On prend son temps pour décider"
      correct: 0
      explanation: "Moins on a d'information, plus on se raccroche à la première valeur disponible comme référence."
    - question: "Quelle technique utilise le biais d'ancrage en marketing ?"
      choices:
        - "Afficher un prix barré avant le prix réel"
        - "Proposer la livraison gratuite"
        - "Offrir un échantillon gratuit"
      correct: 0
      explanation: "Le prix barré sert d'ancre haute, rendant le prix réel plus attractif par comparaison."
---

## Définition

Le biais d'ancrage est la tendance à se fier excessivement à la première information reçue (l'ancre) pour prendre des décisions.

## Mécanisme

Quand nous devons estimer une valeur inconnue, notre cerveau cherche un point de référence. La première valeur rencontrée — même si elle est arbitraire — influence fortement notre jugement final.

## Exemples

- Un prix barré à 100€ rend un prix de 60€ attractif, même si l'objet en vaut 40€.
- En négociation salariale, le premier chiffre posé influence toute la discussion.
- Les menus de restaurant placent le plat le plus cher en haut pour rendre les autres "raisonnables".

## Le saviez-vous ?

En 1974, les psychologues Amos Tversky et Daniel Kahneman ont mené une expérience à l'université de l'Oregon, aux États-Unis. Ils ont demandé à des participants d'estimer le pourcentage de pays africains membres des Nations unies. Avant de répondre, chacun devait tourner une roue de la fortune truquée qui s'arrêtait soit sur 10, soit sur 65. Résultat : ceux qui avaient vu le nombre 10 estimaient en moyenne 25%, tandis que ceux qui avaient vu 65 estimaient 45%. Un nombre totalement arbitraire et sans rapport influençait leur jugement. Cette expérience, publiée dans [*Judgment under Uncertainty: Heuristics and Biases*](https://doi.org/10.1126/science.185.4157.1124) (Science, 1974), a posé les bases de la recherche sur le biais d'ancrage.
