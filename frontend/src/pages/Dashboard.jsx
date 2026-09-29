import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Dashboard() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    api('/me')
      .then((d) => setUser(d.user))
      .catch(() => {
        localStorage.removeItem('token');
        nav('/login');
      });
    api('/assessment/result')
      .then((d) => setResult(d.result))
      .catch(() => setResult(null));
  }, [nav]);

  if (!user) return <p>...</p>;

  return (
    <div>
      <div className="card">
        <h2>{t('welcome')}, {user.name}!</h2>
        <p className="muted">{t('dashboard')}</p>
        <p>{user.college} | {user.branch} | {t('year')} {user.year}</p>
        <div className="stack">
          <Link to="/assessment" className="primary wide linkbtn">{t('takeAssessment')}</Link>
          <Link to="/result" className="secondary wide linkbtn">{t('viewRoadmap')}</Link>
          <Link to="/learn" className="primary wide linkbtn">{t('openLearning')}</Link>
          <Link to="/companies" className="primary wide linkbtn">{t('companyPrep')}</Link>
          {user.role === 'admin' && <Link to="/admin" className="secondary wide linkbtn">{t('adminPanel')}</Link>}
          <Link to="/mock" className="primary wide linkbtn">{t('mockTest')}</Link>
          <Link to="/progress" className="secondary wide linkbtn">{t('progress')}</Link>
        </div>
      </div>

      <div className="card">
        <h3>{t('gapChart')}</h3>
        {result === undefined && <p>...</p>}
        {result === null && <p className="muted">{t('noAssessmentYet')}</p>}
        {result && result.categories.map((c) => (
          <div key={c.category} className="row">
            <div className="rowhead">
              <span>{t('cat_' + c.category)}</span>
              <span className={'lvl ' + c.level}>{c.percent}%</span>
            </div>
            <div className="bar"><div className={'fill ' + c.level} style={{ width: c.percent + '%' }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}