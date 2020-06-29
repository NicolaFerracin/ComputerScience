const fs = require('fs');

class VMWriter {
  constructor(file) {
    this.output = fs.createWriteStream(file);
  }

  write(line) {
    this.output.write(line);
    this.output.write('\r\n');
  }

  writePush(segment, index) {
    if (segment) {
      this.write(`push ${segment} ${index}`);
    } else {
      this.write(`push ${index}`);
    }
  }

  writePop(segment, index) {
    this.write(`pop ${segment} ${index}`);
  }

  writeArithmetic(command) {
    this.write(command);
  }

  writeLabel(label) {
    this.write(`label ${label}`);
  }

  writeGoTo(label) {
    this.write(`goto ${label}`);
  }

  writeIf(label) {
    this.write(`if-goto ${label}`);
  }

  writeCall(name, nArgs) {
    this.write(`call ${name} ${nArgs}`);
  }

  writeFunction(name, nLocals) {
    this.write(`function ${name} ${nLocals}`);
  }

  writeReturn() {
    this.write('return');
  }

  close() {
    this.output.end();
  }
}

module.exports = VMWriter;
