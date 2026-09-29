const makeGen = require('./gen');
const { rnd, pick, add, gen, out } = makeGen(2024);
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

gen(14, () => {
  const p = pick([5, 8, 10, 12, 15, 18, 20, 25, 30, 35, 40, 45, 60, 75]);
  const n = (rnd(40) + 5) * 20;
  const a = (n * p) / 100;
  if (!Number.isInteger(a)) return false;
  return add('aptitude', `What is ${p}% of ${n}?`, a, [a + 5, a + 10, a * 2, a + 20], `${n} x ${p}/100 = ${a}.`);
});

gen(12, () => {
  const cp = (rnd(30) + 5) * 20;
  const p = pick([10, 20, 25, 40, 50]);
  const sp = (cp * (100 + p)) / 100;
  if (!Number.isInteger(sp)) return false;
  return add('aptitude', `An article bought for Rs. ${cp} is sold for Rs. ${sp}. What is the profit percentage?`, `${p}%`, [`${p + 5}%`, `${p - 5}%`, `${p + 10}%`, `${p + 15}%`], `Profit = ${sp - cp} on cost ${cp}, which is ${p}%.`);
});

gen(12, () => {
  const m = (rnd(40) + 10) * 50;
  const d = pick([10, 15, 20, 25, 30, 40]);
  const sp = (m * (100 - d)) / 100;
  if (!Number.isInteger(sp)) return false;
  return add('aptitude', `A jacket marked at Rs. ${m} is sold at a ${d}% discount. What is the selling price?`, sp, [sp + 50, sp - 50, sp + 100, sp - 100], `${m} x ${100 - d}/100 = ${sp}.`);
});

gen(12, () => {
  const P = (rnd(20) + 2) * 500;
  const r = pick([4, 5, 6, 8, 10, 12]);
  const t = pick([2, 3, 4, 5]);
  const si = (P * r * t) / 100;
  return add('aptitude', `What is the simple interest on Rs. ${P} at ${r}% per annum for ${t} years?`, si, [si + 50, si + 100, si * 2, si + 200], `${P} x ${r} x ${t} / 100 = ${si}.`);
});

gen(12, () => {
  const nums = Array.from({ length: 5 }, () => rnd(80) + 10);
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 5) return false;
  const a = sum / 5;
  return add('aptitude', `What is the average of ${nums.join(', ')}?`, a, [a + 1, a + 2, a - 2, a + 3], `Sum ${sum} divided by 5 = ${a}.`);
});

gen(14, () => {
  let [a, b] = pick([[12, 12], [10, 15], [20, 30], [12, 24], [15, 30], [30, 60], [18, 36], [20, 20], [6, 12], [8, 8], [24, 24], [40, 60], [12, 36], [9, 18], [10, 40], [16, 48]]);
  if (rnd(2)) [a, b] = [b, a];
  const d = (a * b) / (a + b);
  if (!Number.isInteger(d)) return false;
  return add('aptitude', `A can finish a work in ${a} days and B can finish it in ${b} days. Working together, in how many days will they finish it?`, d, [d + 1, d + 2, d - 1, d + 3], `Rate = 1/${a} + 1/${b} = 1/${d}, so ${d} days.`);
});

gen(10, () => {
  const s = pick([30, 40, 45, 50, 60, 72, 80]);
  const t = pick([2, 3, 4, 5, 6]);
  const d = s * t;
  return add('aptitude', `A bus travels at ${s} km/h for ${t} hours. How far does it travel?`, `${d} km`, [`${d + s} km`, `${d - s} km`, `${d + 20} km`, `${d + 40} km`], `Distance = ${s} x ${t} = ${d} km.`);
});

gen(10, () => {
  const s = pick([30, 40, 45, 50, 60, 72, 80]);
  const t = pick([2, 3, 4, 5, 6]);
  const d = s * t;
  return add('aptitude', `How many hours will a vehicle take to cover ${d} km at ${s} km/h?`, t, [t + 1, t + 2, t - 1, t + 3], `Time = ${d} / ${s} = ${t} hours.`);
});

gen(10, () => {
  const s = pick([36, 54, 72, 90, 108]);
  const t = pick([5, 6, 8, 10, 12, 15]);
  const ms = (s * 5) / 18;
  const L = ms * t;
  return add('aptitude', `A train running at ${s} km/h crosses a pole in ${t} seconds. What is the length of the train in metres?`, L, [L + 50, L + 100, L - 20, L + 25], `${s} km/h = ${ms} m/s, so length = ${ms} x ${t} = ${L} m.`);
});

gen(12, () => {
  const [a, b] = pick([[2, 3], [3, 4], [1, 2], [2, 5], [3, 5], [4, 5], [5, 7], [3, 7]]);
  const k = rnd(36) + 5;
  const total = (a + b) * k;
  const big = b * k;
  const small = a * k;
  return add('aptitude', `Rs. ${total} is divided between two people in the ratio ${a}:${b}. What is the larger share?`, big, [small, big + k, big + 2 * k, big + 3 * k], `Each part = ${total}/${a + b} = ${k}, so the larger share = ${b} x ${k} = ${big}.`);
});

gen(10, () => {
  const g = rnd(5) + 2;
  const x = rnd(8) + 2;
  const y = rnd(8) + 2;
  if (x === y || gcd(x, y) !== 1) return false;
  const a = g * x;
  const b = g * y;
  return add('aptitude', `What is the HCF of ${a} and ${b}?`, g, [g * 2, g * 3, g + 2, g * 4], `${a} = ${g} x ${x} and ${b} = ${g} x ${y}, and ${x}, ${y} have no common factor, so HCF = ${g}.`);
});

gen(10, () => {
  const g = rnd(5) + 2;
  const x = rnd(8) + 2;
  const y = rnd(8) + 2;
  if (x === y || gcd(x, y) !== 1) return false;
  const a = g * x;
  const b = g * y;
  const l = g * x * y;
  return add('aptitude', `What is the LCM of ${a} and ${b}?`, l, [l + g, l * 2, a * b, l + 2 * g], `LCM = ${g} x ${x} x ${y} = ${l}.`);
});

gen(14, () => {
  const s = rnd(20) + 2;
  const d = rnd(9) + 2;
  const t = [0, 1, 2, 3].map((i) => s + i * d);
  const a = s + 4 * d;
  return add('reasoning', `Find the next number: ${t.join(', ')}, ?`, a, [a + 1, a - 1, a + d, a + 2], `The difference is ${d} each time, so ${s + 3 * d} + ${d} = ${a}.`);
});

gen(8, () => {
  const s = rnd(5) + 1;
  const r = rnd(3) + 2;
  const t = [0, 1, 2, 3].map((i) => s * Math.pow(r, i));
  const a = s * Math.pow(r, 4);
  return add('reasoning', `Find the next number: ${t.join(', ')}, ?`, a, [a + r, a - r, a + 1, a + 2 * r], `Each number is multiplied by ${r}, so the next is ${t[3]} x ${r} = ${a}.`);
});

gen(10, () => {
  const m = rnd(5) + 1;
  const k = rnd(9) + 1;
  const t = [0, 1, 2, 3].map((i) => (m + i) * (m + i) + k);
  const a = (m + 4) * (m + 4) + k;
  return add('reasoning', `Find the next number: ${t.join(', ')}, ?`, a, [a + 2, a - 2, a + 4, a + 1], `The terms are n^2 + ${k} for n = ${m}, ${m + 1}, ... so the next is ${(m + 4) * (m + 4)} + ${k} = ${a}.`);
});

const shift = (w, k) => w.split('').map((c) => String.fromCharCode(((c.charCodeAt(0) - 65 + k + 26) % 26) + 65)).join('');
gen(14, () => {
  const w = pick(['TABLE', 'CHAIR', 'PLANT', 'MOUSE', 'RIVER', 'CLOUD', 'HOUSE', 'BRAVE', 'STONE', 'LIGHT', 'PAPER', 'TRAIN', 'WATER', 'GLASS', 'FLOOR', 'SHEEP', 'QUIET', 'NORTH']);
  const k = rnd(3) + 1;
  return add('reasoning', `If each letter is moved ${k} step${k > 1 ? 's' : ''} forward in the alphabet, how is ${w} coded?`, shift(w, k), [shift(w, k + 1), shift(w, k + 2), shift(w, -k), shift(w, k - 1)], `Move every letter ${k} step${k > 1 ? 's' : ''} forward: ${w} becomes ${shift(w, k)}.`);
});

gen(10, () => {
  const N = rnd(31) + 30;
  const r = rnd(23) + 3;
  const a = N - r + 1;
  return add('reasoning', `In a class of ${N}, Meena is ranked ${r} from the top. What is her rank from the bottom?`, a, [a - 1, a + 1, a + 2, a - 2], `Rank from bottom = ${N} - ${r} + 1 = ${a}.`);
});

module.exports = out;