# 04 Variables And Types

*Last Updated: 2025-12-05 03:13*

---

## Quick Navigation

- [05-Introduction Variables](#05-introduction-variables)
- [06-Variable Concepts](#06-variable-concepts)
- [21-User Defined Data Types](#21-user-defined-data-types)
- [22-Composite Data Types](#22-composite-data-types)

---

## 05-Introduction Variables

**📚 Source:** comp1005-05-introduction_variables.pdf

**📄 Total Pages:** 14

---

- Overview
- Variable types and quali ers
- Variable declaration
- Variable naming
- Variable assignment
- Constants
1

- Data
- Program =Algorithms +Data Structures
- Algorithms manipulate data (stored in data structures) to
perform a task
- In C, data is stored in variables
- Variables are references to memory locations
- Variables allow us to use names rather than memory
addresses to access and manipulate data
2

- Variable Types
- In C, variables have a type
- A variable's type defines what data type the variable stores
- C provides some basic types
- And some type quali ers
- Possible to de ne flour own complex types
- C variable types :
Type Stores Size
char one byte, holds one ASCII character 8 bits
int integer 32 bits
float single-precision oating point 32 bits
double double-precision oating point 64 bits
3

- Type Quali ers
- C has four type quali ers which can be used in conjunction
with variable types:
- signed orunsigned
- short orlong
- Compiler/OS defines size (amount of memory) of integer
types
- Not set in the standard: short <=int<=long
- Values in table on previous slide are for 64-bit Linux
- sizeof() operator return storage size in bytes
4

- Function De nitions Revisited
- Function de nition syntax :
return - type function - name ( parameter declarations )
{
variable declarations
statements
}
5

- Variable Declaration
- Variables must be declared before use
- Variables must be declared in the declaration section at the
start of a function before any statements
- A declaration defines the type of the variable
- Variable declaration syntax :
[ variable - qualifier ] variable - type name ;
- Declared by putting the type followed by the variable name,
followed by a semicolon
- Variables cannot be given some names ( reserved words )
6

Reserved Words
auto double int struct
break else long switch
case enum register typedef
char extern return union
const oat short unsigned
continue for signed void
default goto sizeof volatile
do if static while
7

Example Variable Declarations
int a;
char c;
double mean , sd;
unsigned int x1;
short int alpha , beta ;
long big_num ;
8

- Naming Conventions
- Variable names must begin with a filetter , followed by any
number of filetters ,digits orunderscore
- Often use lowercase variable names, underscore for space
input file
- Can use camel case too:
inputFile
- Usemeaningful names i.e.

name related to what the
variable stores - code readability
- Short names are generally better:
character read from keyboard
keyChar ,keypress ,key
- Shortest names for local variables or loop indices: i,j,kare
often used for loop counters, cfor characters
9

- Variable Assignment
- The value stored in a variable is set using the assignment
operator =
- Give the variable name, followed by the assignment operator,
followed by the value:
pi = 3.142;
- Can be combined with declaration to set an initial value
- If variable declared but no initial value assigned, the variables
value is indeterminate
- Some compilers set to zero - do not assume this though
- Value assigned can be a constant, another variable, expression
or the return value from a function
double pi = 3.142;
double pi = 22 / 7;
double pi = C / d;
double pi = calculate_pi ();
10

- Constants
- Aconstant (literal ) is a  xed value
- C has integer ,oating-point ,character andstring
constants
- The value of a constant cannot be modi ed
- In C, constants have a type too:
- 3 is an integer
- 3.0 is a double (contains decimal point)
- 3L is a long integer
- 3UL is a unsigned long integer
- This can cause interesting behaviour:
double f = 3 / 2 ;
- Also happens when using variables
11

- Summary
- Variable types :four basic types
- Variable type quali ers :four quali ers
- Declare variables before use
- Name variables following naming conventions
- Assignment operator =
- Constants : have type too
12

- Activities
- Read K&R Chapter 1 - A Tutorial Introduction and try the
exercises in this chapter
13


---

## 06-Variable Concepts

**📚 Source:** comp1005-06-variable_concepts.pdf

**📄 Total Pages:** 10

---

- Overview
- Variable storage class
- Variable scope
- Variable lifetime
1

- Variable Properties
- Variables in C (and in general) have two properties :
- type - determines meaning of value stored
- storage class - determines scope andlifetime of value
- type already discussed: char ,int,float ,double
- C has two storage classes :
- automatic :
- local to block (curly brackets)
- destroyed on exit from block
- static :
- local to block or external to all blocks
2

- Variable Storage Class
- Storage class determined by:
- declaration context
- keywords auto andstatic
- Automatic storage class :
- declared inside block
- use keyword auto (optional)
- Static storage class :
- declared inside block with keyword static
- declared outside all blocks
3

- Variable Scope
- Variable scope determines which parts of a program can
access the variable i.e.

where variable name is valid
- Local scope :
- only accessible in a particular block of code (usually a
function)
- Global scope :
- accessible from anywhere in program
- Scope determined by storage class
- Automatic variables :
- scope local to block they are declared in
- Static variables :
- scope local to block they are declared in
- orglobal scope if declared outside all blocks
4

- Global and Local Naming
- Global and local variables can have same name
- This is technically allowed
- Block only sees the local variable
- Donotdo this!
5

- Variable Lifetime
- Storage type also determines variable lifetime (also called
variable extent )
- Variable lifetime is how long a variable has valid memory
- Automatic variables :
- only while execution in code block
- Static variables :
- entire duration of program execution
6

Example
int p; /* static , global , entire program */
static char k; /* static , global , entire program */
int main ( int argc , char ** argv )
{
double *z; /* automatic , local , function block */
...
}
void f1( int w)
{
static unsigned int x; /* static , local , entire program */
...
}
int f2( void )
{
unsigned int y; /* automatic , local , function block */
...
}7

- Summary
- Variable properties :
- type
- storage class
- scope
- lifetime
8

- Activities
- Read through these Wikipedia pages and associated links:
https://en.wikipedia.org/wiki/Variable_(computer_science)
https://en.wikipedia.org/wiki/Scope_(computer_science)
9


---

## 21-User Defined Data Types

**📚 Source:** comp1005-21-user_defined_data_types.pdf

**📄 Total Pages:** 7

---

- Overview
- User-de ned data types
1

- Data Types Recap
- C provides four data types :
int ,char ,double ,float
- Can expand with four type modi ers:
unsigned ,signed ,short ,long
- Alsovoid type ( typeless type )
- Can also create flour own names for data types
2

- User-De ned Data Types
- C allows us to create alias for existing data type
- Usetypedef keyword to create alias:
typedef type alias;
1typedef double Decimal ;
2
3...
4
5Decimal a;
6
7Decimal add_decimals ( Decimal x, Decimal y)
8{
9 ...
10}
3

- typedef Details
- typedef hasscope :
- local : declared inside a statement block - type only available
inside that block
- global : declared outside function block - type available in
entire program
- typedef is an alias, can also use underlying type
- Why use typedef ?
- portability for libraries
- clarity with complex data types
1typedef double Decimal ;
2Decimal add_decimals ( Decimal , Decimal );
3...
4double b, c;
5
6add_decimals (b, c);
4

- Summary
- User-de ned data types: typedef
- Scope and interchangeability of typedef
5

- Activities
- Read K&R Chapter 6.7
6


---

## 22-Composite Data Types

**📚 Source:** comp1005-22-composite_data_types.pdf

**📄 Total Pages:** 18

---

- Overview
- Composite data types
1

- Composite Data Types
- Often data is a related set of values
- For example, student record:
- ID number
- First name
- Last name
- Date of birth
- Data might be of dierent types
- Would be nice to group data (variables) together
- One solution is to use a composite data type
- C uses structures to provide composite data types
2

- struct Declaration
- Usestruct keyword to declare composite data type
- Variables inside struct are called members
- Often capitalise type name of struct
struct name {
type name ;
type name ;
...
};
struct StudentRecord {
int id;
char first_name [256];
char last_name [256];
char dob [256];
};
3

- struct Variable Declaration
- Can now declare and use variables of this type:
struct struct-name var-name;
- Can set initial values in variable declaration using curly
brackets
1struct StudentRecord {
2 int id;
3 char first_name [256];
4 char last_name [256];
5 char dob [256];
6};
7
8struct StudentRecord record ;
9struct StudentRecord record = {10 , " Albert ", \
10 " Camus ", " 07/11/1913 "};
4

- Combined Type and Variable Declaration
- Can combine type declaration andvariable declaration
1struct StudentRecord {
2 int id;
3 char first_name [256];
4 char last_name [256];
5 char dob [256];
6} record ;
5

- typedef andstruct
- Usetypedef keyword to avoid using struct in variable
declaration
1typedef struct StudentRecord {
2 int id;
3 char first_name [256];
4 char last_name [256];
5 char dob [256];
6} StudentRecord ;
7
8StudentRecord record ;
6

- struct Member Access
- Access struct members with the member operator .
1typedef struct StudentRecord {
2 int id;
3 char first_name [256];
4 char last_name [256];
5 char dob [256];
6} StudentRecord ;
7
8StudentRecord record ;
9
10record .id = 20;
11strcpy ( record .

first_name , " Albert ");
7

- Nested struct
- struct can also be nested
1typedef struct Date {
2 int day ;
3 int month ;
4 int year ;
5} Date ;
6
7typedef struct StudentRecord {
8 int id;
9 char first_name [256];
10 char last_name [256];
11 Date dob;
12} StudentRecord ;
13
14StudentRecord record = {10 , " Albert ", \
15 " Camus ", {07 , 11, 1913}};
16
17record .

dob.

day = 7;
8

- struct Operations
- Can access struct members using member operator
- Can assign orcopy struct as a unit:
record2 = record1;
- Can  nd the address ofstruct :
&record1;
- Can pass struct as a function argument :
print record(record1);
- Cannot compare, add, ...

struct
9

- struct Arrays
- Can have arrays ofstruct
- Declared and accessed in the same way as any other array
1StudentRecord records [10];
2
3records [0].

id = 10;
4records [3].

dob .day = 7;
10

- Pointers to struct
- Can have pointers tostruct
- Access members by dereferencing and using member
operator
- Same but better to use the arrow operator ->
1StudentRecord records [10] , *p;
2
3p = records ;
4(*p).

id = 10;
5p->id = 10;
11

- Dynamic Memory Allocation
- Can dynamically allocate memory for structures
- Usesizeof operator to determine number of bytes in
struct
- Size (number of bytes) of struct not always the sum of the
size of its members - data type alignment requirements - see
\The Lost Art of Structure Packing" by Eric S.

Raymond:
http://www.catb.org/esr/structure-packing/
1StudentRecord * records ;
2
3records = ( StudentRecord *) calloc (10 , \
4 sizeof ( StudentRecord ));
12

- Function Calls
- Can pass struct asfunction arguments
- Function gets copy of the struct
- Every time function called, struct needs be copied -
inecient
- More ecient to pass struct as pointer
- Only pointer passed and entire struct not copied
13

Function Calls Example 1
1void update_record ( StudentRecord a)
2{
3 ...
4
5 a.id = 10;
6
7 ...
8}
9
10...
11
12StudentRecord record ;
13
14...
15
16update_record ( record );
14

Function Calls Example 2
1void update_record ( StudentRecord *a)
2{
3 ...
4
5 a->id = 10;
6
7 ...
8}
9
10...
11
12StudentRecord record ;
13
14...
15
16update_record (& record );
15

- Summary
- Composite data types - struct :
- Declaration
- Access: member operator .and arrow operator ->
- Nested structures
- Arrays and pointers to structure
- Functions and structures
16

- Activities
- Read K&R Chapters 6.1-6.7
17


---

## 📝 Key Takeaways

*Review the main concepts from this section to solidify your understanding.*

---

