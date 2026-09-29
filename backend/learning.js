const { SUBJECTS } = require('./content');

module.exports = function (app, db, auth) {
  db.exec(
    'CREATE TABLE IF NOT EXISTS topic_progress (' +
    'user_id INTEGER NOT NULL, subject TEXT NOT NULL, topic INTEGER NOT NULL, ' +
    'done_at TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_id, subject, topic));'
  );

  const doneSet = (uid) => {
    const rows = db.prepare('SELECT subject, topic FROM topic_progress WHERE user_id = ?').all(uid);
    return new Set(rows.map((r) => r.subject + '|' + r.topic));
  };
  const findSubject = (id) => SUBJECTS.find((s) => s.id === id);

  app.get('/api/learn/subjects', auth, (req, res) => {
    const done = doneSet(req.user.id);
    res.json({
      subjects: SUBJECTS.map((s) => ({
        id: s.id,
        icon: s.icon,
        total: s.topics.length,
        done: s.topics.filter((_, i) => done.has(s.id + '|' + i)).length
      }))
    });
  });

  app.get('/api/learn/subjects/:id', auth, (req, res) => {
    const s = findSubject(req.params.id);
    if (!s) return res.status(404).json({ error: 'Subject not found' });
    const done = doneSet(req.user.id);
    res.json({
      id: s.id,
      icon: s.icon,
      topics: s.topics.map((t, i) => ({ index: i, title: t.title, done: done.has(s.id + '|' + i) }))
    });
  });

  app.get('/api/learn/subjects/:id/topics/:idx', auth, (req, res) => {
    const s = findSubject(req.params.id);
    const i = Number(req.params.idx);
    if (!s || !s.topics[i]) return res.status(404).json({ error: 'Topic not found' });
    const done = doneSet(req.user.id);
    res.json({
      subject: s.id,
      index: i,
      title: s.topics[i].title,
      notes: s.topics[i].notes,
      done: done.has(s.id + '|' + i),
      total: s.topics.length
    });
  });

  app.post('/api/learn/complete', auth, (req, res) => {
    const { subject, topic, done } = req.body || {};
    const s = findSubject(subject);
    if (!s || !s.topics[Number(topic)]) return res.status(400).json({ error: 'Invalid topic' });
    if (done) {
      db.prepare('INSERT OR IGNORE INTO topic_progress (user_id, subject, topic) VALUES (?,?,?)').run(req.user.id, subject, Number(topic));
    } else {
      db.prepare('DELETE FROM topic_progress WHERE user_id = ? AND subject = ? AND topic = ?').run(req.user.id, subject, Number(topic));
    }
    res.json({ done: !!done });
  });
};