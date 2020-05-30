---
title: 'New on Win-Vector: Variable Selection for Sessionized Data'
date: 2015-07-15
categories:
- Data Science
- Statistics
- Writing
tags:
- data science
- gradient boosting
- sessionized data
- stepwise regression
- variable selection
permalink: /2015/07/15/new-on-win-vector-variable-selection-for-sessionized-data/
---
I've just put up <a href="http://www.win-vector.com/blog/2015/07/working-with-sessionized-data-2-variable-selection/">the next installment</a> of the new "Working with Sessionized Data" series on Win-Vector.

<p><img style="display:block;margin-left:auto;margin-right:auto;" src="{{ site.baseurl }}/assets/newimage2.png" alt="NewImage" border="0" /></p>
<div align="center">Illustration: Boris Artzybasheff<br />
photo: <a href="https://www.flickr.com/photos/x-ray_delta_one/4203801748/in/album-72157622345988524/">James Vaughan</a>, some rights reserved</div>

<p>As I mentioned in the previous installment, sessionizing log data can potentially lead to very wide data sets, with possibly more variables than there are rows in the training data. In this post, we look at variable selections strategies for this situation -- or for any very wide data situation, really.</p>

<blockquote><p>In the previous installment, we built a regularized (ridge) logistic regression model over all 132 features. This model didn’t perform too badly, but in general there is more danger of overfitting when working with very wide data sets; in addition, it is quite expensive to analyze a large number of variables with standard implementations of logistic regression. In this installment, we will look for potentially more robust and less expensive ways of analyzing this data.</p></blockquote>

<p>Read the rest of the post <a href="http://www.win-vector.com/blog/2015/07/working-with-sessionized-data-2-variable-selection/">here</a>.</p>
<p>Enjoy.</p>
