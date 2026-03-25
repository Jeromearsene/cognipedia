---
slug: "disponibilite"
title: "Biais de disponibilité"
originalName: "Availability bias"
family: "too-much-information"
tags: ["mémoire", "probabilité", "médias"]
difficulty: "medium"
sources:
  wikipedia: "https://fr.wikipedia.org/wiki/Heuristique_de_disponibilit%C3%A9"
  papers:
    - title: "Votre cerveau vous joue des tours — Albert Moukheiber, 2019"
      url: "https://www.odilejacob.fr/catalogue/sciences/neurosciences/votre-cerveau-vous-joue-des-tours_9782738145826.php"
  videos:
    - title: "Les biais cognitifs — ScienceÉtonnante"
      url: "https://www.youtube.com/watch?v=oFEOoEqW3bE"
      lang: "fr"
relatedBiases: ["anchoring", "survivorship"]
situation:
  type: "choice"
  scenario: "Après avoir vu plusieurs reportages sur des accidents d'avion, vous devez prendre un vol. Que ressentez-vous ?"
  choices:
    - label: "L'avion est dangereux, je préfère prendre la voiture"
      bias: true
    - label: "Les reportages ne changent pas les statistiques, l'avion reste le transport le plus sûr"
      bias: false
  reveal: "Les reportages rendent les accidents d'avion très 'disponibles' dans votre mémoire, vous faisant surestimer leur fréquence. En réalité, le risque en voiture est bien plus élevé."
quiz:
  questions:
    - question: "Le biais de disponibilité nous fait..."
      choices:
        - "Surestimer la probabilité d'événements faciles à se rappeler"
        - "Oublier les événements récents"
        - "Sous-estimer tous les risques"
      correct: 0
      explanation: "Plus un événement est facile à se rappeler (médiatisé, spectaculaire, récent), plus on surestime sa probabilité."
    - question: "Pourquoi les gens surestiment-ils le risque d'attaque de requin ?"
      choices:
        - "Parce que les médias en parlent beaucoup"
        - "Parce que c'est statistiquement fréquent"
        - "Parce qu'ils vivent près de la mer"
      correct: 0
      explanation: "Les attaques de requin sont extrêmement rares mais très médiatisées. Leur disponibilité mentale est disproportionnée par rapport au risque réel."
---

## Définition

Le biais de disponibilité est la tendance à évaluer la probabilité d'un événement en fonction de la facilité avec laquelle des exemples nous viennent à l'esprit.

## Mécanisme

Notre cerveau utilise un raccourci : si quelque chose est facile à se rappeler, c'est que ça doit être fréquent. Les événements spectaculaires, récents ou émotionnellement marquants sont plus "disponibles" en mémoire, ce qui fausse notre estimation de leur probabilité réelle.

## Exemples

- Après un crash aérien médiatisé, les réservations de vols baissent alors que le risque n'a pas changé.
- On surestime le nombre de morts par attaque terroriste et on sous-estime ceux par maladie cardiovasculaire.
- Un manager qui a vécu un échec récent avec un freelance refusera d'en embaucher un autre, même si l'expérience est statistiquement rare.

## Le saviez-vous ?

Après les attentats du 11 septembre 2001 aux États-Unis, le trafic aérien a chuté de 20%. Des millions d'Américains ont préféré prendre la voiture plutôt que l'avion. Le psychologue allemand Gerd Gigerenzer, directeur au Max Planck Institute de Berlin, a étudié les conséquences de ce report. Dans son étude publiée dans [*Dread Risk, September 11, and Fatal Traffic Accidents*](https://doi.org/10.1111/j.0956-7976.2004.00668.x) (Psychological Science, 2004), il a estimé qu'environ 1 600 Américains supplémentaires sont morts dans des accidents de la route dans l'année qui a suivi le 11 septembre — soit plus que le nombre de passagers des avions détournés. Le biais de disponibilité avait rendu l'avion terrifiant et la voiture rassurante, alors que les statistiques disaient l'inverse.
