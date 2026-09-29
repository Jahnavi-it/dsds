import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Learn() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    api('/learn/subjects').then((d) => setSubjects(d.subjects)).catch(() => nav('/login'));
  }, [nav]);

  if (!subjects) return <p>...</p>;

  return (
    <div>
      <div className="card">
        <h2>{t('learningHub')}</h2>
        <p className="muted">{t('learnIntro')}</p>
      </div>
      {subjects.map((s) => (
        <Link key={s.id} to={'/learn/' + s.id} className="card subj">
          <div className="subjhead">
            <span className="subjicon">{s.icon}</span>
            <strong>{t('cat_' + s.id)}</strong>
            <span className="muted">{s.done} / {s.total} {t('topicsDone')}</span>
          </div>
          <div className="bar"><div className="fill strong" style={{ width: (s.done / s.total) * 100 + '%' }} /></div>
        </Link>
      ))}
    </div>
  );
}