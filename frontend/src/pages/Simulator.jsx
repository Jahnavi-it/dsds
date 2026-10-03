import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

const pctOf = (cats, part) => {
  const c = cats.find((x) => String(x.category).toLowerCase().includes(part));
  return c ? c.percent : null;
};

export default function Simulator() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [cid, setCid] = useState('');
  const [pp, setPp] = useState(null);
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(false);

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

  if (!ready) return <p>...</p>;

  const company = companies.find((c) => c.id === cid) || {};
  const pass = company.type === 'product' ? 70 : 60;
  const cats = (result && result.categories) || [];
  const part = (k) => (pp.parts || []).find((p) => p.key === k) || { score: 0, max: 1 };
  const pct = (k) => Math.round((part(k).score / part(k).max) * 100);
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
      <div className="card">
        <label>{t('simTarget', { defaultValue: 'Target company' })}</label>
        <select value={cid} onChange={(e) => setCid(e.target.value)}>
          {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <p className="muted small">{t('simNote', { pass: pass, defaultValue: 'Based on your assessment, coding and interview scores. Clearing a round needs {{pass}}%.' })}</p>
      </div>

      <div className="card">
        <h3>{t('simReport', { defaultValue: 'Simulation report' })}: {company.name}</h3>
        {rounds.map((r, i) => (
          <div key={r.id} className="row">
            <div className="rowhead">
              <span>{t('simRound', { n: i + 1, defaultValue: 'Round {{n}}' })}: {r.name}</span>
              <span>{r.v === null ? t('matrixNotAssessed', { defaultValue: 'Not assessed' }) : r.v + '% ' + (r.v >= pass ? '\u2713' : '\u2717')}</span>
            </div>
            <div className="bar"><div style={{ width: (r.v || 0) + '%', height: '100%', borderRadius: 'inherit', background: r.v !== null && r.v >= pass ? '#2b8a3e' : '#c92a2a' }} /></div>
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
