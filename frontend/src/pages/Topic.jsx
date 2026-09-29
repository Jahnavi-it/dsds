import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Topic() {
  const { subject, idx } = useParams();
  const { t } = useTranslation();
  const nav = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    api('/learn/subjects/' + subject + '/topics/' + idx).then(setData).catch(() => nav('/learn'));
  }, [subject, idx, nav]);

  if (!data) return <p>...</p>;

  const yt = (extra) =>
    'https://www.youtube.com/results?search_query=' + encodeURIComponent(data.title + ' ' + extra);

  const toggle = async () => {
    const r = await api('/learn/complete', {
      method: 'POST',
      body: { subject, topic: Number(idx), done: !data.done }
    });
    setData({ ...data, done: r.done });
  };

  const download = () => {
    const text = data.title + '\n\n' + data.notes.map((n, i) => (i + 1) + '. ' + n).join('\n') + '\n';
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = data.title.replace(/[^a-z0-9]+/gi, '-') + '.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const hasNext = Number(idx) + 1 < data.total;

  return (
    <div>
      <div className="card">
        <Link to={'/learn/' + subject}>&larr; {t('back')}</Link>
        <h2>{data.title}</h2>
        <div className="tag">{t('cat_' + subject)}</div>
        {data.done && <span className="lvl strong"> ✓ {t('completedLabel')}</span>}
      </div>

      <div className="card">
        <h3>{t('notes')}</h3>
        <ol className="notes">
          {data.notes.map((n, i) => <li key={i}>{n}</li>)}
        </ol>
        <button className="secondary wide" onClick={download}>{t('downloadNotes')}</button>
      </div>

      <div className="card">
        <h3>{t('videos')}</h3>
        <div className="stack">
          <a className="secondary linkbtn" href={yt('placement preparation')} target="_blank" rel="noreferrer">▶ {t('watchEn')}</a>
          <a className="secondary linkbtn" href={yt('in Telugu')} target="_blank" rel="noreferrer">▶ {t('watchTe')}</a>
          <a className="secondary linkbtn" href={yt('in Hindi')} target="_blank" rel="noreferrer">▶ {t('watchHi')}</a>
        </div>
      </div>

      <button className="primary wide" onClick={toggle}>{data.done ? t('markUndone') : t('markDone')}</button>
      {hasNext && (
        <Link to={'/learn/' + subject + '/' + (Number(idx) + 1)} className="secondary wide linkbtn">{t('next')} &rarr;</Link>
      )}
    </div>
  );
}