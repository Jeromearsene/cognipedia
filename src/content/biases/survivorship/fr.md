---
slug: "du-survivant"
title: "Biais du survivant"
originalName: "Survivorship bias"
family: "too-much-information"
tags: ["statistique", "succès", "sélection"]
difficulty: "easy"
sources:
  wikipedia: "https://fr.wikipedia.org/wiki/Biais_du_survivant"
  papers:
    - title: "L'art de penser clairement — Rolf Dobelli, 2013"
      url: "https://www.babelio.com/livres/Dobelli-Lart-de-penser-clairement/500595"
  videos:
    - title: "Le biais du survivant — Fouloscopie"
      url: "https://www.youtube.com/watch?v=dOCaCeBz0Xk"
      lang: "fr"
relatedBiases: ["anchoring", "confirmation"]
situation:
  type: "choice"
  scenario: "Un entrepreneur célèbre raconte qu'il a quitté l'école à 16 ans pour créer sa startup. Il conseille aux jeunes de faire pareil. Qu'en pensez-vous ?"
  choices:
    - label: "Il a réussi sans diplôme, c'est la preuve que l'école n'est pas nécessaire"
      bias: true
    - label: "On n'entend que ceux qui ont réussi, pas les milliers qui ont échoué"
      bias: false
  reveal: "Vous ne voyez que le survivant. Pour chaque entrepreneur qui réussit sans diplôme, des milliers échouent dans l'anonymat. C'est le biais du survivant."
quiz:
  questions:
    - question: "Le biais du survivant consiste à..."
      choices:
        - "Ne prendre en compte que les cas de réussite et ignorer les échecs"
        - "Survivre à une situation dangereuse"
        - "Croire que seuls les plus forts réussissent"
      correct: 0
      explanation: "Ce biais nous fait tirer des conclusions à partir des 'survivants' visibles, en oubliant tous ceux qui n'ont pas survécu au processus."
    - question: "Quel exemple historique illustre le biais du survivant ?"
      choices:
        - "Les avions de la Seconde Guerre mondiale d'Abraham Wald"
        - "L'expérience de Milgram"
        - "Le test de Turing"
      correct: 0
      explanation: "Wald a montré qu'il fallait renforcer les zones SANS impacts de balles sur les avions qui rentraient, car ceux touchés à ces endroits ne revenaient jamais."
---

## Définition

Le biais du survivant est l'erreur logique qui consiste à se concentrer sur les cas qui ont "survécu" à un processus de sélection, en ignorant ceux qui ont échoué.

## Mécanisme

Nous ne voyons que les gagnants : les entreprises qui réussissent, les artistes célèbres, les traitements qui marchent. Les échecs sont invisibles parce qu'ils ne font pas la une. Cette vision déformée nous pousse à surestimer nos chances de succès et à tirer de mauvaises conclusions.

## Exemples

- Les livres de développement personnel ne parlent que des success stories, jamais des parcours identiques qui ont échoué.
- On croit que les bâtiments anciens étaient mieux construits, alors que seuls les plus solides ont survécu.
- Les fonds d'investissement affichent leurs performances en excluant les fonds qui ont fermé (mauvais résultats).

## Le saviez-vous ?

En 1943, le Statistical Research Group de l'université Columbia à New York était chargé par l'armée américaine d'optimiser le blindage des bombardiers. Les ingénieurs militaires avaient cartographié les impacts de balles sur les avions qui rentraient de mission au-dessus de l'Europe et proposaient de renforcer les zones les plus touchées. Le statisticien hongrois Abraham Wald a compris l'erreur : les avions qu'ils étudiaient étaient ceux qui avaient **survécu**. Les zones sans impacts étaient justement celles qui, une fois touchées, empêchaient l'avion de revenir. Il fallait renforcer les zones intactes. Son analyse, publiée dans le mémo [*A Method of Estimating Plane Vulnerability Based on Damage of Survivors*](https://en.wikipedia.org/wiki/Abraham_Wald#Survivorship_bias) (SRG, 1943), est devenue l'exemple le plus célèbre du biais du survivant.
