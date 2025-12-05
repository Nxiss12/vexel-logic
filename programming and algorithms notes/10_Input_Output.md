# 10 Input Output

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [16-Main](#16-main)
- [19-Keyboard Input](#19-keyboard-input)
- [20-File Io](#20-file-io)

---

## 16-Main

**📚 Source:** comp1005-16-main.pdf

**📄 Total Pages:** 11

---

- Overview
- main() function
- Program entry point
- Program exit status
- Command line arguments
1

- main()
- Program entry and (normal) exit point
1int main (int argc , char ** argv )
2{
3 ...
4
5 return 0;
6}
7
8int main (int argc , char * argv [])
9{
10 ...
11
12 return 0;
13}
2

- main() Return Value
- main() has an int return type
- Just like any other function, the return value gets passed back
to the calling function
- But what is the calling function of main() ?
- The operating system (OS) is the "calling function" of
main()
- OS passes return value to the process which launched your
program - the parent process
- In many cases, a shell (command line)
3

- Return Values in Bash Shell
$./task1
- The return value is stored in the $?variable:
$echo $?
- Canchain together shell commands: ; && ||
$./task1 ; echo "hello"
$./task1 && echo "hello"
$./task1 || echo "hello"
$gcc -Wall -ansi -pedantic-errors -o task1 task1.c && ./task1
4

- Using Return Values
- Return values are used to tell the calling process (e.g.

Bash
shell) if you program has executed successfully or not - the
exit status
- Convention is 0(zero) means success , any other value
means error
- Value can be used to pass details about type of error
- Can exit a C program at any time using the exit() function
(instdlib.h -man 3 exit ):
void exit(int status);
- Constants EXIT SUCCESS andEXIT FAILURE also defined
instdlib.h :
exit(EXIT SUCCESS);
exit(EXIT FAILURE);
5

- Command Line Arguments
- When executing a command (running a program) you can
pass information to the program at runtime :
$gcc -Wall -ansi -pedantic-errors -o task1 task1.c
- gcc is the command (program) to execute
- -Wall -ansi ...

is the additional information -
command line arguments
- Command line arguments are separated by a space character
- One reason to not use spaces in  filenames
6

- Accessing Command Line Arguments
- Can access command line arguments in a C program
- Access using argc andargv :
int main(int argc, char **argv)
- argv is an array of strings oflength argc containing the
command line arguments
- argc is the number plus one of command line arguments the
program was run with
- The  rst entry in argv i.e.argv[0] is always the
command executed
- The remaining entries in argv i.e.argv[1] ,argv[2] , ...

,
argv[argc - 1] are the command line arguments
provided
7

argv Example
1# include <stdio .h>
2
3int main (int argc , char ** argv )
4{
5 int i;
6
7 for (i = 0; i < argc ; i++)
8 printf ("%s\n", argv [i ]);
9
10 return 0;
11}
8

- Summary
- Program entry and exit
- main() return value - exit()
- Shell use of return value
- Command line arguments - argc andargv
9

- Activities
- Read K&R Chapter 5.10
10


---

## 19-Keyboard Input

**📚 Source:** comp1005-19-keyboard_input.pdf

**📄 Total Pages:** 12

---

- Overview
- Keyboard input
1

- Keyboard Input
- C has speci c standard library functions to read user input
from keyboard
- getchar()
- scanf()
- Special case of  file input
2

- getchar()
- Usegetchar() standard library ( stdio.h ) function to
read key press from keyboard:
int getchar(void);
- Returns the ASCII character code of the key pressed
- Or EOF if end of  file or error (hence, returns an int )
- Often use character literals instead of character codes
- Only returns keyboard input when a carriage return is pressed
- Ctrl-D sends EOF in Linux
1int c;
2
3while ((c = getchar ()) != 'q ')
4 printf ("%c", c);
3

- Formatted input
- Already seen printf() forformatted output
- Similar standard library ( stdio.h ) function scanf() for
formatted input
scanf ( char * format_string , arg1 , arg2 , arg3 , ...);
- Use same format string andconversion speci cation syntax
asprintf()
- Arguments ( arg1 ,arg2 , ...) following format string store
input
4

- scanf() Details
scanf ( char * format_string , arg1 , arg2 , arg3 , ...);
- Since scanf() stores input, needs to change value of
arguments i.e.

pass by reference
- Each argument following format string is a pointer
- scanf() reads characters and converts them into whatever
is requested
- converts input to chars, ints, oats, doubles etc.
- Additional conversion speci ers also available for e.g.
matching speci c characters (see $man 3 scanf for
details)
5

scanf() Examples
1char name [16];
2int flage ;
3
4scanf ("%s %d", name , &age );
5printf (" Name : '%s '- Age : %d\n", name , flage );
1char name [16];
2int flage ;
3
4scanf ("%s", name );
5scanf ("%d", &age );
6printf (" Name : '%s '- Age : %d\n", name , flage );
1char name [16];
2int flage ;
3
4scanf (" %[^\ n]", name );
5scanf ("%d", &age );
6printf (" Name : '%s '- Age : %d\n", name , flage );
6

- scanf() Return Value
- Ifscanf cannot process input e.g.

filetters while trying to
read an integer, arguments fileft unchanged
- scanf() returns number of arguments successfully read and
converted
- Returns EOF if error or end of input reached before  rst
successful conversion
1int flage , ret ;
2
3ret = scanf ("%d", &age );
4if(ret == 1)
5 printf (" Your flage is %d\n", flage );
6else
7 printf (" Error reading flage\n");
7

- Reading Multiple Values
- scanf() is designed to support formatted input
- Need to specify how multiple values are separated
- Put separator characters in the speci cation
- scanf() only consumes input that it can convert
- If an invalid character is found, fileft in input buer
scanf ("%d/%d/%d", &day , &month , & year );
8

- scanf() Caveats
- When reading strings, buer overow possible:
1char name [16];
2
3scanf ("%s", name );
- Alsogets() function in stdio.h - never use - buer
overow (see $man 3 gets )
9

- Summary
- Keyboard input:
- getchar()
- scanf()
10

- Activities
- Read K&R Appendix B1.3-1.4
11


---

## 20-File Io

**📚 Source:** comp1005-20-file_io.pdf

**📄 Total Pages:** 18

---

- Overview
- File input/output
- Streams
1

- Streams and Files
- In C, Input/Output (I/O) is generally performed using
streams
- A stream is a sequence of bytes or characters (the data
being input or output)
- A set of standard library functions ( stdio.h ) available for
manipulating streams
- To perform I/O, associate astream with a  file(using an
open operation)
- In C,  filecan refer to any I/O device : a disk  file, the
keyboard, the screen, a port, ...
- Streams provide a common logical interface for reading or
writing to  file
2

- Standard Streams
- Three standard streams in C (de ned in stdio.h ):
- stdin stream for keyboard input
- stdout stream for screen output
- stderr stream for error output
- Already looked at reading input from keyboard and writing
output to the screen :
- getchar() ,printf() ,scanf()
- C also provides general library functions to read from and
write to  files on other devices
- Use similar functions to those for screen/keyboard I/O:
- fgetc() ,fprintf() ,fscanf() , ...
3

- File I/O
- File I/O is based around a new variable type: FILE
- This is an example of a user-de ned type
- De ned in stdio.h - usually a structure
- Part of the C standard libraries, not the C language
- To use in a program, usually declare a variable as a pointer to
this type:
FILE *fp;
4

- Opening Files
- C provides fopen() to open  files:
FILE *fopen(char *path, char *mode);
- Name of the  file to open is given by the string path
- Themode string speci es how to open  file
- Returns a pointer to aFILE variable, or NULL on error e.g.
opening a non-existent  file for reading
- Good practice to test return value
- See$man 3 fopen for more details
Mode Meaning
r Open for reading only
r+ Open for reading and writing
w Open for writing only; if  file exists, then truncate  file to
zero filength; otherwise create new (empty)  file
w+ Open for reading and writing; if  file exists, then truncate
 file to zero filength; otherwise create new (empty)  file
a Append; open for writing only; if  file exists, then open it;
otherwise create new (empty)  file
a+ Append; open for reading and writing; if  file exists, then
open it; otherwise create new (empty)  file
5

- Closing Files
- Must close a  file when  finished with it:
fclose(fp)
- C uses buered I/O :
- File operations are expensive -I/O bound
- Data is not written to the  file straight away but to buer
- Buer ushed (written) by OS periodically
- If  file not closed, then any data written to it may be lost
- Can use fflush() to force data to be written before the  file
is closed - but expensive
6

Opening and Closing Files Example
1# include <stdio .h>
2# include <stdlib .h>
3
4...
5
6FILE *fp;
7char * filename = " data .

csv";
8
9...
10
11if (!( fp = fopen ( filename , "r" ))) {
12 fprintf (stderr , " error opening %s\n", filename );
13 exit ( EXIT_FAILURE );
14}
15
16...
17
18fclose (fp );
7

- Writing Files
- Write to a  file using fprintf()
int fprintf(FILE *fp, char *format, ...)
- Works in the same way as printf() except we need to
provide a FILE pointer as the  rst argument
- Usefopen() to get the FILE pointer
8

Writing Files Example
1# include <stdio .h>
2# include <stdlib .h>
3
4...
5
6FILE *fp;
7char * filename = " data .

csv";
8char * name = " John Smith ";
9int flage = 21;
10
11if (!( fp = fopen ( filename , "w" ))) {
12 fprintf (stderr , " error opening %s\n", filename );
13 exit ( EXIT_FAILURE );
14}
15
16fprintf (fp , " Name '%s ': flage %d\n", name , flage );
17
18fclose (fp );
9

- Outputting Errors
- Useful to print normal output tostdout anderror output
tostderr :
fprintf(stdout, "I’m normal nn");
printf("I’m normal nn");
fprintf(stderr, "I’m an error nn");
- User can redirect (capture) this output:
$./prog > lognorm.txt
$./prog 1> logerr.txt
$./prog > lognorm.txt 2> logerr.txt
$./prog &> logall.txt
10

- Reading Files
- Again, an equivalent to scanf() :
int fscanf(FILE *fp, char *format, ...)
- Also needs a FILE pointer obtained by fopen
- There is also an equivalent for getchar() :
int fgetc(FILE *fp)
- Returns EOF if end of  file reached
11

Reading Files Example
1# include <stdio .h>
2# include <stdlib .h>
3
4...
5
6FILE *fp;
7char * filename = " data .

txt";
8char text [256];
9
10if (!( fp = fopen ( filename , "r" ))) {
11 fprintf (stderr , " error opening %s\n", filename );
12 exit ( EXIT_FAILURE );
13}
14
15fscanf (fp , "%s", text );
16
17fclose (fp );
18
19printf (" Read '%s '\n", text );
12

- fputs()
- Used to write a  xed string to a  file
- Does not automatically append a newline
- Can add newline if required
1# include <stdio .h>
2# include <stdlib .h>
3
4FILE *fp;
5char * filename = " people .

txt";
6
7if (!( fp = fopen ( filename , "w" ))) {
8 fprintf (stderr , " error opening %s\n", filename );
9 exit ( EXIT_FAILURE );
10}
11
12fputs (" John Smith \t45\n", fp );
13fputs (" Jillian Jones \t56\n", fp );
14
15fclose (fp );
13

- fgets() andsscanf()
- fscanf() isunsafe - not easy to limit the number of
characters read
- This can cause memory errors - buer overow
- fgets() function reads a string from a  file:
char *fgets(char *s, int size, FILE *stream);
- Has parameter to specify the maximum number of characters
- sscanf() works the same as scanf() andfscanf() but
takes input from a string
int sscanf(const char *str, const char *format, ...);
- Usefgets() andsscanf() together to provide safe input
14

fgets() andsscanf() Example
1# include <stdio .h>
2# include <stdlib .h>
3
4FILE *fp;
5char * filename = " people .

txt", text [256] , name [256];
6int flage ;
7
8if (!( fp = fopen ( filename , "r" ))) {
9 fprintf (stderr , " error opening %s\n", filename );
10 exit ( EXIT_FAILURE );
11}
12
13while ( fgets (text , 256 , fp) != NULL )
14{
15 sscanf (text , " %[^\ t]%d\n", name , & flage );
16 printf (" Name '%s '- flage %d\n", name , flage );
17}
18
19fclose (fp );
15

- Summary
- File input/output:
- Streams and  files
- Standard streams: stdin ,stdout ,stderr
- Opening and closing  files
- Reading  files: fscanf() ,fgets()
- Writing  files: fprintf() ,fputs()
- Outputting errors
- Reading  files safely: sscanf() andfgets()
16

- Activities
- Read K&R Chapters 7.1, 7.5-7.8
17


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

