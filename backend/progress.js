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

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getCompanies() {
  try { return require('./companies').COMPANIES || []; } catch (e) { return []; }
}

function buildQuestions(companyId, count) {
  const c = getCompanies().find((x) => x.id === companyId);
  let cats = c ? c.focus.filter((f) => banks.some((b) => b.cat === f)) : [];
  if (!cats.length) cats = ['aptitude', 'reasoning', 'verbal', 'dsa', 'dbms', 'os', 'cn'];
  const pools = cats.map((cat) => shuffle(banks.filter((b) => b.cat === cat)));
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

function toDay(sqlTime, tz) {
  const ms = Date.parse(String(sqlTime).replace(' ', 'T') + 'Z');
  if (Number.isNaN(ms)) return null;
  return new Date(ms + tz * 60000).toISOString().slice(0, 10);
}

function dayOffset(base, n) {
  const d = new Date(base + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

module.exports = function (app, db, auth) {
  db.exec(
    'CREATE TABLE IF NOT EXISTS mock_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, company TEXT, questions TEXT NOT NULL, minutes INTEGER NOT NULL, started_at TEXT DEFAULT CURRENT_TIMESTAMP, submitted INTEGER DEFAULT 0);' +
    'CREATE TABLE IF NOT EXISTS mock_attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, company TEXT, score INTEGER NOT NULL, total INTEGER NOT NULL, seconds INTEGER NOT NULL, data TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);' +
    'CREATE TABLE IF NOT EXISTS checkins (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);'
  );

  app.get('/api/mock/start', auth, (req, res) => {
    const company = String(req.query.company || '');
    const count = 20;
    const qs = buildQuestions(company, count);
    if (!qs.length) return res.status(500).json({ error: 'No questions available' });
    const minutes = 30;
    const r = db.prepare('INSERT INTO mock_sessions (user_id, company, questions, minutes) VALUES (?,?,?,?)')
      .run(req.user.id, company, JSON.stringify(qs), minutes);
    res.json({
      sessionId: r.lastInsertRowid,
      minutes,
      questions: qs.map((q, i) => ({ i, cat: q.cat, question: q.question, options: q.options }))
    });
  });

  db.exec('CREATE TABLE IF NOT EXISTS mistakes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, cat TEXT, question TEXT NOT NULL, options TEXT NOT NULL, answer INTEGER NOT NULL, chosen INTEGER NOT NULL, explanation TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP, UNIQUE(user_id, question));');

  app.get('/api/mistakes', auth, (req, res) => {
    const rows = db.prepare('SELECT id, cat, question, options, answer, chosen, explanation, created_at FROM mistakes WHERE user_id = ? ORDER BY id DESC').all(req.user.id);
    res.json({ mistakes: rows.map((r) => ({ ...r, options: JSON.parse(r.options) })) });
  });

  app.post('/api/mock/submit', auth, (req, res) => {
    const { sessionId, answers } = req.body || {};
    const s = db.prepare('SELECT * FROM mock_sessions WHERE id = ? AND user_id = ?').get(Number(sessionId), req.user.id);
    if (!s) return res.status(404).json({ error: 'Session not found' });
    if (s.submitted) return res.status(400).json({ error: 'Already submitted' });
    const qs = JSON.parse(s.questions);
    const ans = answers || {};
    const stats = {};
    let score = 0;
    const review = qs.map((q, i) => {
      const chosen = ans[i] === undefined || ans[i] === null ? -1 : Number(ans[i]);
      const ok = chosen === q.answer;
      if (!stats[q.cat]) stats[q.cat] = { category: q.cat, correct: 0, total: 0 };
      stats[q.cat].total += 1;
      if (ok) { stats[q.cat].correct += 1; score += 1; }
      return { cat: q.cat, question: q.question, options: q.options, answer: q.answer, chosen, explanation: q.explanation };
    });
    const categories = Object.values(stats).map((c) => ({ ...c, percent: Math.round((c.correct / c.total) * 100) }));
    const seconds = Math.max(0, Math.round((Date.now() - Date.parse(s.started_at.replace(' ', 'T') + 'Z')) / 1000));
    const late = seconds > s.minutes * 60 + 60;
    db.prepare('UPDATE mock_sessions SET submitted = 1 WHERE id = ?').run(s.id);
    db.prepare('INSERT INTO mock_attempts (user_id, company, score, total, seconds, data) VALUES (?,?,?,?,?,?)')
      .run(req.user.id, s.company, score, qs.length, seconds, JSON.stringify(categories));
    review.forEach((r) => {
      if (r.chosen === r.answer) {
        db.prepare('DELETE FROM mistakes WHERE user_id = ? AND question = ?').run(req.user.id, r.question);
      } else {
        db.prepare('INSERT OR REPLACE INTO mistakes (user_id, cat, question, options, answer, chosen, explanation) VALUES (?,?,?,?,?,?,?)')
          .run(req.user.id, r.cat, r.question, JSON.stringify(r.options), r.answer, r.chosen, r.explanation || '');
      }
    });
    res.json({ score, total: qs.length, percent: Math.round((score / qs.length) * 100), seconds, late, categories, review });
  });

  app.post('/api/progress/checkin', auth, (req, res) => {
    db.prepare('INSERT INTO checkins (user_id) VALUES (?)').run(req.user.id);
    res.json({ ok: true });
  });

  app.get('/api/progress', auth, (req, res) => {
    const tz = Number(req.query.tz) || 0;
    const uid = req.user.id;
    const days = new Set();
    const add = (rows) => rows.forEach((r) => { const d = toDay(r.created_at, tz); if (d) days.add(d); });

    add(db.prepare('SELECT created_at FROM assessment_results WHERE user_id = ?').all(uid));
    add(db.prepare('SELECT created_at FROM mock_attempts WHERE user_id = ?').all(uid));
    add(db.prepare('SELECT created_at FROM checkins WHERE user_id = ?').all(uid));
    try {
      const cols = db.prepare('PRAGMA table_info(practice_attempts)').all().map((c) => c.name);
      if (cols.includes('created_at')) add(db.prepare('SELECT created_at FROM practice_attempts WHERE user_id = ?').all(uid));
    } catch (e) { /* table missing, ignore */ }

    const today = new Date(Date.now() + tz * 60000).toISOString().slice(0, 10);
    let cur = 0;
    let d = days.has(today) ? today : dayOffset(today, -1);
    while (days.has(d)) { cur += 1; d = dayOffset(d, -1); }

    const sorted = Array.from(days).sort();
    let longest = 0;
    let run = 0;
    let prev = null;
    sorted.forEach((x) => {
      run = prev && dayOffset(prev, 1) === x ? run + 1 : 1;
      if (run > longest) longest = run;
      prev = x;
    });

    const last14 = [];
    for (let i = 13; i >= 0; i--) {
      const x = dayOffset(today, -i);
      last14.push({ date: x, active: days.has(x) });
    }

    const mocks = db.prepare('SELECT id, company, score, total, seconds, created_at FROM mock_attempts WHERE user_id = ? ORDER BY id DESC LIMIT 10').all(uid);
    res.json({
      currentStreak: cur,
      longestStreak: longest,
      activeDays: days.size,
      activeToday: days.has(today),
      last14,
      mocks
    });
  });
};

module.exports.buildQuestions = buildQuestions;