---
slug: "biais-du-statu-quo"
title: "Biais du statu quo"
originalName: "Status quo bias"
family: "need-to-act-fast"
tags: ["décision", "habitude", "risque"]
difficulty: "medium"
sources:
  wikipedia: "https://fr.wikipedia.org/wiki/Biais_du_statu_quo"
  papers:
    - title: "Status Quo Bias in Decision Making — Samuelson & Zeckhauser, 1988"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1007/BF00055564"
    - title: "Do Defaults Save Lives? — Johnson & Goldstein, 2003"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1126/science.1091721"
  videos:
    - title: "Décryptage du biais du statu quo — Calista Conseil"
      url: "https://www.youtube.com/watch?v=x-sOehcCd2s"
      lang: "fr"
relatedBiases: ["loss-aversion", "sunk-cost"]
situation:
  type: "choice"
  scenario: "Votre fournisseur d'énergie augmente ses tarifs chaque année alors que des offres moins chères existent ailleurs. Comparer et changer prend vingt minutes. Que faites-vous ?"
  choices:
    - label: "Vous remettez ça à plus tard et restez chez le même fournisseur"
      bias: true
    - label: "Vous comparez les offres et changez si c'est avantageux"
      bias: false
  reveal: "Rester chez le même fournisseur par défaut, sans même comparer, est la manifestation classique du biais du statu quo : on surévalue le confort de ne rien changer par rapport au coût réel de l'inaction."
quiz:
  questions:
    - question: "Le biais du statu quo désigne le fait que..."
      level: easy
      choices:
        - "On préfère de façon disproportionnée garder la situation actuelle plutôt que d'en changer"
        - "On change systématiquement d'avis face à une nouvelle option"
        - "On choisit toujours l'option la moins chère"
      correct: 0
      explanation: "Le biais du statu quo pousse à surévaluer ce qu'on a déjà par rapport à des alternatives potentiellement meilleures, simplement parce que c'est la situation en cours."
    - question: "Pourquoi l'option par défaut dans un choix (ex. un réglage préselectionné) a-t-elle autant d'influence ?"
      level: medium
      choices:
        - "Parce que ne rien faire demande moins d'effort et semble moins risqué que changer"
        - "Parce que l'option par défaut est toujours la meilleure sur le plan objectif"
        - "Parce que les gens ne remarquent jamais les options par défaut"
      correct: 0
      explanation: "Changer implique un effort actif et le risque de regretter sa décision, alors que garder l'option par défaut semble ne rien engager — même si, en réalité, ne pas choisir est aussi une décision avec des conséquences."
    - question: "Dans l'étude de Samuelson et Zeckhauser (1988), comment le biais du statu quo se manifeste-t-il face à des choix de portefeuille d'investissement ou de plans santé ?"
      level: hard
      choices:
        - "Les participants choisissent bien plus souvent l'option présentée comme actuelle, même quand d'autres options sont objectivement comparables ou meilleures"
        - "Les participants choisissent toujours l'option la plus risquée, quelle que soit la présentation"
        - "Le statu quo n'a aucun effet mesurable une fois le choix reformulé"
      correct: 0
      explanation: "Samuelson et Zeckhauser ont montré, à travers plusieurs expériences et données de terrain, qu'une option désignée comme la situation actuelle est choisie de façon disproportionnée par rapport à des alternatives pourtant équivalentes en valeur attendue."
---

## Définition

Le biais du statu quo est la tendance à préférer de façon disproportionnée la situation actuelle plutôt que d'en changer, même lorsque des alternatives sont objectivement aussi bonnes, voire meilleures.

## Mécanisme

Changer de situation implique un effort actif, l'incertitude d'un résultat inconnu et le risque de regretter sa décision. Ne rien faire, à l'inverse, donne l'impression de ne prendre aucun risque — alors qu'en réalité, l'inaction est elle aussi un choix, avec ses propres conséquences. Ce déséquilibre pousse à surévaluer ce que l'on a déjà par rapport à ce que l'on pourrait avoir, et explique pourquoi les options présentées « par défaut » exercent une influence disproportionnée sur nos décisions.

## Exemples

- Rester chez le même opérateur téléphonique ou fournisseur d'énergie année après année, malgré des offres moins chères ailleurs, simplement parce que changer demande une démarche.
- Garder les réglages par défaut d'un logiciel ou d'un abonnement plutôt que de les personnaliser, même quand une autre configuration conviendrait mieux.
- Ne pas réviser un plan d'épargne ou un contrat d'assurance pendant des années, par inertie plutôt que par choix réfléchi.

## Le saviez-vous ?

En 2003, les chercheurs Eric Johnson et Daniel Goldstein ont publié dans la revue *Science* une étude devenue célèbre, [*Do Defaults Save Lives?*](https://doi.org/10.1126/science.1091721), comparant les taux de consentement au don d'organes selon que les pays appliquent un système de consentement par défaut (opt-out, où il faut se désinscrire pour refuser) ou de non-consentement par défaut (opt-in, où il faut s'inscrire pour accepter). Dans les pays en opt-out comme l'Autriche, le taux de consentement avoisine la quasi-totalité de la population, contre à peine plus d'une dizaine de pour cent dans des pays comparables en opt-in comme l'Allemagne — un écart presque entièrement attribuable à la simple option par défaut, et non à une différence d'opinion sur le don d'organes.
