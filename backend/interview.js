const TECH = [
  { q: 'Explain the four pillars of OOP with one example each.', kw: ['encapsulation', 'inheritance', 'polymorphism', 'abstraction'] },
  { q: 'What is the difference between == and .equals() in Java?', kw: ['reference', 'content', 'string', 'object', 'memory'] },
  { q: 'Explain the difference between a process and a thread.', kw: ['memory', 'shared', 'lightweight', 'context', 'stack'] },
  { q: 'What is normalization in DBMS and why is it used?', kw: ['redundancy', 'anomaly', '1nf', '2nf', '3nf', 'table'] },
  { q: 'Explain TCP vs UDP with use cases.', kw: ['reliable', 'connection', 'handshake', 'fast', 'streaming', 'order'] },
  { q: 'How would you find duplicate elements in an array? Explain the time complexity.', kw: ['hash', 'set', 'sort', 'o(n)', 'loop', 'map'] },
  { q: 'What is the difference between an array and a linked list?', kw: ['contiguous', 'pointer', 'index', 'insertion', 'memory', 'o(1)'] },
  { q: 'Explain primary key, foreign key and unique key.', kw: ['unique', 'null', 'reference', 'table', 'identify'] },
  { q: 'What is a deadlock and how can it be prevented?', kw: ['mutual exclusion', 'hold and wait', 'circular', 'preemption', 'resource'] },
  { q: 'What happens when you type a URL in the browser and press Enter?', kw: ['dns', 'tcp', 'http', 'server', 'render', 'ip'] },
  { q: 'Explain one project from your resume: the problem, your role, technologies used and the result.', kw: ['problem', 'role', 'technology', 'result', 'team', 'database'] },
  { q: 'Why did you choose that technology for your project? Which alternatives did you consider?', kw: ['because', 'alternative', 'performance', 'easy', 'community', 'cost'] },
  { q: 'If your solution fails in production, how do you debug and recover?', kw: ['log', 'reproduce', 'rollback', 'test', 'monitor', 'fix'] },
  { q: 'What is the difference between a stack and a queue? Give real uses.', kw: ['lifo', 'fifo', 'undo', 'browser', 'scheduling', 'push'] },
  { q: 'Explain REST APIs and the common HTTP methods.', kw: ['get', 'post', 'put', 'delete', 'stateless', 'json', 'status'] }
];

const HR = [
  { q: 'Tell me about yourself.', kw: ['college', 'project', 'skill', 'goal', 'internship', 'learn'] },
  { q: 'Why should we hire you?', kw: ['skill', 'learn', 'team', 'contribute', 'project', 'value'] },
  { q: 'Why do you want to join this company?', kw: ['company', 'growth', 'learn', 'technology', 'culture', 'career'] },
  { q: 'What are your strengths and weaknesses?', kw: ['strength', 'weakness', 'example', 'improve', 'learn', 'working on'] },
  { q: 'Where do you see yourself in five years?', kw: ['goal', 'grow', 'learn', 'role', 'responsibility', 'skill'] },
  { q: 'Tell me about a time you worked in a team. What was your role?', kw: ['team', 'role', 'task', 'result', 'communicat', 'example'] },
  { q: 'How do you handle a conflict with a teammate?', kw: ['listen', 'talk', 'understand', 'solution', 'respect', 'team'] },
  { q: 'Tell me about a failure and what you learned from it.', kw: ['failed', 'mistake', 'learn', 'improve', 'result', 'next time'] },
  { q: 'How do you work under pressure and tight deadlines?', kw: ['prioritize', 'plan', 'time', 'calm', 'deadline', 'example'] },
  { q: 'Are you comfortable with relocation and shift timings?', kw: ['relocat', 'shift', 'flexible', 'ready', 'family', 'adapt'] },
  { q: 'How do you react to criticism from a senior?', kw: ['listen', 'feedback', 'improve', 'learn', 'positive', 'apply'] },
  { q: 'Describe a situation where you took the lead.', kw: ['lead', 'plan', 'team', 'result', 'responsibility', 'example'] },
  { q: 'What would you do if you were asked to do something you think is unethical?', kw: ['honest', 'ethic', 'refuse', 'manager', 'policy', 'report'] },
  { q: 'Do you have any questions for us?', kw: ['team', 'training', 'growth', 'project', 'role', 'culture'] }
];

const CHAINS = [
  { keys: ['java'], qs: ['You mentioned Java. Can you explain inheritance with an example?', 'What is method overriding, and how is it different from overloading?', 'Can you give a real-world use case for overriding?'] },
  { keys: ['python'], qs: ['You mentioned Python. What is the difference between a list and a tuple?', 'What are decorators or generators, and where would you use them?'] },
  { keys: ['sql', 'database', 'dbms'], qs: ['You mentioned databases. What is the difference between WHERE and HAVING?', 'How does an index speed up a query, and what is its cost?'] },
  { keys: ['react'], qs: ['You mentioned React. What is the difference between state and props?', 'When does useEffect run, and how do you clean it up?'] },
  { keys: ['team player', 'teamwork', 'team work'], qs: ['You said you work well in a team. Give me a real example with your exact role.', 'What was the hardest disagreement in that team, and how did it end?'] },
  { keys: ['leader', 'leadership'], qs: ['You mentioned leadership. Describe a time you led people without formal authority.', 'What would you do differently now?'] },
  { keys: ['hardworking', 'hard working', 'hard-working'], qs: ['You said you are hardworking. Give a specific example where it made a difference.'] }
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
  const depth = Math.min(words(answer) / 50, 1);
  if (!q.kw || !q.kw.length) return { score: Math.round(depth * 100), missed: [] };
  const hit = q.kw.filter((k) => low.includes(k));
  const cov = Math.min(hit.length / Math.min(q.kw.length, 4), 1);
  return { score: Math.round((0.6 * cov + 0.4 * depth) * 100), missed: q.kw.filter((k) => !low.includes(k)).slice(0, 3) };
}

module.exports = function (app, db, auth) {
  db.exec(
    'CREATE TABLE IF NOT EXISTS interview_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, type TEXT, company TEXT, data TEXT NOT NULL, done INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP);' +
    'CREATE TABLE IF NOT EXISTS interview_results (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, type TEXT, company TEXT, score INTEGER NOT NULL, data TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);'
  );

  app.post('/api/interview/start', auth, (req, res) => {
    const type = req.body && req.body.type === 'hr' ? 'hr' : 'tech';
    const company = String((req.body && req.body.company) || '').slice(0, 30);
    const main = shuffle(type === 'hr' ? HR : TECH).slice(0, 6);
    const s = { main, mi: 1, asked: [{ q: main[0].q, kind: 'main', kw: main[0].kw }], pending: [], used: [] };
    const r = db.prepare('INSERT INTO interview_sessions (user_id, type, company, data) VALUES (?,?,?,?)')
      .run(req.user.id, type, company, JSON.stringify(s));
    res.json({ sessionId: r.lastInsertRowid, question: main[0].q, kind: 'main', index: 1 });
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

    const follows = s.asked.filter((a) => a.kind === 'follow').length;
    if (!s.pending.length && follows < 4) {
      CHAINS.forEach((c, ci) => {
        if (!s.pending.length && !s.used.includes(ci) && c.keys.some((k) => new RegExp('\\b' + k + '\\b', 'i').test(text))) {
          s.used.push(ci);
          s.pending = c.qs.slice(0, 4 - follows);
        }
      });
    }

    let next = null;
    if (s.pending.length) next = { q: s.pending.shift(), kind: 'follow', kw: [] };
    else if (s.mi < s.main.length) {
      const m = s.main[s.mi++];
      next = { q: m.q, kind: 'main', kw: m.kw };
    }

    if (next) {
      s.asked.push(next);
      db.prepare('UPDATE interview_sessions SET data = ? WHERE id = ?').run(JSON.stringify(s), row.id);
      return res.json({ done: false, question: next.q, kind: next.kind, index: s.asked.length });
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
    const review = s.asked.map((a) => ({ q: a.q, kind: a.kind, score: a.score || 0, missed: a.missed || [], answer: a.answer || '' }));
    db.prepare('UPDATE interview_sessions SET data = ?, done = 1 WHERE id = ?').run(JSON.stringify(s), row.id);
    db.prepare('INSERT INTO interview_results (user_id, type, company, score, data) VALUES (?,?,?,?,?)')
      .run(req.user.id, row.type, row.company, overall, JSON.stringify(review));
    res.json({
      done: true, score: overall, avgWords, tips, review,
      note: 'Score is based on keyword coverage and answer length. It is practice feedback, not an AI evaluation.'
    });
  });

  app.get('/api/interview/history', auth, (req, res) => {
    const rows = db.prepare('SELECT id, type, company, score, created_at FROM interview_results WHERE user_id = ? ORDER BY id DESC LIMIT 10').all(req.user.id);
    res.json({ history: rows });
  });
};