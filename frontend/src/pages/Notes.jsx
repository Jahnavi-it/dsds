import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Notes() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { id } = useParams();
  const [companies, setCompanies] = useState([]);
  const [n, setN] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setN(null);
    if (id) api('/notes/' + id).then(setN).catch((e) => setError(e.message));
    else api('/assessment/companies').then((d) => setCompanies(d.companies)).catch(() => nav('/login'));
    // eslint-disable-next-line
  }, [id]);

  if (!id) {
    return (
      <div className="card">
        <h2>{t('companyNotes', { defaultValue: 'Company notes' })}</h2>
        <div className="chips">
          {companies.map((c) => <Link key={c.id} className="tag big" to={'/notes/' + c.id}>{c.name}</Link>)}
        </div>
      </div>
    );
  }
  if (error) return <div className="card"><p className="error">{error}</p></div>;
  if (!n) return <div className="card">...</div>;

  const right = (q, i, o) => q.answer === i || q.answer === o;
  return (
    <div>
      <div className="card">
        <h2>{n.name} - {t('notes', { defaultValue: 'Notes' })}</h2>
        <Link to="/notes">{t('allCompanies', { defaultValue: 'All companies' })}</Link>
      </div>
      {n.subjects.map((s) => (
        <div key={s.id} className="card">
          <h3>{s.id}</h3>
          {s.topics.map((tp) => (
            <div key={tp.title}>
              <strong>{tp.title}</strong>
              <ul className="notes">{tp.notes.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      ))}
      {n.questions.length > 0 && (
        <div className="card">
          <h3>{t('practiceQs', { defaultValue: 'Practice questions' })}</h3>
          {n.questions.map((q, qi) => (
            <div key={qi} className="row">
              <p className="qtext">{qi + 1}. {q.question}</p>
              {(q.options || []).map((o, i) => <div key={i} className={'opt' + (right(q, i, o) ? ' correct' : '')}>{o}</div>)}
              {q.explanation && <div className="explain">{q.explanation}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
