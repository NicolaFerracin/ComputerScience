// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

(LOOP)
  // initialize screen variables
  @SCREEN
  D=A
  @scr // starting point
  M=D
  
  @8193 // there are 8193 words to turn black/white
  D=A
  @words
  M=D
  M=M-1

  @KBD // get pressed key
  D=M

  @SCREENOFF
  D;JEQ
  @SCREENON
  D;JMP

(SCREENON)
  @words
  D=M

  @LOOP
  D;JEQ

  @scr
  A=M
  M=-1

  @scr
  M=M+1

  @words
  M=M-1

  @SCREENON
  0;JMP

(SCREENOFF) 
  @words
  D=M

  @LOOP
  D;JEQ

  @scr
  A=M
  M=0

  @scr
  M=M+1

  @words
  M=M-1

  @SCREENOFF
  0;JMP
