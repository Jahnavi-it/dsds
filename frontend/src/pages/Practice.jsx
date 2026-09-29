import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Practice() {
  const { id } = useParams();
  const { t } = useTranslation();
  const nav = useNavigate();
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => {
    setAnswers({});
    setResult(null);
    setError('');
    setBusy(false);
    api('/companies/' + id + '/questions').then(setData).catch(() => nav('/companies'));
  };

  useEffect(load, [id]);

  if (!data) return <p>...</p>;

  const total = data.questions.length;
  const done = Object.keys(answers).length;

  const submit = async () => {
    if (done < total) {
      setError(t('answerAll'));
      return;
    }
    setError('');
    setBusy(true);
    try {
      const r = await api('/companies/' + id + '/submit', { method: 'POST', body: { answers } });
      setResult(r);
      window.scrollTo(0, 0);
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  };

  const cls = (q, idx) => {
    if (!result) return answers[q.index] === idx ? 'opt picked' : 'opt';
    const r = result.results[q.index];
    if (idx === r.answer) return 'opt correct';
    if (answers[q.index] === idx) return 'opt wrong';
    return 'opt';
  };

  return (
    <div>
      <div className="card">
        <Link to={'/companies/' + id}>&larr; {t('backToCompany')}</Link>
        <h2>{data.name} {t('practiceTitle')}</h2>
        {result ? (
          <h3>{t('score')}: {result.score} / {result.total}</h3>
        ) : (
          <p><strong>{t('answered')}: {done} / {total}</strong></p>
        )}
        <p className="muted small">{t('disclaimerQuestions')}</p>
      </div>

      {data.questions.map((q, i) => (
        <div className="card q" key={q.index}>
          <p className="qtext">{i + 1}. {q.question}</p>
          {q.options.map((o, idx) => (
            <label key={idx} className={cls(q, idx)}>
              <input
                type="radio"
                name={'q' + q.index}
                disabled={!!result}
                checked={answers[q.index] === idx}
                onChange={() => setAnswers({ ...answers, [q.index]: idx })}
              />
              {o}
            </label>
          ))}
          {result && (
            <div className="explain">
              <strong>{result.results[q.index].correct ? t('correctLabel') : t('wrongLabel')}.</strong>{' '}
              {t('explanation')}: {result.results[q.index].explanation}
            </div>
          )}
        </div>
      ))}

      {error && <div className="error">{error}</div>}
      {!result && <button className="primary wide" disabled={busy} onClick={submit}>{t('submit')}</button>}
      {result && <button className="primary wide" onClick={load}>{t('tryAgain')}</button>}
    </div>
  );
}