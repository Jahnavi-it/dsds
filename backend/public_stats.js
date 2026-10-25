// Public numbers for the landing page. Everything here is counted from real data, nothing is hard-coded.
const fs = require('fs');
const path = require('path');

function staticCounts() {
  const seen = new Set();
  for (let i = 1; i <= 9; i++) {
    const f = path.join(__dirname, 'bank' + i + '.js');
    if (fs.existsSync(f)) require(f).forEach((b) => seen.add(b.question));
  }
  let companies = 0;
  try { companies = (require('./companies').COMPANIES || []).length; } catch (e) { /* ignore */ }

  let reported = 0;
  try {
    const notes = require('./company_notes');
    Object.values(notes).forEach((c) => c.rounds.forEach((r) => { reported += r.questions.length; }));
  } catch (e) { /* ignore */ }

  let coding = 0;
  try { coding = JSON.parse(fs.readFileSync(path.join(__dirname, 'coding_problems.json'), 'utf8')).length; } catch (e) { /* ignore */ }

  return { companies, mcq: seen.size, reported, coding };
}

module.exports = function (app, db) {
  const base = staticCounts();
  app.get('/api/public/stats', (req, res) => {
    let students = 0;
    try { students = db.prepare("SELECT COUNT(*) AS n FROM users WHERE COALESCE(role, 'student') = 'student'").get().n; } catch (e) { /* ignore */ }
    res.set('Cache-Control', 'public, max-age=300');
    res.json({ ...base, questions: base.mcq + base.reported, students });
  });
};
