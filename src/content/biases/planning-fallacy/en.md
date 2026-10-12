---
slug: "planning-fallacy"
title: "Planning fallacy"
originalName: "Planning fallacy"
family: "need-to-act-fast"
tags: ["planning", "time", "optimism"]
difficulty: "easy"
sources:
  wikipedia: "https://en.wikipedia.org/wiki/Planning_fallacy"
  papers:
    - title: "Exploring the “planning fallacy”: Why people underestimate their task completion times — Buehler, Griffin & Ross, 1994"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1037/0022-3514.67.3.366"
    - title: "Intuitive prediction: Biases and corrective procedures — Kahneman & Tversky, 1982"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1017/CBO9780511809477.031"
  videos:
    - title: "The Planning Fallacy: Why Your Project Plan Is Wrong — Online PM Courses - Mike Clayton"
      url: "https://www.youtube.com/watch?v=uBJ977AMMeU"
      lang: "en"
relatedBiases: ["sunk-cost", "dunning-kruger", "hindsight-bias"]
situation:
  type: "choice"
  scenario: "You have to deliver a report in three weeks. Your last two similar projects each finished a week late. How do you estimate the deadline?"
  choices:
    - label: "Three weeks, comfortably: this time I'm better organized"
      bias: true
    - label: "I start from how long my previous projects really took, and add a buffer"
      bias: false
  reveal: "By picturing an ideal run of this particular project, we ignore what happened on past ones. That is the planning fallacy: relying on the real duration of comparable projects is far more reliable."
quiz:
  questions:
    - question: "The planning fallacy is the tendency to..."
      choices:
        - "Underestimate the time, costs and risks of a project, even when we know similar past cases"
        - "Never plan our projects in advance"
        - "Systematically overestimate how long other people's tasks take"
      correct: 0
      explanation: "The bias affects our forecasts: we rely on an ideal scenario rather than on experience, including our own."
    - question: "Which method helps limit this bias?"
      choices:
        - "Picturing the ideal scenario in even more detail"
        - "Relying on the actual duration of comparable projects (the “outside view”)"
        - "Asking the team to be more motivated"
      correct: 1
      explanation: "Starting from what really happened on similar projects, rather than from the current project's plan, produces more realistic forecasts. This is called reference class forecasting."
    - question: "In Buehler and colleagues' 1994 study, what share of students finished their thesis within the time they had predicted?"
      choices:
        - "About 30%"
        - "About 70%"
        - "Almost all of them"
      correct: 0
      explanation: "Students predicted 34 days on average but took about 55: only around 30% met their own prediction."
---

## Definition

The planning fallacy is the tendency to underestimate the time, costs and risks of a future task while overestimating its benefits, even when we know that similar projects have taken longer than planned.

## Mechanism

To make a forecast, we mentally build a scenario of the current project, step by step, assuming everything goes well. That scenario leaves little room for surprises, which are by nature hard to foresee. We also set aside the experience of past projects, ours and other people's, by deeming them special cases. The bias is tied to optimism: we want the project to succeed quickly, and our forecasts line up with that wish. What Daniel Kahneman and Amos Tversky called the "inside view" (the project's plan) wins out over the "outside view" (the statistics of comparable projects).

## Examples

- You expect a home renovation to take a weekend, and it takes three weeks.
- A development team promises delivery "in two sprints" although the last three releases each took twice as long.
- The Sydney Opera House, due in 1963, only opens in 1973, at a cost more than ten times the original estimate.
- Berlin Brandenburg Airport, scheduled to open in 2011, only welcomes its first passengers in 2020.

## Did you know?

In 1994, psychologists Roger Buehler, Dale Griffin and Michael Ross asked 37 psychology students to predict how long their senior thesis would take. On average they estimated 34 days, and 49 days if everything went as badly as possible. They actually took almost 56 days, and only about 30% finished within their own prediction. So the bias is not just naivety: even while imagining the worst, they stayed too optimistic. The results are described in the paper [*Exploring the "planning fallacy"*](https://doi.org/10.1037/0022-3514.67.3.366) (Journal of Personality and Social Psychology, 1994).
