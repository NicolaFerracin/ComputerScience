// One Away: There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away.
// EXAMPLE
// pale, ple -> true
// pales. pale -> true
// pale. bale -> true
// pale. bake -> false

// input start, end
// check for: hasInsert() + hasRemove() + hasReplace() <= 1

/**
 *
 * Naive implementation, checking for insert/remove/insert singularly.
 * The BigO is the same as the refactored implementation, O(n), but it is ran multiple times
 */
// O(n)
const getInserts = (start, end) => {
  if (end.length !== start.length + 1) {
    return false;
  }

  let i = 0;
  let counter = 0;
  for (let j = 0; j < end.length; j++) {
    const a = start[i];
    const b = end[j];
    if (a !== b) {
      counter++;
    } else {
      i++;
    }
  }
  return counter;
};

// O(n);
const getRemovals = (start, end) => {
  if (start.length !== end.length + 1) {
    return false;
  }

  let j = 0;
  let counter = 0;
  for (let i = 0; i < start.length; i++) {
    const a = start[i];
    const b = end[j];
    if (a !== b) {
      counter++;
    } else {
      j++;
    }
  }
  return counter;
};

// O(n)
const getReplacements = (start, end) => {
  if (start.length !== end.length) {
    return false;
  }
  if (start === end) {
    return false;
  }
  let counter = 0;
  for (let i = 0; i < start.length; i++) {
    const a = start[i];
    const b = end[i];
    if (a !== b) {
      counter++;
    }
  }
  return counter;
};

const isOneAway_naive = (start, end) => {
  // can we assume inputs will be of type string?
  if (typeof start !== 'string' || typeof end !== 'string') {
    return false;
  }

  // can we assume inputs will be always lowercase?
  const x = start.toLowerCase();
  const y = end.toLowerCase();
  if (x.toLowerCase() === y.toLowerCase()) {
    return true;
  }

  if (Math.abs(x.length - y.length) > 1) {
    return false;
  }

  const insert = getInserts(x, y);
  const remove = getRemovals(x, y);
  const replace = getReplacements(x, y);

  return insert + remove + replace < 2;
};

/**
 *
 * Resolve in one single for loop
 */
const isOneAway_refactored = (start, end) => {
  // can we assume inputs will be of type string?
  if (typeof start !== 'string' || typeof end !== 'string') {
    return false;
  }

  // can we assume inputs will be always lowercase?
  const x = start.toLowerCase();
  const y = end.toLowerCase();
  if (x.toLowerCase() === y.toLowerCase()) {
    return true;
  }

  if (Math.abs(x.length - y.length) > 1) {
    return false;
  }

  let counter = 0;
  for (let i = 0, j = 0; i < x.length && j < y.length; i++, j++) {
    if (x[i] !== y[j]) {
      if (counter >= 1) {
        return false;
      }
      if (x.length > y.length) {
        j--;
      }
      if (x.length < y.length) {
        i--;
      }
      counter++;
    }
  }

  return counter <= 1;
};

// test cases taken from https://github.com/careercup/CtCI-6th-Edition-JavaScript-ES2015
[
  ['a1b2c3d4', 'a1b2c3d4', true],
  ['abcdef', 'abcdef', true],
  ['pale', 'ple', true],
  ['pales', 'pale', true],
  ['pale', 'bale', true],
  ['pale', 'pxle', true],
  ['pale', 'pate', true],
  ['pale', 'pald', true],
  ['answers', 'answer', true],
  ['technology', 'etechnology', true],
  ['pale', 'bake', false],
  ['pale', 'pl', false],
  ['paless', 'pale', false],
  ['pale', 'bales', false],
  ['abcdefghiz', 'ihgfedcbaa', false],
  ['1122334455667788', '9911223344556677', false],
  ['45678', '1239', false],
  ['abcd', 'dcba', false]
].forEach(testCase => {
  console.log('Test inputs:', testCase[0], testCase[1]);
  console.log(
    'Naive implementation:',
    isOneAway_naive(testCase[0], testCase[1]) === testCase[2] ? 'passed' : 'failed'
  );
  console.log(
    'Refactored:',
    isOneAway_refactored(testCase[0], testCase[1]) === testCase[2] ? 'passed' : 'failed'
  );
  console.log('\r');
});
