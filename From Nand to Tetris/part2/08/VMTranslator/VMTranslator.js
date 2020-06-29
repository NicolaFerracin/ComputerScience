const fs = require('fs');
const Parser = require('./Parser');
const CodeWriter = require('./CodeWriter');

class VMTranslator {
  constructor(fileOrDir) {
    let files = [fileOrDir];
    let newFile = '';
    let isDir = false;

    if (fs.existsSync(fileOrDir) && fs.lstatSync(fileOrDir).isDirectory()) {
      isDir = true;
      files = fs.readdirSync(fileOrDir).map(file => `${fileOrDir}/${file}`);
      const parts = fileOrDir.split('/');
      newFile = `${fileOrDir}/${parts.pop()}`;
    } else {
      const parts = fileOrDir.split('.');
      parts.splice(parts.length - 1);
      newFile = `${parts.join('.')}`;
    }

    const writer = new CodeWriter(`${newFile}.asm`, isDir);

    files.forEach(file => {
      if (file.indexOf('.vm') < 0) {
        return;
      }

      const fileName = file
        .split('/')
        .pop()
        .split('.')
        .shift();
      const parser = new Parser(fileName);

      let lines = [];
      if (isDir) {
        lines.push('call Sys.init 0');
      }
      lines = [
        ...lines,
        ...fs
          .readFileSync(file, 'utf-8')
          .split('\n')
          .filter(Boolean)
          .map(l => l.trim())
      ];

      lines.forEach(line => {
        const chunk = parser.parseLine(line);
        if (chunk.length) {
          chunk.forEach(data => {
            writer.writeLine(data);
          });
        }
      });
    });

    writer.close();
  }
}

(() => new VMTranslator(process.argv[2]))();
