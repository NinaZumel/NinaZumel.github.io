---
title: On Being a Data Scientist
date: 2012-09-19
categories:
- Data Science
- Musings
- Statistics
tags:
- musings
permalink: /2012/09/19/on-being-a-data-scientist/
---
<p>When people ask me what it means to be a data scientist, I used to answer, "it means you don't have to hold my hand." By which I meant that as a data scientist (a consulting data scientist), I can handle the data collection, the data cleaning and wrangling, the analysis, and the final presentation of results (both technical and for the business audience) with a minimal amount of assistance from my clients or their people. Not <em>no</em> assistance, of course, but little enough that I'm not interfering too much with their day-to-day job.</p>

<p>This used to be a key selling point, because people with all the necessary skills used to be relatively rare. This is less true now; data science is a hot new career track. Training courses and academic tracks are popping up all over the place. So there is the question: what should such courses teach? Or more to the heart of the question -- what does a data scientist do, and what do they need to know?</p>

<p>Hilary Mason and Chris Wiggins <a href="http://www.dataists.com/2010/09/a-taxonomy-of-data-science/">took a crack at answering that a couple of years ago</a>. They break down data science, the process, into 5 steps: </p>
<ul>
<li><strong>Obtain</strong> the data: in their case from Web APIs. </li>
<li><strong>Scrub</strong> the data: Look for missing data, bad data, outlier. Regularize text data (for instance locations: is "CA" California, or Canada? What about "Cal.", "Ca", "California", "San Francisco", etc..).
    </li>
<li><strong>Explore.</strong> And visualize. Here and during the scrub step is where I might start thinking about the best representations of the data, for modeling. Here is where I begin variable selection.</li>
<li><strong>Model.</strong> And evaluate. This is where the statistics and machine learning knowledge comes in.</li>
<li><strong>Interpret.</strong> And disseminate.</li>
</ul>
<p>That's basically the breakdown most of us would give. Their focus is on web analysis and on data collection over the web; generally my focus has been on clients who <em>have</em> the data (albeit in some completely cryptic form); it's our job to wring some insight from it -- somehow. So in addition to the emphasis that Mason and Wiggins place on scripting languages and unix tools, I would also add knowledge of SQL, and a tool like R that can access data directly from the database for analysis. My colleague John Mount would also add that <a href="http://www.win-vector.com/blog/2012/07/minimal-version-control-lesson-use-it/">version-control is a must</a>. As with software engineering, data science is a process where "that one last tweak" to the model or to the data handling can turn out to be a tweak too many...</p>
<p>Beyond the tools, and the technical details, though -- what would I add?</p>
<p>I would add that the process is a loop; more than that, it's loops within loops. Obtain-Scrub-Explore is often one loop. Scrub (Represent)-Explore-Model can be another loop. It always depends.</p>
<p>I would add that a healthy understanding of the business processes that generate the data is essential -- otherwise you are apt to "discover" things in the data that everyone (that is, your client) already knows, because they are known artifacts of the business process. The insights in data are like degrees of freedom. Don't eat up your degrees of freedom on known phenomena. If you don't have that domain knowledge yourself, make sure your client partners you with a contact who does.</p>
<p>I would add that a solid understanding of statistics fundamentals is essential (and the whole <a href="http://www.win-vector.com/blog/">Win-Vector blog </a>attests to how much time we spend thinking about fundamentals), but stat and machine learning are not the core of the job. The real science, in my opinion -- the part where you form hypotheses, test them, revise them -- comes less in the modeling and more in the scrub and explore steps. Why does this branch of the bank report recoveries where they never reported losses? What is that "profit" column reporting, really? Does gross national product really predict mortgage defaults, or is it just a proxy variable for time (and in the recent economy, time predicts mortgage default rate pretty well)?</p>
<p>And there is more science after the modeling, during the evaluation phase. Or more prosaically: the debug phase. Why does the model report absolute nonsense on this one subset of the data? Is the error in the modeling? The data handling? The programming? The "modeling" step itself is actually a very small, and relatively straightforward, part of the overall process.</p>
<p>No one ever wants to hear this. We all come into the job hoping to wield support vector machines or neural nets like Wonder Woman wields her magic lasso: we capture the data, and then wrest the truth out of it, willy-nilly. I wish. I'd love to wear those cool bullet-deflecting bracelets, too.</p>
<div style="width:image width px;font-size:80%;text-align:center;">
<img style="display:block;margin-left:auto;margin-right:auto;" src="{{ site.baseurl }}/assets/newimage6.png" alt="NewImage" border="0" />Art: Alex Ross</div>
<p>My point here is that answering the original question is more a discussion of process than a checklist of skills to have and technologies to be familiar with.</p>
<p>What would you add? What do you think a data scientist needs to know?</p>
