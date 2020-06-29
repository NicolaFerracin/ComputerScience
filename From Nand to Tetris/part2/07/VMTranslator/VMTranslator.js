const fs = require('fs');
const Parser = require('./Parser');
const CodeWriter = require('./CodeWriter');

class VMTranslator {
  constructor(file) {
    const fileParts = file.split('.');
    fileParts.splice(fileParts.length - 1);
    const newFile = `${fileParts.join('.')}.asm`;

    const writer = new CodeWriter(newFile);
    const parser = new Parser(
      fileParts
        .join('')
        .split('/')
        .pop()
    );

    require('readline')
      .createInterface({
        input: fs.createReadStream(file)
      })
      .on('line', line => {
        const chunk = parser.parseLine(line);
        if (chunk.length) {
          chunk.forEach(data => {
            writer.writeLine(data);
          });
        }
      })
      .on('close', () => {
        writer.close();
      });
  }
}

(() => new VMTranslator(process.argv[2]))();
