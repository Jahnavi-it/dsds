const fs = require('fs');
const path = require('path');

const TOPICS = {
  aptitude: ['Percentages', 'Time, Speed and Distance', 'Profit and Loss', 'Ratios and Averages', 'Simple and Compound Interest'],
  reasoning: ['Number and Letter Series', 'Coding-Decoding', 'Blood Relations', 'Puzzles and Seating', 'Syllogisms'],
  verbal: ['Grammar and Tenses', 'Synonyms and Antonyms', 'Reading Comprehension', 'Sentence Correction'],
  dsa: ['Arrays and Strings', 'Linked Lists', 'Stacks and Queues', 'Sorting and Searching', 'Trees and Graphs', 'Time Complexity'],
  dbms: ['SQL Queries and Joins', 'Keys and Normalization', 'Transactions and ACID', 'Indexing'],
  os: ['Process Scheduling', 'Deadlocks', 'Memory Management', 'Paging and Virtual Memory'],
  cn: ['OSI and TCP/IP Layers', 'TCP vs UDP', 'IP Addressing', 'HTTP, DNS and Ports'],
  web: ['HTML and CSS Basics', 'JavaScript Fundamentals', 'React Basics', 'HTTP, REST and Git']
};

// how many assessment questions per category (total 30)
const PLAN = { aptitude: 5, reasoning: 4, verbal: 4, dsa: 4, dbms: 3, os: 3, cn: 3 };
const WEB_ORDER = ['javascript', 'react', 'html', 'webfund'];
const WEB_LEARN = ['html', 'css', 'javascript', 'react', 'nodejs', 'webfund'];

// company focus category -> assessment category
const ALIAS = {
  aptitude: 'aptitude', reasoning: 'reasoning', verbal: 'verbal',
  dsa: 'dsa', oops: 'dsa', c: 'dsa', cpp: 'dsa', java: 'dsa', python: 'dsa',
  dbms: 'dbms', os: 'os', cn: 'cn',
  html: 'web', css: 'web', javascript: 'web', react: 'web', nodejs: 'web', webfund: 'web'
};

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

function seedFrom(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle(arr, seedText) {
  let s = seedFrom(seedText) || 1;
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildAssessment() {
  const out = [];
  const push = (category, b) => out.push({ category, question: b.question, options: b.options, answer: b.answer });
  Object.keys(PLAN).forEach((cat) => {
    shuffle(banks.filter((b) => b.cat === cat), 'assess-' + cat).slice(0, PLAN[cat]).forEach((b) => push(cat, b));
  });
  WEB_ORDER.forEach((c) => {
    const pool = shuffle(banks.filter((b) => b.cat === c), 'assess-web-' + c);
    if (pool[0]) push('web', pool[0]);
  });
  return out;
}

let SUBJECT_IDS = [];
try { SUBJECT_IDS = require('./content').SUBJECTS.map((s) => s.id); } catch (e) { SUBJECT_IDS = []; }

function learnFor(cat) {
  if (cat === 'web') return WEB_LEARN.filter((id) => SUBJECT_IDS.includes(id));
  return SUBJECT_IDS.includes(cat) ? [cat] : [];
}

function levelOf(p) {
  if (p < 50) return 'beginner';
  if (p < 75) return 'intermediate';
  return 'strong';
}

function getCompanies() {
  try { return require('./companies').COMPANIES || []; } catch (e) { return []; }
}

function focusSetFor(companyId) {
  const c = getCompanies().find((x) => x.id === companyId);
  const set = new Set();
  if (c && Array.isArray(c.focus)) c.focus.forEach((f) => { if (ALIAS[f]) set.add(ALIAS[f]); });
  return { company: c || null, set };
}

function buildRoadmap(categories, focusSet) {
  const weeksFor = { beginner: 3, intermediate: 2, strong: 1 };
  const sorted = categories.slice().sort((a, b) => {
    const pa = focusSet.has(a.category) ? 0 : 1;
    const pb = focusSet.has(b.category) ? 0 : 1;
    return pa - pb || a.percent - b.percent;
  });
  let week = 1;
  return sorted.map((c) => {
    const w = weeksFor[c.level];
    const item = {
      category: c.category,
      level: c.level,
      percent: c.percent,
      weeks: w,
      startWeek: week,
      endWeek: week + w - 1,
      priority: focusSet.has(c.category),
      focus: TOPICS[c.category] || [],
      learn: learnFor(c.category),
      action: c.level === 'strong' ? 'revise' : c.level === 'intermediate' ? 'practice' : 'learn from basics'
    };
    week += w;
    return item;
  });
}

module.exports = function (app, db, auth) {
  db.exec(
    'CREATE TABLE IF NOT EXISTS assessment_questions (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, question TEXT NOT NULL, options TEXT NOT NULL, answer INTEGER NOT NULL);' +
    'CREATE TABLE IF NOT EXISTS assessment_results (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, overall INTEGER NOT NULL, data TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);'
  );

  const want = buildAssessment();
  const have = db.prepare('SELECT COUNT(*) AS c FROM assessment_questions').get().c;
  const first = db.prepare('SELECT question FROM assessment_questions ORDER BY id LIMIT 1').get();
  if (want.length && (have !== want.length || !first || first.question !== want[0].question)) {
    const ins = db.prepare('INSERT INTO assessment_questions (category, question, options, answer) VALUES (?,?,?,?)');
    const seed = db.transaction(() => {
      db.prepare('DELETE FROM assessment_questions').run();
      want.forEach((q) => ins.run(q.category, q.question, JSON.stringify(q.options), q.answer));
    });
    seed();
    console.log('Seeded ' + want.length + ' assessment questions from question bank');
  }

  app.get('/api/assessment/questions', auth, (req, res) => {
    const rows = db.prepare('SELECT id, category, question, options FROM assessment_questions ORDER BY id').all();
    res.json({ questions: rows.map((r) => ({ ...r, options: JSON.parse(r.options) })) });
  });

  app.post('/api/assessment/submit', auth, (req, res) => {
    const answers = (req.body && req.body.answers) || {};
    const rows = db.prepare('SELECT id, category, answer FROM assessment_questions').all();
    const stats = {};
    let correctAll = 0;
    rows.forEach((r) => {
      if (!stats[r.category]) stats[r.category] = { category: r.category, correct: 0, total: 0 };
      stats[r.category].total += 1;
      if (Number(answers[r.id]) === r.answer) {
        stats[r.category].correct += 1;
        correctAll += 1;
      }
    });

    const categories = Object.values(stats).map((s) => {
      const percent = Math.round((s.correct / s.total) * 100);
      return { ...s, percent, level: levelOf(percent) };
    });

    const overall = Math.round((correctAll / rows.length) * 100);
    const roadmap = buildRoadmap(categories, new Set());
    const result = {
      overall,
      categories,
      roadmap,
      totalWeeks: roadmap.reduce((sum, r) => sum + r.weeks, 0)
    };
    db.prepare('INSERT INTO assessment_results (user_id, overall, data) VALUES (?,?,?)')
      .run(req.user.id, overall, JSON.stringify(result));
    res.json(result);
  });

  app.get('/api/assessment/result', auth, (req, res) => {
    const row = db.prepare('SELECT data, created_at FROM assessment_results WHERE user_id = ? ORDER BY id DESC LIMIT 1').get(req.user.id);
    if (!row) return res.json({ result: null });
    res.json({ result: JSON.parse(row.data), taken_at: row.created_at });
  });

  app.get('/api/assessment/companies', auth, (req, res) => {
    res.json({ companies: getCompanies().map((c) => ({ id: c.id, name: c.name || c.id })) });
  });

  app.get('/api/assessment/roadmap', auth, (req, res) => {
    const row = db.prepare('SELECT data FROM assessment_results WHERE user_id = ? ORDER BY id DESC LIMIT 1').get(req.user.id);
    if (!row) return res.json({ empty: true });
    const saved = JSON.parse(row.data);
    const { company, set } = focusSetFor(String(req.query.company || ''));
    // recompute levels with current thresholds so old results stay consistent
    const categories = saved.categories.map((c) => ({ ...c, level: levelOf(c.percent) }));
    const roadmap = buildRoadmap(categories, set);
    res.json({
      empty: false,
      overall: saved.overall,
      categories,
      roadmap,
      totalWeeks: roadmap.reduce((sum, r) => sum + r.weeks, 0),
      company: company ? { id: company.id, name: company.name || company.id } : null
    });
  });
};

module.exports.buildAssessment = buildAssessment;