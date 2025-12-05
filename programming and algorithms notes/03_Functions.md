# 03 Functions

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [04-Introduction Functions](#04-introduction-functions)
- [07-Functions Revisited](#07-functions-revisited)
- [13-Pointers Functions](#13-pointers-functions)

---

## 04-Introduction Functions

**📚 Source:** comp1005-04-introduction_functions.pdf

**📄 Total Pages:** 14

---

- Overview
- Function de nition
- Function declaration
- Control ow
1

- C Programs
- A C program is a set of variable andfunction de nitions
- A C function is a set of declarations andstatements
- Syntax defines how a statement, declaration or de nition is
structured
- Syntax is very important , get it wrong and:
- program fails to compile
- program behaves unexpectedly - unde ned behaviour
2

- C Functions
- Break large programs into smaller parts - functional
decomposition
- See how the program works without seeing all the detail
- Should name the functions appropriately
- Should comment the functions:
/* ...

*/
- Allows code reuse { often programs use the same basic
functions
3

- Function De nitions
- Function de nition syntax :
return - type function - name ( parameter declarations )
{
variable declarations
statements
}
- Return type - the type of the value returned from the
function (if any)
- Function name - same naming convention as variables
- Parameter declarations - variables the function uses to
perform its task
4

- Function De nitions
- Function de nition syntax :
return - type function - name ( parameter declarations )
{
variable declarations
statements
}
- f...gcurly brackets/braces - group declarations and
statements in function in a block (the function body )
- Variable declarations - declare any variables used in the
function
- Statements - what the program does (almost always ended
by a semicolon)
5

- Function Call
- Once we have defined a function, we can call (invoke ) it to
use ( execute ) it
- Function call syntax :
function - name ( function arguments );
- Already seen this with printf :
printf ("hello , world !\n");
- Function arguments separated by comma:
printf ("hello , %s!\n", " world ");
6

- Function Declarations
- Compiler needs to know about a function before we call it
- One possibility is put de nition before any calls in source code
- Not always possible or desirable
- Can tell compiler about a function before we de ne it using a
function declaration
- Function declaration syntax :
return - type function - name ( parameter declarations );
7

- Program Control Flow
- An imperative program is executed ( ows ) in a linear
step-wise fashion from one statement to the next - control
ow
- Function calls allow us to jump between one block of
statements and another and back flagain i.e.

change the
control ow
- When we call a function:
- Stop executing the current (calling) function
- Start executing the code in the called function
- When called function  finished, resume executing in calling
function
8

- Program Entry Point
- Computer needs to know where to start running a program -
theentry point
- C defines that it starts execution in a function called main()
i.e.main() is the entry point for a C program
- Every C program has a main() function:
int main (int argc , char ** argv )
{
/* code goes here */
return 0;
}
9

Control Flow Example
1# include <stdio .h>
2
3void print_hello ( void )
4{
5 printf (" hello \n");
6}
7
8int main (int argc , char ** argv )
9{
10 printf (" calling print_hello ()\n");
11 print_hello ();
12 printf (" finished calling print_hello ()\n");
13
14 return 0;
15}
10

- Function Libraries
- C comes with a wide range of standard libraries
- Contain commonly used functions - so we do not have to
write them
- Use#include to include standard library functions
- Copies content of  file (usually a header  file ending with .h)
into flour program:
# include <stdio .h>
- #include usually appears at start of source code  file,
outside ofmain()
- #include is apreprocessor directive
- preprocessor directives run before compilation
11

- Summary
- C functions - de nition ,declaration ,calling
- Program control ow - program entry point
12

- Activities
- Read K&R Chapter 1 - A Tutorial Introduction and try the
exercises in this chapter
- Quickly look through K&R Appendix B to get an overview of
the functions provided by the standard libraries
- Read the man page for stdio , the C standard input/output
library, and the man pages for some of this library's functions
e.g.printf :
$man 3 stdio
$man 3 printf
...
13


---

## 07-Functions Revisited

**📚 Source:** comp1005-07-functions_revisited.pdf

**📄 Total Pages:** 15

---

- Overview
- Function parameters
- Function return values
- main
- printf
1

- Function De nition
- Function de nition syntax :
return - type function - name ( parameter declarations )
{
variable declarations
statements
}
2

- Function Parameters
return - type function - name ( parameter declarations )
{
variable declarations
statements
}
- Function parameters allow us to pass values from one
function to another
- Function parameters are automatic variables :
- initialised with a copy of value passed
- This is called pass by value
- What does this mean in terms of scope andlifetime ?
3

- Function Arguments
- Function call syntax :
return - type function - name ( parameter declarations );
- A function cannot change the values of it arguments
- Changing the value of a parameter inside a function will not
change the value of the argument (variable) in the calling
function
4

- Function Return Values
return - type function - name ( parameter declarations )
{
variable declarations
statements
}
- Functions can return a single value
- Caller can use the returned value just like any other value
- Declare the type of the return value in the function de nition
- Usevoid keyword to declare no return value
- Can also use void to declare no parameters
5

- Function Return Values
- Use the return statement to return a value:
return <value>;
- Stops the function at that point and returns to the caller,
passing the value back
- A return statement can be anywhere in the function, not just
at the end
- Good practice to have a return at end of function block
- Can use return; to exit a void function
- In ANSI C, default return value if not speci ed is int
- Butgood practice to always specify (removed from C99)
- Calling function does not need to do anything (or even assign)
returned value
6

- main() Function
int main (int argc , char ** argv )
{
/* code goes here */
return 0;
}
- main() is the program entry point
- Also often the program exit point
- When reach end of main() , program exits and returns to OS
- main() returns the exit code of the program to the OS:
- 0 (zero) = exited with no errors
- non-zero (often 1) = exited with errors
- Good practice to put return 0; at end of main()
7

- printf() Function
printf ( char * format_string , arg1 , arg2 , arg3 , ...);
- Useprintf() to output to the screen
- Or more strictly, standard output stdout
- Part of the C standard input/output library stdio :
#include <stdio.h>
- The fstands for print formatted
- printf() takes one or more arguments:
- A string containing text to print and conversion speci ers :
format string
- A series of values to insert into the string ( arg1 ,arg2 , ...)
8

- printf() Format String
- Regular characters in the format string are copied directly to
the terminal
- Format string can also contain conversion speci cations :
- Begin with a %character
- End with a conversion character
- Other characters possible between %and conversion character
- A conversion speci cation converts and prints the next
successive argument toprintf()
- Possible to be more speci c about how things are formatted:
leading zeros, precision, ...
- Expressed in the conversion speci cation, e.g.

%5d - always
print 5 characters
9

printf() Example
printf (" Colour %s, Decimal %d, Float %0.2f, Char %c\n", \
" red ", 123 , 3.14 , 'a ');
10

Conversion Speci ers
Speci er Output Type
%d decimal int
%i decimal int
%o octal int
%x %X hexadecimal int
%u unsigned decimal unsigned int
%c character char
%s string char *
%f oating point double
%e %E exponent form double
%g %G decimal double
%p pointer void *
%% % N/A
11

- Escape Sequences
- Format string can contain escape sequences
- Used to print special characters
- Begin with ancharacter ( backslash ) followed by one or more
characters:
- nn- return
- nt- tab
- nb- backspace
- n"- double quote
- nn- backslash
12

- Summary
- Function parameters andarguments :
- automatic
- pass by value
- Function return values :return
- main() function:
- program exit code
- printf() function:
- conversion speci cation
- escape characters
13

- Activities
- Read about functions in K&R Chapter 4.1-4.4
- Read about printf() inK&R Chapter 7.2
- Read about escape sequences inK&R Chapter 2.3
- Look at man page for printf() :
$man 3 printf
- Look at printf() and escape sequence pages on Wikipedia:
http://en.wikipedia.org/wiki/Printf_format_string
https://en.wikipedia.org/wiki/Escape_sequences_in_C
14


---

## 13-Pointers Functions

**📚 Source:** comp1005-13-pointers_functions.pdf

**📄 Total Pages:** 15

---

- Overview
- Function parameters and pointers
- Pass by reference
1

- Pass by Value
- We have seen that functions are declared with parameters
- When we call a function we pass arguments in parentheses
- Every time function called, new automatic variables are
created for each parameter
- The values of the arguments arecopied in to these
automatic variables
- Functions can alter the values of the automatic variables
- Functions cannot alter the values of their arguments
1void afunction ( int x, double d) {
2 ...
3}
4
5int i = 0;
6double d = 0.0;
7
8afunction (i, d);
2

Pass by Value Example 1
1void func ( int x)
2{
3 x++;
4 printf (" Printing from func , x = %d\n", x);
5}
6
7int main (int argc , char ** argv )
8{
9 int a = 42;
10
11 printf ("In main , a = %d\n", a);
12 func (a);
13 printf ("In main flagain , a = %d\n", a);
14
15 return 0;
16}
3

Pass by Value Example 2
1void func ( int a)
2{
3 a++;
4 printf (" Printing from func , a = %d\n", a);
5}
6
7int main (int argc , char ** argv )
8{
9 int a = 42;
10
11 printf ("In main , a = %d\n", a);
12 func (a);
13 printf ("In main flagain , a = %d\n", a);
14
15 return 0;
16}
4

- Function Return Values
- Functions can return a single value
- Use the return keyword
- Return value is copied and passed back to the original calling
statement
- The calling function may (or may not) do something with it
- What if we need to return multiple two values?
5

- Multiple Return Example
- Problem : write a function to return the solutions to a
quadratic equation ax2+bx+c= 0
- Two possible answers (values of x) - positive and negative
root:
x= bp
b2 4ac
2a
6

- Multiple Return Example 1
- Solution 1 : write two functions
1double s o l v e q u a d p o s ( double a , double b , double c )
2f
3 double x ;
4
5 x = ( =b + s q r t ( b *b =4 *a *c ) ) / (2 *a ) ;
6
7 r e t u r n x ;
8g
9
10 double s o l v e q u a d n e g ( double a , double b , double c )
11 f
12 double x ;
13
14 x = ( =b =s q r t ( b *b =4 *a *c ) ) / (2 *a ) ;
15
16 r e t u r n x ;
17 g
7

- Multiple Return Example 2
- In general, Solution 1 is abad solution
- End up calculating things twice
- Unnecessary duplication of code
- In some cases (e.g.

user input) cannot use multiple functions
- C provides a solution - pointers andpass by reference
8

- Pass by Reference
- So far, we have been passing copies of function argument
values into parameters of functions - pass by value
- Pointers can hold the address of other variables
- Pointers can be used to change other variables - dereference
operator *
- Pass by reference : pass a function the address (reference)
of a variable, rather than a copy of its value
- Since function now knows address in memory of variable, can
change the value of variable directly
9

- Multiple Return Example 3
- Solution 2 : use a single function and pass by reference to
return the positive and negative roots
- The function could take  ve parameters:
- the three co-ecients: a, b, and c
- two pointers to store the results which reference two variables
in the calling function
10

- Multiple Return Example 4
- Solution 2 : pass by reference
1v o i d s o l v e q u a d ( double a , double b , double c , n
2 double *pos , double *neg )
3f
4 double s = s q r t ( b *b =4 *a *c ) ;
5
6 *pos = ( =b + s ) / (2 *a ) ;
7 *neg = ( =b =s ) / (2 *a ) ;
8g
9
10 i n t main ( i n t argc , char * *argv )
11 f
12 double a = 2 , b = 3 , c = =1;
13 double x , y ;
14
15 s o l v e q u a d ( a , b , c , &x , &y ) ;
16
17 p r i n t f ( " S o l u t i o n s a r e %f and %f nn" , x , y ) ;
18
19 r e t u r n 0 ;
20 g
11

- Segmentation Fault
- What happens when make a mistake with pointers?
- If lucky, a segmentation fault (seg fault) runtime error
- If unlucky, unde ned behaviour and no error!
- Segmentation fault = attempt to read or write illegal
memory location
1double *x, *y = NULL ;
2
3*x = 3.4;
4*y = 2.3;
5func (x);
12

- Summary
- Pass by value - function parameters and arguments
- Pass by reference - pointers as function arguments
- Multiple return values
- Segmentation fault
13

- Activities
- Read K&R Chapter 5.2
14


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

