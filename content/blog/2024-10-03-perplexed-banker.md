---
layout: layouts/post_nonotes.njk
date: 2024-10-03
title: The Perplexed Banker
tags:
 - math puzzles
---

This is from Henry Dudeney’s “Perplexities” article in the March 1925 issue of
*The Strand Magazine*:

> A man went into a bank with 1,000 silver dollars and 10 bags. He said,
> “Place this money, please, in the bags in such a way that if I call
> and ask for a certain number of dollars you can hand me over one or
> more bags, giving me the exact amount called for without opening any
> of the bags.” How was it to be done? We are, of course, only concerned
> with a single application, but he may ask for any exact number of
> dollars from 1 to 1000.

(In the original article it was “sovereigns” and “pounds”—but I’m in the
U.S., so…)

This is similar in spirit to [Bachet’s Four Weights
Problem](https://ninazumel.com/blog/2024-09-29-four-weights/), so if
you’ve solved that one, you should certainly be able to solve this one.

The solution is below Chirico’s *The Mathematicians*.

{% image "./images/the-mathematicians.jpg", "Allegorical sketch of beings in a courtyard, both made of mathematical instruments" %}
<p class="caption">The Mathematicians (1917)</br> Artist: Giorgio de Chirico. 
Source: <a href="https://www.wikiart.org/en/giorgio-de-chirico/the-mathematicians-1917">WikiArt</a></p>

## The Solution

Unlike the weights problem, the combination of bags here is strictly
additive:

$$
\sum_{i=1}^{10} s_i b_i = x
$$

where $x$ is the amount the customer asks for, $b_i$ is the number of coins in bag $i$, and $s_i \in \{0, 1\}$.

So instead of a trinary system, we have a good old binary system. This
means if we have $n$ bags and we put 1 coin in the first bag, 2 coins in
the second bag, 4 coins in the third bag…. That is, we put $2^{i-1}$
coins in the `i`th bag, we can represent any value between 0 and
$2^{n}-1$.

Let’s demonstrate this with 3 bags, which should give us the numbers `0:7`.

``` r
# fill the bags
bags = vapply(1:3, function(i) {2^(i-1)}, numeric(1))
bags
```
```text
## [1] 1 2 4
```

``` r
# get all the possible combinations of bags
signs = c(0,1)
S = expand.grid (s1 = signs,
                 s2 = signs,
                 s3 = signs) |>
  as.matrix()

S
```
```text
##      s1 s2 s3
## [1,]  0  0  0
## [2,]  1  0  0
## [3,]  0  1  0
## [4,]  1  1  0
## [5,]  0  0  1
## [6,]  1  0  1
## [7,]  0  1  1
## [8,]  1  1  1
```
``` r
# get the total number of coins for each combination
as.numeric(S %*% bags)
```
```text
## [1] 0 1 2 3 4 5 6 7
```

We have 10 bags, so we can represent any value from 0 to
$2^{10} - 1 = 1023$, which is more coins than we have. The 10th bag
should hold $2^9 = 512$ coins, but since we are 23 coins short, it will
only hold $512-23=489$ coins.

So the solution is: **The first 9 bags hold $2^{i-1}$ coins for $i$ from
1 to 9; and the last bag holds 489 coins.**

Let’s verify that.

``` r
# fill the bags
bags = vapply(1:10, function(i) {2^(i-1)}, numeric(1))
bags[10] = 489 # the last bag is a little short.

# get all the possible combinations of bags
slist = lapply(1:10, function(i) signs)
names(slist) = paste0("bag", 1:10)

S = expand.grid (slist) |> as.matrix()
dim(S)
```
```text
## [1] 1024   10
```

Note that there are still 1024 combinations of bags; we know that we can
only represent the numbers `0:1000`, so some of the totals will be duplicated.
In other words, for some numbers, there are multiple combinations of
bags that give the same sum.

``` r
# get the total number of coins for each combination
x = as.numeric(S %*% bags)

# find all the unique values we can achieve
x_unique = sort(unique(x))

# confirm that this gives us every value from 0 to 1000
stopifnot(x_unique==0:1000)
```

So we have achieved the customer’s ask, and the banker is no longer perplexed! 

We can go a little further. Which sums can be achieved multiple ways?

``` r
x[duplicated(x)]
```
```text
##  [1] 489 490 491 492 493 494 495 496 497 498 499 500 501 502 503 504 505 506 507
## [20] 508 509 510 511
```
Note that 489 is the number of coins in bag10, and 511 is $2^9 - 1$, which, in a proper binary representation, is the last number that wouldn't require bag10 to fulfill the sum.

For fun, let’s see the different ways to achieve x = 500

``` r
ix = which(x==500)

S[ix, ]
```
```text
##      bag1 bag2 bag3 bag4 bag5 bag6 bag7 bag8 bag9 bag10
## [1,]    0    0    1    0    1    1    1    1    1     0
## [2,]    1    1    0    1    0    0    0    0    0     1
```

The first solution is the "standard" solution, meaning 500 encoded in binary (backwards). The second solution is because our last bag doesn't have the correct number of coins in it, and in fact has fewer than 500. You can tell it's not the standard answer because we use bag 1, meaning the answer appears to be odd. But this evens out, because bag10 has an odd number of coins in it.

