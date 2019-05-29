// URLify: Write a method to replace all spaces in a string with '%20: You may assume that the string
// has sufficient space at the end to hold the additional characters, and that you are given the "true"
// length of the string. (Note: If implementing in Java, please use a character array so that you can
// perform this operation in place.)
// EXAMPLE
// Input: "Mr John Smith " 13
// Output: "Mr%20J ohn%20Smith"

const urlify_1 = string => {
  const url = string.replace(/\s/g, '%20');
  return url;
};

const urlify_2 = string => {
  let url = string;
  while (url.indexOf(' ') >= 0) {
    url = url.replace(' ', '%20');
  }
  return url;
};

const urlify_3 = string => {
  return string.split(' ').join('%20');
};

[
  'nospaces',
  ' ',
  '   ',
  ' firstSpace',
  'lastSpace ',
  '  surroundedBySpaces  ',
  'middle  spaces',
  ' l o t s   o f   s p a c e ',
  'http://www.google.com/',
  'http://www.google.com/search?q=something really really funny'
].forEach(testCase => {
  console.log(urlify_1(testCase));
  console.log(urlify_2(testCase));
  console.log(urlify_3(testCase));
});
