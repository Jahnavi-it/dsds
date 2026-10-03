require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(cors(process.env.FRONTEND_URL ? { origin: process.env.FRONTEND_URL.split(',') } : undefined));
app.use(express.json());

const sign = (u) => jwt.sign({ id: u.id, role: u.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

const auth = (req, res, next) => {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Login required' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

app.get('/api/health', (req, res) => res.json({ status: 'DSDS backend running' }));

app.post('/api/register', (req, res) => {
  const { name, email, password, college, branch, year, language } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (exists) return res.status(409).json({ error: 'Email already registered' });
  const hash = bcrypt.hashSync(password, 10);
  const r = db.prepare(
    'INSERT INTO users (name, email, password_hash, college, branch, year, language) VALUES (?,?,?,?,?,?,?)'
  ).run(name, email.toLowerCase(), hash, college || null, branch || null, year || null, language || 'en');
  const user = db.prepare('SELECT id, name, email, college, branch, year, language, role FROM users WHERE id = ?').get(r.lastInsertRowid);
  res.status(201).json({ token: sign(user), user });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const u = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
  if (!u || !bcrypt.compareSync(password, u.password_hash)) return res.status(401).json({ error: 'Wrong email or password' });
  const { password_hash, ...user } = u;
  res.json({ token: sign(user), user });
});

app.get('/api/me', auth, (req, res) => {
  const user = db.prepare('SELECT id, name, email, college, branch, year, language, role FROM users WHERE id = ?').get(req.user.id);
  res.json({ user });
});

require('./assessment')(app, db, auth);
require('./learning')(app, db, auth);
require('./companies')(app, db, auth);
require('./interview')(app, db, auth);
require('./resume')(app, db, auth);
require('./coding')(app, db, auth);
require('./passport')(app, db, auth);
require('./admin')(app, db, auth);
require('./progress')(app, db, auth);
require('./proctor')(app, db, auth);
require('./simulator')(app, db, auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('DSDS backend running on http://localhost:' + PORT));
