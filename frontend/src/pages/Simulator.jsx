import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';
import { useProctor, ProctorPanel } from '../Proctor.jsx';

const pctOf = (cats, part) => {
  const c = cats.find((x) => String(x.category).toLowerCase().includes(part));
  return c ? c.percent : null;
};

const bar = (v, ok) => (
  <div className="bar"><div style={{ width: (v || 0) + '%', height: '100%', borderRadius: 'inherit', background: ok ? '#2b8a3e' : '#c92a2a' }} /></div>
);

export default function Simulator() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [cid, setCid] = useState('');
  const [pp, setPp] = useState(null);
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState('home');
  const [session, setSession] = useState(null);
  const [ri, setRi] = useState(0);
  const [answers, setAnswers] = useState({});
  const [deadline, setDeadline] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [out, setOut] = useState(null);
  const [proctored, setProctored] = useState(true);
  const [resumable, setResumable] = useState(null);
  const finishRef = useRef(null);
  const proctor = useProctor({ max: 3, onLimit: () => { if (finishRef.current) finishRef.current(); } });

  useEffect(() => {
    Promise.all([
      api('/companies').then((d) => d.companies).catch(() => null),
      api('/passport').catch(() => null),
      api('/assessment/result').then((d) => d.result).catch(() => null),
    ]).then(([c, p, r]) => {
      if (!c || !p) { nav('/login'); return; }
      setCompanies(c); setCid(c[0] ? c[0].id : ''); setPp(p); setResult(r); setReady(true);
    });
  }, [nav]);

  useEffect(() => {
    if (phase !== 'running') return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === 'running' && deadline && now >= deadline) goNext();
  }, [now]);

  useEffect(() => {
    api('/simulator/active').then((d) => { if (d && d.session) setResumable(d); }).catch(() => {});
  }, []);

  const resume = () => {
    const d = resumable;
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('simAns' + d.session.sessionId) || '{}'); } catch (e) { saved = {}; }
    setSession(d.session); setAnswers(saved); setRi(d.roundIndex); setOut(null);
    setDeadline(Date.now() + d.roundSecondsLeft * 1000);
    setNow(Date.now()); setResumable(null); setPhase('running');
  };

  const start = async () => {
    setErr(''); setBusy(true);
    if (proctored) {
      const ok = await proctor.start();
      if (!ok) { setErr('Camera permission was not given. Allow the camera, or turn off proctored mode.'); setBusy(false); return; }
    }
    try {
      const d = await api('/simulator/start?company=' + encodeURIComponent(cid));
      setSession(d); setAnswers({}); setRi(0); setOut(null);
      setDeadline(Date.now() + d.rounds[0].minutes * 60000);
      setNow(Date.now());
      setPhase('running');
    } catch (e) { setErr(e.message); proctor.stop(); }
    setBusy(false);
  };

  const finish = async () => {
    setBusy(true);
    try {
      const d = await api('/simulator/submit', { method: 'POST', body: { sessionId: session.sessionId, answers: answers } });
      proctor.report('simulator', session.sessionId); setOut(d); setPhase('result'); proctor.stop();
    } catch (e) { setErr(e.message); proctor.stop(); }
    setBusy(false);
  };

  finishRef.current = finish;

  const goNext = () => {
    if (!session || busy) return;
    if (ri < session.rounds.length - 1) {
      setRi(ri + 1);
      setDeadline(Date.now() + session.rounds[ri + 1].minutes * 60000);
      setNow(Date.now());
      window.scrollTo(0, 0);
    } else {
      setDeadline(0);
      finish();
    }
  };

  if (!ready) return <p>...</p>;

  const part = (k) => (pp.parts || []).find((p) => p.key === k) || { score: 0, max: 1 };
  const pct = (k) => Math.round((part(k).score / part(k).max) * 100);

  // ---------- Running ----------
  if (phase === 'running' && session) {
    const rd = session.rounds[ri];
    const last = ri === session.rounds.length - 1;
    const left = Math.max(0, Math.round((deadline - now) / 1000));
    const mm = Math.floor(left / 60);
    const ss = String(left % 60).padStart(2, '0');
    return (
      <div>
        <h2>{session.company}: {t('simRound', { n: ri + 1, defaultValue: 'Round {{n}}' })} / {session.rounds.length} - {rd.name}</h2>
        <div className="card">
          <strong>{t('simTimeLeft', { defaultValue: 'Time left' })}: {mm}:{ss}</strong>
          <ProctorPanel p={proctor} />
          <p className="muted small">{t('simAutoNote', { defaultValue: 'When time ends, this round is submitted automatically and the next one starts.' })}</p>
        </div>
        {rd.questions.map((q, n) => (
          <div className="card q" key={q.i}>
            <p className="qtext">{n + 1}. {q.question}</p>
            {q.options.map((o, oi) => (
              <label key={oi} style={{ display: 'block', margin: '6px 0', cursor: 'pointer' }}>
                <input type="radio" name={'q' + q.i} checked={answers[q.i] === oi} onChange={() => { const na = { ...answers, [q.i]: oi }; setAnswers(na); try { localStorage.setItem('simAns' + session.sessionId, JSON.stringify(na)); } catch (e) { /* ignore */ } }} /> {o}
              </label>
            ))}
          </div>
        ))}
        {err && <p style={{ color: '#c92a2a' }}>{err}</p>}
        <button className="primary wide" onClick={goNext} disabled={busy}>
          {busy ? '...' : last ? t('simSubmit', { defaultValue: 'Submit simulation' }) : t('simNextRound', { defaultValue: 'Submit round and continue' })}
        </button>
      </div>
    );
  }

  // ---------- Result ----------
  if (phase === 'result' && out) {
    const passMark = out.passMark;
    const all = out.rounds.map((r) => ({ name: r.name, v: r.percent }))
      .concat([{ name: 'Coding', v: pct('coding') }, { name: 'HR interview', v: pct('hr') }]);
    const clearedN = all.filter((r) => r.v >= passMark).length;
    const overall = Math.round(all.reduce((s, r) => s + r.v, 0) / all.length);
    const weak = all.filter((r) => r.v < passMark).map((r) => r.name);
    return (
      <div>
        <h2>{t('simReport', { defaultValue: 'Simulation report' })}: {session ? session.company : ''}</h2>
        {proctor.limitHit && <p style={{ color: '#c92a2a' }}>Auto-submitted: too many proctoring violations (tab switch, leaving full screen or camera off).</p>}
        <div className="card">
          {all.map((r, i) => (
            <div key={r.name} className="row">
              <div className="rowhead">
                <span>{t('simRound', { n: i + 1, defaultValue: 'Round {{n}}' })}: {r.name}</span>
                <span>{r.v + '% ' + (r.v >= passMark ? '\u2713' : '\u2717')}</span>
              </div>
              {bar(r.v, r.v >= passMark)}
            </div>
          ))}
          <p><strong>{t('simOverall', { defaultValue: 'Overall' })}: {overall}%</strong> | {t('simCleared', { c: clearedN, n: all.length, defaultValue: 'Cleared {{c}}/{{n}} rounds' })}</p>
          <p className="muted small">{t('simNote', { pass: passMark, defaultValue: 'Clearing a round needs {{pass}}%.' })} {t('simCodingNote', { defaultValue: 'Coding and HR scores come from your practice in those sections.' })}</p>
          {weak.length > 0 && (
            <div className="nextaction">
              <div className="muted small">{t('simNeeds', { defaultValue: 'Needs improvement' })}</div>
              <strong>{weak.join(', ')}</strong>
            </div>
          )}
        </div>
        {out.review.length > 0 && (
          <div className="card">
            <p>{out.review.length} {t('simWrongSaved', { defaultValue: 'wrong answers were saved to your Mistake book.' })}</p>
            <Link to="/mistakes" className="actionbtn">{t('mistakeBook', { defaultValue: 'Mistake book' })}</Link>
          </div>
        )}
        <button className="primary wide" onClick={() => { setPhase('home'); setSession(null); }}>{t('simTryAgain', { defaultValue: 'Back to simulator' })}</button>
      </div>
    );
  }

  // ---------- Home ----------
  const company = companies.find((c) => c.id === cid) || {};
  const pass = company.type === 'product' ? 70 : 60;
  const cats = (result && result.categories) || [];
  const techs = ['dsa', 'dbms', 'os', 'cn'].map((k) => pctOf(cats, k)).filter((v) => v !== null);
  const tech = techs.length ? Math.round(techs.reduce((s, v) => s + v, 0) / techs.length) : null;

  const rounds = [
    { id: 'apt', name: 'Aptitude', v: pctOf(cats, 'aptitude'), to: '/learn/aptitude' },
    { id: 'rea', name: 'Reasoning', v: pctOf(cats, 'reasoning'), to: '/learn/reasoning' },
    { id: 'tec', name: 'Technical MCQs', v: tech, to: '/learn' },
    { id: 'cod', name: 'Coding', v: pct('coding'), to: '/coding' },
    { id: 'hr', name: 'HR interview', v: pct('hr'), to: '/interview' },
  ];
  const cleared = rounds.filter((r) => r.v !== null && r.v >= pass);
  const known = rounds.filter((r) => r.v !== null);
  const overall = known.length ? Math.round(known.reduce((s, r) => s + r.v, 0) / known.length) : 0;
  const needs = rounds.filter((r) => r.v === null || r.v < pass);
  const worst = [...rounds].sort((a, b) => (a.v === null ? -1 : a.v) - (b.v === null ? -1 : b.v))[0];

  return (
    <div>
      <h2>{t('simTitle', { defaultValue: 'Placement simulator' })}</h2>
      {resumable && (
        <div className="card">
          <p><strong>You have an unfinished simulation ({resumable.session.company}).</strong></p>
          <p className="muted small">Time is counted from when you started, so the clock kept running. Camera proctoring is not restarted on resume.</p>
          <button className="primary wide" onClick={resume}>Resume simulation</button>
        </div>
      )}
      <div className="card">
        <label>{t('simTarget', { defaultValue: 'Target company' })}</label>
        <select value={cid} onChange={(e) => setCid(e.target.value)}>
          {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <p className="muted small">{t('simIntro', { pass: pass, defaultValue: 'Real test: Aptitude (8 Qs), Reasoning (8 Qs), Technical (12 Qs), each with its own timer. Clearing a round needs {{pass}}%.' })}</p>
        {err && <p style={{ color: '#c92a2a' }}>{err}</p>}
        <label className="small muted" style={{ display: 'block', margin: '10px 0' }}>
          <input type="checkbox" checked={proctored} onChange={(e) => setProctored(e.target.checked)} style={{ width: 'auto' }} /> Proctored mode (camera + full screen + tab-switch warnings)
        </label>
        <button className="primary wide" onClick={start} disabled={busy || !cid}>{busy ? '...' : t('simStart', { defaultValue: 'Start simulation' })}</button>
      </div>

      <div className="card">
        <h3>{t('simCurrent', { defaultValue: 'Your current readiness' })}: {company.name}</h3>
        {rounds.map((r, i) => (
          <div key={r.id} className="row">
            <div className="rowhead">
              <span>{t('simRound', { n: i + 1, defaultValue: 'Round {{n}}' })}: {r.name}</span>
              <span>{r.v === null ? t('matrixNotAssessed', { defaultValue: 'Not assessed' }) : r.v + '% ' + (r.v >= pass ? '\u2713' : '\u2717')}</span>
            </div>
            {bar(r.v, r.v !== null && r.v >= pass)}
          </div>
        ))}
        <p><strong>{t('simOverall', { defaultValue: 'Overall' })}: {overall}%</strong> | {t('simCleared', { c: cleared.length, n: rounds.length, defaultValue: 'Cleared {{c}}/{{n}} rounds' })}</p>
        {needs.length > 0 && (
          <div className="nextaction">
            <div className="muted small">{t('simNeeds', { defaultValue: 'Needs improvement' })}</div>
            <strong>{needs.map((r) => r.name).join(', ')}</strong>
            <div><Link to={worst.to} className="actionbtn">{t('simNext', { defaultValue: 'Recommended next step' })}: {worst.name}</Link></div>
          </div>
        )}
      </div>
    </div>
  );
}
