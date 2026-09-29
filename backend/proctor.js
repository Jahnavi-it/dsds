module.exports = function (app, db, auth) {
  db.exec(
    'CREATE TABLE IF NOT EXISTS proctor_reports (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, session_id INTEGER NOT NULL, camera INTEGER DEFAULT 0, tab_switch INTEGER DEFAULT 0, blur INTEGER DEFAULT 0, fullscreen_exit INTEGER DEFAULT 0, auto_submitted INTEGER DEFAULT 0, log TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);'
  );

  const num = (v) => Math.max(0, Math.min(999, Number(v) || 0));

  app.post('/api/proctor/report', auth, (req, res) => {
    const b = req.body || {};
    const s = db.prepare('SELECT id FROM mock_sessions WHERE id = ? AND user_id = ?').get(Number(b.sessionId), req.user.id);
    if (!s) return res.status(404).json({ error: 'Session not found' });
    const log = (Array.isArray(b.log) ? b.log : []).slice(0, 50).map((e) => ({
      type: String(e.type || '').slice(0, 10),
      at: String(e.at || '').slice(0, 30)
    }));
    db.prepare('DELETE FROM proctor_reports WHERE session_id = ? AND user_id = ?').run(s.id, req.user.id);
    db.prepare('INSERT INTO proctor_reports (user_id, session_id, camera, tab_switch, blur, fullscreen_exit, auto_submitted, log) VALUES (?,?,?,?,?,?,?,?)')
      .run(req.user.id, s.id, b.camera ? 1 : 0, num(b.tab), num(b.blur), num(b.fs), b.auto ? 1 : 0, JSON.stringify(log));
    res.json({ ok: true });
  });

  app.get('/api/proctor/report/:sid', auth, (req, res) => {
    const r = db.prepare('SELECT * FROM proctor_reports WHERE session_id = ? AND user_id = ?').get(Number(req.params.sid), req.user.id);
    res.json({ report: r || null });
  });
};