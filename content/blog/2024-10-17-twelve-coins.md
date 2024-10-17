---
title: The Twelve Coins Puzzle
date: 2024-10-17
tags:
  - math puzzles
---

{% image "./images/golden-scale.jpeg", "Old-School Golden scale in balance with a hand putting a coin on it" %}
<p class="caption">Photo by Marco Verch, CC-2.0. <a href="https://foto.wuestenigel.com/old-school-golden-scale-in-balance-with-a-hand-putting-a-coin-on-it/">Source</a></p>

This is a notoriously hard problem that comes in many flavors. I don't know where it comes from originally, but it garnered quite a bit of attention from mathematicians in the mid-twentieth century. Apparently some versions of it may have even distracted scientists away from their defense research during WWII!

> The problem was popular on both sides of the Atlantic during World War II; it was even suggested that it should be dropped over Germany in an attempt to sabotage their war effort...  (Guy & Nowakowski 1995){% marginnote "guy",  "Guy, Richard, and Richard Nowakowski. \"Coin-Weighing Problems,\" *The American Mathematical Monthly* Vol. 102, No. 2 (Feb. 1995). [JSTOR link](https://www.jstor.org/stable/2975353 )" %}

Here's the version I set out to solve:

You have twelve coins, to appearance exactly identical; but possibly one is counterfeit (we'll call it a "dud"). You do not know if a dud is present, nor whether it is heavier or lighter than the good coins. Can you determine in three weighings on a balance scale: (1) whether there is a dud, (2) if so, which coin, and (3) its relative weight (lighter or heavier than the good coins)?

An additional detail:
* You can assume that the coins are distinguishable in a balance pan (or on the table).{% marginnote "labelsok", "This doesn't contradict the \"exactly identical\" condition in the problem statement, because you can group them in the pan or on the table spatially to distinguish them." %} This means that if you have grouped the coins into, say, two groups, $A$ and $B$, and you put some coins from each group into a single pan, you know which of those coins are from $A$ and which are from $B$.

You can also find this puzzle (or some version of it) online as "The Twelve Balls problem." I made a point of not looking at any online solutions, but I did skim the Guy and Nowakowski paper cited above---it does not have a solution, just some history and other details.{% marginnote "paper", "Mostly, I used the observation that the coins are distinguishable in a balance pan. Without that allowance, I don't think the problem is solvable for twelve coins."%}

John Mount skimmed the format of other solutions (he swears he didn't read any of them); they tend to be structured as a long and tedious case tree. So in addition to finding a solution, he and I also came up with a somewhat more consise notation and presentation for the solution. It does shorten the description of the identification procedure somewhat. Hopefully it also makes it easier to read.

Our solution is after the three-cent nickel.

{% image "./images/1866_3_Cent_Nickel.jpg", "U.S. 3-cent nickel, front and back" %}
<p class="caption">Source: <a href="https://commons.wikimedia.org/wiki/File:1866_3_Cent_Nickel.jpg">Wikimedia</a></p>

## Our Solution

To make the ultimate identification procedure (hopefully) easier to follow, we'll present our notation, and some useful transformation rules and lemmas before we get to the solution procedure.
## Notation
We will annotate the coins as follows:
* $?$:  coin of unknown state
* $G$: the coin is known to be a good coin
* $L$: the coin is possibly a dud, and if so, is lighter than a good coin
* $H$: the coin is possibly a dud, and if so, is heavier than a good coin

We'll count how many coins of a type we have with a superscript; so for example, $?^{12}$ means that we have 12 coins of unknown state (this is our starting position).

The goal is to end up in the state $X G^{11}$, where $X \in \{H, L, G\}$, the last value marking the situation where there is no dud. 

We'll annotate a weighing as

```
[ Set_left  | Set_right ]
--------------------------
Table
```

where `Set_left` are the coins in the left pan, `Set_right` in the right pan, and `Table` what remains on the table. 

## Some transformation rules

### Transformation 1. $G$ is a terminal state
Once you know a coin is good, it can never go bad.

### Transformation 2. $H$ and $L$ can only go to $G$, not to the opposite weight

If a coin has been on the heavy side of the scale, then it must either be neutral (a good coin) or heavy. It cannot ever become light. Similarly for coins that have been on the light side of the scale.

As a corollary, if a coin marked $H$ *does* end up on the light side of the scale in a subsequent weighing, then it must be $G$. A similar argument applies to $L$ coins.

### Transformation 3. Transformation on a balanced weighing

```
[ X^L | X^R ]
--------------  
X^T

--balanced--> X^L, X^R -> G^{L+R}, table states unchanged
```

In other words, if the scale is balanced, everything on the scale is good, and 
the dud must be on the table.

### Transformation 4. Transformation on an unbalanced weighing

```
[ X^L | X^R ]
--------------  
X^T

--unbalanced--> X^{T} -> G^{T}, states on scale change depending 
on coin location and previous state.
```

In other words, if the scale is unbalanced, then the dud must be on the scale, and everything on the table must be good. Everything on the heavy side of the scale is either $H$ or $G$ (see transformations 1 and 2); everything on the light side of the scale is either $L$ or $G$.  (ditto).

## Some Useful Lemmas

### Lemma 1. $L^2H$ and $H^2L$ can be resolved in one weighing if a dud is known to be present.

I'll do the $L^2H$ case; the other one follows from a similar argument. To make the argument simple, we'll assume these are the only three coins in the world (any remaining coins are already $G$).

Weigh as
```
[L | L]
---------
H 
```

If the scale is balanced, then by transformation 3 this goes to  $G^{2} H$ and we are done.

If the scale is unbalanced, then by transformation 4 the table becomes $G$, and by transformation 2 the coin on the heavy side becomes $G$, and we end up with $G^{2} L$ and we are done.  ✅

### Lemma 2. $HLG$ can be resolved in one weighing if a dud in known to be present.

To make the argument simple, we'll again assume these are the only three coins in the world (any remaining coins are already G).

Weigh as
```
[H | G]
-------
L
```

(or vice versa). If the scale balances, then $L$ is the dud, and is light; otherwise $H$ must be the dud (and is heavy). ✅

### Lemma 3.  $?G$ can be resolved in one weighing.

This is fairly obvious, but I'll state it. Again, we'll assume these are the only two coins in the world (any remaining coins are also already G). Weigh as:

```
[? | G]
-------

```

If the scale is balanced, the last coin is $G$ (there is no dud). If it's unbalanced, then if $?$ is on the heavy side,
it's $H$, otherwise it's $L$.   ✅

## The Solution Procedure

Let's assume for the moment that **there is a dud**. We'll do the "possibly no dud" case afterwards.

The initial state is $?^{12}$. For the **first weighing**, divide the coins into three groups of four:

```
w1 = [?^4 | ?^4]
     -----------
        ?^4
```

There are two outcomes:
* The scale is balanced, which gives us $G^8, ?^4$ (the dud is on the table).
* The scale is not balanced, which gives us $L^4, H^4, G^4$ (the dud is on the scale).

### If the scale is balanced on the first weighing
Then we are in the state  $G^8, ?^4$. Our **second weighing** is
```
w2 = [?^2 | ? G]
    -------------
       ? G^7
```

(put three of the remaining unknowns back on the scale, with one good coin).

* If the scale is balanced, then everything on the scales is $G$, and we have $G^{4},?,G^{7} \rightarrow (G^{11}, ?)$. By Lemma 3, we can resolve this in one weighing for three total, and we are done. ✅
* If the scale is not balanced then everything on the table is $G$, and we have either
	* $L^2 H G^9$ if the left side is lighter, or
	* $H^2LG^9$  if the right side is lighter.

	Either way, by Lemma 1 we can resolve this in one weighing for three total, and we are done.  ✅

### If the scale is not balanced on the first weighing
Then we are in the state $L^4, H^4, G^4$ . Make the **second weighing**
```
w2 = [L^2 H | L H G]
     ----------------
        L H^2 G^3
```

This is not obvious, and I confess we found it by trial and error. The key insights that lead to this are that (1) you can't resolve more than 3 coins in one weighing (so you can't have more than three unresolved coins on either side of the scale, or on the table); and (2) symmetric weighings don't give you enough information.

* If the scale is balanced, then everything on the scales is $G$, and on the table you have $H^2 L G^3$. By Lemma 1 we can resolve this in one weighing for three total, and we are done. ✅
* If the scale is not balanced then everything on the table is $G$, and on the scale we have either
	* $L^2G | G^2 H \rightarrow L^2HG^3$ (by transformation 2) if the left side is lighter, or
	* $G^2H | G^2 L \rightarrow LHG^4$ (by transformation 2) if the right side is lighter.
	
   In the first case, Lemma 1 resolves it in one weighing; in the second case, Lemma 2 resolves it in one weighing. That's three total, and we are done.  ✅

This resolves all cases when a dud is known to be present. But what about the case when a dud is not known to be present? If there is no dud, then the scale will always balance, and if you trace back through the above, you'll see there is only one path:

$(?^{12}) \rightarrow (G^8, ?^4) \rightarrow (G^{11}, ?)$

and by Lemma 3, that last state can be resolved in one weighing, whether or not there is a dud. 

This resolves all cases, including the "no dud" case. We can identify the dud if it exists, and determine its relative weight. And we are done.  ✅✅

## Some Further Discussion

After we finished our solution, we dug into some others. According to the Guy and Nowakowski paper, Freeman J. Dyson gave an "elegant" general solution to this problem (resolve $N$ coins in $n$ weighings) in 1946.{% marginnote "dyson", "Dyson, Freeman J. \"Note 1931--The problem of the pennies,\" *The Mathematical Gazette* Vol. 30, No 291) (October 1946). [JSTOR link](https://www.jstor.org/stable/3611225)" %}It is an *oblivious* solution, meaning Dyson predefines a sequence of weighings, which at the end is guaranteed to identify the dud (if there is one) and its weight, or report that there is no dud.  This contrasts with our---and I suspect, most---solutions, that determine the next weighing after seeing the results of the previous one. I imagine it is far more automatable than a solution like ours. In broad strokes, it seems to be a solution in the spirit of the [Four Weights problem](https://ninazumel.com/blog/2024-09-29-four-weights/): it involves labeling the coins with a trinary representation.

Dyson (and others) also show that twelve coins is the most that you can resolve in three weighings, under the conditions I gave in the problem statement. I suspect (though I don't see a proof for it, and I'm too lazy to prove it myself) that if we relax the problem to assume that there *is* a dud, and try to identify it, but not necessarily its weight, we can resolve up to thirteen coins in three weighings.{% marginnote "extracoin", "Dyson does show that if you have one extra coin that is known to be good, you can resolve 13 unknown coins in three weighings (and determine the weight of a dud)." %}

If you remove the accomodation that coins are distinguishable in the balance pan (meaning that once you dump a bunch of coins in the pan, you can't tell where any individual coin came from), the maximum number of coins you can resolve appears to be ten (from a formula given by Guy and Nowakowski).







	