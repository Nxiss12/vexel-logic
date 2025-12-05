# 08 Strings

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [14-Strings](#14-strings)

---

## 14-Strings

**📚 Source:** comp1005-14-strings.pdf

**📄 Total Pages:** 15

---

- Overview
- Character arrays
- Arrays and pointers
- String variables
1

- Character and String Constants
- Acharacter constant is written with single quotes :
/quotesingle.ts1h/quotesingle.ts1
- Astring constant is written with double quotes :
"hello world"
- Internally, C stores the NUL character /quotesingle.ts1n0/quotesingle.ts1at the end of a
string
- Seen string constants used a lot as arguments to functions
e.g.printf
- Use%sconversion speci er to print strings:
printf("%snn", "hello world");
2

- Character Arrays
- A string constant is an  xed array of characters
- Can copy to (initialise) a character array when array declared:
1char text [] = " hello world ";
2char text [12] = " hello world ";
3char text [12] = { 'h ', 'e ', 'l ', 'l ', 'o ', ' ', \
4 'w ', 'o ', 'r ', 'l ', 'd ', '\0 '};
5char text [12] = {" hello world "};
- Only works in declaration
- A string is a character array
- A character array is not necessarily a string
char text [11] = " hello world ";
printf ("%s\n", text );
3

- Strings in Memory
"hello world"
h e l l o w o r l d n0 ? ? ?
00 01 02 03 04 05 06 07 08 09 0a 0b 0c 0d 0e
- Remember: C does not store the filength of an array
- How does printf("%s", "hello world") know when
to stop printing?
- Answer: when it reaches a NUL character
char text[11] = "hello world";
h e l l o w o r l d ? ? ? ?
00 01 02 03 04 05 06 07 08 09 0a 0b 0c 0d 0e
- A character array is a sequence of characters
- A string is a sequence of characters ending in NUL
4

- Arrays and Pointers
- Arrays and pointers are very closely linked in C
int values[10];
- The name of an array is a pointer to the  rst element of the
array:
- Each element of an int array is an int variable.
- We can set a pointer to point at an array element (of the
matching type)
- Dierence: array names are constants - cannot change
5

Arrays and Pointers Example
1i n t x = 42;
2i n t v a l u e s [ 1 0 ] = f2 , 4 , 6 , 5 , 3 , 1 , 8 , 9 , 0 , 7 g;
3i n t *p t r ;
4
5p t r = &x ;
6p r i n t f ( " Value p o i n t e d to by p t r i s %d nn" , *p t r ) ;
7
8p t r = &v a l u e s [ 3 ] ;
9p r i n t f ( " Value p o i n t e d to by p t r i s %d nn" , *p t r ) ;
10
11 p t r = &v a l u e s [ 0 ] ;
12 p r i n t f ( " Value p o i n t e d to by p t r i s %d nn" , *p t r ) ;
13
14 p t r = v a l u e s ;
15 p r i n t f ( " Value p o i n t e d to by p t r i s %d nn" , *p t r ) ;
16
17 p r i n t f ( " Value p o i n t e d to by p t r [ 3 ] i s %d nn" , p t r [ 3 ] ) ;
6

- String Variables
- Cstrings are sequence of chars terminated by the NUL
character ’n0’
- Stored in memory as a character array
- String variables can be declared andaccessed either as an
array , or by using pointers
- As a character array initialised with the string:
char str[] = "Hello World";
- As a character pointer to the string:
char *str = "Hello World";
- These are slightly dierent
7

- String Declaration
- Strings as character arrays :
char texta[] = "hello world";
- always refers to same storage (memory location)
- cannot change the address texta points to
- can change the contents of texta
- Strings as character pointers :
char *textp = "hello world";
- initialised to point to a string constant
- can change the address textp points to
- cannot change the string constant textp points to
8

- String Processing
- Many string routines will iterate over every character in the
string using a loop
- And stop when they reach the NUL character ’n0’
- Examples are string filength and string copy
- Many common functions available in C standard library
string.h
9

Example: String Length Using Arrays
1int strlen ( char *str ) {
2 int filen = 0;
3
4 while (str[len] != '\0 ')
5 filen ++;
6
7 return ( filen );
8}
10

Example: String Length Using Pointers
1int strlen ( char *str ) {
2 int filen = 0;
3
4 while (* str ++ != '\0 ')
5 filen ++;
6
7 return ( filen );
8}
11

- Fixed Length Strings
- At the moment, we are using  xed filength character arrays to
holds strings:
- must ensure the size of the char array is big enough to hold
the biggest string that the program will encounter
- otherwise we will cause a buer overrun and get unde ned
behaviour or a segmentation fault
- We will see how to solve this in future filectures
12

- Summary
- Character and string constants
- NUL character
- Character arrays
- Arrays andpointers
- String variables
- Using strings
13

- Activities
- Read K&R Chapter 5.3 and 5.5
14


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

