---
layout: layouts/annotated_page.njk
title: "Dyson's Algorithm: The General Case"
---

For the case where $3 \leq M \leq (1/2)(3^n-3) = M_{max}$, the algorithm
works basically the same way, except that the coin labels are not chosen
sequentially from the integers `1:M`. Instead, they are assigned from
groups of “weighing triplets,” or cyclic groups, in a way that keeps the
scale counts equal on the first round.

We can now use the same weighing schedule as in the $M = M_{max}$ case,
with a little extra bookkeeping to keep the scale counts equal on every
round. As before, the scale will spell out the label of the dud coin if
the dud is heavy, or the label’s negation, if the dud is light.

To make this concrete, I’ll use the example of $n = 3$ weighings, which
corresponds to $M_{max} = 12$ possible weighings. Let’s look again at
the forward representations for 12 coins. You can find the code I’m
calling
[here](https://github.com/NinaZumel/DysonsAlgorithm/blob/main/dyson_signed_general.R).

``` r
# https://github.com/NinaZumel/DysonsAlgorithm/blob/main/dyson_signed_general.R
source("dyson_signed_general.R")
library(poorman) # dplyr will work here, too

nrounds = 3
Fmat = get_forward_representation(nrounds)
Fmat
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

**1. Create “weighing triplets”.**

We’ll start with the label `[0 0 1]`, and increase each digit by 1
modulo 3, to get a new forward label, `[1 1 -1]`. We’ll call this a
*cyclic shift*. Then we’ll take the new label, and shift it again to
make a triplet.

```
[0 0 1] (1)
[1 1 -1] (11)
[-1 -1 0] (12) # -12, actually, but this is the forward representation
```

Now get the next unassigned label (which is `[0 1 -1] = 2`), and make another
triplet, and so on, until all the labels are assigned to a group. This
results in $M_{max}/3$ groups. For this example, that’s 4 groups. You
can think of each group as a “weighing triplet,” because every weighing
of those three coins together has one coin on the left, one on the
right, and one on the table, every round.

Here are all the labels, their groups, and the digits of the forward
representations.

``` r
gps = create_cyclic_groups(nrounds)

M_max = (3^nrounds - 3)/2
gpmap = data.frame(group = gps, coin_label = 1:M_max)
gpmap = cbind(gpmap, data.frame(Fmat))

arrange(gpmap, group, coin_label) |> knitr::kable()
```

| group | coin_label |  X1 |  X2 |  X3 |
|------:|-----------:|----:|----:|----:|
|     1 |          1 |   0 |   0 |   1 |
|     1 |         11 |   1 |   1 |  -1 |
|     1 |         12 |  -1 |  -1 |   0 |
|     2 |          2 |   0 |   1 |  -1 |
|     2 |          6 |   1 |  -1 |   0 |
|     2 |          8 |  -1 |   0 |   1 |
|     3 |          3 |   0 |   1 |   0 |
|     3 |          7 |   1 |  -1 |   1 |
|     3 |         10 |  -1 |   0 |  -1 |
|     4 |          4 |   0 |   1 |   1 |
|     4 |          5 |   1 |  -1 |  -1 |
|     4 |          9 |  -1 |   0 |   0 |

Note that the groups can be precompiled, if you know $n$.

**2. Assign labels to the coins**

Now, if you have $M$ coins, $M < M_{max}$, instead of assigning them
sequential labels, you assign them labels from each group, in order. The
first 3 coins get labels from the first group, the next 3 from the
second group, and so on. You will have $rem = M \mod 3$ coins left over.
If $rem=2$, assign the last two coins to the members of the next group
that start with the digits `-1` and `1`; if $rem=1$, then assign the
last coin to the member of the next group that starts with `0`.

Let’s try some examples. The first group has the labels `(1, 11, 12)`,
and the second group has the labels `(2, 6, 8)`. Suppose we have 5
coins. Then we’d assign the first three coins the labels 1, 11, 12, and
the last two coins the labels 6 (`[1 -1 0]`) and 8 (`[-1 0 1]`).

If we have 4 coins, we’d assign the first three coins the labels 1, 11,
12, and the last coin the label 2 (`[0 1 -1]`).

**3. Weigh the coins according to the weighing schedule.**

The weighing schedule is the same as it was before, but now we’re only
using some of the labels. Each coin is placed on the scale according to
the digits of its label. Here’s the weighing schedule for the first
weighing:

``` r
Cset = compileC(Fmat)
knitr::kable(Cset[[1]])
```

| left | table | right |
|-----:|------:|------:|
|    8 |     1 |     5 |
|    9 |     2 |     6 |
|   10 |     3 |     7 |
|   12 |     4 |    11 |

So the first weighing of five coins is as follows:

```
coin1 (1): table
coin2 (11): right
coin3 (12): left
coin4 (6): right
coin5 (8): left

[ {coin3, coin5} | {coin2, coin4} ]
------------------------------------
coin1
```

This time, in addition to keeping track of the weighing outcome $a_i$,
we also need to keep track of which coins we know to be good, based on
the outcome of the weighing. We know that

- if the scale is balanced, then all the coins on the scale are good
  (the dud is on the table), and
- if the scale is not balanced, then all the coins on the table are good
  (the dud is on the scale).

Let’s suppose the scale tilts right (`a[1] = 1`). Then we know that
the coin on the table, `coin1`, is good. Now, to the second weighing:

``` r
knitr::kable(Cset[[2]])
```

| left | table | right |
|-----:|------:|------:|
|    5 |     1 |     2 |
|    6 |     8 |     3 |
|    7 |     9 |     4 |
|   12 |    10 |    11 |

```
coin1 (1, good): table
coin2 (11): right
coin3 (12): left
coin4 (6): left
coin5 (8): table

[{coin3, coin 4} | {coin2} ]
------------------------------
coin1, coin5
```

Oops! Now the scale counts aren’t equal! But we know that `coin1` is
good, so we can put it in the right pan to equalize the coin counts,
without affecting the outcome.

```
[{coin3, coin 4} | {coin2, coin1} ]
------------------------------
coin5
```

Sometimes the scale count isn’t equal, but none of the coins on the
table have been marked good. In that case, find a good coin in the pan
with more coins, and put it on the table.

To continue the example, let’s say that the scale again tilts right
(`a[2] = 1`). So now we know that the coin on the table, `coin5`, is good. On to weighing three.

``` r
knitr::kable(Cset[[3]])
```

| left | table | right |
|-----:|------:|------:|
|    2 |     3 |     1 |
|    5 |     6 |     4 |
|   10 |     9 |     7 |
|   11 |    12 |     8 |

```
coin1 (1, good): right
coin2 (11): left
coin3 (12): table
coin4 (6): table
coin5 (8, good): right

[{coin2} | {coin1, coin5}]
---------------------------
coin3, coin4

Move either of coin1 or coin5 to the table.

[ {coin2} | {coin1} ]
-----------------------
coin3, coin4, coin5
```

Now this time the scale tilts left (`a[3] = -1`). We have
`a = [1 1 -1]`, which means $A = 9 + 3 - 1 = 11$. The label 11
corresponds to `coin2,` and `a` rotates forward. This means that
the dud is `coin2`, and is heavy.

Let’s confirm that with code.

``` r
nrounds = 3
ncoins = 5
coins = numeric(ncoins) + 1 # good coins weigh 1 unit

# precompilation computes both 
# the weighing schedule and the label groups
precompiled = precompile(nrounds)

coins[2] = 1.5
find_dud(coins, precompiled)
```

    ## [1] 2

We’ll try 10 coins.

``` r
ncoins = 10
coins = numeric(ncoins) + 1

# no dud case
find_dud(coins, precompiled)
```

    ## [1] "No dud."

    ## [1] 0

``` r
# 7, light
coins[7] = 0.5
find_dud(coins, precompiled)
```

    ## [1] -7

``` r
# confirm all possible cases work
for(icoin in 1:ncoins) {
  for(direction in c(-1, 1)) {
    coins = numeric(ncoins) + 1
    coins[icoin] = 1 + 0.5*direction
    actual = icoin*direction
    result = find_dud(coins, precompiled)
    stopifnot(actual==result)
  }
}
```

This generalizes Dyson’s algorithm. As I said before, it’s not as
pretty, but it works.
