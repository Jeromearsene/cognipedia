---
slug: "aversion-perte"
title: "Aversion à la perte"
originalName: "Loss aversion"
family: "need-to-act-fast"
tags: ["décision", "risque", "émotion"]
difficulty: "medium"
sources:
  wikipedia: "https://fr.wikipedia.org/wiki/Aversion_pour_la_perte"
  papers:
    - title: "Système 1 / Système 2 : Les deux vitesses de la pensée — Daniel Kahneman, 2012"
      urls:
        - label: "Babelio"
          url: "https://www.babelio.com/livres/Kahneman-Systeme-1--Systeme-2--Les-deux-vitesses-de-la-/364930"
  videos:
    - title: "L'aversion à la perte — Heu?reka"
      url: "https://www.youtube.com/watch?v=z1XO51K_e-k"
      lang: "fr"
relatedBiases: ["anchoring"]
situation:
  type: "choice"
  scenario: "On vous propose un pari : lancer une pièce. Face, vous gagnez 100€. Pile, vous perdez 80€. Acceptez-vous ?"
  choices:
    - label: "Non, je ne veux pas risquer de perdre 80€"
      bias: true
    - label: "Oui, le gain espéré est supérieur à la perte"
      bias: false
  reveal: "Mathématiquement, ce pari est avantageux (espérance de +10€). Mais la douleur de perdre 80€ pèse plus que le plaisir de gagner 100€. C'est l'aversion à la perte."
quiz:
  questions:
    - question: "Selon Kahneman et Tversky, une perte est ressentie environ..."
      choices:
        - "Deux fois plus fort qu'un gain équivalent"
        - "Avec la même intensité qu'un gain"
        - "Moins fort qu'un gain équivalent"
      correct: 0
      explanation: "Perdre 100€ fait environ deux fois plus mal que gagner 100€ ne fait plaisir. C'est le ratio classique de l'aversion à la perte."
    - question: "L'aversion à la perte explique pourquoi..."
      choices:
        - "On garde un investissement perdant en espérant qu'il remonte"
        - "On investit toujours dans les valeurs sûres"
        - "On préfère les gains rapides"
      correct: 0
      explanation: "Vendre un investissement en perte rend la perte 'réelle'. On préfère garder et espérer, même quand c'est irrationnel."
---

## Définition

L'aversion à la perte est la tendance à ressentir les pertes beaucoup plus fortement que les gains de même valeur. Perdre fait plus mal que gagner ne fait plaisir.

## Mécanisme

Notre cerveau traite les pertes et les gains de manière asymétrique. Perdre 50€ provoque une émotion négative environ deux fois plus intense que le plaisir de trouver 50€. Cette asymétrie nous pousse à éviter les risques, même quand les probabilités sont en notre faveur.

## Exemples

- On refuse un pari avantageux parce que la perspective de perdre nous paralyse.
- On conserve des objets inutiles parce que s'en séparer ressemble à une perte.
- Les offres "essai gratuit" fonctionnent parce qu'une fois qu'on possède quelque chose, y renoncer est douloureux.

## Le saviez-vous ?

En 1990, les économistes Daniel Kahneman, Jack Knetsch et Richard Thaler ont mené une expérience devenue célèbre à l'université Cornell, dans l'État de New York. Ils ont donné un mug de l'université à la moitié des participants et demandé à tous de fixer un prix. Ceux qui possédaient le mug exigeaient en moyenne deux fois plus pour le vendre (~7$) que ce que les autres étaient prêts à payer (~3$). Le simple fait de posséder un objet augmente sa valeur perçue — parce que s'en séparer est ressenti comme une perte. Ces résultats ont été publiés dans [*Experimental Tests of the Endowment Effect*](https://doi.org/10.1086/261737) (Journal of Political Economy, 1990).
