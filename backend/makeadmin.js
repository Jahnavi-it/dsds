const db = require('./db');
const email = (process.argv[2] || '').toLowerCase();
if (!email) {
  console.log('Usage: node makeadmin.js user@email.com');
  process.exit(1);
}
const r = db.prepare("UPDATE users SET role = 'admin' WHERE email = ?").run(email);
console.log(r.changes ? email + ' is now admin' : 'No user found with email ' + email);