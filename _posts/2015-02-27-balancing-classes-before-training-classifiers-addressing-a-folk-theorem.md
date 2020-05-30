---
title: Balancing Classes Before Training Classifiers - Addressing a Folk Theorem
date: 2015-02-27
categories:
- Data Science
- Statistics
tags:
- classifier performance
- folk theorems
- logisitic regression
- machine learning
- random forest
- SVM
permalink: /2015/02/27/balancing-classes-before-training-classifiers-addressing-a-folk-theorem/
---
We've been wanting to get more into training over at Win-Vector, but I don't want to completely give up client work, because clients and their problems are often the inspiration for cool solutions -- and good blog articles. Working on the video course for the last couple of months has given me some good ideas, too.

<img style="display:block;margin-left:auto;margin-right:auto;" src="{{ site.baseurl }}/assets/model_compare.png" alt="Comparing models" border="0" /> 

<p>A lot of my recreational writing revolves around folklore and superstition -- the ghosty, monster-laden kind. Engineers and statisticians have their own folk beliefs, too: things we wish were true, totemistic practices we believe help. Sometimes there's a rational basis for those beliefs, sometimes, there isn't. <a href="http://www.win-vector.com/blog/2015/02/does-balancing-classes-improve-classifier-performance/">My latest Win-Vector blog post</a> is about one such folk theorem.</p>

<blockquote><p>It’s a folk theorem I sometimes hear from colleagues and clients: that you must balance the class prevalence before training a classifier. Certainly, I believe that classification tends to be easier when the classes are nearly balanced, especially when the class you are actually interested in is the rarer one. But I have always been skeptical of the claim that artificially balancing the classes (through resampling, for instance) always helps, when the model is to be run on a population with the native class prevalences.</p></blockquote>

<p>For some problems, with some classifiers, it does help -- but for others, it doesn't. I've already gotten a great, thoughtful comment on the post, that helps articulate possible reasons behind my results. It's good for us to introspect sometimes about our techniques and practices, rather than just blindly asserting that "this is how we do it." Because even when we're right, sometimes we're right for the wrong reasons, which to me is worse than simply being wrong.</p>

<p><a href="http://www.win-vector.com/blog/2015/02/does-balancing-classes-improve-classifier-performance/">Read the post here</a>.</p>
