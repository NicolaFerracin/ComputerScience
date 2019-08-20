// String Rotation: Assume you have a method isSubstring which checks if one word is a substring of another. Given two strings, S1 and S2, write code to check if S2 is a rotation of S1 using only one call to isSubstring (e.g., "waterbottle" is a rotation of"erbottlewat").

// Example:
// Input: "waterbottle", "erbottlewat"
// Output: true

// I: s1 and s2 are strings
// O: boolean
// C:
// E: non-string inputs, empty strings, strings with different lengths

const isSubstring = (s1, s2) => s2.indexOf(s1) >= 0;

const isRotation = (s1, s2) => {
  if (!s1 || !s2 || s1.length !== s2.length) {
    return false;
  }
  const s3 = s2 + s2;
  if (isSubstring(s1, s3)) {
    return s3.substr(s3.indexOf(s1), s1.length) === s1;
  }
  return false;
};

// test cases taken from https://github.com/careercup/CtCI-6th-Edition-JavaScript-ES2015
[
  [null, 'erbottlewat', false],
  ['erbottlewat', undefined, false],
  [null, undefined, false],
  ['', 'asd', false],
  ['abc', 'defg', false],
  ['abcd', 'def', false],
  ['waterbottle', 'erbottlewat', true],
  ['waterbottle', 'erbottlswat', false],
  ['waterbottle', 'erbottleswat', false]
].forEach(testCase => {
  console.log('Test inputs:', testCase[0], testCase[1]);
  console.log(isRotation(testCase[0], testCase[1]) === testCase[2] ? 'passed' : 'failed');
  console.log('\r');
});

const str =
    'a b c d e f g h i j k l m n o p q r s t u v x y z 0 1 2 3 4 5 6 7 8 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
  reverseStr = str
    .split('')
    .reverse()
    .join('');

for (let i = 1; i < str.length; i += 12) {
  const rStr = str.substring(i) + str.substring(0, i);
  console.log('Test inputs:', rStr, str);
  console.log(isRotation(rStr, str) === true ? 'passed' : 'failed');
  console.log('\r');
}

for (let i = 1; i < str.length; i += 12) {
  const rStr = str.substring(i) + reverseStr.substring(0, i);
  console.log('Test inputs:', rStr, str);
  console.log(isRotation(rStr, str) === false ? 'passed' : 'failed');
  console.log('\r');
}
