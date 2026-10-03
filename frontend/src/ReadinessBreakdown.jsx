import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LINKS = {
  assessment: '/assessment', mock: '/mock', tech: '/interview', hr: '/interview',
  coding: '/coding', activity: '/learn', resume: '/resume',
};
const NAMES = {
  assessment: 'Assessment', mock: 'Mock test', tech: 'Technical interview', hr: 'HR interview',
  coding: 'Coding', activity: 'Activity', resume: 'Resume',
};

export default function ReadinessBreakdown({ pp }) {
  const { t } = useTranslation();
  if (!pp || !pp.parts) return null;
  const parts = pp.parts;
  const next = [...parts].sort((a, b) => (b.max - b.score) - (a.max - a.score))[0];
  const gain = next ? Math.round(next.max - next.score) : 0;
  const label = (k) => t('part_' + k, { defaultValue: NAMES[k] || k });

  return (
    <div className="card">
      <h3>{t('whyReadiness', { defaultValue: 'Why this readiness score?' })} ({pp.readiness}%)</h3>
      {parts.map((p) => (
        <div key={p.key} className="row">
          <div className="rowhead">
            <span>{label(p.key)}</span>
            <span>{p.score} / {p.max}</span>
          </div>
          <div className="bar"><div style={{ width: Math.min(100, (p.score / p.max) * 100) + '%', height: '100%', borderRadius: 'inherit', background: '#3b5bdb' }} /></div>
        </div>
      ))}
      {next && gain > 0 && (
        <div className="nextaction">
          <div className="muted small">{t('nextAction', { defaultValue: 'Next recommended action' })}</div>
          <strong>{label(next.key)}</strong>
          <span className="muted small"> | {t('potential', { n: gain, defaultValue: 'Up to +{{n}}% readiness' })}</span>
          <div><Link to={LINKS[next.key] || '/dashboard'} className="actionbtn">{t('goNow', { defaultValue: 'Start now' })}</Link></div>
        </div>
      )}
    </div>
  );
}
