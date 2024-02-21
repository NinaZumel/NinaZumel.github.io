---
title: Clarity, Not Magic
date: 2024-02-21
tags:
 - design
 - blogging
 - musings
---
After migrating this blog to Eleventy, I made the comment on Micro.blog that Eleventy "is so much easier to wrap my arms around" than Jekyll was. That got me to wondering--why is that?

After some thought, I came up with a few reasons:
* Newbie-friendly design and documentation that makes the process less opaque.
* Starter code that is simple to read, but that still illustrates useful functionality
* A blog deployment process that is manual, but not mystical.

That last point is the crux, for me. After all, the reason I migrated my site was because the old one broke, and *I didn't know how to fix it*. I won't lie. The way the old site got automatically built and deployed on Github Pages was mysterious to me. I found a Jekyll template I wanted, and followed some directions that seemed to work, and *Voila!* To me, setting up that first website was not that far removed from following some arcane ritual.

And it worked, until it didn't. I knew that something, somewhere was going out of date and needed to be updated, but I didn't know what, or how. And so I had to start from scratch.

And this time, no magic incantations.

So, this post will expand upon the points above, but it's really not about my adventures with Eleventy. It's meant to be a concrete exploration of some general principles about how to design a process; how to teach (or document) a process; and the difference between informed, purposeful action versus blindly following ritual.

Read on.

{% image "./images/sorcerer-barth.png", "Illustration of the Sorcerer's Apprentice trying to bring the broom to life. Ferdinand Barth", "20vw" %}
<p class="caption">Illustration of Goethe's <em>Der Zauberlehrling</em> (The Sorcerer's Apprentice), 1882. Artist: Ferdinand Barth</br> 
Source: <a href="https://commons.wikimedia.org/wiki/File:Tovenaarsleerling_S_Barth.png">Wikimedia</a></p>

## Newbie-Friendly, Non-Opaque Design

The default way of putting a blog on Github Pages involves some mysterious (to me) interaction of Gemfiles and Github Actions and automated processes that are hidden from the user. I try reading the documentation, but it's written assuming some background context/knowledge that I don't have. I can make it work--I've put up at least three Jekyll blogs, starting from other people's templates--but I've never really understood the workings of the process. And every time I want to put up a blog, I have to look up how to do it. 

The Eleventy "Get Started" page is so newbie-friendly that it even has a link to [a page that explains terminal windows](https://www.11ty.dev/docs/terminal-window/). It walked me through installing Node.js, and the commands that I need to install Eleventy, build a rudimentary website, and serve it (locally). Now, I don't know anything about Node.js or JavaScript, but by walking through the tutorial and looking at the artifacts produced: the `package.json`, the `node_modules` directory, and so on -- I gained some intuition about how the process works. 

Because I feel like I understand what's going on, I can write down the steps in a way that makes sense to me, and *repeat it* -- purposefully, not blindly. In other words, there is something about the design of the software *and* its starter documentation that elucidates the process, making it easier to follow.

Incidentally, the "Get Started" page even shows you how to deploy the baby website, via Netlify. It looked pretty easy, and if I were starting brand-new, I probably would have gone that route. But I'm already on Github Pages, so I decided to stick with that. I was a little nervous about this choice, but it turned out quite well---more on that later.

Most of the Eleventy documentation still goes over my head, but I'm not worried about that, because I had ...

## A Simple but Functional Starter Example

This is an extension of the "Newbie-friendly design" principle. The first time I stood up my site, I knew nothing about "website stuff" except some rudimentary HTML. I needed code examples, to help teach me about CSS, and Liquid, and so on. The built-in Github Pages Jekyll themes were *too simple* to help me understand how to build the structure of a blog. The theme I ended up using made a nice site, but it was really *too complex* to be an effective learning instrument. So it, too, for a long time, was mostly just magic.

Eleventy's [base blog starter template](https://github.com/11ty/eleventy-base-blog) has enough functionality to be useful, a clear and simple design, good file organization, and low dependencies: HTML/markdown, CSS, Nunjucks, minimal Javascript. By looking at the code, and by peeking into the `package.json` and the `node_modules` directory that got generated when I installed the template, I could figure out how things work. I can't build a theme from scratch, but I can figure out how to modify this one. A little at a time. 

It's not magic, and eventually, I assume, more of the documentation will make sense. If I need it to.

My new site is still missing a few things I had before, but it's not bad-looking, if I do say so myself.

## Non-Mystical Deployment

This was the step that made me nervous. Jekyll is the default build process for Github Pages sites. How was a non-Jekyll build going to work? Would I be able to do it?

The official answer is Github Actions, and someone did write an Action for deploying Eleventy sites. But guess what: I don't understand Github Actions. This felt like bringing more magic into the workflow, and if that Action ever broke---I'd be stuck, again.

So I looked around, and figured out that I could build and deploy the site manually, with the help of [this package](https://www.npmjs.com/package/gh-pages). It's far less convenient than having the site just rebuild when I push changes to the source, *but I know what it's doing*. And my site isn't going to change that frequently, anyway. Under the circumstances, a manual process I understand is preferable to an automation that I don't understand, and don't really need. Someday, my assessment of the tradeoffs may change; and then my mind will change, too.

Right now, it works like a charm.

*But Nina, why is a Github Action magic, but a package you found on the internet not magic?*  

Yeah, I suppose it's magic, too, but it's magic that works over *Git*, not *Github*. I suspect git is somewhat more stable than any given Github feature. Also, I understand git. So I'd call the package "less magic" than an Action. To me, that is; if you are comfortable with Github Actions, then none of this is magic at all. Go crazy.

## So, What Have We Learned?

Out of all this, I can try to articulate some general principles, in no particular order.

Avoid magic. If you do X by blindly following a list of steps you don't understand, you don't know how to do X. You're just following a ritual. And rituals can fail.

By the above definition, magic is relative.

A well-designed process is complex enough to be useful, but simple and clear enough to be learnable.

A good teaching example (code, documentation) should also be complex enough to be useful, but simple and clear enough to be learnable.
 
Try to be newbie-friendly. If you can write or design for a user who knows absolutely nothing at the start, but will have *something* by the end, someone out there will thank you for it.

Prefer understanding a process ("no magic") to streamlining it (opaque automations might be magic).






