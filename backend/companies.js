const Q = (question, options, answer, explanation) => ({ question, options, answer, explanation });

const COMPANIES = [
  { id: 'tcs', name: 'TCS', type: 'service',
    focus: ['aptitude', 'reasoning', 'verbal', 'c', 'dbms'],
    rounds: [
      { name: 'TCS NQT online test', detail: 'Foundation section (numerical ability, verbal ability, reasoning) plus an advanced section with tougher aptitude and coding for higher roles.' },
      { name: 'Technical interview', detail: 'Final-year project, one programming language, DBMS, OS and networking basics.' },
      { name: 'Managerial and HR interview', detail: 'Communication, teamwork, willingness to relocate and career goals.' }
    ],
    tips: ['Practise timed aptitude sections daily.', 'Know your final-year project in depth.', 'Prepare one language well: C, Java or Python.'],
    questions: [
      Q('A shopkeeper sells an item at 20% profit. If the cost price is Rs. 500, what is the selling price?', ['550', '600', '620', '650'], 1, 'SP = 500 x 120/100 = 600.'),
      Q('Find the next number: 3, 8, 15, 24, 35, ?', ['46', '47', '48', '50'], 2, 'Differences are 5, 7, 9, 11, so the next is 35 + 13 = 48.'),
      Q('Choose the correct sentence: Neither of the boys ___ present.', ['are', 'is', 'were', 'have'], 1, 'Neither takes a singular verb.'),
      Q('Which data structure is used for Breadth First Search?', ['Stack', 'Queue', 'Heap', 'Tree'], 1, 'BFS visits level by level using a queue.'),
      Q('A can finish a work in 10 days and B in 15 days. Working together, how many days do they need?', ['5', '6', '7', '8'], 1, 'Per day 1/10 + 1/15 = 1/6, so 6 days.')
    ] },
  { id: 'infosys', name: 'Infosys', type: 'service',
    focus: ['reasoning', 'aptitude', 'verbal', 'oops', 'dbms'],
    rounds: [
      { name: 'Online assessment', detail: 'Reasoning, mathematical ability, verbal ability and pseudocode or puzzle solving; higher roles add coding problems.' },
      { name: 'Technical interview', detail: 'Programming basics, OOPs, DBMS and project discussion.' },
      { name: 'HR interview', detail: 'Communication, strengths, weaknesses and company knowledge.' }
    ],
    tips: ['Reasoning and puzzles carry a lot of weight, so practise them.', 'Learn to trace pseudocode step by step.', 'Be ready to explain OOPs with real examples.'],
    questions: [
      Q('A is the brother of B, B is the sister of C, and C is the father of D. How is A related to D?', ['Father', 'Uncle', 'Cousin', 'Grandfather'], 1, 'A is a sibling of C, and C is D father, so A is the uncle.'),
      Q('In how many ways can the letters of the word LEAD be arranged?', ['12', '24', '16', '48'], 1, '4 different letters give 4! = 24.'),
      Q('Pseudocode: x = 2; for i = 1 to 3: x = x * i; print x. What is printed?', ['6', '12', '24', '4'], 1, 'x becomes 2, then 4, then 12.'),
      Q('The average of 5 numbers is 20. If the number 30 is removed, what is the average of the remaining 4?', ['17.5', '18', '20', '22.5'], 0, 'Sum is 100; 100 - 30 = 70; 70/4 = 17.5.'),
      Q('Choose the synonym of Meticulous.', ['Careless', 'Careful', 'Quick', 'Lazy'], 1, 'Meticulous means very careful and precise.')
    ] },
  { id: 'wipro', name: 'Wipro', type: 'service',
    focus: ['aptitude', 'verbal', 'communication', 'c', 'dbms'],
    rounds: [
      { name: 'Online assessment', detail: 'Aptitude, logical and verbal sections, a written communication task and coding.' },
      { name: 'Technical interview', detail: 'Programming, DBMS, projects and basic problem solving.' },
      { name: 'HR interview', detail: 'Self-introduction, communication, relocation and shift flexibility.' }
    ],
    tips: ['Practise short essay and email writing.', 'Keep coding basics ready: loops, arrays, strings.', 'Speak clearly and confidently in the HR round.'],
    questions: [
      Q('A train runs at 90 km/h. What is its speed in m/s?', ['20', '25', '30', '35'], 1, 'Multiply by 5/18: 90 x 5/18 = 25.'),
      Q('Choose the antonym of Expand.', ['Extend', 'Contract', 'Grow', 'Enlarge'], 1, 'Contract is the opposite of expand.'),
      Q('What is the time complexity of accessing an array element by its index?', ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], 0, 'Index access is direct, so it takes constant time.'),
      Q('What is the simple interest on Rs. 5000 at 8% per annum for 2 years?', ['700', '800', '900', '1000'], 1, 'SI = 5000 x 8 x 2 / 100 = 800.'),
      Q('Which SQL keyword removes duplicate rows from the result?', ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'REMOVE'], 1, 'SELECT DISTINCT returns only different rows.')
    ] },
  { id: 'accenture', name: 'Accenture', type: 'service',
    focus: ['aptitude', 'reasoning', 'verbal', 'cn', 'communication'],
    rounds: [
      { name: 'Cognitive and technical assessment', detail: 'Reasoning, numerical and verbal ability plus technical MCQs on pseudocode, networking, security and cloud basics.' },
      { name: 'Coding and communication assessment', detail: 'Coding for some roles and a spoken or written English assessment.' },
      { name: 'Interview', detail: 'Technical and HR questions with focus on communication and learning attitude.' }
    ],
    tips: ['Revise networking, security and cloud basics.', 'Practise speaking English on simple topics daily.', 'Manage time; the assessment sections are timed separately.'],
    questions: [
      Q('Which protocol is used for secure web browsing?', ['FTP', 'HTTP', 'HTTPS', 'SMTP'], 2, 'HTTPS is HTTP over TLS, which encrypts data.'),
      Q('Which of these is a cloud service model?', ['HTTP', 'IaaS', 'DHCP', 'RAID'], 1, 'IaaS, PaaS and SaaS are the cloud service models.'),
      Q('SQL injection mainly exploits which weakness?', ['Weak Wi-Fi passwords', 'Unvalidated user input in queries', 'Outdated browsers', 'Slow servers'], 1, 'Attackers insert SQL through input that is not validated.'),
      Q('If 5 machines make 5 items in 5 minutes, how long do 100 machines take to make 100 items?', ['5 minutes', '20 minutes', '100 minutes', '1 minute'], 0, 'Each machine makes 1 item in 5 minutes.'),
      Q('Pseudocode: count = 0; for i = 1 to 10: if i mod 2 == 0 then count = count + 1; print count. What is printed?', ['4', '5', '6', '10'], 1, 'Even numbers from 1 to 10 are 2, 4, 6, 8, 10, so 5.')
    ] },
  { id: 'cognizant', name: 'Cognizant', type: 'service',
    focus: ['aptitude', 'reasoning', 'verbal', 'oops', 'dbms'],
    rounds: [
      { name: 'GenC online test', detail: 'Aptitude, logical reasoning, verbal ability and coding, with harder coding for higher roles.' },
      { name: 'Technical interview', detail: 'Programming, OOPs, DBMS and project.' },
      { name: 'HR interview', detail: 'Communication, adaptability and career goals.' }
    ],
    tips: ['Solve basic coding problems on strings and arrays.', 'Revise OOPs and SQL queries.', 'Prepare a clear self-introduction.'],
    questions: [
      Q('Two numbers are in the ratio 3:5 and their sum is 160. What is the smaller number?', ['50', '60', '80', '100'], 1, '3/8 of 160 = 60.'),
      Q('Which OOP concept means one name with many forms?', ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'], 1, 'Polymorphism means many forms.'),
      Q('Find the odd one out: 2, 3, 5, 9, 11', ['2', '5', '9', '11'], 2, '9 is not prime; the others are prime.'),
      Q('Which statement is NOT true for a primary key?', ['It is unique', 'It cannot be NULL', 'It can have duplicate values', 'It identifies a row'], 2, 'A primary key never has duplicates.'),
      Q('What is the value of 2^5 - 3^2?', ['21', '23', '25', '27'], 1, '32 - 9 = 23.')
    ] },
  { id: 'capgemini', name: 'Capgemini', type: 'service',
    focus: ['aptitude', 'reasoning', 'verbal', 'c', 'cn'],
    rounds: [
      { name: 'Online assessment', detail: 'Game-based or standard aptitude, pseudocode and technical MCQs, and an English communication test (pattern may change by year).' },
      { name: 'Technical and HR interview', detail: 'Programming basics, networking or DBMS, projects and communication.' }
    ],
    tips: ['Practise pseudocode tracing.', 'Improve English grammar and spelling.', 'Revise basic networking devices and layers.'],
    questions: [
      Q('Choose the correct spelling.', ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'], 1, 'Accommodate has double c and double m.'),
      Q('Find the missing number: 1, 4, 9, 16, ?, 36', ['20', '24', '25', '30'], 2, 'These are squares: 5^2 = 25.'),
      Q('Which device connects different networks and forwards packets using IP addresses?', ['Hub', 'Switch', 'Router', 'Repeater'], 2, 'Routers work at the network layer using IP addresses.'),
      Q('A car travels 150 km in 3 hours. At the same speed, how long will it take to cover 250 km?', ['4 hours', '5 hours', '6 hours', '7 hours'], 1, 'Speed is 50 km/h, so 250/50 = 5 hours.'),
      Q('Pseudocode: a = 7; b = 3; print a mod b. What is printed?', ['0', '1', '2', '3'], 1, '7 divided by 3 leaves remainder 1.')
    ] },
  { id: 'amazon', name: 'Amazon', type: 'product',
    focus: ['dsa', 'oops', 'dbms', 'os', 'communication'],
    rounds: [
      { name: 'Online assessment', detail: 'Coding problems (DSA) plus work-style and reasoning sections.' },
      { name: 'Technical interviews', detail: 'Several rounds of data structures and algorithms problem solving, explained aloud.' },
      { name: 'Leadership Principles round', detail: 'Behavioural questions answered with real examples, ideally in STAR format.' }
    ],
    tips: ['Practise DSA daily: arrays, strings, hashing, trees, graphs, DP.', 'Prepare 6 to 8 STAR stories from projects and teamwork.', 'Think aloud and state time complexity for every solution.'],
    questions: [
      Q('What is the time complexity of searching in a balanced binary search tree?', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 1, 'The height of a balanced BST is log n.'),
      Q('Which data structure gives O(1) average lookup by key?', ['Unsorted array', 'Linked list', 'Hash table', 'Binary search tree'], 2, 'Hash tables give average constant-time lookup.'),
      Q('Best way to find two numbers in an unsorted array that add up to a target in O(n)?', ['Nested loops', 'Sort and binary search each number', 'Use a hash map', 'Recursion'], 2, 'Store seen numbers in a hash map and check target - x.'),
      Q('Which Amazon leadership principle says leaders should never say it is not their job?', ['Frugality', 'Ownership', 'Bias for Action', 'Dive Deep'], 1, 'Ownership: leaders act on behalf of the whole company.'),
      Q('What is the worst-case time complexity of quick sort?', ['O(n log n)', 'O(n^2)', 'O(n)', 'O(log n)'], 1, 'A bad pivot on every step gives O(n^2).')
    ] },
  { id: 'microsoft', name: 'Microsoft', type: 'product',
    focus: ['dsa', 'os', 'dbms', 'oops', 'communication'],
    rounds: [
      { name: 'Online coding assessment', detail: 'Data structures and algorithm problems under time limits.' },
      { name: 'Technical interviews', detail: 'Multiple rounds on DSA, problem solving, CS fundamentals and basic design.' },
      { name: 'Behavioural or manager round', detail: 'Teamwork, learning from failure and motivation.' }
    ],
    tips: ['Master linked lists, trees, graphs and DP.', 'Revise OS and DBMS fundamentals.', 'Explain your approach before writing code.'],
    questions: [
      Q('Which technique detects a cycle in a linked list using O(1) extra space?', ['Hash set', 'Floyd tortoise and hare', 'Recursion', 'Sorting'], 1, 'Two pointers moving at different speeds meet if there is a cycle.'),
      Q('Inorder traversal of a binary search tree gives:', ['Sorted ascending order', 'Sorted descending order', 'Level order', 'Random order'], 0, 'Left, root, right visits values in ascending order.'),
      Q('What does the Durability property in ACID guarantee?', ['Transactions run one at a time', 'Committed changes survive failures', 'All operations happen or none', 'Data always follows the rules'], 1, 'Once committed, data is not lost even after a crash.'),
      Q('Which sorting algorithm is stable and always O(n log n)?', ['Quick sort', 'Heap sort', 'Merge sort', 'Selection sort'], 2, 'Merge sort is stable with guaranteed O(n log n).'),
      Q('Which of these is shared by all threads of the same process?', ['Stack', 'Registers', 'Heap memory', 'Program counter'], 2, 'Threads share heap and code; each has its own stack and registers.')
    ] },
  { id: 'google', name: 'Google', type: 'product',
    focus: ['dsa', 'os', 'cn', 'oops', 'communication'],
    rounds: [
      { name: 'Online assessment or coding screen', detail: 'Algorithm and data structure problems to screen candidates.' },
      { name: 'Technical interviews', detail: 'Several rounds focused on algorithms, data structures, complexity and clean code.' },
      { name: 'Behavioural round', detail: 'Collaboration, ambiguity handling and learning attitude.' }
    ],
    tips: ['Strong DSA and complexity analysis are essential.', 'Practise medium and hard graph, tree and DP problems.', 'Discuss trade-offs and edge cases clearly.'],
    questions: [
      Q('Root at height 0: what is the maximum number of nodes in a binary tree of height h?', ['2^h', '2^(h+1) - 1', '2h', 'h^2'], 1, 'Levels 0 to h hold 1 + 2 + ... + 2^h = 2^(h+1) - 1 nodes.'),
      Q('What is the time complexity of building a binary heap from n elements?', ['O(n log n)', 'O(n)', 'O(log n)', 'O(n^2)'], 1, 'Bottom-up heap construction is O(n).'),
      Q('Which algorithm finds shortest paths in a graph with non-negative edge weights?', ['DFS', 'Dijkstra', 'Kruskal', 'Topological sort'], 1, 'Dijkstra handles non-negative weights.'),
      Q('In how many ways can you climb 5 stairs taking 1 or 2 steps at a time?', ['5', '8', '10', '13'], 1, 'Ways follow Fibonacci: 1, 2, 3, 5, 8.'),
      Q('About how many comparisons does binary search need in the worst case for 1000 sorted elements?', ['5', '10', '100', '500'], 1, 'log2(1000) is about 10.')
    ] },
  { id: 'zoho', name: 'Zoho', type: 'product',
    focus: ['c', 'dsa', 'aptitude', 'reasoning', 'oops'],
    rounds: [
      { name: 'Written round', detail: 'Aptitude and C-style output-tracing questions, plus logic problems.' },
      { name: 'Programming rounds', detail: 'Several rounds where you write complete working programs, usually without much help from libraries.' },
      { name: 'Technical and HR interview', detail: 'Code discussion, fundamentals, projects and attitude.' }
    ],
    tips: ['Practise writing full programs by hand: patterns, strings, arrays, matrices.', 'Be strong in basics: pointers, loops, recursion.', 'Focus on logic building over memorising.'],
    questions: [
      Q('In C, what does the following print? int x = 7; x = x >> 1; printf("%d", x);', ['2', '3', '4', '7'], 1, 'Right shift by 1 divides by 2: 7 >> 1 = 3.'),
      Q('How many times does this loop run? for (i = 1; i <= 100; i *= 2)', ['6', '7', '8', '100'], 1, 'i takes 1, 2, 4, 8, 16, 32, 64: seven values.'),
      Q('Reversing a string with a stack works because a stack is:', ['FIFO', 'LIFO', 'Sorted', 'Random'], 1, 'Last in, first out reverses the order.'),
      Q('What is the sum of the digits of 2^10?', ['5', '7', '9', '10'], 1, '2^10 = 1024 and 1 + 0 + 2 + 4 = 7.'),
      Q('Which of these numbers is NOT prime?', ['83', '89', '91', '97'], 2, '91 = 7 x 13.')
    ] }
];

const { buildSet } = require('./qbank');
COMPANIES.forEach((c) => { c.questions = buildSet(c); });

module.exports = function (app, db, auth) {
  db.exec(
    'CREATE TABLE IF NOT EXISTS practice_attempts (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, company TEXT NOT NULL, ' +
    'score INTEGER NOT NULL, total INTEGER NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);'
  );

  const find = (id) => COMPANIES.find((c) => c.id === id);
  const best = (uid, cid) => {
    const r = db.prepare('SELECT score, total FROM practice_attempts WHERE user_id = ? AND company = ? ORDER BY score DESC LIMIT 1').get(uid, cid);
    return r || null;
  };

  app.get('/api/companies', auth, (req, res) => {
    res.json({
      companies: COMPANIES.map((c) => ({ id: c.id, name: c.name, type: c.type, best: best(req.user.id, c.id) }))
    });
  });

  app.get('/api/companies/:id', auth, (req, res) => {
    const c = find(req.params.id);
    if (!c) return res.status(404).json({ error: 'Company not found' });
    res.json({
      id: c.id, name: c.name, type: c.type, rounds: c.rounds, tips: c.tips, focus: c.focus,
      questionCount: c.questions.length, best: best(req.user.id, c.id)
    });
  });

  app.get('/api/companies/:id/questions', auth, (req, res) => {
    const c = find(req.params.id);
    if (!c) return res.status(404).json({ error: 'Company not found' });
    res.json({
      name: c.name,
      questions: c.questions.map((q, i) => ({ index: i, question: q.question, options: q.options }))
    });
  });

  app.post('/api/companies/:id/submit', auth, (req, res) => {
    const c = find(req.params.id);
    if (!c) return res.status(404).json({ error: 'Company not found' });
    const answers = (req.body && req.body.answers) || {};
    let score = 0;
    const results = c.questions.map((q, i) => {
      const correct = Number(answers[i]) === q.answer;
      if (correct) score += 1;
      return { index: i, correct, answer: q.answer, explanation: q.explanation };
    });
    db.prepare('INSERT INTO practice_attempts (user_id, company, score, total) VALUES (?,?,?,?)')
      .run(req.user.id, c.id, score, c.questions.length);
    res.json({ score, total: c.questions.length, results });
  });
};
module.exports.COMPANIES = COMPANIES;
