---
slug: "status-quo-bias"
title: "Status quo bias"
originalName: "Status quo bias"
family: "need-to-act-fast"
tags: ["decision", "habit", "risk"]
difficulty: "medium"
sources:
  wikipedia: "https://en.wikipedia.org/wiki/Status_quo_bias"
  papers:
    - title: "Status Quo Bias in Decision Making — Samuelson & Zeckhauser, 1988"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1007/BF00055564"
    - title: "Do Defaults Save Lives? — Johnson & Goldstein, 2003"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1126/science.1091721"
relatedBiases: ["loss-aversion", "sunk-cost"]
situation:
  type: "choice"
  scenario: "Your energy provider raises its rates every year even though cheaper offers exist elsewhere. Comparing and switching would take twenty minutes. What do you do?"
  choices:
    - label: "You put it off and stay with the same provider"
      bias: true
    - label: "You compare offers and switch if it's worth it"
      bias: false
  reveal: "Sticking with the same provider by default, without even comparing, is the classic expression of status quo bias: we overvalue the comfort of not changing anything relative to the real cost of inaction."
quiz:
  questions:
    - question: "Status quo bias refers to the fact that..."
      level: easy
      choices:
        - "We disproportionately prefer keeping the current situation rather than changing it"
        - "We systematically change our mind when faced with a new option"
        - "We always choose the cheapest option"
      correct: 0
      explanation: "Status quo bias leads us to overvalue what we already have compared to potentially better alternatives, simply because it's the current situation."
    - question: "Why does the default option in a choice (e.g. a pre-selected setting) have so much influence?"
      level: medium
      choices:
        - "Because doing nothing requires less effort and feels less risky than changing"
        - "Because the default option is always objectively the best one"
        - "Because people never notice default options"
      correct: 0
      explanation: "Changing requires active effort and the risk of regretting the decision, while keeping the default feels like committing to nothing — even though, in reality, not choosing is also a decision with consequences."
    - question: "In Samuelson and Zeckhauser's (1988) study, how does status quo bias show up in choices about investment portfolios or health plans?"
      level: hard
      choices:
        - "Participants choose the option presented as the current one far more often, even when other options are objectively comparable or better"
        - "Participants always choose the riskiest option, regardless of how it's framed"
        - "The status quo has no measurable effect once the choice is reframed"
      correct: 0
      explanation: "Through several experiments and field data, Samuelson and Zeckhauser showed that an option labeled as the current situation is chosen disproportionately more often than alternatives of equivalent expected value."
---

## Definition

Status quo bias is the tendency to disproportionately prefer the current situation over changing it, even when alternatives are objectively just as good, or better.

## Mechanism

Changing situations involves active effort, the uncertainty of an unknown outcome, and the risk of regretting the decision. Doing nothing, by contrast, feels like taking no risk at all — even though inaction is itself a choice, with its own consequences. This imbalance leads us to overvalue what we already have compared to what we could have instead, and explains why options presented as the "default" exert a disproportionate influence on our decisions.

## Examples

- Staying with the same phone carrier or energy provider year after year, despite cheaper offers elsewhere, simply because switching requires effort.
- Keeping the default settings of software or a subscription rather than customizing them, even when a different configuration would suit better.
- Never revisiting a savings plan or insurance contract for years, out of inertia rather than a deliberate choice.

## Did you know?

In 2003, researchers Eric Johnson and Daniel Goldstein published a now-famous study in *Science*, [*Do Defaults Save Lives?*](https://doi.org/10.1126/science.1091721), comparing organ donation consent rates across countries depending on whether they use an opt-out default (you must actively withdraw to refuse) or an opt-in default (you must actively register to consent). In opt-out countries like Austria, consent rates reach nearly the entire population, compared to barely more than ten percent in comparable opt-in countries like Germany — a gap almost entirely attributable to the default option itself, not to any underlying difference in opinion about organ donation.
