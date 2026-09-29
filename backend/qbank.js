const fs = require('fs');
const path = require('path');

const banks = [];
['bank1', 'bank2', 'bank3', 'bank4', 'bank5', 'bank6', 'bank7'].forEach((n) => {
  if (fs.existsSync(path.join(__dirname, n + '.js'))) {
    banks.push(...require('./' + n));
  }
});

// DEDUPE: keep only the first copy of each question text
const _seenQ = new Set();
const _uniq = banks.filter((b) => (_seenQ.has(b.question) ? false : (_seenQ.add(b.question), true)));
banks.length = 0;
banks.push(..._uniq);

function seedFrom(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle(arr, seedText) {
  let s = seedFrom(seedText) || 1;
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// question text -> how many companies use it
const claimed = new Map();
const stats = {};

const EXTRA_FOCUS = {
  cognizant: ['html', 'css', 'javascript', 'react', 'webfund'],
  capgemini: ['html', 'css', 'javascript', 'webfund'],
  accenture: ['html', 'css', 'javascript', 'nodejs', 'webfund'],
  infosys: ['javascript', 'react', 'webfund'],
  wipro: ['html', 'css', 'javascript', 'webfund'],
  zoho: ['javascript', 'nodejs', 'webfund'],
  microsoft: ['javascript', 'webfund'],
  amazon: ['webfund'],
  tcs: ['webfund']
};

function buildSet(company, target = 50) {
  const focusList = company.focus.concat((EXTRA_FOCUS[company.id] || []).filter((c) => !company.focus.includes(c)));
  const own = company.questions.slice();
  const seen = new Set(own.map((q) => q.question));
  own.forEach((q) => claimed.set(q.question, (claimed.get(q.question) || 0) + 1));
  const out = own.slice();
  let shared = 0;

  const makePools = (allowShared) =>
    focusList.map((cat) => {
      const pool = shuffle(
        banks.filter((b) => b.cat === cat && !seen.has(b.question) && (allowShared || !claimed.has(b.question))),
        company.id + '-' + cat + (allowShared ? '-s' : '')
      );
      if (allowShared) {
        pool.sort((a, b) => (claimed.get(a.question) || 0) - (claimed.get(b.question) || 0));
      }
      return pool;
    });

  const fill = (pools, isShared) => {
    let i = 0;
    while (out.length < target && pools.some((p) => i < p.length)) {
      for (const p of pools) {
        if (out.length >= target) break;
        if (i < p.length && !seen.has(p[i].question)) {
          seen.add(p[i].question);
          claimed.set(p[i].question, (claimed.get(p[i].question) || 0) + 1);
          out.push(p[i]);
          if (isShared) shared++;
        }
      }
      i++;
    }
  };

  fill(makePools(false), false);
  if (out.length < target) fill(makePools(true), true);

  stats[company.id] = { total: out.length, sharedWithOthers: shared };
  return shuffle(out, company.id + '-final');
}

function counts() {
  const c = {};
  banks.forEach((b) => { c[b.cat] = (c[b.cat] || 0) + 1; });
  return c;
}

function report() {
  return { bankSize: banks.length, uniqueQuestionsUsed: claimed.size, perCompany: stats };
}

module.exports = { buildSet, counts, report };