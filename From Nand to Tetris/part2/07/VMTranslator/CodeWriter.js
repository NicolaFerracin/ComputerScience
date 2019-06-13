const fs = require('fs');

class CodeWriter {
  constructor(file) {
    this.stream = fs.createWriteStream(file);
  }

  writeLine(line) {
    this.stream.write(line);
    this.stream.write('\r\n');
  }

  close() {
    this.stream.write('(END)\r\n');
    this.stream.write('@END\r\n');
    this.stream.write('0;JMP\r\n');
    this.stream.end();
  }
}

module.exports = CodeWriter;
