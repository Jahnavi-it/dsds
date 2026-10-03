const E = (q, kw, a) => ({ q, kw, a });

module.exports = {
  tcs: {
    tech: [
      E('Explain the four pillars of OOP with a simple real-life example.', ['encapsulation', 'inheritance', 'polymorphism', 'abstraction'], 'Encapsulation wraps data and methods in a class. Inheritance reuses a parent class. Polymorphism gives one method many forms. Abstraction hides details, like a car interface hiding the engine.'),
      E('Explain your final-year project: the problem, your role and the technologies used.', ['problem', 'role', 'technology', 'result', 'database', 'team'], 'State the problem, your exact role, the technologies (language, database, framework) and the result. TCS interviewers go deep on the project, so know every module.'),
      E('What is the difference between INNER JOIN and LEFT JOIN?', ['inner', 'left', 'matching', 'null', 'rows', 'table'], 'INNER JOIN returns only rows that match in both tables. LEFT JOIN returns all rows from the left table and NULL for non-matching right rows.'),
      E('What is a pointer in C and where is it used?', ['address', 'memory', 'variable', 'dynamic', 'array', 'malloc'], 'A pointer stores the memory address of a variable. It is used for dynamic memory with malloc, arrays, passing by reference and data structures like linked lists.'),
      E('What is the difference between a process and a thread?', ['memory', 'shared', 'lightweight', 'context', 'stack'], 'A process has its own memory space. Threads live inside a process, share its memory, and are lightweight with cheaper context switching.'),
      E('What are the phases of the SDLC?', ['requirement', 'design', 'development', 'testing', 'deployment', 'maintenance'], 'Requirement analysis, design, development, testing, deployment and maintenance. Models include Waterfall and Agile.'),
      E('Write the logic to reverse a string without using built-in functions.', ['loop', 'swap', 'index', 'two pointer', 'length', 'o(n)'], 'Use two pointers, one at the start and one at the end, swap characters and move inward until they meet. Time O(n), space O(1).')
    ],
    hr: [
      E('Are you willing to relocate to any TCS location in India?', ['relocat', 'ready', 'flexible', 'learn', 'location', 'adapt'], 'Answer honestly. If ready, say you are flexible and see relocation as a chance to learn, and mention any real constraint politely.'),
      E('Tell me about yourself.', ['college', 'project', 'skill', 'goal', 'internship', 'learn'], 'Give a one-minute summary: college and branch, key skills, a project, and your goal of building a career in IT.'),
      E('Why do you want to join TCS?', ['company', 'learn', 'training', 'growth', 'career', 'projects'], 'Mention TCS scale, varied domains, structured training and long-term career growth, and connect them to your goals.'),
      E('Where do you see yourself in five years?', ['goal', 'grow', 'learn', 'role', 'responsibility', 'skill'], 'Show steady growth: master your technology, take more responsibility, and contribute to client projects.'),
      E('How do you handle working in a team with different opinions?', ['listen', 'team', 'respect', 'solution', 'discuss', 'goal'], 'Listen to everyone, discuss calmly, focus on the team goal, and agree on the best solution.'),
      E('What are your strengths and weaknesses?', ['strength', 'weakness', 'example', 'improve', 'learn', 'working on'], 'Name a real strength with an example and a real weakness with what you are doing to improve it.')
    ]
  },
  infosys: {
    tech: [
      E('What is the difference between method overloading and overriding?', ['same', 'signature', 'runtime', 'compile', 'parent', 'child'], 'Overloading is the same method name with different parameters, resolved at compile time. Overriding redefines a parent method in a child class, resolved at runtime.'),
      E('What is normalization? Explain 1NF, 2NF and 3NF.', ['redundancy', 'atomic', 'partial', 'transitive', 'anomaly', '3nf'], 'Normalization removes redundancy. 1NF has atomic values, 2NF removes partial dependency, 3NF removes transitive dependency.'),
      E('What is the difference between an abstract class and an interface?', ['abstract', 'interface', 'implement', 'multiple', 'method', 'constructor'], 'An abstract class can have both implemented and abstract methods and constructors. An interface defines a contract, and a class can implement many interfaces.'),
      E('Explain exception handling with try, catch and finally.', ['try', 'catch', 'finally', 'error', 'runtime', 'throw'], 'Code that may fail goes in try, errors are handled in catch, and finally always runs for cleanup such as closing files.'),
      E('What is the difference between a list and a tuple in Python?', ['mutable', 'immutable', 'change', 'faster', 'list', 'tuple'], 'A list is mutable. A tuple is immutable and slightly faster, used for fixed data.'),
      E('What are SQL constraints? Name a few.', ['primary key', 'foreign key', 'unique', 'not null', 'check', 'default'], 'Constraints enforce data rules: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK and DEFAULT.'),
      E('Explain one project from your resume and your contribution.', ['problem', 'role', 'technology', 'result', 'team', 'database'], 'Describe the problem, your role, technologies and measurable result. Infosys also asks how you tested it.')
    ],
    hr: [
      E('Why do you want to join Infosys?', ['company', 'learn', 'training', 'growth', 'technology', 'career'], 'Mention Infosys training programs, learning culture, global clients and career growth, and link them to your goals.'),
      E('Are you comfortable with training at the Mysuru campus and relocation?', ['training', 'relocat', 'ready', 'learn', 'flexible', 'adapt'], 'Answer honestly. If ready, say you welcome structured training and are flexible about location.'),
      E('How do you keep learning new technologies?', ['learn', 'course', 'practice', 'project', 'online', 'time'], 'Mention online courses, small projects, documentation and regular practice, with one real example.'),
      E('Tell me about a time you solved a difficult problem.', ['problem', 'approach', 'solution', 'result', 'learn', 'example'], 'Use STAR: the problem, your approach, the solution and the result.'),
      E('How do you handle feedback or criticism?', ['listen', 'feedback', 'improve', 'learn', 'positive', 'apply'], 'Listen without arguing, thank them, and apply the feedback to improve.'),
      E('Tell me about yourself.', ['college', 'project', 'skill', 'goal', 'internship', 'learn'], 'Give a short summary of your education, skills, a project and your career goal.')
    ]
  },
  wipro: {
    tech: [
      E('What is the difference between call by value and call by reference in C?', ['value', 'reference', 'copy', 'pointer', 'address', 'original'], 'Call by value passes a copy, so the original is unchanged. Call by reference passes the address, so changes affect the original.'),
      E('What are ACID properties in a database?', ['atomicity', 'consistency', 'isolation', 'durability', 'transaction'], 'Atomicity: all or nothing. Consistency: valid state. Isolation: transactions do not interfere. Durability: committed data persists.'),
      E('What is deadlock and how can it be prevented?', ['mutual exclusion', 'hold and wait', 'circular', 'preemption', 'resource'], 'Deadlock is a circular wait for resources. It needs four conditions, and breaking any one prevents it.'),
      E('What is the difference between TCP and UDP?', ['reliable', 'connection', 'handshake', 'fast', 'streaming', 'order'], 'TCP is reliable and ordered with a handshake. UDP is faster and connectionless, used for streaming and gaming.'),
      E('What is Agile and how is it different from Waterfall?', ['iterative', 'sprint', 'feedback', 'sequential', 'change', 'customer'], 'Agile delivers in short sprints with continuous feedback and change. Waterfall is sequential, and each phase finishes before the next.'),
      E('What is the difference between stack and heap memory?', ['stack', 'heap', 'dynamic', 'local', 'allocation', 'automatic'], 'Stack holds local variables and is managed automatically. Heap holds dynamically allocated memory that you free or that garbage collection frees.'),
      E('Explain your project and the challenges you faced.', ['problem', 'role', 'technology', 'challenge', 'solution', 'result'], 'Explain the problem, your role, technologies, a real challenge and how you solved it.')
    ],
    hr: [
      E('Why do you want to join Wipro?', ['company', 'learn', 'growth', 'technology', 'values', 'career'], 'Mention Wipro global presence, learning opportunities and integrity-focused values, and connect them to your goals.'),
      E('Are you comfortable with shift timings and relocation?', ['shift', 'relocat', 'flexible', 'ready', 'adapt', 'family'], 'Answer honestly. If ready, say you can adapt to shifts and location, and mention constraints politely.'),
      E('Introduce yourself in one minute.', ['college', 'project', 'skill', 'goal', 'internship', 'learn'], 'Cover education, skills, a project and your goal in about a minute, in clear spoken English.'),
      E('How do you manage pressure and deadlines?', ['prioritize', 'plan', 'time', 'calm', 'deadline', 'example'], 'Prioritize, plan, stay calm and give a real example of meeting a deadline.'),
      E('Tell me about a time you showed integrity.', ['honest', 'truth', 'right', 'example', 'situation', 'result'], 'Describe a real situation where you chose honesty even when it was difficult, and the outcome.'),
      E('What are your strengths and weaknesses?', ['strength', 'weakness', 'example', 'improve', 'learn', 'working on'], 'One real strength with an example, one real weakness with your improvement plan.')
    ]
  },
  accenture: {
    tech: [
      E('What is cloud computing and what are IaaS, PaaS and SaaS?', ['cloud', 'infrastructure', 'platform', 'software', 'service', 'scalable'], 'Cloud computing delivers computing over the internet. IaaS gives infrastructure, PaaS gives a platform to build apps, SaaS gives ready software.'),
      E('Explain Agile and the Scrum roles.', ['sprint', 'product owner', 'scrum master', 'team', 'backlog', 'iteration'], 'Agile builds in short iterations. In Scrum the Product Owner manages the backlog, the Scrum Master removes blockers and the team delivers the sprint.'),
      E('What is the difference between SQL and NoSQL databases?', ['table', 'schema', 'document', 'scalable', 'relational', 'flexible'], 'SQL databases are relational with fixed schema. NoSQL stores flexible data like documents and scales horizontally.'),
      E('What is a REST API?', ['http', 'get', 'post', 'stateless', 'json', 'resource'], 'REST exposes resources through URLs and HTTP methods. It is stateless and usually returns JSON.'),
      E('What are the types of software testing?', ['unit', 'integration', 'system', 'regression', 'manual', 'automation'], 'Unit, integration, system and acceptance testing, plus regression testing, done manually or with automation.'),
      E('Explain OOP concepts with one example.', ['encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'class', 'object'], 'Encapsulation, inheritance, polymorphism and abstraction, shown with an example like Animal and Dog classes.'),
      E('Describe a project where you used a team and version control.', ['git', 'team', 'branch', 'commit', 'role', 'merge'], 'Describe your role, using Git branches, commits and merges, and how the team coordinated.')
    ],
    hr: [
      E('Why Accenture?', ['company', 'innovation', 'client', 'learn', 'growth', 'technology'], 'Mention Accenture consulting plus technology mix, innovation, varied clients and learning opportunities.'),
      E('How do you adapt to change?', ['adapt', 'change', 'learn', 'flexible', 'example', 'positive'], 'Say you stay positive, learn quickly and give a real example of adapting to a change.'),
      E('Tell me about a time you worked with a diverse team.', ['team', 'diverse', 'communicat', 'respect', 'result', 'example'], 'Use STAR: the team, how you communicated respectfully, and the result.'),
      E('Are you ready to work in shifts and for global clients?', ['shift', 'global', 'client', 'ready', 'flexible', 'time zone'], 'Answer honestly. If ready, say you are flexible with time zones and see global clients as exposure.'),
      E('Tell me about yourself.', ['college', 'project', 'skill', 'goal', 'internship', 'learn'], 'Give a short summary of education, skills, a project and your goal.'),
      E('Describe a situation where you took initiative.', ['initiative', 'plan', 'result', 'example', 'responsibility', 'team'], 'Explain the situation, the step you took on your own, and the result.')
    ]
  },
  cognizant: {
    tech: [
      E('What is the difference between ArrayList and LinkedList in Java?', ['array', 'linked', 'access', 'insertion', 'memory', 'index'], 'ArrayList is index-based with fast access but slow middle insertion. LinkedList has fast insertion or deletion but slow access.'),
      E('What is a primary key and a foreign key?', ['unique', 'null', 'reference', 'table', 'identify'], 'A primary key uniquely identifies a row and cannot be null. A foreign key references another table primary key.'),
      E('Explain polymorphism with an example.', ['overload', 'override', 'runtime', 'compile', 'method', 'object'], 'Polymorphism lets one method behave differently, through overloading at compile time and overriding at runtime.'),
      E('What is the difference between GROUP BY and ORDER BY?', ['group', 'order', 'aggregate', 'sort', 'count', 'rows'], 'GROUP BY groups rows for aggregate functions. ORDER BY sorts the result rows.'),
      E('What are HTML, CSS and JavaScript used for?', ['structure', 'style', 'behavior', 'page', 'browser', 'interactive'], 'HTML gives structure, CSS gives style and JavaScript gives behavior to a web page.'),
      E('What is a stack and where is it used?', ['lifo', 'push', 'pop', 'undo', 'recursion', 'browser'], 'A stack is LIFO with push and pop. It is used in undo, recursion and browser history.'),
      E('Explain Agile and your role in a team project.', ['sprint', 'team', 'role', 'feedback', 'iteration', 'agile'], 'Agile delivers in short sprints with feedback. Describe your role, tools and how the team communicated.')
    ],
    hr: [
      E('Why do you want to join Cognizant?', ['company', 'learn', 'growth', 'client', 'technology', 'career'], 'Mention Cognizant training, client work and growth, and link them to your goals.'),
      E('How do you prioritize client satisfaction in your work?', ['client', 'customer', 'quality', 'deadline', 'communicat', 'feedback'], 'Understand client needs, deliver quality on time, communicate regularly and act on feedback.'),
      E('Tell me about yourself.', ['college', 'project', 'skill', 'goal', 'internship', 'learn'], 'Short summary of education, skills, a project and your goal.'),
      E('Are you open to learning new technologies as the project demands?', ['learn', 'new', 'technology', 'adapt', 'ready', 'example'], 'Say yes, with an example of quickly learning a new tool for a project.'),
      E('Describe a conflict in a team and how you handled it.', ['listen', 'talk', 'understand', 'solution', 'respect', 'team'], 'Listen, understand both sides, discuss calmly and find a solution that helps the team.'),
      E('What are your strengths and weaknesses?', ['strength', 'weakness', 'example', 'improve', 'learn', 'working on'], 'One real strength with an example, one real weakness with your improvement plan.')
    ]
  },
  capgemini: {
    tech: [
      E('What is the difference between JDK, JRE and JVM?', ['jdk', 'jre', 'jvm', 'compile', 'bytecode', 'run'], 'JVM runs bytecode, JRE is JVM plus libraries to run programs, and JDK is JRE plus tools to develop and compile.'),
      E('What are joins in SQL? Name the types.', ['inner', 'left', 'right', 'full', 'table', 'matching'], 'Joins combine rows from tables: INNER, LEFT, RIGHT and FULL, based on a matching column.'),
      E('Explain inheritance and its types.', ['single', 'multilevel', 'hierarchical', 'parent', 'child', 'reuse'], 'Inheritance lets a child reuse a parent class. Types include single, multilevel and hierarchical.'),
      E('What is the difference between an array and a linked list?', ['contiguous', 'pointer', 'index', 'insertion', 'memory', 'o(1)'], 'Array: contiguous memory, O(1) index access. Linked list: nodes with pointers, easy insertion, O(n) access.'),
      E('What is software testing and why is it important?', ['bug', 'quality', 'requirement', 'test case', 'unit', 'defect'], 'Testing checks that software meets requirements and finds defects early, which improves quality and reduces cost.'),
      E('What is cloud computing and name any cloud provider?', ['cloud', 'aws', 'azure', 'scalable', 'storage', 'service'], 'Cloud computing gives on-demand computing and storage over the internet. Examples are AWS, Azure and Google Cloud.'),
      E('Explain your project and the testing you did.', ['problem', 'role', 'technology', 'testing', 'result', 'team'], 'Explain the problem, your role, technologies, how you tested it and the result.')
    ],
    hr: [
      E('Why Capgemini?', ['company', 'learn', 'growth', 'team', 'technology', 'global'], 'Mention Capgemini global reach, team culture and learning opportunities, and connect them to your goals.'),
      E('What does teamwork mean to you? Give an example.', ['team', 'role', 'communicat', 'result', 'example', 'support'], 'Teamwork means sharing goals and supporting each other. Give a real STAR example.'),
      E('Tell me about yourself.', ['college', 'project', 'skill', 'goal', 'internship', 'learn'], 'Short summary of education, skills, a project and your goal.'),
      E('How do you handle failure?', ['failed', 'mistake', 'learn', 'improve', 'result', 'next time'], 'Accept the failure, learn from it, improve and give a real example.'),
      E('Are you comfortable with relocation and flexible timings?', ['relocat', 'shift', 'flexible', 'ready', 'adapt', 'family'], 'Answer honestly and politely mention any real constraint.'),
      E('Where do you see yourself in five years?', ['goal', 'grow', 'learn', 'role', 'responsibility', 'skill'], 'Show growth in skills and responsibility within the company.')
    ]
  },
  amazon: {
    tech: [
      E('Given an array and a target, find two numbers that add up to the target. Explain your approach and complexity.', ['hash', 'map', 'complement', 'o(n)', 'loop', 'index'], 'Use a hash map: for each number check whether target minus number is already in the map, otherwise store it. Time O(n), space O(n).'),
      E('How would you design an LRU cache?', ['hash', 'linked list', 'o(1)', 'evict', 'recent', 'capacity'], 'Combine a hash map with a doubly linked list. The map gives O(1) lookup and the list keeps recency order, so you evict from the tail when capacity is full.'),
      E('Explain BFS and DFS and when you would use each.', ['queue', 'stack', 'level', 'shortest', 'recursion', 'graph'], 'BFS uses a queue and finds shortest paths in unweighted graphs. DFS uses a stack or recursion and suits path exploration and cycle detection.'),
      E('How do you detect a cycle in a linked list?', ['slow', 'fast', 'pointer', 'floyd', 'meet', 'o(1)'], 'Use Floyd cycle detection: a slow and a fast pointer. If they meet there is a cycle. Time O(n), space O(1).'),
      E('How would you design a URL shortener?', ['hash', 'database', 'id', 'redirect', 'scalable', 'cache'], 'Generate a unique short id (base62 of a counter or hash), store the mapping in a database, redirect on lookup, and add caching and scaling for reads.'),
      E('What is the time complexity of searching in a balanced BST and in a hash table?', ['log', 'o(1)', 'balanced', 'hash', 'collision', 'average'], 'Balanced BST search is O(log n). Hash table search is O(1) on average, but O(n) in the worst case with collisions.'),
      E('Tell me about a technical project where you took ownership and the trade-offs you made.', ['ownership', 'trade-off', 'decision', 'result', 'metric', 'problem'], 'Describe the problem, your ownership, the trade-offs you weighed and a measurable result.')
    ],
    hr: [
      E('Tell me about a time you put the customer first, even when it was difficult.', ['customer', 'need', 'problem', 'action', 'result', 'feedback'], 'Use STAR: the customer problem, what you did for them, and the result.'),
      E('Describe a time you took ownership of something outside your responsibility.', ['ownership', 'responsib', 'action', 'result', 'initiative', 'example'], 'Explain the situation, why you took it on, what you did and the result.'),
      E('Tell me about a time you had a tight deadline and had to act fast with limited information.', ['deadline', 'decision', 'priorit', 'action', 'result', 'fast'], 'Show bias for action: you prioritized, decided with available data, acted, and learned from the result.'),
      E('Give an example of when you dove deep into a problem to find the root cause.', ['root cause', 'data', 'analy', 'problem', 'solution', 'result'], 'Describe how you gathered data, found the root cause and fixed it permanently.'),
      E('Tell me about a time you failed. What did you learn?', ['failed', 'mistake', 'learn', 'improve', 'result', 'next time'], 'Own the failure honestly, say what you learned and how you changed.'),
      E('Tell me about a time you disagreed with a teammate and how you resolved it.', ['disagree', 'listen', 'data', 'commit', 'result', 'team'], 'Show respectful disagreement backed by data, and committing to the team decision.')
    ]
  },
  microsoft: {
    tech: [
      E('How do you reverse a linked list? Explain the approach and complexity.', ['pointer', 'previous', 'next', 'iterate', 'o(n)', 'head'], 'Iterate with previous, current and next pointers, reversing each link. Time O(n), space O(1).'),
      E('Explain inorder, preorder and postorder traversal of a binary tree.', ['left', 'right', 'root', 'recursion', 'inorder', 'postorder'], 'Inorder is left, root, right (sorted for a BST). Preorder is root, left, right. Postorder is left, right, root.'),
      E('Design a parking lot system using OOP.', ['class', 'vehicle', 'slot', 'ticket', 'inheritance', 'method'], 'Classes: ParkingLot, Slot, Vehicle (Car, Bike as subclasses), Ticket. Methods park and unpark, with slot allocation by vehicle type.'),
      E('What is the difference between a process and a thread, and what is a race condition?', ['thread', 'shared', 'race', 'lock', 'synchron', 'mutex'], 'Threads share memory inside a process. A race condition occurs when threads access shared data unsafely, and locks or mutexes prevent it.'),
      E('How would you check if a string is a palindrome?', ['two pointer', 'reverse', 'compare', 'o(n)', 'loop', 'character'], 'Compare characters from both ends moving inward, or compare with the reversed string. Time O(n).'),
      E('What is the difference between SQL INNER JOIN and LEFT JOIN, and how do indexes help?', ['inner', 'left', 'index', 'search', 'faster', 'null'], 'INNER JOIN returns matches only, LEFT JOIN keeps all left rows. Indexes speed up searches at the cost of slower writes.'),
      E('Explain a project where you debugged a hard problem.', ['debug', 'log', 'reproduce', 'root cause', 'fix', 'test'], 'Describe how you reproduced the bug, used logs to find the root cause, fixed it and added tests.')
    ],
    hr: [
      E('What does a growth mindset mean to you? Give an example.', ['learn', 'growth', 'mistake', 'feedback', 'improve', 'example'], 'A growth mindset means believing skills improve with effort. Give a real example of learning from a mistake.'),
      E('Tell me about a time you collaborated across teams.', ['collaborat', 'team', 'communicat', 'goal', 'result', 'example'], 'Use STAR: the shared goal, how you collaborated, and the result.'),
      E('How do you make sure everyone feels included in your team?', ['inclusive', 'listen', 'respect', 'voice', 'team', 'diverse'], 'Listen actively, invite quieter members, respect differences and share credit.'),
      E('Tell me about a time you received tough feedback.', ['feedback', 'listen', 'improve', 'learn', 'apply', 'result'], 'Accept it openly, act on it, and show the improvement.'),
      E('Why Microsoft?', ['technology', 'impact', 'learn', 'product', 'mission', 'growth'], 'Mention products with real impact, the mission to empower people, and learning opportunities.'),
      E('Tell me about a time you worked on something ambiguous.', ['ambiguous', 'clarify', 'plan', 'assumption', 'result', 'learn'], 'Show how you asked questions, made assumptions explicit, planned and delivered.')
    ]
  },
  google: {
    tech: [
      E('How would you search for an element in a sorted array efficiently?', ['binary', 'mid', 'log', 'sorted', 'half', 'o(log n)'], 'Use binary search: compare with the middle and discard half each step. Time O(log n).'),
      E('Explain Dijkstra algorithm and when it fails.', ['shortest', 'priority queue', 'weight', 'negative', 'graph', 'greedy'], 'Dijkstra finds shortest paths from a source using a priority queue and a greedy choice. It fails with negative edge weights.'),
      E('What is dynamic programming? Explain with the Fibonacci or knapsack example.', ['overlapping', 'subproblem', 'memo', 'table', 'optimal', 'recursion'], 'Dynamic programming stores answers to overlapping subproblems (memoization or tabulation) so each is solved once, reducing exponential time to polynomial.'),
      E('How would you design a system to handle millions of search queries per second?', ['cache', 'load balanc', 'shard', 'replica', 'scalable', 'index'], 'Use load balancers, caching, sharding and replication, and an inverted index for search, plus monitoring.'),
      E('What is the time and space complexity of merge sort and quick sort?', ['n log n', 'space', 'worst', 'pivot', 'divide', 'stable'], 'Merge sort is O(n log n) with O(n) space and stable. Quick sort is O(n log n) average, O(n^2) worst case, with O(log n) space.'),
      E('What is the difference between recursion and iteration? When can recursion be a problem?', ['stack', 'overflow', 'base case', 'loop', 'memory', 'recursion'], 'Recursion calls itself with a base case. Deep recursion can overflow the stack, so iteration or tail optimization helps.'),
      E('Explain how you would find the kth largest element in an array.', ['heap', 'sort', 'quickselect', 'o(n)', 'kth', 'priority'], 'Use a min-heap of size k in O(n log k), or quickselect in O(n) average.')
    ],
    hr: [
      E('Tell me about a time you worked on an ambiguous problem with no clear answer.', ['ambiguous', 'clarify', 'plan', 'data', 'result', 'learn'], 'Show how you broke the problem down, gathered data, made progress and learned.'),
      E('Describe a time you helped a teammate succeed.', ['help', 'team', 'support', 'result', 'communicat', 'example'], 'Use STAR: how you noticed the need, helped, and the result for the team.'),
      E('Tell me about a project where you made a real impact.', ['impact', 'result', 'metric', 'problem', 'role', 'users'], 'Explain the problem, your role and a measurable impact.'),
      E('How do you handle disagreement with a teammate on a technical decision?', ['data', 'listen', 'discuss', 'trade-off', 'decision', 'respect'], 'Discuss with data and trade-offs, respect their view and commit to the decision.'),
      E('Why Google?', ['technology', 'impact', 'learn', 'users', 'scale', 'innovation'], 'Mention products at global scale, learning from strong engineers and building for many users.'),
      E('Tell me about something new you taught yourself.', ['learn', 'self', 'resource', 'practice', 'project', 'result'], 'Describe what you learned, how you taught yourself and what you built with it.')
    ]
  },
  zoho: {
    tech: [
      E('Write the logic to print a number pattern such as a pyramid. How do you decide the loops?', ['loop', 'nested', 'row', 'column', 'space', 'print'], 'Use an outer loop for rows and inner loops for spaces and numbers, deriving the counts from the row number.'),
      E('How do you check whether two strings are anagrams?', ['sort', 'count', 'frequency', 'length', 'character', 'o(n)'], 'Check that lengths match, then compare sorted strings or character frequency counts. Frequency counting is O(n).'),
      E('Explain recursion with a factorial or Fibonacci program and its drawbacks.', ['base case', 'recursion', 'stack', 'call', 'memory', 'iterat'], 'A function calls itself with a base case. Drawbacks are stack usage and repeated work, which memoization or iteration fixes.'),
      E('How would you implement a stack using an array? What are overflow and underflow?', ['array', 'top', 'push', 'pop', 'overflow', 'underflow'], 'Keep an array and a top index. Push increments top, pop decrements it. Overflow is pushing to a full stack, underflow is popping from an empty one.'),
      E('Design the classes for a library management system.', ['class', 'book', 'member', 'object', 'method', 'inheritance'], 'Classes Book, Member and Library, with methods issue and return. Use inheritance for member types and encapsulate data.'),
      E('What is the difference between DELETE, TRUNCATE and DROP in SQL?', ['delete', 'truncate', 'drop', 'rollback', 'table', 'rows'], 'DELETE removes rows with a condition and can be rolled back. TRUNCATE removes all rows quickly. DROP removes the table itself.'),
      E('Explain how you would debug a program that gives wrong output only for some inputs.', ['test', 'input', 'edge', 'debug', 'trace', 'case'], 'Reproduce with failing inputs, test edge cases, trace variable values step by step, find the faulty condition and fix it.')
    ],
    hr: [
      E('Zoho values long-term commitment. Are you ready to stay and grow with us?', ['long term', 'commit', 'grow', 'learn', 'company', 'career'], 'Answer honestly. If yes, explain you want to build skills and a career through real product work.'),
      E('Why Zoho, and not a large service company?', ['product', 'build', 'learn', 'technology', 'ownership', 'growth'], 'Say you want to build products, learn deeply and own your work.'),
      E('Tell me about something you built or learned on your own, outside college.', ['project', 'self', 'learn', 'build', 'result', 'practice'], 'Describe a personal project or skill, how you learned it and the result.'),
      E('Are you comfortable with a smaller-town work location and a simple work culture?', ['location', 'ready', 'flexible', 'adapt', 'culture', 'focus'], 'Answer honestly. If comfortable, say you value focus on work and learning over the location.'),
      E('Tell me about yourself.', ['college', 'project', 'skill', 'goal', 'internship', 'learn'], 'Short summary of education, skills, a project and your goal.'),
      E('How do you handle a problem you cannot solve at first?', ['break', 'research', 'try', 'ask', 'persist', 'solution'], 'Break it down, research, try different approaches, ask for help when needed, and keep trying.')
    ]
  }
};
