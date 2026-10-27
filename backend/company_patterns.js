// Company-wise online test patterns, built from what prep sites and candidates report.
// The pattern (sections, number of questions, time) follows the sources. The questions themselves are practice
// MCQs from our own banks, because companies do not publish their real papers. Patterns change every year.

const fs = require('fs');
const path = require('path');

const T = (title, url) => ({ title, url });

const PATTERNS = {
  tcs: {
    title: 'TCS NQT',
    how: 'Foundation section with numerical, verbal and reasoning, then an Advanced section. Each section has its own timer and you cannot go back to a finished section.',
    mode: 'sectional',
    sections: [
      { name: 'Numerical Ability', cats: ['aptitude'], count: 20, minutes: 25 },
      { name: 'Verbal Ability', cats: ['verbal'], count: 25, minutes: 25 },
      { name: 'Reasoning Ability', cats: ['reasoning'], count: 20, minutes: 25 },
      { name: 'Advanced Quantitative and Reasoning', cats: ['aptitude', 'reasoning'], count: 15, minutes: 25 }
    ],
    extras: [{ name: 'Advanced coding', detail: 'One to three coding problems (reports say about 90 minutes). Practise them in Coding practice.' }],
    note: 'Different sites list slightly different timings for the foundation sections, so treat the times as a close guide.',
    sources: [
      T('FACE Prep: TCS NQT exam pattern 2026', 'https://www.faceprep.in/article/tcs-exam-pattern/'),
      T('Design Gurus: TCS NQT exam pattern', 'https://www.designgurus.io/answers/detail/what-is-the-tcs-nqt-exam-pattern'),
      T('PlacementPreparation.io: TCS NQT syllabus and test pattern', 'https://www.placementpreparation.io/tcs-nqt/syllabus-and-test-pattern/')
    ]
  },
  infosys: {
    title: 'Infosys online test',
    how: 'Timed sections one after another: mathematical ability, reasoning, verbal ability, pseudocode and puzzle solving. Each section has its own timer.',
    mode: 'sectional',
    sections: [
      { name: 'Mathematical Ability', cats: ['aptitude'], count: 10, minutes: 35 },
      { name: 'Analytical and Logical Reasoning', cats: ['reasoning'], count: 15, minutes: 15 },
      { name: 'Verbal Ability', cats: ['verbal'], count: 20, minutes: 20 },
      { name: 'Pseudocode', cats: ['pseudocode'], count: 5, minutes: 10 },
      { name: 'Puzzle Solving', cats: ['reasoning'], count: 4, minutes: 10 }
    ],
    extras: [],
    note: 'Candidates report the reasoning time between 15 and 25 minutes. Specialist roles may add coding questions.',
    fromNotes: true,
    sources: []
  },
  wipro: {
    title: 'Wipro NLTH',
    how: 'An aptitude test of about 48 questions in about 48 minutes (quantitative, logical and verbal), followed by a written communication essay and a coding round.',
    mode: 'sectional',
    sections: [
      { name: 'Quantitative Aptitude', cats: ['aptitude'], count: 16, minutes: 16 },
      { name: 'Logical Reasoning', cats: ['reasoning'], count: 18, minutes: 18 },
      { name: 'Verbal Ability', cats: ['verbal'], count: 14, minutes: 14 }
    ],
    extras: [
      { name: 'Written communication (essay)', detail: 'About 20 minutes on a given topic. Practise by writing 150 to 200 words on paper.' },
      { name: 'Coding', detail: 'Two coding problems. Practise them in Coding practice.' }
    ],
    note: 'Sources give the total time (about 48 minutes) but not a fixed split, so we split it by the number of questions.',
    sources: [
      T('FACE Prep: Wipro NLTH 2026 test pattern', 'https://faceprep.in/article/wipro-nlth-2026-registration-dates-and-test-pattern/'),
      T('Design Gurus: Wipro Elite NTH test pattern', 'https://www.designgurus.io/answers/detail/what-is-the-wipro-elite-nth-test-pattern'),
      T('Weekday: Wipro interview questions 2026', 'https://www.weekday.works/post/wipro-interview-questions')
    ]
  },
  accenture: {
    title: 'Accenture cognitive and technical assessment',
    how: 'One combined test of about 90 questions in 90 minutes. The time is shared across all sections, so you can move between sections and manage your own time.',
    mode: 'shared',
    minutes: 90,
    sections: [
      { name: 'Verbal Ability', cats: ['verbal'], count: 17 },
      { name: 'Reasoning Ability', cats: ['reasoning'], count: 18 },
      { name: 'Numerical Ability', cats: ['aptitude'], count: 15 },
      { name: 'MS Office and Common Applications', cats: ['office'], count: 12 },
      { name: 'Pseudocode', cats: ['pseudocode'], count: 18 },
      { name: 'Networking, Security and Cloud', cats: ['cn', 'cloud'], count: 10 }
    ],
    extras: [
      { name: 'Coding assessment', detail: 'Two problems in about 45 minutes in any language. Practise them in Coding practice.' },
      { name: 'Communication assessment', detail: 'About 30 minutes of spoken and written English tasks. Not simulated here.' }
    ],
    note: 'Section sizes can change slightly between drives.',
    sources: [
      T('PlacementPreparation.io: Accenture syllabus and test pattern', 'https://www.placementpreparation.io/accenture/syllabus-and-test-pattern/'),
      T('Design Gurus: Accenture assessment test pattern', 'https://www.designgurus.io/answers/detail/what-is-the-accenture-assessment-test-pattern'),
      T('FACE Prep: Accenture recruitment process and written test pattern', 'https://www.faceprep.in/article/accenture-recruitment-process-written-test-pattern-interviews/')
    ]
  },
  cognizant: {
    title: 'Cognizant GenC online assessment',
    how: 'An aptitude test with quantitative, logical and verbal sections, each with its own timer, followed by a communication assessment and a technical or coding assessment.',
    mode: 'sectional',
    sections: [
      { name: 'Quantitative Aptitude', cats: ['aptitude'], count: 25, minutes: 35 },
      { name: 'Logical Reasoning', cats: ['reasoning'], count: 35, minutes: 40 },
      { name: 'Verbal Ability', cats: ['verbal'], count: 20, minutes: 20 }
    ],
    extras: [
      { name: 'Communication assessment', detail: 'Spoken and written English tasks. Not simulated here.' },
      { name: 'Technical or coding assessment', detail: 'Coding and SQL-style questions, which change by drive. Practise in Coding practice.' }
    ],
    note: 'Cognizant changes the pattern between drives and between GenC variants, so the numbers are a close guide.',
    sources: [
      T('PlacementPreparation.io: Cognizant GenC syllabus and test pattern', 'https://www.placementpreparation.io/cognizant-genc/syllabus-and-test-pattern/'),
      T('Design Gurus: Cognizant GenC test pattern', 'https://www.designgurus.io/answers/detail/what-is-the-cognizant-genc-test-pattern'),
      T('Hitbullseye: Cognizant test pattern', 'https://cpt.hitbullseye.com/Cognizant-Test-Pattern.php?amp=1')
    ]
  },
  capgemini: {
    title: 'Capgemini online assessment',
    how: 'A pseudocode section and an English communication section, with game-based aptitude and a behavioural assessment as separate parts.',
    mode: 'sectional',
    sections: [
      { name: 'Pseudocode', cats: ['pseudocode'], count: 25, minutes: 30 },
      { name: 'English Communication (Verbal)', cats: ['verbal'], count: 30, minutes: 30 }
    ],
    extras: [
      { name: 'Game-based aptitude', detail: 'Short interactive logic games (about 20 to 24 minutes). Not simulated here.' },
      { name: 'Behavioural assessment', detail: 'About 100 statements in 20 minutes. Answer honestly and consistently.' }
    ],
    note: 'Recent reports show the pseudocode and English sections. The exact mix changes by drive.',
    fromNotes: true,
    sources: [
      T('PlacementPreparation.io: Capgemini syllabus and test pattern', 'https://www.placementpreparation.io/capgemini/syllabus-and-test-pattern/'),
      T('Hitbullseye: Capgemini test pattern', 'https://cpt.hitbullseye.com/Capgemini-Test-Pattern.php?amp=1')
    ]
  },
  hcl: {
    title: 'HCLTech online test',
    how: 'Aptitude sections (quantitative, logical, verbal) and a technical section on computer fundamentals, then a short coding part.',
    mode: 'sectional',
    sections: [
      { name: 'Quantitative Aptitude', cats: ['aptitude'], count: 15, minutes: 15 },
      { name: 'Logical Reasoning', cats: ['reasoning'], count: 15, minutes: 15 },
      { name: 'Verbal Ability', cats: ['verbal'], count: 15, minutes: 15 },
      { name: 'Technical (Computer Fundamentals)', cats: ['dsa', 'dbms', 'os', 'cn', 'oops', 'c'], count: 30, minutes: 30 }
    ],
    extras: [{ name: 'Coding', detail: 'Two problems in about 20 minutes. Practise them in Coding practice.' }],
    note: 'Some drives use four sections of 15 questions, so the technical part can be smaller.',
    fromNotes: true,
    sources: [
      T('FACE Prep: HCL recruitment test 2026 pattern', 'https://faceprep.in/article/hcl-recruitment-test-2026-pattern-and-cutoff/'),
      T('PlacementPreparation.io: HCL syllabus and test pattern', 'https://www.placementpreparation.io/hcl/syllabus-and-test-pattern/'),
      T('Design Gurus: HCLTech assessment test pattern', 'https://www.designgurus.io/answers/detail/what-is-the-hcltech-assessment-test-pattern')
    ]
  },
  amazon: {
    title: 'Amazon online assessment (SDE)',
    how: 'Code debugging and logical reasoning sections with their own timers, plus two coding problems and a work-style assessment.',
    mode: 'sectional',
    sections: [
      { name: 'Code Debugging', cats: ['debug'], count: 7, minutes: 20 },
      { name: 'Logical Reasoning', cats: ['reasoning'], count: 25, minutes: 35 }
    ],
    extras: [
      { name: 'Coding', detail: 'Two coding problems in about 70 minutes. Practise them in Coding practice.' },
      { name: 'Work-style assessment', detail: 'Scenario questions based on the Leadership Principles. Not simulated here.' }
    ],
    note: 'The sections differ by role, region and year.',
    sources: [
      T('PlacementPreparation.io: Amazon syllabus and test pattern', 'https://www.placementpreparation.io/amazon/syllabus-and-test-pattern/'),
      T('LeetCode Discuss: Amazon SDE1 (Oct 2019) online assessment', 'https://leetcode.com/discuss/interview-experience/418395/amazon-sde1-seattle-oct-2019-offer'),
      T('LeetCode Discuss: Amazon SDE1 (Mar 2021) online assessment', 'https://leetcode.com/discuss/interview-experience/1133077/amazon-sde1-seattle-mar-2021-waitlist')
    ]
  },
  microsoft: {
    title: 'Microsoft online assessment',
    real: false,
    how: 'Microsoft online tests are reported as two or three coding problems with no MCQ section.',
    mode: 'sectional',
    sections: [{ name: 'CS Fundamentals (as asked in technical rounds)', cats: ['dsa', 'os', 'dbms', 'oops'], count: 25, minutes: 30 }],
    extras: [{ name: 'Online assessment (real format)', detail: 'Two or three coding problems (sliding window, DP, greedy). Practise them in Coding practice.' }],
    note: 'There is no MCQ test to copy, so this test covers the core CS topics (DSA, OS, DBMS, OOPS) that technical rounds ask. It is not a Microsoft paper.',
    fromNotes: true,
    sources: []
  },
  google: {
    title: 'Google (STEP and SWE interviews)',
    real: false,
    how: 'Google does not use an MCQ test in the reports we found. Candidates describe coding interviews on a shared document.',
    mode: 'sectional',
    sections: [{ name: 'Data Structures and Algorithms basics', cats: ['dsa'], count: 20, minutes: 25 }],
    extras: [{ name: 'Interviews (real format)', detail: 'Coding interviews on trees, sliding window, recursion and matrices. Use Mock interview and Coding practice.' }],
    note: 'This MCQ test only checks your DSA basics. It is not a Google paper.',
    fromNotes: true,
    sources: []
  }
};

let BANK = null;
function bank() {
  if (BANK) return BANK;
  const seen = new Set();
  BANK = [];
  const files = [];
  for (let i = 1; i <= 9; i++) files.push('bank' + i + '.js');
  files.push('bank_extra.js');
  files.forEach((f) => {
    const p = path.join(__dirname, f);
    if (!fs.existsSync(p)) return;
    require(p).forEach((b) => {
      if (seen.has(b.question)) return;
      seen.add(b.question);
      BANK.push(b);
    });
  });
  return BANK;
}

const shuffle = (a) => {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
};

function pickSection(sec, used) {
  const pools = sec.cats.map((c) => shuffle(bank().filter((b) => b.cat === c && !used.has(b.question))));
  const out = [];
  let i = 0;
  while (out.length < sec.count && pools.some((p) => p.length)) {
    const p = pools[i % pools.length];
    if (p.length) out.push(p.pop());
    i++;
  }
  return shuffle(out);
}

// Public description of a pattern (no answers).
function describe(id) {
  const p = PATTERNS[id];
  if (!p) return null;
  let sources = p.sources.slice();
  if (p.fromNotes) {
    try {
      const n = require('./company_notes')[id];
      if (n) n.sources.forEach((s) => { if (!sources.some((x) => x.url === s.url)) sources.push({ title: s.title, url: s.url }); });
    } catch (e) { /* ignore */ }
  }
  const total = p.sections.reduce((a, s) => a + s.count, 0);
  const minutes = p.mode === 'shared' ? p.minutes : p.sections.reduce((a, s) => a + s.minutes, 0);
  return {
    title: p.title, how: p.how, mode: p.mode, real: p.real !== false, note: p.note,
    sections: p.sections.map((s) => ({ name: s.name, count: s.count, minutes: p.mode === 'shared' ? null : s.minutes })),
    extras: p.extras, total, minutes, sources
  };
}

// Builds the questions for one attempt: every question carries its section number.
function buildTest(id) {
  const p = PATTERNS[id];
  if (!p) return null;
  const used = new Set();
  const questions = [];
  const sections = [];
  p.sections.forEach((s, si) => {
    const picked = pickSection(s, used);
    if (!picked.length) return;
    const from = questions.length;
    picked.forEach((q) => {
      used.add(q.question);
      questions.push({ cat: q.cat, question: q.question, options: q.options, answer: q.answer, explanation: q.explanation || '', sec: sections.length });
    });
    sections.push({ name: s.name, count: picked.length, minutes: p.mode === 'shared' ? null : s.minutes, from, to: questions.length - 1 });
  });
  const minutes = p.mode === 'shared' ? p.minutes : sections.reduce((a, s) => a + s.minutes, 0);
  return { mode: p.mode, title: p.title, minutes, sections, questions };
}

module.exports = { PATTERNS, describe, buildTest };
