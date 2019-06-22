const ADD = 'add';
const SUB = 'sub';
const NEG = 'neg';
const EQ = 'eq';
const GT = 'gt';
const LT = 'lt';
const AND = 'and';
const OR = 'or';
const NOT = 'not';

const LCL = 'local';
const ARG = 'argument';
const THIS = 'this';
const THAT = 'that';
const CONST = 'constant';
const STATIC = 'static';
const TEMP = 'temp';
const POINTER = 'pointer';

const POP = 'pop';
const PUSH = 'push';

const RETURN = 'return';
const LABEL = 'label';
const GOTO = 'goto';
const IF_GOTO = 'if-goto';
const FUNCTION = 'function';
const CALL = 'call';

const fnCalls = {};

class Parser {
  constructor(file) {
    this.file = file;
  }

  generateRandomLabel() {
    return Math.random()
      .toString(36)
      .substr(2, 5);
  }

  parseLine(line) {
    const [arg1, arg2, arg3] = line.split(' ');

    if (arg1 === RETURN) {
      return this.parseReturn();
    } else if (arg1 && !arg2 && !arg3) {
      return this.parseArithmetic(arg1);
    } else if (arg1 === POP || arg1 === PUSH) {
      return this.parsePushPop(arg1, arg2, arg3);
    } else if (arg1 === LABEL) {
      return this.parseLabel(arg2);
    } else if (arg1 === GOTO) {
      return this.parseGoTo(arg2);
    } else if (arg1 === IF_GOTO) {
      return this.parseIfGoTo(arg2);
    } else if (arg1 === FUNCTION) {
      return this.parseFunction(arg2, arg3);
    } else if (arg1 === CALL) {
      return this.parseCall(arg2, arg3);
    }
    return [];
  }

  parseReturn() {
    const restoreReg = (name, offset) => [
      '@R15',
      'D=M',
      `@${offset}`,
      'D=D-A',
      'A=D',
      'D=M',
      `@${name}`,
      'M=D'
    ];

    const chunks = [];

    // endFrame = LCL
    chunks.push('@LCL', 'D=M', '@R15', 'M=D');

    // retAddr = *(endFrame - 5)
    chunks.push('@R15', 'D=M', '@5', 'D=D-A', 'A=D', 'D=M', '@R14', 'M=D');

    // *ARG = pop()
    chunks.push(...this.getValueFromSP(), '@ARG', 'A=M', 'M=D');

    // SP = ARG + 1
    chunks.push('@ARG', 'D=M', 'D=D+1', '@SP', 'M=D');

    // restore THAT
    chunks.push(...restoreReg('THAT', 1));

    // restore THIS
    chunks.push(...restoreReg('THIS', 2));

    // restore ARG
    chunks.push(...restoreReg('ARG', 3));

    // restore LCL
    chunks.push(...restoreReg('LCL', 4));

    // jump to retAddr
    chunks.push('@R14', 'A=M', '0;JMP');

    return chunks;
  }

  parseCall(name, nArgs) {
    const pushReg = name => [`@${name}`, 'D=M', ...this.putDToSPAndIncrement()];

    const chunks = [];

    if (fnCalls[name]) {
      fnCalls[name]++;
    } else {
      fnCalls[name] = 1;
    }
    const returnLabel = `${name}$ret.${fnCalls[name]}`;

    // push returnAddr
    chunks.push(`@${returnLabel}`, 'D=A', ...this.putDToSPAndIncrement());

    // push LCL
    chunks.push(...pushReg('LCL'));

    // push ARG
    chunks.push(...pushReg('ARG'));

    // push THIS
    chunks.push(...pushReg('THIS'));

    // push THAT
    chunks.push(...pushReg('THAT'));

    // reposition ARG
    chunks.push('@SP', 'D=M', '@5', 'D=D-A', `@${nArgs}`, 'D=D-A', '@ARG', 'M=D');

    // LCL = SP
    chunks.push('@SP', 'D=M', '@LCL', 'M=D');

    // goto function
    chunks.push(...this.parseGoTo(name));

    // return label
    chunks.push(`(${returnLabel})`);

    return chunks;
  }

  parseFunction(name, nVars) {
    const chunks = [];

    // generate fn label
    chunks.push(`(${name})`);

    // repeat nVars times push 0
    for (let i = 0; i < nVars; i++) {
      chunks.push('D=0', ...this.putDToSPAndIncrement());
    }

    return chunks;
  }

  parseIfGoTo(label) {
    return [...this.getValueFromSP(), `@${label}`, 'D;JNE'];
  }

  parseGoTo(label) {
    return [`@${label}`, '0;JMP'];
  }

  parseLabel(label) {
    return [`(${label})`];
  }

  parseArithmetic(op) {
    const chunk = [];
    if (op === ADD) {
      chunk.push(...this.getValueFromSP(), ...this.decreaseSP(), 'M=D+M');
    } else if (op === SUB) {
      chunk.push(...this.getValueFromSP(), ...this.decreaseSP(), 'M=M-D');
    } else if (op === NEG) {
      chunk.push(...this.decreaseSP(), ...this.putAddressToD(0), ...this.selectSP(), 'M=D-M');
    } else if (op === EQ) {
      chunk.push(...this.getValueFromSP(), ...this.xAndYCompare('JEQ'));
    } else if (op === GT) {
      chunk.push(...this.getValueFromSP(), ...this.xAndYCompare('JGT'));
    } else if (op === LT) {
      chunk.push(...this.getValueFromSP(), ...this.xAndYCompare('JLT'));
    } else if (op === AND) {
      chunk.push(...this.getValueFromSP(), ...this.decreaseSP(), 'D=M&D', 'M=D');
    } else if (op === OR) {
      chunk.push(...this.getValueFromSP(), ...this.decreaseSP(), 'D=M|D', 'M=D');
    } else if (op === NOT) {
      chunk.push(...this.getValueFromSP(), 'D=!D', 'M=D');
    }
    chunk.push(...this.incrementSP());
    return chunk;
  }

  parsePushPop(op, segment, value) {
    const chunk = [];
    if (segment === LCL || segment === ARG || segment === THIS || segment === THAT) {
      chunk.push(...this.parseCommandWithOffset(op, segment, value));
    } else if (segment === CONST) {
      // there is no POP so we assume it's always a PUSH
      chunk.push(...this.putAddressToD(value), ...this.putDToSPAndIncrement());
    } else if (segment === STATIC) {
      chunk.push(...this.getStaticChunk(op, value));
    } else if (segment === TEMP) {
      chunk.push(...this.getTempChunk(op, value));
    } else if (segment === POINTER) {
      chunk.push(...this.getPointerChunk(op, value));
    }
    return chunk;
  }

  parseCommandWithOffset(op, segment, value) {
    const chunk = [];
    const segmentLabel = this.getSegmentLabel(segment);
    if (op === POP) {
      chunk.push(
        // get segment + offset addr
        `@${value}`,
        'D=A',
        `@${segmentLabel}`,
        'D=D+M',
        '@R13',
        'M=D',

        // get value from SP
        ...this.getValueFromSP(),

        // put D to segment addr + offset
        '@R13',
        'A=M',
        'M=D'
      );
    } else if (op === PUSH) {
      chunk.push(
        // get segment + offset addr
        `@${value}`,
        'D=A',
        `@${segmentLabel}`,
        'A=D+M',
        'D=M',

        ...this.putDToSPAndIncrement()
      );
    }
    return chunk;
  }

  getStaticChunk(op, value) {
    const chunk = [];
    if (op === POP) {
      chunk.push(
        // get value from SP
        ...this.getValueFromSP(),

        // put D to static var
        `@${this.file}.${value}`,
        'M=D'
      );
    } else if (op === PUSH) {
      chunk.push(
        // get value from addr
        `@${this.file}.${value}`,
        'D=M',

        ...this.putDToSPAndIncrement()
      );
    }
    return chunk;
  }

  getTempChunk(op, value) {
    const chunk = [];
    if (op === POP) {
      chunk.push(
        // get new address with offset
        '@5',
        'D=A',
        `@${value}`,
        'D=D+A',
        '@R13',
        'M=D',

        // get value from SP
        ...this.getValueFromSP(),

        // put D to segment addr + offset
        '@R13',
        'A=M',
        'M=D'
      );
    } else if (op === PUSH) {
      chunk.push(
        // get segment + offset addr
        '@5',
        'D=A',
        `@${value}`,
        'A=D+A',
        'D=M',

        ...this.putDToSPAndIncrement()
      );
    }
    return chunk;
  }

  getPointerChunk(op, value) {
    const target = +value === 0 ? 'THIS' : 'THAT';
    const chunk = [];
    if (op === POP) {
      chunk.push(
        // get value from SP
        ...this.getValueFromSP(),

        // put D to target
        `@${target}`,
        'M=D'
      );
    } else if (op === PUSH) {
      chunk.push(
        // get value from target
        `@${target}`,
        'D=M',

        ...this.putDToSPAndIncrement()
      );
    }
    return chunk;
  }

  getSegmentLabel(segment) {
    if (segment === LCL) {
      return 'LCL';
    } else if (segment === ARG) {
      return 'ARG';
    } else if (segment === THIS) {
      return 'THIS';
    } else if (segment === THAT) {
      return 'THAT';
    }
  }

  putAddressToD(addr) {
    return [`@${addr}`, 'D=A'];
  }

  selectSP() {
    return ['@SP', 'A=M'];
  }

  getValueFromSP() {
    return [...this.decreaseSP(), ...this.selectSP(), 'D=M'];
  }

  decreaseSP() {
    return ['@SP', 'M=M-1', 'A=M'];
  }

  incrementSP() {
    return ['@SP', 'M=M+1', 'A=M'];
  }

  putDToSPAndIncrement() {
    return [...this.selectSP(), 'M=D', ...this.incrementSP()];
  }

  jumpToLabel(type, label) {
    return [`@${label}`, `D;${type}`];
  }

  setSPToValue(value) {
    return [...this.selectSP(), `M=${value}`];
  }

  jumpToEndOfChunk(label) {
    return [`@${label}`, '0;JMP'];
  }

  xAndYCompare(operation) {
    const label = this.generateRandomLabel();
    const endLabel = this.generateRandomLabel();
    return [
      ...this.decreaseSP(),
      'D=M-D',
      ...this.jumpToLabel(operation, label),
      ...this.setSPToValue(0),
      ...this.jumpToEndOfChunk(endLabel),
      `(${label})`,
      ...this.setSPToValue(-1),
      `(${endLabel})`
    ];
  }
}

module.exports = Parser;
