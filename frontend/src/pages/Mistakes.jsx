import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Mistakes() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [list, setList] = useState(undefined);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api('/mistakes').then((d) => setList(d.mistakes)).catch(() => nav('/login'));
  }, [nav]);

  if (list === undefined) return <p>...</p>;

  const cats = [...new Set(list.map((m) => m.cat))];
  const shown = filter === 'all' ? list : list.filter((m) => m.cat === filter);

  return (
    <div>
      <h2>{t('mistakeBook', { defaultValue: 'Mistake book' })} ({list.length})</h2>
      {list.length === 0 && <div className="card"><p className="muted">{t('noMistakes', { defaultValue: 'No mistakes saved yet. Wrong answers from your mock tests appear here, and disappear once you answer them correctly.' })}</p></div>}
      {list.length > 0 && (
        <div className="filterrow">
          <button className={'filterbtn' + (filter === 'all' ? ' active' : '')} onClick={() => setFilter('all')}>{t('filterAll', { defaultValue: 'All' })}</button>
          {cats.map((c) => (
            <button key={c} className={'filterbtn' + (filter === c ? ' active' : '')} onClick={() => setFilter(c)}>{t('cat_' + c, { defaultValue: c })}</button>
          ))}
        </div>
      )}
      {shown.map((m) => (
        <div className="card q" key={m.id}>
          <div className="tag">{t('cat_' + m.cat, { defaultValue: m.cat })}</div>
          <p className="qtext">{m.question}</p>
          <p style={{ color: '#c92a2a', margin: '4px 0' }}>
            {t('yourAnswer')}: {m.chosen >= 0 ? m.options[m.chosen] : t('notAnswered')}
          </p>
          <p style={{ color: '#2b8a3e', margin: '4px 0' }}>{t('correctAnswer')}: {m.options[m.answer]}</p>
          {m.explanation && <p className="muted small">{m.explanation}</p>}
        </div>
      ))}
      {list.length > 0 && <Link to="/mock" className="primary wide linkbtn">{t('practiceMore', { defaultValue: 'Practice more in a mock test' })}</Link>}
    </div>
  );
}
