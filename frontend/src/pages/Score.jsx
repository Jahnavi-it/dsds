import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

// Shown right after an assessment: only the score. Improvements are on the Roadmap page.
export default function Score() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [res, setRes] = useState(undefined);

  useEffect(() => {
    api('/assessment/result').then((d) => setRes(d.result)).catch(() => nav('/login'));
  }, [nav]);

  if (res === undefined) return <p>...</p>;
  if (!res) {
    return (
      <div className="card">
        <p>{t('noResult')}</p>
        <Link to="/assessment">{t('takeAssessment')}</Link>
      </div>
    );
  }

  const correct = res.categories.reduce((x, c) => x + c.correct, 0);
  const total = res.categories.reduce((x, c) => x + c.total, 0);

  return (
    <div>
      <div className="card">
        <h2>{t('score', { defaultValue: 'Score' })}: {correct} / {total} ({res.overall}%)</h2>
        <div className="bar"><div className="fill" style={{ width: res.overall + '%' }} /></div>
      </div>

      <div className="card">
        {res.categories.map((c) => (
          <div key={c.category} className="row">
            <div className="rowhead">
              <span>{t('cat_' + c.category)}</span>
              <span>{c.correct}/{c.total} ({c.percent}%)</span>
            </div>
            <div className="bar"><div className="fill" style={{ width: c.percent + '%' }} /></div>
          </div>
        ))}
      </div>

      <Link to="/assessment" className="primary wide linkbtn">{t('retake')}</Link>
      <Link to="/result" className="actionbtn" style={{ display: 'inline-block', marginTop: 10 }}>{t('viewRoadmap')}</Link>
    </div>
  );
}
