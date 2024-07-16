---
date: 2024-07-16
title: Simpson’s Paradox as a Logistic Regression
---

[Simpson’s paradox](https://en.wikipedia.org/wiki/Simpson's_paradox) is
when a trend that is present in various groups of data seems to
disappear or even reverse when those groups are combined. One sees
examples of this often in things like medical trials, and the phenomenon
is generally due to one or more unmodelled confounding variables.

In the course of something else that I was working on, I was trying to
come with an example of a logistic regression analysis, where one of the
coefficients had a clearly incorrect sign. There are several reasons why
this might happen: separation or quasiseparation of the data being the
obvious ones. But Simpson’s paradox is another cause.

I ended up not needing the example, but since I had it, I thought I’d
write it up, since I’ve never seen Simpson’s paradox presented in quite
this way before.

## Synthetic Example: Weight Loss Trial

This is a problem statement where we would expect the coefficients of a
logistic regression to be non-negative (except the intercept).

Consider a trial that tests the efficacy of a specific eating regimen
(let’s say 16/8 intermittent fasting, which we’ll call `ifasting`) and a
specific exercise regimen (a brisk 30 minute walk every day, which we’ll
just call `exercise`). The goal (“success”) is to lose at least five
pounds by the end of the trial period. We’ve set up three treatment
groups, as follows:

- 200 subjects try exercise alone
- 300 subjects try ifasting alone
- 300 subjects try ifasting plus exercise

Prior to the trial, all the subjects led fairly sedentary lifestyles,
and weren’t dieting in any formal way.

For these subjects, one might reasonably expect that neither exercise
nor ifasting would be *less* successful for losing weight than doing
nothing. One would also reasonably expect that ifasting plus exercise
should do no worse than doing either one alone. Therefore, modeling the
results of such an experiment as a logistic regression should lead to a
model where the coefficients $\beta_{ifasting}$ and $\beta_{exercise}$
are both non-negative, as any treatment should increase the odds that
the subject loses weight.

Now suppose that, unbeknownst to the researchers, there are two
subpopulations amongst the subject. The first, Population A, responds
quite well to the intermittent fasting regimen.

``` r
generate_samples = function(ifasting, exercise, total, successes, label) {
  failures = total-successes
  data.frame(ifasting = ifasting,
             exercise = exercise,
             success = c(rep(1, successes), rep(0, failures)),
             label=label)
}

# population A
popA = data.table::rbindlist(list(
  generate_samples(ifasting=0, exercise=1, total=100, successes=2, "A"),
  generate_samples(ifasting=1, exercise=0, total=200, successes=160, "A"),
  generate_samples(ifasting=1, exercise=1, total=100, successes=90, "A")
))

# model just on population A
mA = glm(success ~ ifasting + exercise, data=popA, family=binomial)
summary(mA)
```

    ## 
    ## Call:
    ## glm(formula = success ~ ifasting + exercise, family = binomial, 
    ##     data = popA)
    ## 
    ## Coefficients:
    ##             Estimate Std. Error z value Pr(>|z|)    
    ## (Intercept)  -4.7028     0.8078  -5.822 5.82e-09 ***
    ## ifasting      6.0890     0.7882   7.725 1.12e-14 ***
    ## exercise      0.8109     0.3773   2.149   0.0316 *  
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 527.16  on 399  degrees of freedom
    ## Residual deviance: 284.79  on 397  degrees of freedom
    ## AIC: 290.79
    ## 
    ## Number of Fisher Scoring iterations: 6

As expected, the coefficients for `ifasting` and `exercise` are both
positive. We can look at the rates that the model predicts.

``` r
# small frame to represent all possible states
testdata = data.frame(
  ifasting = c(0, 0, 1, 1),
  exercise = c(0, 1, 0, 1)
)

# get the success rates for each state
testdata$predictA = predict(mA, newdata=testdata, type="response")
testdata
```

    ##   ifasting exercise    predictA
    ## 1        0        0 0.008988764
    ## 2        0        1 0.020000000
    ## 3        1        0 0.800000000
    ## 4        1        1 0.900000000

``` r
# confirm it by doing the averages by hand
library(poorman, warn.conflicts = FALSE) # for data-wrangling; uses dplyr API
```

    ## 
    ##   I'd seen my father. He was a poor man, and I watched him do astonishing things.
    ##     - Sidney Poitier

``` r
popA |> 
  mutate(gp = ifelse(ifasting & exercise, 'both',
                     ifelse(ifasting, 'ifast alone', 'exercise alone'))) |>
  group_by(gp) |>
  summarize(success_rate = mean(success))
```

    ##               gp success_rate
    ## 1           both         0.90
    ## 2 exercise alone         0.02
    ## 3    ifast alone         0.80

For Population A, exercise alone has a 2% success rate, intermitting
fasting an 80% success rate, and both together have a 90% success rate.

There is also another population, Population B, that has what you might
call a “stickier” metabolism. For them, intermittent fasting is not
quite as effective.

``` r
popB = data.table::rbindlist(list(
  generate_samples(ifasting=0, exercise=1, total=100, successes=1, "B"),
  generate_samples(ifasting=1, exercise=0, total=100, successes=40, "B"),
  generate_samples(ifasting=1, exercise=1, total=200, successes=100, "B")
))

# model just on population B
mB = glm(success ~ ifasting + exercise, data=popB, family=binomial)
summary(mB)
```

    ## 
    ## Call:
    ## glm(formula = success ~ ifasting + exercise, family = binomial, 
    ##     data = popB)
    ## 
    ## Coefficients:
    ##             Estimate Std. Error z value Pr(>|z|)    
    ## (Intercept)  -5.0006     1.0353  -4.830 1.36e-06 ***
    ## ifasting      4.5951     1.0149   4.528 5.97e-06 ***
    ## exercise      0.4055     0.2483   1.633    0.103    
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 519.18  on 399  degrees of freedom
    ## Residual deviance: 423.06  on 397  degrees of freedom
    ## AIC: 429.06
    ## 
    ## Number of Fisher Scoring iterations: 7

``` r
testdata$predictB = predict(mB, newdata=testdata, type="response")
testdata
```

    ##   ifasting exercise    predictA    predictB
    ## 1        0        0 0.008988764 0.006688963
    ## 2        0        1 0.020000000 0.010000000
    ## 3        1        0 0.800000000 0.400000000
    ## 4        1        1 0.900000000 0.500000000

For Population B, the coefficients for `ifasting` and `exercise` are
still positive, but smaller, and the success rates are lower.

Now what happens if we model both populations together?

``` r
popAll = data.table::rbindlist(list(popA, popB))
mAll = glm(success ~ ifasting + exercise, data=popAll, family=binomial)
summary(mAll)
```

    ## 
    ## Call:
    ## glm(formula = success ~ ifasting + exercise, family = binomial, 
    ##     data = popAll)
    ## 
    ## Coefficients:
    ##             Estimate Std. Error z value Pr(>|z|)    
    ## (Intercept)  -4.0380     0.6062  -6.661 2.72e-11 ***
    ## ifasting      4.7311     0.5937   7.969 1.60e-15 ***
    ## exercise     -0.1466     0.1713  -0.856    0.392    
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 1108.79  on 799  degrees of freedom
    ## Residual deviance:  807.36  on 797  degrees of freedom
    ## AIC: 813.36
    ## 
    ## Number of Fisher Scoring iterations: 6

Now exercise has a negative coefficient, making it appear that
intermittent fasting and exercise together has *worse* outcomes than
intermittent fasting alone!

``` r
testdata$predictAll = predict(mAll, newdata=testdata, type="response")
testdata
```

    ##   ifasting exercise    predictA    predictB predictAll
    ## 1        0        0 0.008988764 0.006688963 0.01732739
    ## 2        0        1 0.020000000 0.010000000 0.01500000
    ## 3        1        0 0.800000000 0.400000000 0.66666667
    ## 4        1        1 0.900000000 0.500000000 0.63333333

This is an example how Simpson’s paradox might manifest itself in a
logistic regression model, and it’s due to the unmodelled confounding
variable–population type–plus some bad luck in the relative sizes of the
treatment groups with respect to that variable.

Simpson’s paradox isn’t the only reason for a coefficient with an
unexpected sign; this can also happen when the data is [separated or
quasi-separated](https://stats.oarc.ucla.edu/other/mult-pkg/faq/general/faqwhat-is-complete-or-quasi-complete-separation-in-logistic-regression-and-what-are-some-strategies-to-deal-with-the-issue/).
In our case, this would happen if any of the treatment groups perfectly
predicted outcome (that is, if any treatment group completely succeeded
or completely failed). Let’s check for that.

``` r
popAll |> 
  mutate(gp = ifelse(ifasting & exercise, 'both',
                     ifelse(ifasting, 'ifast alone', 'exercise alone'))) |>
  group_by(gp) |>
  summarize(success_rate = mean(success))
```

    ##               gp success_rate
    ## 1           both    0.6333333
    ## 2 exercise alone    0.0150000
    ## 3    ifast alone    0.6666667

So separation isn’t the problem; the unmodelled confounding variable is.

If the researchers did have access to the subjects’ population type,
then they could control for that in the modelling.

``` r
mAllplus = glm(success ~ ifasting + exercise + label, data=popAll, family=binomial)
summary(mAllplus)
```

    ## 
    ## Call:
    ## glm(formula = success ~ ifasting + exercise + label, family = binomial, 
    ##     data = popAll)
    ## 
    ## Coefficients:
    ##             Estimate Std. Error z value Pr(>|z|)    
    ## (Intercept)  -4.1433     0.6156  -6.731 1.69e-11 ***
    ## ifasting      5.5836     0.6154   9.073  < 2e-16 ***
    ## exercise      0.5231     0.2037   2.568   0.0102 *  
    ## labelB       -1.9172     0.2103  -9.118  < 2e-16 ***
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 1108.79  on 799  degrees of freedom
    ## Residual deviance:  709.51  on 796  degrees of freedom
    ## AIC: 717.51
    ## 
    ## Number of Fisher Scoring iterations: 7

As expected, both `ifasting` and `exercise` now have positive (and
significant, to p=0.05) coefficients, indicating that both actions
increase the probability of weight loss, and doing them both increases
it even more.

The model also correctly identifies that subjects of population type B
have a (significantly) lower success rate that subjects from Population
A.
