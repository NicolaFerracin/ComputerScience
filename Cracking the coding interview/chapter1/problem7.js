// Rotate Matrix: Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. (an you do this in place?

// Time: O(n^2)
// Space: O(1)
// we assume 'm' contains arrays with the same lenght as 'm' (NxN matrix as per problem description)
const rotate = m => {
  if (!m || !m.length || m.length !== m[0].length) {
    return 'Wrong input';
  }
  const m1 = [];
  for (let i = 0; i < m.length; i++) {
    m1.push(new Array(m.length));
    m1[i].fill(0);
  }

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m.length; j++) {
      const x = j;
      const y = m.length - 1 - i;
      m1[x][y] = m[i][j];
    }
  }

  return m1;
};

// O(n^2)
// O(n)
// we assume 'm' contains arrays with the same lenght as 'm' (NxN matrix as per problem description)
const rotate_inPlace = m => {
  if (!m || !m.length || m.length !== m[0].length) {
    return 'Wrong input';
  }
  const n = m.length;
  for (let x = 0; x < n / 2; x++) {
    for (let y = x; y < n - 1 - x; y++) {
      const temp = m[x][y + x];
      m[x][y + x] = m[n - 1 - x - y][x];
      m[n - 1 - x - y][x] = m[n - 1 - x][n - 1 - x - y];
      m[n - 1 - x][n - 1 - x - y] = m[y + x][n - 1 - x];
      m[y + x][n - 1 - x] = temp;
    }
  }
  return m;
};

[
  [[[1, 1, 1], [2, 2, 2], [3, 3, 3]], [[3, 2, 1], [3, 2, 1], [3, 2, 1]]],
  [
    [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]],
    [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]
  ],
  [[], 'Wrong input'],
  [null, 'Wrong input'],
  [undefined, 'Wrong input'],
  [[0], 'Wrong input'],
  [[[0]], [[0]]]
].forEach(testCase => {
  console.log('Test inputs:', testCase[0]);
  console.log(
    'Not in-place:',
    JSON.stringify(rotate(testCase[0])) === JSON.stringify(testCase[1]) ? 'passed' : 'failed'
  );
  console.log(
    'In-place:',
    JSON.stringify(rotate_inPlace(testCase[0])) === JSON.stringify(testCase[1])
      ? 'passed'
      : 'failed'
  );
  console.log('\r');
});
