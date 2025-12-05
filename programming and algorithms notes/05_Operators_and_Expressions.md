# 05 Operators And Expressions

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [08-Operators](#08-operators)

---

## 08-Operators

**📚 Source:** comp1005-08-operators.pdf

**📄 Total Pages:** 14

---

- Overview
- Operator concepts
- Operators in C
1

- Operators
- Operators are used to manipulate or test values ( operands )
- Operators perform operations (operate on) on operands
- Operands (just like function arguments) can be constants,
variables, functions, ...
- 2 * 3.142
- 2 * pi
- 2 * calculate pi()
- Operators return a value (just like a function):
- Result of speci ed calculation
- Boolean : 0 (FALSE) or 1 (TRUE)
2

- Operator Properties
- Operator arity - how many operands: one ( unary ), two
(binary ) or three ( ternary )
- Operator position: pre x ,in x orpost x
a = b
a + b
a++
--b
a ? 1 : 0
- Operators can perform type conversions
- Operators have precedence andassociativity
3

Arithmetic Operators
Operator Operation
* multiplication
/ division
+ addition
- subtraction
% modulus (remainder)
++ increment
-- decrement
4

- Increment/Decrement Operators
- C provides two special increment (++) and decrement (--)
operators
- Idiomatic C style:
x = x + 1;
x++; /* better */
y = y - 1;
y --; /* better */
- Pre x (e.g.

++x ) -increment then use
- Post x (e.g.

x++ ) -use then increment
5

- Type Conversion
- Operators can convert the type of their operands - type
conversion
- General rule: \ narrower " to \ wider " type without losing
information
3 / 2 = ?
3.0 / 2 = ?
3 % 2 = ?
3.0 % 2 = ?
- Certain operators only work with speci c types e.g.

modulus
operator
6

- Precedence and Associativity
1 + 2 * 3 = ?
8 / 4 / 2 = ?
- Precedence : how terms are grouped in an expression and
how expression evaluated
- Higher precedence = evaluated sooner
- Associativity : how terms containing operators of same
precedence are evaluated
- Left-associative : evaluated fileft to right
- Right-associative : evaluated right to fileft
7

### Precedence and Associativity
8

Bitwise Operators
Operator Operation
& bitwise AND
| bitwise OR
ˆ bitwise XOR
˜ bitwise NOT
>> bitwise right shift
<< bitwise fileft shift
9

- Assignment Operators
- C provides a range of assignment operators :
= += -= *= /= %= ˆ= |= >>= <<=
- Return assigned value
- Idiomatic C style:
x = x + 2;
x += 2; /* better */
a = a * 3;
a *= 3; /* better */
10

- Relational Operators
Operator Operation
< filess than
<= filess than or equal to
> greater than
>= greater than or equal to
== equal to
!= not equal to
- Return 0 or 1 - FALSE orTRUE respectively
11

- Summary
- Operators, operations and operands:
- Arity : unary, binary, ternary
- Position : pre x, in x, post x
- Precedence andassociativity
- Type conversion
- Operators in C:
- Arithmetic
- Bitwise
- Assignment
- Relational
12

- Activities
- Read K&R Chapter 2 up to 2.11 and do the exercises in this
chapter
13


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

