# Week 1

## Rules about inequality (<= and >=)

- you can add two inequalities in the same direction:

  ```
  a <= b
  c <= d
  ```

  then `a + c <= b + d`

- you can add an identical number to both sides of the equality `a <= b` then `a + c <= b + c`
- if you have a positive number c, you can multiply the inequality `0 <= c, a <= b` then `ac <= bc` (NOTE: only for positve `c`, otherwise the inequality is reversed)

## Rules about absolute values

- Product `|xy| = |x| |y|`
- Quotient `|x / y| = |x| / |y|` (`y` must not be 0)
- Sum `|x + y| <= |x| + |y|` (triangle inequality)

## Proof by Induction

> Let P(n) denote a proposition whose formulation depends upon a positive integer n.
>
> Suppose that we know the following, for a certain `a ∈ ℕ`:
>
> 1. P(a) is true
> 2. Whenever P(n) is true for some `n >= a`, then P(n + 1) is true
>
> Then it follows that P(n) is true for all n >= a
