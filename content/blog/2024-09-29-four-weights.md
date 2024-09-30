---
layout: layouts/post_nonotes.njk
date: 2024-09-29
title: Bachet’s Four Weights Problem
tags:
 - math puzzles
---

Here’s another puzzle from Henry Dudeney’s article “The World’s Best
Puzzles”, *The Strand Magazine*, December 1908. According to Dudeney,
this puzzle is originally from *Problèmes plaisans et délectables qui se
font par les nombres* (Pleasant and delectable number problems), by
French mathematician [Claude Gaspar Bachet de
Méziriac](https://en.wikipedia.org/wiki/Claude_Gaspar_Bachet_de_M%C3%A9ziriac)
(1551-1636).[^1]

{% image "./images/four-weights.png", "Illustration of a balance scale and four weightss" %}
<p class="caption">A balance scale and four weights.
<a href="https://archive.org/details/TheStrandMagazineAnIllustratedMonthly/TheStrandMagazine1908bVol.XxxviJan-jun/page/n787/mode/1up?view=theater">Image Source</a></p>

> You have four (integral) weights $w_1, w_2, w_3, w_4$ and a balance
> scale such that you can weigh any object weighing from 1
> lb to 40 lbs (no fractions). The weights may go on either side of the scale (eg, with
> the object, or in the opposite pan). What are the $w_i$?

This seems like a variation on the [Frobenius coin
problem](https://en.wikipedia.org/wiki/Coin_problem), which in general
is NP-hard. Fortunately, this specific instance is not.

As before, here’s Chirico’s *The Mathematicians* for you to look at
while you try to solve this. Solution below.

{% image "./images/the-mathematicians.jpg", "Allegorical sketch of beings in a courtyard, both made of mathematical instruments" %}
<p class="caption">The Mathematicians (1917)</br> Artist: Giorgio de Chirico. 
Source: <a href="https://www.wikiart.org/en/giorgio-de-chirico/the-mathematicians-1917">WikiArt</a></p>

## The Solution

The four weights are (1, 3, 9, 27). Before we confirm this
computationally, let’s compute the solution using induction.

Let’s rephrase the problem as

> You have $n$ weights… such that you can weigh any number of pounds in
> the range `1:m`….

where $m$ depends on how many weights you have. We can also observe that
the sum of all the weights must equal the weight of the heaviest object
you can measure, and that object must weigh $m$ pounds.

Then for the case $n = 1$, you have a single weight $w_1 = 1$, and you
can weigh any object that weighs one pound (the interval 1:1). Now let’s
look at the case $n=2$.

### 1. The weights $(w_1 = 1, w_2 = 3)$ can weigh any object from 1 to 4 pounds.

I’ll use $x$ to denote the object to be weighed, and the notation
$[\{set_1\} | \{set_2\}]$ to denote what’s on the left and the right
side of the scale. I’ll always put $x$ in the right-hand pan.

**$x = 1$** is weighed as $[\{1\} | \{x\}]$. This can be written as
$1 = x$.

**$x = 2$** is weighed as $[\{3\} | \{x, 1\}]$. This can be written as
$3 = x + 1$, or $3 - 1 = x$.

**$x = 3$** is weighed as $[\{3\} | \{x\}]$. This can be written as
$3 = x$.

**$x = 4$** is weighed as $[\{1, 3\} | \{x\}]$. This can be written as
$1 + 3 = x$.

You can see from the above that the general form of the solution is

$$
s_1 w_1 + s_2 w_2 = x
$$

where $(w_1, w_2) = (1, 3)$ and $s_i \in \{-1, 0, 1\}$. A positive
coefficient means the weight is in the left pan, a negative one means
it’s in the right pan, and zero means the weight isn’t used. This is
essentially a “signed trinary” representation of $x$. For two digits,
signed trinary can represent $3^2 = 9$ values.

Let’s just see what that looks like in R:

``` r
library(poorman)

signs = c(-1, 0, 1)

S = expand.grid (s1 = signs,
                 s2 = signs)
knitr::kable(S)
```

|  s1 |  s2 |
|----:|----:|
|  -1 |  -1 |
|   0 |  -1 |
|   1 |  -1 |
|  -1 |   0 |
|   0 |   0 |
|   1 |   0 |
|  -1 |   1 |
|   0 |   1 |
|   1 |   1 |

Let’s take the linear combination of `s1` and `s2`, using the weights
(1, 3).

``` r
S = S |>
  mutate(x = 1 * s1 + 3 *s2) 

knitr::kable(S)
```

|  s1 |  s2 |   x |
|----:|----:|----:|
|  -1 |  -1 |  -4 |
|   0 |  -1 |  -3 |
|   1 |  -1 |  -2 |
|  -1 |   0 |  -1 |
|   0 |   0 |   0 |
|   1 |   0 |   1 |
|  -1 |   1 |   2 |
|   0 |   1 |   3 |
|   1 |   1 |   4 |

You can confirm for yourself that using another pair of weights won’t
necessarily give you 9 unique values.

We are only interested in the positive values for our problem. We can
calculate that the number of positive values is

$$
(3^2 - 1)/2 = (9 - 1)/2 = 4.
$$

In other words, the weights (1, 3) can weigh the values `1:4`.

### 2. The case of three weights

How many values can we weigh with three weights, and what are they? It’s
clear that $w_1$ and $w_2$ must be the same as above, since any value in
the range `1:4` can be represented as $s_1 * 1 + s_2 * 3 + 0 * w_3$. Now
to find $w_3$.

We know that $3^3 = 27$, which means that we can represent
$(27 - 1)/2 = 13$ positive values, with 13 being the maximum. So the
three weights must sum to 13, which gives us $w_3 = 13 - (1 + 3) = 9$.
The set of weights is (1, 3, 9).

### 3. Finally, the case of four weights

We can calculate that $3^4 = 81$, which corresponds to $(81 - 1)/2 = 40$
positive values (surprise!). Therefore we have that
$w_4 = 40 - (1 + 3 + 9) = 27$. And so the set of weights we want is (1,
3, 9, 27), as stated above.

Now let’s confirm it.

``` r
S = expand.grid (s1 = signs,
                 s2 = signs,
                 s3 = signs,
                 s4 = signs) |>
  mutate(x = 1*s1 + 3*s2 + 9*s3 + 27*s4) |>
  filter(x > 0)

# confirm we have the values 1:40
stopifnot(S$x == 1:40)

knitr::kable(S)
```

|     |  s1 |  s2 |  s3 |  s4 |   x |
|:----|----:|----:|----:|----:|----:|
| 42  |   1 |   0 |   0 |   0 |   1 |
| 43  |  -1 |   1 |   0 |   0 |   2 |
| 44  |   0 |   1 |   0 |   0 |   3 |
| 45  |   1 |   1 |   0 |   0 |   4 |
| 46  |  -1 |  -1 |   1 |   0 |   5 |
| 47  |   0 |  -1 |   1 |   0 |   6 |
| 48  |   1 |  -1 |   1 |   0 |   7 |
| 49  |  -1 |   0 |   1 |   0 |   8 |
| 50  |   0 |   0 |   1 |   0 |   9 |
| 51  |   1 |   0 |   1 |   0 |  10 |
| 52  |  -1 |   1 |   1 |   0 |  11 |
| 53  |   0 |   1 |   1 |   0 |  12 |
| 54  |   1 |   1 |   1 |   0 |  13 |
| 55  |  -1 |  -1 |  -1 |   1 |  14 |
| 56  |   0 |  -1 |  -1 |   1 |  15 |
| 57  |   1 |  -1 |  -1 |   1 |  16 |
| 58  |  -1 |   0 |  -1 |   1 |  17 |
| 59  |   0 |   0 |  -1 |   1 |  18 |
| 60  |   1 |   0 |  -1 |   1 |  19 |
| 61  |  -1 |   1 |  -1 |   1 |  20 |
| 62  |   0 |   1 |  -1 |   1 |  21 |
| 63  |   1 |   1 |  -1 |   1 |  22 |
| 64  |  -1 |  -1 |   0 |   1 |  23 |
| 65  |   0 |  -1 |   0 |   1 |  24 |
| 66  |   1 |  -1 |   0 |   1 |  25 |
| 67  |  -1 |   0 |   0 |   1 |  26 |
| 68  |   0 |   0 |   0 |   1 |  27 |
| 69  |   1 |   0 |   0 |   1 |  28 |
| 70  |  -1 |   1 |   0 |   1 |  29 |
| 71  |   0 |   1 |   0 |   1 |  30 |
| 72  |   1 |   1 |   0 |   1 |  31 |
| 73  |  -1 |  -1 |   1 |   1 |  32 |
| 74  |   0 |  -1 |   1 |   1 |  33 |
| 75  |   1 |  -1 |   1 |   1 |  34 |
| 76  |  -1 |   0 |   1 |   1 |  35 |
| 77  |   0 |   0 |   1 |   1 |  36 |
| 78  |   1 |   0 |   1 |   1 |  37 |
| 79  |  -1 |   1 |   1 |   1 |  38 |
| 80  |   0 |   1 |   1 |   1 |  39 |
| 81  |   1 |   1 |   1 |   1 |  40 |

And we are done. At this point, I’ll note that we’ve just re-invented a
signed base-3 number system: digit $i$ (counting from zero) represents
the value $3^i$. I just happened to be writing it backwards.

[^1]: Among Bachet’s accomplishments are a method of constructing magic
    squares; a way of solving indeterminate equations with continued
    fractions; the proof of [Bézout’s
    Identity](https://en.wikipedia.org/wiki/Claude_Gaspar_Bachet_de_M%C3%A9ziriac);
    and a Latin translation of *Arithmetica* by Diophantus (he of the
    Diophantine equations). Famously, Fermat’s last theorem was a
    scribbled margin note on his copy of this very translation.
