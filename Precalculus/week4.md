# Week 4

## Systems

Given two points on the plane, find the affine function (effectively a line) that passes through them.

1. Points are `(2, 8)` and `(3, 13)`
2. `f(x)` is of the form `mx + b` (definition of affine function)
3. It means that `f(2) = 8`, resulting in `2m + b = 8`
4. It means that `f(3) - 13`, resulting in `3m + b = 13`
5. We end up with a system of two equations (`2m + b = 8` and `3m + b = 13`) in two unknowns (`m` and `b`)

The Standard Form of a System is when the constants are on the right and the unknowns are in the same order on the left

## Resolve system with the Elimination method

Example:
```
h + 100 = 2(m - 100)  (1)
m + 100 = 3(h - 100)  (2)
```
We first reduce the system to standard form
```
h - 2m = -300                     (1a)
m - 3h = -400 => 3h - m = 400     (2a)
```
Multiply (2a) times 2 so that the `m` is equal
```
h - 2m = -300   (1b)
6h - 2m = 800   (2b)
```
Apply elimination method by subtracting (2b) to (1b)
```
6h - 2m - (h - 2m) = 800 - (-300)
=> 6h - 2m - h + 2m = 800 + 300
=> 5h = 1100
=> h = 220
=> m = 260
```

## Resolve system with the substitution method

Given:
```
h - 2m = -300 (1)
3h - m = 400 (2)
```
1. Find `h` in (1)  
    ```
    h = -300 + 2m
    ```

2. Substitute `h` in (2)  
    ```
    3(-300 + 2m) - m = 400
    -900 + 6m - m = 400
    5m = 1300
    m = 1300 / 5 = 260
    ```
3. Now that we found `m`, replace it back in (1)
    ```
    h = -300 + 2 * 260
    h = 220
    ```

## The Determinant

Given a system *
```
ax + by = p
cx + dy = q
```
The **determinant** of * refers to `ad - bc`

Propostion:
1. if the determinant is non-zero, then the system has a unique solution
2. if the determinant is zero, then the system has either no or infinite solutions
