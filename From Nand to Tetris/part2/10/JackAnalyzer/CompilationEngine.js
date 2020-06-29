const fs = require('fs');
const JackTokenizer = require('./JackTokenizer');
const Utils = require('./Utils');

class CompilationEngine {
  constructor(file) {
    this.tokenizer = new JackTokenizer(file);
    this.output = fs.createWriteStream(file.replace('.jack', '.xml'));

    this.identation = 0;
    this.currentToken = this.tokenizer.getCurrentToken();

    this.className = '';

    this.wrap('class', this.compileClass.bind(this));

    this.output.end();
  }

  compileClass() {
    // 'class' classnbame '{' classVarDec* subroutineDec* '}')
    this.wrapValue('keyword', this.eat('class'));

    this.className = this.eat(Utils.identifierRegExp);
    this.wrapValue('identifier', this.className);

    this.wrapValue('symbol', this.eat('{'));

    while (this.peek().match(/static|field/)) {
      this.wrap('classVarDec', this.compileClassVarDec.bind(this));
    }
    while (this.peek().match(Utils.subroutineDecRegExp)) {
      this.wrap('subroutineDec', this.compileSubroutineDec.bind(this));
    }
    this.wrapValue('symbol', this.eat('}'));

    return;
  }

  compileClassVarDec() {
    // ('static'|'field') type varName (',' varName)* ';'
    this.wrapValue('keyword', this.eat(/static|field/));
    this.compileType();
    this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
    while (this.peek() === ',') {
      this.wrapValue('symbol', this.eat(','));
      this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
    }
    this.wrapValue('symbol', this.eat(';'));
    return;
  }

  compileSubroutineDec() {
    // (constructor|function|method) (void|type) subRoutineName '(' parameterList ')' subRoutineBody
    this.wrapValue('keyword', this.eat(/constructor|function|method/));
    if (this.peek() === 'void') {
      this.wrapValue('keyword', this.eat('void'));
    } else {
      this.compileType();
    }
    this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
    this.wrapValue('symbol', this.eat(/\(/g));
    this.wrap('parameterList', this.compileParameterList.bind(this));
    this.wrapValue('symbol', this.eat(/\)/g));
    this.wrap('subroutineBody', this.compileSubroutineBody.bind(this));

    return;
  }

  compileType() {
    // int|char|boolean|className
    if (this.peek().match(/int|char|boolean/)) {
      this.wrapValue('keyword', this.eat(/int|char|boolean/));
    } else {
      this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
    }
    return;
  }

  compileParameterList() {
    // ((type varName) (',' type varName)*)?
    const re = Utils.typeRegExp;
    if (this.peek().match(re)) {
      this.compileType();
      this.wrapValue('identifier', this.eat(Utils.identifierRegExp));

      let nextToken = this.peek();
      while (nextToken === ',') {
        this.wrapValue('symbol', this.eat(','));
        this.compileType();
        this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
        nextToken = this.peek();
      }
    }
    return;
  }

  compileSubroutineBody() {
    // { varDec* statements }
    this.wrapValue('symbol', this.eat('{'));

    while (this.peek() === 'var') {
      this.wrap('varDec', this.compileVarDec.bind(this));
    }

    this.wrap('statements', this.compileStatements.bind(this));

    this.wrapValue('symbol', this.eat('}'));

    return;
  }

  compileVarDec() {
    // 'var' type varName (',' varName)* ';'
    this.wrapValue('keyword', this.eat('var'));
    this.compileType();
    this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
    while (this.peek() === ',') {
      this.wrapValue('symbol', this.eat(','));
      this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
    }
    this.wrapValue('symbol', this.eat(';'));
    return;
  }

  compileStatements() {
    // letStatemtn | ifStatment | whileStatement | doStatement | returnStatement
    let next = this.peek();
    while (next.match(Utils.statementsRegExp)) {
      if (next === 'let') {
        this.wrap('letStatement', this.compileLet.bind(this));
      } else if (next === 'if') {
        this.wrap('ifStatement', this.compileIf.bind(this));
      } else if (next === 'while') {
        this.wrap('whileStatement', this.compileWhile.bind(this));
      } else if (next === 'do') {
        this.wrap('doStatement', this.compileDo.bind(this));
      } else if (next === 'return') {
        this.wrap('returnStatement', this.compileReturn.bind(this));
      }
      next = this.peek();
    }
    return;
  }

  compileLet() {
    // 'let' varName ('[' expression ']')? '=' expression ';'
    this.wrapValue('keyword', this.eat('let'));
    this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
    if (this.peek() === '[') {
      this.wrapValue('symbol', this.eat(/\[/));
      this.wrap('expression', this.compileExpression.bind(this));
      this.wrapValue('symbol', this.eat(/\]/));
    }
    this.wrapValue('symbol', this.eat('='));
    this.wrap('expression', this.compileExpression.bind(this));
    this.wrapValue('symbol', this.eat(';'));
    return;
  }

  compileIf() {
    // 'if' '(' expression ')' '{' statements '}' ('else' '{' statements '}')?
    this.wrapValue('keyword', this.eat('if'));
    this.wrapValue('symbol', this.eat(/\(/));
    this.wrap('expression', this.compileExpression.bind(this));
    this.wrapValue('symbol', this.eat(/\)/));

    this.wrapValue('symbol', this.eat(/\{/));
    this.wrap('statements', this.compileStatements.bind(this));
    this.wrapValue('symbol', this.eat(/\}/));

    if (this.peek() === 'else') {
      this.wrapValue('keyword', this.eat('else'));
      this.wrapValue('symbol', this.eat(/\{/));
      this.wrap('statements', this.compileStatements.bind(this));
      this.wrapValue('symbol', this.eat(/\}/));
    }
    return;
  }

  compileWhile() {
    // 'while' '(' expression ')' '{' statements '}'
    this.wrapValue('keyword', this.eat('while'));
    this.wrapValue('symbol', this.eat(/\(/));
    this.wrap('expression', this.compileExpression.bind(this));
    this.wrapValue('symbol', this.eat(/\)/));

    this.wrapValue('symbol', this.eat(/\{/));
    this.wrap('statements', this.compileStatements.bind(this));
    this.wrapValue('symbol', this.eat(/\}/));
    return;
  }

  compileDo() {
    // 'do' subroutineCall ';'
    this.wrapValue('keyword', this.eat('do'));
    this.compileSubroutineCall();
    this.wrapValue('symbol', this.eat(';'));
    return;
  }

  compileReturn() {
    // 'return' expression? ';'
    this.wrapValue('keyword', this.eat('return'));
    if (this.peek().match(Utils.termRegExp)) {
      this.wrap('expression', this.compileExpression.bind(this));
    }
    this.wrapValue('symbol', this.eat(';'));
  }

  compileExpressionList() {
    // (expression (',' expression)*)?
    if (this.peek().match(Utils.termRegExp)) {
      this.wrap('expression', this.compileExpression.bind(this));
      while (this.peek() === ',') {
        this.wrapValue('symbol', this.eat(','));
        this.wrap('expression', this.compileExpression.bind(this));
      }
    }
    return;
  }

  compileExpression() {
    // term (op term)*
    this.wrap('term', this.compileTerm.bind(this));

    while (this.peek().match(Utils.opRegExp)) {
      this.compileOp();
      this.wrap('term', this.compileTerm.bind(this));
    }
    return;
  }

  compileTerm() {
    // integerConstant | stringConst | keywordConst | varName | varname '[' expression ']' | subRoutineCall | '(' expression ')' | unaryOp term
    const currentToken = this.peek();
    const nextToken = this.peekAhead();
    if (currentToken.match(/\d+/)) {
      this.wrapValue('integerConstant', this.eat(/\d+/));
    } else if (currentToken.match(/".+"/)) {
      this.wrapValue('stringConstant', this.eat(/(?<=").+(?=")/g));
    } else if (currentToken.match(/true|false|null|this/)) {
      this.wrapValue('keyword', this.eat(/true|false|null|this/));
    } else if (currentToken.match(Utils.identifierRegExp) && !nextToken.match(/\(|\./)) {
      // varName and subroutineCall share the same regex so we need to look father ahead
      this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
      if (this.peek().match(/\[/)) {
        this.wrapValue('symbol', this.eat(/\[/));
        this.wrap('expression', this.compileExpression.bind(this));
        this.wrapValue('symbol', this.eat(/\]/));
      }
    } else if (currentToken.match(Utils.identifierRegExp) && nextToken.match(/\(|\./)) {
      this.compileSubroutineCall();
    } else if (currentToken.match(/\(/)) {
      this.wrapValue('symbol', this.eat(/\(/));
      this.wrap('expression', this.compileExpression.bind(this));
      this.wrapValue('symbol', this.eat(/\)/));
    } else if (currentToken.match(/~|-/)) {
      this.wrapValue('symbol', this.eat(/~|-/));
      this.wrap('term', this.compileTerm.bind(this));
    }
    return;
  }

  compileOp() {
    // +|-|*|/|&|||<|>|=
    this.wrapValue('symbol', this.eat(Utils.opRegExp));
    return;
  }

  compileSubroutineCall() {
    // subroutineName '(' expressionList ')'| (classname|varName) '.' subroutineName '(' expressionList ')'

    this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
    if (this.peek() === '.') {
      this.wrapValue('symbol', this.eat(/\./));
      this.wrapValue('identifier', this.eat(Utils.identifierRegExp));
    }
    this.wrapValue('symbol', this.eat(/\(/));
    this.wrap('expressionList', this.compileExpressionList.bind(this));
    this.wrapValue('symbol', this.eat(/\)/));

    return;
  }

  eat(token) {
    const currentToken = this.tokenizer.getCurrentToken();
    const re = new RegExp(token);
    if (currentToken.match(re)) {
      this.tokenizer.advance();
      return currentToken.match(re);
    } else {
      // console.log(`Expected "${token}" but found "${currentToken}" instead.`, this.tokenizer.index);
      this.throw(token, currentToken);
    }
  }

  peek() {
    return this.tokenizer.getCurrentToken();
  }

  peekAhead() {
    return this.tokenizer.getNextToken();
  }

  wrap(tag, cb) {
    this.write(`<${tag}>`);
    this.identation += 2;

    cb();

    this.identation -= 2;
    this.write(`</${tag}>`);
  }

  wrapValue(tag, value) {
    const cleanValue = Object.keys(Utils.entitiesMapping).includes(value[0])
      ? Utils.entitiesMapping[value[0]]
      : value;
    this.write(`<${tag}> ${cleanValue} </${tag}>`);
  }

  write(content) {
    this.output.write(' '.repeat(this.identation));
    this.output.write(content);
    this.output.write('\r\n');
  }

  throw(expected, actual) {
    throw new Error(`Expected "${expected}" but found "${actual}" instead.`);
  }
}

module.exports = CompilationEngine;
