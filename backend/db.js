const Database = require('better-sqlite3');
const db = new Database('dsds.db');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  college TEXT,
  branch TEXT,
  year INTEGER,
  language TEXT DEFAULT 'en',
  role TEXT DEFAULT 'student',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

// Re-create the demo account on every start (hosting disk can reset the database)
if (process.env.SEED_EMAIL && process.env.SEED_PASSWORD) {
  const bcrypt = require('bcryptjs');
  const seedEmail = process.env.SEED_EMAIL.trim().toLowerCase();
  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(seedEmail);
  if (!exists) {
    db.prepare(
      'INSERT INTO users (name, email, password_hash, college, branch, year, language) VALUES (?,?,?,?,?,?,?)'
    ).run(
      process.env.SEED_NAME || 'Student',
      seedEmail,
      bcrypt.hashSync(process.env.SEED_PASSWORD, 10),
      'SRGEC',
      'CSE',
      4,
      'en'
    );
    console.log('Seeded demo account');
  }
}
module.exports = db;