---
title: I Added Margin Notes to my Blog
date: 2024-09-04
tags:
 - design
 - website
 - marginalia
---


*Note: This post is best seen on my site, on a desktop/laptop. Mobile and RSS readers won't show you all the margin-y goodness.*

<hr/>

Because I can't leave a challenge alone, I added basic margin notes to this blog. The approach is basically from [Tufte-CSS](https://github.com/edwardtufte/tufte-css), and I now have both (unnumbered) margin notes{% marginnote "defs", "Following Tufte, I'll use *margin note* for unnumbered marginalia, and *side note* for numbered ones." %} and standard footnotes. Here's an [example page](/pages/story-of-kritakrita) to show it off.

And here's a sneak preview of how to add a margin note:{% marginnote "tip", "It took me a bit to find out [how to escape the shortcode in this code snippet](https://markllobrera.com/posts/eleventy-escaping-nunjucks-statements-in-markdown-code-blocks/)." %}
```javascript
{% raw %}
Here is some text{% marginnote "demo", "This is a note." %} to annotate.
{% endraw %}
```
Which produces:

> Here is some text{% marginnote "demo", "This is a note." %} to annotate.

Although, as you can see, I don't have it working quite right with notes in blockquotes. Later....

### Deciding on the Approach

When deciding whether and how to do this, I had a couple of criteria for an acceptable solution:

* It had drop into the blog with minimal template tweaking.
* It had to be maintainable and [not magic](/blog/2024-02-21-clarity-not-magic/).

This eliminated both [eleventufte](https://eleventufte.netlify.app/) and [`tufte-markdown`](https://github.com/luhmann/tufte-markdown), the parser that powers eleventufte, since the `tufte-markdown` project is no longer actively maintained. Sure, it works now; but if/when it ever stops working, I can't fix it. It also eliminated the javascript solution from Mark Llobrera that I discussed in my [last post](/blog/2024-09-04-sidenotes/). His particular implementation felt tightly coupled to his grid-based blog layout; and while a better web developer than I could probably decouple them, I can't, and I'm not overhauling my entire blog, either.

Going straight to the implementation in Tufte-CSS seemed the best. I just hoped I had enough CSS know-how to figure it out.

### Let's do it!
Adding the markdown CSS was not as painful as I thought it would be. I'll walk through it now, somewhat slowly, for the benefit of any readers at my level of non-expertise, who might be considering this. The discussion will be in the context of my static blog generator, eleventy; but the process should be generalizable to other frameworks.

### 1. Add `marginnote.css` to wherever your blog keeps its stylesheets.

Here's my CSS, [`marginnote.css`](https://github.com/NinaZumel/NinaZumel.github.io/blob/master/public/css/marginnote.css), which is stripped down and slightly modified from the original [`tufte.css`](https://github.com/edwardtufte/tufte-css/blob/gh-pages/tufte.css). What it does, in English: Assume your annotated content is in an `article` container. Then the stylesheet defines the major content containers (`p`, `pre`, `ul` and `blockquote`) to only occupy a fraction of the `article` container's width (65%, for me), on the left. The `marginnote` container can then float to the right side, into the empty space. The stylesheet also adjusts `img` and image captions to only occupy the content space (not the note space).

There's also a fallback for narrow viewports, like mobile. When the viewport is too narrow to hold the margin notes, a little symbol, &#8853; (that's "`&#8853;`"), appears next to where the margin note is anchored (like the number on a footnote). Clicking on the symbol toggles the note on and off, inline. Try it: just narrow your browser window until the margin notes disappear; you should see the little markers where the notes should be.

If you are thinking about doing this, you can start with my stylesheet, and adjust the variables to suit your blog.{% marginnote "newbie", "If you are truly a novice at this, as I am, it can be helpful to put colored borders around the body, paragraph, and marginnote containers. This helps you visualize how changes to offsets, margins, and paddings affect the layout." %} Note that **this template assumes you'll only use `<article>` for potentially annotated content** (in my case, only posts). If you use `article` for other purposes, you'll probably have to 
create a special class---`<article class="annotated">`, or something---and modify the css accordingly.

### 2. Modify the post template.

It seems reasonable to assume I'll only need margin notes in blog posts, which is good -- I can localize my changes. I use Nunjucks to define my layout, so
I made a couple of changes to my template, `post.njk`.{% marginnote "page", "I created a simple annotated page template, too, but the example I linked to above is probably the only time I'll ever use it." %}

1\. I included the css, of course:
```javascript
{% raw %}
{%- css %}{% include "public/css/marginnote.css" %}{%- endcss %}
{% endraw %}
```

2\. Then I wrapped the post content in an `article` container:
```html
{% raw %}
{# wrap the content in an article container so that the margin notes work #}
<article>
  {{ content | safe }}
</article>
{% endraw %}
```

### 3. (If needed) Widen the body width.

You might want to widen the width of your content area to accomodate the notes. I suppose I could have made my `article` container wider than my `body`, but then I'd have to fiddle with alignments and stuff. I just widened the entire blog. Presumably, the setting is in your primary stylesheet. 

```css
body {
	max-width: 70em; /* used to be 50em */
}
```

That was all that was truly necessary. I did restrict the widths of a couple of other container classes back down to 50em, but that was strictly for aesthetic reasons. The site certainly wouldn't break if I'd left them at their defaults.

This now gives you margin notes, if you are willing to put the html in your posts by hand (I know you're not, but I think it helps to see the steps). That would look
like this:

```html
This is some text<label for="note-id" class="margin-toggle">&#8853;</label>
			   <input type="checkbox" id="note-id" class="margin-toggle"/>
			   <span class="marginnote">This is the note.</span> 
to annotate.
```
> This is some text<label for="note-id" class="margin-toggle">&#8853;</label>
			   <input type="checkbox" id="note-id" class="margin-toggle"/>
			   <span class="marginnote">This is the note.</span> 
to annotate.

Yeah, it's ugly, but that's how the Tufte-CSS folks designed it. Hence, the shortcode. If I were really clever, I'd figure out how to redefine the footnote syntax; but I'm not really clever. I assume redefining the footnote notation is what `tufte-markdown` does, but as I said above, that's not an option.

### 4. Define the shortcode.
For eleventy, this goes in `eleventy.config.js`, or `eleventy.js`, depending on how your site is set up. For other frameworks, consult your documentation.

```javascript
module.exports = function(eleventyConfig) {

    // lots of config, blah blah blah...

    // shortcode for adding margin notes
    eleventyConfig.addShortcode('marginnote', 
        (id, content) => 
            `<label for="${id}" class="margin-toggle">&#8853;</label>
            <input type="checkbox" id="${id}" class="margin-toggle"/>
            <span class="marginnote">${content}</span>`
        
    );

    // more config ...
}
```

The shortcode has two arguments: an id for the note, and the note content, which is a string of markdown. You can include links or formatting. The id matches the toggle to the note in narrow mode, so make them unique, or a single toggle will hide/display multiple notes on the page. The ugly html example above then becomes:

```javascript
{% raw %}
This is some text{% marginnote "note-id", "This is the note." %} to annotate.
{% endraw %}
```

And that's it! You can now annotate your posts with marginalia!

## Shortcomings of the approach

### Only margin notes, and only short ones.
Tufte-CSS includes both (numbered) sidenotes and (unnumbered) margin notes. With the sidenotes, in narrow mode, the toggling was attached to the number, as with a footnote. I could get the sidenotes to appear in the margin, but I couldn't make them toggle in narrow mode. I'm not sure why. My best guess is that something in my main css was clobbering it. It was too much work to figure that out, and maybe it's for the best. If I did have them, I'd have to figure out how to set different numbering systems (1,2,3; a,b,c...) for the sidenotes and the footnotes.

Because it's good to still have the footnotes! Unlike the javascript-based solution that I used for [*Twelve Medieval Ghost Stories*](https://ninazumel.com/TwelveMedievalGhostStories/), this CSS-only solution will not prevent notes from overlapping if they are too close together or too long. So having standard footnotes is still the right solution for lengthy notes, like the note in [this post](/blog/2024-08-20-saturated-models/).{% marginnote "long", "That's also a multi-paragraph note, which I just discovered you can do! With footnotes only, not margin notes." %}

### They don't cos-play as footnotes.
The javascript-based solution at *Twelve Medieval Ghost Stories* uses standard footnote notation in the markdown, and a footnote class that can switch between a sidenote and footnote appearance as necessary. This means sidenotes "degrade" gracefully to standard footnotes on mobile, and presumably, in RSS readers. Though I admit, I've never checked.

This solution degrades gracefully on mobile, but I suspect a lot of readers won't realize the "&#8853;" symbol marks the presence of a note, so the notes effectively get lost. And I don't think RSS readers will handle them well at all. ~~In fact, I shudder to think how this post must look in RSS, since I've been profligate with notes (after all, now that I have them...).~~ [**EDIT**: I just took a look at my RSS, on Reeder. The little symbols show up, along with the checkbox that is the actual toggle, but the notes don't toggle on; so they are lost. But at least the primary text is still readable.] But, well, what's the point of having a nice-looking blog if no one's going to look at it? Click through to people's sites, sometimes, folks!

## On the positive side...
For obscenely long articles (like this one), margin notes (or sidenotes) are clearly preferable. They save the reader from having to constantly click back and forth from the text to the note, which I suspect most readers don't. I've always wanted them, and now I can check them off my "nice-to-have" list. 
