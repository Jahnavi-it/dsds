const P = (id, title, desc, fn, args, tests) => ({
  id, title, desc, fn, tests,
  starter: 'function ' + fn + '(' + args + ') {\n  // write your code here\n}'
});

const PROBLEMS = [
  P('twosum', 'Two Sum', 'Return the indices [i, j] (i < j) of the two numbers that add up to target.', 'twoSum', 'nums, target',
    [[[[2, 7, 11, 15], 9], [0, 1]], [[[3, 2, 4], 6], [1, 2]], [[[3, 3], 6], [0, 1]]]),
  P('reverse', 'Reverse a String', 'Return the string reversed.', 'reverseString', 's',
    [[['hello'], 'olleh'], [[''], ''], [['ab'], 'ba']]),
  P('palindrome', 'Palindrome Check', 'Return true if the text is a palindrome, ignoring case and non-alphanumeric characters.', 'isPalindrome', 's',
    [[['madam'], true], [['hello'], false], [['A man a plan a canal Panama'], true]]),
  P('fizzbuzz', 'FizzBuzz', 'Return an array of strings from 1 to n. Use Fizz for multiples of 3, Buzz for 5, FizzBuzz for both.', 'fizzBuzz', 'n',
    [[[3], ['1', '2', 'Fizz']], [[5], ['1', '2', 'Fizz', '4', 'Buzz']]]),
  P('max', 'Maximum in Array', 'Return the largest number in the array.', 'maxOfArray', 'arr',
    [[[[3, 9, 2]], 9], [[[-5, -1, -9]], -1]]),
  P('vowels', 'Count Vowels', 'Return the number of vowels (a, e, i, o, u, any case) in the string.', 'countVowels', 's',
    [[['hello'], 2], [['sky'], 0], [['AEIOU'], 5]]),
  P('factorial', 'Factorial', 'Return n! (factorial of n). 0! is 1.', 'factorial', 'n',
    [[[0], 1], [[5], 120], [[1], 1]]),
  P('fibonacci', 'Nth Fibonacci', 'Return the nth Fibonacci number where fib(0) = 0 and fib(1) = 1.', 'fibonacci', 'n',
    [[[0], 0], [[1], 1], [[10], 55]]),
  P('anagram', 'Anagram Check', 'Return true if the two strings are anagrams (same letters, ignore case).', 'isAnagram', 'a, b',
    [[['listen', 'silent'], true], [['abc', 'abd'], false], [['a', 'a'], true]]),
  P('dedupe', 'Remove Duplicates', 'Return a new array without duplicates, keeping the first occurrence order.', 'removeDuplicates', 'arr',
    [[[[1, 2, 2, 3, 1]], [1, 2, 3]], [[[]], []], [[['a', 'a']], ['a']]])
];

module.exports = function (app, db, auth) {
  db.exec('CREATE TABLE IF NOT EXISTS coding_solved (user_id INTEGER NOT NULL, pid TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_id, pid));');

  app.get('/api/coding/problems', auth, (req, res) => {
    const solved = db.prepare('SELECT pid FROM coding_solved WHERE user_id = ?').all(req.user.id).map((r) => r.pid);
    res.json({ problems: PROBLEMS.map((p) => ({ ...p, solved: solved.includes(p.id) })) });
  });

  // tests run in the student's browser, so this is practice tracking only
  app.post('/api/coding/solve', auth, (req, res) => {
    const id = String((req.body && req.body.id) || '');
    if (!PROBLEMS.some((p) => p.id === id)) return res.status(404).json({ error: 'Unknown problem' });
    db.prepare('INSERT OR IGNORE INTO coding_solved (user_id, pid) VALUES (?, ?)').run(req.user.id, id);
    res.json({ ok: true });
  });

  app.get('/api/notes/:id', auth, (req, res) => {
    const c = (require('./companies').COMPANIES || []).find((x) => x.id === req.params.id);
    if (!c) return res.status(404).json({ error: 'Company not found' });
    const subjects = require('./content').SUBJECTS;
    res.json({
      name: c.name || c.id,
      focus: c.focus,
      subjects: c.focus.map((f) => subjects.find((s) => s.id === f)).filter(Boolean).map((s) => ({ id: s.id, topics: s.topics })),
      questions: (c.questions || []).map((q) => ({ cat: q.cat, question: q.question, options: q.options, answer: q.answer, explanation: q.explanation }))
    });
  });
};

module.exports.PROBLEMS = PROBLEMS;