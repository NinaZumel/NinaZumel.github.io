---
title: Playing With Sidenotes
date: 2024-09-04
tags:
 - design
 - musings
---

For no particular reason, I started wondering if I could add sidenotes to my blog. I've always liked them better than endnotes, especially for longer documents. This led me to the more general question: *Is there an eleventy template for sidenotes*?

The answer is [yes](https://eleventufte.netlify.app/). But before plunging in, I decided to try a fresh blog first. My [repository of medieval ghost stories](https://github.com/NinaZumel/TwelveMedievalGhostStories) (forked from an earlier repo) seemed like a useful test case.

It was also a hard test case: these are scholarly documents, and the notes are long and dense -- exactly the case that Tufte-CSS based sidenote solutions don't handle well. I ended up using a [javascript based solution](https://markllobrera.com/posts/sidenotes/) that I found on the web.

The result is the [Twelve Medieval Ghost Stories](https://ninazumel.com/TwelveMedievalGhostStories/) website.

It looks great; the sidenotes work really well, and drop down to regular endnotes on narrow browsers. But the grid-based paradigm this solution uses seems really brittle, and I don't want to restructure my entire blog template to support it. 

So back to thinking about Tufte-CSS. But this wasn't a waste; I've learned some potentially useful things, and this is a fairly nice presentation of the ghost stories. I'll just let it percolate in my head for a little longer.