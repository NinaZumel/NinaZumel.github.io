---
title: 'New on Win-Vector: Checking your Data for Signal'
date: 2015-08-11
categories:
- Data Science
- Statistics
- Writing
tags:
- model significance
- permutation test
- variable selection
permalink: /posts/2015/08/11/new-on-win-vector-checking-your-data-for-signal/
---
<p>I have <a href="http://www.win-vector.com/blog/2015/08/how-do-you-know-if-your-data-has-signal/">a new article</a> up on the Win-Vector Blog, on checking your input variables for signal:</p>

<p><img style="display:block;margin-left:auto;margin-right:auto;" src="{{ site.baseurl }}/assets/newimage8.png" alt="NewImage8" border="0" /></p>

<blockquote><p>An all too common approach to modeling in data science is to throw all possible variables at a modeling procedure and “let the algorithm sort it out.” This is tempting when you are not sure what are the true causes or predictors of the phenomenon you are interested in, but it presents dangers, too. Very wide data sets are computationally difficult for some modeling procedures; and more importantly, they can lead to overfit models that generalize poorly on new data. In extreme cases, wide data can fool modeling procedures into finding models that look good on training data, even when that data has no signal. We showed some examples of this previously in our <a href="http://www.win-vector.com/blog/2014/02/bad-bayes-an-example-of-why-you-need-hold-out-testing/">“Bad Bayes”</a> blog post.</p>
<p>In this latest <a href="http://www.win-vector.com/blog/tag/statistics-as-it-should-be/">“Statistics as it should be” </a>article, we will look at a heuristic to help determine which of your input variables have signal.</p></blockquote>

<p><a href="http://www.win-vector.com/blog/2015/08/how-do-you-know-if-your-data-has-signal/">Read the article here</a>.</p>

<p>Another underlying motivation for this article is to encourage giving empirical intuition for common statistical procedures, like testing for significance -- in this case testing that your model against the null hypothesis that you are fitting to pure noise. As a data scientist, you may or may not use my suggested heuristic for variable selection, but it's good to get in the habit of thinking about the things you measure, and not just <em>how</em> to take the measurements, but <em>why</em>.</p>
