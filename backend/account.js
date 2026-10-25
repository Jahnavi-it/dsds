// Forgot password and reset password. The reset link is emailed and works once for 30 minutes.
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mail = require('./mailer');
const T = require('./mail_templates');

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const site = () => (process.env.PUBLIC_URL || (process.env.FRONTEND_URL || '').split(',')[0] || 'https://dsds-chi.vercel.app').trim().replace(/\/$/, '');

module.exports = function (app, db) {
  db.exec(
    'CREATE TABLE IF NOT EXISTS password_resets (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, token_hash TEXT NOT NULL UNIQUE, expires_at INTEGER NOT NULL, used INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP);'
  );

  // simple per-IP limit so nobody can use this to spam mailboxes
  const hits = new Map();
  const limited = (req, max) => {
    const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    const now = Date.now();
    const list = (hits.get(ip) || []).filter((t) => now - t < 15 * 60 * 1000);
    list.push(now);
    hits.set(ip, list);
    return list.length > max;
  };

  app.post('/api/forgot-password', (req, res) => {
    const email = String((req.body && req.body.email) || '').trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address' });
    if (limited(req, 6)) return res.status(429).json({ error: 'Too many requests. Please try again in a few minutes.' });

    const u = db.prepare('SELECT id, name, email FROM users WHERE email = ?').get(email);
    if (u) {
      const recent = db.prepare("SELECT 1 AS x FROM password_resets WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')").get(u.id);
      if (!recent) {
        const token = crypto.randomBytes(32).toString('hex');
        db.prepare('UPDATE password_resets SET used = 1 WHERE user_id = ? AND used = 0').run(u.id);
        db.prepare('INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?,?,?)').run(u.id, sha(token), Date.now() + 30 * 60 * 1000);
        mail.notify({ to: u.email, name: u.name, ...T.resetLink(u, site() + '/reset-password?token=' + token) });
      }
    }
    // same answer whether or not the email is registered
    res.json({ ok: true, message: 'If this email is registered, a reset link has been sent. Check your inbox and the spam folder.' });
  });

  app.post('/api/reset-password', (req, res) => {
    const token = String((req.body && req.body.token) || '');
    const password = String((req.body && req.body.password) || '');
    if (limited(req, 20)) return res.status(429).json({ error: 'Too many attempts. Please try again in a few minutes.' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
    const row = /^[a-f0-9]{64}$/.test(token) ? db.prepare('SELECT id, user_id, expires_at FROM password_resets WHERE token_hash = ? AND used = 0').get(sha(token)) : null;
    if (!row || row.expires_at < Date.now()) return res.status(400).json({ error: 'This reset link is invalid or has expired. Please request a new one.' });
    const u = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(row.user_id);
    if (!u) return res.status(400).json({ error: 'This reset link is invalid or has expired. Please request a new one.' });
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(bcrypt.hashSync(password, 10), u.id);
    db.prepare('UPDATE password_resets SET used = 1 WHERE user_id = ?').run(u.id);
    mail.notify({ to: u.email, name: u.name, ...T.passwordChanged(u) });
    res.json({ ok: true });
  });
};
