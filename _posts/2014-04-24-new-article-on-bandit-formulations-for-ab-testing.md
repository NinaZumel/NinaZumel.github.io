---
title: New Article on Bandit Formulations for A/B Testing
date: 2014-04-24
categories:
- Data Science
- Statistics
tags:
- A/B testing
- bandit problems
permalink: /posts2014/04/24/new-article-on-bandit-formulations-for-ab-testing/
---
<p>I have a new article up on the Win-Vector blog: <a href="http://www.win-vector.com/blog/2014/04/bandit-formulations-for-ab-tests-some-intuition/">Bandit Formulations for A/B Tests: Some Intuition</a>. The article discusses the <em>bandit problem</em> formulation as an alternative to significance-based formulations for A/B tests.</p>

<p><img style="display:block;margin-left:auto;margin-right:auto;" src="{{ site.baseurl }}/assets/expectedlossmulti.jpg" alt="ExpectedLossMulti" border="0" /></p>

<blockquote><p>A/B tests are one of the simplest ways of running controlled experiments to evaluate the efficacy of a proposed improvement (a new medicine, compared to an old one; a promotional campaign; a change to a website). To run an A/B test, you split your population into a control group (let’s call them “A”) and a treatment group (“B”). The A group gets the “old” protocol, the B group gets the proposed improvement, and you collect data on the outcome that you are trying to achieve: the rate that patients are cured; the amount of money customers spend; the rate at which people who come to your website actually complete a transaction. In the traditional formulation of A/B tests, you measure the outcomes for the A and B groups, determine which is better (if either), and whether or not the difference observed is statistically significant. This leads to questions of test size: how big a population do you need to get reliably detect a difference to the desired statistical significance? And to answer that question, you need to know how big a difference (effect size) matters to you.</p>

<p>The irony is that to detect small differences accurately you need a larger population size, even though in many cases, if the difference is small, <em>picking the wrong answer matters less</em>. It can be easy to lose sight of that observation in the struggle to determine correct experiment sizes.</p>
<p>There is an alternative formulation for A/B tests that is especially suitable for online situations, and that explicitly takes the above observation into account: the so-called <em>multi-armed bandit problem</em>. Imagine that you are in a casino, faced with K slot machines (which used to be called “one-armed bandits” because they had a lever that you pulled to play (the “arm”) — and they pretty much rob you of all your money). Each of the slot machines pays off at a different (unknown) rate. You want to figure out which of the machines pays off at the highest rate, then switch to that one — but you don’t want to lose too much money to the suboptimal slot machines while doing so. What’s the best strategy?</p></blockquote>

<p>Read the rest of the article <a href="http://www.win-vector.com/blog/2014/04/bandit-formulations-for-ab-tests-some-intuition/">here</a>. Enjoy.</p>
