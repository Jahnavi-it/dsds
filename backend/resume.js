module.exports = function (app, db, auth) {
  db.exec('CREATE TABLE IF NOT EXISTS resumes (user_id INTEGER PRIMARY KEY, data TEXT NOT NULL, updated_at TEXT DEFAULT CURRENT_TIMESTAMP);');

  app.get('/api/resume', auth, (req, res) => {
    const r = db.prepare('SELECT data FROM resumes WHERE user_id = ?').get(req.user.id);
    res.json({ resume: r ? JSON.parse(r.data) : null });
  });

  app.post('/api/resume', auth, (req, res) => {
    const data = req.body && req.body.data;
    if (!data || typeof data !== 'object') return res.status(400).json({ error: 'Resume data required' });
    const text = JSON.stringify(data);
    if (text.length > 60000) return res.status(400).json({ error: 'Resume too large' });
    db.prepare('INSERT INTO resumes (user_id, data) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP')
      .run(req.user.id, text);
    res.json({ ok: true });
  });
};