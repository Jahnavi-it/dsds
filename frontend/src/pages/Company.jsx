import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CompanyMatrix from '../CompanyMatrix.jsx';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Company() {
  const { id } = useParams();
  const { t } = useTranslation();
  const nav = useNavigate();
  const [c, setC] = useState(null);

  useEffect(() => {
    api('/companies/' + id).then(setC).catch(() => nav('/companies'));
  }, [id, nav]);

  if (!c) return <p>...</p>;

  return (
    <div>
      <div className="card">
        <Link to="/companies">&larr; {t('back')}</Link>
        <h2>{c.name}</h2>
      <CompanyMatrix company={c} />
        <span className={'badge ' + c.type}>{t('type_' + c.type)}</span>
        <p className="muted small">{t('disclaimerCompany')}</p>
      </div>

      <div className="card">
        <h3>{t('selectionRounds')}</h3>
        {c.rounds.map((r, i) => (
          <div key={i} className="step">
            <div className="stepnum">{i + 1}</div>
            <div>
              <strong>{r.name}</strong>
              <div className="muted small">{r.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>{t('focusSubjects')}</h3>
        <div className="chips">
          {c.focus.map((f) => (
            <Link key={f} to={'/learn/' + f} className="tag big">{t('cat_' + f)}</Link>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>{t('prepTips')}</h3>
        <ul className="notes">
          {c.tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </div>

      <Link to={'/companies/' + c.id + '/practice'} className="primary wide linkbtn">
        {t('startPractice')} ({c.questionCount})
      </Link>
      {c.best && <p className="muted center">{t('bestScore')}: {c.best.score} / {c.best.total}</p>}
    </div>
  );
}