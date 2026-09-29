import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

const actionKey = { 'learn from basics': 'action_learn', practice: 'action_practice', revise: 'action_revise' };

export default function Result() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [data, setData] = useState(undefined);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(localStorage.getItem('target') || '');

  useEffect(() => {
    api('/assessment/companies').then((d) => setCompanies(d.companies)).catch(() => {});
  }, []);

  useEffect(() => {
    api('/assessment/roadmap?company=' + encodeURIComponent(company))
      .then((d) => setData(d))
      .catch(() => nav('/login'));
  }, [company, nav]);

  const choose = (e) => {
    setCompany(e.target.value);
    localStorage.setItem('target', e.target.value);
  };

  if (data === undefined) return <p>...</p>;
  if (data.empty) {
    return (
      <div className="card">
        <p>{t('noResult')}</p>
        <Link to="/assessment">{t('takeAssessment')}</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h2>{t('overall')}: {data.overall}%</h2>
        <div className="bar"><div className="fill" style={{ width: data.overall + '%' }} /></div>
        <p className="muted">{t('totalPlan')}: {data.totalWeeks} {t('weeks')}</p>
      </div>

      <div className="card">
        <h3>{t('skillGap')}</h3>
        {data.categories.map((c) => (
          <div key={c.category} className="row">
            <div className="rowhead">
              <span>{t('cat_' + c.category)}</span>
              <span className={'lvl ' + c.level}>{t('level_' + c.level)} ({c.percent}%)</span>
            </div>
            <div className="bar"><div className={'fill ' + c.level} style={{ width: c.percent + '%' }} /></div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>{t('roadmap')}</h3>
        <label className="muted small">{t('targetCompany')}</label>
        <select value={company} onChange={choose} style={{ width: '100%', margin: '6px 0 14px' }}>
          <option value="">{t('generalPlan')}</option>
          {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {data.roadmap.map((r, i) => (
          <div key={r.category} className="step">
            <div className="stepnum">{i + 1}</div>
            <div>
              <strong>{t('cat_' + r.category)}</strong>
              {r.priority && <span className="prio">{t('priority')}</span>}
              <span className={'lvl ' + r.level}> {t(actionKey[r.action])}</span>
              <div className="muted small">
                {t('week')} {r.startWeek}{r.endWeek > r.startWeek ? '-' + r.endWeek : ''} ({r.weeks} {t('weeks')})
              </div>
              <div className="muted small">{t('focusTopics')}: {r.focus.join(', ')}</div>
              {r.learn.length > 0 && (
                <div className="small">
                  {t('learnNow')}:{' '}
                  {r.learn.map((id) => (
                    <Link key={id} to={'/learn/' + id} style={{ marginRight: 10 }}>{t('cat_' + id)}</Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Link to="/assessment" className="primary wide linkbtn">{t('retake')}</Link>
    </div>
  );
}