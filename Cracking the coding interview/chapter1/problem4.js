// Palindrome Permutation: Given a string, write a function to check if it is a permutation of a palindrome.
// A palindrome is a word or phrase that is the same forwards and backwards. A permutation
// is a rea rrangement of letters. The palindrome does not need to be limited to just dictionary words.
// EXAMPLE
// Input: Tact Coa
// Output: True (permutations: "taco cat". "atco cta". etc.)

Set.prototype.setOrRemove = function(el) {
  if (this.has(el)) {
    this.delete(el);
  } else {
    this.add(el);
  }
};

// Time: O(n)
// Space: O(n)
const isPalindromeOfPermutation = string => {
  const set = new Set();
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    const letter = string[i];
    if (letter.match(/\w/g)) {
      count++;
      set.setOrRemove(letter);
    }
  }
  return count % 2 === 0 ? set.size === 0 : set.size === 1;
};

console.log(isPalindromeOfPermutation(' ') === true);
console.log(isPalindromeOfPermutation('   ') === true);
console.log(isPalindromeOfPermutation('aabb') === true);
console.log(isPalindromeOfPermutation('ab a b') === true);
console.log(isPalindromeOfPermutation(' a b a b ') === true);
console.log(isPalindromeOfPermutation('sasadfgsadfghjk;hjk;sadfghjk;dfghjk;') === true);
console.log(isPalindromeOfPermutation('sa sadfgsadfgh jk;hjkz;sadfg hjk;dfghjk;') === true);
console.log(isPalindromeOfPermutation('abcadef') === false);
console.log(isPalindromeOfPermutation('1234567890') === false);
console.log(isPalindromeOfPermutation('a b') === false);
