---
layout: layouts/post_nonotes.njk
title: "A Trick For Checking Divisibility by Powers of 2"
date: 2025-03-07
tags:
  - fun with math
  - pen and pencil calculation
---

I’ve been working on another puzzle post, which will eventually show up
here (but probably first on [*Rworks*](https://rworks.dev/)). Because the puzzles
I present come from older sources---in this case, *Strand Magazine* from
1924---I try to solve the puzzles using techniques that a puzzle-solver
would have access to at the time—in other words, techniques other than
brute force search via computer.

While looking for such a solution to the current puzzle, I started
thinking about various tricks for eyeballing the divisibility of
integers. You probably remember these tricks from grade school: a number
$N$ is divisible by 3 if the digits sum to something divisible by 3;
divisible by 5 if the last digit is 5 or 0; divisible by 9 if the digits
sum to something divisible by 9; and so on. I remember learning tricks
for divisibility by 2, 3, 5, 9, and 10. And even though I have access to
computers and calculators, I still sometimes use these tricks for quick
mental calculations.

Here are a couple of tricks that I didn’t know, until I started looking
into this topic:

- $N$ is divisible by 4 if its last two digits are divisible by 4.
- $N$ is divisible by 8 if its last three digits are divisible by 8.

These are both specific cases of the general rule

- **$N$ is divisible by $2^k$ if its last $k$ digits are divisible by
  $2^k$.**

So in this post, I’ll prove it, and provide a few examples of using the
rule for mental or pencil-and-paper calculations, just for fun.

## The Proof

Let $N$ be the number we are checking. Say it has $D$ digits. Let $n$ be
the value represented by the lowest $k$ digits of $N$. Then the number
$M = N - n$ is the value represented by the highest $D - k$ digits,
followed by $k$ zeros.

As an example, if $k = 2$ then we write $N = 734$ as $732 = 700 + 34$.

Any integer where the lowest $k$ digits are zero is divisible by $10^k$.
In our example, $M = 700$ is divisible by 100.

The next step is to establish that $10^k$ is always divisible by $2^k$,
which we can do in one line:

$$
10^k = (2 * 5)^k = 2^k * 5^k
$$

Now $10^k$, and therefore $M$, are always divisible by $2^k$, and
$N = M + n$. So $N$ is divisible by $2^k$ iff $n$ is. ✅

<br/>

Going back to our example, 734 is not divisible by 4, because 34 isn’t.
But 732 is.

``` r
is_divisible_by = function(M, m) {
  if(M %% m == 0) {
    result = paste(M, "is divisible by", m)
  } else {
    result = paste(M, "is not divisible by", m)
  }
  result
}

is_divisible_by(734, 4)
```
```
## [1] "734 is not divisible by 4"
```
``` r
is_divisible_by(732, 4)
```
```
## [1] "732 is divisible by 4"
```
Notice that in proving the above, we also established that $10^k$ is
always divisible by $5^k$. So it is also true that

- **$N$ is divisible by $5^k$ if its last $k$ digits are divisible by
  $5^k$.**

So those are some divisibility tricks you may not have known. Let’s try
applying them.

## Fun with Mental Calculations

All of the operations below should be doable in your head, or with the
help of a pencil and the back of an envelope.

### Is M = 9,937,654,480 divisible by 8?

Since $8 = 2^3$, all we need to do is check the last three digits, 480.
Since $480 = 8 * 60$ is divisible by 8, 9,937,654,480 is, too.

``` r
# check
M = 9937654480
is_divisible_by(M, 8)
```
``` 
## [1] "9937654480 is divisible by 8"
```
<br/>

### Is M = 9,937,654,480 divisible by 16?

$16 = 2^4$, so now we need to check if 4480 is divisible by 16. This is
certainly doable with pencil and paper. Let’s do it “in our head”.

We know 480 is divisible by 8, from above. We can break 4480 down into
$4480 = 4000 + 480 = 8 (500) + 8 (60) = 8 * 560$.

560 is divisible by 2. So 4480 is divisible by 2\*8 = 16, which is what
we want. Therefore, $M$ is divisible by 16.

``` r
is_divisible_by(M, 16)
```
```
## [1] "9937654480 is divisible by 16"
```
As an aside, 560 is also divisible by 4 (because 60 is divisible by 4),
and by 8. So we also know that 4480 is divisible by 32 and by 64.

``` r
is_divisible_by(4480, 32)
```
```
## [1] "4480 is divisible by 32"
```
``` r
is_divisible_by(4480, 64)
```
```
## [1] "4480 is divisible by 64"
```
<br/>

### Is M = 9,937,654,480 divisible by 32?

$32 = 2^5$, so now we have to check 54,480. At this point it’s easier to
do it with a calculator or computer, but let’s try it by hand anyway.

We know from above that 4480 is divisible by 32, so now we need to check
if 50,000 is divisible by 32. We know it’s divisible by 8 (because 000
is divisible by 8), and if we have an envelope and a pencil handy we can
calculate that $50000/8 = 6250$.

Now, we can eyeball that 6250 is *not* divisible by 4 (because 50 is not
divisible by 4). So 50,000 is not divisible by 32. Therefore
$50,000 + 4480 = 54,480$ is not divisible by 32, and neither is $M$.

``` r
is_divisible_by(54480, 32)
```
```
## [1] "54480 is not divisible by 32"
```
``` r
is_divisible_by(M, 32)
```
```
## [1] "9937654480 is not divisible by 32"
```
<br/>

## Fun, but is it Practical?

In an era of calculators and computers, the math fact we just proved has
limited value, since it’s just as easy to divide the full number by
$2^k$ as it is to divide the lowest $k$ digits. But the trick might
still be handy, if you ever want to quickly check if something is
divisible by 4 or 8, without reaching for the calculator app on your
phone.

And it’s fun to exercise your brain with mental arithmetic or pencil
and paper calculations, once in a while.
