# Unit 7

## System Safety

3 Areas:

- components failures
- software aspects
- human aspects

## Component Redundancy

Taking the example of a valve: it can fail open or fail close. You can put 2 valves in sequence so that they mitigate the fail open case (both would have to fail open). But then the fail closed case doubled (as if any of the two fails closed, the system fails). The parallel system would work the other way around (better coverage of fail closed, worse coverage of fail open). Putting the two systems together and reconnecting them in the end, would decrease the chances for both close and open failures. But we ended up with a system 4 or more times bigger than the original one. This is component redudancy.

```
// Single valve
-> Valve ->

// In sequence
-> Valve 1 -> Valve 2 ->

// In parallel
   +-> Valve 1 ->
->-+
   +-> Valve 2 ->

// Both sequence and parallel
   +-> Valve 1 -> Valve 2 ->-+
->-+                         +->
   +-> Valve 3 -> Valve 4 ->-+
```
