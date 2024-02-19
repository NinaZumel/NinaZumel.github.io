---
title: Design, Problem Solving, and Good Taste
date: 2014-11-25
tags:
- musings
- design
---
I ran across <a href="http://juretriglav.si/standards-for-graphic-presentation/">this essay</a> recently on the role of design standards for scientific data visualization. The author, Jure Triglav, draws his inspiration from the creation and continued use of the NYCTA Graphics Standards, which were instituted in the late 1960s to unify the signage for the New York City subway system. 

{% image "./images/subway.jpg", "New York City subway sign", "60vw" %}
<p class="caption">Image: <a href="http://juretriglav.si/standards-for-graphic-presentation/">A Case for Spaceships</a> (Jure Triglav)</p>

<p>As the author puts it, the <a href="http://thestandardsmanual.com">Graphics Standards Manual</a> is "a timeless example of great design elegantly solving a real problem." Thanks to the unified iconography, a traveler on the New York subway knows exactly what to look for to navigate the subway system, no matter which station they may be in. And the iconography is beautiful, too.</p>

{% image "./images/unimark.jpg", "Photo of Unimark Employees", "60vw" %}
<p class="caption">
Unimark, the design company that designed the Graphics Standards.<br />Aren't they a hip, mod looking group? And I'm jealous of those lab coats.<br />Image: <a href="http://juretriglav.si/standards-for-graphic-presentation/">A Case for Spaceships</a> (Jure Triglav)
</p>

<p>What works to clarify subway travel will work to clarify the morass of graphs and charts that pass for scientific visualization, Triglav argues. And we should start with the work of the Joint Committee on Standards for Graphical Presentation, a group of statisticians, engineers, scientists, and mathematicians who first adopted a set of standards in 1914, revised in 1936, 1938, and 1960. </p>

<p>I agree with him -- mostly.</p>


<p>The <a href="http://www.jstor.org/stable/2965153 .">1914</a> and <a href="http://hdl.handle.net/2027/wu.89083916932">1938</a> reports are online; if you have read William Cleveland's <em>The Elements of Graphing Data</em> or Darrell Huff's <em>How to Lie with Statistics</em>, you will have seen most of the guidelines before, although I thought the 1938 report in particular was especially clear and eloquent about its guiding principles. It should be noted that the 1938 document emphasizes that the guidelines are only that -- they are not intended as a set of rigid rules.</p>

<blockquote><p>The committee believes that effective presentation calls for flexibility of treatment rather than for standardization, that each chart should be individually planned with due reference to the special characteristics of the data and the particular use to which the chart is to be put.</p></blockquote>

<p>And in fact, while Cleveland and Huff definitely both echo the Joint Committee's recommendations, they do disagree in places, for example on whether or not a graph of quantities should always include zero. It depends on the use of the chart: exploration vs. presentation. The NYCMTA Graphics Standards address a specific situation; in this case, fixed, rigid standards are appropriate. When we are discussing all of scientific and engineering visualization, the best we can hope for are a set of guiding principles. What the Joint Committee -- and Cleveland, Huff, Tufte, and others -- were really trying to do is to set the standards for good taste.</p>

---

<p>People think of taste as a subjective thing, and when it comes to food, fashion, film, art, or literature, that's true. One person's great read is another person's awful junk. I avoid accusing anyone of having "bad taste" when it comes to the subjects above. But in the problem solving disciplines - computer science (coding in particular), engineering, architecture, ergonomics, math, science, and so on - I think that bad taste is a real thing. A real harmful thing. We already use terms like "elegant" or "ugly" when we describe mathematical proofs, or code, or other solutions to various problems. Some "solutions" can be so ugly that they are in fact counterproductive. That's bad taste. </p>

<p>Let's go back to our mass transit example with <a href="http://www.sarahdoody.com/everyday-ux-bart-ticket-machines-san-francisco/#.VHVcw76ppSU">this critique</a> from user experience designer Sarah Doody on the badly designed ticket machines (that were in place at the time of her visit) for BART, San Francisco's subway/light-rail system. And in her criticism, she didn't even get to what I'd noticed was the biggest problem for new users: where the purchased ticket came out was <em>nowhere near</em> either the screen or the slot where you entered money; it came out well below eye level (in the red region of the left image, below). Compare that with the MTA's ticket machines, where the ticket dispensers are right next to the money insertion slot:</p>


{% image "./images/tickets-001.jpg", "Old BART ticket machine, compared to MTA ticket machine of the same era", "60vw" %}
<p class="caption">Left image: <a href="http://www.nileguide.com/destination/blog/san-francisco-bay-area/2010/08/19/getting-around-the-bay-on-public-transportation/">Nile Guide</a>; Right image: <a href="https://www.flickr.com/photos/revstan/4375747918/">Rev Stan, Flickr</a></p>

<p>To my mind, the old BART ticket machine is the equivalent of spaghetti code: technically, it gets the job done, but it's ugly, incomprehensible, and as Ms. Doody points out, many of the choices that went into its creation are just plain wrong. Its design, such as it was, could be fairly called bad taste. Some people see it the other way:</p>

<p>
<blockquote><p>What we are trying to point out is: design is not always just a matter of taste. With enough design principles in mind (such as least astonishment, Liskov substitution, and a few others) you can actually say some design decisions are wrong (and maybe even some day some other design decisions are right). There are very few general principals of software system design, so you really don’t want to ignore the few you have.</p></blockquote>
<div align="center">-- John Mount, <a href="http://www.win-vector.com/blog/2014/09/factors-are-not-first-class-citizens-in-r/">Factors are not First-class Citizens in R</a></div>
</p>

<p>I would argue that design <em>is</em> a matter of taste. It's just that, in the problem-solving disciplines, taste is not entirely subjective.</p>
