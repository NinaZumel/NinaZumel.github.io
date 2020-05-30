---
title: What is Verification by Multiplicity?
date: 2014-03-01
categories:
- Science
- Statistics
tags:
- Astronomy
- data analysis
- kepler
- NASA
- star-finding
permalink: /2014/03/01/what-is-verification-by-multiplicity/
---
<p>There's been a buzz the last few days about the <a href="http://www.universetoday.com/109764/mega-discovery-715-alien-planets-confirmed-using-a-new-trick-on-old-kepler-data/">715 new planets that NASA has verified</a>, using data from the Kepler Space Telescope. This discovery doubles the number of known planets, and turned up four new planets that could possibly support life.</p>

<p><img style="display:block;margin-left:auto;margin-right:auto;" src="{{ site.baseurl }}/assets/planet.png" alt="planets" border="0" /></p>

<p>Beyond the sheer joy of the discovery, one of the interesting aspects of this announcement is the statistical technique that NASA scientists used to winnow out so many planets from the data in bulk: <em>verification by multiplicity</em>. Using this technique, scientists can verify the presence of suspected planets around a star sooner, without having to wait for additional measurements and observations.</p>

<p>I got curious: what is verification by multiplicity? I'm no astronomer, but it's not too difficult to grasp the basic statistical reasoning behind the method, as described in Lissauer et al. “Almost All of Kepler’s Multiple Planet Candidates Are Planets,” to be published in <em>The Astrophysical Journal</em> on March 10 (a <a href="http://arxiv.org/pdf/1201.5424v1.pdf">preprint</a> is available at arxiv.org). My discussion isn't exactly what the researchers did, and I stay with a simple case and avoid the actual astrophysics, but it gets the idea across. I'll use R to work the example, but you should be able to follow the discussion even if you're not familiar with that programming language.</p>

<p><strong>The need for statistical verification</strong></p>

<p>From what I understand of the introduction to the paper, there are two ways to determine whether or not a planet candidate is really a planet: the first is to confirm the fact with additional measurements of the target star's gravitational wobble, or by measurements of the transit times of the apparent planets across the face of the star. Getting sufficient measurements can take time. The other way is to "validate" the planet by showing that it's highly unlikely that the sighting was a false positive. Specifically, the probability that the signal observed was caused by a planet should be at least 100 times larger than the probability that the signal is a false positive. The validation analysis is a Bayesian approach that considers various mechanisms that produce false positives, determines the probability that these various mechanisms could have produced the signal in question, and compares them to the probability that a planet produced the signal.</p>

<p>The basic idea behind verification by multiplicity is that planets are often clustered in multi-planet star systems, while false positive measurements (mistaken identification of potential planets) occur randomly. Putting this another way: if false positives are random, then they won't tend to occur together near the same star. So if you observe a star with multiple "planet signals," it's unlikely that <em>all</em> the signals are false positives. We can use that observation to quantify how much more likely it is that a star with multiple candidates actually hosts a planet. The resulting probability can be used as an improved prior for the planet model when doing the statistical validation described above.</p>

<p><strong>Some quantities of interest</strong></p>

<p>Before we start the discussion, some terminology.</p>

<p>Let <code>ncandidates</code> be the number of potential planets, <code>ntargets</code> be the number of stars that we've observed, and <code>nmulti</code> be the number of stars that appear to have multiple planets. We'll use the same numbers used in Lissauer, et.al.</p>
<pre>ncandidates = 1199 # number of potential planets
nmulti = 170 # number of potential multiplanet systems
ntargets = 160171 # number of targets (stars observed)</pre>
<p>We are also interested in the number of stars that have a single candidate, how many have exactly two candidate planets, how many have three or more, and the number of planet candidates associated with each group.</p>
<pre># number of "doubles": systems with 2 candidates (given in paper)
n2Obs = 115 
# number of candidates in 2-candidate systems
nplanets2Obs = 230 
# no. of "triple_pluses": stars with 3+ candidates (given in paper)
n3plusObs = 55 
# number of candidates in 3+ candidate systems (given in paper)
nplanets3Obs = 178 

# number of stars with a single candidate (derived)
nSingleton = ncandidates-(nplanets2Obs+nplanets3Obs)
# 791

# number of stars with at least one candidate planet (derived)
nCandSystems = nSingleton+n2Obs+n3plusObs
# 961</pre>
<p>We also have to estimate two values. First, <code>P</code>, the fraction of candidates that are actually planets. In this discussion, I'll use <code>P = 0.5</code>, which is a pessimal assumption; in reality (according to the authors) the <code>P</code> is probably more like 0.9. Second, the prior probability that a star has a planet, <code>priorHasPlanet</code>. In this discussion we'll use <code>priorHasPlanet = P * nCandSystems/ntargets</code>, which is about 0.003, or 0.3%, if we assume that <code>P = 0.5</code>. The estimate that Lissauer, et al. use is <code>P * ncandidates/ntargets</code>, which is a little more generous, since it assumes that every candidate is attached to a different star. For the value of <code>P</code> that we are using, the researchers' estimate (0.37%) is not too different from ours.</p>
<p><strong>The statistics</strong></p>
<p>The method depends on two basic assumptions: First, that false positives are randomly distributed among the star systems observed. Second, that false positives and true observations are uncorrelated. Specifically, we assume that the false positives are <a href="http://en.wikipedia.org/wiki/Poisson_distribution">Poisson distributed</a> with an intensity <code>lambda = (1-P)(ncandidates/ntargets)</code>. The Poisson distribution gives the probability of observing <code>n</code> instances of an event that occurs at a rate <code>lambda</code> within a unit of space or time. In our case, the "unit" is a single star, so the Poisson measures the probability of seeing <code>n</code> false positives around a star; multiply that by <code>ntarget</code>, and we get the expected number of stars that will display <code>n</code><br />
false positives.</p>
<pre># estimate of the FP intensity  -&gt; number of FPs per system
lambda = (1-P)*(ncandidates/ntargets)
# [1] 0.003742875

#
# model false positives as a poisson w/ 
# intensity lambda 
#
probFP = function(n, lamb=lambda) {
  dpois(n, lamb)
}

# display number of expected stars with n false positives (FPs), 
# after examining ntargets stars
fps = probFP(0:5)*ntargets
names(fps) = 0:5

# resulting values (rounded to 3 decimal points)
# 
# 0         1         2         3         4         5 
# 1.596e+05 5.973e+02 1.118e+00 1.395e-03 1.305e-06 9.768e-10 
#
# most stars by far have no FPs at all, the rest will have 1 or 2
#</pre>
<p>Suppose we see a star with a single candidate (a "singleton"). What's the probability that this candidate is a planet? It's the complement of the conditional probability that the signal is a false positive, conditioned on the probability of observing a singleton.</p>
<pre># prob. that signal is an FP, conditioned on only seeing one signal
p1 = probFP(1)/(nSingleton/ntargets)
# [1] 0.75507  -- so 25% chance it's a planet</pre>
<p>In English: we observed 791 "singleton" stars. Under our Poisson assumption, we would expect to see about 597 singleton false positives when observing <code>ntargets</code> stars. That means that about 597/791, or 0.75 of our observations are probably false positives, and only about 25% of them are really planets.</p>
<p>What if we see a star with two candidates (a "double")? There are three cases: both observations are false positives; one observation is a false positive; or both observations are planets. The probability of the first case:</p>
<pre># prob of seeing 2 FPs, conditioned on seeing 2 signals
p2_2fps = probFP(2)/(n2Obs/ntargets)
# [1] 0.009719438  -- 0.97%</pre>
<p>To get the probability of the second case, we use the assumption that false positives and planets are uncorrelated, so the probability <span style="line-height:1.5em;">of seeing both is the product of the two individual probabilities.</span></p>
<pre># prob of seeing 1 FP and 1 planet, conditioned on seeing 2 signals
p2_1fp = probFP(1)*priorHasPlanet/(n2Obs/ntargets)
# [1] 0.01558028</pre>
<p>The chance of seeing two false positives near a single star is quite low, about a percent. That means with 99% probability, this <span style="line-height:1.5em;">star has at least one planet! That's a much higher probability than our prior of 0.3%. In fact, the most likely scenario is that both signals are planets: </span><code style="line-height:1.5em;">1 - (p2_2fps + p2_1fp)</code><span style="line-height:1.5em;">, or 0.974.</span></p>
<p>What's the probability that a given signal is a planet? It's the probability of being in case 3 (2 planets), plus one half times the probability of being in case 2 (1 planet, 1 FP).</p>
<pre># prob. that a signal is a planet, conditioned on seeing 2 signals
p2planets = 1 - (p2_2fps+p2_1fp)
p2planets + 0.5*p2_1fp
# [1] 0.9824904 -- 98.2% chance it's a planet</pre>
<p>You can do something similar with "triple_plus" stars; it's more complicated, but the idea is the same.</p>
<p>These boosts in probability are dramatic, but they depend on several assumed values: <code>P</code>, <code>lambda</code>, and <code>priorHasPlanet</code>. However, the general idea holds: observing multiple false positives around a single star is unlikely, so a star with multiple candidates has an elevated probability of hosting planets, and using the "no information" prior (0.003, in our case) for doing the validation analysis is not optimal. So it looks like what the researchers actually did (despite having gone through a set of calculations similar to the ones above) is to use the empirical counts of stars with multiple candidates to estimate appropriate (and somewhat more conservative) "multiplicity boosts" to the prior. This sort of makes sense; most stars with only one candidate will be false positives; most stars with multiple candidates will host planets (just not necessarily as many planets as there are signals). The boost in signals should mirror the boost in planet probability.</p>
<pre># prob. that star has a candidate
p1 = nCandSystems/ntargets
# 0.005999838, or roughly 1/167

# prob. star w/ at least 1 candidate hosts another
p2plus = (n2Obs+n3plusObs)/nCandSystems
# [1] 0.1768991, or roughly 1/6

# prob. star w/ at least 2 candidates hosts another
p3plus = n3plusObs/(n2Obs+n3plusObs)
# [1] 0.3235294, or roughly 1/3

# multiplicity boost for observing 2 signals
p2plus/p1
# [1] 29.48397

# multiplicity boost for observing 3+ signals
p3plus/p1
# [1] 53.92303</pre>
<p>So, when you are validating a candidate from a star with two candidates, you boost the prior probability of being a planet by a factor of about 30 from the "no information" prior; when you are validating a candidate from a star with three or more candidates, you boost the prior by a factor of about 50. The resulting boosts are apparently enough to validate several more planets than ever before, without needing to take more measurements.</p>
<p>Of course, there are all sorts of caveats. Is the assumption that false positives and planets are uncorrelated valid? When? The Poisson model also assumes that false positives are uncorrelated with each other. Is that assumption valid? There are additional issues around associating candidates with the wrong star, and the signals produced by binary or multiple star systems. But that's all astrophysics, and outside my expertise. The statistics presented in the paper, however, is quite straightforward.</p>
<p>EDIT: SciShow's segment on the Kepler and the planetary verifications referenced this post in its credits! The credits can only be seen on the YouTube page, unfortunately.</p>
<hr />
<p><em><strong>Image</strong>: Artist's rendition of Kepler-11 and its six planets. <strong>Credit</strong>: NASA/Tim Pyle</em></p>
<p>Photo sourced from <a href="http://kepler.nasa.gov/multimedia/artwork/artistsconcepts/?ImageID=121">Kepler Website, Ames Research Center</a></p>
