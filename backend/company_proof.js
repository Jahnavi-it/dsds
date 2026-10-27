// Builds mock-interview questions and mock-test patterns from company_notes.js,
// so every company question can show where it was reported (proof for reviewers).

const NOTES = require('./company_notes');

const STOP = new Set([
  'which', 'their', 'there', 'about', 'where', 'would', 'should', 'could', 'these', 'those', 'other',
  'every', 'using', 'while', 'after', 'before', 'usually', 'between', 'answer', 'explain', 'first',
  'then', 'with', 'that', 'this', 'from', 'into', 'when', 'what', 'each', 'example', 'examples',
  'small', 'real', 'sure', 'know', 'than', 'your', 'give', 'make', 'over', 'also', 'some', 'does',
  'have', 'show', 'keep', 'read', 'short', 'clear', 'result', 'honest', 'honestly'
]);

// Keywords for scoring come from the study hint (technical questions only).
function kwFrom(text) {
  const out = [];
  (String(text || '').toLowerCase().match(/[a-z][a-z0-9+#-]{4,}/g) || []).forEach((w) => {
    if (!STOP.has(w) && !out.includes(w) && out.length < 5) out.push(w);
  });
  return out;
}

const NOT_INTERVIEW = /assessment|online|test|written|pseudocode|nqt|foundation|advanced|group discussion/i;

function kindOf(round, q) {
  const name = round.name;
  if (NOT_INTERVIEW.test(name)) return null;
  if (/\bHR\b/.test(name)) return 'hr';
  if (/technical/i.test(name)) return 'tech';
  if (/^interview$/i.test(name.trim())) return /unique|questions for the/i.test(q.q) ? 'hr' : 'tech';
  return null;
}

// Reported interview questions for one company and type ('tech' | 'hr').
function interviewQuestions(company, type) {
  const n = NOTES[company];
  if (!n) return [];
  const out = [];
  n.rounds.forEach((r) => {
    r.questions.forEach((q) => {
      if (kindOf(r, q) !== type) return;
      const src = q.s > 0 ? n.sources[q.s - 1] : null;
      if (!src) return;
      out.push({
        q: q.q,
        kw: type === 'tech' ? kwFrom(q.a) : [],
        a: q.a || '',
        src: { title: src.title, url: src.url, type: src.type, round: r.name }
      });
    });
  });
  return out;
}

module.exports = { interviewQuestions, kwFrom };
