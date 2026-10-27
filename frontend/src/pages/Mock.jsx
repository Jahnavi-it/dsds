import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [pattern, setPattern] = useState(null);
  const [si, setSi] = useState(0);
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

  useEffect(() => {
    setPattern(null);
    if (!company) return;
    api('/mock/pattern?company=' + encodeURIComponent(company)).then((d) => setPattern(d.pattern)).catch(() => {});
  }, [company]);

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

  // timer: one timer for the whole test, or one per section when the company test is sectional
  useEffect(() => {
    if (!session || result) return undefined;
    const secs = session.sections;
    const sectional = !!(secs && session.mode === 'sectional');
    const minutes = sectional ? secs[si].minutes : session.minutes;
    const end = Date.now() + minutes * 60000;
    setLeft(minutes * 60);
    const id = setInterval(() => {
      const s = Math.max(0, Math.round((end - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) {
        clearInterval(id);
        if (sectional && si < secs.length - 1) setSi(si + 1);
        else submit('time');
      }
    }, 500);
    return () => clearInterval(id);
  }, [session, result, si]);

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
      setSi(0);
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
    setSi(0);
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
        {result.sections && (
          <div className="card">
            <h3>Section-wise score</h3>
            {result.sections.map((x) => (
              <div key={x.index} className="row">
                <div className="rowhead"><span>{x.name}</span><span>{x.correct}/{x.total} ({x.percent}%)</span></div>
                <div className="bar"><div className="fill" style={{ width: x.percent + '%' }} /></div>
              </div>
            ))}
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
        {result.mistakesSaved > 0 && (
          <div className="card">
            <p>{result.mistakesSaved} {t('simWrongSaved', { defaultValue: 'wrong answers were saved to your Mistake book.' })}</p>
            <Link to="/mistakes" className="actionbtn">{t('mistakeBook', { defaultValue: 'Mistake book' })}</Link>
          </div>
        )}
        <button className="primary wide" onClick={reset}>{t('tryAgain')}</button>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="card">
        <h2>{t('mockTest')}</h2>
        {!pattern && <p className="muted">{t('mockIntro')}</p>}
        <label className="muted small">{t('targetCompany')}</label>
        <select value={company} onChange={(e) => { setCompany(e.target.value); localStorage.setItem('target', e.target.value); }} style={{ width: '100%', margin: '6px 0 14px' }}>
          <option value="">{t('general')}</option>
          {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {pattern && (
          <div className="card" style={{ margin: '0 0 14px', background: '#f4f6fc' }}>
            <h3>{pattern.title}</h3>
            <p className="small">{pattern.how}</p>
            {!pattern.real && <p className="small error">{pattern.note}</p>}
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0' }} className="small">
              <thead>
                <tr><th align="left">Section</th><th align="right">Questions</th><th align="right">{pattern.mode === 'shared' ? '' : 'Time'}</th></tr>
              </thead>
              <tbody>
                {pattern.sections.map((x, i) => (
                  <tr key={i}><td>{x.name}</td><td align="right">{x.count}</td><td align="right">{x.minutes ? x.minutes + ' min' : ''}</td></tr>
                ))}
                <tr><td><strong>Total</strong></td><td align="right"><strong>{pattern.total}</strong></td><td align="right"><strong>{pattern.minutes} min{pattern.mode === 'shared' ? ' shared' : ''}</strong></td></tr>
              </tbody>
            </table>
            <p className="small muted">
              {pattern.mode === 'shared'
                ? 'One timer for all sections. You can move between sections.'
                : 'Each section has its own timer. When time ends the next section starts, and you cannot go back, as in the real test.'}
            </p>
            {pattern.extras.length > 0 && (
              <div>
                <p className="small" style={{ margin: '8px 0 2px' }}><strong>Other parts of the real process (not in this MCQ test):</strong></p>
                {pattern.extras.map((x, i) => (
                  <p key={i} className="small muted" style={{ margin: '2px 0' }}>- <strong>{x.name}:</strong> {x.detail}</p>
                ))}
              </div>
            )}
            {pattern.real && pattern.note && <p className="small muted" style={{ marginTop: 8 }}>{pattern.note}</p>}
            <p className="small muted" style={{ marginTop: 8 }}>Where this pattern comes from:</p>
            <ol className="notes small">
              {pattern.sources.map((x, i) => (
                <li key={i}><a href={x.url} target="_blank" rel="noopener noreferrer">{x.title}</a></li>
              ))}
            </ol>
            <p className="small muted">The sections, number of questions and timing follow these sources. The questions are practice MCQs written for NEXORA, because companies do not publish their real papers.</p>
          </div>
        )}
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
        {warn && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200, background: '#c92a2a', color: '#fff', padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>
          {t(warn)} ({viol} / {MAX_VIOLATIONS})
          <button onClick={() => setWarn('')} style={{ marginLeft: 12 }}>OK</button>
        </div>
      )}
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
      {session.sections && (
        <div className="card" style={{ background: '#f4f6fc' }}>
          {session.mode === 'sectional' ? (
            <strong>Section {si + 1} of {session.sections.length}: {session.sections[si].name} ({session.sections[si].count} questions, {session.sections[si].minutes} min)</strong>
          ) : (
            <strong>{session.title}: {session.sections.length} sections, one shared timer</strong>
          )}
        </div>
      )}
      {session.questions.filter((q) => !(session.sections && session.mode === 'sectional') || q.sec === si).map((q, n, arr) => (
        <div key={q.i}>
          {session.sections && session.mode === 'shared' && (n === 0 || arr[n - 1].sec !== q.sec) && (
            <h3 style={{ margin: '14px 4px 6px' }}>{session.sections[q.sec].name}</h3>
          )}
          <div className="card q">
            <div className="tag">{t('cat_' + q.cat)}</div>
            <p className="qtext" style={{ whiteSpace: 'pre-wrap' }}>{q.i + 1}. {q.question}</p>
            {q.options.map((o, idx) => (
              <label key={idx} className={answers[q.i] === idx ? 'opt picked' : 'opt'}>
                <input type="radio" name={'m' + q.i} checked={answers[q.i] === idx} onChange={() => pick(q.i, idx)} />
                {o}
              </label>
            ))}
          </div>
        </div>
      ))}
      {error && <div className="error">{error}</div>}
      {session.sections && session.mode === 'sectional' && si < session.sections.length - 1 ? (
        <button className="primary wide" disabled={busy} onClick={() => setSi(si + 1)}>Submit this section and continue</button>
      ) : (
        <button className="primary wide" disabled={busy} onClick={() => submit('manual')}>{t('submit')}</button>
      )}
    </div>
  );
}