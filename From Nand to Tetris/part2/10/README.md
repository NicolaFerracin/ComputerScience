# Assignment

Write a script (contained in `JackAnalyzer`) to turn `Jack` programms into `xml` files.

This is the first step of the compilation from `Jack` to `VM` code.

The whole compiler is as follow:
`Jack program -> Jack compiler -> VM code`

And the Jack compiler is as follow:
`Tokenizer -> Parser -> Code generator`

This assignment focuses on the first 2 steps of the compilation: tokenization of Jack code and parsing into XML.

## Usage

- You can pass single Jack files:

`node ./JackAnalyzer/index.js ./ArrayTest/Main.jack` will create `./ArrayTest/Main.xml`.

- You can pass a folder containing Jack files:

`node ./JackAnalyzer/index.js ./ArrayTest` (where `./ArrayTest` contains `Main.jack` and `Game.jack`) will create `./ArrayTest/Main.xml` and `./ArrayTest/Game.xml`.

## Tests

Given `.jack` files use the script to turn them into `.xml` files and compare them with the given expected `.xml` files.
