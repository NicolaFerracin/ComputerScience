# Week 5

## Single Variable Inequalities

To help solving single variable inequalities you can use:

- Additive Principle
- Multiplicative Principle
- Product Principle
- Complementarity Principle

## Additive Principle

Given `f(x) ≤ g(x)`, you can add/subtract `h(x)` to both terms:
`f(x) ± h(x) ≤ g(x) ± h(x)`

## Multiplicative Principle

Given `f(x) ≤ g(x)` you can multiply by a non-zero value `h(x)`:

- `h(x) > 0` => `f(x) * h(x) ≤ g(x) * h(x)`
- `h(x) < 0` => reverse the equality => `f(x) * h(x) ≥ g(x) * h(x)`

## Product Principle

Fact: if `f*g < 0` then either `f < 0 && g > 0` or `f > 0 && g < 0`

Example:

```
(x - 4)(x - 1) > 0
-> x - 4 > 0
-> x - 1 > 0
```

It's either `x > 4 && x > 1` => `x > 4`  
Or `x < 4 && x < 1` => `x < 1`

## Complementarity Principle

Given `S` the solution set of `f(x) ≤ g(x)` in domain `D`, then the solution of `f(x) > g(x)` is simply `D / S`.

## Polynomial Inequalities

Given `ax^2 + bx + x ≤ 0`

- calculate the discriminant (delta)
- if `delta > 0` => there are 2 roots (r1, r2) so `S = [ r1, r2 ]`
- if `delta < 0` => there are 0 roots so `S = { empty }`
- if `delta = 0` => there is 1 root so `S = { - b / 2a }`

## Inequalities with One Radical

### With < or ≤

`√f(x) < g(x)` can be squared both sides so that `f(x) < g(x)ˆ2` with the additional condition that `g(x) > 0`.

```
√f(x) <≤ g(x)
```

equals set
```
f(x) <≤ g(x)ˆ2
g(x) >≥ 0
```

`g(x)` being positive is a restriction, making the solution set smaller.

### With > or ≥

```
√f(x) >≥ g(x)
```

equals set
```
f(x) >≥ g(x)ˆ2
OR g(x) <≤ 0
```

`g(x)` being positive is additional, making the solution set bigger.

## Inequalities with Absolute Values

### With <
Recall that if `|a| < r` is equivalent to say that `-r < a < r`, which is two inequalities:
1. `-r < a`
2. AND `a < r`

Hence for any inequality such as `|f(x)| < g(x)`, can be expressed as 2 separate inequalities without any absolute value:
```
-g(x) < f(x)
AND
f(x) < g(x)
```

### With >

A similar logic applies here: for any `|a| > r` then:
1. `a < -r`
2. OR `a > r`

Then for `|f(x)| > g(x)`:
```
f(x) < -g(x)
OR
f(x) > g(x)
```

## Lines in the plane

Recall that affine functions have the form of `y = mx + b` and they represent straight lines on the plane.

To determine the slope `m` of a given line:
- take 2 points on the line
- `m = delta(y) / delta(x)`

The `y-intercept` is where the line crosses `y`.

To find if 2 lines are parallel, you need to check if the `determinant = 0`:
```
line1: ax + by = p
line2: cx + dy = q
determinant: ad - bc
```

## Systems of Linear Inequalities




