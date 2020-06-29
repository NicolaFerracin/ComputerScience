# Assignment

Write a script (contained in `JackAnalyzer`) to turn `Jack` programms into `vm` files.

This is the second step of the compilation from `Jack` to `VM` code.

The whole compiler is as follow:
`Jack program -> Jack compiler -> VM code`

And the Jack compiler is as follow:
`Tokenizer -> Parser -> Code generator`

This assignment focuses on the second step of the compilation, completing the full translation from Jack code to VM code.

Step 1 can be found [here](../10/README.md).

## Usage

- You can pass single Jack files:

`node ./JackAnalyzer/index.js ./ArrayTest/Main.jack` will create `./ArrayTest/Main.vm`.

- You can pass a folder containing Jack files:

`node ./JackAnalyzer/index.js ./ArrayTest` (where `./ArrayTest` contains `Main.jack` and `Game.jack`) will create `./ArrayTest/Main.vm` and `./ArrayTest/Game.vm`.

## Tests

Given `.jack` files use the script to turn them into `.vm` files and run the resulting VM program with the VMEmulator.
