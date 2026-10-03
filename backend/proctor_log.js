module.exports = function (app, db, auth) {
  db.exec('CREATE TABLE IF NOT EXISTS proctor_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, source TEXT, ref_id INTEGER, violations INTEGER DEFAULT 0, auto_submitted INTEGER DEFAULT 0, log TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);');

  app.post('/api/proctor/log', auth, (req, res) => {
    const b = req.body || {};
    const source = ['simulator', 'interview'].includes(b.source) ? b.source : 'other';
    const log = JSON.stringify(Array.isArray(b.log) ? b.log.slice(0, 50) : []).slice(0, 5000);
    db.prepare('INSERT INTO proctor_logs (user_id, source, ref_id, violations, auto_submitted, log) VALUES (?,?,?,?,?,?)')
      .run(req.user.id, source, Number(b.refId) || 0, Number(b.violations) || 0, b.autoSubmitted ? 1 : 0, log);
    res.json({ ok: true });
  });

  app.get('/api/proctor/logs', auth, (req, res) => {
    const rows = db.prepare('SELECT id, source, ref_id, violations, auto_submitted, log, created_at FROM proctor_logs WHERE user_id = ? ORDER BY id DESC LIMIT 20').all(req.user.id);
    res.json({ logs: rows.map((r) => ({ ...r, log: JSON.parse(r.log || '[]') })) });
  });
};
