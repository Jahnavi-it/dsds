import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

const tip = { margin: '6px 0 0', padding: '8px 10px', background: '#f4f6fc', borderRadius: 6, fontSize: 14, whiteSpace: 'pre-wrap' };

export default function Notes() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { id } = useParams();
  const [companies, setCompanies] = useState([]);
  const [n, setN] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setN(null);
    setError('');
    if (id) api('/notes/' + id).then(setN).catch((e) => setError(e.message));
    else api('/assessment/companies').then((d) => setCompanies(d.companies)).catch(() => nav('/login'));
    // eslint-disable-next-line
  }, [id]);

  if (!id) {
    return (
      <div className="card">
        <h2>{t('companyNotes', { defaultValue: 'Company notes' })}</h2>
        <p className="muted small">{t('notesIntro', { defaultValue: 'Questions reported by candidates in earlier interviews and tests, different for every company.' })}</p>
        <div className="chips">
          {companies.map((c) => <Link key={c.id} className="tag big" to={'/notes/' + c.id}>{c.name}</Link>)}
        </div>
      </div>
    );
  }
  if (error) return <div className="card"><Link to="/notes">{t('allCompanies', { defaultValue: 'All companies' })}</Link><p className="error">{error}</p></div>;
  if (!n) return <div className="card">...</div>;

  const reported = n.rounds.filter((r) => !r.practice);
  const practiceRounds = n.rounds.filter((r) => r.practice);
  const total = reported.reduce((x, r) => x + r.questions.length, 0);
  const practiceTotal = practiceRounds.reduce((x, r) => x + r.questions.length, 0);
  const src = (i) => n.sources[i - 1];

  return (
    <div>
      <div className="card">
        <h2>{n.name} - {t('notes', { defaultValue: 'Notes' })}</h2>
        <Link to="/notes">{t('allCompanies', { defaultValue: 'All companies' })}</Link>
        <p>{n.summary}</p>
        <p className="muted small">{total} {t('reportedQs', { defaultValue: 'questions reported by candidates' })} | {reported.length} {t('roundsLabel', { defaultValue: 'rounds' })}
          {practiceTotal > 0 && <> | {practiceTotal} {t('practiceQs', { defaultValue: 'practice questions with answers (aptitude, reasoning, verbal, coding)' })}</>}</p>
        <p className="muted small">{t('notesDisclaimer', { defaultValue: 'Questions change every year. Use these as practice material, not as a fixed paper.' })}</p>
        <p className="muted small">{t('practiceElsewhere', { defaultValue: 'Looking for MCQ practice for {{name}}? It is in Company prep.', name: n.name })} <Link to={'/companies/' + n.id}>{t('openCompanyPrep', { defaultValue: 'Open Company prep' })}</Link></p>
      </div>

      <div className="card">
        <h3>{t('focusFor', { defaultValue: 'Focus areas for {{name}}', name: n.name })}</h3>
        <ul className="notes">{n.prepFocus.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </div>

      {n.rounds.map((r, ri) => (
        <div key={ri} className="card">
          <h3>{r.name} {r.practice && <span className="tag lvl-medium">{t('practiceTag', { defaultValue: 'Practice' })}</span>}</h3>
          {r.note && <p className="muted">{r.note}</p>}
          {r.questions.map((q, qi) => (
            <details key={qi} className="row">
              <summary className="qtext" style={{ cursor: 'pointer' }}>
                {q.q}
                {q.s > 0 && src(q.s) && <sup className="small muted"> [{q.s}]</sup>}
              </summary>
              {q.a && <div style={tip}><strong>{t('howToAnswer', { defaultValue: 'Hint' })}:</strong> {q.a}</div>}
            </details>
          ))}
        </div>
      ))}

      <div className="card">
        <h3>{t('sourcesLabel', { defaultValue: 'Sources' })}</h3>
        <p className="muted small">{t('sourcesNote', { defaultValue: 'A candidate experience is a real account; a prep guide lists typical or sample questions. Numbers in square brackets point to these sources.' })}</p>
        <ol className="notes">
          {n.sources.map((s, i) => (
            <li key={i}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
              {' '}<span className="tag">{s.type === 'experience' ? t('srcExperience', { defaultValue: 'candidate experience' }) : t('srcGuide', { defaultValue: 'prep guide' })}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
