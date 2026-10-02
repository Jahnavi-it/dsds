import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

const LABELS = { assessment: 'Assessment', mock: 'Mock test', tech: 'Technical interview', hr: 'HR interview', coding: 'Coding', activity: 'Activity', resume: 'Resume' };

export default function Passport() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [d, setD] = useState(null);
  const [error, setError] = useState('');

  const load = () => api('/passport').then(setD).catch(() => nav('/login'));
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const claim = async (type) => {
    setError('');
    try { await api('/certificates/claim', { method: 'POST', body: { type } }); load(); }
    catch (e) { setError(e.message); }
  };

  if (!d) return <div className="card">...</div>;
  return (
    <div>
      <div className="card">
        <h2>{t('passport', { defaultValue: 'Placement passport' })}</h2>
        <p className="muted">{d.user && [d.user.name, d.user.college, d.user.branch].filter(Boolean).join(' | ')}</p>
        <h3>{t('readiness', { defaultValue: 'Placement readiness' })}: {d.readiness}%</h3>
        <div className="bar"><div className="fill" style={{ width: d.readiness + '%' }} /></div>
        {d.parts.map((p) => (
          <div key={p.key} className="row">
            <div className="rowhead"><span>{LABELS[p.key] || p.key}</span><span>{p.score}/{p.max}</span></div>
            <div className="bar"><div className="fill" style={{ width: (p.score * 100 / p.max) + '%' }} /></div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>{t('certificates', { defaultValue: 'Certificates' })}</h3>
        {error && <p className="error">{error}</p>}
        {d.certs.map((c) => (
          <div key={c.type} className="row">
            <div className="rowhead"><span>{c.title}</span>
              {c.code ? <span className="tag">{c.code}</span> : <span className="muted small">{c.eligible ? 'Eligible' : 'Locked'}</span>}
            </div>
            <p className="small muted">{c.need}</p>
            {c.code
              ? <Link to={'/verify/' + c.code} className="small">{t('verifyLink', { defaultValue: 'Open verification page' })}</Link>
              : <button className="primary" disabled={!c.eligible} onClick={() => claim(c.type)}>{t('claim', { defaultValue: 'Claim certificate' })}</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
