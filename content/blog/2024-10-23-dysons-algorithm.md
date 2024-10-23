---
layout: layouts/post_nonotes.njk
title: "Dyson’s Algorithm for the Twelve Coins Problem"
date: 2024-10-23
tags:
  - math puzzles
  - base-n arithmetic
---

After having worked on [The Twelve Coins
Puzzle](/blog/2024-10-17-twelve-coins/) by hand, I
got curious about implementing Dyson’s “elegant” oblivious solution,
which I mentioned in that previous post. While a quick skim gave me the
general gist of the approach—and it is elegant—a deeper read for details
made me wonder how mathematicians ever got anything done at all, in the
old days. The note is telegraphic, to say the least.

But I finally figured it out, and coded it up in R. This may actually
be the preferable language, since Dyson’s discussion indexes from 1, as
R does. The basic idea is to label each coin by its trinary
representation, and then to schedule the weighings in such a way that,
with the appropriate representation of the measurement outcomes, the
weighings “spell out” the label of the dud coin, if it exists. There is
a known label for the case when there is no dud.

Dyson’s original algorithm used standard base-3 representations, where
the digits are (0, 1, 2). I decided to implement my version using signed
trinary, where the digits are (-1, 0, 1). This is the representation
that I used for the [Four Weights
Puzzle](/blog/2024-09-29-four-weights/), and I just
find it more natural for balance scale problems. As a bonus, it also
makes Dyson’s algorithm easier to describe.

The algorithm below works specifically for the case where the number of coins is
exactly 

$$
M = (3^{n_{rounds}}-3)/2
$$

and $n_{rounds}$ is the number of
weighings. This is the maximum number of coins that can be resolved in
$n_{rounds}$ weighings: 3 coins in 2 weighings, 12 coins in 3 weighings,
39 coins in 4, etc. Not only is this exactly the situation we care
about, it also keeps the algorithm consise. Dyson does discuss how to
tweak the procedure for the case when $n_{coins} < M$ (as long as it’s
greater than 3). That procedure isn’t quite as pretty, and obscures the
main virtues of the idea. I’ll defer discussion of it until later.

## The Algorithm

I’ll describe the procedure with the example $M = 3, n=2$ (3 coins, 2
weighings), since that’s easy to work out by hand. Then I’ll point you
to some code for larger cases.

**1: Label the coins** with the numbers 1 through $M$, and convert them
to signed trinary using $n$ digits. I’ve described the conversion
procedure to signed trinary before,
[here](https://ninazumel.com/blog/2024-10-14-back-to-4wts/#converting-to-signed-trinary).
For $M=3, n=2$, that looks like this:

```
1 = [0 1]
2 = [1 -1]
3 = [1 0]
```

**2: Set the trinary representations to rotate “forward.”**

We say that a number in base-3 rotates “forward” (Dyson called it
“clockwise”) if the first change of digits increases by 1, modulo 3. So
the forward sequence is
$-1 \rightarrow 0 \rightarrow 1 \rightarrow -1 ...$ (Note that
$(-1) - 1 = -2$, and $-2 \mod 3 = 1$). In R, that looks something like
this, assuming you’ve implemented the base-3 number as a vector:

``` r
is_forward = function (ptrinary) {
  delta = diff(ptrinary)
  # get only the nonzero diffs
  delta = delta[!(delta==0)]

  if(length(delta)==0)
    stop("constant vector")

  # check if we are rotating forward, and return
  delta[1] %% 3 == 1
}
```

If a signed trinary number $x$ rotates forward, then its negation $-x$
rotates backward, and vice-versa. So replace any of the coin labels that
rotate backwards with its negation:

```
1 = [0 1] : rotates forward
2 = [1 -1]: rotates forward
3 = [1 0]: rotates backward, so replace with [-1 0] (-3)
```

Representing all the coins with forward rotating numbers removes the
ambiguity that arises from not knowing whether the dud coin is heavier
or lighter than the good coins: if the balance scale tilts the left pan
down, that could be because a heavy dud is in the left pan, or because a
lighter dud is in the right pan. As we will see, setting all the coin
labels to rotate forward means that a heavy dud will produce a pattern
of behaviors that “spell out” the location of the dud, while a light dud
will spell out the negation of the label.

**3: Plan the weighing schedule.**

Now let’s label the possible positions on (or off) the scale. $-1$ means
the left pan, $1$ means the right pan, and $0$ means the table. The
weighing schedule is such that for the $i$th weighing, a given coin is
in the location described by its label’s $i$th digit (counting from the
left, so the ones digit is last). For our example, this gives the
schedule:

```
1 = [0 1]: table, then right pan
2 = [1 -1]: right pan, then left pan
3 = [-1 0]: left pan, then table
```

Using the scale notation we’ve been using for balance scale problems,
that looks like this:

```
First weighing:

[coin 3 | coin 2]
------------------
coin 1

Second weighing:

[coin 2 | coin 1]
-----------------
coin 3
```
Note that the weighing schedule can be calculated in advance if you know
$M$ (and $n$), before you even see a specific set of coins. It can also
be used over and over, for any set of $M$ coins. This is what we mean
when we call this algorithm “oblivious.”

**4: Weigh the coins according to the schedule**

We’ll record the outcome of each weighing, $a_i$, as which pan was
heavier (if any): $-1$ means the left pan is heavier, $1$ means the
right pan is heavier, $0$ means the scale is balanced. This means that
if the $k$th coin is a heavy dud, it will spell out its own label in
signed trinary, as $[a_1 a_2 ... a_n]$. A light dud will spell out the
negation of its label. You can recover the decimal representation of the
total outcome, as

$$
A = \sum_{i=1}^n {3^{n-i} a_i}
$$

Then the location of the dud is $|A|$, and the dud is heavy if
$[a_1 a_2 ... a_n]$ rotates forward, and it is light if
$[a_1 a_2 ... a_n]$ rotates backward. If there is no dud, then $A = 0$.

**_Note that the sign of $A$ is NOT whether the dud is heavy or light_**; it’s
whether the trinary representation of $|A|$ rotates forward or
backward.

And that’s it! Let’s walk through a few examples.

- No dud
  - Scale: (balanced, balanced), so $a =[0, 0] \rightarrow A = 0$: no
    dud
- The dud is coin 1, and it is light
  - Scale: (balanced, left), so $a = [0, -1] \rightarrow  A = -1$ and
    $a$ rotates backward: coin 1, light.
- The dud is coin 2, and it is heavy
  - Scale: (right, left), so $a = [1, -1] \rightarrow  A = 2$ and $a$
    rotates forward: coin 2, heavy.
- The dud is coin 3, and it is heavy
  - Scale: (left, balanced), so $a = [-1, 0] \rightarrow  A = -3$ and
    $a$ rotates forward: coin 3, heavy.

## Back to the 12 coins

So now we can do the problem that we actually care about. I have R code to implement it,
[here](https://github.com/NinaZumel/DysonsAlgorithm/blob/main/dyson_signed_specialcase.R).

Let’s show the forward representations of the coins.

``` r
# https://github.com/NinaZumel/DysonsAlgorithm/blob/main/dyson_signed_specialcase.R
source("dyson_signed_specialcase.R")

nrounds = 3
ncoins = (3^nrounds - 3)/2  # 12

# Show the forward representations of the coins
get_forward_representation(nrounds)
```
```
##       [,1] [,2] [,3]
##  [1,]    0    0    1
##  [2,]    0    1   -1
##  [3,]    0    1    0
##  [4,]    0    1    1
##  [5,]    1   -1   -1
##  [6,]    1   -1    0
##  [7,]    1   -1    1
##  [8,]   -1    0    1
##  [9,]   -1    0    0
## [10,]   -1    0   -1
## [11,]    1    1   -1
## [12,]   -1   -1    0
```

In my implementation, I precompile the weighing schedule ahead of time,
so I can just weigh coins over and over again. The `precompile()` function
calls `get_forward_representation()` internally, and returns a list. Each
element of the list is the weighing schedule for that weighing, as a
data frame, with columns `(left, table, right)`. Each column of the data
frame holds the coins that go into that position for that weighing.

``` r
Cset = precompile(ncoins, nrounds)

# show the schedule 
knitr::kable(Cset[[1]], caption = "Weighing 1")
```

| left | table | right |
|-----:|------:|------:|
|    8 |     1 |     5 |
|    9 |     2 |     6 |
|   10 |     3 |     7 |
|   12 |     4 |    11 |

Weighing 1

``` r
knitr::kable(Cset[[2]], caption = "Weighing 2")
```

| left | table | right |
|-----:|------:|------:|
|    5 |     1 |     2 |
|    6 |     8 |     3 |
|    7 |     9 |     4 |
|   12 |    10 |    11 |

Weighing 2

``` r
knitr::kable(Cset[[3]], caption = "Weighing 3")
```

| left | table | right |
|-----:|------:|------:|
|    2 |     3 |     1 |
|    5 |     6 |     4 |
|   10 |     9 |     7 |
|   11 |    12 |     8 |

Weighing 3

Now we can find duds. It doesn’t matter how much the coins weigh, as
long as all good coins weigh the same amount. My function `find_dud()`
returns a value `D` such that `abs(D)` gives the index of the dud, and
`sign(D)` gives the dud’s relative weight; negative means the dud is
light, and positive means the dud is heavy. In other words, $D \neq A$!!
But the notation is concise, and easy to write checks for.

``` r
# a good coin weighs 1 unit
coins = numeric(ncoins) + 1
epsilon = 0.5

# check the no dud case
find_dud(coins, Cset)
```

    ## [1] "No dud."

    ## [1] 0

``` r
# check a specific case
idud = 7
relative_wt = -1 # make it lighter
coins[idud] = 1 + epsilon*relative_wt
find_dud(coins, Cset)
```

    ## [1] -7

``` r
# verify this works in all possible cases
for(idud in 1:ncoins) {
  for(relative_wt in c(-1, 1)) {
    actual = idud*relative_wt # location and direction
    coins = numeric(ncoins) + 1
    coins[idud] = 1 + epsilon*relative_wt
    A = find_dud(coins, Cset)
    stopifnot(actual==A)
  }
}
```

And that’s the solution of the $M$ coins in $n$ weighings problem, for
the special case when $M = (3^n-3)/2$. I also have an implementation
(and description) of the general situation, when
$3 \leq M \leq (1/2)(3^n-3)$. If you are curious, that description 
is [here](/pages/extra/dysons-algorithm-general/), and it points to the implementation.

## Reference

Dyson, Freeman J. “Note 1931–The problem of the pennies,” *The
Mathematical Gazette* Vol. 30, No 291) (October 1946). [JSTOR
link](https://www.jstor.org/stable/3611225)
