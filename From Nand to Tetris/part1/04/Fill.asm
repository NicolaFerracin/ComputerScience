// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input. 
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel. When no key is pressed, the
// program clears the screen, i.e. writes "white" in every pixel.

// Put your code here.
// get screen address
@SCREEN
D=A
@scr
M=D // screen address

// initialize i to 0
@i
M=1

// initilize words var to 8191
@8193
D=A
@words
M=D

(LISTEN)
@KBD
D=M // key pressed
@WHITE
D;JEQ // if 0, go to loop3 and make everything white
@BLACK
0;JMP // if different from 0 (any key pressed) go to loop2


(WHITE)
// if i = words, exit
	@words
	D=M // D is words
	@i // M is i
	D=D-M  // D is words - i
	@RESET
	D;JEQ // if D = 0 reset i and words
	
	// whiten the screen
	@scr
	A=M
	M=0
	
	// i++
	@i
	M=M+1
	
	// go to next word
	@scr
	M=M+1
	
	// loop again
	@WHITE
	0;JMP



(BLACK)
// if i = words, exit
	@i
	D=M // D is i
	@words // M is words
	D=M-D  // D is i - words
	@RESET
	D;JEQ // if D = 0 reset i and words
	
	// blacken the screen
	@scr
	A=M
	M=-1
	
	// i++
	@i
	M=M+1
	
	// go to next word
	@scr
	M=M+1
	
	// loop again
	@BLACK
	0;JMP


(RESET)
@SCREEN
D=A
@scr
M=D // screen address

// initialize i to 0
@i
M=1

@LISTEN // go back to listening the keyboard
0;JMP



