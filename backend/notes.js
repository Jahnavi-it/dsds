module.exports = function (app, db, auth) {
  db.exec(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT DEFAULT '',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );`);

  function clean(req) {
    const title = String((req.body && req.body.title) || '').trim().slice(0, 200);
    const body = String((req.body && req.body.body) || '').slice(0, 20000);
    return { title, body };
  }

  app.get('/api/notes', auth, (req, res) => {
    const notes = db.prepare('SELECT id, title, body, updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC, id DESC').all(req.user.id);
    res.json({ notes });
  });

  app.post('/api/notes', auth, (req, res) => {
    const { title, body } = clean(req);
    if (!title) return res.status(400).json({ error: 'Title required' });
    const count = db.prepare('SELECT COUNT(*) AS c FROM notes WHERE user_id = ?').get(req.user.id).c;
    if (count >= 200) return res.status(400).json({ error: 'Note limit reached' });
    const r = db.prepare('INSERT INTO notes (user_id, title, body) VALUES (?, ?, ?)').run(req.user.id, title, body);
    res.json({ ok: true, id: r.lastInsertRowid });
  });

  app.put('/api/notes/:id', auth, (req, res) => {
    const { title, body } = clean(req);
    if (!title) return res.status(400).json({ error: 'Title required' });
    const r = db.prepare('UPDATE notes SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?')
      .run(title, body, req.params.id, req.user.id);
    if (!r.changes) return res.status(404).json({ error: 'Note not found' });
    res.json({ ok: true });
  });

  app.delete('/api/notes/:id', auth, (req, res) => {
    const r = db.prepare('DELETE FROM notes WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
    if (!r.changes) return res.status(404).json({ error: 'Note not found' });
    res.json({ ok: true });
  });
};
