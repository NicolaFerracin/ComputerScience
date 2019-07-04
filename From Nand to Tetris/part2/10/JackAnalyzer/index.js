const fs = require('fs');
const Utils = require('./Utils');
const CompilationEngine = require('./CompilationEngine');
// turn single jack files into .xml files
// can receive a directory as input

class JackAnalyzer {
  constructor(fileOrDir) {
    let files;
    if (fs.existsSync(fileOrDir) && fs.lstatSync(fileOrDir).isDirectory()) {
      files = fs
        .readdirSync(fileOrDir)
        .filter(Utils.isJackFileFilter)
        .map(file => `${fileOrDir}/${file}`);
    } else {
      files = [fileOrDir].filter(Utils.isJackFileFilter);
    }

    files.forEach(file => new CompilationEngine(file));
  }
}

(() => new JackAnalyzer(process.argv[2]))();
