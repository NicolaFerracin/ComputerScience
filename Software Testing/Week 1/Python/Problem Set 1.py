# CORRECT SPECIFICATION:
#
# the Queue class provides a fixed-size FIFO queue of integers
#
# the constructor takes a single parameter: an integer > 0 that
# is the maximum number of elements the queue can hold.
#
# empty() returns True if and only if the queue currently
# holds no elements, and False otherwise.
#
# full() returns True if and only if the queue cannot hold
# any more elements, and False otherwise.
#
# enqueue(i) attempts to put the integer i into the queue; it returns
# True if successful and False if the queue is full.
#
# dequeue() removes an integer from the queue and returns it,
# or else returns None if the queue is empty.
#
# Example:
# q = Queue(1)
# is_empty = q.empty()
# succeeded = q.enqueue(10)
# is_full = q.full()
# value = q.dequeue()
#
# 1. Should create a Queue q that can only hold 1 element
# 2. Should then check whether q is empty, which should return True
# 3. Should attempt to put 10 into the queue, and return True
# 4. Should check whether q is now full, which should return True
# 5. Should attempt to dequeue and put the result into value, which
#    should be 10
#
# Your test function should run assertion checks and throw an
# AssertionError for each of the 5 incorrect Queues. Pressing
# submit will tell you how many you successfully catch so far.


from queue_test import *


def test():
    ###Your code here.
    # queues 3-4-5
    q = Queue(2)
    assert q.empty() == True
    assert q.full() == False
    assert q.enqueue(5) == True
    assert q.enqueue(6) == True
    assert q.empty() == False
    assert q.full() == True
    assert q.enqueue(22) == False
    assert q.full() == True
    assert q.dequeue() == 5
    assert q.full() == False
    assert q.dequeue() == 6
    assert q.dequeue() == None
    assert q.empty() == True
    assert q.enqueue(-5) == True
    assert q.dequeue() == -5

    # queue 2
    q = Queue(1000)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    q.enqueue(10)
    res = q.enqueue(10)
    assert res is True


test()

