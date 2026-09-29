module.exports = function makeGen(startSeed) {
  let seed = startSeed;
  const rnd = (n) => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return (seed >>> 8) % n;
  };
  const pick = (arr) => arr[rnd(arr.length)];
  const out = [];
  const seen = new Set();

  function add(cat, question, correct, wrong, explanation) {
    if (seen.has(question)) return false;
    const opts = [String(correct)];
    for (const w of wrong) {
      const s = String(w);
      if (!opts.includes(s)) opts.push(s);
      if (opts.length === 4) break;
    }
    if (opts.length < 4) return false;
    const pos = rnd(4);
    const arranged = opts.slice(1);
    arranged.splice(pos, 0, opts[0]);
    seen.add(question);
    out.push({ cat, question, options: arranged, answer: pos, explanation });
    return true;
  }

  function gen(count, fn) {
    let made = 0;
    let tries = 0;
    while (made < count && tries < count * 60) {
      tries++;
      if (fn()) made++;
    }
  }

  return { rnd, pick, add, gen, out };
};