# 02 Programming Fundamentals

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [02-Programming Concepts](#02-programming-concepts)
- [03-C Basics](#03-c-basics)

---

## 02-Programming Concepts

**📚 Source:** comp1005-02-programming_concepts.pdf

**📄 Total Pages:** 18

---

- Overview
- Approaches to programming
- Algorithms and procedures
1

### Approaches to Programming
2

- Introduction
- Computers need to be told what to do
- Programming is (the science and artof) making a computer
do what you want it to do
- A program describes what you want a computer to do
- Fundamentally, dierent ways ( programming paradigms ) of
telling a computer what to do
3

- Programming Paradigms
- Declarative paradigm - describe the properties of what you
want
- Imperative paradigm - describe how to construct what you
want
- Example - drawing a square:
Declarative
box width 5cm height 5cm
Imperative
moveto 0 0; lineto 100 0; lineto 100 100; ...
- Computers are naturally imperative
- But can use declarative descriptions
4

- High and Low Level Languages
- Computers understand a basic set of instructions -
instruction set
- Closely linked to machine architecture e.g.

x86, PowerPC,
Z80, ARM, ...
- In alow filevel language you essentially program using the
instruction set:
- machine code
- assembly language
- Assemble a low filevel program
- But more often write programs in a high-level language :
- C, Python, Java, JavaScript, HTML, Perl, R, ...
- Compile/interpret a high filevel program
- General dierences between high and low filevel programs:
- ease of use
- portability
- eciency
- memory footprint
5

- What is a Program?
- A program is a sequence of instructions
- Computer executes them one by one
- Each instruction usually does one simple thing
- Instructions act on some data
- Together they build up to do complex tasks
- Types of instructions:
- Mathematical operations.
- Variable operation - load and store data
- Conditionals - do this only on some condition.
- Loops - repeat doing this.
- Procedures - blocks of instructions for reuse.
- A true but potentially unhelpful answer!
- How to solve complex problems?
6

- Functional Decomposition
- How do we solve a complex problem?
- General methodology:
- break the problem down into smaller simpler steps
- perform each step to solve the bigger problem
- This is called functional decomposition
- This is the way we think about and write programs
- Programming is creative { many interesting ways of solving a
problem
- Often useful to think in terms of transforming input data to
output data
7

### Algorithms and Procedures
8

- Algorithms
- Analgorithm defines how to solve a problem computationally
- A clearly and unambiguously defined set of steps
- Dierent algorithms for doing the same task
- An algorithm is independent of language - pseudocode
- An algorithm is not a program
- A program often implements a number of algorithms
9

- What is a Program?
- A program is a set of algorithms anddata structures
10

- Procedures
- A procedure is a block of instructions in a programming
language
- Procedures are also called subroutines orfunctions
- An algorithm may be implemented as a single procedure
- More often, implemented using multiple procedures
11

- A Recipe Analogy
- Victoria Sponge:
1.

Preheat the oven to 180C/350F/Gas 4
2.

For the cake, grease and line two 20cm/8in sandwich tins with
baking parchment, and dust with our
3.

In a food mixer, cream together the butter and sugar until pale
and uy
4.

Gradually beat in the eggs, then add the our and orange zest
and mix until well combined
5.

Divide the mixture evenly between the two cake tins, then
bake in the oven for 25-30 minutes, or until golden-brown and
slightly springy to the touch
12

- A Recipe's Procedures
- A recipe is an \algorithm" for making a cake:
- De ned in terms of a set of steps or processes
- Several steps may be grouped together into \procedures" for
doing speci c smaller tasks
- Can see how to make the cake clearly
- Smaller tasks common across several recipes
- Procedures are reused across several recipes
13

- Procedural Programming Paradigm
- C is an imperative programming language
- C is a procedural programming language
- All instructions are grouped into procedures
- A procedure is a block of instructions that is given a name
- Invoke (call) the procedure and these instructions by name
14

- Procedural Decomposition
- Procedural Decomposition: break a large program in to
smaller procedures
- Can then implement more complicated tasks in terms of the
smaller ones
- Small tasks are easier to:
- implement
- debug
- maintain
- reuse
15

- Summary
- Covered a number of fundamental programming concepts:
- declarative/imperative programming paradigm
- high/low filevel languages
- functional/procedural decomposition
- programs/algorithms/procedures
- procedural programming paradigm
16

- Activities
- Do some reading around on the internet on the fundamental
programming concepts covered in this filecture
- Wikipedia is a good start e.g.:
- https:
//en.wikipedia.org/wiki/Declarative_programming
- https:
//en.wikipedia.org/wiki/Imperative_programming
- https://en.wikipedia.org/wiki/Algorithm
- ...
17


---

## 03-C Basics

**📚 Source:** comp1005-03-c_basics.pdf

**📄 Total Pages:** 16

---

- Overview
- The C programming language
- Writing and compiling C
- C language standards
1

### The C Programming Language
2

- C Background
- C is a general-purpose ,high-level ,imperative ,procedural
programming language
- Invented by Denis Ritchie (AT&T Bell Labs) around 1972
- Developed out of the B language
- The C Programming Language book written by Brian
Kernighan and Dennis Ritchie in 1978
- Still ranks as one of the most widely used languages:
https://www.tiobe.com/tiobe-index/
- Linux, Windows, Mac kernels written in C
- Derivatives : C++, C#, Java, PHP, Perl, Rust, ...
https://en.wikipedia.org/wiki/List_of_C-family_
programming_languages
3

- C Features
- C provides a minimal set of inbuilt constructs
- More complex tasks handled by functions :
printf() ,exit() ,getchar() ,fopen() , ...
- Standard libraries (stdio.h ,strings.h , ...) of functions
provided to do common tasks
- Create new libraries to do speci c tasks
- C instructions can be eciently converted in to machine code
- C oers ways of interfacing with underlying hardware (e.g.
pointers)
4

- Writing and Compiling C
- A C source program is an ASCII text  file(s)
- Use any text editor to write a C program: gedit, kwrite, vim,
emacs, notepad++, ...
- Compile the text source program into a binary executable
program
- In COMP1005, use the GNU gcc compiler in a *nix shell
- Can also use an Integrated Development Environment
(IDE) to edit and compile: Eclipse, Code::Blocks, NetBeans
- Choose a development environment (editor/IDE) which suits
your tastes and allows you to program eciently :
- syntax highlighting
- autocompletion
- keyboard shortcuts
6

- Compiling C
- Basic usage:
$gcc source.c
- outputs executable a.out
- Better usage:
$gcc -o myprog source.c
- use the -o ag to speci c output executable name
- outputs executable myprog
- Standard usage:
$gcc -Wall -o myprog source.c
- use the -Wall ag to show all compiler warnings
- compilation continues after warnings
- compilation stops onerrors
7

Compiling C in COMP1005
$gcc -Wall -ansi -pedantic-errors -o myprog source.c
8

### C Language Standards
9

- Language Standards
- Part of the job of a compiler is to implement a programming
language
- Programming languages are not static - evolve over time
- Often dierent implementations of a single programming
language - dialects
- Dierent implementations provide dierent language
features
- Aprogramming language standard clearly defines the set of
language features
- Standards are important - code portability
10

- C Language Standards
- C has several standards:
- K&R C (1978)
- ANSI C / C89 (1989)
- ISO C / C90 (1990)
- ISO C99 (1999)
- ISO C11 (2011)
- ISO C18 (2018)
- C standards apply to language constructs andstandard
libraries
- Compilers also often oer their own non-standard extensions
- gcc provides a number of non-standard extensions
11

- Controlling gcc Standards
- Use-std or-ansi ag with gcc to specify the standard to
use:
$gcc -std=c89 -o myprog source.c
$gcc -ansi -o myprog source.c
- Use-pedantic ag to switch o gcc extensions:
$gcc -pedantic -o myprog source.c
$gcc -pedantic-errors -o myprog source.c
12

- The Standard for COMP1005
- We use ANSI C (C89)/ISO C (C90) in this module
$gcc -Wall -ansi -pedantic-errors -o myprog source.c
- All coursework and lab exercises will enforce this
- Some implications for your source code:
- comments - no //
- some standard library functions not available e.g.
snprintf()
13

- Summary
- Overview of the C programming language:
- history
- features
- Writing and compiling C:
- text editors/IDEs
- compilers - gcc
- C language standards:
- ANSI C (C89)/ISO C (C90)
14

- Activities
- Read the Preface andIntroduction to your K&R course
book
- Have a look at the Wikipedia page for the C Programming
Language:
https://en.wikipedia.org/wiki/C_programming_language
- You do not need to understand everything on the Wikipedia
page now
15


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

