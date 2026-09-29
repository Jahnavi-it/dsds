const crypto = require('crypto');

const CERTS = {
  assessment: { title: 'Skill Assessment Completion', need: 'Complete the placement assessment', ok: (x) => x.assessed },
  mock: { title: 'Mock Drive Certificate', need: 'Score 60% or more in a mock test', ok: (x) => x.mockBest >= 60 },
  interview: { title: 'Interview Practice Certificate', need: 'Score 50 or more in a technical and an HR mock interview', ok: (x) => x.tech >= 50 && x.hr >= 50 },
  placement: { title: 'Placement Readiness Certificate', need: 'Reach 70% placement readiness', ok: (x) => x.readiness >= 70 }
};

module.exports = function (app, db, auth) {
  db.exec('CREATE TABLE IF NOT EXISTS certificates (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, type TEXT NOT NULL, code TEXT NOT NULL UNIQUE, issued_at TEXT DEFAULT CURRENT_TIMESTAMP, UNIQUE(user_id, type));');

  const q = (sql, ...p) => { try { return db.prepare(sql).get(...p); } catch (e) { return undefined; } };

  function stats(uid) {
    const a = q('SELECT overall, data FROM assessment_results WHERE user_id = ? ORDER BY id DESC LIMIT 1', uid);
    const m = q('SELECT MAX(score * 100.0 / total) AS best FROM mock_attempts WHERE user_id = ?', uid) || {};
    const ti = q("SELECT MAX(score) AS best FROM interview_results WHERE user_id = ? AND type = 'tech'", uid) || {};
    const hi = q("SELECT MAX(score) AS best FROM interview_results WHERE user_id = ? AND type = 'hr'", uid) || {};
    const cs = q('SELECT COUNT(*) AS n FROM coding_solved WHERE user_id = ?', uid) || {};
    const days = q('SELECT COUNT(*) AS n FROM (SELECT date(created_at) d FROM assessment_results WHERE user_id = ? UNION SELECT date(created_at) FROM mock_attempts WHERE user_id = ? UNION SELECT date(created_at) FROM checkins WHERE user_id = ? UNION SELECT date(created_at) FROM interview_results WHERE user_id = ?)', uid, uid, uid, uid) || {};
    const rs = q('SELECT data FROM resumes WHERE user_id = ?', uid);

    let comp = 0;
    if (rs) {
      try {
        const r = JSON.parse(rs.data);
        const checks = [r.name, r.email, r.phone, r.summary, r.skills, (r.education || []).length, (r.projects || []).length];
        comp = checks.filter(Boolean).length / checks.length;
      } catch (e) { comp = 0; }
    }

    let categories = [];
    if (a) { try { categories = JSON.parse(a.data).categories.map((c) => ({ category: c.category, percent: c.percent })); } catch (e) { categories = []; } }

    const parts = [
      { key: 'assessment', score: (a ? a.overall : 0) * 0.25, max: 25 },
      { key: 'mock', score: (m.best || 0) * 0.2, max: 20 },
      { key: 'tech', score: (ti.best || 0) * 0.15, max: 15 },
      { key: 'hr', score: (hi.best || 0) * 0.15, max: 15 },
      { key: 'coding', score: Math.min((cs.n || 0) / 10, 1) * 10, max: 10 },
      { key: 'activity', score: (Math.min(days.n || 0, 20) / 20) * 5, max: 5 },
      { key: 'resume', score: comp * 10, max: 10 }
    ].map((p) => ({ ...p, score: Math.round(p.score * 10) / 10 }));

    return {
      assessed: !!a, mockBest: Math.round(m.best || 0), tech: ti.best || 0, hr: hi.best || 0,
      readiness: Math.round(parts.reduce((n, p) => n + p.score, 0)), parts, categories
    };
  }

  app.get('/api/passport', auth, (req, res) => {
    const uid = req.user.id;
    const user = db.prepare('SELECT name, college, branch, year FROM users WHERE id = ?').get(uid);
    const x = stats(uid);
    const issued = db.prepare('SELECT type, code, issued_at FROM certificates WHERE user_id = ?').all(uid);
    const certs = Object.keys(CERTS).map((k) => {
      const i = issued.find((r) => r.type === k);
      return { type: k, title: CERTS[k].title, need: CERTS[k].need, eligible: !!CERTS[k].ok(x), code: i ? i.code : null, issued_at: i ? i.issued_at : null };
    });
    res.json({ user, readiness: x.readiness, parts: x.parts, categories: x.categories, certs });
  });

  app.post('/api/certificates/claim', auth, (req, res) => {
    const type = String((req.body && req.body.type) || '');
    const def = CERTS[type];
    if (!def) return res.status(400).json({ error: 'Unknown certificate' });
    const uid = req.user.id;
    if (!def.ok(stats(uid))) return res.status(400).json({ error: 'Not eligible yet: ' + def.need });
    let row = db.prepare('SELECT code FROM certificates WHERE user_id = ? AND type = ?').get(uid, type);
    if (!row) {
      const code = 'DSDS-' + crypto.createHash('sha256').update(uid + type + Date.now() + Math.random()).digest('hex').slice(0, 10).toUpperCase();
      db.prepare('INSERT INTO certificates (user_id, type, code) VALUES (?,?,?)').run(uid, type, code);
      row = { code };
    }
    res.json({ ok: true, code: row.code });
  });

  // public: anyone can check a certificate code
  app.get('/api/verify/:code', (req, res) => {
    const r = db.prepare('SELECT c.type, c.issued_at, u.name FROM certificates c JOIN users u ON u.id = c.user_id WHERE c.code = ?').get(String(req.params.code).toUpperCase());
    if (!r) return res.json({ valid: false });
    res.json({ valid: true, name: r.name, title: CERTS[r.type] ? CERTS[r.type].title : r.type, issued_at: r.issued_at });
  });
};

module.exports.CERTS = CERTS;