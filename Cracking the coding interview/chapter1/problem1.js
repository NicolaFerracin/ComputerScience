// Is Unique: Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

// Time: O(n)
// Space: O(n)
// With additional data structures
const hasUniqueChars_1 = string => {
  const found = {};
  for (let i = 0; i < string.length; i++) {
    if (found[string[i]]) {
      return false;
    } else {
      found[string[i]] = true;
    }
  }
  return true;
};

// Time: O(n2)
// Space: O(1)
// Without additional data structures
const hasUniqueChars_2 = string => {
  for (let i = 0; i < string.length - 1; i++) {
    for (let j = i + 1; j < string.length; j++) {
      if (string[i] === string[j]) {
        return false;
      }
    }
  }
  return true;
};

// test cases taken from https://github.com/careercup/CtCI-6th-Edition-JavaScript-ES2015
[
  ['abcdefghi', true],
  ['jklpoiuqwerzxcvmnsadf', true],
  ['1234567890', true],
  ['AaBbCcDdeFg1234567890(*&^%$#@!)', true],
  ['abcadef', false],
  ['aaaaaaaaaa', false],
  ['abcdefghijklmnopqrstuvwxyza', false],
  ['1234567890asdklf1', false],
  ['!@#$%^&*()(*#($&#(*$&#*($&#()))))', false]
].forEach(testCase => {
  console.log('Test inputs:', testCase[0], testCase[1]);
  console.log(
    'With additional space:',
    hasUniqueChars_1(testCase[0]) === testCase[1] ? 'passed' : 'failed'
  );
  console.log(
    'Without additional space:',
    hasUniqueChars_2(testCase[0]) === testCase[1] ? 'passed' : 'failed'
  );
  console.log('\r');
});
