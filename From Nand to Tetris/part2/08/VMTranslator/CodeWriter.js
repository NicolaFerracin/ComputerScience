const fs = require('fs');

class CodeWriter {
  constructor(file, isDir) {
    this.stream = fs.createWriteStream(file);
    if (isDir) {
      this.writeBootstrapCode();
    }
  }

  writeBootstrapCode() {
    this.stream.write('@256');
    this.stream.write('\r\n');
    this.stream.write('D=A');
    this.stream.write('\r\n');
    this.stream.write('@SP');
    this.stream.write('\r\n');
    this.stream.write('M=D');
    this.stream.write('\r\n');
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
