const TECH = [
  { q: 'Explain the four pillars of OOP with one example each.', kw: ['encapsulation', 'inheritance', 'polymorphism', 'abstraction'], a: 'Encapsulation hides data inside a class and exposes it through methods. Inheritance lets a child class reuse a parent, e.g. Dog extends Animal. Polymorphism lets one method behave differently by object, e.g. speak() for Dog and Cat. Abstraction exposes only what is needed, e.g. an interface Shape with area().' },
  { q: 'What is the difference between == and .equals() in Java?', kw: ['reference', 'content', 'string', 'object', 'memory'], a: '== compares references, meaning whether two variables point to the same object in memory. .equals() compares content. For Strings, new String("a") == new String("a") is false but .equals() is true.' },
  { q: 'Explain the difference between a process and a thread.', kw: ['memory', 'shared', 'lightweight', 'context', 'stack'], a: 'A process is an independent program with its own memory. A thread is a lightweight unit inside a process that shares the process memory but has its own stack. Threads are cheaper to create and switch between, but need synchronization.' },
  { q: 'What is normalization in DBMS and why is it used?', kw: ['redundancy', 'anomaly', '1nf', '2nf', '3nf', 'table'], a: 'Normalization organizes tables to reduce redundancy and avoid insert, update and delete anomalies. It splits data into related tables following 1NF (atomic values), 2NF (no partial dependency) and 3NF (no transitive dependency).' },
  { q: 'Explain TCP vs UDP with use cases.', kw: ['reliable', 'connection', 'handshake', 'fast', 'streaming', 'order'], a: 'TCP is connection-oriented: it uses a handshake and guarantees reliable, ordered delivery, so it suits web and email. UDP is connectionless and faster with no guarantees, so it suits streaming, gaming and DNS.' },
  { q: 'How would you find duplicate elements in an array? Explain the time complexity.', kw: ['hash', 'set', 'sort', 'o(n)', 'loop', 'map'], a: 'Put elements in a hash set: if an element is already in the set, it is a duplicate. This is O(n) time and O(n) space. Alternatively sort first and compare neighbours in O(n log n) with no extra space.' },
  { q: 'What is the difference between an array and a linked list?', kw: ['contiguous', 'pointer', 'index', 'insertion', 'memory', 'o(1)'], a: 'An array stores elements in contiguous memory with O(1) access by index but costly insertion in the middle. A linked list stores nodes connected by pointers, so insertion or deletion is O(1) once you have the node, but access is O(n).' },
  { q: 'Explain primary key, foreign key and unique key.', kw: ['unique', 'null', 'reference', 'table', 'identify'], a: 'A primary key uniquely identifies each row and cannot be null. A foreign key references the primary key of another table to link them. A unique key also prevents duplicates but allows a null value.' },
  { q: 'What is a deadlock and how can it be prevented?', kw: ['mutual exclusion', 'hold and wait', 'circular', 'preemption', 'resource'], a: 'Deadlock is when processes wait forever for resources held by each other. It needs mutual exclusion, hold and wait, no preemption and circular wait. Prevent it by breaking one of these, e.g. acquiring resources in a fixed order.' },
  { q: 'What happens when you type a URL in the browser and press Enter?', kw: ['dns', 'tcp', 'http', 'server', 'render', 'ip'], a: 'The browser resolves the domain to an IP using DNS, opens a TCP connection (and TLS for HTTPS), sends an HTTP request, the server responds with HTML, and the browser renders the page.' },
  { q: 'Explain one project from your resume: the problem, your role, technologies used and the result.', kw: ['problem', 'role', 'technology', 'result', 'team', 'database'], a: 'Describe the problem your project solves, your exact role, the technologies used (for example React, Node and a database), and the result, such as users served or time saved.' },
  { q: 'Why did you choose that technology for your project? Which alternatives did you consider?', kw: ['because', 'alternative', 'performance', 'easy', 'community', 'cost'], a: 'Explain that you chose it because it is easy to learn, has good community support and performance, and compare it with one alternative, e.g. Node.js over Java for faster development.' },
  { q: 'If your solution fails in production, how do you debug and recover?', kw: ['log', 'reproduce', 'rollback', 'test', 'monitor', 'fix'], a: 'Check logs and monitoring, reproduce the issue, find the root cause, fix and test it, roll back to the last stable version if users are affected, then add tests to prevent a repeat.' },
  { q: 'What is the difference between a stack and a queue? Give real uses.', kw: ['lifo', 'fifo', 'undo', 'browser', 'scheduling', 'push'], a: 'A stack is LIFO (last in, first out), used for undo and browser back. A queue is FIFO (first in, first out), used for task scheduling and printer queues.' },
  { q: 'Explain REST APIs and the common HTTP methods.', kw: ['get', 'post', 'put', 'delete', 'stateless', 'json', 'status'], a: 'REST is an architecture where resources are accessed through URLs using HTTP methods: GET reads, POST creates, PUT updates and DELETE removes. It is stateless, usually returns JSON and uses status codes like 200 and 404.' }
];

const HR = [
  { q: 'Tell me about yourself.', kw: ['college', 'project', 'skill', 'goal', 'internship', 'learn'], a: 'Give a short summary in about a minute: your college and branch, key skills, a project or internship, and your career goal.' },
  { q: 'Why should we hire you?', kw: ['skill', 'learn', 'team', 'contribute', 'project', 'value'], a: 'Say which skills you bring, show that you learn quickly, mention a project as proof, and explain how you will contribute to the team.' },
  { q: 'Why do you want to join this company?', kw: ['company', 'growth', 'learn', 'technology', 'culture', 'career'], a: 'Mention something specific about the company, such as its technology, culture or growth opportunities, and connect it to your career goals.' },
  { q: 'What are your strengths and weaknesses?', kw: ['strength', 'weakness', 'example', 'improve', 'learn', 'working on'], a: 'Name one real strength with an example, and one real weakness with what you are doing to improve it.' },
  { q: 'Where do you see yourself in five years?', kw: ['goal', 'grow', 'learn', 'role', 'responsibility', 'skill'], a: 'Show ambition that fits the role: grow your technical skills, take more responsibility, and contribute to the company long term.' },
  { q: 'Tell me about a time you worked in a team. What was your role?', kw: ['team', 'role', 'task', 'result', 'communicat', 'example'], a: 'Use the STAR format: the situation, your role and task, what you did, and the result for the team.' },
  { q: 'How do you handle a conflict with a teammate?', kw: ['listen', 'talk', 'understand', 'solution', 'respect', 'team'], a: 'Listen to the teammate, understand their view, talk calmly, find a solution that helps the team, and keep mutual respect.' },
  { q: 'Tell me about a failure and what you learned from it.', kw: ['failed', 'mistake', 'learn', 'improve', 'result', 'next time'], a: 'Describe a real failure honestly, what you learned from the mistake, and how you improved the next time.' },
  { q: 'How do you work under pressure and tight deadlines?', kw: ['prioritize', 'plan', 'time', 'calm', 'deadline', 'example'], a: 'Prioritize tasks, plan your time, stay calm, and give a real example where you met a tight deadline.' },
  { q: 'Are you comfortable with relocation and shift timings?', kw: ['relocat', 'shift', 'flexible', 'ready', 'family', 'adapt'], a: 'Answer honestly. If you are ready, say you are flexible and can adapt to relocation and shifts, and mention any real constraint politely.' },
  { q: 'How do you react to criticism from a senior?', kw: ['listen', 'feedback', 'improve', 'learn', 'positive', 'apply'], a: 'Listen without arguing, thank them for the feedback, and apply it to improve. Add a short example.' },
  { q: 'Describe a situation where you took the lead.', kw: ['lead', 'plan', 'team', 'result', 'responsibility', 'example'], a: 'Use STAR: the situation, how you planned and led the team, and the result you achieved.' },
  { q: 'What would you do if you were asked to do something you think is unethical?', kw: ['honest', 'ethic', 'refuse', 'manager', 'policy', 'report'], a: 'Politely refuse, stay honest, explain your concern to your manager, and follow company policy. Report it if needed.' },
  { q: 'Do you have any questions for us?', kw: ['team', 'training', 'growth', 'project', 'role', 'culture'], a: 'Ask about the team, training and growth opportunities, or the projects you would work on. Avoid asking about salary first.' }
];

const CHAINS = [
  { types: ['tech'], keys: ['java'], qs: [
    { q: 'You mentioned Java. Can you explain inheritance with an example?', kw: ['extends', 'parent', 'child', 'reuse', 'class', 'super'], a: 'Inheritance lets a child class reuse the fields and methods of a parent class using extends, e.g. Dog extends Animal and reuses eat(). Use super to call the parent.' },
    { q: 'What is method overriding, and how is it different from overloading?', kw: ['same', 'signature', 'runtime', 'child', 'parent', 'overload', 'compile'], a: 'Overriding is when a child class redefines a parent method with the same signature, decided at runtime. Overloading is the same method name with different parameters, decided at compile time.' },
    { q: 'Can you give a real-world use case for overriding?', kw: ['payment', 'shape', 'animal', 'different', 'behavior', 'interface'], a: 'A Payment class with pay(), where CardPayment and UpiPayment override pay() with their own behavior while the calling code stays the same.' }
  ] },
  { types: ['tech'], keys: ['python'], qs: [
    { q: 'You mentioned Python. What is the difference between a list and a tuple?', kw: ['mutable', 'immutable', 'change', 'faster', 'list', 'tuple'], a: 'A list is mutable and can be changed after creation. A tuple is immutable and slightly faster, so it is used for fixed data.' },
    { q: 'What are decorators or generators, and where would you use them?', kw: ['function', 'wrap', 'yield', 'iterator', 'memory', 'lazy'], a: 'A decorator wraps a function to add behavior such as logging. A generator uses yield to produce values lazily, which saves memory for large data.' }
  ] },
  { types: ['tech'], keys: ['sql', 'database', 'dbms'], qs: [
    { q: 'You mentioned databases. What is the difference between WHERE and HAVING?', kw: ['group', 'aggregate', 'filter', 'before', 'after', 'row'], a: 'WHERE filters rows before grouping. HAVING filters groups after aggregate functions like COUNT or SUM.' },
    { q: 'How does an index speed up a query, and what is its cost?', kw: ['search', 'faster', 'b-tree', 'write', 'insert', 'space', 'slow'], a: 'An index works like a book index, so a query finds rows without scanning the whole table. The cost is extra storage and slower inserts and updates.' }
  ] },
  { types: ['tech'], keys: ['react'], qs: [
    { q: 'You mentioned React. What is the difference between state and props?', kw: ['props', 'state', 'parent', 'read', 'change', 'component', 're-render'], a: 'Props are passed from parent to child and are read-only. State is owned by a component, and changing it re-renders the component.' },
    { q: 'When does useEffect run, and how do you clean it up?', kw: ['render', 'dependency', 'array', 'cleanup', 'return', 'unmount'], a: 'useEffect runs after render, and again when values in its dependency array change. Return a cleanup function to remove timers or listeners when the component unmounts.' }
  ] },
  { types: ['hr'], keys: ['team player', 'teamwork', 'team work'], qs: [
    { q: 'You said you work well in a team. Give me a real example with your exact role.', kw: ['team', 'role', 'task', 'result', 'example', 'project'], a: 'Give a real example using STAR: the project, your exact role, what you did, and the result.' },
    { q: 'What was the hardest disagreement in that team, and how did it end?', kw: ['listen', 'discuss', 'solution', 'compromise', 'result', 'respect'], a: 'Describe the disagreement briefly, how you listened and discussed, the compromise or decision reached, and the outcome.' }
  ] },
  { types: ['hr'], keys: ['leader', 'leadership'], qs: [
    { q: 'You mentioned leadership. Describe a time you led people without formal authority.', kw: ['lead', 'plan', 'team', 'motivate', 'result', 'responsib'], a: 'Explain the situation, how you guided people by planning and motivating them, and the result.' },
    { q: 'What would you do differently now?', kw: ['learn', 'improve', 'better', 'differently', 'feedback', 'next time'], a: 'Name one real improvement, such as communicating earlier or delegating better, and what you learned.' }
  ] },
  { types: ['hr'], keys: ['hardworking', 'hard working', 'hard-working'], qs: [
    { q: 'You said you are hardworking. Give a specific example where it made a difference.', kw: ['example', 'result', 'deadline', 'effort', 'time', 'learn'], a: 'Give one specific situation where your extra effort made a difference, such as finishing a project before a deadline, and state the result.' }
  ] }
];

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const words = (s) => (String(s).trim().match(/\S+/g) || []).length;

function scoreAnswer(q, answer) {
  const low = answer.toLowerCase();
  const wc = words(answer);
  const depth = Math.min(wc / 50, 1);
  if (!q.kw || !q.kw.length) {
    const score = Math.round(depth * 100);
    return { score, missed: [], verdict: score >= 70 ? 'correct' : score >= 35 ? 'partial' : 'wrong' };
  }
  const hit = q.kw.filter((k) => low.includes(k));
  const cov = Math.min(hit.length / Math.min(q.kw.length, 4), 1);
  const verdict = wc < 5 ? 'wrong' : cov >= 0.75 ? 'correct' : cov >= 0.4 ? 'partial' : 'wrong';
  return { score: Math.round((0.6 * cov + 0.4 * depth) * 100), missed: q.kw.filter((k) => !low.includes(k)).slice(0, 3), verdict };
}

const asFollow = (p) => (typeof p === 'string' ? { q: p, kw: [], a: '' } : p);
const chainsFor = (co) => CHAINS.concat(require('./interview_followups')[co] || []);

module.exports = function (app, db, auth) {
  db.exec(
    'CREATE TABLE IF NOT EXISTS interview_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, type TEXT, company TEXT, data TEXT NOT NULL, done INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP);' +
    'CREATE TABLE IF NOT EXISTS interview_results (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, type TEXT, company TEXT, score INTEGER NOT NULL, data TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);'
  );

  app.post('/api/interview/start', auth, (req, res) => {
    const type = req.body && req.body.type === 'hr' ? 'hr' : 'tech';
    const company = String((req.body && req.body.company) || '').slice(0, 30);
    const base = type === 'hr' ? HR : TECH;
    const cq = ((require('./interview_companies')[company] || {})[type]) || [];
    const main = shuffle(cq).slice(0, 6);
    if (main.length < 6) shuffle(base).filter((b) => !main.some((m) => m.q === b.q)).slice(0, 6 - main.length).forEach((b) => main.push(b));
    const s = { main, mi: 1, asked: [{ q: main[0].q, kind: 'main', kw: main[0].kw, a: main[0].a }], pending: [], used: [] };
    const r = db.prepare('INSERT INTO interview_sessions (user_id, type, company, data) VALUES (?,?,?,?)')
      .run(req.user.id, type, company, JSON.stringify(s));
    res.json({ sessionId: r.lastInsertRowid, question: main[0].q, kind: 'main', index: 1, type });
  });

  app.post('/api/interview/answer', auth, (req, res) => {
    const b = req.body || {};
    const row = db.prepare('SELECT * FROM interview_sessions WHERE id = ? AND user_id = ?').get(Number(b.sessionId), req.user.id);
    if (!row) return res.status(404).json({ error: 'Session not found' });
    if (row.done) return res.status(400).json({ error: 'Interview already finished' });
    const s = JSON.parse(row.data);
    const cur = s.asked[s.asked.length - 1];
    const text = String(b.answer || '').slice(0, 3000);
    const r = scoreAnswer(cur, text);
    cur.answer = text;
    cur.score = r.score;
    cur.missed = r.missed;
    cur.verdict = r.verdict;
    const feedback = { verdict: r.verdict, score: r.score, missed: r.missed, sample: cur.a || '' };

    const follows = s.asked.filter((a) => a.kind === 'follow').length;
    if (!s.pending.length && follows < 4) {
      chainsFor(row.company).forEach((c, ci) => {
        if (!s.pending.length && c.types.includes(row.type) && !s.used.includes(ci) && c.keys.some((k) => new RegExp('\\b' + k + '\\b', 'i').test(text))) {
          s.used.push(ci);
          s.pending = c.qs.slice(0, 4 - follows);
        }
      });
    }

    let next = null;
    if (s.pending.length) {
      const p = asFollow(s.pending.shift());
      next = { q: p.q, kind: 'follow', kw: p.kw || [], a: p.a || '' };
    } else if (s.mi < s.main.length) {
      const m = s.main[s.mi++];
      next = { q: m.q, kind: 'main', kw: m.kw, a: m.a };
    }

    if (next) {
      s.asked.push(next);
      db.prepare('UPDATE interview_sessions SET data = ? WHERE id = ?').run(JSON.stringify(s), row.id);
      return res.json({ done: false, question: next.q, kind: next.kind, index: s.asked.length, type: row.type, feedback });
    }

    const scores = s.asked.map((a) => a.score || 0);
    const overall = Math.round(scores.reduce((x, y) => x + y, 0) / scores.length);
    const avgWords = Math.round(s.asked.reduce((n, a) => n + words(a.answer || ''), 0) / s.asked.length);
    const all = s.asked.map((a) => a.answer || '').join(' ');
    const tips = [];
    if (avgWords < 30) tips.push('short');
    if (row.type === 'hr' && !/(for example|for instance|i once|when i|situation|result|learned|learnt)/i.test(all)) tips.push('examples');
    if (s.asked.some((a) => (a.missed || []).length)) tips.push('missed');
    if (!tips.length) tips.push('good');
    const review = s.asked.map((a) => ({ q: a.q, kind: a.kind, score: a.score || 0, verdict: a.verdict || 'wrong', missed: a.missed || [], answer: a.answer || '', sample: a.a || '' }));
    db.prepare('UPDATE interview_sessions SET data = ?, done = 1 WHERE id = ?').run(JSON.stringify(s), row.id);
    db.prepare('INSERT INTO interview_results (user_id, type, company, score, data) VALUES (?,?,?,?,?)')
      .run(req.user.id, row.type, row.company, overall, JSON.stringify(review));
    res.json({
      done: true, score: overall, avgWords, tips, review, type: row.type, feedback,
      note: 'Score is based on keyword coverage and answer length. It is practice feedback, not an AI evaluation.'
    });
  });

  app.get('/api/interview/history', auth, (req, res) => {
    const rows = db.prepare('SELECT id, type, company, score, created_at FROM interview_results WHERE user_id = ? ORDER BY id DESC LIMIT 10').all(req.user.id);
    res.json({ history: rows });
  });
};
