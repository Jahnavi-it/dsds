import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import '../landing.css';

// Put your own contact email here to show it in the Contact section (leave empty to hide it).
const CONTACT_EMAIL = '';
const REPO_URL = 'https://github.com/Jahnavi-it/dsds';

const ICONS = {
  target: 'M12 22a10 10 0 1 1 10-10M12 17a5 5 0 1 1 5-5M12 12l9-9M17 3h4v4',
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6M14 4l-4 16',
  chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
  star: 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5',
  mic: 'M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v1a7 7 0 0 1-14 0v-1M12 18v4',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h6',
  shield: 'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5zM9 12l2 2 4-4',
  bulb: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  link: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6',
  arrow: 'M5 12h14M13 6l6 6-6 6'
};

function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="lpLogo" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d="M5 43 5 5 17 5 33 28 33 5 44 5 44 43 32 43 16 20 16 43Z" fill="url(#lpLogo)" />
    </svg>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.lp-reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return undefined; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function CountUp({ value, suffix = '' }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (value == null) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(value); return undefined; }
    let raf;
    const run = () => {
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / 1200, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{value == null ? '-' : n.toLocaleString('en-IN')}{value == null ? '' : suffix}</span>;
}

function HeroArt({ stats }) {
  const [photo, setPhoto] = useState(true);
  return (
    <div className="lp-art" aria-hidden="true">
      <svg className="lp-towers" viewBox="0 0 640 560" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="tw1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4f8cff" /><stop offset="1" stopColor="#7c3aed" /></linearGradient>
          <linearGradient id="tw2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d4ed8" /><stop offset="1" stopColor="#0b1d5c" /></linearGradient>
          <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#93c5fd" stopOpacity=".55" /><stop offset="1" stopColor="#1e3a8a" stopOpacity=".85" /></linearGradient>
          <pattern id="win" width="22" height="26" patternUnits="userSpaceOnUse"><rect x="3" y="4" width="14" height="16" rx="2" fill="#dbeafe" opacity=".35" /></pattern>
          <radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#60a5fa" stopOpacity=".5" /><stop offset="1" stopColor="#60a5fa" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="330" cy="300" r="250" fill="url(#glow)" />
        <path d="M120 560V160l95 40 0 360Z" fill="url(#tw1)" opacity=".92" />
        <path d="M215 200l60-30v390h-60Z" fill="#3b2a9c" opacity=".7" />
        <rect x="430" y="60" width="92" height="500" fill="url(#tw2)" opacity=".95" />
        <rect x="430" y="60" width="92" height="500" fill="url(#win)" opacity=".5" />
        <rect x="360" y="330" width="280" height="230" rx="4" fill="url(#bld)" />
        <rect x="360" y="330" width="280" height="230" fill="url(#win)" />
        <rect x="330" y="400" width="160" height="160" rx="4" fill="#1e40af" opacity=".7" />
        <rect x="330" y="400" width="160" height="160" fill="url(#win)" opacity=".8" />
      </svg>
      {photo && <img className="lp-photo" src="/hero-student.png" alt="" onError={() => setPhoto(false)} />}
      <div className="lp-script">
        <span>Dream</span><span>Prepare</span><span>Achieve</span>
      </div>
      <div className="lp-float f1"><Icon name="mic" size={18} /><div><b>Mock interviews</b><small>every question shows its source</small></div></div>
      <div className="lp-float f2"><Icon name="book" size={18} /><div><b>Company notes</b><small>{stats && stats.companies ? stats.companies + ' companies' : 'top companies'}</small></div></div>
      <div className="lp-float f3"><Icon name="code" size={18} /><div><b>Coding practice</b><small>{stats && stats.coding ? stats.coding + ' problems, run tests' : 'run tests online'}</small></div></div>
    </div>
  );
}

const WHY = [
  { icon: 'target', cls: 'c1', title: 'Build Skills', text: 'Take a skill assessment, then learn subject by subject at your level.' },
  { icon: 'code', cls: 'c2', title: 'Practice & Improve', text: 'Coding problems, MCQs, proctored mock tests and mock interviews.' },
  { icon: 'chart', cls: 'c3', title: 'Track Progress', text: 'Daily streaks, a mistakes notebook and a readiness score.' },
  { icon: 'star', cls: 'c4', title: 'Get Placed', text: 'Company notes, resume builder and a verifiable placement passport.' }
];

const FEATURES = [
  { icon: 'bulb', title: 'Skill assessment', text: 'Find your level first, then get a roadmap built around your weak areas.' },
  { icon: 'book', title: 'Learn', text: 'Subject-wise topics in English, Telugu and Hindi, with practice after each one.' },
  { icon: 'link', title: 'Company notes with proof', text: 'Questions candidates reported for each company, with the source link next to every one.' },
  { icon: 'shield', title: 'Proctored mock tests', text: 'Timed tests with camera, full-screen and tab-switch monitoring, like a real online test.' },
  { icon: 'mic', title: 'Mock interviews', text: 'Technical and HR rounds you can answer by typing or speaking, with follow-up questions.' },
  { icon: 'code', title: 'Coding practice', text: 'Write code in the browser and run it against test cases.' },
  { icon: 'file', title: 'Resume builder', text: 'Build a clean resume and download it as a PDF.' },
  { icon: 'globe', title: 'Placement passport', text: 'A shareable record of your preparation that anyone can verify with a code.' }
];

export default function Landing() {
  const [stats, setStats] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lpStats')) || null; } catch (e) { return null; }
  });
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    api('/public/stats').then((d) => { setStats(d); try { localStorage.setItem('lpStats', JSON.stringify(d)); } catch (e) { /* ignore */ } }).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const mid = window.scrollY + window.innerHeight * 0.35;
      let cur = 'home';
      ['about', 'contact'].forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) cur = id;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    const el = id === 'home' ? document.body : document.getElementById(id);
    if (el) window.scrollTo({ top: id === 'home' ? 0 : el.offsetTop - 64, behavior: 'smooth' });
  };

  const nums = [
    { v: stats && stats.students, label: 'Registered students' },
    { v: stats && stats.companies, label: 'Companies covered' },
    { v: stats && stats.questions, label: 'Practice & reported questions' },
    { v: stats && stats.coding, label: 'Coding problems' }
  ].filter((n) => n.v > 0);

  return (
    <div className="lp">
      <nav className={'lp-nav' + (scrolled ? ' solid' : '')}>
        <a className="lp-logo" href="/" onClick={go('home')}><Logo /><span>NEXORA</span></a>
        <div className="lp-links">
          {[['home', 'Home'], ['about', 'About'], ['contact', 'Contact']].map(([id, label]) => (
            <a key={id} href={'#' + id} className={active === id ? 'on' : ''} onClick={go(id)}>{label}</a>
          ))}
        </div>
        <div className="lp-nav-btns">
          <Link className="lp-btn ghost" to="/login">Sign In</Link>
          <Link className="lp-btn solid" to="/register">Register</Link>
        </div>
      </nav>

      <header className="lp-hero" id="home">
        <div className="lp-hero-in">
          <div className="lp-copy">
            <div className="lp-eyebrow">Placement preparation platform</div>
            <h1>Your Journey.<br />Your Skills.<br /><span className="grad">Your Placement.</span></h1>
            <p>NEXORA is your all-in-one placement preparation platform designed to help you build skills, gain confidence and achieve your dream job.</p>
            <div className="lp-cta">
              <Link className="lp-btn solid big" to="/login">Sign In <Icon name="arrow" size={18} /></Link>
              <Link className="lp-btn ghost big" to="/register">Register <Icon name="arrow" size={18} /></Link>
            </div>
          </div>
          <HeroArt stats={stats} />
        </div>
      </header>

      <section className="lp-why" id="why">
        <div className="lp-why-in">
          <div className="lp-why-head lp-reveal">
            <div className="lp-eyebrow dark">Why NEXORA</div>
            <h2>Everything You Need for a Successful Placement</h2>
            <p>From learning to interviews, NEXORA gives you the right tools at every step of your journey.</p>
            <a className="lp-more" href="#about" onClick={go('about')}><Icon name="arrow" size={18} /> Explore More</a>
          </div>
          <div className="lp-why-grid">
            {WHY.map((w, i) => (
              <div key={w.title} className="lp-why-card lp-reveal" style={{ transitionDelay: i * 90 + 'ms' }}>
                <div className={'lp-ico ' + w.cls}><Icon name={w.icon} size={26} /></div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-stats">
        <div className="lp-stats-in" style={{ '--n': Math.max(nums.length, 1) }}>
          <div className="lp-stats-head">
            <div className="lp-eyebrow">Built for students</div>
            <h2>Building Tomorrow&apos;s Professionals</h2>
          </div>
          {nums.map((n) => (
            <div key={n.label} className="lp-stat">
              <b className="grad2"><CountUp value={n.v} /></b>
              <span>{n.label}</span>
            </div>
          ))}
          <div className="lp-quote">Your Dream Job<br />is Closer Than You Think</div>
        </div>
      </section>

      <section className="lp-about" id="about">
        <div className="lp-wrap">
          <div className="lp-eyebrow dark lp-reveal">About NEXORA</div>
          <h2 className="lp-reveal">One place for the whole placement journey</h2>
          <p className="lp-sub lp-reveal">NEXORA was built for students preparing for company placements. Every tool below is part of the platform today.</p>
          <div className="lp-feat-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="lp-feat lp-reveal" style={{ transitionDelay: (i % 4) * 80 + 'ms' }}>
                <div className="lp-feat-ico"><Icon name={f.icon} size={22} /></div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="lp-proof lp-reveal">
            <Icon name="link" size={22} />
            <p><b>Honest by design.</b> Company questions come from interview experiences that candidates shared publicly, and each one links to where it was reported. Questions change every year, so we call them practice material, not an official paper.</p>
          </div>
        </div>
      </section>

      <section className="lp-contact" id="contact">
        <div className="lp-wrap">
          <div className="lp-eyebrow">Contact</div>
          <h2>Questions or feedback?</h2>
          <p className="lp-sub">Tell us what would make NEXORA more useful for your preparation.</p>
          <div className="lp-contact-row">
            {CONTACT_EMAIL && <a className="lp-btn ghost big" href={'mailto:' + CONTACT_EMAIL}><Icon name="mail" size={18} /> {CONTACT_EMAIL}</a>}
            <a className="lp-btn ghost big" href={REPO_URL} target="_blank" rel="noopener noreferrer"><Icon name="code" size={18} /> Project on GitHub</a>
            <Link className="lp-btn solid big" to="/register">Start preparing <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>

      <footer className="lp-foot">
        <a className="lp-logo small" href="/" onClick={go('home')}><Logo size={26} /><span>NEXORA</span></a>
        <span>Your Journey. Your Skills. Your Placement.</span>
      </footer>
    </div>
  );
}
