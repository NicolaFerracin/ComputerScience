// Zero Matrix: Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to O.

// I: MxN matrix (array of arrays)
// O: MxN matrix (modified in-place)
// C: in-place
// E: empty array - non-valid array

// Time: O(n^2)
// Space: O(1)
const zeroMatrix = m => {
  // handle invalid inputs
  if (!m || !m.length || typeof m[0] !== typeof []) {
    return m;
  }

  const zeroCols = [];
  for (let x = 0; x < m.length; x++) {
    const row = m[x];
    if (row.includes(0)) {
      let lastI = -Infinity;
      while (row.indexOf(0) > lastI) {
        lastI = row.indexOf(0);
        zeroCols.push(lastI);
      }
      zeroCols.push(row.indexOf(0));
      const newRow = new Array(row.length);
      newRow.fill(0);
      m[x] = newRow;
    }
  }

  for (let y = 0; y < zeroCols.length; y++) {
    for (let x = 0; x < m.length; x++) {
      m[x][zeroCols[y]] = 0;
    }
  }

  return m;
};

[
  [null, null],
  [undefined, undefined],
  [[0, 1, 2], [0, 1, 2]],
  [[[1, 1, 1], [1, 1, 0], [1, 1, 1]], [[1, 1, 0], [0, 0, 0], [1, 1, 0]]]
].forEach(testCase => {
  console.log('Test inputs:', testCase[0]);
  console.log(
    JSON.stringify(zeroMatrix(testCase[0])) === JSON.stringify(testCase[1]) ? 'passed' : 'failed'
  );
  console.log('\r');
});
