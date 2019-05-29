// Is Unique: Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

// Time: O(n)
// Space: O(1)
const hasUniqueChars = string => {
  for (let i = 1; i < string.length; i++) {
    if (string[i] !== string[0]) return false;
  }
  return true;
};

console.log(hasUniqueChars('') === true);
console.log(hasUniqueChars('a') === true);
console.log(hasUniqueChars('  ') === true);
console.log(hasUniqueChars('baaaaax') === false);
console.log(hasUniqueChars('aaaaaab') === false);
console.log(hasUniqueChars('aaabaaa') === false);
console.log(hasUniqueChars('aaa') === true);
console.log(hasUniqueChars('aaaa') === true);
