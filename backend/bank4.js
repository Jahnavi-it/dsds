const makeGen = require('./gen');
const { rnd, pick, add, gen, out } = makeGen(7777);
const B = (cat, question, options, answer, explanation) => ({ cat, question, options, answer, explanation });

const hand = [
  B('dsa', 'What is the worst-case time complexity of bubble sort?', ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], 2, 'Two nested passes over the array give O(n^2).'),
  B('dsa', 'What is the space complexity of merge sort?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 2, 'It needs an extra array of size n for merging.'),
  B('dsa', 'Which of these is NOT a linear data structure?', ['Array', 'Stack', 'Queue', 'Tree'], 3, 'A tree is hierarchical; the others keep elements in a sequence.'),
  B('dsa', 'Which algorithm detects a cycle in a linked list using two pointers?', ['Dijkstra', 'Floyd tortoise and hare', 'Kruskal', 'Bellman-Ford'], 1, 'A slow and a fast pointer meet if there is a cycle.'),
  B('dsa', 'What is the worst-case time to search an element in an unsorted array?', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 2, 'You may have to check every element.'),
  B('dsa', 'Which data structure does recursion use internally?', ['Queue', 'Call stack', 'Heap', 'Graph'], 1, 'Each function call is pushed on the call stack.'),
  B('dsa', 'What is the height of a balanced binary search tree with n nodes?', ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'], 1, 'Each level roughly doubles the nodes, so height is about log n.'),
  B('dsa', 'Which algorithm builds a minimum spanning tree by adding the cheapest edge that does not form a cycle?', ['Dijkstra', 'Kruskal', 'DFS', 'Binary search'], 1, 'This is Kruskal algorithm.'),

  B('dbms', 'What does DISTINCT do in a SELECT query?', ['Sorts rows', 'Removes duplicate rows from the result', 'Deletes rows', 'Joins tables'], 1, 'DISTINCT keeps only unique rows in the output.'),
  B('dbms', 'Which SQL command gives a privilege to a user?', ['GRANT', 'COMMIT', 'ROLLBACK', 'SAVEPOINT'], 0, 'GRANT gives access rights; REVOKE takes them back.'),
  B('dbms', 'What is a view in SQL?', ['A physical copy of a table', 'A virtual table based on a query', 'An index', 'A backup'], 1, 'A view stores a query, not the data itself.'),
  B('dbms', 'Reading data written by another transaction that is not yet committed is called:', ['Dirty read', 'Phantom read', 'Lost update', 'Deadlock'], 0, 'That is a dirty read.'),
  B('dbms', 'A candidate key that is not chosen as the primary key is called:', ['Foreign key', 'Alternate key', 'Composite key', 'Super key only'], 1, 'The unused candidate keys are alternate keys.'),
  B('dbms', 'Which normal form is stricter than 3NF?', ['2NF', 'BCNF', '1NF', 'None'], 1, 'BCNF requires every determinant to be a candidate key.'),
  B('dbms', 'Which command undoes the changes of the current transaction?', ['COMMIT', 'ROLLBACK', 'GRANT', 'TRUNCATE'], 1, 'ROLLBACK cancels uncommitted changes.'),

  B('os', 'Which of these is NOT a process state?', ['Ready', 'Running', 'Waiting', 'Compiling'], 3, 'Typical states are new, ready, running, waiting and terminated.'),
  B('os', 'The Banker algorithm is used for:', ['Deadlock avoidance', 'CPU scheduling', 'Paging', 'File search'], 0, 'It checks whether granting a request keeps the system in a safe state.'),
  B('os', 'What happens in a context switch?', ['The CPU saves the state of one process and loads another', 'Memory is erased', 'The disk is formatted', 'A file is closed'], 0, 'The OS stores the old process state and restores the next one.'),
  B('os', 'Which of these is the fastest memory?', ['Hard disk', 'RAM', 'Register', 'Pen drive'], 2, 'Registers are inside the CPU and are the fastest.'),
  B('os', 'FIFO page replacement replaces:', ['The least recently used page', 'The oldest page in memory', 'The largest page', 'A random page'], 1, 'The page that came in first goes out first.'),

  B('cn', 'Which protocol is used to send email?', ['FTP', 'SMTP', 'HTTP', 'SNMP'], 1, 'SMTP sends mail between servers.'),
  B('cn', 'In the TCP/IP model, HTTP works in which layer?', ['Application', 'Transport', 'Network', 'Link'], 0, 'HTTP is an application layer protocol.'),
  B('cn', 'What does ARP do?', ['Maps an IP address to a MAC address', 'Maps a domain to an IP address', 'Encrypts packets', 'Routes packets'], 0, 'ARP finds the MAC address for a known IP address.'),
  B('cn', 'How many usable host addresses are there in a /24 IPv4 network?', ['256', '255', '254', '253'], 2, '256 addresses minus the network and broadcast addresses = 254.'),
  B('cn', 'What is the default port of HTTPS?', ['80', '443', '21', '22'], 1, 'HTTPS uses port 443.'),

  B('oops', 'Which Java keyword stops a class from being inherited?', ['static', 'final', 'abstract', 'private'], 1, 'A final class cannot be extended.'),
  B('oops', 'Variables declared inside a Java interface are by default:', ['private', 'public static final', 'protected', 'static only'], 1, 'Interface variables are constants.'),
  B('oops', 'Data hiding is mainly achieved using:', ['Public members', 'Private access specifier', 'Global variables', 'Macros'], 1, 'Private members cannot be accessed from outside the class.'),
  B('oops', 'Having several methods with the same name but different parameters in one class is called:', ['Overloading', 'Overriding', 'Encapsulation', 'Inheritance'], 0, 'That is method overloading.'),

  B('java', 'What is the entry point of a Java program?', ['public static void main(String[] args)', 'void start()', 'static main()', 'public run()'], 0, 'The JVM starts execution from the main method.'),
  B('java', 'Which exception is thrown by integer division by zero in Java?', ['ArithmeticException', 'NullPointerException', 'IOException', 'ClassCastException'], 0, 'Dividing an int by zero throws ArithmeticException.'),
  B('java', 'What is the size of int in Java?', ['2 bytes', '4 bytes', '8 bytes', 'Depends on the machine'], 1, 'Java fixes int at 4 bytes on every platform.'),

  B('python', 'What is the output of len([1, 2, [3, 4]]) in Python?', ['2', '3', '4', 'Error'], 1, 'The inner list counts as one element, so the length is 3.'),
  B('python', 'Which keyword is used with try to catch exceptions in Python?', ['catch', 'except', 'handle', 'rescue'], 1, 'Python uses try and except.'),
  B('python', 'What is the output of list(range(1, 5)) in Python?', ['[1, 2, 3, 4]', '[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '[2, 3, 4, 5]'], 0, 'range stops before the end value.'),

  B('c', 'What is the value of sizeof(char) in C?', ['1', '2', '4', '8'], 0, 'By definition a char is 1 byte.'),
  B('c', 'Which operator gives the address of a variable in C?', ['*', '&', '->', '%'], 1, '& is the address-of operator.'),
  B('c', 'Which loop in C always executes at least once?', ['for', 'while', 'do-while', 'none of these'], 2, 'do-while checks the condition after the body.'),

  B('cpp', 'Which operator allocates memory dynamically in C++?', ['malloc', 'new', 'alloc', 'create'], 1, 'new allocates memory and calls the constructor.'),
  B('cpp', 'What is a copy constructor?', ['A constructor that creates an object as a copy of an existing object', 'A destructor', 'A function that copies files', 'A virtual function'], 0, 'It initializes a new object from another object of the same class.'),

  B('html', 'Which attribute gives alternative text for an image?', ['title', 'alt', 'src', 'href'], 1, 'alt text is used by screen readers and when the image fails to load.'),
  B('css', 'Which CSS property controls the space outside an element border?', ['padding', 'margin', 'gap', 'outline'], 1, 'margin is the outer space; padding is the inner space.'),
  B('javascript', 'Which keyword declares a block-scoped variable that can be reassigned?', ['var', 'let', 'const', 'static'], 1, 'let is block-scoped and reassignable; const cannot be reassigned.'),
  B('react', 'Which hook is used for side effects such as fetching data?', ['useState', 'useEffect', 'useRef', 'useContext'], 1, 'useEffect runs side effects after rendering.'),
  B('nodejs', 'Which command creates a package.json file?', ['npm init', 'npm start', 'npm build', 'node init'], 0, 'npm init asks a few questions and creates package.json.'),
  B('webfund', 'What does HTTP status 201 mean?', ['OK', 'Created', 'Not Found', 'Server error'], 1, '201 means a new resource was created.')
];

gen(10, () => {
  const a = rnd(80) + 20;
  const b = rnd(8) + 3;
  const r = Math.floor(a / b);
  return add('python', `What is the output of print(${a} // ${b}) in Python?`, r, [r + 1, r - 1, r + 2, r + 3], `// is floor division: ${a} / ${b} rounded down is ${r}.`);
});

gen(10, () => {
  const a = rnd(80) + 20;
  const b = rnd(8) + 3;
  const r = a % b;
  return add('python', `What is the output of print(${a} % ${b}) in Python?`, r, [r + 1, r + 2, r + 3, Math.floor(a / b)], `% gives the remainder of ${a} divided by ${b}, which is ${r}.`);
});

gen(10, () => {
  const a = rnd(8) + 2;
  const e = rnd(3) + 2;
  const r = Math.pow(a, e);
  return add('python', `What is the output of print(${a} ** ${e}) in Python?`, r, [a * e, r + a, r - 1, r + e], `** is the power operator: ${a} to the power ${e} is ${r}.`);
});

gen(10, () => {
  const nums = Array.from({ length: 6 }, () => rnd(50) + 1);
  const i = rnd(2) + 1;
  const j = rnd(2) + 4;
  const f = (arr) => '[' + arr.join(', ') + ']';
  return add('python', `What is the output of: nums = [${nums.join(', ')}]; print(nums[${i}:${j}]) in Python?`, f(nums.slice(i, j)), [f(nums.slice(i, j + 1)), f(nums.slice(i - 1, j)), f(nums.slice(i + 1, j + 1)), f(nums.slice(i - 1, j - 1))], `The slice starts at index ${i} and stops before index ${j}.`);
});

gen(8, () => {
  const w = pick(['PROGRAM', 'NETWORK', 'DATABASE', 'COMPUTER', 'SOFTWARE', 'INTERNET', 'ALGORITHM', 'KEYBOARD']);
  const i = rnd(2) + 1;
  const j = rnd(3) + 4;
  return add('python', `What is the output of print("${w}"[${i}:${j}]) in Python?`, w.slice(i, j), [w.slice(i, j + 1), w.slice(i - 1, j), w.slice(i + 1, j), w.slice(i, j - 1)], `Characters from index ${i} up to (not including) index ${j}.`);
});

gen(10, () => {
  const a = rnd(80) + 20;
  const b = rnd(8) + 3;
  const r = Math.floor(a / b);
  return add('c', `In C, what is the output of: int a = ${a}, b = ${b}; printf("%d", a / b);`, r, [r + 1, r - 1, r + 2, r + 3], `Both are integers, so the division is truncated to ${r}.`);
});

gen(10, () => {
  const x = rnd(9) + 2;
  const y = rnd(5) + 2;
  const z = rnd(5) + 2;
  const r = (x + y) * z;
  return add('c', `In C, what is the output of: int x = ${x}; x += ${y}; x *= ${z}; printf("%d", x);`, r, [x + y * z, x * z + y, x + y + z, r + 1], `x becomes ${x + y} after the addition, then ${x + y} x ${z} = ${r}.`);
});

gen(8, () => {
  const i = rnd(18) + 3;
  return add('c', `In C, what is the output of: int i = ${i}; int j = i++; printf("%d %d", i, j);`, `${i + 1} ${i}`, [`${i} ${i + 1}`, `${i + 1} ${i + 1}`, `${i} ${i}`, `${i + 2} ${i}`], `j gets the old value ${i} (post-increment), then i becomes ${i + 1}.`);
});

gen(8, () => {
  const k = rnd(8) + 3;
  const n = Math.pow(2, k) - 1;
  return add('dsa', `What is the maximum number of comparisons needed by binary search on a sorted array of ${n} elements?`, k, [k - 1, k + 1, k + 2, n], `The range halves each step: ${n} = 2^${k} - 1, so at most ${k} comparisons.`);
});

gen(10, () => {
  const v = [];
  while (v.length < 4) {
    const x = rnd(90) + 10;
    if (!v.includes(x)) v.push(x);
  }
  const p = rnd(2) + 1;
  const ans = v[3 - p];
  return add('dsa', `Starting with an empty stack: push ${v[0]}, push ${v[1]}, push ${v[2]}, push ${v[3]}, then pop ${p} time${p > 1 ? 's' : ''}. What is at the top of the stack?`, ans, v.filter((x) => x !== ans), `A stack is LIFO. After ${p} pop${p > 1 ? 's' : ''} the top is ${ans}.`);
});

gen(10, () => {
  const v = [];
  while (v.length < 4) {
    const x = rnd(90) + 10;
    if (!v.includes(x)) v.push(x);
  }
  const p = rnd(2) + 1;
  const ans = v[p];
  return add('dsa', `Starting with an empty queue: enqueue ${v[0]}, ${v[1]}, ${v[2]}, ${v[3]}, then dequeue ${p} time${p > 1 ? 's' : ''}. What is at the front of the queue?`, ans, v.filter((x) => x !== ans), `A queue is FIFO. After ${p} dequeue${p > 1 ? 's' : ''} the front is ${ans}.`);
});

gen(8, () => {
  const n = rnd(56) + 5;
  return add('dsa', `A tree has ${n} nodes. How many edges does it have?`, n - 1, [n, n + 1, n - 2, 2 * n], `A tree with n nodes has n - 1 edges, so ${n - 1}.`);
});

gen(8, () => {
  const i = rnd(37) + 4;
  return add('dsa', `A full binary tree has ${i} internal nodes. How many leaf nodes does it have?`, i + 1, [i, i - 1, 2 * i, i + 2], `In a full binary tree, leaves = internal nodes + 1 = ${i + 1}.`);
});

module.exports = hand.concat(out);