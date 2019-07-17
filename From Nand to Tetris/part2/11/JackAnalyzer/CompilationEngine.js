const JackTokenizer = require('./JackTokenizer');
const VMWriter = require('./VMWriter');
const SymbolTable = require('./SymbolTable');
const Utils = require('./Utils');

class CompilationEngine {
  constructor(file) {
    this.tokenizer = new JackTokenizer(file);
    this.vmWriter = new VMWriter(file.replace('.jack', '.vm'));
    this.symbolTable = new SymbolTable();

    this.identation = 0;
    this.currentToken = this.tokenizer.getCurrentToken();

    this.className = '';
    this.ifCounter = 0;
    this.whileCounter = 0;

    this.compileClass();

    this.vmWriter.close();
  }

  compileClass() {
    // 'class' classnbame '{' classVarDec* subroutineDec* '}')
    this.eat('class');

    this.className = this.eat(Utils.identifierRegExp)[0];

    this.eat('{');

    while (this.peek().match(/static|field/)) {
      this.compileClassVarDec();
    }
    while (this.peek().match(Utils.subroutineDecRegExp)) {
      this.ifCounter = 0;
      this.whileCounter = 0;
      this.symbolTable.startSubroutine();
      this.compileSubroutineDec();
    }
    this.eat('}');

    return;
  }

  compileClassVarDec() {
    // ('static'|'field') type varName (',' varName)* ';'
    const kind = this.peek();
    this.eat(/static|field/);

    const type = this.peek();
    this.compileType();

    let name = this.peek();
    this.eat(Utils.identifierRegExp);

    this.symbolTable.define(name, type, kind);

    while (this.peek() === ',') {
      this.eat(',');

      name = this.peek();
      this.eat(Utils.identifierRegExp);

      this.symbolTable.define(name, type, kind);
    }

    this.eat(';');
    return;
  }

  compileSubroutineDec() {
    // (constructor|function|method) (void|type) subRoutineName '(' parameterList ')' subRoutineBody
    const identifier = this.peek();
    this.eat(/constructor|function|method/);

    if (this.peek() === 'void') {
      this.eat('void');
    } else {
      this.compileType();
    }

    if (identifier === 'method') {
      this.symbolTable.define('this', this.className, Utils.SYMBOL_TYPES.ARG);
    }

    const name = this.peek();
    this.eat(Utils.identifierRegExp);
    this.eat(/\(/g);
    this.compileParameterList();
    this.eat(/\)/g);

    this.compileSubroutineBody(name, identifier);
    return;
  }

  compileType() {
    // int|char|boolean|className
    const type = this.peek();
    if (this.peek().match(/int|char|boolean/)) {
      this.eat(/int|char|boolean/);
    } else {
      this.eat(Utils.identifierRegExp);
    }
    return type;
  }

  compileParameterList() {
    // ((type varName) (',' type varName)*)?
    const re = Utils.typeRegExp;

    if (this.peek().match(re)) {
      let type = this.compileType();
      let name = this.peek();
      this.eat(Utils.identifierRegExp);

      this.symbolTable.define(name, type, Utils.SYMBOL_TYPES.ARG);

      let nextToken = this.peek();
      while (nextToken === ',') {
        this.eat(',');
        type = this.compileType();

        name = this.peek();
        this.eat(Utils.identifierRegExp);

        this.symbolTable.define(name, type, Utils.SYMBOL_TYPES.ARG);

        nextToken = this.peek();
      }
    }
    return;
  }

  compileSubroutineBody(name, identifier) {
    // { varDec* statements }
    this.eat('{');

    while (this.peek() === Utils.SYMBOL_TYPES.VAR) {
      this.compileVarDec();
    }

    this.vmWriter.writeFunction(`${this.className}.${name}`, this.symbolTable.varCount('var'));
    if (identifier === 'constructor') {
      const params = this.symbolTable.varCount(Utils.SYMBOL_TYPES.FIELD);
      if (params) {
        this.vmWriter.writePush('constant', params);
      }
      this.vmWriter.writeCall('Memory.alloc', 1);
      this.vmWriter.writePop('pointer', 0);
    } else if (identifier === 'method') {
      this.vmWriter.writePush('argument', 0);
      this.vmWriter.writePop('pointer', 0);
    }

    this.compileStatements();
    this.eat('}');

    return;
  }

  compileVarDec() {
    // 'var' type varName (',' varName)* ';'
    const kind = this.peek();
    this.eat('var');

    const type = this.compileType();

    let name = this.peek();
    this.eat(Utils.identifierRegExp);

    this.symbolTable.define(name, type, kind);
    while (this.peek() === ',') {
      this.eat(',');
      name = this.peek();
      this.symbolTable.define(name, type, kind);
      this.eat(Utils.identifierRegExp);
    }

    this.eat(';');
    return;
  }

  compileStatements() {
    // letStatemtn | ifStatment | whileStatement | doStatement | returnStatement
    let next = this.peek();
    while (next.match(Utils.statementsRegExp)) {
      if (next === 'let') {
        this.compileLet();
      } else if (next === 'if') {
        this.compileIf();
      } else if (next === 'while') {
        this.compileWhile();
      } else if (next === 'do') {
        this.compileDo();
      } else if (next === 'return') {
        this.compileReturn();
      }
      next = this.peek();
    }
    return;
  }

  compileLet() {
    // 'let' varName ('[' expression ']')? '=' expression ';'
    this.eat('let');
    const kind = this.symbolTable.kindOf(this.peek());
    const index = this.symbolTable.indexOf(this.peek());
    this.eat(Utils.identifierRegExp);
    let isArray = false;
    if (this.peek() === '[') {
      // array access
      isArray = true;
      this.vmWriter.writePush(kind, index);
      this.eat(/\[/);
      this.compileExpression();
      this.vmWriter.writeArithmetic('add');
      this.eat(/\]/);
    }
    this.eat('=');
    this.compileExpression();
    this.eat(';');
    if (isArray) {
      this.vmWriter.writePop('temp', 0);
      this.vmWriter.writePop('pointer', 1);
      this.vmWriter.writePush('temp', 0);
      this.vmWriter.writePop('that', 0);
    } else {
      this.vmWriter.writePop(kind, index);
    }
    return;
  }

  compileIf() {
    // 'if' '(' expression ')' '{' statements '}' ('else' '{' statements '}')?
    const counter = this.ifCounter;
    const labelTrue = `IF_TRUE${counter}`;
    const labelFalse = `IF_FALSE${counter}`;
    this.ifCounter++;
    this.eat('if');
    this.eat(/\(/);
    this.compileExpression();
    this.vmWriter.writeIf(labelTrue);
    this.vmWriter.writeGoTo(labelFalse);
    this.vmWriter.writeLabel(labelTrue);
    this.eat(/\)/);

    this.eat(/\{/);
    this.compileStatements();
    this.eat(/\}/);

    if (this.peek() === 'else') {
      const labelEnd = `IF_END${counter}`;
      this.vmWriter.writeGoTo(labelEnd);
      this.vmWriter.writeLabel(labelFalse);
      this.eat('else');
      this.eat(/\{/);
      this.compileStatements();
      this.eat(/\}/);
      this.vmWriter.writeLabel(labelEnd);
    } else {
      this.vmWriter.writeLabel(labelFalse);
    }

    return;
  }

  compileWhile() {
    // 'while' '(' expression ')' '{' statements '}'
    const counter = this.whileCounter;
    this.whileCounter++;
    const whileLabel = `WHILE_${counter}`;
    const whileLabelEnd = `WHILE_END${counter}`;
    this.vmWriter.writeLabel(whileLabel);
    this.eat('while');
    this.eat(/\(/);
    this.compileExpression();
    this.eat(/\)/);
    this.vmWriter.writeArithmetic('not');
    this.vmWriter.writeIf(whileLabelEnd);

    this.eat(/\{/);
    this.compileStatements();
    this.eat(/\}/);

    this.vmWriter.writeGoTo(whileLabel);
    this.vmWriter.writeLabel(whileLabelEnd);

    return;
  }

  compileDo() {
    // 'do' subroutineCall ';'
    this.eat('do');
    this.compileSubroutineCall();
    this.eat(';');
    // do statements call void methods. We need to pop temp
    this.vmWriter.writePop('temp', 0);
    return;
  }

  compileReturn() {
    // 'return' expression? ';'
    this.eat('return');
    if (this.peek().match(Utils.termRegExp)) {
      this.compileExpression();
    } else {
      this.vmWriter.writePush('constant', 0);
    }
    this.eat(';');

    this.vmWriter.writeReturn();
  }

  compileExpressionList() {
    // (expression (',' expression)*)?
    const list = [];
    if (this.peek().match(Utils.termRegExp)) {
      list.push(this.peek());
      this.compileExpression();
      while (this.peek() === ',') {
        this.eat(',');
        list.push(this.peek());
        this.compileExpression();
      }
    }
    return list;
  }

  compileExpression() {
    // term (op term)*
    this.compileTerm();
    while (this.peek().match(Utils.opRegExp)) {
      const token = this.peek();
      this.eat(Utils.opRegExp);
      this.compileTerm();
      this.compileOp(token);
    }
    return;
  }

  compileTerm() {
    // integerConstant | stringConst | keywordConst | varName | varname '[' expression ']' | subRoutineCall | '(' expression ')' | unaryOp term
    const currentToken = this.peek();
    const nextToken = this.peekAhead();
    if (currentToken.match(/^(?!.*").*\d.*/)) {
      this.vmWriter.writePush('constant', currentToken.match(/\d+/));
      this.eat(/\d+/);
    } else if (currentToken.match(/".+"/)) {
      const length = currentToken.length - 2;
      this.vmWriter.writePush('constant', length);
      this.vmWriter.writeCall('String.new', 1);
      for (let i = 1; i < length + 1; i++) {
        this.vmWriter.writePush('constant', currentToken[i].charCodeAt());
        this.vmWriter.writeCall('String.appendChar', 2);
      }
      this.eat(/(?<=").+(?=")/g);
    } else if (currentToken.match(/true|false|null|this/)) {
      if (currentToken === 'this') {
        this.vmWriter.writePush('pointer', 0);
      } else if (currentToken === 'true') {
        this.vmWriter.writePush('constant', 1);
        this.vmWriter.writeArithmetic('neg');
      } else {
        this.vmWriter.writePush('constant', 0);
      }
      this.eat(/true|false|null|this/);
    } else if (currentToken.match(Utils.identifierRegExp) && !nextToken.match(/\(|\./)) {
      // varName and subroutineCall share the same regex so we need to look father ahead
      const kind = this.symbolTable.kindOf(currentToken);
      const index = this.symbolTable.indexOf(currentToken);
      this.vmWriter.writePush(kind, index);
      this.eat(Utils.identifierRegExp);
      if (this.peek().match(/\[/)) {
        // array access
        this.eat(/\[/);
        this.compileExpression();
        this.eat(/\]/);
        this.vmWriter.writeArithmetic('add');
        this.vmWriter.writePop('pointer', 1);
        this.vmWriter.writePush('that', 0);
      }
    } else if (currentToken.match(Utils.identifierRegExp) && nextToken.match(/\(|\./)) {
      this.compileSubroutineCall();
    } else if (currentToken.match(/\(/)) {
      this.eat(/\(/);
      this.compileExpression();
      this.eat(/\)/);
    } else if (currentToken.match(/~|-/)) {
      this.eat(/~|-/);
      this.compileTerm();
      if (currentToken === '~') {
        this.vmWriter.writeArithmetic('not');
      } else if (currentToken === '-') {
        this.vmWriter.writeArithmetic('neg');
      }
    }
    return;
  }

  compileOp(token) {
    // +|-|*|/|&|||<|>|=
    if (token === '+') {
      this.vmWriter.writeArithmetic('add');
    } else if (token === '-') {
      this.vmWriter.writeArithmetic('sub');
    } else if (token === '*') {
      this.vmWriter.writeCall('Math.multiply', 2);
    } else if (token === '/') {
      this.vmWriter.writeCall('Math.divide', 2);
    } else if (token === '&') {
      this.vmWriter.writeArithmetic('and');
    } else if (token === '|') {
      this.vmWriter.writeArithmetic('or');
    } else if (token === '<') {
      this.vmWriter.writeArithmetic('lt');
    } else if (token === '>') {
      this.vmWriter.writeArithmetic('gt');
    } else if (token === '=') {
      this.vmWriter.writeArithmetic('eq');
    }
    return;
  }

  compileSubroutineCall() {
    // subroutineName '(' expressionList ')'| (classname|varName) '.' subroutineName '(' expressionList ')'
    let name = this.peek();
    let fullName = null;
    let isClassMethod = false;

    this.eat(Utils.identifierRegExp);
    if (this.peek() === '.') {
      this.eat(/\./);
      const method = this.peek();
      if (name.match(/^[A-Z].*/)) {
        // we are calling a method of the class
        fullName = `${name}.${method}`;
      } else {
        // we are calling a method on a variable
        // => retrieve the variable type and call the method on it
        fullName = `${this.symbolTable.typeOf(name)}.${method}`;
        // and push address
        const kind = this.symbolTable.kindOf(name);
        this.vmWriter.writePush(kind, this.symbolTable.indexOf(name));
      }
      this.eat(Utils.identifierRegExp);
    } else {
      this.vmWriter.writePush('pointer', 0);
      isClassMethod = true;
      fullName = `${this.className}.${name}`;
    }
    this.eat(/\(/);
    const list = this.compileExpressionList();
    // consider 'this' when a class
    const paramsLength = (this.symbolTable.typeOf(name) || isClassMethod ? 1 : 0) + list.length;
    if (fullName) {
      this.vmWriter.writeCall(fullName, paramsLength);
    }
    this.eat(/\)/);
  }

  eat(token) {
    const currentToken = this.tokenizer.getCurrentToken();
    const re = new RegExp(token);
    if (currentToken.match(re)) {
      this.tokenizer.advance();
      return currentToken.match(re);
    } else {
      this.throw(token, currentToken);
    }
  }

  peek() {
    return this.tokenizer.getCurrentToken();
  }

  peekAhead() {
    return this.tokenizer.getNextToken();
  }

  throw(expected, actual) {
    throw new Error(`Expected "${expected}" but found "${actual}" instead.`);
  }
}

module.exports = CompilationEngine;
