// Keeps the SQLite database alive across restarts on hosts with a temporary disk (Render free plan).
// A copy of the database file is stored in a free Turso database (TURSO_URL + TURSO_TOKEN).
// On start the copy is restored; while running, any change is uploaded every few seconds and on shutdown.
// Without TURSO_URL nothing happens and the app behaves exactly as before.
const fs = require('fs');

const DB_FILE = process.env.DB_PATH || 'dsds.db';
const enabled = !!process.env.TURSO_URL;
const CHUNK = 256 * 1024;
const INTERVAL = Number(process.env.BACKUP_INTERVAL_MS) || 10000;

let client = null;
let blocked = false;      // true when the restore failed: never overwrite a good backup with an empty database
let remoteEmpty = false;  // true when nothing was saved yet, so the first run uploads once

function remote() {
  if (!client) {
    const { createClient } = require('@libsql/client/web');
    client = createClient({ url: process.env.TURSO_URL, authToken: process.env.TURSO_TOKEN });
  }
  return client;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function restore() {
  if (!enabled) return;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const c = remote();
      await c.execute('CREATE TABLE IF NOT EXISTS db_backup (idx INTEGER PRIMARY KEY, data BLOB NOT NULL, saved_at TEXT)');
      const r = await c.execute('SELECT data FROM db_backup ORDER BY idx');
      if (!r.rows.length) {
        remoteEmpty = true;
        console.log('Backup: nothing saved yet, starting with a new database');
        return;
      }
      const buf = Buffer.concat(r.rows.map((row) => Buffer.from(row.data)));
      for (const ext of ['', '-wal', '-shm', '-journal']) { try { fs.unlinkSync(DB_FILE + ext); } catch { /* not there */ } }
      fs.writeFileSync(DB_FILE, buf);
      console.log('Backup: restored database (' + buf.length + ' bytes)');
      return;
    } catch (e) {
      console.error('Backup: restore failed (attempt ' + attempt + '): ' + e.message);
      if (attempt < 3) await sleep(2000);
    }
  }
  blocked = true;
  console.error('Backup: could not reach Turso. Running WITHOUT saving so the saved copy is not overwritten. Check TURSO_URL and TURSO_TOKEN.');
}

const changes = (db) => db.prepare('SELECT total_changes() AS n').get().n;

async function upload(db) {
  const buf = db.serialize();
  const at = new Date().toISOString();
  const stmts = [{ sql: 'DELETE FROM db_backup', args: [] }];
  for (let i = 0, idx = 0; i < buf.length; i += CHUNK, idx++) {
    stmts.push({ sql: 'INSERT INTO db_backup (idx, data, saved_at) VALUES (?, ?, ?)', args: [idx, new Uint8Array(buf.subarray(i, i + CHUNK)), at] });
  }
  await remote().batch(stmts, 'write'); // one transaction: a failed upload keeps the old copy
}

function watch(db) {
  if (!enabled || blocked) return;
  let last = changes(db);
  let force = remoteEmpty;
  let busy = false;

  const save = async () => {
    const n = changes(db);
    if (n === last && !force) return;
    await upload(db);
    last = n;
    force = false;
  };

  setInterval(async () => {
    if (busy) return;
    busy = true;
    try { await save(); } catch (e) { console.error('Backup: upload failed: ' + e.message); }
    busy = false;
  }, INTERVAL).unref();

  const bye = async () => {
    try { await save(); } catch (e) { console.error('Backup: final upload failed: ' + e.message); }
    process.exit(0);
  };
  process.once('SIGTERM', bye);
  process.once('SIGINT', bye);
}

module.exports = { restore, watch };
