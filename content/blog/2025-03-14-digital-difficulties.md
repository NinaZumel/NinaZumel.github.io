---
layout: layouts/post_nonotes.njk
title: "Digital Difficulties"
date: 2025-03-14
tags:
  - math puzzles
---

*This was originally posted to [RWorks](https://rworks.dev/posts/digital-difficulties/).*

Here’s another puzzle, from Henry Dudeney’s [*Perplexities*
column](https://babel.hathitrust.org/cgi/pt?id=mdp.39015055410677&seq=115)
in *Strand Magazine*, January 1924.

> Arrange the ten digits, 1 2 3 4 5 6 7 8 9 0, in such order that they
> shall form a number that may be divided by every number from 2 to 18
> without in any case a remainder. As an example, if I arrange them
> thus: 1 2 7 4 9 5 3 6 8 0, this number can be divided by 2,3,4,5, and
> so on up to 16, without any remainder, but it breaks down at 17.

One of the additional challenges in taking puzzles from these older
sources is to try to solve them the way a puzzle-solver would have, back
in 1924. In this case, I wasn’t successful at finding a pure
paper-and-pencil solution, but I did find an elegant modern solution
that would have been possible with the computational machines of the
era.

But before I show you my solution, try it yourself, first! My solution
after *The Mathematicians*.

{% image "./images/the-mathematicians.jpg", "Allegorical sketch of beings in a courtyard, both made of mathematical instruments" %}
<p class="caption">The Mathematicians (1917)</br> Artist: Giorgio de Chirico. 
Source: <a href="https://www.wikiart.org/en/giorgio-de-chirico/the-mathematicians-1917">WikiArt</a></p>

## Solution

Let’s look at a super brute force solution first, and then a more
elegant, but still not quite paper-and-pencil one.

### The Brute Force Solution

With a modern computer, one could simply generate all 10!= 3,628,800
possible permutations of the ten digits. Then, for each permutation,
check whether it is divisible by all the integers from 2 to 18. This is
brutal, but it works.

We can also reduce the number of permutations by taking advantage of
some facts about divisibility.

A number is:

-   divisible by 10 (and 5) if the last digit is 0
-   divisible by 4 (and 2) if the last two digits are a number divisible
    by 4 (For an explanation of why, see [here](/blog/2025-03-07-divisibility-part1/)).

Combining these facts, we can deduce that the last two digits of our
target number must be 20, 40, 60, or 80. This leaves (for each case),
8!= 40,320 permutations, giving us a total of 4\* 40320 = 161,280
candidates to examine. That’s a much smaller number!

### An Elegant Modern Solution

Here’s a solution that reduces the number of candidates even more. This
time, we’ll start by finding the smallest number, *m*, that is divisible
by all the integers from 2 to 18. We know that our target number must be
a multiple of *m*. Next, we find all the multiples of *m* in the
appropriate range, and check which one(s) have ten unique digits. These
will be the solutions.

Let’s code this solution up, in R.

#### Find the Least Common Multiple (LCM) of the integers from 2 to 18

We’ll start by multiplying all the primes in our range:

``` r
m = 2*3*5*7*11*13*17
m
```
```
[1] 510510
```
Note that this number is also divisible by `6=2*3, 10=2*5, 14=2*7`, and
`15=3*5`. What factors are left? To save the trouble of tracking this by
hand, we’ll write a function to return which integers in the range 2:18
a number `m` is *not* divisible by.

``` r
not_divisible_by = function(m) {
  candidates = 2:18
  
  remainders = m %% candidates
  candidates[remainders != 0]
}

not_divisible_by(m)
```
```
[1]  4  8  9 12 16 18
```
If we further multiply *m* by another 3, it will then be divisible by 9
and 18. If we then also multiply *m* by 4, it will be divisible by 4, 8,
and 12. This leaves 16, which means we need another 2.

``` r
# 3 and 4, first
m = m*3*4
not_divisible_by(m)
```
```
[1] 16
```
``` r
# now an extra 2
m = m*2
not_divisible_by(m)
```
```
integer(0)
```

That gives us m = 12252240, which should be the smallest number
divisible by all integers from 2 to 18. The number we want must
therefore be a multiple of `m`.

#### Filter all the multiples of *m*

Now we need to

-   find all the multiples of *m* in the appropriate range
-   find all the resulting numbers that have ten unique digits

First, we’ll find the range of candidates.

``` r
# the smallest possible candidate
minC = 1234567890

# the largest possible candidate
maxC = 9876543210

# the range of multipliers to consider
crange = round(c(minC, maxC)/m)
crange
```
```
[1] 101 806
```
This leaves 706 candidates to check, which is far fewer than 161,280. We
already know all these candidates are divisible by all the integers from
2 to 18; we just need to check which ones are a number comprised of ten
unique digits.

So let’s write the filter and do the calculation:

``` r
ten_unique_digits = function(nint) {
  nstring = as.character(nint)
  if(nchar(nstring) != 10) return(FALSE)
  
  # create a vector of digits
  digits = unlist(strsplit(nstring, split=""))
  
  length(unique(digits)) == length(digits)
}


candidates = m * crange[1]:crange[2]
cfilter = vapply(candidates, ten_unique_digits, logical(1))

solns = candidates[cfilter]
solns
```
```
[1] 2438195760 3785942160 4753869120 4876391520
```
There are 4 solutions! Let’s check manually that all solutions are
valid.

``` r
for(s in solns) {
  print(paste("Checking solution", s))
  for(i in 2:18) {
    stopifnot(s %% i == 0)
  }
  print("--- Checks out")
}
```
```
[1] "Checking solution 2438195760"
[1] "--- Checks out"
[1] "Checking solution 3785942160"
[1] "--- Checks out"
[1] "Checking solution 4753869120"
[1] "--- Checks out"
[1] "Checking solution 4876391520"
[1] "--- Checks out"
```
``` r
# let's also find the multipliers
solns/m
```
```
[1] 199 309 388 398
```
And we are done! ✅

## But How Would Dudeney Solve This?

It’s easy to find *m*, the LCM of the integers from 2 to 18, with pencil
and paper. But I have a hard time imagining that a puzzle-solver in 1924
would be willing to calculate candidate multiples of *m* by hand to find
one with ten unique digits. Even if they started at 101`m` and worked
their way up, they would have to check 199 - 101 + 1 = 99 candidates
before they find a solution. That doesn’t sound fun anymore.

Fortunately, even in 1924, a sophisticated puzzle-solver (like Dudeney)
might not need to do the calculation purely by pencil and paper. They
could have used a mechanical calculator of the era, like the
[Arithmometer](https://en.wikipedia.org/wiki/Arithmometer) below:

{% image "./images/Original-Odhner-Arithmos-Typ-5.png", "The Odhner Arithmos, Type 5, circa 1912-1928. Source: Wikipedia" %}
<p class="caption">The Odhner Arithmos, Type 5, circa 1912-1928. Source: <a href="https://en.wikipedia.org/wiki/File:Original-Odhner-Arithmos-Typ-5.jpg">Wikipedia</a></p>

With such a device, a puzzle-solver could literally crank out multiples
of *m*, scanning each one as they go, rejecting values with repeated
digits, until they discover a solution to the puzzle. I imagine it could
be done in under ten minutes—which would not be considered a long time
for someone accustomed to more manual calculations.

You can read more about older calculation technologies in John Mount’s
article, [*Calculating at Pencil and Paper
Scale*](https://win-vector.com/2024/11/06/calculating-at-pencil-and-paper-scale/).

One of the descendants of the Arithmometer is the [Curta
calculator](https://en.wikipedia.org/wiki/Curta), and we at Win Vector
just happen to have one! Solving this problem with a Curta would be much
like solving it with an Arithmometer. Here’s a video of John Mount
“finding” the smallest solution to the puzzle:

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/KHiS7niRdQI?si=e9sLc6W5nvOz_wzj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>
</center>

The discovered solution is in the black area, and the associated
multiple of *m* is in the white area. Keep in mind that John already
knew how many cranks he had to do before a solution came up, and after
about the first two or three cranks, he stopped checking for duplicate
digits. So this is probably a little faster than it would take someone
who really didn’t know what the answer was.

Now that I know about the Arithmometer and related devices, I’m not too
worried about whether Dudeney could have executed my solution. But I do
feel sorry for any poor *Strand Magazine* readers who didn’t have the
latest calculating technology. And I still wonder if I’m missing an even
more clever trick, which would have made this solvable with just pencil
and paper. If I ever find such a solution, I’ll post it here, and at [Puzzle
Corner](https://rworks.dev/index.html#category=Puzzle%20Corner) on `Rworks.dev`. 
And if you ever find one, please do write in and let me know!

