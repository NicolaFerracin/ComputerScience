# Assignment

Write a script (contained in `VMTranslator`) to turn VM code into Hack code (assembly-like language).

## Usage

`node VMTranslator.js ./path/to/file.vm` will create `./path/to/file.asm`.

## Tests

Given `.vm` files use the script to turn them into `.asm` files and run them against provided tests.

## Examples

### Input

```
push constant 10
push constant 20
add
```

### Output

```
# these comments are not part of the output

# push constant 10 to *SP
@10
D=A
@SP
A=M
M=D
@SP
M=M+1
A=M

# push constant 20 to *SP
@20
D=A
@SP
A=M
M=D
@SP
M=M+1
A=M

# add 20 to 10
@SP
M=M-1
A=M
@SP
A=M
D=M
@SP
M=M-1
A=M
M=D+M
@SP
M=M+1
A=M

# infinite loop
(END)
@END
0;JMP
```
