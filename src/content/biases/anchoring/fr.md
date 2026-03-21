---
slug: "ancrage"
title: "Biais d'ancrage"
originalName: "Anchoring bias"
family: "too-much-information"
tags: ["decision", "estimation", "negociation"]
difficulty: "medium"
sources:
  wikipedia: "https://fr.wikipedia.org/wiki/Biais_d%27ancrage_(psychologie)"
  papers:
    - title: "Judgment under Uncertainty: Heuristics and Biases — Tversky & Kahneman, 1974"
      url: "https://doi.org/10.1126/science.185.4157.1124"
  videos:
    - title: "Le biais d'ancrage — ScienceEtonnante"
      url: "https://www.youtube.com/watch?v=example"
      lang: "fr"
relatedBiases: ["framing-effect"]
situation:
  type: "choice"
  scenario: "Un agent immobilier vous montre d'abord une maison a 500 000EUR, puis une autre a 320 000EUR. Quel est votre sentiment ?"
  choices:
    - label: "320 000EUR, c'est une bonne affaire !"
      bias: true
    - label: "Je dois verifier les prix du marche avant de juger"
      bias: false
  reveal: "Le prix de 500 000EUR a servi d'ancre : il a rendu 320 000EUR attractif sans que vous connaissiez la valeur reelle du bien."
quiz:
  questions:
    - question: "Le biais d'ancrage est plus fort quand..."
      choices:
        - "On manque d'information sur le sujet"
        - "On est expert du domaine"
        - "On prend son temps pour decider"
      correct: 0
      explanation: "Moins on a d'information, plus on se raccroche a la premiere valeur disponible comme reference."
    - question: "Quelle technique utilise le biais d'ancrage en marketing ?"
      choices:
        - "Afficher un prix barre avant le prix reel"
        - "Proposer la livraison gratuite"
        - "Offrir un echantillon gratuit"
      correct: 0
      explanation: "Le prix barre sert d'ancre haute, rendant le prix reel plus attractif par comparaison."
---

## Definition

Le biais d'ancrage est la tendance a se fier excessivement a la premiere information recue (l'ancre) pour prendre des decisions.

## Mecanisme

Quand nous devons estimer une valeur inconnue, notre cerveau cherche un point de reference. La premiere valeur rencontree — meme si elle est arbitraire — influence fortement notre jugement final.

## Exemples

- Un prix barre a 100EUR rend un prix de 60EUR attractif, meme si l'objet en vaut 40EUR.
- En negociation salariale, le premier chiffre pose influence toute la discussion.
- Les menus de restaurant placent le plat le plus cher en haut pour rendre les autres "raisonnables".
