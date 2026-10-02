import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

function runTests(p, code) {
  let fn;
  try { fn = new Function(code + '\nreturn ' + p.fn + ';')(); } catch (e) { return { error: e.message }; }
  if (typeof fn !== 'function') return { error: 'Function ' + p.fn + ' not found' };
  const res = p.tests.map(([args, exp]) => {
    try {
      const got = fn(...JSON.parse(JSON.stringify(args)));
      return { ok: JSON.stringify(got) === JSON.stringify(exp), got, exp, args };
    } catch (e) { return { ok: false, err: e.message, exp, args }; }
  });
  return { res };
}

export default function Coding() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [list, setList] = useState([]);
  const [cur, setCur] = useState(null);
  const [code, setCode] = useState('');
  const [out, setOut] = useState(null);

  const load = () => api('/coding/problems').then((d) => setList(d.problems)).catch(() => nav('/login'));
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const open = (p) => { setCur(p); setCode(p.starter); setOut(null); };

  const run = async () => {
    const r = runTests(cur, code);
    setOut(r);
    if (r.res && r.res.every((x) => x.ok)) {
      await api('/coding/solve', { method: 'POST', body: { id: cur.id } }).catch(() => {});
      load();
    }
  };

  if (cur) {
    return (
      <div className="card">
        <h2>{cur.title}</h2>
        <p className="muted">{cur.desc}</p>
        <textarea rows={10} spellCheck={false} value={code} onChange={(e) => setCode(e.target.value)}
          style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: 14, padding: 10, border: '1px solid #c9cfe3', borderRadius: 8 }} />
        <div className="stack">
          <button className="primary" onClick={run}>{t('runTests', { defaultValue: 'Run tests' })}</button>
          <button className="secondary linkbtn" onClick={() => setCur(null)}>{t('back', { defaultValue: 'Back' })}</button>
        </div>
        {out && out.error && <p className="error">{out.error}</p>}
        {out && out.res && (
          <div style={{ marginTop: 12 }}>
            {out.res.map((x, i) => (
              <div key={i} className={'opt ' + (x.ok ? 'correct' : 'wrong')}>
                {x.ok ? 'PASS' : 'FAIL'} - input {JSON.stringify(x.args)} expected {JSON.stringify(x.exp)}
                {!x.ok && (x.err ? ' error: ' + x.err : ' got ' + JSON.stringify(x.got))}
              </div>
            ))}
            {out.res.every((x) => x.ok) && <p className="muted">{t('allPassed', { defaultValue: 'All tests passed!' })}</p>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      <h2>{t('codingPractice', { defaultValue: 'Coding practice' })}</h2>
      {list.map((p) => (
        <div key={p.id} className="subjhead row">
          <span className={'tick' + (p.solved ? ' done' : '')}>{p.solved ? '\u2713' : ''}</span>
          <strong>{p.title}</strong>
          <button className="secondary" style={{ border: 'none', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }} onClick={() => open(p)}>{t('solve', { defaultValue: 'Solve' })}</button>
        </div>
      ))}
    </div>
  );
}
