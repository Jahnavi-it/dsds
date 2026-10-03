import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';
import { listen, speak, speechSupported, stopSpeaking, voiceErrorText } from '../voice.js';

const TIPS = {
  short: 'Your answers were short. Aim for 40-60 words with a clear example.',
  examples: 'Add real examples: describe the situation, what you did, and the result.',
  missed: 'Some key points were missed. See the review below for missing keywords.',
  good: 'Good job. Keep practising to stay confident.'
};

export default function Interview() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const [type, setType] = useState('tech');
  const [sessionId, setSessionId] = useState(null);
  const [q, setQ] = useState(null);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const recRef = useRef(null);

  const loadHistory = () =>
    api('/interview/history').then((d) => setHistory(d.history)).catch(() => nav('/login'));

  useEffect(() => {
    loadHistory();
    return () => {
      if (recRef.current) recRef.current.abort();
      stopSpeaking();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (voiceOn && q) speak(q.question, i18n.language);
    // eslint-disable-next-line
  }, [q, voiceOn]);

  const start = async () => {
    setError('');
    setBusy(true);
    try {
      const d = await api('/interview/start', {
        method: 'POST',
        body: { type, company: localStorage.getItem('target') || '' }
      });
      setSessionId(d.sessionId);
      setQ(d);
      setAnswer('');
      setResult(null);
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  };

  const send = async () => {
    if (!answer.trim()) return;
    setError('');
    setBusy(true);
    stopSpeaking();
    try {
      const d = await api('/interview/answer', { method: 'POST', body: { sessionId, answer } });
      setAnswer('');
      if (d.done) {
        setResult(d);
        setQ(null);
        loadHistory();
      } else {
        setQ(d);
      }
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  };

  const dictate = () => {
    if (listening && recRef.current) {
      recRef.current.stop();
      return;
    }
    setListening(true);
    recRef.current = listen({
      lang: i18n.language,
      onResult: (txt) => setAnswer((a) => (a ? a + ' ' : '') + txt),
      onError: (e) => { setListening(false); const m = voiceErrorText(e); if (m) alert(m); },
      onEnd: () => setListening(false)
    });
  };

  const reset = () => {
    stopSpeaking();
    setQ(null);
    setResult(null);
    setSessionId(null);
    setAnswer('');
  };

  if (result) {
    return (
      <div>
        <div className="card">
          <h2>{t('interviewScore', { defaultValue: 'Interview score' })}: {result.score}%</h2>
          <div className="bar"><div className="fill" style={{ width: result.score + '%' }} /></div>
          <p className="muted">{t('avgWords', { defaultValue: 'Average answer length' })}: {result.avgWords} {t('wordsUnit', { defaultValue: 'words' })}</p>
          <ul className="notes">
            {result.tips.map((k) => <li key={k}>{t('tip_' + k, { defaultValue: TIPS[k] })}</li>)}
          </ul>
          <p className="muted small">{result.note}</p>
        </div>
        <div className="card">
          <h3>{t('review', { defaultValue: 'Review' })}</h3>
          {result.review.map((r, i) => (
            <div key={i} className="row">
              <div className="rowhead">
                <span>{i + 1}. {r.q}</span>
                <span>{r.score}%</span>
              </div>
              <div className="bar"><div className="fill" style={{ width: r.score + '%' }} /></div>
              <p className="small muted">{r.answer || '-'}</p>
              {r.missed.length > 0 && (
                <p className="small">
                  {t('missedKw', { defaultValue: 'Missing keywords' })}: {r.missed.map((m) => <span key={m} className="tag" style={{ marginRight: 4 }}>{m}</span>)}
                </p>
              )}
            </div>
          ))}
          <button className="primary wide" onClick={reset}>{t('tryAgain', { defaultValue: 'Try again' })}</button>
        </div>
      </div>
    );
  }

  if (q) {
    return (
      <div className="card">
        <span className="tag">{q.kind === 'follow' ? t('followUp', { defaultValue: 'Follow-up' }) : t('mainQ', { defaultValue: 'Main question' })} #{q.index}</span>
        <p className="qtext">{q.question}</p>
        <textarea
          rows={6}
          style={{ width: '100%', boxSizing: 'border-box', padding: 10, border: '1px solid #c9cfe3', borderRadius: 8, fontSize: 15 }}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={t('typeAnswer', { defaultValue: 'Type your answer here...' })}
        />
        {error && <p className="error">{error}</p>}
        <div className="stack">
          {speechSupported() && (
            <button className="secondary linkbtn" onClick={dictate}>
              {listening ? t('stopMic', { defaultValue: 'Stop' }) : t('speakAnswer', { defaultValue: 'Speak your answer' })}
            </button>
          )}
          <button className="primary" onClick={send} disabled={busy || !answer.trim()}>
            {t('submitAnswer', { defaultValue: 'Submit answer' })}
          </button>
          <button className="secondary linkbtn" onClick={reset}>{t('endInterview', { defaultValue: 'End interview' })}</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h2>{t('mockInterview', { defaultValue: 'Mock interview' })}</h2>
        <p className="muted">{t('interviewIntro', { defaultValue: 'Answer questions by typing or speaking. Follow-up questions depend on your answers.' })}</p>
        <div className="chips">
          <button className={'chip' + (type === 'tech' ? ' active' : '')} style={{ color: '#1b2340', borderColor: '#3b5bdb' }} onClick={() => setType('tech')}>{t('technical', { defaultValue: 'Technical' })}</button>
          <button className={'chip' + (type === 'hr' ? ' active' : '')} style={{ color: '#1b2340', borderColor: '#3b5bdb' }} onClick={() => setType('hr')}>HR</button>
        </div>
        {speechSupported() && (
          <label className="small muted" style={{ display: 'block', marginTop: 12 }}>
            <input type="checkbox" checked={voiceOn} onChange={(e) => setVoiceOn(e.target.checked)} /> {t('readAloud', { defaultValue: 'Read questions aloud' })}
          </label>
        )}
        {error && <p className="error">{error}</p>}
        <button className="primary wide" onClick={start} disabled={busy}>{t('startInterview', { defaultValue: 'Start interview' })}</button>
      </div>
      {history.length > 0 && (
        <div className="card">
          <h3>{t('recentInterviews', { defaultValue: 'Recent interviews' })}</h3>
          {history.map((h) => (
            <div key={h.id} className="rowhead row">
              <span>{h.type === 'hr' ? 'HR' : t('technical', { defaultValue: 'Technical' })}{h.company ? ' - ' + h.company : ''}</span>
              <span>{h.score}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
