module.exports = function (app, db, auth) {
  const adminOnly = (req, res, next) => {
    const u = db.prepare('SELECT role FROM users WHERE id = ?').get(req.user.id);
    if (!u || u.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
    next();
  };

  // run a query; if the table or column does not exist, return no rows
  const rows = (sql) => {
    try { return db.prepare(sql).all(); } catch (e) { return []; }
  };

  function collect(query) {
    const branch = String(query.branch || '');
    const year = Number(query.year) || 0;

    let users = db.prepare("SELECT id, name, email, college, branch, year FROM users WHERE role != 'admin'").all();
    if (branch) users = users.filter((u) => u.branch === branch);
    if (year) users = users.filter((u) => Number(u.year) === year);

    const latest = {};
    rows('SELECT user_id, overall, data, created_at FROM assessment_results WHERE id IN (SELECT MAX(id) FROM assessment_results GROUP BY user_id)')
      .forEach((r) => {
        try { latest[r.user_id] = { overall: r.overall, categories: JSON.parse(r.data).categories || [] }; } catch (e) { /* skip bad row */ }
      });

    const mock = {};
    rows('SELECT user_id, COUNT(*) AS n, AVG(score * 100.0 / total) AS avg FROM mock_attempts GROUP BY user_id')
      .forEach((r) => { mock[r.user_id] = r; });

    const lastOf = {};
    [
      'SELECT user_id, MAX(created_at) AS t FROM assessment_results GROUP BY user_id',
      'SELECT user_id, MAX(created_at) AS t FROM mock_attempts GROUP BY user_id',
      'SELECT user_id, MAX(created_at) AS t FROM checkins GROUP BY user_id',
      'SELECT user_id, MAX(created_at) AS t FROM practice_attempts GROUP BY user_id'
    ].forEach((sql) => rows(sql).forEach((r) => {
      if (r.t && (!lastOf[r.user_id] || r.t > lastOf[r.user_id])) lastOf[r.user_id] = r.t;
    }));

    const students = users.map((u) => {
      const a = latest[u.id];
      const cats = a ? a.categories : [];
      const weakest = cats.length ? cats.reduce((m, c) => (c.percent < m.percent ? c : m), cats[0]) : null;
      const m = mock[u.id];
      return {
        id: u.id, name: u.name, email: u.email, college: u.college, branch: u.branch, year: u.year,
        overall: a ? a.overall : null,
        categories: cats.map((c) => ({ category: c.category, percent: c.percent })),
        weakest: weakest ? weakest.category : null,
        mocks: m ? m.n : 0,
        mockAvg: m ? Math.round(m.avg) : null,
        lastActive: lastOf[u.id] || null
      };
    });

    // students who need attention come first
    students.sort((a, b) => {
      if (a.overall === null && b.overall === null) return a.name.localeCompare(b.name);
      if (a.overall === null) return 1;
      if (b.overall === null) return -1;
      return a.overall - b.overall;
    });

    const cutoff = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 19).replace('T', ' ');
    const assessed = students.filter((s) => s.overall !== null);
    const catAgg = {};
    assessed.forEach((s) => s.categories.forEach((c) => {
      if (!catAgg[c.category]) catAgg[c.category] = { category: c.category, sum: 0, students: 0, weak: 0 };
      catAgg[c.category].sum += c.percent;
      catAgg[c.category].students += 1;
      if (c.percent < 50) catAgg[c.category].weak += 1;
    }));
    const categories = Object.values(catAgg)
      .map((c) => ({ category: c.category, avg: Math.round(c.sum / c.students), students: c.students, weak: c.weak }))
      .sort((a, b) => a.avg - b.avg);

    const mockAttempts = students.reduce((n, s) => n + s.mocks, 0);
    const mockSum = students.reduce((n, s) => n + (s.mockAvg === null ? 0 : s.mockAvg * s.mocks), 0);

    return {
      overview: {
        total: students.length,
        assessed: assessed.length,
        active7: students.filter((s) => s.lastActive && s.lastActive >= cutoff).length,
        avgOverall: assessed.length ? Math.round(assessed.reduce((n, s) => n + s.overall, 0) / assessed.length) : null,
        mockAttempts,
        mockAvg: mockAttempts ? Math.round(mockSum / mockAttempts) : null,
        categories
      },
      students
    };
  }

  app.get('/api/admin/dashboard', auth, adminOnly, (req, res) => {
    res.json(collect(req.query));
  });
};