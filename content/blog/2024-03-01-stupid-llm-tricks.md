---
date: 2024-03-01
title: "Stupid LLM Tricks, Statistics Version"
---

I recently posted elsewhere about [something silly ChatGPT did](https://ninazumel.com/short_thoughts/blog/2024-02-29-more-stupid-llm-tricks/) when we asked it about states' names. Admittedly, that particular question was merely on the level of cocktail party conversation, or a bar bet; but it does point out that you really should never trust anything it says, unless you already know the answer.

Here's what happened when we asked it a statistics question:

>**User**  
  What are some good examples of continuous probability distribution functions with negative skew?

A distribution with negative skew looks like below: tail to the left, the bulk of the distribution to the right (generally, the median is to the right of the mean). There are several [real-life distributions with negative skew](https://www.statology.org/negatively-skewed-distribution-examples/), but we were looking for a continuous "closed-form" distribution (with non-negative support, though that part didn't make it into the question).

{% image "./images/negative_skew.png", "Graph of a negatively skewed (left-tailed) distribution and its mean" %}

Here's the answer we got:

> Skewness in a probability distribution refers to its asymmetry. A negative skew indicates that the left tail of the distribution is longer or fatter than the right tail, with the bulk of the distribution concentrated on the right side. Some examples of continuous probability distribution functions with negative skew include:

> Gamma Distribution: Depending on the parameters, the gamma distribution can exhibit negative skewness, especially when the shape parameter is less than 1.  

> F Distribution: The F distribution can have negative skewness, particularly when the degrees of freedom for the numerator are small compared to the denominator. 

> Exponential Distribution: While the exponential distribution is often positively skewed, it can exhibit negative skewness for certain parameter values.  

> Log-Normal Distribution: In some cases, the log-normal distribution can be negatively skewed, especially when the underlying normal distribution has a mean less than 1.  

> Chi-Squared Distribution: The chi-squared distribution can have negative skewness for small degrees of freedom.  

> These distributions can be useful in modeling various phenomena where negative skewness is observed, such as in certain financial data or in certain types of measurement errors.  

**None of these are negatively-skewed distributions.** In particular, the chi-squared distribution always has non-negative skew for any value of parameters (it's not the only one, just an obvious one).

The only negatively-skewed distribution we could think of off the top of our head --[the Beta distribution](https://en.wikipedia.org/wiki/Beta_distribution) with appropriate parameters -- didn't even make the list.

How is this more useful than, say, asking on the Statistics Stack Overflow (or searching to see if someone has already asked)? 

Someone with a certain amount of statistical background can skim this list and realize that at least some of the answers are clearly wrong. They are then reduced to checking the whole list--which they already could have done with a list of distributions and Wikipedia. And they would have found the Beta distribution quicker from Wikipedia, too.

Someone with less of a statistical background and not a lot of time might just take the answers as correct, and go on to use them (wrongly!), no matter how many disclaimers OpenAI puts on their interface. And therein lies the problem.

## LLMs are Great for Remembering Things You Know

There are two uses for which I find ChatGPT incredibly useful: looking up the answers to simple code questions, and as an intelligent thesaurus.

An example of the first: **_How do I parse an RSS feed in Python?_** ChatGPT gives me the appropriate library (`feedparser`) and some example code. I can easily check if the example code does what I want, and with the name of the library, I can look up the actual documentation. 

It used to be easy to find this sort of information via search, but now the results are so poisoned by paywalls and splogs that it's far simpler, and more pleasant, to ask ChatGPT. Unlike with clicking on random search results, ChatGPT's answers are usually accurate the first time.

An example of the second: **_What's the word for a close-up from a painting? It's used in the context of art or art history._** The answer is *detail*, as in "A detail from *The Last Supper*, showing Judas clutching a bag of coins," to describe an image of Judas Iscariot cropped from *The Last Supper*. This is a word I try to use in appropriate situations (like crediting images on my blog) but I can never remember it. 

ChatGPT tends to be better at these kind of "What's that word for...?" questions than standard search, or even than my husband, if he happens to be around (he's not bad at it, just ChatGPT is better).

Here's the thing though: *I already knew the word,* I just couldn't remember it. And I already know Python, just not all of its libraries. I can recognize when I'm getting correct information, and, in these two situations, I can get it quickly. That's great!

## *Caveat User*

My other big use for LLMs is translation. DeepL and the AI translator/explainer at Tagalog.com are super useful for my hobbies of [translating Spanish-language short stories](https://exiw.wordpress.com/translations/) and [Filipino comics](https://multoghost.wordpress.com/darna-episodes/), respectively -- Spanish and Filipino being languages I can at least somewhat read. And DeepL and Google Translate are helpful when trying to get the gist of a document in a language I don't read.

But here's the thing; I've seen these translation engines (even DeepL, which is generally quite good) make some egregious mistakes. I also remember trying to use the AI explainer at Tagalog.com to help me disentangle some sentence where I was getting all mixed up with the tenses and object and subjects. I think it got the grammar correct, but, boy, it just outright *lied* to me about the meaning of the word *bubuwit*, which means *mouse*. I ran the sentence through the explainer multiple times, and got told that *bubuwit* means, variously, *fish*, *worm*, *lizard* ... I lost confidence, and checked several dictionaries to make sure: yes, *bubuwit* means *mouse*.

The lesson: don't entirely trust the machine translations of languages you don't read. Which I think we already knew, Google Translate having been around for a long time. 

Similarly: don't entirely trust the code snippets from ChatGPT (or Copilot, I imagine) for programming languages that you don't know. Copilot and ChatGPT won't instantly make me a competent Rust programmer, any more than DeepL will make me a competent literary translator of Hungarian. This should also be obvious, but with all the genAI hype, I'm not sure it is.

Because if I can find glaring errors in areas where I have some expertise, why should I be confident that there aren't glaring errors in areas I know nothing about?
## Information Literacy

I have seen people make the argument: yeah, ChatGPT can spit out bullshit, but why should I trust it less than some random dude on the internet? They spit out bullshit, too. Yes, that's an issue, and it's called [information literacy](https://www.unesco.org/en/ifap/information-literacy). Information literacy means the ability to assess the information you're given, via your own personal competencies, and your ability to recognize the legitimacy and reliability of the **sources** of the information. It also means consulting multiple sources, when possible.

But how do you do that, with a monolithic information channel that obscures its sources? Not to mention, just mashes them all up and spits out a plausible sounding response that, in some sense, doesn't even have a source? All you can rely on, then, is your own personal competencies. Again: *don't ask questions you don't already know the answer to*, or can't vet from your own knowledge.

It's back to my mantra. *Avoid magic; value understanding*. Or as Anil Dash might put it: [*Avoid magic; value reason*](https://www.anildash.com/2023/06/08/ai-is-unreasonable/).

Generative AI can be a great tool, but like any tool, you have to use it the right way.