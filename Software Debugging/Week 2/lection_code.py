import math
import random

def square(x, eps = 10e-7):
    assert x >= 0
    y = math.sqrt(x)
    assert y*y == x
    return y

for i in range(1, 1000):
    r = random.random() * 10000
    z = square(r)

print "done!"

