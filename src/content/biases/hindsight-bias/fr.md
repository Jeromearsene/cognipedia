---
slug: "biais-retrospectif"
title: "Biais rétrospectif"
originalName: "Hindsight bias"
family: "what-to-remember"
tags: ["mémoire", "prédiction", "jugement"]
difficulty: "easy"
sources:
  wikipedia: "https://fr.wikipedia.org/wiki/Biais_r%C3%A9trospectif"
  papers:
    - title: "Hindsight ≠ foresight: The effect of outcome knowledge on judgment under uncertainty — Fischhoff, 1975"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1037/0096-1523.1.3.288"
    - title: "\"I knew it would happen\": Remembered probabilities of once-future things — Fischhoff & Beyth, 1975"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1016/0030-5073(75)90002-1"
relatedBiases: ["confirmation", "dunning-kruger"]
situation:
  type: "choice"
  scenario: "Une start-up dans laquelle vous aviez hésité à investir vient de faire faillite. Un ami vous demande si vous l'aviez vu venir. Que répondez-vous ?"
  choices:
    - label: "Bien sûr, les signaux d'alerte étaient évidents dès le départ"
      bias: true
    - label: "Pas vraiment : j'hésitais à l'époque, et maintenant que je connais la fin, tout me paraît plus évident qu'il ne l'était"
      bias: false
  reveal: "Une fois le résultat connu, notre mémoire réécrit discrètement le passé : le doute d'alors s'efface et l'issue semble avoir toujours été prévisible. Vous aviez hésité justement parce que ce n'était pas évident. C'est le biais rétrospectif."
quiz:
  questions:
    - question: "Le biais rétrospectif est la tendance à..."
      choices:
        - "Croire, une fois le résultat connu, qu'il était prévisible depuis le début"
        - "Surestimer ses propres capacités par rapport aux autres"
        - "Ne chercher que les informations qui confirment ce que l'on pense déjà"
      correct: 0
      explanation: "C'est l'effet « je le savais » : connaître l'issue la rend plus prévisible qu'elle ne l'était vraiment, et on se souvient mal de l'incertitude qu'on ressentait."
    - question: "Dans l'étude de Fischhoff et Beyth sur les voyages de Nixon à Pékin et à Moscou, que faisaient les participants après les voyages ?"
      choices:
        - "Ils se rappelaient fidèlement leurs prédictions initiales"
        - "Ils se rappelaient avoir attribué des probabilités plus élevées aux événements qui s'étaient réellement produits"
        - "Ils refusaient de dire ce qu'ils avaient prédit"
      correct: 1
      explanation: "Leur souvenir de leurs propres prévisions avait glissé vers les résultats réels : les événements survenus étaient jugés avoir été plus probables qu'ils ne l'avaient vraiment été."
    - question: "Comment vérifier que vous « l'aviez vraiment vu venir » ?"
      choices:
        - "Essayer de se rappeler plus précisément ce que l'on ressentait à l'époque"
        - "Comparer avec une prédiction écrite avant que le résultat soit connu"
        - "Demander à quelqu'un qui connaît déjà l'issue"
      correct: 1
      explanation: "La mémoire est réécrite par le résultat : c'est un témoin peu fiable. Une prédiction notée à l'avance, idéalement avec une probabilité, est la seule trace honnête de ce que vous pensiez vraiment."
---

## Définition

Le biais rétrospectif est la tendance, une fois un résultat connu, à croire qu'il était prévisible depuis le début, et à se souvenir à tort de l'avoir anticipé. C'est le fameux « je le savais ».

## Mécanisme

Dès que l'on connaît la fin d'une histoire, notre cerveau intègre ce résultat dans sa compréhension des événements qui y ont mené. Nous construisons une explication cohérente où tout s'emboîte, et l'incertitude ressentie à l'époque s'efface de la mémoire. L'issue paraît alors inévitable et évidente. Nous jugeons aussi notre « moi » passé, ou les autres, à l'aune d'une clarté que personne n'avait vraiment au moment de décider.

## Exemples

- Après un match, on affirme « je savais qu'ils perdraient » alors qu'on hésitait avant le coup d'envoi.
- Après un krach boursier, les commentateurs expliquent que « les signes étaient évidents », alors que presque personne n'a agi à temps.
- Lors du retour d'expérience après l'échec d'un projet ou une erreur médicale, on se demande « comment ont-ils pu ne pas le voir ? », en oubliant que l'issue était inconnue des personnes concernées.
- Après un examen ou un entretien d'embauche, on est persuadé d'avoir « eu un mauvais pressentiment » dès le début.

## Le saviez-vous ?

En 1972, avant les visites du président américain Richard Nixon à Pékin et à Moscou, les psychologues Baruch Fischhoff et Ruth Beyth ont demandé à des participants d'estimer la probabilité de différentes issues possibles de ces voyages. Une fois les voyages terminés, ils leur ont demandé de se rappeler leurs estimations initiales. Les participants se souvenaient d'avoir attribué des probabilités plus élevées aux événements qui s'étaient réellement produits, et plus faibles à ceux qui n'avaient pas eu lieu. Les résultats ont été publiés dans [*"I knew it would happen": Remembered probabilities of once-future things*](https://doi.org/10.1016/0030-5073(75)90002-1) (Organizational Behavior and Human Performance, 1975). La même année, Fischhoff a montré que des personnes à qui l'on avait fait lire le récit de la guerre anglo-népalaise du XIXᵉ siècle et révélé quel camp l'avait emportée jugeaient cette issue plus prévisible que celles à qui on ne l'avait pas dit, un phénomène qu'il a appelé « creeping determinism » (déterminisme rampant) dans [*Hindsight ≠ foresight*](https://doi.org/10.1037/0096-1523.1.3.288) (Journal of Experimental Psychology: Human Perception and Performance, 1975).
