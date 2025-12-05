# 07 Arrays And Pointers

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [11-Arrays](#11-arrays)
- [12-Pointers](#12-pointers)
- [15-Arrays Pointers](#15-arrays-pointers)

---

## 11-Arrays

**📚 Source:** comp1005-11-arrays.pdf

**📄 Total Pages:** 15

---

- Overview
- Arrays:
- General concepts
- Declaration
- Initialisation
- Accessing
1

- Storing Related Data
- Example : write a program to calculate the average daily
temperature for a week
- Problem : how would we store temperatures for a week?
- Solution 1 :
- Use multiple variables - one for each day of week
- double temp mon, temp tue, temp wed, ...;
- Works but not parsimonious
- The data are related:
- All temperatures
- But values are dierent
- Could store all the values together in asingle data
structure
2

- Arrays
- Anarray is generic data structure
- Data structure that stores multiple values of the same type
- Consists of a collection of elements (values /variables )
- Each element indexed (identi ed) by an index orkey
- Stored in memory such that the location of an element can be
computed
3

- Arrays in C
- C provides an inbuilt array data structure
- Has a  xed size speci ed at compile-time , N
- Individual values accessed by a numeric index from 0(zero)
toN-1 -zero indexing
- The array has a single name
- Value stored in a contiguous block of memory
- Constant time access for each item
4

- Array Declaration
- Use[](square brackets ) operator to signify an array
- Declared like a normal variable with []after the name:
type name[size];
- Size is placed inside square brackets
- Examples:
double temps [7];
int days_in_month [12];
char text [256];
5

- Array Access
- Each array item has a numeric index
- To access an item, index is put in square brackets after array
name
- Literals, variables, functions return values, ...

can be an index,
providing they are integers
temp [6] = 22.3;
printf ("%f", temp [6]);
day = 2;
printf ("%f", temp [ day ]);
printf ("%f", temp [ get_day ()]);
6

- Bounds Checking
- C performs no bounds checking when accessing arrays
- That is, it does not check in the index is valid
int values [10];
values [10] = 12345;
values [ -231] = 12345;
- Program will compile  ne
- Unde ned behaviour at runtime
- Maybe a segmentation fault
7

- Array Properties
- Same storage class ,scope andlifetime rules apply to arrays
- Storage class initial values :
- automatic : indeterminate
- static :zero
- So all values in static arrays are initialised to 0
- All values in automatic arrays are initialised to random values
8

- Array Initialisation
- Can also explicitly set initial value of array elements
- Only possible when array initially declared
- Compilation error if you try to do this anywhere else
- Listcomma separated initial values enclosed in fg
- Values assigned in order to each array element
- You can fileave out size of the array if you are specifying the
initial values
- Compiler will work out the size of the array automatically
9

Array Initialisation Examples
i n t days inmonth [ 1 2 ] = f31 , 28 ,3 1 ,30 , 31 ,3 0 , 31 , 31 ,3 0 , 31 , 30 ,3 1 g;
i n t days inmonth [ ] = f31 , 28 ,3 1 ,30 , 31 ,3 0 , 31 , 31 ,3 0 , 31 , 30 ,3 1 g;
double week temp [ 7 ] = f8 .

6 , 6 .

4 , 9 .

0 , 8 .

2 , 5 .

2 , 4 .

9 g;
double week temp [ ] = f8 .

6 , 6 .

4 , 9 .

0 , 8 .

2 , 5 .

2 , 4 .

9 , 6 .

1 g;
char i n p u t [ ] = f 'h ', 'e ', 'l ', 'l ', 'o 'g;
10

- Array Length
- No built in way of getting array filength at runtime
- Can use sizeof() operator to get number of bytes in array
- sizeof() evaluated at compile time
- sizeof() does not work with arrays passed as function
parameters
- Common pattern:
# define N 100
...
int a[N];
...
for (i = 0; i < N; i++)
a[i] = ...
11

- Storing Related Data Revisited
- Example : write a program to calculate the average daily
temperature for a week
- Problem : how would we store temperatures for a week?
- Solution 1 :
- Use multiple variables - one for each day of week
- double temp mon, temp tue, temp wed, ...;
- Solution 2 (better):
- Use an array
- double temps[7];
12

- Summary
- Array data structures
- Arrays in C:
- Declared using square brackets []
- Size  xed atcompile time
- Zero indexed
- Constant-time access
- Accessing arrays - no bounds checking
- Array initialisation
13

- Activities
- Read K&R Chapter 5.3
14


---

## 12-Pointers

**📚 Source:** comp1005-12-pointers.pdf

**📄 Total Pages:** 21

---

- Overview
- Pointers :
- Memory
- Addresses
- Pointer declaration
- Pointer assignment
1

- Variables and Memory
- Avariable name in C is a shorthand for a memory address
- Value stored in variable =value stored at memory address
- Variables are allocated memory based on their type
https://www3.ntu.edu.sg/home/ehchua/programming/cpp/cp4_PointerReference.html
2

- Pointers and Memory
- Variable names useful since having to use memory address
explicitly is pretty tedious (e.g.

ARM )
- But very useful to deal with memory addresses directly
sometimes
- C gives us direct access to a program memory -pointers
- Apointer is a variable that stores a memory address :
- pointer =memory address
3

- Pointer Declaration
- Declared by using an asterisk *before the variable name:
type * name ;
int *a;
double * value ;
char * string ;
- When declared, the memory address is unde ned for
automatics ,NULL forstatics
- NULL is a constant defined in various standard libraries
including stdio.h andstdlib.h
- The value of NULL is an invalid memory address - often
0x0000
4

- Assigning Addresses
- Need to set pointer to point to a memory address
- Almost always the memory address of another variable
- Do this by using the address-of operator &(ampersand)
- The address-of operator &returns thememory address of a
variable
- Can print memory addresses using %pconversion speci er
1int x;
2int *p, *q;
3
4p = &x;
5q = p;
6
7printf ("%p\n", p);
8printf ("%p\n", q);
9printf ("%p\n", &x);
5

- Accessing Values
- To access or set the value referenced by a pointer (i.e.

the
value stored at the memory address assigned to the pointer),
use the dereference operator *(asterisk) before pointer
name
1int x = 42;
2int *p;
3
4p = &x;
5
6printf ("%d\n", *p);
7
8*p = 24;
9
10printf ("%d\n", *p);
11printf ("%d\n", x);
6

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 ?????? x
0xF004 ?????? y
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 ?????? x
0xF004 ?????? y
0xF008 ?????? p
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 42 x
0xF004 ?????? y
0xF008 ?????? p
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 42 x
0xF004 ?????? y
0xF008 0xF000 p
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 42 x
0xF004 ?????? y
0xF008 0xF000 p
42
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 31 x
0xF004 ?????? y
0xF008 0xF000 p
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 31 x
0xF004 ?????? y
0xF008 0xF000 p
31
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 21 x
0xF004 ?????? y
0xF008 0xF000 p
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 21 x
0xF004 ?????? y
0xF008 0xF000 p
21
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 21 x
0xF004 ?????? y
0xF008 0xF004 p
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 21 x
0xF004 42 y
0xF008 0xF004 p
7

Pointer Example
1int x, y;
2int *p;
3
4x = 42;
5
6p = &x;
7printf ("%d\n", *p);
8
9x = 31;
10printf ("%d\n", *p);
11
12*p = 21;
13printf ("%d\n", x);
14
15p = &y;
16*p = 42;
17printf ("%d\n", y);0xF000 21 x
0xF004 42 y
0xF008 0xF004 p
42
7

- Summary
- Pointers are variables that store memory addresses
- Pointer declaration
- NULL pointer - no address
- Address-of operator &- pointer assignment
- Dereference operator *- pointer access
8

- Activities
- Read K&R Chapter 5.1
9


---

## 15-Arrays Pointers

**📚 Source:** comp1005-15-arrays_pointers.pdf

**📄 Total Pages:** 23

---

- Overview
- Review of arrays
- Arrays and pointers
- Pointer arithmetic
- Arrays and functions
- Two-dimensional arrays
- String arrays
1

- Array Summary
- Array is a simple data structure
- Holds a series of values of the same type
- Values accessed by a numeric index
- Declare array using the []operator
- Indexed from zero in C
- Size set at compile time
- Arrays can be automatic orstatic
- Nobounds checking
2

- Buer Overruns
- Trying to access (either using array or pointer not ation)
memory beyond the limits of an array is called a buer
overrun oroverow
- C expects the programmer (you) to stop this happening - no
bounds checking
- Buer overruns filead to unde ned behaviour :
- unexpected runtime behaviour
- segmentation fault
- gcc stack smashing warnings
3

- Pointers and Arrays
- Array name is apointer to  rst value in array
- Can get a pointer to any value in an array
- Pointer and array syntax for accessing elements can generally
be used interchangeably
- Seehttp://c-faq.com/aryptr/aryptrequiv.html for
more details
1int a[5] = {1, 2, 3, 4, 5};
2int *pa , x;
3
4pa = a;
5pa = &a [2];
6
7pa = a;
8x = pa [2];
9x = a [2];
4

- Arrays in Memory
- Arrays are allocated in memory as a contiguous block
- Start with the  rst element (takes up 4 bytes for int )
- Then the next element (another 4 bytes) and so on...
int a[5] = {1, 2, 3, 4, 5};
0x10 0x14 0x18 0x1c 0x20
1 2 3 4 5
5

- Pointer Arithmetic
- Can add orsubtract integers from pointers
- Adding integer one to a pointer means move one element
along, not one byte
- So if it is a pointer to an int , C will advance the pointer to
the next int along (4 bytes)
- Can only add and subtract integers from pointers
1int a[5] = {1, 2, 3, 4, 5};
2int *pa , *pb , x;
3
4pa = a;
5pb = pa + 1;
6x = *pb;
6

Pointer Arithmetic Example
1int a[5] = {1, 2, 3, 4, 5};
2int *pa , x;
3
4pa = a;
5x = *( pa + 2);
6x = *pa + 2;
7x = *pa ++;
8x = (* pa )++;
9x = *--pa;
10pa += 3;
11x = *pa;
12x = *( pa - 4);
0x10 0x14 0x18 0x1c 0x20
1 2 3 4 5
7

- Passing Arrays to Functions
- Can pass arrays into functions
- Does not make a copy of the array - passes a pointer to the
array
- Means that a function can alter the values stored in the array
-pass by reference
- Declare the array as a function parameter
- No need (optional) to declare the size
double average ( double array [])
{
...
}
double average ( double * array )
{
...
}
8

- Passing Arrays to Functions
double average ( double array [])
{
...
}
double average ( double * array )
{
...
}
- How does a function know how big an array is?
- It does not - you need to implement this
- Either pass the array size as a separate argument
- Or have some value that means the end
9

Passing Arrays to Functions Example 1
1double a v e r a g e ( double a r r a y [ ] , i n t s i z e )
2f
3 i n t i ;
4 double sum = 0 .

0 ;
5
6 f o r ( i = 0 ; i <s i z e ; i ++)
7 sum += a r r a y [ i ] ;
8
9 r e t u r n ( sum / s i z e ) ;
10 g
11
12 .

.

.
13
14 double weeks temp [ 7 ] = f8 .

6 , 6 .

4 , 9 .

0 , 8 .

2 , 5 .

2 , 4 .

9 , 6 .

1 g;
15 double avg temp ;
16
17 .

.

.
18
19 avg temp = a v e r a g e ( weeks temp , 7 ) ;
10

Passing Arrays to Functions Example 2
1double a v e r a g e ( double a r r a y [ ] )
2f
3 i n t i = 0 ;
4 double sum = 0 .

0 ;
5
6 w h i l e ( a r r a y [ i ] != =1.0)
7 sum += a r r a y [ i ++];
8
9 r e t u r n ( sum / i ) ;
10 g
11
12
13 .

.

.
14
15 double weeks temp [ 8 ] = f8 .

6 , 6 .

4 , 9 .

0 , 8 .

2 , 5 .

2 , 4 .

9 , 6 .

1 , =1g;
16 double avg temp ;
17
18 .

.

.
19
20 avg temp = a v e r a g e ( weeks temp ) ;
11

- Copying Arrays
- No support in C to copy contents of an array:
1int a[5] , b [5];
2
3b = a;
- If you need to copy an array, you have to do it manually e.g.
with a forloop
12

Array Copy Example
1void array_copy ( int dst [], int src [], int size )
2{
3 int i;
4
5 for (i = 0; i < size ; i++)
6 dst [i] = src [i];
7}
8
9...
10
11int a[5] = {1, 2, 3, 4, 5};
12int b [5];
13
14...
15
16array_copy (b, a, 5);
13

- Two-Dimensional Arrays
- Not limited to one dimensional arrays
- Can have two (or more - multi-dimensional ) indices into
array
- First index is row, second is column - just like matrix in
maths
- When initializing the values go across columns  rst then on to
next row
1int november_temps [4][7];
2
3int november_temps [4][7] = { \
4 {9, 8, 13, 13, 11, 11, 6}, \
5 {10 , 9, 10, 10, 9, 9, 9}, \
6 {10 , 11, 12, 8, 8, 8, 9}, \
7 {7, 4, 9, 9, 9, 9, 8} };
14

- Using Two-Dimensional Arrays
- Accessed by giving the two indices: row andcolumn
respectively
november temps[2][5] = 12;
- Nested for loops are the natural way to iterate over each
array element in turn
- Can pass two-dimensional arrays to functions
- C needs the 'size' of 2D array to generate code to access it
- In fact, only need to know the number of columns - see
http://c-faq.com/aryptr/pass2dary.html for details
- When passing a 2D array to a function, parameter declaration
must specify how many columns there are
- Need to pass 2D array of the same dimension
1void func ( int td [3][4]) /* ok */
2void func ( int td [][4]) /* ok */
3void func ( int td [][]) /* not ok */
15

- Character Arrays
- Can also have a 2D array of characters:
char c [3][4] = { \
{ 'b ', 'i ', 'l ', 'l '}, \
{ 'j ', 'a ', 'n ', 'e '}, \
{ 'f ', 'r ', 'e ', 'd '} };
- The rows are not strings - no terminating NUL characters
- AddNUL to have a 2D array of strings:
char c [3][5] = { \
{ 'b ', 'i ', 'l ', 'l ', '\0 '}, \
{ 'j ', 'a ', 'n ', 'e ', '\0 '}, \
{ 'f ', 'r ', 'e ', 'd ', '\0 '} };
16

- String Arrays
- Can also have a one dimensional array of pointers to
characters (strings ):
char *c[2] = { " Brian Kernighan ", " Dennis Ritchie " };
- Quite dierent to 2D character array in memory layout
17

- Strings Revisited
char * str = " hello ";
- "hello" is astring constant
- Atcompile time , C puts the characters /quotesingle.ts1h/quotesingle.ts1,/quotesingle.ts1e/quotesingle.ts1,/quotesingle.ts1l/quotesingle.ts1,
/quotesingle.ts1l/quotesingle.ts1,/quotesingle.ts1o/quotesingle.ts1,/quotesingle.ts1n0/quotesingle.ts1into the initialised memory (static memory)
of your program
- str is itself a memory location
- str is initialised to store the address of  rst character ( /quotesingle.ts1h/quotesingle.ts1)
18

- String Arrays
char *c[2] = { " Brian Kernighan ", " Dennis Ritchie " };
- "Brian Kernighan" and"Dennis Ritchie" are
string constants
- c[0] is address of  rst character in "Brian Kernighan"
i.e.

a pointer typechar * (character pointer)
- c[1] is address of  rst character in "Dennis Ritchie"
i.e.

a pointer typechar * (character pointer)
- cis address of  rst element (a character pointer) in the array
c(&c[0] )
- cis the address of an address of type char - apointer to
a pointer of type char :char **arr
- can use **arr and*arr[] interchangeably
19

String Array Example
1#i n c l u d e <s t d i o .

h >
2
3v o i d p r i n t s t r i n g s ( char * *s t r i n g s , i n t n u m s t r i n g s )
4f
5 i n t i ;
6
7 f o r ( i = 0 ; i <n u m s t r i n g s ; i ++)
8 p r i n t f ( "%s nn" , *s t r i n g s ++);
9g
10
11 i n t main ( i n t argc , char * *argv )
12 f
13 char *c [ 2 ] = f" Brian Kernighan " , " Dennis R i t c h i e " g;
14
15 p r i n t s t r i n g s ( c , 2 ) ;
16
17 r e t u r n 0 ;
18 g
20

- Summary
- Review of arrays - C implementation
- Arrays and pointers - equivalence of pointer and array syntax
- Pointer arithmetic - move elements not bytes
- Arrays and functions - declare as pointer or array
- Two-dimensional arrays - row/column indexing - functions
- String arrays - pointers to pointers
21

- Activities
- Read K&R Chapter 5.4-5.9
22


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

