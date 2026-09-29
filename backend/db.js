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

module.exports = db;