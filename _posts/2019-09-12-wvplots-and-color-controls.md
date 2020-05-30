---
title: WVPlots and Color Controls
date: 2019-09-12
categories:
- Data Science
- Statistics
tags:
- Brewer color palettes
- ggplot2
- R
- R packages
- visualization
- WVPlots
permalink: /posts/2019/09/12/wvplots-and-color-controls/
---
<p>I've put a new release of the <a href="https://winvector.github.io/WVPlots/"><code>WVPlots</code></a> package up on CRAN. This release adds consistent palette and/or other color controls to most of the functions in the package.</p>

<p><img style="display:block;margin-left:auto;margin-right:auto;" src="{{ site.baseurl }}/assets/unnamed-chunk-1-1.png" alt="Unnamed chunk 1 1" border="0" /></p>

<p><code>WVPlots</code> was originally a convenience package just for us; we put it up on CRAN in the hopes that other people might find our plots to be useful as well. Because it was just for us, we tended to hard-code in our preferred color choices. For example, for plots that color-code by group, I tend to prefer the Brewer <code>Dark2</code> palette because it is</p>
<ul>
<li>saturated,</li>
<li>color-blind friendly for a small number of classes,</li>
<li>gray-scale printing friendly (though not photocopy-friendly),</li>
<li>reasonably perceptually uniform.</li>
</ul>
<p>This last property is important when you don't want the viewer to prefer certain groups over others. Of course, you may have other desiderata for your visualization needs. Sequential or diverging palettes are useful when you do wish to imply an order or ranking among groups; sequential palettes can also be color-blind friendly over a larger number of classes. If perceptual uniformity is important, then the viridis palettes are analytically designed to be perceptually uniform and color-blind friendly (and apparently print-friendly as well). And when you are reporting results and wish to "tell stories" with your data---that is, visually draw your audience to the conclusion you wish them to reach---then hand-tuning your color palette to draw users to pay attention to important groups rather than to less relevant ones can be crucial.</p>
<p>The Brewer family of palettes, developed by cartographer <a href="http://www.personal.psu.edu/cab38/">Cynthia Brewer</a> in the early 2000s, includes a variety of qualitative, diverging, and sequential palettes, originally designed for map making. Since the perceptual issues around making legible maps are similar to the issues around making legible data visualizations, I find the Brewer palettes incredibly useful for data science, and <code>WVPlots</code> reflects this preference. If you prefer other palettes, it is also possible to "turn off" the Brewer palettes and use <code>ggplot2</code>'s default color scheme, to use <a href="https://ggplot2.tidyverse.org/reference/scale_viridis.html">viridis</a>, or to <a href="https://ggplot2.tidyverse.org/reference/scale_manual.html">manually specify</a> the color palette.</p>
<p>You can see some examples of the palettes and color controls in use, in <a href="http://www.win-vector.com/blog/2019/09/wvplots-1-1-2-on-cran/">my official announcement</a> of the new version release on the Win-Vector blog.</p>
<p>Here are more interesting references on color, color palettes and their uses:</p>
<p><a href="http://colorbrewer2.org"><em>colorbrewer2.org</em></a>: A super-useful website for browsing the Brewer palettes. Provides the color designations in Hex, RGB, and CMYK, along with advisory information on whether palettes are color-blind friendly, print friendly, photocopy friendly, and LCD friendly.</p>
<p><a href="https://esripress.esri.com/display/index.cfm?fuseaction=display&amp;websiteID=293&amp;moduleID=1"><em>Designing Better Maps: A Guide for GIS Users</em></a>: Professor Brewer's textbook on map design. Primarily for cartographers, of course, but possibly of interest to data scientists who need to analyze, visualize, and present geographically-based data. Includes a couple of chapters on the use of color, and an appendix about the colorbrewer website.</p>
<p>David Nichols's <a href="https://davidmathlogic.com/colorblind/#%23FFC20A-%230C7BDC"><em>Coloring for Colorblindness</em></a> site includes an online tool to help non-colorblind people visualize what various palettes look like to viewers with various types of colorblindness. It also includes links and suggestions on various colorblind-friendly palettes.</p>
<p><a href="http://bids.github.io/colormap/">A discussion and video</a> about the development of the viridis palettes by Stéfan van der Walt and Nathaniel Smith, the palette designers. The viridis palettes were originally developed for Python's <code>matplotlib</code> library.</p>
<p><a href="https://www.wiley.com/en-us/Storytelling+with+Data%3A+A+Data+Visualization+Guide+for+Business+Professionals-p-9781119002253"><em>Storytelling with Data: A Data Visualization Guide for Business Professionals</em></a>: Cole Nussbaumer Knaflic's excellent text on effective communication via data visualization. Includes numerous tips on the use of color to guide your narrative.</p>
<p>Happy plotting!</p>
