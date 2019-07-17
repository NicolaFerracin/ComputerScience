const { SYMBOL_TYPES } = require('./utils');

class SymbolTable {
  constructor() {
    this.classTable = {};
    this.subroutineTable = {};
    this.counter = {
      [SYMBOL_TYPES.STATIC]: 0,
      [SYMBOL_TYPES.FIELD]: 0,
      [SYMBOL_TYPES.ARG]: 0,
      [SYMBOL_TYPES.VAR]: 0
    };
  }

  startSubroutine() {
    this.subroutineTable = {};
    this.counter[SYMBOL_TYPES.VAR] = 0;
    this.counter[SYMBOL_TYPES.ARG] = 0;
  }

  define(name, type, kind) {
    // STATIC and FIELD belong to classTable
    // ARG and VAR belong to subroutineTable
    if (kind === SYMBOL_TYPES.STATIC || kind === SYMBOL_TYPES.FIELD) {
      this.classTable[name] = {
        type,
        kind,
        index: this.counter[kind]
      };
      this.counter[kind]++;
    } else if (kind === SYMBOL_TYPES.ARG || kind === SYMBOL_TYPES.VAR) {
      this.subroutineTable[name] = {
        type,
        kind,
        index: this.counter[kind]
      };
      this.counter[kind]++;
    }
  }

  varCount(kind) {
    return this.counter[kind];
  }

  kindOf(name) {
    const symbol = this.subroutineTable[name] || this.classTable[name];
    if (symbol) {
      if (symbol.kind === SYMBOL_TYPES.ARG) return 'argument';
      if (symbol.kind === SYMBOL_TYPES.VAR) return 'local';
      if (symbol.kind === SYMBOL_TYPES.FIELD) return 'this';
      return symbol.kind;
    }
    return undefined;
  }

  typeOf(name) {
    const symbol = this.subroutineTable[name] || this.classTable[name];
    if (symbol) {
      return symbol.type;
    }
    return undefined;
  }

  indexOf(name) {
    const symbol = this.subroutineTable[name] || this.classTable[name];
    if (symbol) {
      return symbol.index;
    }
    return undefined;
  }
}

module.exports = SymbolTable;
