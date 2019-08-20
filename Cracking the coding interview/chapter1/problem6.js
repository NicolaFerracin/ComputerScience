// String Compression: Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the "compressed" string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a - z).

// EXAMPLE
// Input: aabcccccaaa
// Output: a2b1c5a3

const compress = s => {
  if (!s) {
    // ""|null|undefined
    return s;
  }
  let counter = 1;
  let last = s[0];
  let res = '';
  for (let i = 1; i < s.length; i++) {
    if (s[i] !== last) {
      res += `${last}${counter}`;
      counter = 1;
      last = s[i];
    } else {
      counter++;
    }
  }
  res += `${last}${counter}`;

  return res.length < s.length ? res : s;
};

// test cases taken from https://github.com/careercup/CtCI-6th-Edition-JavaScript-ES2015
[
  [null, null],
  [undefined, undefined],
  ['a', 'a'],
  ['aa', 'aa'],
  ['abc', 'abc'],
  ['aabbcc', 'aabbcc'],
  ['ababababccab', 'ababababccab'],
  ['aabcccccaaa', 'a2b1c5a3'],
  ['aaa', 'a3'],
  ['bbbbbb', 'b6'],
  ['abbbbbbc', 'a1b6c1'],
  ['aaabccc', 'a3b1c3'],
  ['hhellllllllooooo!', 'h2e1l8o5!1'],
  ['woorrrllllddddd', 'w1o2r3l4d5']
].forEach(testCase => {
  console.log('Test input:', testCase[0]);
  console.log(compress(testCase[0]) === testCase[1] ? 'passed' : 'failed');
  console.log('\r');
});
