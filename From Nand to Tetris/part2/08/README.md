# Assignment

Extends the `VMTranslator` from [module 7](../07/README.md).

The extension includes:

- handling directories with multiple files instead of single files only
- handling `function`, `call`, `return` commands
- handling branching commands (`label`, `goto`, `if-goto`)

## Usage

- `node VMTranslator.js ./path/to/file.vm` will create `./path/to/file.asm`.
- `node VMTranslator.js ./path/to/directory` will create `./path/to/directory.asm`.

## Tests

Given `.vm` files or directories including `.vm` dfiles, use the script to turn them into `.asm` files and run them against provided tests.
