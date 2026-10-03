import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';
import { listen, speak, speechSupported, stopSpeaking, voiceErrorText } from '../voice.js';
import { useProctor, ProctorPanel } from '../Proctor.jsx';

const TIPS = {
  short: 'Your answers were short. Aim for 40-60 words with a clear example.',
  examples: 'Add real examples: describe the situation, what you did, and the result.',
  missed: 'Some key points were missed. See the review below for missing keywords.',
  good: 'Good job. Keep practising to stay confident.'
};

const VERDICT = {
  correct: { label: 'Correct', color: '#2b8a3e' },
  partial: { label: 'Partially correct', color: '#e67700' },
  wrong: { label: 'Not correct yet', color: '#c92a2a' }
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
  const [fb, setFb] = useState(null);
  const [pending, setPending] = useState(null);
  const [proctored, setProctored] = useState(true);
  const [company, setCompany] = useState(localStorage.getItem('target') || '');
  const [companies, setCompanies] = useState([]);
  const recRef = useRef(null);
  const endRef = useRef(null);
  const proctor = useProctor({ max: 3, onLimit: () => { if (endRef.current) endRef.current(); } });

  useEffect(() => { api('/companies').then((d) => setCompanies(d.companies)).catch(() => {}); }, []);

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
    if (voiceOn && q && !fb) speak(q.question, i18n.language);
    // eslint-disable-next-line
  }, [q, voiceOn]);

  const start = async () => {
    setError('');
    setBusy(true);
    if (proctored) {
      const ok = await proctor.start();
      if (!ok) {
        setError('Camera permission was not given. Allow the camera, or turn off proctored mode.');
        setBusy(false);
        return;
      }
    }
    try {
      const d = await api('/interview/start', {
        method: 'POST',
        body: { type, company }
      });
      setSessionId(d.sessionId);
      setQ(d);
      setAnswer('');
      setResult(null);
      setFb(null);
      setPending(null);
    } catch (e) {
      setError(e.message);
      proctor.stop();
    }
    setBusy(false);
  };

  const send = async () => {
    if (!answer.trim()) return;
    setError('');
    setBusy(true);
    stopSpeaking();
    if (recRef.current) recRef.current.abort();
    try {
      const d = await api('/interview/answer', { method: 'POST', body: { sessionId, answer } });
      setFb({ ...d.feedback, answer });
      setPending(d);
      setAnswer('');
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  };

  const next = () => {
    stopSpeaking();
    const d = pending;
    setFb(null);
    setPending(null);
    if (!d) return;
    if (d.done) {
      setResult(d);
      proctor.report('interview', sessionId);
      setQ(null);
      proctor.stop();
      loadHistory();
    } else {
      setQ(d);
    }
  };

  const dictate = () => {
    if (listening && recRef.current) {
      recRef.current.stop();
      return;
    }
    stopSpeaking();
    setError('');
    setListening(true);
    recRef.current = listen({
      lang: i18n.language,
      continuous: true,
      onResult: (txt) => setAnswer((a) => (a ? a + ' ' : '') + txt),
      onError: (e) => { setListening(false); const m = voiceErrorText(e); if (m) setError(m); },
      onEnd: () => setListening(false)
    });
  };

  const reset = () => {
    stopSpeaking();
    if (recRef.current) recRef.current.abort();
    proctor.stop();
    setQ(null);
    setResult(null);
    setSessionId(null);
    setAnswer('');
    setFb(null);
    setPending(null);
  };

  endRef.current = () => {
    reset();
    proctor.report('interview', sessionId);
    setError('Interview ended: too many proctoring violations (tab switch, leaving full screen or camera off).');
  };

  const coName = (id) => { const c = companies.find((x) => x.id === id); return c ? c.name : ''; };
  const typeLabel = (v) => (v === 'hr' ? 'HR' : t('technical', { defaultValue: 'Technical' }));

  if (result) {
    return (
      <div>
        <div className="card">
          <h2>{typeLabel(result.type)}{coName(company) ? ' (' + coName(company) + ')' : ''} - {t('interviewScore', { defaultValue: 'Interview score' })}: {result.score}%</h2>
          <div className="bar"><div className="fill" style={{ width: result.score + '%' }} /></div>
          <p className="muted">{t('avgWords', { defaultValue: 'Average answer length' })}: {result.avgWords} {t('wordsUnit', { defaultValue: 'words' })}</p>
          <ul className="notes">
            {result.tips.map((k) => <li key={k}>{t('tip_' + k, { defaultValue: TIPS[k] })}</li>)}
          </ul>
          <p className="muted small">{result.note}</p>
        </div>
        <div className="card">
          <h3>{t('review', { defaultValue: 'Review' })}</h3>
          {result.review.map((r, i) => {
            const v = VERDICT[r.verdict] || VERDICT.wrong;
            return (
              <div key={i} className="row">
                <div className="rowhead">
                  <span>{i + 1}. {r.q}</span>
                  <span style={{ color: v.color }}>{v.label} ({r.score}%)</span>
                </div>
                <div className="bar"><div className="fill" style={{ width: r.score + '%' }} /></div>
                <p className="small muted">{r.answer || '-'}</p>
                {r.missed.length > 0 && (
                  <p className="small">
                    {t('missedKw', { defaultValue: 'Missing keywords' })}: {r.missed.map((m) => <span key={m} className="tag" style={{ marginRight: 4 }}>{m}</span>)}
                  </p>
                )}
                {r.sample && <p className="small"><strong>Sample answer:</strong> {r.sample}</p>}
              </div>
            );
          })}
          <button className="primary wide" onClick={reset}>{t('tryAgain', { defaultValue: 'Try again' })}</button>
        </div>
      </div>
    );
  }

  if (fb) {
    const v = VERDICT[fb.verdict] || VERDICT.wrong;
    return (
      <div className="card">
        <ProctorPanel p={proctor} />
        <h3 style={{ color: v.color }}>{v.label} ({fb.score}%)</h3>
        <p className="small muted">Your answer: {fb.answer}</p>
        {fb.missed && fb.missed.length > 0 && (
          <p className="small">
            Points you missed: {fb.missed.map((m) => <span key={m} className="tag" style={{ marginRight: 4 }}>{m}</span>)}
          </p>
        )}
        {fb.sample && (
          <div className="nextaction">
            <div className="muted small">Sample good answer</div>
            <p>{fb.sample}</p>
            {speechSupported() && (
              <button className="secondary linkbtn" onClick={() => speak(fb.sample, 'en')}>Listen to sample answer</button>
            )}
          </div>
        )}
        <p className="muted small">This check is based on keywords and answer length, so a correct answer in different words may score lower.</p>
        <button className="primary wide" onClick={next}>{pending && pending.done ? 'See final score' : 'Next question'}</button>
      </div>
    );
  }

  if (q) {
    return (
      <div className="card">
        <ProctorPanel p={proctor} />
        <span className="tag">{typeLabel(q.type || type)}{coName(company) ? ' | ' + coName(company) : ''} | {q.kind === 'follow' ? t('followUp', { defaultValue: 'Follow-up' }) : t('mainQ', { defaultValue: 'Main question' })} #{q.index}</span>
        <p className="qtext">{q.question}</p>
        {speechSupported() && (
          <div className="stack">
            <button className="secondary linkbtn" onClick={() => speak(q.question, i18n.language)}>Listen to question</button>
            <label className="small muted">
              <input type="checkbox" checked={voiceOn} onChange={(e) => setVoiceOn(e.target.checked)} style={{ width: 'auto' }} /> {t('readAloud', { defaultValue: 'Read questions aloud' })}
            </label>
          </div>
        )}
        <textarea
          rows={6}
          style={{ width: '100%', boxSizing: 'border-box', padding: 10, border: '1px solid #c9cfe3', borderRadius: 8, fontSize: 15, marginTop: 10 }}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={t('typeAnswer', { defaultValue: 'Type your answer here, or tap the mic and speak...' })}
        />
        {listening && <p style={{ color: '#c92a2a', fontWeight: 600 }}>Listening... speak now. Tap Stop when you finish.</p>}
        {error && <p className="error">{error}</p>}
        <div className="stack">
          {speechSupported() ? (
            <button className="primary" style={listening ? { background: '#e03131' } : undefined} onClick={dictate}>
              {listening ? t('stopMic', { defaultValue: 'Stop' }) : t('speakAnswer', { defaultValue: 'Tap and speak your answer' })}
            </button>
          ) : (
            <p className="muted small">Voice input works only in Chrome or Edge.</p>
          )}
          <button className="primary" onClick={send} disabled={busy || !answer.trim()}>
            {t('submitAnswer', { defaultValue: 'Submit answer' })}
          </button>
          <button className="secondary linkbtn" onClick={reset}>{t('endInterview', { defaultValue: 'End interview' })}</button>
        </div>
      </div>
    );
  }

  const chip = (k) => ({
    color: type === k ? '#fff' : '#1b2340',
    background: type === k ? '#3b5bdb' : '#fff',
    borderColor: '#3b5bdb',
    fontWeight: type === k ? 700 : 400
  });

  return (
    <div>
      <div className="card">
        <h2>{t('mockInterview', { defaultValue: 'Mock interview' })}</h2>
        <p className="muted">{t('interviewIntro', { defaultValue: 'Answer questions by typing or speaking. Follow-up questions depend on your answers.' })}</p>
        <div className="chips">
          <button className={'chip' + (type === 'tech' ? ' active' : '')} style={chip('tech')} onClick={() => setType('tech')}>{t('technical', { defaultValue: 'Technical' })}</button>
          <button className={'chip' + (type === 'hr' ? ' active' : '')} style={chip('hr')} onClick={() => setType('hr')}>HR</button>
        </div>
        <p className="small muted">Selected: <strong>{typeLabel(type)}</strong> interview</p>
        <label className="small muted" style={{ display: 'block', marginTop: 10 }}>Company</label>
        <select value={company} onChange={(e) => { setCompany(e.target.value); localStorage.setItem('target', e.target.value); }} style={{ width: '100%', margin: '6px 0 10px' }}>
          <option value="">General (no specific company)</option>
          {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <p className="small muted">Questions follow each company's usual interview style. They are practice questions based on commonly reported patterns, not official company papers.</p>
        {speechSupported() && (
          <label className="small muted" style={{ display: 'block', marginTop: 12 }}>
            <input type="checkbox" checked={voiceOn} onChange={(e) => setVoiceOn(e.target.checked)} style={{ width: 'auto' }} /> {t('readAloud', { defaultValue: 'Read questions aloud' })}
          </label>
        )}
        <label className="small muted" style={{ display: 'block', margin: '8px 0' }}>
          <input type="checkbox" checked={proctored} onChange={(e) => setProctored(e.target.checked)} style={{ width: 'auto' }} /> Proctored mode (camera + full screen + tab-switch warnings)
        </label>
        {error && <p className="error">{error}</p>}
        <button className="primary wide" onClick={start} disabled={busy}>{t('startInterview', { defaultValue: 'Start interview' })}</button>
      </div>
      {history.length > 0 && (
        <div className="card">
          <h3>{t('recentInterviews', { defaultValue: 'Recent interviews' })}</h3>
          {history.map((h) => (
            <div key={h.id} className="rowhead row">
              <span>{typeLabel(h.type)}{h.company ? ' - ' + (coName(h.company) || h.company) : ''}</span>
              <span>{h.score}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
