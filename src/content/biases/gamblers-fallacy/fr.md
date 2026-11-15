---
slug: "erreur-du-parieur"
title: "Erreur du parieur"
originalName: "Gambler's fallacy"
family: "not-enough-meaning"
tags: ["probabilité", "hasard", "décision"]
difficulty: "medium"
sources:
  wikipedia: "https://fr.wikipedia.org/wiki/Erreur_du_parieur"
  papers:
    - title: "The Gambler's Fallacy and the Hot Hand: Empirical Data from Casinos — Croson & Sundali, 2005"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1007/s11166-005-1153-2"
relatedBiases: ["availability", "sunk-cost"]
situation:
  type: "choice"
  scenario: "À la roulette, la bille vient de tomber sur noir cinq fois de suite. Vous devez miser sur le prochain tour. Que faites-vous ?"
  choices:
    - label: "Je mise sur rouge, une telle série ne peut pas continuer"
      bias: true
    - label: "Rouge et noir ont toujours exactement la même probabilité, quel que soit l'historique"
      bias: false
  reveal: "Chaque tour de roulette est indépendant des précédents : la bille n'a ni mémoire ni intention de « rééquilibrer » les résultats. Après cinq noirs, la probabilité de noir ou de rouge reste strictement la même qu'au premier tour. Croire le contraire, c'est l'erreur du parieur."
quiz:
  questions:
    - question: "L'erreur du parieur consiste à croire que..."
      level: easy
      choices:
        - "Après une série inhabituelle d'un même résultat, le résultat opposé devient plus probable"
        - "Les jeux de hasard sont truqués par les casinos"
        - "Il faut toujours miser la même somme à chaque tour"
      correct: 0
      explanation: "On croit à tort qu'un événement aléatoire « doit » se rééquilibrer après une série inhabituelle, alors que chaque tirage reste indépendant des précédents."
    - question: "Pourquoi un tirage au hasard (pile ou face, roulette, loto) n'a-t-il pas de « mémoire » des résultats précédents ?"
      level: medium
      choices:
        - "Parce que chaque tirage est un événement indépendant, dont la probabilité ne dépend pas de l'historique"
        - "Parce que les générateurs aléatoires ne gardent que les 10 derniers résultats"
        - "Parce que la mémoire n'existe que pour les séries de plus de 20 tirages"
      correct: 0
      explanation: "L'indépendance statistique signifie que la probabilité d'un résultat reste la même à chaque tirage, quel que soit ce qui s'est produit avant — une pièce ou une roulette n'ont littéralement aucun moyen de « savoir » ce qui est déjà sorti."
    - question: "Le 18 août 1913, au casino de Monte-Carlo, la bille de roulette est tombée 26 fois de suite sur noir. Qu'ont fait la plupart des parieurs pendant cette série ?"
      level: hard
      choices:
        - "Ils ont de plus en plus misé sur rouge, convaincus qu'il devait forcément sortir, perdant ainsi des millions de francs"
        - "Ils ont arrêté de jouer dès le dixième noir consécutif, soupçonnant une roulette truquée"
        - "Ils ont continué à miser sur noir, persuadés que la série allait se poursuivre indéfiniment"
      correct: 0
      explanation: "Persuadés qu'un rouge devenait de plus en plus « dû » à mesure que la série de noirs s'allongeait, les parieurs ont misé des sommes croissantes contre noir et ont perdu des millions de francs avant que rouge ne sorte enfin."
---

## Définition

L'erreur du parieur est la croyance erronée qu'après une série inhabituelle d'un même résultat dans un jeu de hasard, le résultat opposé devient plus probable — alors que chaque tirage reste strictement indépendant des précédents.

## Mécanisme

Notre cerveau cherche spontanément de l'ordre et de l'équilibre, même là où il n'y en a pas. Face à une série improbable (cinq « pile » d'affilée, plusieurs numéros noirs consécutifs), on suppose intuitivement qu'une force invisible doit « rééquilibrer » les choses, comme si le hasard se souvenait de ce qui vient de se produire. En réalité, pour un événement statistiquement indépendant, la probabilité ne change jamais : une pièce qui vient de tomber cinq fois sur « pile » a toujours exactement 50% de chances de retomber sur « pile » au tirage suivant.

## Exemples

- Un joueur de loto qui évite de jouer les numéros sortis la semaine précédente, pensant qu'ils ont moins de chances de ressortir.
- Des parents de trois filles persuadés que leur quatrième enfant sera « forcément » un garçon.
- Un trader qui pense qu'une action ayant baissé plusieurs jours de suite va « forcément » remonter, uniquement parce qu'elle a déjà beaucoup baissé.
- Un joueur de tennis qui a perdu les quatre derniers points et se dit que le prochain lui « revient de droit ».

## Le saviez-vous ?

Le 18 août 1913, au casino de Monte-Carlo, la bille de la roulette est tombée sur noir 26 fois de suite — un événement extraordinairement improbable (environ une chance sur 136 millions). À mesure que la série se prolongeait, de plus en plus de parieurs se sont persuadés que rouge devenait « de plus en plus dû » et ont misé des sommes croissantes contre noir, perdant au passage des millions de francs avant que rouge ne finisse par sortir. Cet épisode est resté l'illustration la plus célèbre de l'erreur du parieur. Des décennies plus tard, les économistes Rachel Croson et James Sundali ont confirmé que ce biais opère aussi dans des conditions réelles : en observant des heures d'enregistrements vidéo de tables de roulette à Reno, ils ont montré, dans [*The Gambler's Fallacy and the Hot Hand: Empirical Data from Casinos*](https://doi.org/10.1007/s11166-005-1153-2) (Journal of Risk and Uncertainty, 2005), que les joueurs misent systématiquement contre les séries en cours, pariant d'autant plus massivement sur le résultat opposé que la série observée est longue.
