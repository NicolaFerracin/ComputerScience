const fs = require('fs');

const REGEX = /class|constructor|function|method|field|static|var|int|char|boolean|void|true|false|null|this|let|^do|if|else|while|return|\d+|".+"|{|}|\[|\]|\(|\)|\.|,|;|\+|-|\*|\/|&|\||<|>|=|~|[A-Za-z_]\w*/g;

class JackTokenizer {
  constructor(file) {
    this.tokens = this.parseFile(file);
    this.index = 0;
  }

  parseFile(file) {
    return fs
      .readFileSync(file, 'utf-8')
      .split('\n') // create an element for each line
      .map(l => l.trim()) // remove extra spaces
      .map(l => l.replace(/^\s*\*.*|.?\/{2,}.*|\/\*{2,}.*|.*\*\//g, '')) // strip comments
      .filter(Boolean) // remove empty lines
      .reduce((acc, l) => {
        let i;
        const reg = new RegExp(REGEX);
        while ((i = reg.exec(l))) {
          acc.push(i[0]);
        }
        return acc;
      }, []);
  }

  getCurrentToken() {
    return this.tokens[this.index];
  }

  getNextToken() {
    if (this.hasMoreTokens) {
      return this.tokens[this.index + 1];
    }
    return null;
  }

  hasMoreTokens() {
    return this.tokens.length > this.index;
  }

  advance() {
    if (this.hasMoreTokens()) {
      this.index++;
    }
  }
}

module.exports = JackTokenizer;
