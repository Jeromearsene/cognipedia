---
slug: "anchoring-bias"
title: "Anchoring bias"
originalName: "Anchoring bias"
family: "too-much-information"
tags: ["decision", "estimation", "negotiation"]
difficulty: "medium"
sources:
  wikipedia: "https://en.wikipedia.org/wiki/Anchoring_(cognitive_bias)"
  papers:
    - title: "Judgment under Uncertainty: Heuristics and Biases — Tversky & Kahneman, 1974"
      url: "https://doi.org/10.1126/science.185.4157.1124"
  videos:
    - title: "Anchoring Bias — Veritasium"
      url: "https://www.youtube.com/watch?v=example"
      lang: "en"
relatedBiases: ["framing-effect"]
---

## Definition

Anchoring bias is the tendency to rely too heavily on the first piece of information encountered when making decisions.

## Mechanism

When estimating an unknown value, our brain looks for a reference point. The first value we encounter — even if arbitrary — heavily influences our final judgment.

## Examples

- A crossed-out price of $100 makes $60 seem like a great deal, even if the item is worth $40.
- In salary negotiations, the first number thrown out anchors the entire discussion.
- Restaurant menus place the most expensive dish at the top to make others seem "reasonable".

## Situation

```json
{
  "type": "choice",
  "scenario": "A real estate agent first shows you a house priced at $500,000, then another at $320,000. How do you feel?",
  "choices": [
    { "label": "$320,000 — that's a great deal!", "bias": true },
    { "label": "I should check market prices before judging", "bias": false }
  ],
  "reveal": "The $500,000 price served as an anchor: it made $320,000 seem attractive without you knowing the property's actual value."
}
```

## Quiz

```json
{
  "questions": [
    {
      "question": "Anchoring bias is stronger when...",
      "choices": ["You lack information about the subject", "You are an expert in the field", "You take your time to decide"],
      "correct": 0,
      "explanation": "The less information you have, the more you cling to the first available value as a reference."
    },
    {
      "question": "Which marketing technique exploits anchoring bias?",
      "choices": ["Showing a crossed-out price before the real price", "Offering free shipping", "Giving a free sample"],
      "correct": 0,
      "explanation": "The crossed-out price serves as a high anchor, making the real price more attractive by comparison."
    }
  ]
}
```
