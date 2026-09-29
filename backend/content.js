const T = (title, notes) => ({ title, notes });

const aptitude = [
  T('Number System', ['Types: natural, whole, integers, rational, irrational, prime and composite numbers.', 'Divisible by 3 or 9 if the digit sum is; by 11 if the difference of alternate digit sums is 0 or a multiple of 11.', 'Number of factors of p^a x q^b is (a+1)(b+1); unit digits repeat in cycles, so use n mod 4.']),
  T('HCF and LCM', ['HCF x LCM = product of the two numbers.', 'HCF of fractions = HCF of numerators / LCM of denominators.', 'Bells, traffic lights and meeting-again problems use LCM; largest equal grouping uses HCF.']),
  T('Surds, Indices and Logarithms', ['a^m x a^n = a^(m+n); (a^m)^n = a^(mn); a^0 = 1.', 'sqrt(a) x sqrt(b) = sqrt(ab); rationalise a denominator by multiplying with its conjugate.', 'log(ab) = log a + log b; log(a/b) = log a - log b; log(a^n) = n log a.']),
  T('Simplification and Approximation', ['Follow BODMAS: brackets, orders, division, multiplication, addition, subtraction.', 'Remember squares up to 30, cubes up to 15 and tables up to 20.', 'For approximation, round numbers to easy values and compare the options.']),
  T('Percentages', ['x% of N = N x x / 100.', 'Successive changes of a% and b%: net change = a + b + (ab/100) percent.', 'Increase by x% then decrease by x% gives a net loss of x^2/100 percent.']),
  T('Profit and Loss', ['Profit% = (Profit / CP) x 100, always on cost price.', 'Discount is on marked price; successive discounts d1 and d2 give d1 + d2 - (d1 x d2)/100.', 'Selling two items at the same price, one at x% profit and one at x% loss, always gives an overall loss.']),
  T('Simple and Compound Interest', ['SI = P x R x T / 100.', 'Compound amount A = P x (1 + R/100)^T; for half-yearly compounding halve the rate and double the time.', 'For 2 years, CI - SI = P x (R/100)^2.']),
  T('Ratio and Proportion', ['a:b = c:d means ad = bc.', 'To divide N in ratio a:b the parts are N x a/(a+b) and N x b/(a+b).', 'Direct proportion: both grow together; inverse proportion: one grows as the other falls (men and days).']),
  T('Partnership', ['Profit is shared in the ratio of (investment x time).', 'If time is equal, share profit in the ratio of investments.', 'A working partner first gets a fixed share as salary, then the rest is split by ratio.']),
  T('Averages', ['Average = Sum of values / Number of values; first n natural numbers average (n+1)/2.', 'Weighted average = sum of (weight x value) / sum of weights.', 'If one item is replaced, change in average = (new - old) / n.']),
  T('Mixtures and Alligation', ['Alligation: cheaper : dearer = (dearer - mean) : (mean - cheaper).', 'Replacing x units from a container of N units n times leaves initial x (1 - x/N)^n of the original liquid.', 'Draw the alligation cross to find the mixing ratio quickly.']),
  T('Time and Work', ['If A does a job in a days, work per day = 1/a; together per day = 1/a + 1/b.', 'Take total work as the LCM of the days to make numbers simple.', 'M1 x D1 x H1 / W1 = M2 x D2 x H2 / W2.']),
  T('Pipes and Cisterns', ['Inlet pipes add (+) and outlet pipes subtract (-); net rate = sum of rates.', 'If a pipe fills in a hours and a leak empties in b hours (b > a), the time with the leak is ab/(b - a).', 'Use the LCM of times as the tank capacity.']),
  T('Time, Speed and Distance', ['Speed = Distance / Time; km/h to m/s multiply by 5/18.', 'Average speed for equal distances at speeds x and y = 2xy/(x + y).', 'Relative speed: subtract when moving the same direction, add when moving opposite.']),
  T('Trains, Boats and Streams', ['A train crossing a pole covers its own length; crossing a platform covers train + platform length.', 'Downstream speed = u + v; upstream speed = u - v (u boat, v stream).', 'Boat speed in still water = (down + up)/2; stream speed = (down - up)/2.']),
  T('Ages', ['Assume present ages as x and y and form equations from the given ratio or sum.', 'The difference between two ages never changes with time.', 'x years ago subtract x; x years hence add x.']),
  T('Permutations and Combinations', ['nPr = n!/(n-r)! and nCr = n!/(r!(n-r)!).', 'Order matters: permutation. Only selection: combination.', 'Arrangements with repeats = n!/(p! q!); circular arrangements = (n-1)!.']),
  T('Probability', ['P(E) = favourable outcomes / total outcomes, always between 0 and 1.', 'P(A or B) = P(A) + P(B) - P(A and B); for independent events P(A and B) = P(A) x P(B).', 'P(at least one) = 1 - P(none).']),
  T('Data Interpretation', ['Read tables, bar graphs, line graphs and pie charts carefully, including units.', 'Pie chart angle = percentage x 3.6 degrees.', 'Percentage change = (new - old) / old x 100; approximate to save time.']),
  T('Geometry and Mensuration', ['Areas: rectangle lb, triangle 1/2 bh, circle pi r^2. Angles of a triangle add to 180 degrees.', 'Volumes: cube a^3, cuboid lbh, cylinder pi r^2 h, cone 1/3 pi r^2 h, sphere 4/3 pi r^3.', 'Pythagoras a^2 + b^2 = c^2; common triples 3-4-5, 5-12-13, 8-15-17.']),
  T('Clocks and Calendars', ['Minute hand moves 6 degrees per minute; hour hand moves 0.5 degrees per minute.', 'Angle between hands at H hours M minutes = |30H - 5.5M|.', 'Odd days: 100 years have 5, 200 years 3, 300 years 1, 400 years 0; a leap year has 366 days.']),
  T('Equations and Inequalities', ['Linear equation ax + b = 0 gives x = -b/a.', 'Quadratic ax^2 + bx + c = 0 has roots (-b +/- sqrt(b^2 - 4ac)) / 2a; sum of roots = -b/a, product = c/a.', 'When multiplying or dividing an inequality by a negative number, flip the sign.'])
];

const reasoning = [
  T('Number and Letter Series', ['Check differences first, then differences of differences (2, 6, 12, 20 has +4, +6, +8).', 'Also try squares, cubes, primes and alternating patterns.', 'For letters, convert to positions A=1 to Z=26.']),
  T('Coding-Decoding', ['Find the rule: fixed shift, reverse order or position values.', 'Test the rule on every letter before applying it.', 'FRIEND to GSJFOE is a +1 shift on each letter.']),
  T('Analogy', ['Find the exact relation in the first pair: synonym, part-whole, tool-user, cause-effect.', 'Apply the same relation in the same order to the second pair.', 'Check by making a sentence: A is to B as C is to D.']),
  T('Classification (Odd One Out)', ['Find the property shared by most items; the odd one lacks it.', 'Check category, letter count and number properties such as prime or square.', 'Do not choose only by spelling or length unless the pattern is clear.']),
  T('Blood Relations', ['Draw a family tree and mark male and female members.', "Father's sister is the paternal aunt and her children are your cousins.", 'Start from the person who speaks and solve one step at a time.']),
  T('Direction Sense', ['Draw the path on paper using N, S, E, W.', 'Distance from the start with right-angle turns comes from Pythagoras.', 'Left turn from facing north is west; right turn is east.']),
  T('Ranking and Order', ['Total persons = rank from top + rank from bottom - 1.', 'Persons between two people = difference of positions - 1.', 'Draw a line diagram and place known positions first.']),
  T('Seating Arrangement', ['Draw the layout first: a row or a circle, and note which way people face.', 'Place definite information first, then use elimination.', 'In a circle facing the centre, your left is anticlockwise for the person opposite you.']),
  T('Puzzles', ['Build a table with people, days, floors or items as columns.', 'Fill certain facts first and mark eliminated options.', 'Re-read every clue once after finishing to verify.']),
  T('Syllogisms', ['Draw Venn diagrams for All, Some and No statements.', 'A conclusion is true only if it holds in every possible diagram.', 'All A are B does not mean All B are A.']),
  T('Statements and Conclusions', ['A conclusion must follow only from the given statements, not from outside knowledge.', 'Check whether the conclusion is definitely true, definitely false or cannot be determined.', 'Avoid extreme words like always or never unless the statement uses them.']),
  T('Assumptions and Arguments', ['An assumption is something taken for granted for the statement to make sense.', 'A strong argument is relevant, specific and practical.', 'Test an assumption by asking: if it were false, would the statement still hold?']),
  T('Data Sufficiency', ['Decide whether statement I alone, II alone, both together, or neither answers the question.', 'You need not fully solve; only check whether an answer is possible.', 'Do not use outside knowledge to fill missing data.']),
  T('Venn Diagrams', ['Circles represent sets; overlaps show common members.', 'n(A or B) = n(A) + n(B) - n(A and B).', 'For three sets add singles, subtract pairs, add the triple overlap.']),
  T('Mathematical Operations', ['Replace the symbols with the given operators and then apply BODMAS.', 'Do not use the usual meaning of the symbols.', 'Check your interpretation with the given example.']),
  T('Cubes and Dice', ['A cube has 6 faces, 8 corners and 12 edges.', 'Painted cube cut into n^3 cubes: 3 faces painted = 8; 2 faces = 12(n-2); 1 face = 6(n-2)^2; none = (n-2)^3.', 'Opposite faces of a dice never appear together.']),
  T('Mirror Images and Paper Folding', ['A vertical mirror reverses left and right; a water image reverses top and bottom.', 'Count the parts of embedded figures carefully.', 'For paper folding, unfold in reverse order and mirror the cuts.'])
];

const verbal = [
  T('Grammar and Tenses', ['Simple present is for habits and facts; present continuous is for actions happening now.', 'Perfect tenses use has, have or had with the past participle.', 'Use past simple for finished actions with a stated time.']),
  T('Subject-Verb Agreement', ['Each, every, either and neither take singular verbs.', 'Subjects joined by and take a plural verb; with or and nor the verb agrees with the nearer subject.', 'Collective nouns take a singular verb when acting as one unit.']),
  T('Articles and Prepositions', ['Use a before consonant sounds, an before vowel sounds, the for specific things.', 'Prepositions of time: at for exact time, on for days and dates, in for months and years.', 'Learn fixed pairs such as good at, interested in and depend on.']),
  T('Active and Passive Voice', ['In passive voice the object becomes the subject and the verb is be + past participle.', 'The tense stays the same in the passive form.', 'Use the passive when the doer is unknown or unimportant.']),
  T('Direct and Indirect Speech', ['Change pronouns to match the reporter.', 'Backshift the tense (is to was, will to would) when the reporting verb is in the past.', 'Change time words: now to then, today to that day, tomorrow to the next day.']),
  T('Vocabulary Building', ['Learn 10 new words a day and use each in a sentence.', 'Use roots, prefixes and suffixes (un-, re-, -tion) to guess meanings.', 'Read an English newspaper editorial daily.']),
  T('Synonyms and Antonyms', ['Learn words in groups with example sentences.', 'Read the whole sentence first because many words have more than one meaning.', 'Prefixes like un-, in- and dis- often create opposites.']),
  T('Idioms and Phrases', ['Break the ice means start a conversation; piece of cake means very easy; once in a blue moon means rarely.', 'Guess from context when the meaning is unknown.', 'Never translate an idiom word for word.']),
  T('One-Word Substitution', ['Philanthropist is a lover of mankind, bibliophile a book lover, omnipotent all-powerful.', 'Roots help: -cide kills, -phobia fear, -cracy rule.', 'Learn in groups of 10 and revise weekly.']),
  T('Error Spotting and Sentence Correction', ['Check subject-verb agreement, tense, articles, prepositions and pronouns in that order.', 'Use less for uncountable and fewer for countable nouns.', 'If nothing looks wrong, no error may be the right option.']),
  T('Fill in the Blanks', ['Read for tone and connectors like but, although and because.', 'Try each option and remove the ones that break grammar.', 'Remember pairs such as neither-nor and not only-but also.']),
  T('Para Jumbles', ['Find the opening sentence: it introduces the topic and has no unexplained pronoun.', 'Look for connectors and pronoun links between sentences.', 'Find mandatory pairs first, then check the order.']),
  T('Reading Comprehension', ['Read the questions first, then the passage.', 'The main idea is usually in the first and last lines of paragraphs.', 'Remove options that are too extreme or not mentioned in the passage.']),
  T('Cloze Test', ['Read the whole passage first to understand the theme.', 'Fill the blanks you are sure of first.', 'Recheck grammar and meaning after filling.'])
];

const dsa = [
  T('Time and Space Complexity', ['Big-O describes how running time grows with input size.', 'Order: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n).', 'Nested loops multiply complexity; sequential loops add.']),
  T('Arrays', ['Arrays use contiguous memory: O(1) access by index, O(n) insert or delete in the middle.', 'Common tasks: reverse, rotate, find max, prefix sums, Kadane algorithm for maximum subarray.', 'Sort first when the problem allows it; it often simplifies the solution.']),
  T('Strings', ['Strings are arrays of characters; many languages make them immutable.', 'Practise palindrome, anagram, longest common prefix and substring problems.', 'Use a frequency array or hash map for character counts.']),
  T('Two Pointers and Sliding Window', ['Two pointers move from both ends or in the same direction to avoid nested loops.', 'A sliding window keeps a running sum or count over a subarray of fixed or variable size.', 'Both often reduce O(n^2) to O(n).']),
  T('Recursion and Backtracking', ['Every recursion needs a base case and a smaller subproblem.', 'Recursion uses the call stack, so very deep recursion can overflow it.', 'Backtracking tries a choice, undoes it if it fails (N-Queens, subsets, permutations).']),
  T('Linked Lists', ['Each node holds data and a pointer to the next node; insert at head is O(1), search is O(n).', 'Fast and slow pointers detect a cycle and find the middle.', 'To reverse a list, change next pointers using prev, curr and next variables.']),
  T('Stacks', ['Stack is LIFO with push and pop in O(1).', 'Uses: balanced brackets, undo, expression evaluation, next greater element.', 'Function calls use a call stack.']),
  T('Queues and Deques', ['Queue is FIFO: enqueue at the rear, dequeue from the front.', 'Uses: BFS, scheduling, buffering; circular queue reuses space.', 'Deque allows insert and delete at both ends, used in sliding window maximum.']),
  T('Hashing', ['A hash map gives average O(1) insert, search and delete.', 'Collisions are handled by chaining or open addressing.', 'Use for frequency counts, two-sum and duplicate detection.']),
  T('Sorting', ['Bubble, selection and insertion sort are O(n^2), fine for small input.', 'Merge sort is O(n log n) always and stable; quick sort is O(n log n) on average and O(n^2) in the worst case.', 'Counting sort is O(n + k) when values fall in a small range.']),
  T('Searching and Binary Search', ['Binary search needs sorted data and runs in O(log n).', 'It also works on answers: find the smallest value that satisfies a condition.', 'Watch for mid = low + (high - low)/2 to avoid overflow.']),
  T('Trees and Traversals', ['Traversals: inorder, preorder, postorder (DFS) and level order (BFS).', 'Height of a tree, diameter, lowest common ancestor are common questions.', 'A binary tree node has at most two children.']),
  T('Binary Search Trees', ['In a BST left < root < right, so inorder gives sorted output.', 'Search, insert and delete take O(h); h is log n if balanced and n if skewed.', 'AVL and Red-Black trees keep the tree balanced.']),
  T('Heaps and Priority Queues', ['A binary heap is a complete tree: min-heap root is smallest, max-heap root largest.', 'Insert and delete are O(log n); building a heap is O(n).', 'Used for top-K problems, heap sort and Dijkstra.']),
  T('Graphs and Representation', ['A graph has vertices and edges, directed or undirected, weighted or not.', 'Store as an adjacency list (O(V+E) space) or an adjacency matrix (O(V^2) space).', 'Graphs model networks, maps and dependencies.']),
  T('BFS and DFS', ['BFS uses a queue and explores level by level; it gives shortest paths in unweighted graphs.', 'DFS uses a stack or recursion and goes deep first.', 'Both run in O(V+E); used for connected components, cycle detection and topological sort.']),
  T('Shortest Path Algorithms', ['Dijkstra works for non-negative weights, O((V+E) log V) with a priority queue.', 'Bellman-Ford handles negative weights in O(VE).', 'Floyd-Warshall gives all-pairs shortest paths in O(V^3).']),
  T('Minimum Spanning Tree', ['A spanning tree connects all vertices with V-1 edges and no cycle.', 'Kruskal sorts edges and uses Union-Find; Prim grows from a vertex with a priority queue.', 'Both give the minimum total weight.']),
  T('Union-Find (Disjoint Set)', ['Tracks connected components using find and union.', 'Path compression and union by rank make operations nearly O(1).', 'Used for cycle detection in undirected graphs and in Kruskal.']),
  T('Tries', ['A trie is a tree where each edge is a character; searching a word takes O(length).', 'Used for autocomplete and prefix search.', 'It uses more memory than a hash set.']),
  T('Greedy Algorithms', ['Take the best local choice at each step hoping for a global best.', 'Works when the greedy choice property holds: activity selection, Huffman coding, fractional knapsack.', 'Test with counter-examples; 0/1 knapsack needs DP.']),
  T('Dynamic Programming', ['Use it when there are overlapping subproblems and optimal substructure.', 'Memoization is top-down; tabulation is bottom-up.', 'Classics: Fibonacci, 0/1 knapsack, LCS, LIS, coin change, edit distance.']),
  T('Divide and Conquer', ['Split the problem, solve the parts, combine the answers (merge sort, quick sort, binary search).', 'Recurrence T(n) = 2T(n/2) + O(n) gives O(n log n).', 'Master theorem solves such recurrences quickly.']),
  T('Bit Manipulation', ['Operators: AND, OR, XOR, NOT, left and right shifts.', 'x & (x-1) clears the lowest set bit; x & 1 checks odd or even.', 'XOR of a number with itself is 0, used to find the single non-repeating element.'])
];

const dbms = [
  T('DBMS Basics and Architecture', ['A DBMS reduces redundancy and gives security and concurrent access compared with plain files.', 'Three-schema architecture: external, conceptual and internal levels.', 'Data independence means changing one level without affecting the level above.']),
  T('ER Model', ['Entities, attributes and relationships; cardinality is 1:1, 1:N or M:N.', 'A weak entity depends on a strong entity for identification.', 'An M:N relationship becomes a separate table.']),
  T('Relational Model and Keys', ['Super key, candidate key, primary key, alternate key and foreign key.', 'A candidate key is a minimal set of columns that identifies a row.', 'Foreign keys enforce referential integrity between tables.']),
  T('Relational Algebra', ['Selection (sigma) filters rows; projection (pi) picks columns.', 'Other operators: union, difference, Cartesian product, join.', 'SQL queries map to relational algebra expressions.']),
  T('SQL Commands (DDL, DML, DCL, TCL)', ['DDL: CREATE, ALTER, DROP, TRUNCATE. DML: SELECT, INSERT, UPDATE, DELETE.', 'DCL: GRANT, REVOKE. TCL: COMMIT, ROLLBACK, SAVEPOINT.', 'DELETE removes chosen rows and can be rolled back; TRUNCATE empties the table quickly; DROP removes the table.']),
  T('SQL Joins', ['INNER JOIN keeps matching rows; LEFT JOIN keeps all rows from the left table.', 'RIGHT JOIN and FULL JOIN work the same way for the right side and both sides.', 'SELF JOIN joins a table to itself; CROSS JOIN gives every combination.']),
  T('Aggregate Functions and GROUP BY', ['COUNT, SUM, AVG, MIN and MAX summarise rows.', 'WHERE filters rows before grouping; HAVING filters groups after GROUP BY.', 'COUNT(*) counts all rows, COUNT(column) ignores NULLs.']),
  T('Subqueries', ['A subquery is a query inside another query, in WHERE, FROM or SELECT.', 'A correlated subquery runs once for each outer row.', 'EXISTS checks whether rows exist; IN checks membership; use them for questions like the second highest salary.']),
  T('Functional Dependencies', ['X -> Y means X determines Y.', 'The closure of an attribute set helps find candidate keys.', 'BCNF: for every dependency X -> Y, X must be a super key.']),
  T('Normalization', ['1NF: atomic values. 2NF: no partial dependency. 3NF: no transitive dependency.', 'BCNF is a stricter version of 3NF.', 'Normalization reduces redundancy and update anomalies; denormalization is sometimes used for speed.']),
  T('Transactions and ACID', ['ACID = Atomicity, Consistency, Isolation, Durability.', 'COMMIT saves a transaction; ROLLBACK undoes it.', 'Isolation problems: dirty read, non-repeatable read, phantom read.']),
  T('Concurrency Control', ['Locks: shared for reading, exclusive for writing; two-phase locking gives serializability.', 'Isolation levels: read uncommitted, read committed, repeatable read, serializable.', 'Timestamp ordering is an alternative to locking.']),
  T('Indexing', ['An index speeds up reads but slows writes and uses extra space.', 'B+ tree is the most common index structure.', 'Index columns that are used often in WHERE and JOIN.']),
  T('Views, Triggers and Stored Procedures', ['A view is a saved query acting as a virtual table.', 'A trigger runs automatically on INSERT, UPDATE or DELETE.', 'A stored procedure is reusable precompiled SQL logic.']),
  T('Recovery and Logging', ['Write-ahead logging records changes in a log before applying them.', 'Checkpoints reduce the time needed for recovery.', 'Undo and redo operations restore a consistent state after a crash.']),
  T('SQL vs NoSQL', ['SQL databases have fixed schema and ACID; NoSQL has flexible schema and scales horizontally.', 'NoSQL types: document (MongoDB), key-value (Redis), column (Cassandra), graph (Neo4j).', 'CAP theorem: a distributed system cannot guarantee consistency, availability and partition tolerance all together.'])
];

const os = [
  T('OS Basics and Types', ['An OS manages hardware, memory, processes, files and I/O.', 'Types: batch, time-sharing, real-time and distributed systems.', 'User mode and kernel mode protect the system from faulty programs.']),
  T('System Calls and Kernel', ['System calls are the interface between a user program and the kernel (fork, exec, read, write).', 'fork creates a child process; exec replaces the process image.', 'A system call switches the CPU into kernel mode.']),
  T('Processes and States', ['States: new, ready, running, waiting, terminated.', 'The PCB stores process id, state, registers and memory information.', 'A context switch saves one PCB and loads another.']),
  T('Process vs Thread', ['A process has its own memory; threads of a process share code, data and heap but have their own stack and registers.', 'Thread context switching is cheaper than process switching.', 'Multithreading improves responsiveness and resource use.']),
  T('CPU Scheduling', ['Algorithms: FCFS, SJF, Priority and Round Robin.', 'Round Robin gives each process a fixed time quantum, good for time sharing.', 'Waiting time = turnaround time - burst time; priority scheduling can starve low priority processes.']),
  T('Process Synchronization', ['A race condition happens when the result depends on the order of execution.', 'Mutex is a lock for one thread; a semaphore is a counter (binary or counting).', 'A critical section solution needs mutual exclusion, progress and bounded waiting.']),
  T('Classic Synchronization Problems', ['Producer-consumer, readers-writers and dining philosophers.', 'They are solved with semaphores or mutexes.', 'Dining philosophers can deadlock if everyone picks up the left fork first.']),
  T('Deadlocks', ['Four conditions: mutual exclusion, hold and wait, no preemption, circular wait.', 'Prevent deadlock by breaking any one of the four conditions.', "Banker's algorithm avoids deadlock by checking for a safe state."]),
  T('Memory Management', ['Contiguous allocation strategies: first fit, best fit and worst fit.', 'Internal fragmentation is wasted space inside a block; external is wasted space between blocks.', 'Compaction can reduce external fragmentation.']),
  T('Paging', ['Logical memory is divided into pages and physical memory into frames of the same size.', 'The page table maps pages to frames; the TLB caches recent translations.', 'Paging removes external fragmentation but can cause internal fragmentation.']),
  T('Segmentation', ['Segmentation divides a program into logical parts such as code, data and stack.', 'Segments have different sizes, so external fragmentation can occur.', 'Some systems combine segmentation with paging.']),
  T('Virtual Memory and Page Replacement', ['Virtual memory lets programs use more memory than the RAM available.', 'A page fault happens when the needed page is not in RAM; FIFO, LRU and Optimal are replacement algorithms.', 'FIFO can show Belady anomaly; thrashing means too many page faults.']),
  T('File Systems', ['Allocation methods: contiguous, linked and indexed.', 'Directory structures: single-level, two-level and tree.', 'In Unix, an inode stores a file metadata.']),
  T('Disk Scheduling', ['Algorithms: FCFS, SSTF, SCAN (elevator), C-SCAN and LOOK.', 'The goal is to reduce seek time.', 'SSTF can starve requests that are far from the head.']),
  T('Inter-Process Communication', ['Two models: shared memory and message passing.', 'Mechanisms: pipes, message queues and sockets.', 'Shared memory is fastest but needs synchronization.'])
];

const cn = [
  T('Network Basics and Topologies', ['Network types: LAN, MAN and WAN.', 'Topologies: bus, star, ring and mesh.', 'Devices: hub repeats signals, switch forwards by MAC address, router forwards by IP address.']),
  T('OSI Model', ['7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.', 'Routing happens at the Network layer; TCP and UDP work at the Transport layer.', 'Mnemonic: Please Do Not Throw Sausage Pizza Away.']),
  T('TCP/IP Model', ['4 layers: Link, Internet, Transport, Application.', 'The Internet layer uses IP; the Transport layer uses TCP or UDP.', 'Application layer includes HTTP, DNS, FTP and SMTP.']),
  T('Data Link Layer', ['A MAC address is a 48-bit hardware address; ARP maps an IP address to a MAC address.', 'Error detection: parity, checksum and CRC.', 'Ethernet uses frames; switches learn MAC addresses.']),
  T('IP Addressing', ['IPv4 is 32 bits (like 192.168.1.1); IPv6 is 128 bits.', 'Classes A to E; private ranges are 10.x.x.x, 172.16 to 172.31.x.x and 192.168.x.x.', 'NAT lets many private addresses share one public address.']),
  T('Subnetting', ['A subnet mask separates the network part from the host part.', 'Usable hosts = 2^h - 2, where h is the number of host bits.', 'A /24 network has 256 addresses and 254 usable hosts.']),
  T('Routing', ['Distance vector (RIP) and link state (OSPF) are interior routing protocols.', 'BGP exchanges routes between autonomous systems on the internet.', 'A routing table decides the next hop for each destination.']),
  T('TCP vs UDP', ['TCP is connection-oriented, reliable and ordered; UDP is connectionless and faster with no delivery guarantee.', 'TCP is used for web and email; UDP for video calls, DNS queries and gaming.', 'TCP uses a 3-way handshake: SYN, SYN-ACK, ACK.']),
  T('TCP Flow and Congestion Control', ['Flow control uses a sliding window so the sender does not overwhelm the receiver.', 'Congestion control uses slow start and congestion avoidance.', 'Lost packets are detected by timeouts or duplicate ACKs.']),
  T('HTTP and HTTPS', ['HTTP methods: GET, POST, PUT, DELETE.', 'Status codes: 200 OK, 301 redirect, 404 Not Found, 500 Server Error.', 'HTTPS is HTTP over TLS, which encrypts the data.']),
  T('DNS', ['DNS converts domain names into IP addresses.', 'Lookup goes through the resolver, root, TLD and authoritative name servers.', 'Answers are cached to speed up later requests.']),
  T('DHCP, Email and File Protocols', ['DHCP automatically assigns IP addresses to devices.', 'Email: SMTP sends mail, POP3 and IMAP receive it.', 'FTP transfers files (port 21); SSH gives secure remote login (port 22).']),
  T('Common Ports', ['HTTP 80, HTTPS 443, FTP 21, SSH 22, SMTP 25, DNS 53.', 'A port number identifies an application on a host.', 'Well-known ports range from 0 to 1023.']),
  T('Network Security', ['SSL/TLS gives encryption, integrity and server authentication.', 'A firewall filters traffic using rules.', 'Common attacks: phishing, DoS or DDoS, man-in-the-middle.'])
];

const SUBJECTS = [
  { id: 'aptitude', icon: '📊', topics: aptitude },
  { id: 'reasoning', icon: '🧩', topics: reasoning },
  { id: 'verbal', icon: '📖', topics: verbal },
  { id: 'dsa', icon: '🧠', topics: dsa },
  { id: 'dbms', icon: '🗄️', topics: dbms },
  { id: 'os', icon: '⚙️', topics: os },
  { id: 'cn', icon: '🌐', topics: cn }
];

require('./content2').forEach((x) => SUBJECTS.push(x));

require('./content3').forEach((x) => SUBJECTS.push(x));

require('./content4').forEach((x) => { if (!SUBJECTS.some((y) => y.id === x.id)) SUBJECTS.push(x); });

module.exports = { SUBJECTS };