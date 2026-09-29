import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

const MAX_VIOLATIONS = 3;
const fmt = (s) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');

export default function Mock() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(localStorage.getItem('target') || '');
  const [proctored, setProctored] = useState(true);
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState({});
  const [left, setLeft] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [warn, setWarn] = useState('');
  const [viol, setViol] = useState(0);
  const [isFs, setIsFs] = useState(true);
  const answersRef = useRef({});
  const sessionRef = useRef(null);
  const doneRef = useRef(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const proctoredRef = useRef(false);
  const evRef = useRef({ tab: 0, blur: 0, fs: 0, log: [], auto: false });

  useEffect(() => {
    api('/assessment/companies').then((d) => setCompanies(d.companies)).catch(() => nav('/login'));
  }, [nav]);

  const stopProctor = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;
    }
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };

  useEffect(() => () => stopProctor(), []);

  const submit = async (why) => {
    if (doneRef.current || !sessionRef.current) return;
    doneRef.current = true;
    setBusy(true);
    const ev = evRef.current;
    if (why === 'violations') ev.auto = true;
    try {
      let report = null;
      if (proctoredRef.current) {
        const live = !!(streamRef.current && streamRef.current.getVideoTracks().some((tr) => tr.readyState === 'live'));
        report = { camera: live, tab: ev.tab, blur: ev.blur, fs: ev.fs, auto: ev.auto };
        await api('/proctor/report', {
          method: 'POST',
          body: { sessionId: sessionRef.current.sessionId, ...report, log: ev.log }
        }).catch(() => {});
      }
      const r = await api('/mock/submit', {
        method: 'POST',
        body: { sessionId: sessionRef.current.sessionId, answers: answersRef.current }
      });
      stopProctor();
      setResult({ ...r, proctor: report });
    } catch (e) {
      setError(e.message);
      doneRef.current = false;
    }
    setBusy(false);
  };

  const violation = (type, key) => {
    if (!proctoredRef.current || doneRef.current || !sessionRef.current) return;
    const ev = evRef.current;
    ev[type] += 1;
    ev.log.push({ type, at: new Date().toISOString() });
    const total = ev.tab + ev.blur + ev.fs;
    setViol(total);
    setWarn(key);
    if (total >= MAX_VIOLATIONS) submit('violations');
  };

  // timer
  useEffect(() => {
    if (!session || result) return undefined;
    const end = Date.now() + session.minutes * 60000;
    setLeft(session.minutes * 60);
    const id = setInterval(() => {
      const s = Math.max(0, Math.round((end - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) {
        clearInterval(id);
        submit('time');
      }
    }, 500);
    return () => clearInterval(id);
  }, [session, result]);

  // browser-based monitoring
  useEffect(() => {
    if (!session || result || !proctoredRef.current) return undefined;
    const onVis = () => { if (document.hidden) violation('tab', 'warnTab'); };
    const onBlur = () => {
      setTimeout(() => {
        if (!document.hidden && !document.hasFocus()) violation('blur', 'warnBlur');
      }, 400);
    };
    const onFs = () => {
      const on = !!document.fullscreenElement;
      setIsFs(on);
      if (!on) violation('fs', 'warnFs');
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('blur', onBlur);
    document.addEventListener('fullscreenchange', onFs);
    setIsFs(!!document.fullscreenElement);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('fullscreenchange', onFs);
    };
  }, [session, result]);

  // show the camera preview
  useEffect(() => {
    if (session && videoRef.current && streamRef.current) videoRef.current.srcObject = streamRef.current;
  }, [session]);

  const start = async () => {
    setError('');
    setBusy(true);
    proctoredRef.current = proctored;
    evRef.current = { tab: 0, blur: 0, fs: 0, log: [], auto: false };
    setViol(0);
    setWarn('');
    if (proctored) {
      // full screen must be requested straight from the click
      try { await document.documentElement.requestFullscreen(); } catch (e) { /* refused, it will show as not in full screen */ }
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      } catch (e) {
        setError(t('cameraDenied'));
        stopProctor();
        setBusy(false);
        return;
      }
    }
    try {
      const d = await api('/mock/start?company=' + encodeURIComponent(company));
      doneRef.current = false;
      answersRef.current = {};
      sessionRef.current = d;
      setAnswers({});
      setResult(null);
      setSession(d);
    } catch (e) {
      setError(e.message);
      stopProctor();
    }
    setBusy(false);
  };

  const pick = (i, idx) => {
    answersRef.current = { ...answersRef.current, [i]: idx };
    setAnswers(answersRef.current);
  };

  const reset = () => {
    stopProctor();
    sessionRef.current = null;
    setSession(null);
    setResult(null);
    setAnswers({});
    setWarn('');
    setViol(0);
  };

  const goFs = () => document.documentElement.requestFullscreen().catch(() => {});

  if (result) {
    const p = result.proctor;
    return (
      <div>
        <div className="card">
          <h2>{t('score')}: {result.score} / {result.total} ({result.percent}%)</h2>
          <div className="bar"><div className="fill" style={{ width: result.percent + '%' }} /></div>
          <p className="muted">{t('timeTaken')}: {fmt(result.seconds)}</p>
          {result.late && <p className="error">{t('lateNote')}</p>}
        </div>
        {p && (
          <div className="card">
            <h3>{t('proctorReport')}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr><th align="left">{t('event')}</th><th align="right">{t('count')}</th></tr>
              </thead>
              <tbody>
                <tr><td>{t('tabSwitched')}</td><td align="right">{p.tab}</td></tr>
                <tr><td>{t('windowBlur')}</td><td align="right">{p.blur}</td></tr>
                <tr><td>{t('fsExited')}</td><td align="right">{p.fs}</td></tr>
                <tr><td>{t('cameraActive')}</td><td align="right">{p.camera ? t('yes') : t('no')}</td></tr>
                <tr><td>{t('autoSubmitted')}</td><td align="right">{p.auto ? t('yes') : t('no')}</td></tr>
              </tbody>
            </table>
            <p className="muted small">{t('proctorNote')}</p>
          </div>
        )}
        <div className="card">
          {result.categories.map((c) => (
            <div key={c.category} className="row">
              <div className="rowhead">
                <span>{t('cat_' + c.category)}</span>
                <span>{c.correct}/{c.total} ({c.percent}%)</span>
              </div>
              <div className="bar"><div className="fill" style={{ width: c.percent + '%' }} /></div>
            </div>
          ))}
        </div>
        <div className="card"><h3>{t('review')}</h3></div>
        {result.review.map((r, i) => (
          <div className="card q" key={i}>
            <div className="tag">{t('cat_' + r.cat)}</div>
            <p className="qtext">{i + 1}. {r.question}</p>
            <p style={{ color: r.chosen === r.answer ? '#2b8a3e' : '#c92a2a', margin: '4px 0' }}>
              {t('yourAnswer')}: {r.chosen >= 0 ? r.options[r.chosen] : t('notAnswered')}
            </p>
            {r.chosen !== r.answer && (
              <p style={{ color: '#2b8a3e', margin: '4px 0' }}>{t('correctAnswer')}: {r.options[r.answer]}</p>
            )}
            <p className="muted small">{r.explanation}</p>
          </div>
        ))}
        <button className="primary wide" onClick={reset}>{t('tryAgain')}</button>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="card">
        <h2>{t('mockTest')}</h2>
        <p className="muted">{t('mockIntro')}</p>
        <label className="muted small">{t('targetCompany')}</label>
        <select value={company} onChange={(e) => { setCompany(e.target.value); localStorage.setItem('target', e.target.value); }} style={{ width: '100%', margin: '6px 0 14px' }}>
          <option value="">{t('general')}</option>
          {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '0 0 6px' }}>
          <input type="checkbox" checked={proctored} onChange={(e) => setProctored(e.target.checked)} style={{ width: 'auto' }} />
          {t('proctored')}
        </label>
        <p className="muted small">{t('proctorNote')}</p>
        {error && <div className="error">{error}</div>}
        <button className="primary wide" disabled={busy} onClick={start}>{t('startMock')}</button>
      </div>
    );
  }

  const done = Object.keys(answers).length;
  return (
    <div>
      <div className="card timerbar" style={{ flexWrap: 'wrap', gap: 6 }}>
        <strong className={left <= 60 ? 'timer low' : 'timer'}>{t('timeLeft')}: {fmt(left)}</strong>
        <span className="muted">{done} / {session.questions.length}</span>
        {proctoredRef.current && <span className="muted small">{t('violations')}: {viol} / {MAX_VIOLATIONS}</span>}
        {warn && <div className="error" style={{ width: '100%' }}>{t(warn)}</div>}
        {proctoredRef.current && !isFs && (
          <button className="primary" onClick={goFs}>{t('backFs')}</button>
        )}
      </div>
      {proctoredRef.current && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ position: 'fixed', right: 12, bottom: 12, width: 150, borderRadius: 10, border: '2px solid #2b8a3e', background: '#000', zIndex: 20 }}
        />
      )}
      {session.questions.map((q) => (
        <div className="card q" key={q.i}>
          <div className="tag">{t('cat_' + q.cat)}</div>
          <p className="qtext">{q.i + 1}. {q.question}</p>
          {q.options.map((o, idx) => (
            <label key={idx} className={answers[q.i] === idx ? 'opt picked' : 'opt'}>
              <input type="radio" name={'m' + q.i} checked={answers[q.i] === idx} onChange={() => pick(q.i, idx)} />
              {o}
            </label>
          ))}
        </div>
      ))}
      {error && <div className="error">{error}</div>}
      <button className="primary wide" disabled={busy} onClick={() => submit('manual')}>{t('submit')}</button>
    </div>
  );
}