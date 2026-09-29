import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Subject() {
  const { subject } = useParams();
  const { t } = useTranslation();
  const nav = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    api('/learn/subjects/' + subject).then(setData).catch(() => nav('/learn'));
  }, [subject, nav]);

  if (!data) return <p>...</p>;

  return (
    <div>
      <div className="card">
        <Link to="/learn">&larr; {t('back')}</Link>
        <h2>{data.icon} {t('cat_' + data.id)}</h2>
        <p className="muted">{t('topics')}</p>
      </div>
      {data.topics.map((tp) => (
        <Link key={tp.index} to={'/learn/' + data.id + '/' + tp.index} className="card subj">
          <div className="subjhead">
            <span className={tp.done ? 'tick done' : 'tick'}>{tp.done ? '✓' : tp.index + 1}</span>
            <strong>{tp.title}</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}