// Placement Drive: a company-specific, round-by-round placement process.
//   Round 1  Online test      the company's own test pattern (sections, trimmed for practice), sectional cut-offs
//   Round 2  Coding round     problems picked for the company type, judged against test cases
//   Round 3  Technical interview   questions reported for the company, keyword-scored
//   Round 4  HR interview     HR questions for the company, keyword-scored
// In strict mode (default) failing a round ends the drive, like a real elimination drive.
const coding = require('./coding');
const patterns = require('./company_patterns');

const SECTION_CAP = 6;      // questions kept per section of the online test
const SECTION_FLOOR = 40;   // every section must reach this % (sectional cut-off)
const GRACE_SECONDS = 90;

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function getCompany(id) {
  try { return (require('./companies').COMPANIES || []).find((c) => c.id === id) || null; } catch (e) { return null; }
}

// Cut-offs depend on the company type. Interview scores are keyword based, so their cut-offs are lower.
function cutoffs(company) {
  const product = company.type === 'product';
  return { test: product ? 70 : 60, coding: product ? 70 : 50, tech: product ? 55 : 45, hr: 40 };
}

// The company's own test pattern, trimmed to SECTION_CAP questions per section.
function buildTestRound(companyId) {
  const full = patterns.buildTest(companyId);
  if (!full) return null;
  const questions = [];
  const sections = [];
  full.sections.forEach((s, si) => {
    const keep = Math.min(SECTION_CAP, s.to - s.from + 1);
    const from = questions.length;
    for (let k = 0; k < keep; k++) {
      const q = full.questions[s.from + k];
      questions.push({ ...q, sec: si });
    }
    const base = full.mode === 'shared' ? full.minutes * (keep / full.questions.length) : s.minutes * (keep / (s.to - s.from + 1));
    sections.push({ name: s.name, count: keep, from, to: questions.length - 1, minutes: Math.max(3, Math.ceil(base)) });
  });
  const minutes = sections.reduce((a, s) => a + s.minutes, 0);
  return { title: full.title, questions, sections, minutes };
}

function pickProblems(company) {
  const all = coding.PROBLEMS;
  const by = (lvl) => shuffle(all.filter((p) => p.level === lvl));
  const levels = company.type === 'product' ? ['Medium', 'Hard'] : ['Easy', 'Medium'];
  return levels.map((l) => by(l)[0]).filter(Boolean);
}

const stripProblem = (p) => ({ id: p.id, title: p.title, level: p.level, desc: p.desc, inputFormat: p.inputFormat, outputFormat: p.outputFormat, sample: p.sample });

module.exports = function (app, db, auth) {
  db.exec(
    'CREATE TABLE IF NOT EXISTS drive_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, company TEXT NOT NULL, state TEXT NOT NULL, status TEXT DEFAULT \'running\', created_at TEXT DEFAULT CURRENT_TIMESTAMP);' +
    'CREATE TABLE IF NOT EXISTS drive_attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, company TEXT, outcome TEXT NOT NULL, overall INTEGER NOT NULL, data TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);'
  );

  const load = (req) => {
    const row = db.prepare('SELECT * FROM drive_sessions WHERE id = ? AND user_id = ?').get(Number(req.body && req.body.id), req.user.id);
    if (!row) return { error: [404, 'Drive not found'] };
    if (row.status !== 'running') return { error: [400, 'This drive is already finished'] };
    return { row, st: JSON.parse(row.state) };
  };
  const save = (row, st, status) => db.prepare('UPDATE drive_sessions SET state = ?, status = ? WHERE id = ?').run(JSON.stringify(st), status || row.status, row.id);
  const elapsed = (st) => Math.max(0, Math.round((Date.now() - Date.parse(st.roundStartedAt)) / 1000));

  // What the browser may see about the current round (never the answers).
  function publicState(row, st) {
    const company = getCompany(row.company) || { id: row.company, name: row.company, type: 'service' };
    const cur = st.rounds[st.ri];
    const out = {
      id: row.id, company: { id: company.id, name: company.name || company.id, type: company.type },
      strict: st.strict, status: row.status, roundIndex: st.ri,
      rounds: st.rounds.map((r) => ({ id: r.id, name: r.name, minutes: r.minutes, cutoff: r.cutoff, status: r.status, score: r.score, summary: r.summary || '' })),
      secondsLeft: cur ? Math.max(0, cur.minutes * 60 - elapsed(st)) : 0
    };
    if (row.status === 'running' && cur) {
      if (cur.id === 'test') {
        out.test = {
          sections: st.test.sections,
          questions: st.test.questions.map((q, i) => ({ i, sec: q.sec, cat: q.cat, question: q.question, options: q.options }))
        };
      } else if (cur.id === 'coding') {
        out.coding = {
          problems: st.coding.problems.map((id) => stripProblem(coding.PROBLEMS.find((p) => p.id === id))),
          best: st.coding.best,
          languages: coding.availableLangs().map((id) => ({ id, name: coding.LANGS[id].name, starter: coding.LANGS[id].starter }))
        };
      } else {
        out.interview = { type: cur.id === 'tech' ? 'tech' : 'hr', count: cur.count };
      }
    }
    if (row.status !== 'running') out.report = st.report;
    return out;
  }

  function planRounds(company, test) {
    const c = cutoffs(company);
    const product = company.type === 'product';
    return [
      { id: 'test', name: 'Online test', minutes: test.minutes, cutoff: c.test, status: 'active', summary: test.title },
      { id: 'coding', name: 'Coding round', minutes: product ? 60 : 40, cutoff: c.coding, status: 'pending', summary: product ? '1 Medium + 1 Hard problem' : '1 Easy + 1 Medium problem' },
      { id: 'tech', name: 'Technical interview', minutes: product ? 25 : 20, cutoff: c.tech, status: 'pending', count: product ? 5 : 4, summary: (product ? 5 : 4) + ' questions' },
      { id: 'hr', name: 'HR interview', minutes: 15, cutoff: c.hr, status: 'pending', count: 3, summary: '3 questions' }
    ];
  }

  // Preview before starting: what rounds this company's drive has and what clears each one.
  app.get('/api/drive/prepare', auth, (req, res) => {
    const company = getCompany(String(req.query.company || ''));
    if (!company) return res.status(404).json({ error: 'Unknown company' });
    const test = buildTestRound(company.id);
    if (!test) return res.status(404).json({ error: 'No test pattern for this company yet' });
    const d = patterns.describe(company.id) || {};
    res.json({
      company: { id: company.id, name: company.name || company.id, type: company.type },
      rounds: planRounds(company, test).map((r) => ({ id: r.id, name: r.name, minutes: r.minutes, cutoff: r.cutoff, summary: r.summary })),
      sections: test.sections.map((s) => ({ name: s.name, count: s.count, minutes: s.minutes })),
      sectionFloor: SECTION_FLOOR, extras: d.extras || [], how: d.how || '', real: d.real !== false, note: d.note || ''
    });
  });

  app.post('/api/drive/start', auth, (req, res) => {
    const company = getCompany(String((req.body && req.body.company) || ''));
    if (!company) return res.status(404).json({ error: 'Unknown company' });
    const test = buildTestRound(company.id);
    if (!test) return res.status(404).json({ error: 'No test pattern for this company yet' });
    // an unfinished drive is closed so there is only ever one running drive per student
    db.prepare("UPDATE drive_sessions SET status = 'abandoned' WHERE user_id = ? AND status = 'running'").run(req.user.id);
    const st = {
      strict: !(req.body && req.body.strict === false),
      ri: 0, roundStartedAt: new Date().toISOString(),
      rounds: planRounds(company, test),
      test: { sections: test.sections, questions: test.questions },
      coding: { problems: pickProblems(company).map((p) => p.id), best: {} },
      interviews: {}
    };
    const r = db.prepare('INSERT INTO drive_sessions (user_id, company, state) VALUES (?,?,?)').run(req.user.id, company.id, JSON.stringify(st));
    res.json(publicState({ id: r.lastInsertRowid, company: company.id, status: 'running' }, st));
  });

  app.get('/api/drive/active', auth, (req, res) => {
    const row = db.prepare("SELECT * FROM drive_sessions WHERE user_id = ? AND status = 'running' ORDER BY id DESC LIMIT 1").get(req.user.id);
    if (!row) return res.json({});
    res.json({ drive: publicState(row, JSON.parse(row.state)) });
  });

  // ---- finishing a round: record the score, then move on, or end the drive ----
  function endRound(row, st, details) {
    const r = st.rounds[st.ri];
    Object.assign(r, details);
    r.status = r.passed ? 'passed' : 'failed';
    const lastRound = st.ri >= st.rounds.length - 1;
    const eliminated = !r.passed && st.strict;
    if (lastRound || eliminated) return finishDrive(row, st);
    st.ri += 1;
    st.rounds[st.ri].status = 'active';
    st.roundStartedAt = new Date().toISOString();
    save(row, st);
    return publicState(row, st);
  }

  function finishDrive(row, st) {
    const done = st.rounds.filter((r) => r.status === 'passed' || r.status === 'failed');
    const failed = st.rounds.filter((r) => r.status === 'failed');
    const skipped = st.rounds.filter((r) => r.status === 'pending' || r.status === 'active');
    skipped.forEach((r) => { r.status = 'not reached'; });
    const outcome = failed.length === 0 && skipped.length === 0 ? 'selected' : 'rejected';
    const overall = done.length ? Math.round(done.reduce((a, r) => a + r.score, 0) / done.length) : 0;
    const advice = [];
    st.rounds.forEach((r) => {
      if (r.status !== 'failed') return;
      if (r.id === 'test') (r.weak || []).forEach((w) => advice.push({ text: 'Practise ' + w + ' questions', to: '/mock' }));
      if (r.id === 'coding') advice.push({ text: 'Solve more problems on the Coding page', to: '/coding' });
      if (r.id === 'tech') advice.push({ text: 'Practise technical answers in the mock interview', to: '/interview' });
      if (r.id === 'hr') advice.push({ text: 'Practise HR answers with examples', to: '/interview' });
    });
    advice.push({ text: 'Read the reported questions for ' + (getCompany(row.company) || {}).name, to: '/notes/' + row.company });
    st.report = {
      outcome, overall, strict: st.strict,
      rejectedAt: failed.length ? failed[0].name : null,
      rounds: st.rounds.map((r) => ({ id: r.id, name: r.name, status: r.status, score: r.score == null ? null : r.score, cutoff: r.cutoff, detail: r.detail || null })),
      advice
    };
    const c = getCompany(row.company) || {};
    save(row, st, 'done');
    db.prepare('INSERT INTO drive_attempts (user_id, company, outcome, overall, data) VALUES (?,?,?,?,?)')
      .run(row.user_id, row.company, outcome, overall, JSON.stringify(st.report.rounds));
    // keep the older simulator history (shown on the Growth page) in step
    try {
      db.prepare('INSERT INTO simulator_attempts (user_id, company, overall, cleared, data) VALUES (?,?,?,?,?)')
        .run(row.user_id, row.company, overall, st.rounds.filter((r) => r.status === 'passed').length, JSON.stringify(st.report.rounds));
    } catch (e) { /* table missing, ignore */ }
    return publicState({ id: row.id, company: row.company, status: 'done', name: c.name }, st);
  }

  // Round 1: online test
  app.post('/api/drive/test/submit', auth, (req, res) => {
    const ld = load(req);
    if (ld.error) return res.status(ld.error[0]).json({ error: ld.error[1] });
    const { row, st } = ld;
    const cur = st.rounds[st.ri];
    if (cur.id !== 'test') return res.status(400).json({ error: 'This round is not active' });
    const ans = (req.body && req.body.answers) || {};
    const secs = st.test.sections.map((s) => ({ name: s.name, correct: 0, total: 0 }));
    const wrong = [];
    let correct = 0;
    st.test.questions.forEach((q, i) => {
      const chosen = ans[i] === undefined || ans[i] === null ? -1 : Number(ans[i]);
      secs[q.sec].total += 1;
      if (chosen === q.answer) { secs[q.sec].correct += 1; correct += 1; } else wrong.push({ q, chosen });
    });
    wrong.forEach(({ q, chosen }) => {
      db.prepare('INSERT OR REPLACE INTO mistakes (user_id, cat, question, options, answer, chosen, explanation) VALUES (?,?,?,?,?,?,?)')
        .run(req.user.id, q.cat, q.question, JSON.stringify(q.options), q.answer, chosen, q.explanation || '');
    });
    st.test.questions.forEach((q, i) => {
      if ((ans[i] === undefined || ans[i] === null ? -1 : Number(ans[i])) === q.answer) db.prepare('DELETE FROM mistakes WHERE user_id = ? AND question = ?').run(req.user.id, q.question);
    });
    const sections = secs.map((s) => ({ ...s, percent: Math.round((s.correct / s.total) * 100) }));
    const score = Math.round((correct / st.test.questions.length) * 100);
    const weak = sections.filter((s) => s.percent < SECTION_FLOOR).map((s) => s.name);
    const passed = score >= cur.cutoff && weak.length === 0;
    const late = elapsed(st) > cur.minutes * 60 + GRACE_SECONDS;
    res.json(endRound(row, st, {
      score, passed, weak,
      detail: { kind: 'test', correct, total: st.test.questions.length, sections, sectionFloor: SECTION_FLOOR, late, mistakesSaved: wrong.length }
    }));
  });

  // Round 2: coding. Each run is judged; only the best result per problem counts.
  const lastRun = new Map();
  app.post('/api/drive/code/run', auth, async (req, res) => {
    const ld = load(req);
    if (ld.error) return res.status(ld.error[0]).json({ error: ld.error[1] });
    const { row, st } = ld;
    if (st.rounds[st.ri].id !== 'coding') return res.status(400).json({ error: 'This round is not active' });
    const b = req.body || {};
    const pid = String(b.problemId || '');
    if (!st.coding.problems.includes(pid)) return res.status(400).json({ error: 'This problem is not part of your drive' });
    const p = coding.PROBLEMS.find((x) => x.id === pid);
    const langId = String(b.language || '');
    const code = typeof b.code === 'string' ? b.code : '';
    if (!coding.LANGS[langId] || !coding.availableLangs().includes(langId)) return res.status(400).json({ error: 'This language is not available on the server. Choose another language.' });
    if (!code.trim()) return res.status(400).json({ error: 'Write some code first' });
    if (code.length > 20000) return res.status(400).json({ error: 'Code is too long' });
    if (elapsed(st) > st.rounds[st.ri].minutes * 60 + GRACE_SECONDS) return res.status(400).json({ error: 'Time is over for this round. Finish the round.' });
    const now = Date.now();
    if (now - (lastRun.get(req.user.id) || 0) < 2000) return res.status(429).json({ error: 'Please wait a moment before running again' });
    lastRun.set(req.user.id, now);
    try {
      const out = await coding.judge(p, coding.LANGS[langId], code);
      const prev = st.coding.best[pid] || { passed: 0, total: out.total };
      st.coding.best[pid] = { passed: Math.max(prev.passed, out.passed), total: out.total };
      save(row, st);
      if (out.solved) db.prepare('INSERT OR IGNORE INTO coding_solved (user_id, pid) VALUES (?, ?)').run(req.user.id, pid);
      // like a real online judge, only the first test case is shown in detail; the others are pass / fail
      res.json({
        compileError: out.compileError || null, passed: out.passed, total: out.total, solved: out.solved,
        best: st.coding.best[pid],
        results: out.results.map((r, i) => (i === 0
          ? { ok: r.ok, status: r.status, input: r.input, expected: r.expected, got: r.got, error: r.error }
          : { ok: r.ok, status: r.status }))
      });
    } catch (e) {
      res.status(502).json({ error: 'Code runner unavailable: ' + e.message });
    }
  });

  app.post('/api/drive/code/finish', auth, (req, res) => {
    const ld = load(req);
    if (ld.error) return res.status(ld.error[0]).json({ error: ld.error[1] });
    const { row, st } = ld;
    const cur = st.rounds[st.ri];
    if (cur.id !== 'coding') return res.status(400).json({ error: 'This round is not active' });
    const probs = st.coding.problems.map((id) => {
      const p = coding.PROBLEMS.find((x) => x.id === id);
      const b = st.coding.best[id] || { passed: 0, total: p.tests.length };
      return { id, title: p.title, level: p.level, passed: b.passed, total: b.total };
    });
    const total = probs.reduce((a, p) => a + p.total, 0);
    const passedTests = probs.reduce((a, p) => a + p.passed, 0);
    const score = total ? Math.round((passedTests / total) * 100) : 0;
    res.json(endRound(row, st, { score, passed: score >= cur.cutoff, detail: { kind: 'coding', problems: probs } }));
  });

  // Rounds 3 and 4: interviews run through /api/interview/start and /answer, then are attached here.
  app.post('/api/drive/interview/finish', auth, (req, res) => {
    const ld = load(req);
    if (ld.error) return res.status(ld.error[0]).json({ error: ld.error[1] });
    const { row, st } = ld;
    const cur = st.rounds[st.ri];
    if (cur.id !== 'tech' && cur.id !== 'hr') return res.status(400).json({ error: 'This round is not active' });
    const sid = Number((req.body || {}).sessionId);
    const iv = db.prepare('SELECT * FROM interview_sessions WHERE id = ? AND user_id = ?').get(sid, req.user.id);
    if (!iv || !iv.done) return res.status(400).json({ error: 'Finish all the interview questions first' });
    if (String(iv.created_at) < String(row.created_at)) return res.status(400).json({ error: 'Start the interview from inside this drive' });
    if (iv.type !== cur.id || iv.company !== row.company) return res.status(400).json({ error: 'This interview does not belong to this round' });
    if (Object.values(st.interviews).includes(sid)) return res.status(400).json({ error: 'This interview was already used' });
    const asked = (JSON.parse(iv.data).asked) || [];
    if (!asked.length) return res.status(400).json({ error: 'Interview has no answers' });
    st.interviews[cur.id] = sid;
    const score = Math.round(asked.reduce((a, x) => a + (x.score || 0), 0) / asked.length);
    const review = asked.map((x) => ({ q: x.q, score: x.score || 0, verdict: x.verdict || 'wrong', missed: x.missed || [] }));
    res.json(endRound(row, st, { score, passed: score >= cur.cutoff, detail: { kind: 'interview', review } }));
  });

  app.get('/api/drive/history', auth, (req, res) => {
    const rows = db.prepare('SELECT id, company, outcome, overall, data, created_at FROM drive_attempts WHERE user_id = ? ORDER BY id DESC LIMIT 10').all(req.user.id);
    res.json({
      history: rows.map((r) => {
        const c = getCompany(r.company);
        let rounds = [];
        try { rounds = JSON.parse(r.data || '[]'); } catch (e) { rounds = []; }
        return { id: r.id, company: c ? c.name : r.company, outcome: r.outcome, overall: r.overall, created_at: r.created_at, rounds: rounds.map((x) => ({ name: x.name, status: x.status, score: x.score })) };
      })
    });
  });
};
