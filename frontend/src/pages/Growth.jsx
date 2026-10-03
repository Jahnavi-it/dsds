import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

const pctOf = (cats, part) => {
  const c = cats.find((x) => String(x.category).toLowerCase().includes(part));
  return c ? c.percent : null;
};
const PATH = ['aptitude', 'reasoning', 'verbal', 'dsa', 'dbms', 'os', 'cn', 'web'];

export default function Growth() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [pp, setPp] = useState(null);
  const [prog, setProg] = useState(null);
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(false);
  const [sims, setSims] = useState([]);

  useEffect(() => {
    Promise.all([
      api('/passport').catch(() => null),
      api('/progress').catch(() => null),
      api('/assessment/result').then((d) => d.result).catch(() => null),
    ]).then(([a, b, c]) => {
      if (!a) { nav('/login'); return; }
      setPp(a); setProg(b); setResult(c); setReady(true);
    });
  }, [nav]);

  useEffect(() => {
    api('/simulator/history').then((d) => setSims(d.history || [])).catch(() => {});
  }, []);

  if (!ready) return <p>...</p>;

  const part = (k) => (pp.parts || []).find((p) => p.key === k) || { score: 0, max: 1 };
  const pct = (k) => Math.round((part(k).score / part(k).max) * 100);
  const cats = (result && result.categories) || [];
  const mocks = prog && Array.isArray(prog.mocks)
    ? [...prog.mocks].reverse().map((m) => ({ id: m.id, company: m.company, p: Math.round((m.score * 100) / (m.total || 1)) }))
    : [];
  const change = mocks.length >= 2 ? mocks[mocks.length - 1].p - mocks[0].p : 0;
  const certs = (pp.certs || []).filter((c) => c.code).length;

  const ach = [
    ['achFirst', 'First assessment', part('assessment').score > 0],
    ['achMock', 'Mock test 60%+', part('mock').score >= 12],
    ['achInterview', 'Practiced an interview', part('tech').score > 0 || part('hr').score > 0],
    ['achCoding', '10 coding problems', part('coding').score >= 10],
    ['achStreak', '7 active days', part('activity').score >= 1.75],
    ['achResume', 'Resume built', part('resume').score >= 5],
    ['achImproved', 'Improved mock score', change > 0],
    ['ach50', '50% readiness', pp.readiness >= 50],
    ['ach70', 'Placement ready (70%)', pp.readiness >= 70],
    ['achCert', 'Certificate earned', certs > 0],
  ];
  const unlocked = ach.filter((a) => a[2]).length;

  const steps = PATH.map((k) => ({ k, p: pctOf(cats, k) }));
  const label = (k) => t('cat_' + k, { defaultValue: k === 'web' ? 'Web Development' : k });

  return (
    <div>
      <h2>{t('growthTitle', { defaultValue: 'My growth' })}</h2>
      {sims.length > 0 && (
        <div className="card">
          <h3>Placement simulator history</h3>
          {sims.map((s) => (
            <div key={s.id} className="rowhead row"><span>{s.company}</span><span>{s.overall}% | {s.cleared}/{s.totalRounds} rounds</span></div>
          ))}
          {sims.length >= 2 && <p><strong>{sims[0].overall - sims[sims.length - 1].overall >= 0 ? 'Improved by +' : 'Changed by '}{sims[0].overall - sims[sims.length - 1].overall}% since your first attempt here</strong></p>}
        </div>
      )}

      <div className="card">
        <h3>{t('achievements', { defaultValue: 'Achievements' })} ({unlocked}/{ach.length})</h3>
        <div className="badges">
          {ach.map((a) => (
            <div key={a[0]} className={'badge' + (a[2] ? ' on' : '')}>{a[2] ? '\u2713 ' : '\uD83D\uDD12 '}{t(a[0], { defaultValue: a[1] })}</div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>{t('progressHistory', { defaultValue: 'Mock test progress' })}</h3>
        {mocks.length === 0 && <p className="muted">{t('noMocks', { defaultValue: 'No mock tests yet.' })}</p>}
        {mocks.map((m, i) => (
          <div key={m.id || i} className="row">
            <div className="rowhead"><span>{t('mockN', { n: i + 1, defaultValue: 'Mock {{n}}' })}</span><span>{m.p}%</span></div>
            <div className="bar"><div style={{ width: m.p + '%', height: '100%', borderRadius: 'inherit', background: '#3b5bdb' }} /></div>
          </div>
        ))}
        {mocks.length >= 2 && <p><strong>{change >= 0 ? t('improvedBy', { n: change, defaultValue: 'Your score changed by +{{n}}%' }) : t('droppedBy', { n: change, defaultValue: 'Your score changed by {{n}}%' })}</strong></p>}
      </div>

      <div className="card">
        <h3>{t('interviewReadiness', { defaultValue: 'Interview readiness' })}</h3>
        {[['Technical', pct('tech')], ['HR', pct('hr')], ['Communication', pctOf(cats, 'communication')]].map((r) => (
          <div key={r[0]} className="row">
            <div className="rowhead"><span>{r[0]}</span><span>{r[1] === null ? '--' : r[1] + '%'}</span></div>
            <div className="bar"><div style={{ width: (r[1] || 0) + '%', height: '100%', borderRadius: 'inherit', background: '#3b5bdb' }} /></div>
          </div>
        ))}
        <Link to="/interview" className="actionbtn">{t('practiceInterview', { defaultValue: 'Practice interview' })}</Link>
      </div>

      <div className="card">
        <h3>{t('learningPath', { defaultValue: 'Learning path' })}</h3>
        {steps.map((s, i) => {
          const prev = i > 0 ? steps[i - 1] : null;
          const locked = prev && prev.p !== null && prev.p < 50;
          return (
            <div key={s.k} className={'missiontask' + (locked ? ' done' : '')}>
              <span className="missiontext">{i + 1}. {label(s.k)} {s.p === null ? '' : '(' + s.p + '%)'}</span>
              {locked
                ? <span className="muted small">{'\uD83D\uDD12 '}{t('reachFirst', { name: label(prev.k), defaultValue: 'Reach 50% in {{name}} first' })}</span>
                : <Link to={s.k === 'web' ? '/learn' : '/learn/' + s.k} className="actionbtn">{t('actLearn', { defaultValue: 'Learn' })}</Link>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
