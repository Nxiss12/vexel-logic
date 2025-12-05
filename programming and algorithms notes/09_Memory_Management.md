# 09 Memory Management

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [17-Dynamic Memory Allocation](#17-dynamic-memory-allocation)

---

## 17-Dynamic Memory Allocation

**📚 Source:** comp1005-17-dynamic_memory_allocation.pdf

**📄 Total Pages:** 19

---

- Overview
- Program memory organisation
- Dynamic memory allocation
- Garbage collection
1

String Copy Example 1
1# include <stdio .h>
2
3int main (int argc , char ** argv )
4{
5 char buffer [16] , *p;
6 int i;
7
8 if( argc != 2)
9 return 1;
10
11 p = argv [1];
12 i = 0;
13 while (*p)
14 buffer [i ++] = *p ++;
15 buffer [i] = '\0 ';
16 printf ("%s\n", buffer );
17
18 return 0;
19}
2

- Compile-time and Run-time Memory
- Array size is set at compile-time
- Often do not know what the size array should be till run-time
- Could guess, and hope we have enough space - insecure
- Better if we could set the size of the array at run-time
- C filets us do this using dynamic memory allocation
- Need to understand the way program manages memory
- Although all memory is identical, the program sees it as
several dierent sections (segments )
- These sections are used for various purposes
3

- Program Memory Layout
- Text : compiled executable
code
- Initialised Data : initialised
global and static variables
- Uninitialised Data (BSS):
uninitialised statics - set to
zero
- Heap - dynamically
allocated memory
- Stack - automatic variables
and function return
addresses
4

- Dynamic Memory Allocation
- Automatic variables created on the stack, and local to
function
- Refer to them by name in source code
- Get a pointer to them using &operator
- Can also store values (data) on the heap
- The heap is the rest of available memory
- Only have pointer to heap data, no direct (named) access
- Used malloc ,calloc ,realloc andfree standard
library functions in stdlib.h to manage heap
5

- malloc()
- Allocate (reserve) memory on heap using malloc()
function
void *malloc(size t size)
- Instdlib.h :
#include <stdlib.h>
- Allocates size bytes on heap
- Usesizeof operator to calculate size
- Example: Allocate memory for an array of 4 integers:
- number of bytes = 4 * sizeof(int)
- Example: Allocate memory for a string of 256 characters:
- number of bytes = 256 * sizeof(char)
- Returns void pointer to allocated block of memory on heap
- Allocated memory is uninitialised
6

- Type Casts
- Convert one variable type to another type using a type cast
- Put the type name to convert to in parenthesis before the
variable to convert
- Integer promotion anddemotion : values preserved if
possible, other implementation speci c (often truncated)
- Can also cast pointers
1 float x = 256.8;
2 int i, *pi;
3 char c;
4 void *pv;
5
6 i = (int) x;
7 c = ( char ) x;
8 pi = (int *) pv;
7

malloc() Examples 1
1# include <stdlib .h>
2
3...
4
5int *pi = NULL ;
6char *pc = NULL ;
7
8...
9
10pi = (int *) malloc (4 * sizeof ( int ));
11pc = ( char *) malloc (256 * sizeof ( char ));
8

- Using malloc() Safely
- The heap (program memory) is not in nite
- malloc() returns NULL if no more space on heap
- Always check value returned by malloc() to verify that
memory was allocated successfully
1pi = (int *) malloc (4 * sizeof ( int ));
2
3if(pi == NULL ) {
4 /* error - do something */
5}
6
7if (! pi) {
8 /* error - do something */
9}
10
11if (!( pi = ( int *) malloc (4 * sizeof ( int )))) {
12 /* error - do something */
13}
9

- Using Allocated Memory
- Can use allocated memory to store data like any other variable
- Only access it via pointer - cannot obtain a variable name for
it
1# define NUM_VALS 10
2
3int i, *p = NULL , *p2;
4
5if (!( p = ( int *) malloc ( NUM_VALS * sizeof ( int ))))
6 exit ( EXIT_FAILURE );
7
8p2 = p;
9for (i = 0; i < NUM_VALS ; i++) {
10 p[i] = 1.0;
11 *p2 ++ = 1.0;
12}
10

- free()
- When  finished using dynamically allocated memory, need to
release it back to operating system
- Otherwise, memory cannot be used for anything else until
program exits
- Usefree() standard library function to do release memory:
void free(void *ptr)
- ptr is a pointer previously returned by malloc
- Accessing memory after free will cause a segmentation fault
11

- calloc()
- calloc() is similar to malloc() - allocate a block of
memory:
void *calloc(size t nmemb, size t size)
- Except calloc willinitialise memory to0- higher
computational overhead
- Safer to use for arrays (avoids integer overow )
1pi = (int *) malloc (4 * sizeof ( int ));
2
3pi = (int *) calloc (4, sizeof ( int ));
4
5if (!( pi = ( int *) calloc (4, sizeof ( int )))) {
6 /* error - do something */
7}
12

- realloc()
- realloc() enlarges orshrinks allocated memory:
void *realloc(void *ptr, size t size)
- New memory not initialised
- Original pointer may move
- free() called if pointer moves or memory shrunk
1if (!( pi = ( int *) malloc (4 * sizeof ( int )))) {
2 /* error - do something */
3}
4
5if (!( pi = ( int *) realloc (pi , 8 * sizeof ( int )))) {
6 /* error - do something */
7}
13

- Garbage Collection
- Memory is not in nite
- Garbage : memory occupied by objects no longer in use
- Memory fileak : memory no longer needed is not released
- In C, you are the garbage collector
- Must keep track of the dynamic memory you have allocated
- Release it back to the program after you have  finished with it
- but not before - free()
14

- Checking for Garbage
- Can use valgrind tool to check for correct garbage
collection:
$valgrind --tool = memcheck --leak - check =yes
--show - reachable = yes ./ test1
...
==796== ERROR SUMMARY : 1 errors from 1 contexts
( suppressed : 0 from 0)
- Compile your code with the gcc -g ag to get line numbers
- Garbage collection will be assessed in labs and coursework
15

String Copy Example 2
1#i n c l u d e <s t d i o .

h >
2#i n c l u d e <s t d l i b .

h >
3#i n c l u d e <s t r i n g .

h >
4
5i n t main ( i n t argc , char * *argv )
6f
7 char *b u f f e r , *p ;
8 i n t i ;
9
10 i f ( argc != 2)
11 r e t u r n 1 ;
12 i f ( ! ( b u f f e r = ( char *) c a l l o c ( s t r l e n ( argv [ 1 ] ) + 1 , n
13 s i z e o f ( char ) ) ) )
14 r e t u r n 1 ;
15
16 p = argv [ 1 ] ;
17 i = 0 ;
18 w h i l e ( *p )
19 b u f f e r [ i ++] = *p++;
20 b u f f e r [ i ] = 'n0 ';
21 p r i n t f ( "%s nn" , b u f f e r ) ;
22
23 f r e e ( b u f f e r ) ;
24 r e t u r n 0 ;
25 g16

- Summary
- Compile-time andrun-time memory
- Program memory sections/segments
- Dynamic memory allocation - heap
- C standard library functions malloc() ,calloc() ,
realloc() ,free()
- Type casts
- Garbage collection - valgrind
17

- Activities
- Read K&R Chapters 5.4, 7.8.5, 8.7
18


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

