---
slug: "gamblers-fallacy"
title: "Gambler's fallacy"
originalName: "Gambler's fallacy"
family: "not-enough-meaning"
tags: ["probability", "chance", "decision"]
difficulty: "medium"
sources:
  wikipedia: "https://en.wikipedia.org/wiki/Gambler%27s_fallacy"
  papers:
    - title: "The Gambler's Fallacy and the Hot Hand: Empirical Data from Casinos — Croson & Sundali, 2005"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1007/s11166-005-1153-2"
relatedBiases: ["availability", "sunk-cost"]
situation:
  type: "choice"
  scenario: "At the roulette table, the ball has just landed on black five times in a row. You have to place your next bet. What do you do?"
  choices:
    - label: "I bet on red — a streak like that can't go on"
      bias: true
    - label: "Red and black always have exactly the same probability, no matter the history"
      bias: false
  reveal: "Every spin of the roulette wheel is independent of the ones before it: the ball has no memory and no intention to 'balance things out'. After five blacks, the probability of black or red is exactly the same as it was on the very first spin. Believing otherwise is the gambler's fallacy."
quiz:
  questions:
    - question: "The gambler's fallacy is the belief that..."
      level: easy
      choices:
        - "After an unusual streak of one outcome, the opposite outcome becomes more likely"
        - "Casinos always rig their games of chance"
        - "You should always bet the same amount on every round"
      correct: 0
      explanation: "We wrongly believe a random event 'must' balance itself out after an unusual streak, even though each draw stays independent of the previous ones."
    - question: "Why doesn't a random draw (a coin flip, a roulette spin, a lottery) have any 'memory' of previous results?"
      level: medium
      choices:
        - "Because each draw is an independent event whose probability doesn't depend on past outcomes"
        - "Because random number generators only keep the last 10 results"
        - "Because memory effects only kick in after streaks longer than 20 draws"
      correct: 0
      explanation: "Statistical independence means the probability of an outcome stays the same on every draw, whatever happened before — a coin or a roulette wheel has literally no way of 'knowing' what has already come up."
    - question: "On August 18, 1913, at the Monte Carlo Casino, the roulette ball landed on black 26 times in a row. What did most bettors do during that streak?"
      level: hard
      choices:
        - "They bet increasingly on red, convinced it was 'due', and lost millions of francs in the process"
        - "They stopped playing after the tenth consecutive black, suspecting a rigged wheel"
        - "They kept betting on black, convinced the streak would keep going indefinitely"
      correct: 0
      explanation: "Convinced that red became more and more 'due' as the black streak lengthened, bettors wagered growing sums against black and lost millions of francs before red finally came up."
---

## Definition

The gambler's fallacy is the mistaken belief that, after an unusual streak of one outcome in a game of chance, the opposite outcome becomes more likely — even though each draw remains strictly independent of the ones before it.

## Mechanism

Our brain spontaneously looks for order and balance, even where none exists. Faced with an improbable streak (five heads in a row, several consecutive black numbers), we intuitively assume some invisible force must "balance things out", as if chance remembered what just happened. In reality, for a statistically independent event, the probability never changes: a coin that has just landed on heads five times still has exactly a 50% chance of landing on heads on the next toss.

## Examples

- A lottery player who avoids numbers drawn the previous week, thinking they're now less likely to come up again.
- Parents of three daughters convinced their fourth child "must" be a boy.
- A trader who assumes a stock that has fallen several days in a row "has to" bounce back, purely because it has already fallen so much.
- A tennis player who has lost the last four points and feels the next one is "owed" to them.

## Did you know?

On August 18, 1913, at the Monte Carlo Casino, the roulette ball landed on black 26 times in a row — an extraordinarily unlikely event, with odds of roughly one in 136 million. As the streak went on, more and more bettors convinced themselves that red was becoming "more and more due" and wagered growing sums against black, losing millions of francs before red finally came up. This episode remains the most famous illustration of the gambler's fallacy. Decades later, economists Rachel Croson and James Sundali confirmed that this same bias operates under real-world conditions: after reviewing hours of video footage from roulette tables in Reno, they showed, in [*The Gambler's Fallacy and the Hot Hand: Empirical Data from Casinos*](https://doi.org/10.1007/s11166-005-1153-2) (Journal of Risk and Uncertainty, 2005), that players consistently bet against ongoing streaks, wagering ever more heavily on the opposite outcome the longer a streak runs.
