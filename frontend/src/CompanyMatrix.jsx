import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from './api.js';

export default function CompanyMatrix({ company }) {
  const { t } = useTranslation();
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    api('/assessment/result').then((d) => setResult(d.result)).catch(() => setResult(null));
  }, []);

  const focus = (company && company.focus) || [];
  if (!focus.length || result === undefined) return null;

  const cats = (result && result.categories) || [];
  const rows = focus.map((f) => {
    const c = cats.find((x) => x.category === f);
    return { key: f, percent: c ? c.percent : null, level: c ? c.level : '' };
  });
  const known = rows.filter((r) => r.percent !== null);
  const avg = known.length ? Math.round(known.reduce((s, r) => s + r.percent, 0) / known.length) : null;
  const gaps = rows.filter((r) => r.percent !== null && r.percent < 60);
  const label = (k) => t('cat_' + k, { defaultValue: k });

  return (
    <div className="card">
      <h3>{t('matrixTitle', { name: company.name, defaultValue: '{{name}} readiness matrix' })}{avg !== null ? ' (' + avg + '%)' : ''}</h3>
      {rows.map((r) => (
        <div key={r.key} className="row">
          <div className="rowhead">
            <span>{label(r.key)}</span>
            {r.percent === null
              ? <span className="muted small">{t('matrixNotAssessed', { defaultValue: 'Not assessed' })}</span>
              : <span className={'lvl ' + r.level}>{r.percent}%</span>}
          </div>
          <div className="bar">{r.percent !== null && <div className={'fill ' + r.level} style={{ width: r.percent + '%' }} />}</div>
        </div>
      ))}
      {result === null && <p className="muted small">{t('noAssessmentYet')}</p>}
      {gaps.length > 0 && (
        <div className="nextaction">
          <div className="muted small">{t('matrixGap', { defaultValue: 'Your preparation gap' })}</div>
          <strong>{gaps.map((g) => label(g.key)).join(' + ')}</strong>
          <div className="actionlinks">
            {gaps.map((g) => (
              <Link key={g.key} to={'/learn/' + g.key} className="actionbtn">{t('actLearn', { defaultValue: 'Learn' })}: {label(g.key)}</Link>
            ))}
            <Link to={'/companies/' + company.id + '/practice'} className="actionbtn">{t('matrixPrepare', { name: company.name, defaultValue: 'Prepare for {{name}}' })}</Link>
          </div>
        </div>
      )}
    </div>
  );
}
