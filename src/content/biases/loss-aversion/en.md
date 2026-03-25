---
slug: "loss-aversion"
title: "Loss aversion"
originalName: "Loss aversion"
family: "need-to-act-fast"
tags: ["decision", "risk", "emotion"]
difficulty: "medium"
sources:
  wikipedia: "https://en.wikipedia.org/wiki/Loss_aversion"
  papers:
    - title: "Prospect Theory: An Analysis of Decision under Risk — Kahneman & Tversky, 1979"
      url: "https://doi.org/10.2307/1914185"
relatedBiases: ["anchoring"]
situation:
  type: "choice"
  scenario: "You're offered a bet: flip a coin. Heads, you win $100. Tails, you lose $80. Do you accept?"
  choices:
    - label: "No, I don't want to risk losing $80"
      bias: true
    - label: "Yes, the expected gain is higher than the loss"
      bias: false
  reveal: "Mathematically, this bet is favorable (expected value of +$10). But the pain of losing $80 outweighs the pleasure of winning $100. This is loss aversion."
quiz:
  questions:
    - question: "According to Kahneman and Tversky, a loss is felt approximately..."
      choices:
        - "Twice as strongly as an equivalent gain"
        - "With the same intensity as a gain"
        - "Less strongly than an equivalent gain"
      correct: 0
      explanation: "Losing $100 hurts about twice as much as gaining $100 feels good. This is the classic loss aversion ratio."
    - question: "Loss aversion explains why..."
      choices:
        - "People hold losing investments hoping they'll recover"
        - "People always invest in safe assets"
        - "People prefer quick gains"
      correct: 0
      explanation: "Selling a losing investment makes the loss 'real.' We prefer to hold and hope, even when it's irrational."
---

## Definition

Loss aversion is the tendency to feel losses much more strongly than gains of equal value. Losing hurts more than winning feels good.

## Mechanism

Our brain processes losses and gains asymmetrically. Losing $50 triggers a negative emotion roughly twice as intense as the pleasure of finding $50. This asymmetry drives us to avoid risk, even when the odds are in our favor.

## Examples

- We refuse a favorable bet because the prospect of losing paralyzes us.
- We keep useless items because parting with them feels like a loss.
- "Free trial" offers work because once we have something, giving it up is painful.

## Did you know?

In 1990, economists Daniel Kahneman, Jack Knetsch, and Richard Thaler conducted a now-famous experiment at Cornell University in New York State. They gave a university mug to half the participants and asked everyone to set a price. Those who owned the mug demanded on average twice as much to sell it (~$7) as others were willing to pay (~$3). Simply owning an object increases its perceived value — because giving it up feels like a loss. The results were published in [*Experimental Tests of the Endowment Effect*](https://doi.org/10.1086/261737) (Journal of Political Economy, 1990).
