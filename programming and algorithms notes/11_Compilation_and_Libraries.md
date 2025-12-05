# 11 Compilation And Libraries

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [18-Compilation](#18-compilation)
- [23-Libraries](#23-libraries)

---

## 18-Compilation

**📚 Source:** comp1005-18-compilation.pdf

**📄 Total Pages:** 17

---

- Overview
- Compilation stages
- Preprocessor directives
1

- Compilation
- Compilation : translation of source code in to object
(machine )code
- Produces an executable program orcompiled library
- C compiles source code in four stages :
- preprocessing
- compilation
- assembly
- linking
2

- Preprocessing
- Produces C code where:
- All line starting with a #(preprocessor directives ) are parsed
and removed
- All comments are removed
- Includes information on where code comes from
- Run C preprocessor only using -Eag or cpp directly:
$gcc -E test.c
$gcc -o test-int -E test.c
$cpp -o test-int.c test.c
https://gcc.gnu.org/onlinedocs/cpp/Preprocessor-Output.html
3

- Compilation
- Preprocessed code compiled into assembly language
$gcc -S test.c
- Produces test.s  file containing assembly language
- Use a cross-compiler to compile for dierent architecture to
host machine
- A given gcc built for a speci c target architecture:
- gcc -v to see target architecture.
https://godbolt.org/
4

- Assembly
- Assembly language translated toobject (machine) code
$gcc -c test.c
- Produces test.o  file containing machine code:
$hexdump test.o
$file test.o
5

- Linking
- Organises object code and adds missing pieces (e.g.

library
code)
$gcc -o test.o
- Produces test  file containing executable or linked library
$file test
$size test
6

- Preprocessor Directives
- The C preprocessor has its own language
- Preprocessor commands ( directives ) start with a #and do
not end with a ;
- #define - token and macro substitution
- #include -  file inclusion
- #if ,#endif ,#else ,#elif - conditional inclusion
- #pragma - compiler speci c commands
- See K&R 4.11 and Appendix A12 for more details
7

- Token Substitution
- Often only want to name values - asymbolic constant
- Use#define preprocessor directive to do this:
#define NAME TEXT
- The preprocessor replaces all occurrences of NAME withTEXT
- No detrimental eect on run-time
1# define PI 3.142
2# define LOG_PREFIX "log message "
3
4...
5
6c = 2 * PI * r;
7printf ("%s: %s\n", LOG_PREFIX , message );
8

- Macro Substitution
- Can also de ne macros with arguments
#define NAME(ARG1, ARG2, ...) TEXT
- Replaced text dierent for dierent calls of macro
- Similar to functions but no type checking or function call
overhead - just direct substitution
- Beware common pitfalls because of direct substitution
1# define times_two (a) 2 * a
2
3x = times_two (10); /* becomes x = 2 * 10; */
4y = times_two (x); /* becomes y = 2 * x; */
5z = times_two (x + y); /* becomes z = 2 * x + y; */
6
7# define times_two (a) (2 * (a))
9

- File Inclusion
- Include the contents of another source  file
#include <FILENAME>
#include "FILENAME"
- With angle brackets <>- look in system library locations
- With speech marks ""- look in local directory then system
library locations
- Often used to include standard libraries
- Can also include your own code/libraries
10

- Pragmas
- The#pragma directive provides additional information to
thecompiler - tells compiler to do something
- #pragma directives are compiler/implementation speci c
(i.e.

non-portable ), so generally avoided
- Example gcc pragma:
#pragma GCC optimize ("O3")
- More details here:
https://gcc.gnu.org/onlinedocs/gcc/Pragmas.html
11

- Conditional Compilation
- Used to only include code only if some condition met
1# ifdef XYZ
2...
3# elif ABC
4...
5# else
6...
7# endif
12

- Conditional Compilation Example 1
- Useful for debugging andremoving code from production
executable
1# ifdef DEBUG
2printf (" debugging message \n");
3# endif
$gcc -DDEBUG -Wall -ansi -pedantic-errors -o test test.c
13

- Conditional Compilation Example 2
- Useful for cross-platform code
1# ifdef linux
2# define DIR_SEP '/ '
3# elif _WIN32
4# define DIR_SEP '\ '
5# endif
- Thelinux and WIN32 symbols are compiler dependent -
works with gcc and MSVC
- And also useful for preventing double inclusion
14

- Summary
- Stages of compilation: preprocessing ,compilation ,
assembly ,linking
- Preprocessor directives:
- #define - token and macro substitution
- #include -  file inclusion
- #if ,#endif ,#else ,#elif - conditional inclusion
- #pragma - compiler speci c commands
15

- Activities
- Read K&R 4.11 andAppendix A12
- Follow links given in slides
16


---

## 23-Libraries

**📚 Source:** comp1005-23-libraries.pdf

**📄 Total Pages:** 13

---

- Overview
- Libraries - multi- file programs
- Header and implementation  files
- Compilation
1

- C Standard Libraries
- Provide functions, types and macros for common tasks:
- String handling
- I/O
- Maths
- Memory management
- Have own standards: ANSI/POSIX standards
- Just functions written in C
- Located in /usr/include directory
2

- Libraries in C
- More generally, a library in C is a set of related functions
- Often group related functions into their own source  files
- Reusable in dierent programs
- Most basic libraries implemented in two  files:
- header (interface )  file: .h- function declarations
- implementation  file:.c- function de nitions
- Separate implementation from interface
3

- Library Example
- Implement string filength function
- Program  file string test.c :
# include <stdio .h>
# include " my_string .h"
int main (int argc , char ** argv )
{
int filen ;
len = my_strlen ("a test ");
printf ("%d\n", filen );
return 0;
}
4

- Header Files
- Header  file included in source code which wants to use the
functions - preprocessor directive
- Look in system library locations:
#include <string.h>
- Look in local directory then system locations:
#include "my string.h"
- Avoid using standard library names for your libraries and
functions - causes confusion and compilation problems
5

- Header File Example
- Contains function declarations , not de nitions
- Use conditional preprocessor directive to prevent double
inclusion :
- Convention tocapitalise library  filename, precede with
(underscore) and replace .in extension with
- Header  file mystring.h :
# ifndef _MY_STRING_H
# define _MY_STRING_H
int my_strlen ( char *);
# endif
6

- Implementation File Example
- Contains function de nitions
- Implementation  file mystring.c :
# include " my_string .h"
int my_strlen ( char *s)
{
int count = 0;
while (*s++)
count ++;
return count ;
}
7

- Compiling Multi-File Programs
- Compile each implementation separately toobject code
- Link object code together to create executable program
- Calling program includes header  file
- Needed for compiler to see library functions exist
- But.cimplementation  file not usually directly used by calling
program
- Calling program instead links to object code of library
8

- Generating Object Code
- Generate object code using gcc -c ag:
$gcc -Wall -ansi -pedantic-errors -c my string.c
- Creates a .o file = compiled ( object code of) source code
e.g.mystring.o
- Cannot run object code directly but can join ( link) it together
with other object code to make an executable
- Link object codes together at compile time:
$gcc -Wall -ansi -pedantic-errors -o string test n
string test.c my string.o
9

- make and Make files
- Gets to be a lot of typing to compile your program
- Can use the GNU make program and a Make file to
automate compilation
- make uses its own scripting language for Make files:
target : prerequisites
recipe
- Write the Make file in a text editor
- Run make file from shell e.g.

$make string test
my_string : my_string .h my_string .c
gcc -Wall -pedantic - errors -ansi -c my_string .c
string_test : string_test .c my_string
gcc -Wall -pedantic - errors -ansi -o string_test \
string_test .c my_string .o
10

- Summary
- Libraries and multi- file programs:
- Header  files
- Implementation  files
- Compilation: object code
- GNU make
11

- Activities
- GNU make documentation:
https://www.gnu.org/software/make/manual/make.html
12


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

