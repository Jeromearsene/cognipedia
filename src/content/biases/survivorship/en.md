---
slug: "survivorship"
title: "Survivorship bias"
originalName: "Survivorship bias"
family: "too-much-information"
tags: ["statistics", "success", "selection"]
difficulty: "easy"
sources:
  wikipedia: "https://en.wikipedia.org/wiki/Survivorship_bias"
  papers:
    - title: "Abraham Wald and the Missing Bullet Holes — Jordan Ellenberg, 2015"
      url: "https://doi.org/10.1080/09332480.2015.1103879"
relatedBiases: ["anchoring", "confirmation"]
situation:
  type: "choice"
  scenario: "A famous entrepreneur explains that he dropped out of school at 16 to start his company. He advises young people to do the same. What do you think?"
  choices:
    - label: "He succeeded without a degree, proof that school isn't necessary"
      bias: true
    - label: "We only hear about those who succeeded, not the thousands who failed"
      bias: false
  reveal: "You're only seeing the survivor. For every entrepreneur who succeeds without a degree, thousands fail in anonymity. This is survivorship bias."
quiz:
  questions:
    - question: "Survivorship bias means..."
      choices:
        - "Only considering success cases and ignoring failures"
        - "Surviving a dangerous situation"
        - "Believing only the strongest succeed"
      correct: 0
      explanation: "This bias leads us to draw conclusions from visible 'survivors' while forgetting all those who didn't make it through the process."
    - question: "Which historical example illustrates survivorship bias?"
      choices:
        - "Abraham Wald's WWII aircraft analysis"
        - "The Milgram experiment"
        - "The Turing test"
      correct: 0
      explanation: "Wald showed that reinforcement should go where returning planes had NO bullet holes, because planes hit in those areas never came back."
---

## Definition

Survivorship bias is the logical error of focusing on cases that "survived" a selection process while ignoring those that failed.

## Mechanism

We only see the winners: successful companies, famous artists, treatments that work. Failures are invisible because they don't make headlines. This distorted view leads us to overestimate our chances of success and draw flawed conclusions.

## Examples

- Self-help books only feature success stories, never identical paths that led to failure.
- We think old buildings were built better, but only the sturdiest ones survived.
- Investment funds display their track records while excluding funds that closed due to poor performance.

## Did you know?

In 1943, the Statistical Research Group at Columbia University in New York was tasked by the US military with optimizing bomber armor. Military engineers had mapped bullet holes on planes returning from missions over Europe and proposed reinforcing the most damaged areas. Hungarian-born statistician Abraham Wald realized the mistake: the planes they were studying were the ones that had **survived**. The areas without bullet holes were precisely the ones that, when hit, prevented the plane from returning. The undamaged areas needed reinforcement. His analysis, published in the memo [*A Method of Estimating Plane Vulnerability Based on Damage of Survivors*](https://en.wikipedia.org/wiki/Abraham_Wald#Survivorship_bias) (SRG, 1943), became the most famous example of survivorship bias.
