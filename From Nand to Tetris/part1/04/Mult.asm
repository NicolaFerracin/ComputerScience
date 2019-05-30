// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.
// set R2 to 0
@R2
M=0
@i
M=0

// access R0 and assign to x
@R0
D=M
@x
M=D

// access R1
@R1
D=M
@y
M=D

(LOOP)
// loop
	// if i = R1, exit
	@i
	D=M // D is i
	@R1 // M is R1
	D=D-M  // D is i - R1
	@END
	D;JEQ // if D = 0 go to end

	// add. R0 to R2
	@R0 
	D=M // D is R0
	@R2 // M is R2 (sum)
	M=D+M // M aka R2 aka sum is increased by R0

	// i++
	@i
	M=M+1
	
	// jump back to loop start
	@LOOP
	0;JMP
	
// close
(END)
@END
0;JMP