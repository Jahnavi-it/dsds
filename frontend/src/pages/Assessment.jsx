import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Assessment() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api('/assessment/questions')
      .then((d) => setQuestions(d.questions))
      .catch(() => nav('/login'));
  }, [nav]);

  const pick = (qid, idx) => setAnswers({ ...answers, [qid]: idx });
  const done = Object.keys(answers).length;

  const submit = async () => {
    if (done < questions.length) {
      setError(t('answerAll'));
      return;
    }
    setError('');
    setBusy(true);
    try {
      await api('/assessment/submit', { method: 'POST', body: { answers } });
      nav('/result');
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h2>{t('assessmentTitle')}</h2>
        <p className="muted">{t('assessmentIntro')}</p>
        <p><strong>{t('answered')}: {done} / {questions.length}</strong></p>
      </div>
      {questions.map((q, i) => (
        <div className="card q" key={q.id}>
          <div className="tag">{t('cat_' + q.category)}</div>
          <p className="qtext">{i + 1}. {q.question}</p>
          {q.options.map((o, idx) => (
            <label key={idx} className={answers[q.id] === idx ? 'opt picked' : 'opt'}>
              <input type="radio" name={'q' + q.id} checked={answers[q.id] === idx} onChange={() => pick(q.id, idx)} />
              {o}
            </label>
          ))}
        </div>
      ))}
      {error && <div className="error">{error}</div>}
      <button className="primary wide" disabled={busy} onClick={submit}>{t('submit')}</button>
    </div>
  );
}