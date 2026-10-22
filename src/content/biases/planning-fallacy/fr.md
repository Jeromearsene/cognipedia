---
slug: "erreur-de-planification"
title: "Erreur de planification"
originalName: "Planning fallacy"
family: "need-to-act-fast"
tags: ["planification", "temps", "optimisme"]
difficulty: "easy"
sources:
  wikipedia: "https://fr.wikipedia.org/wiki/Biais_d%27optimisme"
  papers:
    - title: "Exploring the « planning fallacy » : Why people underestimate their task completion times — Buehler, Griffin & Ross, 1994"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1037/0022-3514.67.3.366"
    - title: "Intuitive prediction: Biases and corrective procedures — Kahneman & Tversky, 1982"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1017/CBO9780511809477.031"
  videos:
    - title: "Pourquoi sommes-nous si nuls pour prévoir le temps que prennent les choses ? — Welcome to the Jungle Media"
      url: "https://www.youtube.com/watch?v=uFCWoiHo3YY"
      lang: "fr"
    - title: "Biais cognitif : la planification fallacieuse — Nell et Associés"
      url: "https://www.youtube.com/watch?v=W2zYp1iE8C0"
      lang: "fr"
    - title: "The Planning Fallacy: Why Your Project Plan Is Wrong — Online PM Courses - Mike Clayton"
      url: "https://www.youtube.com/watch?v=uBJ977AMMeU"
      lang: "en"
relatedBiases: ["sunk-cost", "dunning-kruger", "hindsight-bias"]
situation:
  type: "choice"
  scenario: "Vous devez rendre un dossier dans trois semaines. Vos deux derniers projets similaires ont fini avec une semaine de retard. Comment estimez-vous le délai ?"
  choices:
    - label: "Trois semaines, large : cette fois je suis mieux organisé"
      bias: true
    - label: "Je pars de la durée réelle de mes projets précédents et j'ajoute une marge"
      bias: false
  reveal: "En imaginant un déroulement idéal de ce projet précis, on ignore l'expérience des projets passés. C'est l'erreur de planification : s'appuyer sur la durée réelle de projets comparables est bien plus fiable."
quiz:
  questions:
    - question: "L'erreur de planification est la tendance à..."
      choices:
        - "Sous-estimer le temps, les coûts et les risques d'un projet, même en connaissant des cas passés similaires"
        - "Ne jamais planifier ses projets à l'avance"
        - "Surestimer systématiquement la durée des tâches des autres"
      correct: 0
      explanation: "Le biais touche nos prévisions : on se fie à un scénario idéal plutôt qu'à l'expérience, y compris la nôtre."
    - question: "Quelle méthode permet de limiter ce biais ?"
      choices:
        - "Imaginer plus en détail le scénario idéal"
        - "S'appuyer sur la durée réelle de projets comparables (« vue extérieure »)"
        - "Demander à l'équipe d'être plus motivée"
      correct: 1
      explanation: "Partir de ce qui s'est réellement passé pour des projets similaires, plutôt que du plan du projet en cours, donne des prévisions plus réalistes. On parle de prévision par classe de référence."
    - question: "Dans l'étude de Buehler et ses collègues (1994), quelle part des étudiants a terminé son mémoire dans le délai qu'elle avait elle-même prévu ?"
      choices:
        - "Environ 30 %"
        - "Environ 70 %"
        - "Presque tous"
      correct: 0
      explanation: "Les étudiants prévoyaient en moyenne 34 jours, mais ont mis en moyenne 55 jours : seuls environ 30 % ont tenu leur propre prévision."
---

## Définition

L'erreur de planification (ou biais de planification) est la tendance à sous-estimer le temps, les coûts et les risques d'une tâche à venir, tout en surestimant ses bénéfices, et ce même quand on sait que des projets similaires ont déjà pris plus longtemps que prévu.

## Mécanisme

Pour prévoir, nous construisons mentalement un scénario du projet en cours, étape par étape, en supposant que tout se passe bien. Ce scénario laisse peu de place aux imprévus, qui sont par nature difficiles à anticiper. Nous écartons aussi l'expérience des projets passés, les nôtres comme ceux des autres, en les jugeant particuliers. Ce biais est lié à l'optimisme : nous voulons que le projet réussisse vite, et nos prévisions s'alignent sur ce souhait. Ce que Daniel Kahneman et Amos Tversky ont décrit comme la « vue intérieure » (le plan du projet) l'emporte sur la « vue extérieure » (les statistiques de projets comparables).

## Exemples

- On pense terminer des travaux de rénovation en un week-end, et ils durent trois semaines.
- Une équipe de développement annonce une livraison « dans deux sprints » alors que les trois dernières versions ont toutes pris le double.
- L'opéra de Sydney, prévu pour 1963, n'ouvre qu'en 1973, pour un coût multiplié par plus de dix.
- L'aéroport de Berlin-Brandebourg, dont l'ouverture était prévue en 2011, n'accueille ses premiers passagers qu'en 2020.

## Le saviez-vous ?

En 1994, les psychologues Roger Buehler, Dale Griffin et Michael Ross ont demandé à 37 étudiants en psychologie de prévoir combien de temps leur prendrait la rédaction de leur mémoire de fin d'études. En moyenne, ils estimaient 34 jours, et 49 jours dans le pire scénario. Ils ont en réalité mis près de 56 jours, et seuls environ 30 % ont respecté leur propre prévision. Le biais n'est donc pas qu'une affaire de naïveté : même en imaginant le pire, ils restaient trop optimistes. Les résultats sont détaillés dans l'article [*Exploring the "planning fallacy"*](https://doi.org/10.1037/0022-3514.67.3.366) (Journal of Personality and Social Psychology, 1994).
