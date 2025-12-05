# 06 Control Structures

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [09-Conditionals](#09-conditionals)
- [10-Loops](#10-loops)

---

## 09-Conditionals

**📚 Source:** comp1005-09-conditionals.pdf

**📄 Total Pages:** 22

---

- Overview
- Conditional execution
- Statement blocks
- Boolean operators
1

- Conditional Execution
- Execute some code only if a particular condition is true
- Acondition is an expression that is TRUE or FALSE
- Generally use relational orBoolean operators to calculate
condition
- C has no in-built keywords TRUE and FALSE:
- 0 = FALSE
- not 0 = TRUE (by convention 1)
2

- ifStatement
- ifstatement tests a condition
- If the condition is TRUE , then execute the next statement
- If the condition is FALSE , then do not execute the next
statement
- ifstatement syntax :
if( condition )
statement ;
3

ifExamples
1x = 3;
2
3if(x < 5)
4 printf (" hello 1\n");
5
6if(x > 5)
7 printf (" hello 2\n");
8
9if(x == 5)
10 printf (" hello 3\n");
11
12if(x = 5)
13 printf (" hello 4\n");
14
15if(x != 0)
16 printf (" hello 5\n");
17 printf (" hello 6\n");
4

- Statement Blocks
- Executing only one statement is limiting
- We can execute a block of statements by putting that block
inside curly brackets/braces :
f...g
- Sometimes called compound statements
- Nosemicolon at end of block
- Treated syntactically like a single statement
- Scope rules apply
5

ifStatement Block Examples
if( condition )
{
statement ;
statement ;
...
}
if( condition ) {
statement ;
statement ;
...
}
if(a == 10) {
printf ("%d\n", a);
a += 5;
}
6

- else Clause
- Can also add an else clause to an ifstatement
- else executes associated block of statements if ifcondition
is not true i.e.

false
if( condition )
statement ;
else
statement ;
if( condition ) {
statement ;
...
} else {
statement ;
...
}
7

- else if
- Can chain (nest)if-else statements
if( condition )
statement ;
else if( condition )
statement ;
else if( condition )
statement ;
else
statement ;
- If this then, else if something else then, else ...
- Useful for e.g.

handling multiple input choices
8

Nested if-else Example
1a = -5;
2b = 10;
3
4/* print yes if both a and b greater than zero */
5/* print no if both a and b filess than zero */
6if(a >= 0)
7 if(b >= 0)
8 printf (" yes\n");
9 else
10 printf ("no\n");
9

- else Association
- In a nested if-else ,else is optional
- else associates with the last previous ifthat does not
have an else
- Theelse goes with the last else-less if
- Usebraces to form a block if you want the opposite
/* print yes if both a and b greater than zero */
/* print no if both a and b filess than zero */
if(a >= 0) {
if(b >= 0)
printf (" yes\n");
else
printf ("no\n");
}
10

- Combining ifConditions
- Sometimes we want to combine conditions :
- If both conditions are true then execute some statements
- If either conditions are true then execute some statements
- If one or other condition is true then execute some statements
- ...
- Already seen one way to do this - nested if
- Can also used Boolean (logical )operators to create
compound conditions
11

Boolean Operators
Operator Operation
! logical NOT
&& logical AND
|| logical OR
12

Compound Condition Example
1a = -5;
2b = 10;
3
4/* print yes if both a and b greater than zero */
5/* print no if both a and b filess than zero */
6if(a >= 0 && b >= 0)
7 printf (" yes\n");
8else
9 printf ("no\n");
13

### Precedence and Associativity
14

- Boolean Expression Evaluation
- C usually does notspecify the order of evaluation of the
operands of an operator:
(4 - 7) + (2 - 6)
- Good code does not rely on evaluation order
- C uses short-circuit evaluation to evaluate expressions
connected by &&or||from fileft to right
- Evaluation stops once truth or falsehood is known
15

Boolean Expression Examples
1int a = 1, b = 2, c = 3;
2
3
4a == 1 && b == 3
5
6a == 1 || b == 3
7
8a == 1 || b == 4 && c == 5
9
10(a == 1 || b == 4) && c == 5
11
12! b - 2 == 1
13
14! (b - 2 == 1)
15
16! a == 2 && b == 2
17
18!(a == 2 && b == 2)
16

- Multiple Tests
- Sometimes we want to perform multiple tests
- Could use else if as discussed above
if(c == 'a ')
statement ;
else if(c == 'b ')
statement ;
else if(c == 'c ')
statement ;
else
statement ;
17

- switch Statement
- C also provides switch statement:
switch (c) {
case 'a ':
statement ;
statement ;
...
break ;
case 'b ':
statement ;
statement ;
...
break ;
default :
statement ;
statement ;
...
break ;
}
18

- switch Syntax
switch ( expression ) {
case const - expression :
statements
case const - expression :
statements
default :
statements
}
- Allcase constant expressions need to be dierent
- If case matches expression, statements in case executed
- Execution then falls through to next case
- Usually put break at end of case statements to
immediately exit switch , often also use return
- default case statements are executed if no case matches
- Can also combine cases
19

- Summary
- Conditional execution in C: if,else
- Statement blocks
- Nested conditional statements: else association
- Boolean operators :&& || !
- Compound conditions :
- Order of evaluation
- Short-circuit evaluation
- switch statement
20

- Activities
- Read K&R Chapter 2.11-2.12 andChapter 3.1-3.4
21


---

## 10-Loops

**📚 Source:** comp1005-10-loops.pdf

**📄 Total Pages:** 21

---

- Overview
- Loops in C
- Loop examples
- Nested loops
1

- Loops
- Execute a series of statements repeatedly
- Until some condition is met, or sometimes inde nitely
- Use loops to:
- Do something a set number of times
- Step over a set of data values
- Iteratively calculate a particular value
- Wait until some input is received
- Most interactive programs spend a lot of time in loops
- C provides three dierent types of loops:
- while
- do-while
- for
2

- while Loops
- Thewhile loop has two parts:
- acondition
- astatement orstatement block to execute
- While the condition evaluates to true then execute statement
while ( condition )
statement ;
while ( condition ) {
statement ;
statement ;
...
}
4

- Howwhile Works
- First, the condition is evaluated
- If false, the statement/block is skipped
- If true, the statement/block is executed
- Control is returned to the top of the loop
- The condition is evaluated flagain
- ...
- Statements can alter the value of variables
- And so change whether the condition is true
1a = 0;
2while (a < 2) {
3 printf (" hello \n");
4 a++;
5}
5

- do-while Loops
- Very similar to while , but moves the condition to end of
loop
- Loop statements executed at fileast once
- Note the ;after the condition
do
statement ;
while ( condition );
do {
statement ;
statement ;
...
} while ( condition );
7

do-while andwhile Compared
1c = -1;
2while (!(c == 'e '|| c == 'p ')) {
3 c = getchar ();
4}
1do {
2 c = getchar ();
3} while (!(c == 'e '|| c == 'p '));
8

- for Loops
- Counting is a very common thing to do in a program:
- start at one value
- count up (or down) in steps
- until you reach some value
- Use the for loop in C to do this:
for ( expr1 ; expr2 ; expr3 )
statement ;
for ( expr1 ; expr2 ; expr3 ) {
statement ;
statement ;
...
}
10

- for Loop Syntax
for ( expr1 ; expr2 ; expr3 )
statement ;
for ( expr1 ; expr2 ; expr3 ) {
statement ;
statement ;
...
}
- expr1 : executed once before loop starts -initialise
counter variable
- expr2 : executed before every iteration -test counter
variable
- expr3 : executed after every iteration -update counter
variable
11

for Loop Examples
1for (i = 0; i < 3; i++) {
2 printf ("%d\n", i);
3}
1for (i = 1; i < 20; i *= 2) {
2 printf ("%d\n", i);
3}
12

- for Loop Notes
- Expressions are optional :
for (i = 0; i < 3;) {
printf ("%d\n", i);
i++;
}
- Butsemi-colons are not
- What does this do?
for (;;);
13

- Escaping Loops
- C provides a way to exit a loop early
- Uses the break instruction
- Almost always used with a conditional
- Escapes from the current loop only
- Works with loops ( for ,while ,do-while ) only, not if
statements
1for (i = 0; i < 10; i++) {
2 if(i == 2)
3 break ;
4 printf ("%d\n", i);
5}
14

- Continuing Loops
- C provides a way to jump to the next iteration of a loop
- Uses the continue instruction
- Almost always used with a conditional
- Continues the current loop only
- Works with loops ( for ,while ,do-while ) only, notif
statements
1for (i = 0; i < 10; i++) {
2 if(i == 2)
3 continue ;
4 printf ("%d\n", i);
5}
15

- Comparing for andwhile
for ( expr1 ; expr2 ; expr3 )
statement ;
expr1 ;
while ( expr2 ) {
statement ;
expr3 ;
}
- Which do you use?
- Largely personal preference , but some rules of thumb:
- if there is a simple initialization and increment then use for
- if there is no initialization or increment, use while
- readability andeconomy
16

for andwhile Examples
1for (i = 0; i < 10; i++)
2 printf ("%d\n", i);
1i = 0;
2while (i < 10) {
3 printf ("%d\n", i);
4 i++;
5}
1i = 0;
2while (i < 10)
3 printf ("%d\n", i ++);
17

- Nested Loops
- Can embed ( nest ) one loop inside another
- Including loops of dierent types e.g.

for inside while
- The inner loop will be executed inside every iteration of the
outer loop
1for (i = 1; i <= 10; i++) {
2 for (j = 1; j <= i; j++) {
3 printf ("%d ", j);
4 }
5 printf ("\n");
6}
18

- Summary
- Three types of loop in C: for ,while ,do-while
- Statement blocks
- Exiting loops: break
- Continuing loops: continue
- Nested loops
19

- Activities
- Read K&R Chapter 3.5-3.7 on loops
- Review K&R Chapters 1 to 3 andChapter 4.1-4.2 - we
have covered almost all of this
20


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

