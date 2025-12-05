# 13 Algorithms

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [25-Sorting](#25-sorting)
- [28-Searching](#28-searching)
- [27-Recursion](#27-recursion)
- [26-Expression Parsing](#26-expression-parsing)

---

## 25-Sorting

**📚 Source:** comp1005-25-sorting.pdf

**📄 Total Pages:** 21

---

- Overview
- Algorithms - pseudocode
- Sorting algorithms
- Insertion sort
- Merge sort
1

- Algorithms
- Analgorithm is an unambiguous speci cation forsolving a
problem
- Amethod (procedure/set of rules/set of instructions) for
performing a task
- An algorithm is usually composed of:
- Input data
- Instructions
- Output data
- The instruction s describe the computations which are
performed on the input and which produce the output
- Algorithms are fundamental to computer science and
programming
- In COMP1005, take practical look at a few important
algorithms - more theory in later modules
3

- Pseudocode
- An algorithm is independent of programming language and
computer hardware
- Programs are not algorithms, but programs often implement
one or more algorithms
- An algorithm is usually described using pseudocode
- Pseudocode is an informal programming language used to
unambiguously specify an algorithm
- Often looks similar to a programming language e.g.

C-style
pseudocode, python-style pseudocode
- Butomits details needed by an actual programming language
e.g.

variable declarations
- Often contains natural language descriptions and
mathematical not ation
4

### Sorting Algorithms
5

- Sorting
- Sorting is a fundamental computational problem e.g.

sorting a
sequence of numbers, strings ...
- The general sorting problem :
- Input : A sequence ( x1;x2; :::;xn) ofnelements
- Output : A permutation (reordering) ( x0
1;x0
2; :::;x0
n) of the
elements
- Correctness :x0
1<=x0
2<=: : : < =x0
ni.e.

the sorted
sequence
- Sorting is often used as building block when solving other
computational problems e.g.

 nd the 10 students with the
highest grades
6

Insertion Sort Example
0 65 34 23 87 49 63 72 36
1 65 34 23 87 49 63 72 36
2 34 65 23 87 49 63 72 36
3 23 34 65 87 49 63 72 36
4 23 34 65 87 49 63 72 36
5 23 34 49 65 87 63 72 36
6 23 34 49 63 65 87 72 36
7 23 34 49 63 65 72 87 36
8 23 34 36 49 63 65 72 87
8

Insertion Sort Pseudocode - List
1Input : unsorted list A
2Output : sorted list B
3
4create an empty list B
5pop A-> head and add to B
6while A is not empty
7 nodeB = B-> head
8 while nodeB
9 if A->head -> data < nodeB -> data
10 pop A-> head and insert before nodeB
11 exit loop
12 nodeB = nodeB -> next
13 end while
14 if not nodeB
15 pop A-> head and append to B
16end while
9

Insertion Sort Pseudocode - Array
1Input : unsorted array A
2Output : sorted array A
3
4i = 1
5while i < N
6 j = i
7 while j > 0 and A[j -1] > A[j]
8 swap A[j] and A[j -1]
9 j = j - 1
10 end while
11 i = i + 1
12end while
10

Merging Example
0 12 25 77 79 99 14 57 62 65 72
1 25 77 79 99 14 57 62 65 72
2 25 77 79 99 57 62 65 72
3 77 79 99 57 62 65 72
4 77 79 99 62 65 72
5 77 79 99 65 72
6 77 79 99 72
7 77 79 99
8
0
1 12
2 12 14
3 12 14 25
4 12 14 25 57
5 12 14 25 57 62
6 12 14 25 57 62 65
7 12 14 25 57 62 65 72
8 12 14 25 57 62 65 72 77 79 99
12

Bottom-up Merge Sort Pseudocode
65 34 23 87 49 63 51
34 65 23 87 49 63 51
23 34 65 87 49 51 63
23 34 49 51 63 65 87
1Input : Unsorted A[N] array
2Output Sorted A[N] array
3
4m = 1
5while m < N
6 i = 0
7 while i < N-m
8 merge A[i ,...

,i+m -1] and
9 A[i+m ,...

, min(i+2*m -1,N -1)]
10 i = i+2*m
11 m = m*2
13

### Top-down Merge Sort Example
Divide and Conquer
14

Top-down Merge Sort Pseudocode
1Input : Unsorted A[N] array
2Output Sorted array
3
4mergesort ( array A)
5 if N == 1
6 return A
7
8 A1 = A[0 ,...

,N /2]
9 A2 = A[N/2+1 ,...

,N -1]
10
11 A1 = mergesort (A1)
12 A2 = mergesort (A2)
13
14 return merge (A1 , A2)
Recursion
15

- Choosing Sorting Algorithms
- Two important properties of algorithms are time complexity
andspace complexity
- Computational complexity - how many resources are used
when running an algorithm on a problem of size n
- Usually indicated using BigOnot ation (more theory in
COMP2009 Algorithms, Correctness and Eciency):
- O(1) - constant
- O(logn) - logarithmic
- O(n) - linear
- O(nlogn) - loglinear
- O(n2) - quadratic
- O(nc) - polynomial
- O(cn) - exponential
16

- Time Complexity
- Time complexity - how many operations are performed
Insertion sort
worst case: O(n2)
average case: O(n2)
best case: O(n)Merge sort
worst case: O(nlogn)
average case: O(nlogn)
best case: O(nlogn)
- Time complexity is not run-time
http://watson.latech.edu/WatsonRebootTest/ch05s4p3.html
17

- Space Complexity
- Space complexity - how much memory is used
Insertion sort
in place: O(1)Merge sort
array: O(n)
linked list: O(logn)
- Other considerations when choosing algorithms:
- Format of input data
- Structure of input data
18

- Summary
- Algorithms :pseudocode
- Sorting :
- General problem
- Insertion sort
- Merge sort
- Computational complexity : time and space complexity
19

- Activities
- Cormen et al.

Introduction to Algorithms Chapter 2
20


---

## 28-Searching

**📚 Source:** comp1005-28-searching.pdf

**📄 Total Pages:** 13

---

- Overview
- Search algorithms:
- Linear search
- Binary search
1

- General Search Problem
- Searching (together with sorting) is a fundamental
computational problem
- Thegeneral search problem :
- Input :
- A sequence of nkey-value pairs (k1;v1); :::;(kn;vn) where the
keys are sorted i.e.k1<k2< ::: < kn
- A search keyx
- Output : Value viif there exists a key-value pair where ki=x,
otherwise NULL
2

- Search Problem Example 1
- Problem :  nd a phone number in a phone book
- Key-value pairs are name and number respectively:
(k1, v1) = (Albert, 01153422435)
(k2, v2) = (Martha, 01151232345)
(k3, v3) = (Zoe, 01156234376)
- Keys are sorted
- Find the number for a given name (search key)
- If search key xisZoe , solution is 01156234376
- If search key xisJamie , solution is NULL
3

- Search Problem Solution
- Choice of data structure used to represent the key-value
pairs determines which algorithm we can use
- Data structure : how data organized , and operations that
are supported on the data
- We have seen two types of data structures:
- Linked lists
- Arrays
4

- Linear Search Algorithm
- Check each key sequentially
- Can be implemented using both linked lists andarrays
5

- Linear Search Analysis
- Each iteration of the for-loop takes O(1) time
- Inworst case , key xis not found, and make niterations
- Hence, linear search has worst case time complexity O(n)
6

- Search Problem Example 2
- Problem : look up a word in a dictionary
- Linear search solution: check every page consecutively from
the  rst page until the word is found
- Can do better because the words are sorted alphabetically
7

- Divide and Conquer Approach
- Divide the problem into two or more sub-problems
- Conquer the sub-problems by solving them recursively
- Combine the solutions to the sub-problems into solution of
original problem
- For flour search problem:
- Divide :
- Divide the book into the  rst half and the second half
- Conquer :
- Find the middle word in the book
- If word before middle word, then no solution in second part
- If word is after middle word, then no solution in  rst part
- Combine :
- Return solution if found in either part
8

- Binary Search Algorithm
- Worst case time complexity ofO(logn)
- Better than linear search O(n)
- So why not always use binary search?
- No implementation for linked lists
9

- Choosing Search Algorithms
- Choice of search algorithm in part depends on data structure
used
- For binary search algorithm we need a sorted array
- A number of search algorithms:
http://www.geeksforgeeks.org/searching-algorithms/
- Computational complexity is only one piece of the puzzle
- Choice depends on particular problem trying to solve:
- Data representation - what does the data look like?
- Other algorithms used - trade-o in entire program
10

- Summary
- Search problem
- Linear search
- Binary search
- Divide and conquer
11

- Activities
- Cormen et al.

Introduction to Algorithms Chapter 4
- Follow links given in slides
12


---

## 27-Recursion

**📚 Source:** comp1005-27-recursion.pdf

**📄 Total Pages:** 14

---

- Overview
- Recursion:
- Program memory layout
- Recursive functions
- Recursion optimisation
1

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
2

- Call Stack
- Call stack : data structure which stores information about
functions being executed
- Call stack usually grows downwards in memory from high
address to low address
- When a function called, a stack frame (activation record)
created for the function
- Stack frame pushed onto the call stack
- Exact layout of stack frame depends on architecture/compiler
- Stack frame often stores information on:
- Function parameter values (registers used as well)
- Return address in calling function
- Function local variable values
- Address where local variables start
3

Stack Frame Example
int foobar (int a, int b, int c)
{
int xx = a + 2;
int yy = b + 3;
int zz = c + 4;
int sum = xx + yy + zz;
return xx * yy * zz + sum;
}
int main ()
{
return foobar (77 , 88, 99);
}
https://eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/
https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64
4

- Recursion
To understand recursion you must  rst understand recursion...
- Recursive function - a function that calls itself
1int factorial (int n)
2{
3 if(n)
4 return n * factorial (n - 1);
5 return 1;
6}
5

Recursion Call Stack
https://stackoverflow.com/questions/5631447/how-recursion-works-in-c
1int factorial (int n)
2{
3 if(n)
4 return n * factorial (n - 1);
5 return 1;
6}
6

- Recursion vs.

Iteration
- Recursion can filead to simpler (more elegant) code
- Recursion suits divide-and-conquer algorithms
- Recursion can be more dicult to understand
- Recursion can be slower -function call overhead
- Some languages do not fundamentally support iteration!
1int factorial (int n)
2{
3 if(n)
4 return n * factorial (n - 1);
5 return 1;
6}
1int factorial (int n)
2{
3 int f = n;
4
5 while (--n)
6 f *= n;
7 return f;
8} 7

- Recursion Problems
- What happens?
factorial(-1)
- Result is a segmentation fault
- Caused by stack overow/overrun - call stack full
- In nite number of calls to factorial
8

- Recursion Optimisation 1
- Remove unnecessary iterations
- Base condition : when recursion stops
1int factorial (int n)
2{
3 if(n)
4 return n * factorial (n - 1);
5 return 1;
6}
1int factorial (int n)
2{
3 if(n >= 2)
4 return n * factorial (n - 1);
5 return 1;
6}
9

- Recursion Optimisation 2
- Usetail recursion - last statement in recursive function is call
to itself
- Easier for compiler to optimise - local variables  finished with
- Code can just jump instead of creating new stack frame
1int factorial (int n)
2{
3 if(n >= 2)
4 return n * factorial (n - 1);
5 return 1;
6}
1int factorial (int n)
2{
3 if(n == 1)
4 return 1;
5 return n * factorial (n - 1);
6}
10

- Recursion Optimisation 3
- gcc will often optimise for you when you use the optimisation
options -O1 ,-O2 , ...
gcc -Wall -O2 -o test test.c
- -O2 generally a good choice
- More info:
https://gcc.gnu.org/onlinedocs/gcc/Optimize-Options.html
11

- Summary
- Program memory layout: call stack ,stack frame
- Recursion: de nition ,optimisation
12

- Activities
- Follow links given in slides
13


---

## 26-Expression Parsing

**📚 Source:** comp1005-26-expression_parsing.pdf

**📄 Total Pages:** 21

---

- Overview
- Problem solving
- Parsing mathematical expressions:
- Expression not ation
- Dijkstra's shunting yard algorithm
1

- Algorithms Review
- Algorithms are fundamental to computer science and
programming
- Programs are not algorithms, but programs often implement
one or more algorithms
- An important part of the art of programming is choosing
appropriate data representations ,data structures and
algorithms
- In this filecture, show a practical example
3

- Example Problem
- Write a program to evaluate an arbitrary mathematical
expression entered by a user
- For example, if the user enters:
((15 =(7 (1 + 1))) 3) (2 + (1 + 1))
- The program would output 5
- How do we go about solving this problem?
4

- First Steps
- Do some background research :
- Has anyone else solved this or a similar problem?
- What data structures and algorithms did they use?
- Are there any libraries which implement these data structures
or algorithms?
- Which language is best suited for the problem?
- You do not want to reinvent the wheel, so generally using
libraries is good
- But for this problem (since we are filearning programming), we
will not use any more than the standard C libraries
5

- Background Research 1
- The internet is helpful:
6

### Background Research 2
7

### Background Research 3
8

- In x and Post x Notation
- In x not ation : operators are written between their operands:
2 + 3
1(2 + 3) =4
- Post x not ation: operators are written after their operands:
2 3 +
1 2 3 + 4=
- Post x also called reverse Polish not ation (RPN)
- No brackets in post x
9

- Post x Evaluation
- Post x not ation much easier to evaluate than in x
1(2 + 3) =4
- In post x, evaluate from fileft to right :
- Scan until reach an operator
- Evaluate with two previous operands
- Push back in list
1 2 3 + 4=
1 54=
5 4=
1:25
10

- General Approach
- Write a program to evaluate an arbitrary mathematical
expression entered by a user
- Convert expression from in x to post x:
- Dijkstra's shunting yard algorithm
- Evaluate post x expression
11

Dijkstra's Shunting Yard Algorithm 1
https://en.wikipedia.org/wiki/Shunting-yard_algorithm
12

Dijkstra's Shunting Yard Algorithm 2
https://en.wikipedia.org/wiki/Shunting-yard_algorithm
13

Dijkstra's Shunting Yard Algorithm 3
https://en.wikipedia.org/wiki/Shunting-yard_algorithm
14

- Dijkstra's Shunting Yard Algorithm 4
- Algorithm has several key components:
- Input : in x expression string
- Output : post x expression stored in queue
- Data structures : stacks and queues
- Tokens : numbers, operators, brackets
- Operator precedence andassociativity
15

- Tokens
- Token : anumber ,operator orbracket
- Operators and brackets read as single characters , numbers
asstrings
- Write functions to test what a token is:
int is number(char c)
int is operator(char c)
- Useisnumber() to build number strings:
1while is_number (c)
2 add c to end of number string
3 get next c
16

- Operators
- Which operators shall we allow?
- Basic implementation: +    =^
- How do we deal with operator precedence ?
- Give operators a precedence value (integer), higher the value,
higher the precedence:
^ = 4 == 3 +  = 2
- Write functions:
int operator precedence(char c)
int test precedence(char a, char b)
int is fileft associative(char c)
17

- Evaluating Post x
- Straightforward algorithm for evaluating post x expression:
https://en.wikipedia.org/wiki/Reverse_Polish_not ation
- Just need to implement an evaluate function e.g.:
double evaluate expression(double operand1, double operand2, char operator)
18

- Summary
- Problem solving
- Implementing a mathematical expression parser:
- Reverse Polish not ation
- Dijkstra's shunting yard algorithm
- Evaluating RPN
19

- Activities
- Follow links in slides
20


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

