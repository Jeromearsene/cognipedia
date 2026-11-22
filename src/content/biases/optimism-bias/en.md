---
slug: "optimism-bias"
title: "Optimism bias"
originalName: "Optimism bias"
family: "need-to-act-fast"
tags: ["future", "risk", "prediction"]
difficulty: "medium"
sources:
  wikipedia: "https://en.wikipedia.org/wiki/Optimism_bias"
  papers:
    - title: "How Unrealistic Optimism Is Maintained in the Face of Reality — Sharot, Korn & Dolan, 2011"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1038/nn.2949"
  videos:
    - title: "The Optimism Bias — Tali Sharot (TED)"
      url: "https://www.ted.com/talks/tali_sharot_the_optimism_bias"
      lang: "en"
relatedBiases: ["planning-fallacy", "overconfidence-effect"]
situation:
  type: "choice"
  scenario: "A study shows that in France, roughly one marriage in two ends in divorce. You've just gotten married (or are seriously planning to). What do you think your own personal probability of divorcing one day is?"
  choices:
    - label: "Much lower than 50%: my relationship is different, that statistic doesn't really apply to me"
      bias: true
    - label: "I don't have a good reason to think my relationship is any less exposed than anyone else's"
      bias: false
  reveal: "In studies on the topic, nearly all newly married couples rate themselves as noticeably less likely to divorce than average — even though, by definition, not everyone can be \"below average.\" That's the optimism bias: we spontaneously believe we're less exposed than others to negative events, even without disputing the statistic itself."
quiz:
  questions:
    - question: "The optimism bias (or comparative optimism) refers to the fact that..."
      level: easy
      choices:
        - "people tend to believe they are personally less at risk of negative events than other people on average"
        - "people are generally unable to predict the future in any domain"
        - "people always believe a situation will improve over time"
      correct: 0
      explanation: "The optimism bias isn't a general inability to predict the future, or a belief that \"things always work out\": it is specifically the tendency to judge oneself less at risk than others for a given negative event, even while accepting the statistic that applies to the group."
    - question: "Why does this bias often shrink when comparing your own risk to a specific person close to you, rather than to \"people in general\"?"
      level: medium
      choices:
        - "Because you have concrete information about that person, which weakens the comparison to a vague, stereotyped image of a \"person at risk\""
        - "Because you automatically feel responsible for that person's safety"
        - "Because statistics, by definition, only apply to strangers"
      correct: 0
      explanation: "Compared with someone whose habits and precautions you actually know, it's harder to see yourself as the exception: the bias partly rests on a comparison with a vague, stereotyped image of an at-risk person, which weakens once the comparison target becomes concrete."
    - question: "In Sharot, Korn & Dolan's (2011) neuroimaging study, what happened when participants were told their real risk of a negative event was HIGHER than they had estimated?"
      level: hard
      choices:
        - "Their brains encoded this unfavorable information less effectively, and their beliefs updated only weakly, unlike what happened with equivalently good news"
        - "Their brains processed this information exactly like good news, with no measurable difference"
        - "They immediately and durably revised their estimate upward, symmetrically to good news"
      correct: 0
      explanation: "Sharot, Korn and Dolan found an asymmetric updating of beliefs: activity in certain frontal regions tracked better-than-expected information well, but tracked worse-than-expected information poorly — which helps explain why optimism holds up so well against unwelcome statistics."
---

## Definition

The optimism bias (or comparative optimism) is the tendency to believe that you are personally less likely than other people to experience negative future events — and, to a lesser extent, more likely to experience positive ones. First described by psychologist Neil Weinstein in 1980, it is one of the most universal and robust biases documented: it shows up regardless of age, sex, or culture, and versions of it have even been reported in animals.

## Mechanism

Three layers combine to produce this bias. First, a motivational layer: believing you're less vulnerable than average protects your self-image and gives a sense of control, especially for risks you associate with your own behavior (not smoking, driving carefully). Second, a cognitive layer: when judging your risk "relative to others," you mostly draw on what you know about yourself — your own precautions and habits — while comparing that to a vague, often stereotyped image of an "at-risk" person, rather than to the real precautions other people actually take. That's why the bias shrinks noticeably when the comparison target is a specific person close to you rather than "people in general." Finally, neuroimaging work (Sharot, Korn & Dolan, 2011) has uncovered an asymmetric belief-updating mechanism: when information about your own future turns out better than expected, the brain integrates it efficiently; when it's worse than expected, it's encoded far less effectively, so the original, overly optimistic belief resists correction.

## Examples

- A smoker, well aware of the link between smoking and lung cancer, judges that this risk applies more to "other smokers" than to themselves.
- Young drivers rate themselves as less likely to have an accident than "other drivers their age," even though insurance statistics make no such individual exceptions.
- A project lead, told that nine out of ten similar projects overrun their initial budget, remains convinced theirs will be the exception (see the planning fallacy).
- Officials overseeing major infrastructure projects (Olympic Games, rail lines) keep presenting optimistic budgets, project after project, despite a near-systematic history of overruns.

## Did you know?

In their study [*How Unrealistic Optimism Is Maintained in the Face of Reality*](https://doi.org/10.1038/nn.2949) (Nature Neuroscience, 2011), Tali Sharot, Christoph Korn, and Raymond Dolan asked participants to estimate their personal risk of experiencing 80 different negative life events (cancer, divorce, burglary...), then revealed the real population rate for each. When the true statistic was better than feared, participants faithfully adjusted their next estimate. But when it was worse, they barely adjusted at all — a pattern that brain imaging linked to reduced activity in the right inferior frontal cortex when processing bad news. According to the authors, it's this asymmetric processing of information, not simply a refusal to look at the statistics, that keeps optimism in place despite evidence to the contrary.
