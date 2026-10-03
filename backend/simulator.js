const fs = require('fs');
const path = require('path');

const banks = [];
const seenQ = new Set();
for (let i = 1; i <= 9; i++) {
  const f = path.join(__dirname, 'bank' + i + '.js');
  if (fs.existsSync(f)) {
    require(f).forEach((b) => {
      if (!seenQ.has(b.question)) { seenQ.add(b.question); banks.push(b); }
    });
  }
}

const ROUNDS = [
  { id: 'apt', name: 'Aptitude', cats: ['aptitude'], count: 8, minutes: 10 },
  { id: 'rea', name: 'Reasoning', cats: ['reasoning'], count: 8, minutes: 10 },
  { id: 'tec', name: 'Technical MCQs', cats: ['dsa', 'dbms', 'os', 'cn'], count: 12, minutes: 15 }
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(cats, count) {
  const pools = cats.map((c) => shuffle(banks.filter((b) => b.cat === c)));
  const out = [];
  let i = 0;
  while (out.length < count && pools.some((p) => i < p.length)) {
    for (const p of pools) {
      if (out.length >= count) break;
      if (i < p.length) out.push(p[i]);
    }
    i++;
  }
  return shuffle(out);
}

function getCompany(id) {
  try { return (require('./companies').COMPANIES || []).find((c) => c.id === id) || null; } catch (e) { return null; }
}

module.exports = function (app, db, auth) {
  db.exec(
    'CREATE TABLE IF NOT EXISTS simulator_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, company TEXT, questions TEXT NOT NULL, started_at TEXT DEFAULT CURRENT_TIMESTAMP, submitted INTEGER DEFAULT 0);' +
    'CREATE TABLE IF NOT EXISTS simulator_attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, company TEXT, overall INTEGER NOT NULL, cleared INTEGER NOT NULL, data TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);'
  );

  app.get('/api/simulator/start', auth, (req, res) => {
    const cid = String(req.query.company || '');
    const company = getCompany(cid);
    const flat = [];
    ROUNDS.forEach((r) => pick(r.cats, r.count).forEach((q) => flat.push(Object.assign({ round: r.id }, q))));
    if (!flat.length) return res.status(500).json({ error: 'No questions available' });
    const r = db.prepare('INSERT INTO simulator_sessions (user_id, company, questions) VALUES (?,?,?)')
      .run(req.user.id, cid, JSON.stringify(flat));
    const shown = flat.map((q, i) => ({ i, round: q.round, cat: q.cat, question: q.question, options: q.options }));
    res.json({
      sessionId: r.lastInsertRowid,
      company: company ? company.name : cid,
      passMark: company && company.type === 'product' ? 70 : 60,
      rounds: ROUNDS.map((rd) => ({
        id: rd.id, name: rd.name, minutes: rd.minutes,
        questions: shown.filter((q) => q.round === rd.id)
      })).filter((rd) => rd.questions.length > 0)
    });
  });

  app.get('/api/simulator/history', auth, (req, res) => {
    const rows = db.prepare('SELECT id, company, overall, cleared, data, created_at FROM simulator_attempts WHERE user_id = ? ORDER BY id DESC LIMIT 10').all(req.user.id);
    res.json({
      history: rows.map((r) => {
        const c = getCompany(r.company);
        let n = 0;
        try { n = JSON.parse(r.data || '[]').length; } catch (e) { n = 0; }
        return { id: r.id, company: c ? c.name : r.company, overall: r.overall, cleared: r.cleared, totalRounds: n, created_at: r.created_at };
      })
    });
  });

  app.get('/api/simulator/active', auth, (req, res) => {
    const s = db.prepare('SELECT * FROM simulator_sessions WHERE user_id = ? AND submitted = 0 ORDER BY id DESC LIMIT 1').get(req.user.id);
    if (!s) return res.json({});
    const elapsed = Math.max(0, Math.round((Date.now() - Date.parse(String(s.started_at).replace(' ', 'T') + 'Z')) / 1000));
    const flat = JSON.parse(s.questions);
    const shown = flat.map((q, i) => ({ i, round: q.round, cat: q.cat, question: q.question, options: q.options }));
    const rds = ROUNDS.map((rd) => ({ id: rd.id, name: rd.name, minutes: rd.minutes, questions: shown.filter((q) => q.round === rd.id) })).filter((rd) => rd.questions.length > 0);
    let acc = 0;
    let idx = -1;
    let left = 0;
    rds.forEach((rd, i) => {
      if (idx < 0) {
        acc += rd.minutes * 60;
        if (elapsed < acc) { idx = i; left = acc - elapsed; }
      }
    });
    if (idx < 0) return res.json({});
    const company = getCompany(s.company);
    res.json({
      session: { sessionId: s.id, company: company ? company.name : s.company, passMark: company && company.type === 'product' ? 70 : 60, rounds: rds },
      roundIndex: idx,
      roundSecondsLeft: left
    });
  });

  app.post('/api/simulator/submit', auth, (req, res) => {
    const { sessionId, answers } = req.body || {};
    const s = db.prepare('SELECT * FROM simulator_sessions WHERE id = ? AND user_id = ?').get(Number(sessionId), req.user.id);
    if (!s) return res.status(404).json({ error: 'Session not found' });
    if (s.submitted) return res.status(400).json({ error: 'Already submitted' });
    const company = getCompany(s.company);
    const passMark = company && company.type === 'product' ? 70 : 60;
    const flat = JSON.parse(s.questions);
    const ans = answers || {};
    const stats = {};
    const review = [];
    flat.forEach((q, i) => {
      const chosen = ans[i] === undefined || ans[i] === null ? -1 : Number(ans[i]);
      const ok = chosen === q.answer;
      if (!stats[q.round]) stats[q.round] = { correct: 0, total: 0 };
      stats[q.round].total += 1;
      if (ok) {
        stats[q.round].correct += 1;
        db.prepare('DELETE FROM mistakes WHERE user_id = ? AND question = ?').run(req.user.id, q.question);
      } else {
        db.prepare('INSERT OR REPLACE INTO mistakes (user_id, cat, question, options, answer, chosen, explanation) VALUES (?,?,?,?,?,?,?)')
          .run(req.user.id, q.cat, q.question, JSON.stringify(q.options), q.answer, chosen, q.explanation || '');
        review.push({ round: q.round, cat: q.cat, question: q.question, options: q.options, answer: q.answer, chosen, explanation: q.explanation || '' });
      }
    });
    const rounds = ROUNDS.filter((rd) => stats[rd.id]).map((rd) => {
      const st = stats[rd.id];
      const percent = Math.round((st.correct / st.total) * 100);
      return { id: rd.id, name: rd.name, correct: st.correct, total: st.total, percent, passed: percent >= passMark };
    });
    const overall = rounds.length ? Math.round(rounds.reduce((a, r) => a + r.percent, 0) / rounds.length) : 0;
    const cleared = rounds.filter((r) => r.passed).length;
    db.prepare('UPDATE simulator_sessions SET submitted = 1 WHERE id = ?').run(s.id);
    db.prepare('INSERT INTO simulator_attempts (user_id, company, overall, cleared, data) VALUES (?,?,?,?,?)')
      .run(req.user.id, s.company, overall, cleared, JSON.stringify(rounds));
    res.json({ passMark, rounds, overall, cleared, totalRounds: rounds.length, review });
  });
};
