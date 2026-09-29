import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Companies() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [list, setList] = useState(null);

  useEffect(() => {
    api('/companies').then((d) => setList(d.companies)).catch(() => nav('/login'));
  }, [nav]);

  if (!list) return <p>...</p>;

  return (
    <div>
      <div className="card">
        <h2>{t('companyPrep')}</h2>
        <p className="muted">{t('companyIntro')}</p>
        <p className="muted small">{t('disclaimerCompany')}</p>
      </div>
      {list.map((c) => (
        <Link key={c.id} to={'/companies/' + c.id} className="card subj">
          <div className="subjhead">
            <strong>{c.name}</strong>
            <span className={'badge ' + c.type}>{t('type_' + c.type)}</span>
          </div>
          <p className="muted small">
            {c.best ? t('bestScore') + ': ' + c.best.score + ' / ' + c.best.total : t('notAttempted')}
          </p>
        </Link>
      ))}
    </div>
  );
}