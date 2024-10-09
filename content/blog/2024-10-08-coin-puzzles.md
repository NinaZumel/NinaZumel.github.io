---
title: Coin Puzzles
date: 2024-10-08
tags:
 - math puzzles
---

Here are a couple of puzzles from Henry Dudeney's article "The Best Puzzles with Coins," in the *Strand Magazine*, July 1909. These are maybe less interesting than the mathematical puzzles that John and I have been doing, but for whatever reason, they caught my eye.

## Kissing Coins
> If I lay a penny flat on the table, how many other pennies can I place around it, every one also lying flat on the table, so that they all touch the first one?

It needn't be pennies, of course. Any coin (or any disc) will do, as long as all the coins in question are the same size. Try to do this one by geometry, not experiment.

## Making Change
If you split the check at restaurants a lot, then you probably have practical experience with this one, or at least you did until you and all your friends got Venmo. Remember, this puzzle is from 1909, though I've reworded it slightly.

> A tourist went into a shop in New York and bought goods at a cost of thirty-four cents. The only money they had was a dollar (100 cents), 
a three-cent piece, and a two-cent piece.{% marginnote "coins", "Yes! The U.S. [two-cent piece](https://en.wikipedia.org/wiki/Two-cent_piece_(United_States)) and [three-cent piece](https://en.wikipedia.org/wiki/Three-cent_piece) really existed, although by 1909 they probably weren't in circulation anymore." %} 
The seller had only a half-dollar and a quarter (25 cents). But another customer happened to be present, and when asked to help produced two dimes (dime = 10 cents), a nickel (5 cents), a two-cent piece, and a penny (1 cent). How did the seller make change?

 
Solutions beneath the 3-cent nickel.

{% image "./images/1866_3_Cent_Nickel.jpg", "U.S. 3-cent nickel, front and back" %}
<p class="caption">Source: <a href="https://commons.wikimedia.org/wiki/File:1866_3_Cent_Nickel.jpg">Wikimedia</a></p>


## Solutions

### Kissing Coins

Imagine three coins of radius $r$, and lay them out so that they all just kiss each other:

{% image "./images/tripod.jpeg", "Sketch of three circles of radius r, just touching each other in a triangle shape" %}
<p class="caption">Why yes, we do have a chalkboard in our office.</p>

Then the triangle formed by the center of the three coins is an equilateral triangle with sides $2r$. Each interior angle of the triangle is 60°. 

360°/ 60° = 6, so we can lay out six such triangles around a center coin, where each coin just kisses its two neighboring coins. That's six coins (because every perimeter coin is in two triangles).
 
{% image "./images/kissing_discs.jpeg", "Sketch of three circles of radius r, just touching each other in a triangle shape" %}
<p class="caption">I didn't have any pennies to hand to demonstrate this, so I used refrigerator magnets instead..</p>


### Making change

At the start, the allocations are:

* buyer: 100¢, 3¢, 2¢, and wants to make a 34¢ purchase
* seller: 50¢, 25¢
* customer: 10¢, 10¢, 5¢, 2¢, 1¢

If the buyer gives the seller a dollar, then the change is 66¢, which obviously isn't going to work. So the buyer changes their 3¢ coin with the customer, for the 2¢ coin and the penny. This gives:

* buyer: 100¢, 2¢, 2¢, 1¢ 
* seller: 50¢, 25¢
* customer: 10¢, 10¢, 5¢, 3¢

Now the buyer gives the seller $1.04, and needs 70¢ back.  So the seller changes their quarter with the customer for two dimes and a nickel:

* buyer: ~~100¢, 2¢, 2¢,~~ 1¢ and a 34¢ purchase
* seller: (100¢, 2¢, 2¢) 50¢, 10¢, 10¢, 5¢,
* customer: 25¢, 3¢

A half-dollar and two dimes is 70¢, so the seller can make change, and everyone is happy.

