const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

// 35 practice problems. Every problem reads from stdin, prints to stdout and has 3 test cases.
const PROBLEMS = require('./coding_problems.json');

// ---------------------------------------------------------------------------
// Languages. judge0 = language id on a Judge0 server; local = how to build/run on this server.
// ---------------------------------------------------------------------------
const LANGS = {
  c: {
    name: 'C', judge0: 50, file: 'main.c',
    compile: ['gcc', ['-O2', '-o', 'main', 'main.c', '-lm']], run: ['./main', []],
    starter: '#include <stdio.h>\n\nint main() {\n    // Read input with scanf and print the answer with printf\n    return 0;\n}\n'
  },
  cpp: {
    name: 'C++', judge0: 54, file: 'main.cpp',
    compile: ['g++', ['-O2', '-std=c++17', '-o', 'main', 'main.cpp']], run: ['./main', []],
    starter: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Read input with cin and print the answer with cout\n    return 0;\n}\n'
  },
  java: {
    name: 'Java', judge0: 62, file: 'Main.java',
    compile: ['javac', ['Main.java']], run: ['java', ['-Xmx256m', 'Main']],
    starter: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Read input with sc and print the answer with System.out.println\n    }\n}\n'
  },
  python: {
    name: 'Python', judge0: 71, file: 'main.py',
    run: ['python3', ['main.py']],
    starter: '# Read input with input() and print the answer with print()\n'
  },
  javascript: {
    name: 'JavaScript', judge0: 63, file: 'main.js',
    run: ['node', ['main.js']],
    starter: "const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\n// Read input from lines and print the answer with console.log\n"
  }
};

const MAX_CODE = 20000;
const RUN_TIMEOUT_MS = 5000;
const COMPILE_TIMEOUT_MS = 20000;
const MAX_OUTPUT = 64 * 1024;

const norm = (s) => String(s == null ? '' : s).replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '');

// ---------------------------------------------------------------------------
// Executor 1 (default): Judge0 over HTTP. Set JUDGE0_URL for your own server,
// and JUDGE0_AUTH_TOKEN if it needs a token.
// Executor 2: EXEC_MODE=local runs gcc/g++/javac/python3/node installed on this server.
// ---------------------------------------------------------------------------
async function runJudge0(lang, code, inputs) {
  const base = (process.env.JUDGE0_URL || 'https://ce.judge0.com').replace(/\/$/, '');
  const headers = { 'Content-Type': 'application/json' };
  if (process.env.JUDGE0_AUTH_TOKEN) headers['X-Auth-Token'] = process.env.JUDGE0_AUTH_TOKEN;
  const b64 = (x) => Buffer.from(String(x), 'utf8').toString('base64');
  const unb64 = (x) => (x ? Buffer.from(x, 'base64').toString('utf8') : '');

  const one = async (stdin) => {
    const r = await fetch(base + '/submissions?base64_encoded=true&wait=true', {
      method: 'POST', headers, signal: AbortSignal.timeout(30000),
      body: JSON.stringify({ language_id: lang.judge0, source_code: b64(code), stdin: b64(stdin), cpu_time_limit: 5, memory_limit: 256000 })
    });
    if (!r.ok) throw new Error('Code runner returned ' + r.status);
    const d = await r.json();
    const id = d.status && d.status.id;
    return {
      out: unb64(d.stdout), err: unb64(d.stderr) || unb64(d.message),
      compileError: id === 6 ? unb64(d.compile_output) : null,
      timedOut: id === 5,
      crashed: id >= 7 && id !== 13 && id !== 14
    };
  };
  return Promise.all(inputs.map(one));
}

function sh(cmd, args, opts) {
  return new Promise((resolve) => {
    let out = '', err = '', timedOut = false, tooMuch = false, finished = false;
    const child = spawn(cmd, args, {
      cwd: opts.cwd, stdio: ['pipe', 'pipe', 'pipe'],
      env: { PATH: process.env.PATH, HOME: opts.cwd, LANG: 'C.UTF-8' }
    });
    const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, opts.timeout);
    const done = (extra) => { if (finished) return; finished = true; clearTimeout(timer); resolve({ out, err, timedOut, tooMuch, ...extra }); };
    child.stdout.on('data', (d) => { out += d; if (out.length > MAX_OUTPUT) { tooMuch = true; out = out.slice(0, MAX_OUTPUT); child.kill('SIGKILL'); } });
    child.stderr.on('data', (d) => { err += d; if (err.length > MAX_OUTPUT) err = err.slice(0, MAX_OUTPUT); });
    child.on('error', (e) => done({ code: -1, spawnError: e.code === 'ENOENT' ? cmd + ' is not installed on the server' : e.message }));
    child.on('close', (code) => done({ code }));
    child.stdin.on('error', () => {});
    child.stdin.end(opts.input || '');
  });
}

let localBusy = 0;
async function runLocal(lang, code, inputs) {
  if (localBusy >= 3) throw new Error('Server is busy, try again in a few seconds');
  localBusy++;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'run-'));
  try {
    fs.writeFileSync(path.join(dir, lang.file), code);
    if (lang.compile) {
      const c = await sh(lang.compile[0], lang.compile[1], { cwd: dir, timeout: COMPILE_TIMEOUT_MS });
      if (c.spawnError) throw new Error(c.spawnError);
      if (c.code !== 0) {
        const msg = (c.timedOut ? 'Compilation timed out' : c.err || c.out).split(dir).join('.').slice(0, 3000);
        return inputs.map(() => ({ compileError: msg }));
      }
    }
    const results = [];
    for (const input of inputs) {
      const r = await sh(lang.run[0], lang.run[1], { cwd: dir, input, timeout: RUN_TIMEOUT_MS });
      if (r.spawnError) throw new Error(r.spawnError);
      results.push({ out: r.out, err: r.err.split(dir).join('.').slice(0, 2000), timedOut: r.timedOut, crashed: r.code !== 0 && !r.timedOut && !r.tooMuch, tooMuch: r.tooMuch });
    }
    return results;
  } finally {
    localBusy--;
    fs.rm(dir, { recursive: true, force: true }, () => {});
  }
}

// Judge0 is used only when you set JUDGE0_URL (or EXEC_MODE=judge0). Otherwise code runs on this server.
const useJudge0 = () => process.env.EXEC_MODE === 'judge0' || (!!process.env.JUDGE0_URL && process.env.EXEC_MODE !== 'local');

async function execute(lang, code, inputs) {
  return useJudge0() ? runJudge0(lang, code, inputs) : runLocal(lang, code, inputs);
}

// Which languages can this server actually run? (checked once at startup)
const { spawnSync } = require('child_process');
let available = null;
function availableLangs() {
  if (available) return available;
  if (useJudge0()) { available = Object.keys(LANGS); return available; }
  available = Object.keys(LANGS).filter((id) => {
    const l = LANGS[id];
    const cmd = l.compile ? l.compile[0] : l.run[0];
    const flag = cmd === 'javac' ? '-version' : '--version';
    const r = spawnSync(cmd, [flag], { timeout: 5000, stdio: 'ignore' });
    return !r.error && r.status === 0;
  });
  console.log('Coding languages available on this server:', available.join(', ') || 'none');
  return available;
}

module.exports = function (app, db, auth) {
  db.exec('CREATE TABLE IF NOT EXISTS coding_solved (user_id INTEGER NOT NULL, pid TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_id, pid));');

  app.get('/api/coding/problems', auth, (req, res) => {
    const solved = db.prepare('SELECT pid FROM coding_solved WHERE user_id = ?').all(req.user.id).map((r) => r.pid);
    res.json({
      languages: availableLangs().map((id) => ({ id, name: LANGS[id].name, starter: LANGS[id].starter })),
      problems: PROBLEMS.map((p) => ({ ...p, solved: solved.includes(p.id) }))
    });
  });

  // Runs the student's code against the 3 test cases of the problem.
  const lastRun = new Map();
  app.post('/api/coding/run', auth, async (req, res) => {
    const b = req.body || {};
    const p = PROBLEMS.find((x) => x.id === String(b.id || ''));
    const lang = LANGS[String(b.language || '')];
    const code = typeof b.code === 'string' ? b.code : '';
    if (!p) return res.status(404).json({ error: 'Unknown problem' });
    if (!lang || !availableLangs().includes(String(b.language))) return res.status(400).json({ error: 'This language is not available on the server. Choose another language.' });
    if (!code.trim()) return res.status(400).json({ error: 'Write some code first' });
    if (code.length > MAX_CODE) return res.status(400).json({ error: 'Code is too long' });

    const now = Date.now();
    if (now - (lastRun.get(req.user.id) || 0) < 2000) return res.status(429).json({ error: 'Please wait a moment before running again' });
    lastRun.set(req.user.id, now);

    try {
      const raw = await execute(lang, code, p.tests.map((t) => t.input));
      if (raw[0] && raw[0].compileError) return res.json({ compileError: raw[0].compileError, results: [], passed: 0, total: p.tests.length, solved: false });
      const results = p.tests.map((t, i) => {
        const r = raw[i] || {};
        let status = 'Accepted';
        const ok = !r.timedOut && !r.crashed && !r.tooMuch && norm(r.out) === norm(t.output);
        if (r.timedOut) status = 'Time Limit Exceeded';
        else if (r.tooMuch) status = 'Output Limit Exceeded';
        else if (r.crashed) status = 'Runtime Error';
        else if (!ok) status = 'Wrong Answer';
        return { ok, status, input: t.input, expected: t.output, got: r.out || '', error: ok ? '' : (r.err || '').slice(0, 1500) };
      });
      const passed = results.filter((r) => r.ok).length;
      const solved = passed === results.length;
      if (solved) db.prepare('INSERT OR IGNORE INTO coding_solved (user_id, pid) VALUES (?, ?)').run(req.user.id, p.id);
      res.json({ results, passed, total: results.length, solved });
    } catch (e) {
      res.status(502).json({ error: 'Code runner unavailable: ' + e.message });
    }
  });

  // Company notes: real, previously reported questions for each company (see company_notes.js)
  app.get('/api/notes/:id', auth, (req, res) => {
    const c = (require('./companies').COMPANIES || []).find((x) => x.id === req.params.id);
    if (!c) return res.status(404).json({ error: 'Company not found' });
    const n = require('./company_notes')[c.id];
    if (!n) return res.status(404).json({ error: 'Notes for this company are not ready yet' });
    res.json({ id: c.id, name: c.name || c.id, type: c.type, ...n });
  });
};

module.exports.PROBLEMS = PROBLEMS;
