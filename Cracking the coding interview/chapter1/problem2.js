// Check Permutation: Given two strings, write a method to decide if one is a permutation of the other.

// Time: O(n)
// Space: O(n)
const isPermutation = (a, b) => {
  if (a.length !== b.length) return false;

  const map = new Map();

  for (let i = 0; i < a.length; i++) {
    map.set(a[i], map.get(a[i]) + 1 || 1);
  }

  for (let i = 0; i < b.length; i++) {
    const count = map.get(b[i]);
    if (!count) {
      return false;
    }
    if (count === 1) {
      map.delete(b[i]);
    } else {
      map.set(b[i], count - 1);
    }
  }
  return map.size === 0;
};

console.log(isPermutation('', '') === true);
console.log(isPermutation(' ', ' ') === true);
console.log(isPermutation(' ', '  ') === false);
console.log(isPermutation('  ', ' ') === false);
console.log(isPermutation('abc', 'cba') === true);
console.log(isPermutation('aa', 'aaa') === false);
console.log(isPermutation('aa', 'aa') === true);
console.log(isPermutation('aa', 'bb') === false);
console.log(isPermutation('1234567890', '2840639157') === true);
console.log(isPermutation('abcdefghi', 'ihgfedcba') === true);
console.log(isPermutation('1a1', 'a11') === true);
console.log(isPermutation('1234567812345678', '8877665544332211') === true);
console.log(isPermutation('icarraci', 'carcarii') === true);
console.log(isPermutation('abcdefghiz', 'ihgfedcbaa') === false);
console.log(isPermutation('1a1', '11') === false);
console.log(isPermutation('1122334455667788', '9911223344556677') === false);
console.log(isPermutation('45678', '1239') === false);
