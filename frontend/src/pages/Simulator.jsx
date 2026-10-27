import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useProctor, ProctorPanel } from '../Proctor.jsx';

const pre = { background: '#f4f6fc', padding: 8, borderRadius: 6, margin: '4px 0', overflowX: 'auto', whiteSpace: 'pre-wrap' };
const okColor = '#2b8a3e';
const badColor = '#c92a2a';
const mmss = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

const Bar = ({ v, ok }) => (
  <div className="bar"><div style={{ width: (v || 0) + '%', height: '100%', borderRadius: 'inherit', background: ok ? okColor : badColor }} /></div>
);

// Round-by-round progress, like the stages of a real campus drive.
function Stepper({ rounds, index }) {
  return (
    <div className="card" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {rounds.map((r, i) => {
        const st = r.status;
        const color = st === 'passed' ? okColor : st === 'failed' ? badColor : st === 'active' ? '#3b5bdb' : '#868e96';
        return (
          <div key={r.id} style={{ flex: 1, minWidth: 120, borderTop: '4px solid ' + color, paddingTop: 6 }}>
            <div className="small" style={{ color }}><strong>{i + 1}. {r.name}</strong></div>
            <div className="muted small">
              {st === 'passed' && 'Cleared (' + r.score + '%)'}
              {st === 'failed' && 'Not cleared (' + r.score + '%)'}
              {st === 'active' && (i === index ? 'In progress' : 'Active')}
              {(st === 'pending' || st === 'not reached') && 'Waiting'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Simulator() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [cid, setCid] = useState(localStorage.getItem('target') || '');
  const [prep, setPrep] = useState(null);
  const [history, setHistory] = useState([]);
  const [resumable, setResumable] = useState(null);
  const [drive, setDrive] = useState(null);
  const [strict, setStrict] = useState(true);
  const [proctored, setProctored] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [deadline, setDeadline] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [answers, setAnswers] = useState({});
  const autoRef = useRef(null);
  const proctor = useProctor({ max: 3, onLimit: () => { if (autoRef.current) autoRef.current(); } });

  const loadHome = () => {
    api('/drive/history').then((d) => setHistory(d.history || [])).catch(() => {});
    api('/drive/active').then((d) => setResumable(d && d.drive ? d.drive : null)).catch(() => {});
  };

  useEffect(() => {
    api('/companies').then((d) => {
      setCompanies(d.companies);
      setCid((c) => (d.companies.some((x) => x.id === c) ? c : (d.companies[0] ? d.companies[0].id : '')));
      setReady(true);
    }).catch(() => nav('/login'));
    loadHome();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!cid) return;
    setPrep(null);
    api('/drive/prepare?company=' + encodeURIComponent(cid)).then(setPrep).catch(() => setPrep(null));
  }, [cid]);

  useEffect(() => {
    if (!drive || drive.status !== 'running') return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [drive && drive.status]);

  // Every time the server sends a new state, restart the clock for the current round.
  const apply = (d) => {
    setDrive(d);
    setDeadline(Date.now() + (d.secondsLeft || 0) * 1000);
    setNow(Date.now());
    setErr('');
    window.scrollTo(0, 0);
    if (d.status !== 'running') {
      proctor.report('drive', d.id);
      proctor.stop();
      try { localStorage.removeItem('driveAns' + d.id); } catch (e) { /* ignore */ }
    }
  };

  const start = async () => {
    setErr(''); setBusy(true);
    if (proctored) {
      const ok = await proctor.start();
      if (!ok) { setErr('Camera permission was not given. Allow the camera, or turn off proctored mode.'); setBusy(false); return; }
    }
    try {
      const d = await api('/drive/start', { method: 'POST', body: { company: cid, strict } });
      setAnswers({});
      apply(d);
    } catch (e) { setErr(e.message); proctor.stop(); }
    setBusy(false);
  };

  const resume = () => {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('driveAns' + resumable.id) || '{}'); } catch (e) { saved = {}; }
    setAnswers(saved);
    apply(resumable);
    setResumable(null);
  };

  const left = drive && drive.status === 'running' ? Math.max(0, Math.round((deadline - now) / 1000)) : 0;
  const round = drive && drive.status === 'running' ? drive.rounds[drive.roundIndex] : null;

  const submitTest = async () => {
    if (busy) return;
    setBusy(true);
    try { apply(await api('/drive/test/submit', { method: 'POST', body: { id: drive.id, answers } })); } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  const finishCoding = async () => {
    if (busy) return;
    setBusy(true);
    try { apply(await api('/drive/code/finish', { method: 'POST', body: { id: drive.id } })); } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  autoRef.current = () => {
    if (!round) return;
    if (round.id === 'test') submitTest();
    else if (round.id === 'coding') finishCoding();
  };

  useEffect(() => {
    if (round && left === 0 && deadline && (round.id === 'test' || round.id === 'coding') && !busy) autoRef.current();
    // eslint-disable-next-line
  }, [left]);

  if (!ready) return <p>...</p>;

  // ---------------- Finished: drive report ----------------
  if (drive && drive.status !== 'running' && drive.report) {
    const rp = drive.report;
    const selected = rp.outcome === 'selected';
    return (
      <div>
        <ProctorPanel p={proctor} />
        <div className="card" style={{ borderLeft: '6px solid ' + (selected ? okColor : badColor) }}>
          <h2 style={{ color: selected ? okColor : badColor }}>{selected ? 'Drive cleared: you are shortlisted' : 'Not selected this time'}</h2>
          <p>
            {drive.company.name} placement drive (practice).{' '}
            {selected ? 'You cleared every round.' : rp.strict && rp.rejectedAt ? 'You were out after the round: ' + rp.rejectedAt + '.' : 'Some rounds were not cleared.'}
          </p>
          <p className="muted small">Overall: {rp.overall}% across the rounds you attempted. This is practice feedback, not a real selection result.</p>
          {proctor.limitHit && <p style={{ color: badColor }}>A round was auto-submitted: too many proctoring violations.</p>}
        </div>

        {rp.rounds.map((r, i) => (
          <div className="card" key={r.id}>
            <div className="rowhead">
              <strong>{i + 1}. {r.name}</strong>
              <span style={{ color: r.status === 'passed' ? okColor : r.status === 'failed' ? badColor : '#868e96' }}>
                {r.status === 'passed' ? 'Cleared' : r.status === 'failed' ? 'Not cleared' : 'Not reached'}
                {r.score != null && ' - ' + r.score + '% (needs ' + r.cutoff + '%)'}
              </span>
            </div>
            {r.score != null && <Bar v={r.score} ok={r.status === 'passed'} />}
            {r.detail && r.detail.kind === 'test' && (
              <div className="small" style={{ marginTop: 8 }}>
                {r.detail.sections.map((s) => (
                  <div key={s.name} style={{ color: s.percent < r.detail.sectionFloor ? badColor : 'inherit' }}>
                    {s.name}: {s.correct}/{s.total} ({s.percent}%){s.percent < r.detail.sectionFloor && ' - below the ' + r.detail.sectionFloor + '% sectional cut-off'}
                  </div>
                ))}
                {r.detail.mistakesSaved > 0 && <p className="muted">{r.detail.mistakesSaved} wrong answers were saved to your <Link to="/mistakes">Mistake book</Link>.</p>}
                {r.detail.late && <p className="muted">Submitted after the time limit.</p>}
              </div>
            )}
            {r.detail && r.detail.kind === 'coding' && (
              <div className="small" style={{ marginTop: 8 }}>
                {r.detail.problems.map((p) => <div key={p.id}>{p.title} ({p.level}): {p.passed}/{p.total} test cases passed</div>)}
              </div>
            )}
            {r.detail && r.detail.kind === 'interview' && (
              <div className="small" style={{ marginTop: 8 }}>
                {r.detail.review.map((x, k) => (
                  <div key={k} style={{ marginBottom: 6 }}>
                    <div>{x.q}</div>
                    <div className="muted">{x.score}% ({x.verdict}){x.missed.length > 0 && ' - missing: ' + x.missed.join(', ')}</div>
                  </div>
                ))}
                <p className="muted">Interview scores are based on keywords and answer length, so treat them as practice feedback.</p>
              </div>
            )}
          </div>
        ))}

        <div className="card">
          <h3>What to do next</h3>
          <ul className="notes">
            {rp.advice.map((a, i) => <li key={i}><Link to={a.to}>{a.text}</Link></li>)}
          </ul>
        </div>
        <button className="primary wide" onClick={() => { setDrive(null); loadHome(); }}>Back to placement drive</button>
      </div>
    );
  }

  // ---------------- Running ----------------
  if (drive && round) {
    const head = (
      <div>
        <ProctorPanel p={proctor} />
        <h2>{drive.company.name} placement drive</h2>
        <Stepper rounds={drive.rounds} index={drive.roundIndex} />
        <div className="card">
          <strong>Round {drive.roundIndex + 1}: {round.name}</strong>
          {(round.id === 'test' || round.id === 'coding') && (
            <> | <strong style={{ color: left < 60 ? badColor : 'inherit' }}>Time left: {mmss(left)}</strong></>
          )}
          <p className="muted small">
            Clearing this round needs {round.cutoff}%.
            {drive.strict ? ' If you do not clear it, the drive ends here.' : ' Practice mode: the drive continues even if you do not clear a round.'}
          </p>
          {err && <p style={{ color: badColor }}>{err}</p>}
        </div>
      </div>
    );

    if (round.id === 'test' && drive.test) {
      const pick = (i, oi) => {
        const na = { ...answers, [i]: oi };
        setAnswers(na);
        try { localStorage.setItem('driveAns' + drive.id, JSON.stringify(na)); } catch (e) { /* ignore */ }
      };
      return (
        <div>
          {head}
          <p className="muted small">Every section needs at least 40%, and the overall score needs {round.cutoff}%. When time ends the test is submitted automatically.</p>
          {drive.test.sections.map((s, si) => (
            <div key={si}>
              <h3>{s.name} <span className="muted small">({s.count} questions)</span></h3>
              {drive.test.questions.filter((q) => q.sec === si).map((q, n) => (
                <div className="card q" key={q.i}>
                  <p className="qtext" style={{ whiteSpace: 'pre-wrap' }}>{n + 1}. {q.question}</p>
                  {q.options.map((o, oi) => (
                    <label key={oi} style={{ display: 'block', margin: '6px 0', cursor: 'pointer' }}>
                      <input type="radio" name={'q' + q.i} checked={answers[q.i] === oi} onChange={() => pick(q.i, oi)} /> {o}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <button className="primary wide" onClick={submitTest} disabled={busy}>{busy ? '...' : 'Submit online test'}</button>
        </div>
      );
    }

    if (round.id === 'coding' && drive.coding) {
      return <CodingRound head={head} drive={drive} busy={busy} onFinish={finishCoding} setErr={setErr} />;
    }

    if (round.id === 'tech' || round.id === 'hr') {
      return (
        <InterviewRound key={round.id} head={head} drive={drive} round={round} apply={apply} setErr={setErr} />
      );
    }
  }

  // ---------------- Home ----------------
  const company = companies.find((c) => c.id === cid) || {};
  return (
    <div>
      <ProctorPanel p={proctor} />
      <h2>Placement drive simulator</h2>
      <p className="muted">Go through a company's whole selection process, round by round. Clear a round to reach the next one, just like a real campus drive.</p>
      {resumable && (
        <div className="card">
          <p><strong>You have an unfinished drive ({resumable.company.name}).</strong></p>
          <p className="muted small">The round clock kept running while you were away. Camera proctoring is not restarted on resume.</p>
          <button className="primary wide" onClick={resume}>Resume drive</button>
        </div>
      )}
      <div className="card">
        <label>Target company</label>
        <select value={cid} onChange={(e) => { setCid(e.target.value); localStorage.setItem('target', e.target.value); }}>
          {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {prep && (
          <div style={{ marginTop: 12 }}>
            <p className="small"><strong>{company.name} drive: {prep.rounds.length} rounds</strong> ({company.type === 'product' ? 'product company, higher cut-offs' : 'service company'})</p>
            {prep.rounds.map((r, i) => (
              <div key={r.id} className="small" style={{ padding: '4px 0' }}>
                <strong>{i + 1}. {r.name}</strong> - {r.summary}, {r.minutes} min, needs {r.cutoff}%
              </div>
            ))}
            <p className="muted small" style={{ marginTop: 8 }}>
              Online test sections: {prep.sections.map((s) => s.name + ' (' + s.count + ')').join(', ')}. Each section needs at least {prep.sectionFloor}%.
            </p>
            {prep.extras && prep.extras.length > 0 && (
              <p className="muted small">Part of the real process: {prep.extras.map((x) => (typeof x === 'string' ? x : x.name + ' (' + x.detail + ')')).join(' | ')}</p>
            )}
            {prep.note && <p className="muted small">{prep.note}</p>}
          </div>
        )}
        {err && <p style={{ color: badColor }}>{err}</p>}
        <label className="small muted" style={{ display: 'block', margin: '10px 0 4px' }}>
          <input type="checkbox" checked={strict} onChange={(e) => setStrict(e.target.checked)} style={{ width: 'auto' }} /> Elimination mode: the drive ends when you fail a round (untick to practise all rounds)
        </label>
        <label className="small muted" style={{ display: 'block', margin: '4px 0 10px' }}>
          <input type="checkbox" checked={proctored} onChange={(e) => setProctored(e.target.checked)} style={{ width: 'auto' }} /> Proctored mode (camera + full screen + tab-switch warnings)
        </label>
        <button className="primary wide" onClick={start} disabled={busy || !cid || !prep}>{busy ? '...' : 'Start drive'}</button>
      </div>

      {history.length > 0 && (
        <div className="card">
          <h3>Your drives</h3>
          {history.map((h) => (
            <div key={h.id} className="row">
              <div className="rowhead">
                <span>{h.company}</span>
                <span style={{ color: h.outcome === 'selected' ? okColor : badColor }}>{h.outcome === 'selected' ? 'Selected' : 'Not selected'} ({h.overall}%)</span>
              </div>
              <div className="muted small">
                {h.rounds.map((r) => r.name + ': ' + (r.status === 'passed' ? 'cleared' : r.status === 'failed' ? 'not cleared' : 'not reached')).join(' | ')}
              </div>
              <div className="muted small">{String(h.created_at).slice(0, 10)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------- Round 2: coding ----------------
function CodingRound({ head, drive, busy, onFinish, setErr }) {
  const { problems, languages } = drive.coding;
  const [pi, setPi] = useState(0);
  const [lang, setLang] = useState(languages[0] ? languages[0].id : 'python');
  const [codes, setCodes] = useState({});
  const [outs, setOuts] = useState({});
  const [best, setBest] = useState(drive.coding.best || {});
  const [running, setRunning] = useState(false);
  const p = problems[pi];
  const key = p.id + ':' + lang;
  const starter = (l) => ((languages.find((x) => x.id === l) || {}).starter) || '';
  const code = codes[key] !== undefined ? codes[key] : starter(lang);
  const out = outs[key];

  const run = async () => {
    setRunning(true);
    try {
      const r = await api('/drive/code/run', { method: 'POST', body: { id: drive.id, problemId: p.id, language: lang, code } });
      setOuts({ ...outs, [key]: r });
      setBest({ ...best, [p.id]: r.best });
      setErr('');
    } catch (e) { setErr(e.message); }
    setRunning(false);
  };

  return (
    <div>
      {head}
      <div className="card">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {problems.map((x, i) => (
            <button key={x.id} className={i === pi ? 'primary' : 'secondary'} style={{ border: 'none', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }} onClick={() => setPi(i)}>
              {i + 1}. {x.title}{best[x.id] ? ' (' + best[x.id].passed + '/' + best[x.id].total + ')' : ''}
            </button>
          ))}
        </div>
        <h3 style={{ marginTop: 12 }}>{p.title} <span className={'tag lvl-' + String(p.level).toLowerCase()}>{p.level}</span></h3>
        <p className="muted">{p.desc}</p>
        <div className="small"><strong>Input</strong><pre style={pre}>{p.inputFormat}</pre></div>
        <div className="small"><strong>Output</strong><pre style={pre}>{p.outputFormat}</pre></div>
        <div className="small">
          <strong>Sample</strong>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 140 }}>Input<pre style={pre}>{p.sample.input}</pre></div>
            <div style={{ flex: 1, minWidth: 140 }}>Output<pre style={pre}>{p.sample.output}</pre></div>
          </div>
        </div>
        <label className="small muted" style={{ display: 'block', marginTop: 12 }}>
          Language{' '}
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #c9cfe3', fontSize: 15 }}>
            {languages.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </label>
        {lang === 'java' && <p className="small muted">Java: keep the class name <code>Main</code>.</p>}
        <textarea rows={14} spellCheck={false} value={code} onChange={(e) => setCodes({ ...codes, [key]: e.target.value })}
          style={{ width: '100%', boxSizing: 'border-box', marginTop: 8, fontFamily: 'monospace', fontSize: 14, padding: 10, border: '1px solid #c9cfe3', borderRadius: 8, tabSize: 4 }} />
        <div className="stack">
          <button className="primary" onClick={run} disabled={running || busy}>{running ? 'Running...' : 'Run against all test cases'}</button>
        </div>
        <p className="small muted">Only the first test case is shown in detail, the rest are hidden like in a real online judge. Your best result for each problem is what counts.</p>
        {out && out.compileError && <div className="opt wrong"><strong>Compilation error</strong><pre style={pre}>{out.compileError}</pre></div>}
        {out && out.results && out.results.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <strong>{out.passed}/{out.total} test cases passed</strong>
            {out.results.map((x, i) => (
              <div key={i} className={'opt ' + (x.ok ? 'correct' : 'wrong')} style={{ display: 'block' }}>
                <strong>Test {i + 1}: {x.ok ? 'PASS' : 'FAIL'}</strong>{!x.ok && <span> - {x.status}</span>}
                {!x.ok && x.input !== undefined && (
                  <div className="small">
                    Input<pre style={pre}>{x.input}</pre>
                    Expected<pre style={pre}>{x.expected}</pre>
                    Your output<pre style={pre}>{x.got || '(nothing printed)'}</pre>
                    {x.error && <>Error<pre style={pre}>{x.error}</pre></>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="primary wide" onClick={onFinish} disabled={busy}>{busy ? '...' : 'Finish coding round'}</button>
    </div>
  );
}

// ---------------- Rounds 3 and 4: interviews ----------------
function InterviewRound({ head, drive, round, apply, setErr }) {
  const type = round.id === 'tech' ? 'tech' : 'hr';
  const [sid, setSid] = useState(null);
  const [q, setQ] = useState(null);
  const [n, setN] = useState(1);
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    api('/interview/start', { method: 'POST', body: { type, company: drive.company.id, count: drive.interview.count } })
      .then((d) => { setSid(d.sessionId); setQ(d.question); })
      .catch((e) => setErr(e.message));
    // eslint-disable-next-line
  }, []);

  const send = async () => {
    if (busy || !answer.trim()) return;
    setBusy(true);
    try {
      const r = await api('/interview/answer', { method: 'POST', body: { sessionId: sid, answer } });
      setAnswer('');
      if (r.done) {
        apply(await api('/drive/interview/finish', { method: 'POST', body: { id: drive.id, sessionId: sid } }));
      } else {
        setQ(r.question); setN(n + 1);
      }
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  return (
    <div>
      {head}
      <div className="card">
        {!q ? <p>The interviewer is joining...</p> : (
          <>
            <p className="muted small">Question {n}. Answer the way you would in a real interview. You will see how you did in the drive report.</p>
            <p className="qtext" style={{ whiteSpace: 'pre-wrap' }}>{q}</p>
            <textarea rows={7} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer here"
              style={{ width: '100%', boxSizing: 'border-box', padding: 10, border: '1px solid #c9cfe3', borderRadius: 8, fontSize: 15 }} />
            <button className="primary wide" onClick={send} disabled={busy || !answer.trim()}>{busy ? '...' : 'Submit answer'}</button>
          </>
        )}
      </div>
    </div>
  );
}
