// Company-specific notes built from publicly shared interview experiences.
// Q(question, tip, sourceNumber): the question text follows what the source reports; the tip is a short study hint.
// Sources are marked 'experience' (a candidate's own account) or 'guide' (a prep site's sample or typical questions).
// Questions and rounds change every year, so treat this as practice material, not as a fixed paper.

const S = (title, url, type) => ({ title, url, type });
const Q = (q, a, s) => ({ q, a: a || '', s: s || 0 });
const R = (name, note, questions) => ({ name, note: note || '', questions: questions || [] });

const NOTES = {
  tcs: {
    summary: 'TCS NQT has a Foundation section (numerical, verbal, reasoning) and an Advanced section with tougher aptitude and coding. Interviews are short: your project, basics of C/OOP/SQL, then relocation, shifts and the TCS service agreement.',
    prepFocus: [
      'Write small C programs on paper: palindrome number, matrix multiplication.',
      'Be able to explain encapsulation vs abstraction in two lines each.',
      'Prepare honest answers on relocation, night shifts and the service agreement.',
      'Know your project well enough to answer "what challenge did you face?"'
    ],
    sources: [
      S('placementpreparation.io: TCS NQT sample questions (not confirmed as the actual paper)', 'https://placementpreparation.io/tcs-nqt/interview-experience', 'guide'),
      S('GeeksforGeeks: TCS NQT Interview Experience', 'https://www.geeksforgeeks.org/?p=375234', 'experience'),
      S('GeeksforGeeks: TCS NQT Interview Experience 2021', 'https://www.geeksforgeeks.org/?p=542099', 'experience')
    ],
    rounds: [
      R('NQT Foundation: numerical, verbal, reasoning', 'Topics reported: distributing objects between two boxes, a flight where half of the passengers get down at each stop, blood relations ("G is the mother of H..."), number series, fill in the blanks and sentence ordering. Aptitude topics seen: ratio, percentages, time and work, probability, permutations and averages.'),
      R('NQT Advanced: aptitude and coding', 'Advanced aptitude reported: arranging seven people when two must not stand together, planting shrubs in rows of 8, 12 and 16, and family-relation puzzles. The coding section is usually one easy and one medium problem.', [
        Q('A chef has N ingredients to distribute among three dishes so that exactly one dish gets the maximum number of ingredients (statement shortened by the source).', 'Read the constraints first, then count valid distributions with loops or simple maths. Practise "count the ways" problems.', 1),
        Q('One easy and one medium coding problem in the NQT online test.', 'Practise arrays, strings and number problems. Easy ones need loops and conditions; medium ones usually need sorting or two pointers.', 3)
      ]),
      R('Technical interview', '', [
        Q('Explain Stack and Queue.', 'Stack is LIFO (push and pop at one end; undo, recursion). Queue is FIFO (enqueue at the rear, dequeue at the front; scheduling, BFS).', 2),
        Q('Write the logic for matrix multiplication.', 'Columns of A must equal rows of B. Use three nested loops: C[i][j] += A[i][k] * B[k][j]. Time is O(n^3) for n x n matrices.', 2),
        Q('What is a list in Python?', 'An ordered, mutable collection that allows duplicates and mixed types, for example [1, "a", 3]. It supports indexing, slicing, append and pop.', 2),
        Q('What is the difference between DML and DDL statements?', 'DDL defines structure (CREATE, ALTER, DROP, TRUNCATE). DML works on data (INSERT, UPDATE, DELETE, SELECT).', 2),
        Q('Do you know C? Write a program to check a palindrome number.', 'Reverse the digits using % 10 and / 10 in a loop, then compare the result with the original number.', 3),
        Q('What is the object-oriented programming (OOP) concept?', 'Designing software around objects that combine data and behaviour. The four pillars are encapsulation, abstraction, inheritance and polymorphism.', 1),
        Q('What is encapsulation? How can you implement it in programming?', 'Bundle data and the methods that use it inside one class and restrict direct access: make fields private and expose them through public methods that can validate input.', 1),
        Q('How does data abstraction differ from encapsulation?', 'Abstraction hides complexity and shows only what the user needs (interfaces, abstract classes). Encapsulation hides data by controlling access to it.', 1),
        Q('What are classes and objects?', 'A class is a blueprint. An object is an instance of that class with its own state.', 1),
        Q('Explain one of your projects in detail. What challenges did you face?', 'Prepare a two-minute summary: the problem, your role, the tech stack, one real challenge and how you solved it.', 3),
        Q('What is your favourite subject? (expect 2-3 follow-ups) Which subject do you not like?', 'Pick subjects you can answer follow-ups on. For the one you dislike, say you would still learn it properly if the job needs it.', 3),
        Q('If TCS assigned you a task in a subject you dislike, what would you do? And if you still could not complete it?', 'Learn it, break the task into parts, ask seniors or teammates for help and tell them early if you are stuck.', 3)
      ]),
      R('HR interview', 'Reported topics: basic attitude check, "why TCS", willingness to move from one domain to another, and relocation.', [
        Q('Tell me about yourself, something that is not in your resume.', 'Share a hobby, a small achievement or a learning story that adds to your resume instead of repeating it.', 2),
        Q('Tell me about your place.', 'Two or three lines about your town, its culture and what you like about it.', 2),
        Q('Are you interested in relocating? Are you interested in working in shifts?', 'Answer honestly. If you are flexible, say you see it as a chance to learn.', 2),
        Q('What do you know about TCS?', 'Know the basics: it is part of the Tata group, an IT services company working across industries such as banking and retail. Read the latest facts on the TCS website before the interview.', 3),
        Q('Are you aware of the TCS bond?', 'Read the service agreement in your offer details and answer honestly and calmly.', 3),
        Q('What are your hobbies and what do you do in your free time?', 'Give real hobbies and one example, such as a book you read or a skill you are learning.', 3),
        Q('Rate your technical round out of 10.', 'Give an honest score with one reason, for example "7, because I answered the basics well but need more practice in coding".', 3)
      ])
    ]
  },

  infosys: {
    summary: 'Infosys tests mathematical ability, reasoning, verbal ability, pseudocode and puzzles. The interview is mostly Java and OOP basics, SQL and a few programs; the SP track adds data-structure coding. HR asks about teamwork, pressure and why Infosys.',
    prepFocus: [
      'Practise puzzle solving and pseudocode tracing; they have their own timed sections.',
      'Revise Java basics: JVM, JIT, strings, exceptions, threads.',
      'Know OOP with examples, SQL basics and the OSI model.',
      'Prepare one team-conflict story for the HR round.'
    ],
    sources: [
      S('GeeksforGeeks: Infosys Interview Experience for Freshers', 'https://geeksforgeeks.org/infosys-interview-experience-for-freshers', 'experience'),
      S('FACE Prep: Crack Infosys interviews (freshers guide)', 'https://faceprep.in/article/crack-infosys-interviews-2025-ultimate-guide-for-freshers-face-prep/', 'guide')
    ],
    rounds: [
      R('Online test', 'Sections reported: mathematical ability (10 questions, 35 min), analytical reasoning (about 15 questions, 15 min), verbal ability (20 questions, 20 min), pseudocode (5 questions, 10 min) and puzzle solving (4 questions, 10 min). The SP track also has coding on linked lists, trees, DP basics and graph BFS or DFS (from a prep guide).'),
      R('Technical interview: CSE and IT', '', [
        Q('Why is Java platform independent? What is JIT in Java?', 'Java source compiles to bytecode that any JVM can run. The JIT compiler inside the JVM turns frequently used bytecode into native machine code at runtime for speed.', 1),
        Q('What is a string? What are the types of datatypes?', 'A String is an immutable sequence of characters. Datatypes are primitive (int, char, boolean...) and non-primitive (String, arrays, classes).', 1),
        Q('What is exception handling?', 'Handling runtime errors with try, catch and finally (plus throw and throws) so the program does not crash.', 1),
        Q('What is a thread?', 'The smallest unit of execution inside a process. Threads of a process share memory. In Java create one with the Thread class or Runnable.', 1),
        Q('Explain polymorphism with an example.', 'One name, many forms: overloading (same method name, different parameters) and overriding (a subclass changes a parent method).', 2),
        Q('When would you use an abstract class versus an interface?', 'Abstract class: shared state and some common code. Interface: a contract that unrelated classes can implement, and a class can implement many.', 2),
        Q('What is normalisation?', 'Organising tables to remove redundancy and update problems, using normal forms such as 1NF, 2NF and 3NF.', 2),
        Q('Explain the difference between CHAR and VARCHAR.', 'CHAR is fixed length and padded; VARCHAR is variable length and stores only what you give it.', 2),
        Q('What are ACID properties?', 'Atomicity, Consistency, Isolation, Durability: the guarantees of a database transaction.', 2),
        Q('What is the difference between a primary key and a unique key?', 'A primary key is unique, not null and only one per table. A unique key allows a null (in most databases) and a table can have several.', 2),
        Q('Explain the difference between TCP and UDP. What is the OSI model?', 'TCP is connection-oriented and reliable; UDP is connectionless and faster. OSI has 7 layers: physical, data link, network, transport, session, presentation, application.', 2),
        Q('What is the difference between IPv4 and IPv6?', 'IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses and gives a much larger address space.', 2),
        Q('Write a program to check if a number is prime.', 'Check divisors from 2 up to sqrt(n); if none divide n (and n > 1) it is prime.', 2),
        Q('Explain the time complexity of binary search.', 'O(log n) on a sorted array, because the search range halves every step.', 2),
        Q('Walk through the phases of the Software Development Life Cycle. What is Agile?', 'Requirements, design, development, testing, deployment, maintenance. Agile builds in short iterations with regular feedback instead of one big plan.', 2)
      ]),
      R('Technical interview: ECE and EEE', '', [
        Q('What is a pointer and what is its use?', 'A variable that stores the address of another variable. Used for dynamic memory, arrays, passing by reference and data structures.', 2),
        Q('Differentiate between C and Embedded C.', 'Embedded C is C used for microcontrollers, with direct hardware access, limited memory and real-time needs.', 2),
        Q('Write a program to check if a number is a perfect number.', 'Add all proper divisors (less than n); the number is perfect if the sum equals n, for example 6 = 1 + 2 + 3.', 2),
        Q('Draw a circuit for a low-pass filter and explain its significance.', 'A resistor in series with a capacitor to ground; it passes low frequencies and blocks high ones. Cut-off frequency is 1/(2*pi*R*C).', 2),
        Q('What is a Zener diode and what are its applications?', 'A diode designed to conduct in reverse at a fixed breakdown voltage. Used for voltage regulation and reference.', 2),
        Q('Explain the difference between combinational and sequential circuits.', 'Combinational output depends only on the present input; sequential output also depends on past state (it has memory, such as flip-flops).', 2),
        Q('Explain the difference between AM and FM modulation.', 'AM varies the carrier amplitude; FM varies its frequency. FM is more noise-resistant but needs more bandwidth.', 2)
      ]),
      R('HR interview', '', [
        Q('Why should we hire you? Explain your academic project and your role in it.', 'Match two of your skills to the job, then give your project in one minute with your own role clearly stated.', 1),
        Q('Why do you want to join Infosys?', 'Mention training, learning and the variety of projects, and add one fact you read about the company.', 2),
        Q('Where do you see yourself in five years?', 'Say you want to build strong technical skills, take responsibility and grow with the company.', 2),
        Q('How do you handle pressure or a difficult deadline?', 'Prioritise, break work into steps, communicate early and ask for help when needed.', 2),
        Q('Tell me about a time you worked in a team and faced a conflict.', 'Use STAR: Situation, Task, Action, Result. Keep it calm and show that you listened and the team moved forward.', 2),
        Q('How would you contribute to Infosys\'s culture?', 'Talk about learning, helping teammates and sharing knowledge.', 2)
      ])
    ]
  },

  wipro: {
    summary: 'Wipro NLTH has aptitude, verbal, an essay and two coding problems. The interview is Java-heavy (OOP, JVM, strings) with project questions, and the HR round checks bond, relocation, backlogs and academic gaps.',
    prepFocus: [
      'Practise string and array coding problems in C, C++, Java or Python.',
      'Be clear on Java: constructors, access specifiers, overloading vs overriding, == vs equals().',
      'Practise a written essay in English; it is part of the test.',
      'Prepare answers on bond, relocation, backlogs and academic gap.'
    ],
    sources: [
      S('GeeksforGeeks: Wipro Elite NLTH Interview Experience (2019 test)', 'https://www.geeksforgeeks.org/?p=620557', 'experience'),
      S('GeeksforGeeks: Wipro NLTH Interview Experience, Off-Campus (2021 test)', 'https://www.geeksforgeeks.org/?p=700333', 'experience'),
      S('GeeksforGeeks: Wipro NLTH Interview Experience, Off-Campus 2022 (AMCAT, 27 Sep 2022)', 'https://www.geeksforgeeks.org/?p=711086', 'experience')
    ],
    rounds: [
      R('Online test (NLTH on AMCAT)', 'One reported test had 14 verbal, 16 quantitative and 18 reasoning questions, 2 coding problems and 1 essay.', [
        Q('Flip the case of each character of the string. Sample: heaDphOnes gives HEAdPHoNES. (The source calls it "alternating from the first character", but the sample shows every character flipped.)', 'Loop through the characters: lowercase becomes uppercase and uppercase becomes lowercase (swapcase in Python).', 3),
        Q('Given an array and two positions, print the sum of the elements in that range (inclusive). Sample: an 8-element array with positions 3 and 6 gave 71.', 'Loop between the two positions, or build a prefix-sum array. Check from the sample whether positions are 1-based.', 3),
        Q('Two coding problems of moderate level, solvable in C, C++, Java or Python (2019 test).', 'Practise array and string problems at easy to medium level.', 1)
      ]),
      R('Technical interview', 'Many questions come straight from your project and your preferred language.', [
        Q('Write a Java program to reverse a string without using a library function.', 'Loop from the last character to the first and build a new string, or swap characters in a char array with two pointers.', 1),
        Q('What is a constructor in Java? What is constructor overloading?', 'A special method with the class name that runs when an object is created and has no return type. Overloading means several constructors with different parameters.', 1),
        Q('Is Java 100% object-oriented? Why or why not?', 'No. Primitive types (int, char, boolean) are not objects, and static members belong to the class instead of an object.', 1),
        Q('What are the differences between C++ and Java?', 'C++ has pointers, multiple inheritance of classes and manual memory handling; Java has garbage collection, no pointers and runs on the JVM.', 1),
        Q('What are access specifiers? How do private and protected differ?', 'private: only inside the class. protected: inside the class, the same package and subclasses. Also default (package) and public.', 2),
        Q('What is polymorphism? How do compile-time and run-time polymorphism differ?', 'Compile-time (overloading) is decided by the compiler from the method signature. Run-time (overriding) is decided on the actual object type when the program runs.', 2),
        Q('How can 100% abstraction be achieved in Java?', 'With an interface, where methods are abstract (default and static methods were added in later Java versions).', 2),
        Q('Is Java secure? How does bytecode work?', 'Java compiles to bytecode that the JVM verifies and runs inside a managed environment, with no direct pointer access. That is why it is considered safe.', 3),
        Q('What is the difference between == and equals()?', '== compares references for objects (values for primitives). equals() compares content when overridden, as in String.', 3),
        Q('What is the difference between TRUNCATE and DELETE? What does ALTER do?', 'DELETE removes rows (with WHERE) and can be rolled back; TRUNCATE removes all rows quickly. ALTER changes a table structure, for example adding a column.', 2),
        Q('If you saw a coworker doing unethical work, what would your primary responsibility be?', 'Do not ignore it. Report it through the proper channel, such as your manager or the ethics line, and stay professional.', 1)
      ]),
      R('HR interview', 'Wipro asks directly about bond, backlogs and gaps, so prepare factual answers.', [
        Q('Are you comfortable with signing a bond with Wipro?', 'Answer honestly. If yes, say you want to build a long-term career and learn from real projects.', 3),
        Q('Do you have any academic gap or backlog?', 'Be truthful. If you have one, explain the reason briefly and what you did to recover.', 1),
        Q('Why do you want to join Wipro?', 'Mention training, project variety and growth, plus one fact about the company.', 1),
        Q('What are your short-term and long-term goals?', 'Short term: learn the technology and perform well. Long term: grow into a strong engineer or lead.', 2),
        Q('Are you ready to relocate?', 'Answer honestly and positively.', 1)
      ])
    ]
  },

  accenture: {
    summary: 'Accenture runs a cognitive and technical assessment (verbal, reasoning, quantitative, pseudocode, MS Office and networking/cloud MCQs), a two-problem coding round, a spoken communication assessment and a short interview built around your resume and scenarios.',
    prepFocus: [
      'Practise pseudocode output questions, especially bitwise and logical operators.',
      'Learn Excel formulas and shortcuts: the "common applications" section tests them.',
      'Revise SQL, networks, cloud basics and OS fundamentals for the MCQs.',
      'Do 10 minutes of spoken English daily: the communication test checks fluency and pronunciation.'
    ],
    sources: [
      S('GeeksforGeeks: Accenture Interview Experience for ASE (Off-Campus) 2023', 'https://www.geeksforgeeks.org/?p=1049582', 'experience'),
      S('GeeksforGeeks: Accenture Interview Experience for ASE (updated Jan 2024)', 'https://www.geeksforgeeks.org/?p=1125354', 'experience'),
      S('GeeksforGeeks: Accenture Interview Experience for ASE (Sept 2023)', 'https://www.geeksforgeeks.org/?p=1068016', 'experience')
    ],
    rounds: [
      R('Cognitive and technical assessment', 'Topics reported: verbal and English, quantitative (simplification, quadratic equations, time-speed-distance, permutations and probability), analytical reasoning (syllogisms, puzzles, blood relations), abstract reasoning, pseudocode output, common applications and MS Office (Excel formulas and shortcuts), and MCQs on SQL, networking, cloud and OS.'),
      R('Coding assessment (2 problems, about 45 minutes, any language)', '', [
        Q('Next smaller element.', 'Use a stack scanning the array (a monotonic stack). Each element is pushed and popped once, so time is O(n).', 1),
        Q('Find maximum minimum sum subarray of size k (wording as listed by the candidate).', 'Use a sliding window: sum the first k elements, then slide by adding the next element and removing the first, tracking the largest and smallest window sums. O(n).', 1)
      ]),
      R('Communication assessment (about 30 minutes, not an elimination round in one report)', 'Checks sentence control, vocabulary, fluency and pronunciation through speaking and listening tasks.'),
      R('Interview', 'Technical areas reported: OOP basics, exceptions, networking, MS Office, security, cloud, databases, OS, and ML fundamentals if it is on your resume. Expect scenario-based HR questions too.', [
        Q('Tell me about your internship experience and the difficulties you faced during that project.', 'Pick one real difficulty and explain what you did about it and what you learned.', 1),
        Q('Explain a project that was part of your curriculum.', 'Cover the problem, your part, the tech used and the result in about two minutes.', 1),
        Q('Tell us something unique that is not in your resume.', 'Share a hobby, a side project or a learning story with a concrete example.', 1),
        Q('Do you have any questions for the interviewer?', 'Ask about the training programme, the team you may join or what the first six months look like.', 1)
      ])
    ]
  },

  cognizant: {
    summary: 'Cognizant GenC has an online test (aptitude, logical, verbal; some years add coding or SQL/DSA/web questions), then a technical interview that goes through your projects and Java/Python/SQL basics, then HR with document verification over webcam.',
    prepFocus: [
      'Practise simple programs: even/odd index sums, character frequency, Fibonacci, list operations.',
      'Revise SQL deeply: joins, second-highest queries, UNION vs UNION ALL, indexes, triggers.',
      'Be ready to justify your project tech stack (for example why MongoDB, why not cloud hosting).',
      'Keep ID proofs (Aadhaar, PAN, 10th and 12th marksheets) ready for webcam verification.'
    ],
    sources: [
      S('GeeksforGeeks: Cognizant GenC Interview Experience (On-Campus, 2021)', 'https://www.geeksforgeeks.org/?p=691251', 'experience'),
      S('GeeksforGeeks: Cognizant GenC Interview Experience (On-Campus 2022)', 'https://www.geeksforgeeks.org/?p=700407', 'experience'),
      S('GeeksforGeeks: Cognizant GenC Interview Experience (On-Campus)', 'https://www.geeksforgeeks.org/?p=697630', 'experience'),
      S('LeetCode Discuss: My Cognizant GenC Interview Experience 2024-2025', 'https://leetcode.com/discuss/interview-experience/6282040', 'experience')
    ],
    rounds: [
      R('Online test', 'It changes by year. One 2021 test (Mettl) had four sections of 20 questions on OOPs, DSA, DBMS, pseudocode, testing, OS and networks plus four hard programming problems. A 2022 AMCAT test (100 minutes: aptitude, verbal, logical) had no coding. A 2024 drive had a technical assessment with 2 SQL, 2 DSA and 1 web development question.', [
        Q('Compute the sum of elements at even indices and the sum at odd indices, then print the difference.', 'Loop with the index and add to one of two sums by index % 2. O(n).', 1),
        Q('Print the frequency of repeated characters in a string.', 'Count characters with a dictionary or a 26-size array, then print those with count above 1.', 1)
      ]),
      R('Technical interview', 'Interviewers asked many follow-ups on projects. One candidate was asked why a website used MongoDB and why it was not hosted on a cloud platform like Azure.', [
        Q('What is an inline function?', 'In C++, a function marked inline that the compiler may expand at the call site, avoiding call overhead for small functions.', 2),
        Q('What are local and global variables?', 'Local variables live inside a function or block; global variables are declared outside all functions and are visible throughout the program.', 2),
        Q('What is Python? What is the difference between a list and a dictionary?', 'Python is an interpreted, high-level language. A list is an ordered collection accessed by index; a dictionary stores key-value pairs accessed by key.', 2),
        Q('Write a program to append values to a list and perform some arithmetic operations on it.', 'Use append() in a loop, then compute sum(), max(), min() or a manual loop for total and average.', 2),
        Q('Write Python code to add two numbers and run it. Print the Fibonacci series up to 20.', 'Read two inputs with int(input()) and print the sum. For Fibonacci keep two variables a, b and update them in a loop while a <= 20.', 3),
        Q('What percentage of numbers between 1 and 40 have 2 or 8 as the unit digit?', 'Unit digit 2: 2, 12, 22, 32. Unit digit 8: 8, 18, 28, 38. That is 8 numbers out of 40, so 20%.', 3),
        Q('Explain automatic garbage collection in Java.', 'The JVM finds objects that are no longer reachable and frees their memory automatically, so you do not free memory manually.', 4),
        Q('Why do we write public static void main in Java?', 'public so the JVM can call it from outside, static so no object is needed, void because it returns nothing to the JVM.', 4),
        Q('How do you retrieve values submitted by a form?', 'In HTML you use input names; on the server read them from the request (for example req.body in Express or request.getParameter in Java).', 4),
        Q('Write a query to find the second largest value in a table.', 'SELECT MAX(col) FROM t WHERE col < (SELECT MAX(col) FROM t); or ORDER BY col DESC LIMIT 1 OFFSET 1.', 4),
        Q('What is the difference between UNION and UNION ALL?', 'UNION removes duplicates; UNION ALL keeps all rows and is faster.', 4),
        Q('Explain GRANT and REVOKE. What are stored procedures, triggers, cursors and indexes?', 'GRANT gives privileges, REVOKE takes them back. A stored procedure is saved SQL code; a trigger runs automatically on an event; a cursor walks rows one at a time; an index speeds up searches.', 4),
        Q('In which OSI layer does HTML exist? What are semaphores?', 'HTML is at the application layer. A semaphore is a counter used to control access to shared resources between processes.', 4),
        Q('What is the height of a tree? What is a circular linked list?', 'Height is the number of edges on the longest path from the root to a leaf. In a circular linked list the last node points back to the first.', 4)
      ]),
      R('HR and document verification', 'You show Aadhaar, PAN and your 10th and 12th marksheets on webcam. Also reported: comfort with relocation and night shifts, foreign languages known.', [
        Q('How can you benefit Cognizant and why should we hire you?', 'Connect one or two real skills to the role and show that you learn quickly.', 2),
        Q('Why did you choose CSE?', 'Give a genuine reason, such as a first program or a project that made you curious.', 2),
        Q('What if we assign you a project that is not relevant to your skills?', 'Say you would learn it, ask for resources and a mentor, and deliver step by step.', 4),
        Q('Tell me something about recent trends in the IT industry.', 'Pick two trends you actually follow, such as generative AI or cloud, and explain them simply.', 4),
        Q('Are you comfortable with relocation and night shifts? Do you know any foreign languages?', 'Answer honestly. Mention any language you really know.', 3)
      ])
    ]
  },

  capgemini: {
    summary: 'Capgemini starts with a written round: pseudocode, verbal, game-based aptitude (Motion, Inductive, Deductive and Grid games) and a behavioural questionnaire. Some drives add a spoken English test and two coding problems. The interview mixes technical and HR and often asks about Capgemini\'s values.',
    prepFocus: [
      'Practise the four aptitude games: they are timed and unusual, so try demos before the test.',
      'Trace pseudocode with loops, recursion and bitwise operators.',
      'Learn Capgemini\'s seven values and why you want to join.',
      'Prepare for relocation and the service-agreement questions.'
    ],
    sources: [
      S('GeeksforGeeks: Capgemini Interview Experience for Analyst (Off-Campus)', 'https://www.geeksforgeeks.org/?p=654931', 'experience'),
      S('GeeksforGeeks: Capgemini Interview Experience for Analyst (2023)', 'https://www.geeksforgeeks.org/?p=1047861', 'experience'),
      S('GeeksforGeeks: Capgemini Interview Experience (On-Campus, CoCubes)', 'https://www.geeksforgeeks.org/?p=485393', 'experience'),
      S('weekday.works: Capgemini interview questions (sample questions, not confirmed as the actual paper)', 'https://www.weekday.works/post/capgemini-interview-questions', 'guide')
    ],
    rounds: [
      R('Written round', 'Reported formats: pseudocode (about 25 questions in 30 minutes covering bitwise operators, conditionals, loops, switch and recursion), verbal (30 questions: narration, voice, comprehension, para jumbles, synonyms and antonyms), four games (Motion Challenge, Inductive Logical Thinking, Deductive Logical Thinking, Grid Challenge) and a behavioural questionnaire of 100 questions in 20 minutes. A 2023 drive had 40 technical MCQs on OS, DBMS and cloud with many recursion output questions. A CoCubes drive had 15 pseudocode and 10 algorithm questions on trees, graphs, stacks, queues and linked lists.'),
      R('Pseudocode samples', 'Sample questions from a prep site.', [
        Q('set n = 4; set s = 0; while n > 0: s = s + n; n = n - 1; print s. What is printed?', 'The loop adds 4 + 3 + 2 + 1, so it prints 10.', 4),
        Q('a = 2; b = a * a; a = b + a; print a. What is printed?', 'b = 4, then a = 4 + 2 = 6, so it prints 6.', 4),
        Q('What is the output of 5 & 3 (bitwise AND)?', '5 is 101 and 3 is 011, so the AND is 001, which is 1.', 4),
        Q('A function calls itself with n - 1 until n = 0, adding n each time. What is f(3)?', '3 + 2 + 1 + 0 = 6.', 4),
        Q('What does 10 / 4 give with integer division?', 'The result is 2 (the fraction is dropped).', 4)
      ]),
      R('Coding round (2023 drive)', 'Two medium problems: one on strings and one on arrays. Spoken English fluency (pronunciation, speaking, reading) was tested separately.'),
      R('Technical interview', '', [
        Q('Which languages do you know? Explain your diploma or final-year project and your role in it.', 'Name only languages you can code in. Explain the project and your role clearly.', 2),
        Q('What are the types of joins in SQL?', 'INNER, LEFT, RIGHT, FULL OUTER, plus CROSS and SELF joins.', 2),
        Q('What are the four pillars of OOP?', 'Encapsulation, abstraction, inheritance, polymorphism.', 2),
        Q('Name some Python built-in functions.', 'len(), range(), type(), int(), str(), sum(), max(), min(), sorted(), print().', 1),
        Q('What is a real-life application of SQL?', 'Storing and querying bank transactions, orders in an online store, student records and similar data.', 1),
        Q('Describe inheritance.', 'A child class reuses and extends the fields and methods of a parent class, for example Car extends Vehicle.', 1),
        Q('What is the difference between i++ and ++i? What is a dangling pointer?', 'i++ uses the value then increments; ++i increments then uses the value. A dangling pointer points to memory that has already been freed.', 4),
        Q('What is the difference between a compiler and an interpreter? What is paging?', 'A compiler translates the whole program first; an interpreter runs it line by line. Paging splits memory into fixed-size pages to avoid external fragmentation.', 4),
        Q('What is the difference between verification and validation?', 'Verification checks that we built the product right (against specs). Validation checks that we built the right product (against user needs).', 4)
      ]),
      R('HR interview', '', [
        Q('Why do you want to work with Capgemini? What 7 values does the Capgemini logo signify?', 'Capgemini describes seven values: honesty, boldness, trust, freedom, team spirit, modesty and fun. Check the Capgemini careers site for the current wording.', 2),
        Q('What is leadership according to you?', 'Leading by example, taking responsibility and helping others succeed. Back it with a small real example.', 1),
        Q('What achievements do you have that are not in your resume?', 'Pick one real achievement with a result or a number.', 1),
        Q('Tell me about your family background.', 'Keep it short and positive, and mention what you learned from your family.', 1),
        Q('When was the happiest moment of your life? What incident made you feel proud?', 'Choose real moments and tell them as a short story with how you felt and what you learned.', 3),
        Q('Why not a Master\'s degree instead of a job?', 'Say you want practical experience now and may study further later while working.', 3),
        Q('Tell me about a time you failed.', 'Use STAR and end with what you changed afterwards.', 4)
      ])
    ]
  },

  amazon: {
    summary: 'Amazon is coding-heavy: an online assessment with two coding problems plus debugging, logical and work-style sections, then technical interviews with DSA problems and follow-ups on trees, graphs and two pointers. Behavioural questions are based on Amazon\'s published Leadership Principles.',
    prepFocus: [
      'Be strong in hash maps, sliding window, trees, graphs, two pointers and DP basics.',
      'Always explain brute force first, then the optimised approach, with time and space complexity.',
      'Prepare two STAR stories for each leadership principle.',
      'Practise the debugging and work-style sections of the online assessment.'
    ],
    sources: [
      S('GeeksforGeeks: Amazon Interview Experience for SDE (online test and 4 coding problems)', 'https://www.geeksforgeeks.org/?p=482934', 'experience'),
      S('Taro: Amazon SDE Intern, Bengaluru (Oct 2025 reports)', 'https://www.jointaro.com/interviews/companies/amazon/work-experiences/sde-intern-bengaluru-april-29-2024-2-73dd30de', 'experience'),
      S('Amazon: Leadership Principles', 'https://aboutamazon.com/about-us/leadership-principles', 'guide')
    ],
    rounds: [
      R('Online assessment', 'Sections reported: two coding problems, code debugging, logical ability and a work-style assessment. October 2025 reports for Bengaluru intern roles also mention two coding questions.', [
        Q('Find two values in an array that sum to a given integer k (rated easy).', 'Use a hash set or map: for each x check whether k - x is already seen. O(n) time.', 1),
        Q('Given a text of words separated by spaces or punctuation and a list of words to exclude, return the word(s) with the highest frequency (rated medium).', 'Lowercase the text, split on non-letters, skip excluded words, count with a hash map and return the maximum. Return all words on a tie.', 1)
      ]),
      R('Technical interview: coding', 'October 2025 reports describe two DSA questions per interview: one on trees and graphs with follow-ups, and another mixing graphs and two pointers.', [
        Q('Count distinct elements in every window of size k.', 'Sliding window with a hash map of counts: add the new element, remove the old one and delete a key when its count reaches zero. O(n).', 1),
        Q('Convert a given binary tree to its Sum Tree.', 'Post-order traversal: each node becomes the sum of its left and right subtree values (original values), leaves become 0. O(n).', 1),
        Q('Partition problem: can the array be split into two subsets with equal sum?', 'If the total is odd the answer is no. Otherwise use subset-sum DP for total/2. O(n * total).', 1),
        Q('Trapping rain water.', 'Two pointers with the left max and right max, moving the lower side inward and adding the trapped water. O(n) time, O(1) space.', 1)
      ]),
      R('Behavioural: Leadership Principles', 'Amazon publishes 16 principles: Customer Obsession, Ownership, Invent and Simplify, Are Right A Lot, Learn and Be Curious, Hire and Develop the Best, Insist on the Highest Standards, Think Big, Bias for Action, Frugality, Earn Trust, Dive Deep, Have Backbone; Disagree and Commit, Deliver Results, Strive to be Earth\'s Best Employer, and Success and Scale Bring Broad Responsibility. Prepare real stories in the STAR format (Situation, Task, Action, Result) for them.')
    ]
  },

  microsoft: {
    summary: 'Microsoft online tests have two or three coding problems (sliding window, DP, greedy or geometry style), followed by technical rounds with a medium coding problem, dry runs, edge cases and core CS (OS, OOPS, DBMS, data structures). Experienced roles add a behavioural and a design round.',
    prepFocus: [
      'Practise medium DSA: DP (LIS, minimum squares), trees (boundary traversal) and matrix search.',
      'Dry-run your code on edge cases and state the complexity out loud.',
      'Revise core CS: OS, OOPS, DBMS, theory of computation and data structures.',
      'Prepare examples of handling team conflict and deadlines.'
    ],
    sources: [
      S('GeeksforGeeks: Microsoft Interview Experience (On-Campus Internship)', 'https://www.geeksforgeeks.org/?p=486909', 'experience'),
      S('GeeksforGeeks: Microsoft Interview Experience for SDE', 'https://www.geeksforgeeks.org/?p=1005963', 'experience'),
      S('LeetCode Discuss: Microsoft SDE Intern Round 1 + 2 experience', 'https://leetcode.com/discuss/post/7378779/microsoft-sde-intern-interview-experienc-83ot/', 'experience')
    ],
    rounds: [
      R('Online assessment', 'A 2020 on-campus test had three coding problems. A recent intern test had two DSA questions: one easy (basic vector iteration) and one medium sliding-window problem.', [
        Q('Find the length of the Longest Increasing Subsequence (LIS).', 'DP in O(n^2), or keep a "tails" array with binary search for O(n log n).', 1),
        Q('Given n points, find the minimum distance among all pairs.', 'Brute force is O(n^2). The faster method sorts by x and uses divide and conquer for O(n log n).', 1),
        Q('Given an array of n elements, find the mean, median and mode.', 'Mean is sum/n. Sort for the median. Count frequencies in a hash map for the mode.', 1)
      ]),
      R('Technical interviews', 'Questions reported: resume and projects, core CS (OS, OOPS, DBMS, TOC, data structures), a medium matrix problem with dry run, edge cases and complexity, and a string-transformation problem using ASCII logic.', [
        Q('Binary tree boundary traversal, variation: print only alternate nodes.', 'Do the boundary traversal (left edge, leaves, right edge reversed) and keep a counter to print every alternate node.', 1),
        Q('Find the minimum number of squares whose sum equals a given number n.', 'DP: dp[i] = min(dp[i - j*j] + 1) over all j with j*j <= i. O(n * sqrt n).', 1),
        Q('Search for a value in a matrix sorted row-wise and column-wise.', 'Start from the top-right corner: move left if the value is bigger, down if smaller. O(m + n).', 1),
        Q('Explain how you would generate test cases and handle boundary values for your solution.', 'List empty input, a single element, duplicates, minimum and maximum values and negative numbers.', 3)
      ]),
      R('Behavioural and design (experienced roles)', 'Reported: how you handled conflicts with team members and how you managed deadlines. The design round asks for a scalable, fault-tolerant solution and discusses data consistency, availability and latency.')
    ]
  },

  google: {
    summary: 'Google internship interviews (STEP) are coding-focused: an HR screening about your preparation and academics, then technical rounds that start with an easy problem and add follow-ups. Interviewers watch your approach, edge cases and complexity. Trees, sliding window, recursion and matrices appear in reports.',
    prepFocus: [
      'Be ready for follow-ups: the same problem with an added condition (for example at most k).',
      'Practise writing code and drawing trees in a shared Google doc without an IDE.',
      'Cover trees, sliding window, recursion with class design and matrices.',
      'Think aloud: brute force first, then optimise, then edge cases.'
    ],
    sources: [
      S('GeeksforGeeks: Google Interview Experience for STEP Intern (shortlist January 2021)', 'https://www.geeksforgeeks.org/?p=708730', 'experience'),
      S('LeetCode Discuss: Google STEP Internship Interview Experience (India, 2025)', 'https://leetcode.com/discuss/post/7478960/google-step-internship-interview-experie-6m2g', 'experience')
    ],
    rounds: [
      R('HR telephonic screening (2025 report)', 'Topics: a short introduction, LeetCode progress (problems solved and consistency), your preparation strategy, CGPA and backlogs, and projects.'),
      R('Technical interview 1', '', [
        Q('Tree problem: return the minimum number needed to balance the weights of the branches (the candidate recalled the statement only loosely).', 'Think post-order DFS: at each node the largest child path sets the target, and you add the difference to the shorter paths.', 1),
        Q('Basic tree questions, then draw a tree and write code in a Google document.', 'Practise traversals and recursion without autocomplete. State the complexity.', 1),
        Q('Beach seating: given some occupied seats, find the maximum number of friends who can sit together.', 'This is the same idea as Max Consecutive Ones: scan and track the longest run of free seats.', 2),
        Q('Follow-up: the same problem, but at most k people may sit in between.', 'Sliding window that allows at most k blocked seats (like Max Consecutive Ones III). O(n).', 2)
      ]),
      R('Technical interview 2', '', [
        Q('An easy vector problem with edge-case follow-ups, then a harder follow-up on a matrix (related to a "wages" question).', 'Solve the easy case first, then handle empty, single and duplicate inputs before moving to the matrix version.', 1),
        Q('File and folder structure problem requiring recursive traversal and a class-based design.', 'Model File and Folder classes, traverse folders recursively and aggregate what the question asks for, such as sizes or counts.', 2),
        Q('Walk through the data structure you chose and why it is enough. Compare brute force and optimised complexity.', 'Compare time and space for both approaches and justify the data type you used.', 2)
      ])
    ]
  },

  hcl: {
    summary: 'HCL tests quantitative, logical and verbal ability (one drive: 5 sections of 15 questions in 90 minutes), sometimes with a group discussion. The technical rounds cover linked lists and sorting, OOP, DBMS, OS and a deep dive into your projects and tech-stack choices. HR asks personal and behavioural questions.',
    prepFocus: [
      'Practise linked-list problems: reverse, detect cycle, cycle start node, merge point.',
      'Prepare sorting, LRU cache, rotated array and BST search.',
      'Be ready to justify every technology in your project and name alternatives.',
      'Practise group-discussion topics such as AI in hiring and 5G for rural areas.'
    ],
    sources: [
      S('FACE Prep: HCL interview questions, technical and HR rounds (prep guide)', 'https://faceprep.in/article/hcl-interview-questions-technical-and-hr-rounds', 'guide'),
      S('GeeksforGeeks: HCL Interview Experience (On-Campus)', 'https://www.geeksforgeeks.org/?p=1198035', 'experience')
    ],
    rounds: [
      R('Group discussion and aptitude test', 'One campus drive began with a group discussion and then an online aptitude test of 5 sections with 15 questions each in 90 minutes. A prep guide lists GD topics: AI in hiring, 5G and rural connectivity, and startup versus enterprise careers.'),
      R('Technical interview 1: coding', 'The candidate said other students in the drive were asked these coding problems.', [
        Q('Check whether an array is rotated and sorted.', 'Count positions where a[i] > a[i+1] (including the wrap-around). At most one is allowed. O(n).', 2),
        Q('Implement quick sort and merge sort.', 'Quick sort partitions around a pivot (average O(n log n)). Merge sort splits, sorts and merges (always O(n log n), needs extra space).', 2),
        Q('Design an LRU cache.', 'A hash map plus a doubly linked list gives O(1) get and put. Move used items to the front and evict from the back.', 2),
        Q('Find the element that repeats N/3 times in an array (usually the "more than N/3" majority problem).', 'Boyer-Moore voting with two candidates, then verify counts. O(n) time, O(1) space.', 2),
        Q('Find an element in a BST.', 'Compare with the root and go left or right. O(h), where h is the height.', 2),
        Q('Find a cycle in a linked list, the node where the cycle starts and its length.', 'Floyd\'s fast and slow pointers. After they meet, reset one pointer to the head and move both one step at a time; they meet at the cycle start. Count steps around the loop for the length.', 2),
        Q('Reverse a singly linked list in place. How would you find the merge point of two linked lists?', 'Reverse by re-pointing next while keeping prev, current and next. For the merge point, move the longer list ahead by the length difference, then walk both together.', 1)
      ]),
      R('Technical interview: fundamentals', '', [
        Q('What is a linked list and how does it differ from an array?', 'A linked list stores nodes connected by pointers, with O(1) insertion at a known node but O(n) access. An array has O(1) access but costly insertion.', 1),
        Q('What is the difference between method overloading and method overriding?', 'Overloading: same name, different parameters in one class (compile time). Overriding: a subclass redefines a parent method (run time).', 1),
        Q('Why does Java avoid multiple inheritance of classes?', 'To avoid the diamond problem, where it is unclear which parent\'s method to inherit. Java allows multiple interfaces instead.', 1),
        Q('What is the difference between INNER JOIN and LEFT JOIN?', 'INNER returns only matching rows. LEFT returns all rows from the left table, with NULLs where there is no match.', 1),
        Q('Write a query to find the second-highest salary in an employee table.', 'SELECT MAX(salary) FROM employee WHERE salary < (SELECT MAX(salary) FROM employee);', 1),
        Q('What are the four necessary conditions for deadlock?', 'Mutual exclusion, hold and wait, no preemption and circular wait.', 1),
        Q('What is the difference between a process and a thread? What is virtual memory?', 'A process has its own memory; threads share their process memory. Virtual memory lets programs use more memory than RAM by swapping pages to disk.', 1),
        Q('Walk me through a project on your resume.', 'Cover the problem, your role, design, tech stack and one challenge you solved.', 1)
      ]),
      R('Technical interview 2: project deep dive', 'Reported questions: how you built the project, the setbacks you faced, why you chose that tech stack and what the alternatives were, why you did these projects, how the backend and database were implemented in one project, and what your internship project and its tech stack were.'),
      R('HR interview', '', [
        Q('Why HCL?', 'Mention the range of services, global projects and learning opportunities, plus one recent fact about HCLTech.', 2),
        Q('What newsletters or news sources do you follow? What was the most exciting news recently?', 'Name one or two real sources and explain one story you found interesting.', 2),
        Q('Why would you not pursue your hobby as a career? What is your biggest fear?', 'Be honest and thoughtful. For a fear, show how you are working to handle it.', 2),
        Q('Are you a team leader? Give examples.', 'Give a small project, event or class example where you coordinated people and what the result was.', 2),
        Q('Where do you see yourself in three years? Are you open to relocation?', 'Say you want to grow technically and take more responsibility. Answer relocation honestly.', 1),
        Q('Tell me about a time you worked under pressure and still met a deadline. Tell me about a conflict with a teammate and how you resolved it.', 'Use STAR for both and keep them short, with a clear result.', 1)
      ])
    ]
  }
};

module.exports = NOTES;
