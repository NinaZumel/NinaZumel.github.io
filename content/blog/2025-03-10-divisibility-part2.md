---
layout: layouts/post_nonotes.njk
title: "A Trick For Checking Divisibility by 11"
date: 2025-03-10
tags:
  - fun with math
  - pen and pencil calculation
  - modular artithmetic
---

Continuing my theme from [last
time](/blog/2025-03-07-divisibility-part1/) of
mental calculation and divisibility tricks that I didn’t learn in
school, here’s a cool one:

- **A number $N$ is divisible by 11 if the alternating sum of its digits
  is divisible by 11.**

For example, take the number 2574. Its alternating sum is
$2 - 5 + 7 - 4 = 0$. Since 0 is divisible by 11, so is 2574.

Let’s check, in R.

``` r
M = 2574
# check divisibility directly
if(M %% 11 == 0) {
  result = paste(M, "is divisible by 11")
} else {
  result = paste(M, "is not divisible by 11")
}
result
```
```
## [1] "2574 is divisible by 11"
```

This can potentially be handy, if you ever want to know if a large
number is divisible by eleven, and your pencil and paper are closer than
your calculator app. Hey, it could happen!

We can prove the above fact, but first let’s review some facts about
modular arithmetic. If you are comfortable with modular arithmetic, skip
to [the Proof section](/blog/2025-03-10-divisibility-part2/#the-proof).

## Preliminaries: Modular Arithmetic

By definition, when we say `a % b = c`, we mean that `a/b = kb + c` for
some value `k`—in other words, that `c` is the remainder of `a/b`. (Note
that in R, `%%` is the operator for modular arithmetic).

When we say `(a ~ b) % c` (pronounced “a is congruent to b, modulo c”),
we mean that `(a-b) % c = 0`. In other words, `a` and `b` are
equivalent in the field defined by `modulo c`.

### Modular Arithmetic with Negative Numbers

The above is fairly intuitive with nonnegative numbers, but I always get
confused when negative numbers appear. Let’s use the observation that

- `a/b = kb + (b-1) = (k+1) b + (-1)`

In other words, `(b-1)` is the remainder of `a/b` with respect to some
multiple of `b` (namely, `kb`), but `-1` is the remainder of `a/b` with
respect to the *next* multiple of `b` (namely, `(k+1)*b`).

This means that `((n-1) ~ -1) % n`, and that all these statements are
equivalent:

- `(n-1) % n = (n-1)`
- `-1 % n = (n-1)`
- `(n-1) % n = -1 % n`

Specifically for our application: `(10 ~ -1) % 11`; and
`10 % 11 = -1 % 11`.

### More Handy Facts

These are ways that we can “push through” the modulo operator into
certain expressions:

- `(a + b) % n = (a % n + b) % n`
- `(ab) % n = ((a % n) * b) % n`
- `(a^b) % n = ((a % n)^b) % n`

With these tools in hand, we are ready to attempt the proof.

## The Proof

**A number $N$ is divisible by 11 if the alternating sum of its digits
is divisible by 11.**

Let’s write $N$ as powers of 10:

$$
N = \sum_{i=0}^n 10^i a_i 
$$

Then (dropping the summation bounds, for neatness);

$$
\begin{aligned}
N \text{ \% 11}  &= [ \sum_i 10^i a_i ] \text{ \% 11}\\
&= [ \sum_i (10^i a_i) \text{\% 11}] \text{ \% 11} \\
&= [ \sum_i a_i (10^i \text{ \% 11}) ] \text{ \% 11} \\
&= [ \sum_i a_i (10 \text{ \% 11})^i ] \text{ \% 11} \\
&= [ \sum_i a_i (-1 \text{ \% 11})^i ] \text{ \% 11} \\
\end{aligned}
$$

The last step follows because `(10 ~ -1) %  11`. Because we are working
in “modulo 11” world, the last expression is also equivalent to

$$
N \text{ \% 11} = [\sum_i a_i (-1)^i] \text{ \% 11}
$$

The value -1 to an even power is 1; -1 to an odd power is -1. So the
expression inside the brackets is the alternating sum of the digits of
N.

Now we can see that if the alternating sum modulo 11 is zero, then
`N % 11 = 0`. In other words, when the alternating sum is divisible by
11, so is $N$. ✅

## Testing it Out

I confess, the proof gives me a headache. But we can test the procedure
out on a random sample, to convince ourselves it works. First, let’s
implement an alternating sum function.

``` r
# function that returns the absolute value of
# the alternating sum of a number's digits
alternating_sum = function(N) {
  nstring = as.character(N)
  
  # create a vector of digits
  digits = as.numeric(unlist(strsplit(nstring, split="")))
  nd = length(digits)

  # alternating +/-1; -1 to even powers is 1, to odd powers is -1
  signs = (-1)**(1:nd)
  abs(sum(digits * signs))
}
```

If you look carefully, you’ll see the alternating sum I’m calculating
above is actually the negative of the one I did “by hand” at the
beginning of this post: people will naturally start the sum with a
positive coefficient for the first (leftmost) digit, but my code starts
the sum with a negative coefficient, because R indexes from 1. But that
doesn’t affect divisibility by 11, and in any case, I’m returning the
absolute value of the alternating sum, for consistency.

Now let’s take a random sample of integers, and test.

``` r
set.seed(20250306)
# test a random sample of integers
mult11 = 0  # we'll count how many multiples of 11 that we saw

# generate 1000 unique integers from 1:999999
samples = sample.int(999999, size=1000)

for(sample in samples) {
  direct = (sample %% 11) == 0
  bysum = (alternating_sum(sample) %% 11) == 0
  
  if(direct) {mult11 = mult11 + 1}
  stopifnot(direct == bysum)
}

print(paste("Test successful; found", as.integer(mult11), "multiples of 11."))
```
```
## [1] "Test successful; found 94 multiples of 11."
```
So the alternating sum trick seems to work! As with the tricks in my
previous post, this may not be the most useful tool in your arsenal,
given that we all have calculators and computers. But it’s an
interesting arithmetical fact, all the same. Who knows? Maybe you can
turn it into a bar trick.
