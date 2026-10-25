// Forgot password without an email link: the student proves who they are with the details given at
// registration (email, full name, college) and then chooses a new password on the same page.
const bcrypt = require('bcryptjs');
const mail = require('./mailer');
const T = require('./mail_templates');

const norm = (s) => String(s == null ? '' : s).trim().toLowerCase().replace(/\s+/g, ' ');

module.exports = function (app, db) {
  const ipHits = new Map();    // ip -> timestamps
  const emailFails = new Map(); // email -> { n, until }
  const WINDOW = 15 * 60 * 1000;

  const ipLimited = (req) => {
    const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    const now = Date.now();
    const list = (ipHits.get(ip) || []).filter((t) => now - t < WINDOW);
    list.push(now);
    ipHits.set(ip, list);
    return list.length > 15;
  };

  app.post('/api/reset-password-by-details', (req, res) => {
    const b = req.body || {};
    const email = norm(b.email);
    const password = String(b.password || '');
    const generic = 'These details do not match any account. Check the email, full name and college you used when registering.';

    if (ipLimited(req)) return res.status(429).json({ error: 'Too many attempts. Please try again in a few minutes.' });
    const f = emailFails.get(email);
    if (f && f.until > Date.now()) return res.status(429).json({ error: 'Too many wrong attempts for this email. Try again in 15 minutes.' });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address' });
    if (!norm(b.name)) return res.status(400).json({ error: 'Enter your full name' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const u = db.prepare('SELECT id, name, email, college FROM users WHERE email = ?').get(email);
    if (!u || norm(u.name) !== norm(b.name) || norm(u.college) !== norm(b.college)) {
      const cur = emailFails.get(email) || { n: 0, until: 0 };
      const n = cur.until && cur.until < Date.now() ? 1 : cur.n + 1;
      emailFails.set(email, { n, until: n >= 5 ? Date.now() + WINDOW : 0 });
      return res.status(400).json({ error: generic });
    }
    emailFails.delete(email);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(bcrypt.hashSync(password, 10), u.id);
    mail.notify({ to: u.email, name: u.name, ...T.passwordChanged(u) });
    res.json({ ok: true });
  });
};
