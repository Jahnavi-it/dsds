const T = (title, notes) => ({ title, notes });

const c = [
  T('Introduction and Program Structure', ['A C program starts at main(); compile with gcc file.c -o file.', 'Steps: preprocessing, compilation, assembly and linking.', 'The #include line adds header files such as stdio.h.']),
  T('Data Types, Variables and Operators', ['Basic types: int, float, double and char; sizes depend on the system (int is usually 4 bytes).', 'Operators: arithmetic, relational, logical, bitwise and assignment; integer division drops the fractional part.', 'Use const for values that must not change.']),
  T('Input and Output', ['printf prints using format specifiers: %d int, %f float, %c char, %s string.', 'scanf reads input and needs the address (&x) for normal variables.', 'Use fgets instead of gets for safe string input.']),
  T('Control Statements', ['if-else, switch, for, while and do-while control the flow; break exits a loop and continue skips to the next round.', 'switch works on int or char values and needs break to stop fall-through.', 'do-while runs at least once.']),
  T('Functions and Recursion', ['A function has a declaration, a definition and calls; C passes arguments by value.', 'Recursion needs a base case and every call uses stack memory.', 'Pass pointers to let a function change the caller variables.']),
  T('Arrays', ['Array indexes start at 0 and C does not check bounds.', '2D arrays are stored row by row in memory.', 'An array name gives the address of its first element.']),
  T('Strings', ['A C string is a char array that ends with the null character (NUL).', 'string.h has strlen, strcpy, strcmp and strcat.', 'Make the array big enough for the text plus the NUL character.']),
  T('Pointers', ['A pointer stores the address of a variable; & gives the address and * gives the value.', 'Pointer arithmetic moves by the size of the type.', 'A NULL pointer points to nothing and dereferencing it crashes the program.']),
  T('Dynamic Memory Allocation', ['malloc, calloc and realloc allocate heap memory and free releases it.', 'Forgetting free causes a memory leak; using freed memory is a dangling pointer bug.', 'calloc sets the memory to zero; malloc does not.']),
  T('Structures and Unions', ['A struct groups different data types; use . for members and -> with pointers.', 'A union shares one memory location among all members, so its size equals the largest member.', 'typedef gives a shorter name to a type.']),
  T('Storage Classes and Preprocessor', ['Storage classes: auto, register, static and extern.', 'A static local variable keeps its value between function calls.', '#define creates macros and #ifdef is used for conditional compilation.']),
  T('File Handling', ['fopen opens a file in modes r, w or a and fclose closes it.', 'Use fprintf, fscanf, fgets and fputs for text; fread and fwrite for binary data.', 'Always check that fopen did not return NULL.'])
];

const cpp = [
  T('C++ Basics and I/O', ['cout << prints and cin >> reads; include iostream and use namespace std.', 'C++ adds references, function overloading, default arguments and inline functions.', 'A reference is an alias for an existing variable.']),
  T('Classes and Objects', ['A class bundles data and functions; an object is an instance of a class.', 'Access specifiers: private, protected and public (members are private by default in a class).', 'The this pointer refers to the current object.']),
  T('Constructors and Destructors', ['A constructor initialises an object; it has the class name and no return type.', 'Types: default, parameterised and copy constructor.', 'A destructor (~ClassName) cleans up when the object is destroyed.']),
  T('Inheritance', ['Types: single, multiple, multilevel, hierarchical and hybrid.', 'The diamond problem in multiple inheritance is solved with virtual inheritance.', 'The base class constructor runs before the derived class constructor.']),
  T('Polymorphism and Virtual Functions', ['Compile-time polymorphism: function and operator overloading; run-time: virtual functions.', 'A virtual function is chosen by the actual object type through the vtable.', 'A pure virtual function (= 0) makes a class abstract.']),
  T('Operator Overloading and Friend Functions', ['Operator overloading gives operators a meaning for user-defined types.', 'A friend function can access private members without being a member.', 'Operators :: . .* and ?: cannot be overloaded.']),
  T('Templates', ['Templates let you write generic functions and classes for any data type.', 'Example: template <typename T> T maxOf(T a, T b).', 'The compiler creates a separate version for every type used.']),
  T('STL Containers', ['Main containers: vector, list, deque, set, map, unordered_map, stack, queue and priority_queue.', 'vector is a dynamic array with O(1) access; map is sorted with O(log n); unordered_map is hash based with average O(1).', 'Iterators walk through container elements.']),
  T('STL Algorithms', ['sort, reverse, find, binary_search, max_element and accumulate come from the algorithm and numeric headers.', 'sort runs in O(n log n) and takes begin and end iterators.', 'Use a lambda or comparator for custom ordering.']),
  T('Smart Pointers and Memory', ['new allocates and delete frees; new[] pairs with delete[].', 'unique_ptr owns one object and shared_ptr counts owners; both free memory automatically.', 'RAII: acquire resources in constructors and release them in destructors.']),
  T('Exception Handling', ['Use try, throw and catch to handle errors.', 'Catch by reference and order catch blocks from specific to general.', 'Destructors should not throw exceptions.'])
];

const java = [
  T('Java Basics and JVM', ['Java source compiles to bytecode that the JVM runs, which makes Java platform independent.', 'JDK has the development tools, JRE runs programs and JVM executes bytecode.', 'Entry point: public static void main(String[] args).']),
  T('Data Types and Operators', ['Primitives: byte, short, int, long, float, double, char and boolean.', 'Strings and arrays are objects; == compares references and equals compares content.', 'Wrapper classes such as Integer and Double support autoboxing.']),
  T('Control Flow and Arrays', ['Loops and decisions: if, switch, for, for-each, while and do-while.', 'Arrays have a fixed size, a length field and start at index 0.', 'ArrayIndexOutOfBoundsException occurs for an invalid index.']),
  T('Classes, Objects and Constructors', ['A class defines fields and methods; new creates an object.', 'Constructors have the class name, no return type and can be overloaded.', 'this refers to the current object; static members belong to the class.']),
  T('Inheritance and Polymorphism', ['extends inherits from a class; Java has no multiple inheritance of classes.', 'Overloading is compile-time polymorphism; overriding is run-time polymorphism.', 'super calls the parent constructor or method.']),
  T('Abstract Classes and Interfaces', ['An abstract class can have abstract and normal methods and cannot be instantiated.', 'A class can implement many interfaces; an interface defines a contract.', 'Since Java 8, interfaces can have default and static methods.']),
  T('Access Modifiers, Packages and final', ['private, default (package), protected and public control visibility.', 'Packages group related classes and avoid name clashes.', 'A final variable cannot change, a final method cannot be overridden, a final class cannot be extended.']),
  T('String, StringBuilder and StringBuffer', ['String is immutable; StringBuilder is mutable and fast; StringBuffer is mutable and thread-safe.', 'The string pool stores literals to save memory.', 'Use StringBuilder for concatenation inside loops.']),
  T('Exception Handling', ['Keywords: try, catch, finally, throw and throws.', 'Checked exceptions must be handled at compile time; unchecked exceptions (RuntimeException) need not be.', 'finally runs whether or not an exception happens; try-with-resources closes resources automatically.']),
  T('Collections Framework', ['List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap) and Queue.', 'ArrayList gives fast random access; LinkedList suits frequent inserts and deletes.', 'HashMap stores key-value pairs using hashing and allows one null key.']),
  T('Generics, Lambdas and Streams', ['Generics give type safety, for example List<String>.', 'A lambda is a short anonymous function; a functional interface has one abstract method.', 'Streams process collections with filter, map and collect.']),
  T('Multithreading', ['Create threads by extending Thread or implementing Runnable.', 'synchronized stops two threads from using a block at the same time.', 'Thread states: new, runnable, running, blocked or waiting, terminated.']),
  T('Memory Management and Garbage Collection', ['The heap stores objects; the stack stores method calls and local variables.', 'The garbage collector frees objects that are no longer referenced.', 'OutOfMemoryError and StackOverflowError are common memory errors.']),
  T('File I/O and JDBC', ['Read files with File, FileReader, BufferedReader or Scanner.', 'JDBC connects Java to a database using DriverManager, Connection, Statement and ResultSet.', 'Use PreparedStatement to prevent SQL injection.'])
];

const python = [
  T('Python Basics', ['Python is interpreted and dynamically typed, and indentation defines blocks.', 'Run a program with python file.py; comments start with #.', 'Variables need no type declaration.']),
  T('Data Types and Operators', ['Main types: int, float, str, bool, list, tuple, set and dict.', '// is floor division, ** is power, and, or and not are logical operators.', 'is compares identity, == compares value.']),
  T('Control Flow', ['if-elif-else, for, while, break, continue and pass.', 'for loops iterate over any sequence; range(n) gives 0 to n-1.', 'A loop can have an else block that runs when no break happened.']),
  T('Strings', ['Strings are immutable; slicing uses s[start:stop:step].', 'Useful methods: split, join, strip, replace, upper, lower and find.', "f-strings format text, for example f'Hello {name}'."]),
  T('Lists and Tuples', ['Lists are mutable ordered collections; tuples are immutable.', 'List methods: append, extend, insert, remove, pop and sort.', 'List comprehension: [x*x for x in range(5)].']),
  T('Dictionaries and Sets', ['A dict stores key-value pairs with average O(1) lookup; keys must be immutable.', 'A set stores unique values and supports union, intersection and difference.', 'Use dict.get(key, default) to avoid a KeyError.']),
  T('Functions', ['def defines a function and return sends a value back.', 'Default, keyword, *args and **kwargs arguments are supported.', 'Lambda makes short anonymous functions; functions are first-class objects.']),
  T('Modules and Packages', ['import brings in modules such as math, random, datetime and os.', 'pip installs third-party packages; use a virtual environment for each project.', "if __name__ == '__main__' runs code only when the file is run directly."]),
  T('File Handling', ['open(name, mode) with modes r, w and a; use the with statement to close the file automatically.', 'Read using read, readline or readlines.', 'The csv and json modules handle common file formats.']),
  T('Exception Handling', ['Use try, except, else, finally and raise.', 'Catch specific exceptions like ValueError and ZeroDivisionError.', 'Custom exceptions extend the Exception class.']),
  T('OOP in Python', ['A class defines a type; __init__ is the constructor and self is the current object.', 'Inheritance: class Child(Parent); call the parent with super().', 'Special methods like __str__ and __len__ customise behaviour.']),
  T('Iterators, Generators and Decorators', ['A generator uses yield to produce values one at a time and saves memory.', 'A decorator wraps a function to add behaviour and is applied with @name.', 'An iterator implements __iter__ and __next__.']),
  T('Important Libraries', ['NumPy for arrays, Pandas for tables and Matplotlib for charts.', 'requests makes HTTP calls; Flask and Django build web apps.', 'Read a CSV file with pandas.read_csv.']),
  T('Python Interview Traps', ['The GIL lets only one thread run Python bytecode at a time, so use multiprocessing for CPU-bound work.', 'Never use a mutable default argument like def f(x=[]); use None instead.', 'A shallow copy copies references; a deep copy copies nested objects too.'])
];

const oops = [
  T('Core Concepts', ['Four pillars: encapsulation, abstraction, inheritance and polymorphism.', 'A class is a blueprint and an object is an instance.', 'OOP models real-world entities with data and behaviour.']),
  T('Encapsulation', ['Bind data and methods together and hide data using private access.', 'Provide getters and setters for controlled access.', 'Benefits: security, flexibility and easy maintenance.']),
  T('Abstraction', ['Show only essential details and hide the implementation.', 'Achieved using abstract classes and interfaces.', 'Abstraction hides complexity; encapsulation hides data.']),
  T('Inheritance', ['A child class reuses the fields and methods of a parent class.', 'Types: single, multilevel, hierarchical, multiple and hybrid.', 'Use inheritance for is-a relations and composition for has-a relations.']),
  T('Polymorphism', ['Compile-time: method and operator overloading; run-time: method overriding.', 'Overloading means same name with different parameters; overriding means same signature in a child class.', 'One interface, many forms.']),
  T('Constructors, Destructors and this', ['Constructors initialise objects; destructors or garbage collection clean up.', 'A copy constructor creates an object from another object.', 'this refers to the current object.']),
  T('Association, Aggregation and Composition', ['Association means objects are related; aggregation is has-a with independent lifetimes; composition is has-a where the part dies with the whole.', 'A Car has an Engine (composition); a Team has Players (aggregation).', 'Prefer composition over inheritance for flexibility.']),
  T('SOLID Principles', ['Single responsibility, Open-closed, Liskov substitution, Interface segregation and Dependency inversion.', 'They make code easier to extend and test.', 'Interviewers often ask for one example of each.']),
  T('Design Patterns Basics', ['Creational: Singleton, Factory, Builder. Structural: Adapter, Decorator. Behavioural: Observer, Strategy.', 'Singleton allows only one instance of a class.', 'Patterns are reusable solutions to common design problems.']),
  T('OOP Interview Questions', ['Abstract class vs interface: an abstract class can hold state and constructors; an interface defines a contract.', 'Know overloading vs overriding and static vs dynamic binding.', 'Know shallow copy vs deep copy.'])
];

const communication = [
  T('Self-Introduction', ['Structure: name and education, key skills and projects, strengths, career goal.', 'Keep it to 60 to 90 seconds.', 'Do not repeat your resume line by line.']),
  T('Body Language and Etiquette', ['Sit straight, keep eye contact, smile naturally and avoid fidgeting.', 'Greet the panel and give a firm handshake.', 'Be on time and dress formally.']),
  T('Spoken English and Pronunciation', ['Speak slowly and clearly; listen to good speakers to reduce mother tongue influence.', 'Practise daily by speaking aloud, recording yourself and repeating after videos.', 'Use simple sentences instead of difficult words.']),
  T('Listening Skills', ['Listen fully before answering and do not interrupt.', 'Note the key words of the question and ask politely if you did not understand.', 'Nod and respond to show interest.']),
  T('Group Discussion', ['Start with a short point, support it with facts and let others speak.', 'Do not shout or interrupt; summarise if the discussion goes in circles.', 'Common topics: technology, education, current affairs and social issues.']),
  T('JAM (Just A Minute)', ['Speak for one minute on a topic without long pauses.', 'Structure: introduction, two or three points, conclusion.', 'Practise daily with random topics.']),
  T('Email and Professional Writing', ['Email structure: subject line, greeting, purpose, details, closing and name.', 'Be short, polite and specific.', 'Proofread for spelling and grammar before sending.']),
  T('Resume and Cover Letter Writing', ['Resume: one page with contact details, education, skills, projects and achievements.', 'Use action verbs and numbers, for example built a web app used by 200 students.', 'Match the resume to the job description.']),
  T('Presentation Skills', ['Plan an opening, three main points and a closing; keep few words on each slide.', 'Stand confidently, speak to the audience and use examples.', 'Practise with a timer and prepare for questions.']),
  T('Telephonic and Video Interviews', ['Check internet, camera and microphone before the call.', 'Use a quiet place with good light and a neat background.', 'Keep notes nearby but do not read from them.']),
  T('Situational and Behavioural Answers (STAR)', ['Use STAR: Situation, Task, Action, Result.', 'Choose real examples from projects, teamwork and college life.', 'End by saying what you learned.'])
];

module.exports = [
  { id: 'c', icon: '🔧', topics: c },
  { id: 'cpp', icon: '➕', topics: cpp },
  { id: 'java', icon: '☕', topics: java },
  { id: 'python', icon: '🐍', topics: python },
  { id: 'oops', icon: '🧱', topics: oops },
  { id: 'communication', icon: '🗣️', topics: communication }
];