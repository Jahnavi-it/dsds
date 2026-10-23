import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

const pre = { margin: '4px 0 0', padding: 8, background: '#f4f6fc', borderRadius: 6, fontFamily: 'monospace', fontSize: 13, whiteSpace: 'pre-wrap', wordBreak: 'break-word' };
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } }
};

export default function Coding() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [list, setList] = useState([]);
  const [langs, setLangs] = useState([]);
  const [cur, setCur] = useState(null);
  const [lang, setLang] = useState(store.get('codeLang') || 'python');
  const [code, setCode] = useState('');
  const [out, setOut] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const load = () => api('/coding/problems').then((d) => { setList(d.problems); setLangs(d.languages); }).catch(() => nav('/login'));
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const starter = (l) => (langs.find((x) => x.id === l) || {}).starter || '';
  const draftKey = (p, l) => 'code:' + p.id + ':' + l;

  const pick = (p, l) => {
    setCode(store.get(draftKey(p, l)) || starter(l));
    setOut(null);
    setError('');
  };

  const open = (p) => { setCur(p); pick(p, lang); };

  const changeLang = (l) => {
    if (cur) store.set(draftKey(cur, lang), code);
    setLang(l);
    store.set('codeLang', l);
    if (cur) pick(cur, l);
  };

  const edit = (v) => { setCode(v); if (cur) store.set(draftKey(cur, lang), v); };

  const onKey = (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const el = e.target;
    const s = el.selectionStart;
    const v = code.slice(0, s) + '    ' + code.slice(el.selectionEnd);
    edit(v);
    requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 4; });
  };

  const run = async () => {
    setBusy(true);
    setError('');
    setOut(null);
    try {
      const r = await api('/coding/run', { method: 'POST', body: { id: cur.id, language: lang, code } });
      setOut(r);
      if (r.solved) load();
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  };

  if (cur) {
    return (
      <div className="card">
        <h2>{cur.title} <span className="tag">{cur.level}</span></h2>
        <p className="muted">{cur.desc}</p>

        <div className="small"><strong>{t('inputFormat', { defaultValue: 'Input' })}</strong><pre style={pre}>{cur.inputFormat}</pre></div>
        <div className="small" style={{ marginTop: 8 }}><strong>{t('outputFormat', { defaultValue: 'Output' })}</strong><pre style={pre}>{cur.outputFormat}</pre></div>

        <h3 style={{ marginTop: 16 }}>{t('testCases', { defaultValue: 'Test cases' })}</h3>
        {cur.tests.map((x, i) => (
          <div key={i} className="small" style={{ marginBottom: 8 }}>
            <strong>#{i + 1}</strong>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 140 }}>Input<pre style={pre}>{x.input}</pre></div>
              <div style={{ flex: 1, minWidth: 140 }}>Expected output<pre style={pre}>{x.output}</pre></div>
            </div>
          </div>
        ))}

        <label className="small muted" style={{ display: 'block', marginTop: 12 }}>
          {t('language', { defaultValue: 'Language' })}{' '}
          <select value={lang} onChange={(e) => changeLang(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #c9cfe3', fontSize: 15 }}>
            {langs.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </label>
        {lang === 'java' && <p className="small muted">Java: keep the class name <code>Main</code>.</p>}

        <textarea rows={14} spellCheck={false} value={code} onChange={(e) => edit(e.target.value)} onKeyDown={onKey}
          style={{ width: '100%', boxSizing: 'border-box', marginTop: 8, fontFamily: 'monospace', fontSize: 14, padding: 10, border: '1px solid #c9cfe3', borderRadius: 8, tabSize: 4 }} />
        <div className="stack">
          <button className="primary" onClick={run} disabled={busy}>{busy ? t('running', { defaultValue: 'Running...' }) : t('runTests', { defaultValue: 'Run tests' })}</button>
          <button className="secondary linkbtn" onClick={() => setCur(null)}>{t('back', { defaultValue: 'Back' })}</button>
        </div>
        <p className="small muted">{t('resetHint', { defaultValue: 'Your code is saved on this device for each language.' })}{' '}
          <a href="#reset" onClick={(e) => { e.preventDefault(); edit(starter(lang)); }}>{t('resetCode', { defaultValue: 'Reset to template' })}</a></p>

        {error && <p className="error">{error}</p>}
        {out && out.compileError && (
          <div className="opt wrong"><strong>Compilation error</strong><pre style={pre}>{out.compileError}</pre></div>
        )}
        {out && out.results && out.results.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <strong>{out.passed}/{out.total} {t('passedLabel', { defaultValue: 'test cases passed' })}</strong>
            {out.results.map((x, i) => (
              <div key={i} className={'opt ' + (x.ok ? 'correct' : 'wrong')} style={{ display: 'block' }}>
                <strong>#{i + 1} {x.ok ? 'PASS' : 'FAIL'}</strong>{!x.ok && <span> - {x.status}</span>}
                {!x.ok && (
                  <div className="small">
                    Input<pre style={pre}>{x.input}</pre>
                    Expected<pre style={pre}>{x.expected}</pre>
                    Your output<pre style={pre}>{x.got || '(nothing printed)'}</pre>
                    {x.error && <>Error<pre style={pre}>{x.error}</pre></>}
                  </div>
                )}
              </div>
            ))}
            {out.solved && <p className="muted">{t('allPassed', { defaultValue: 'All tests passed!' })}</p>}
          </div>
        )}
      </div>
    );
  }

  const done = list.filter((p) => p.solved).length;
  return (
    <div className="card">
      <h2>{t('codingPractice', { defaultValue: 'Coding practice' })}</h2>
      <p className="muted small">{done}/{list.length} {t('solvedLabel', { defaultValue: 'solved' })} | C, C++, Java, Python, JavaScript</p>
      {list.map((p) => (
        <div key={p.id} className="subjhead row">
          <span className={'tick' + (p.solved ? ' done' : '')}>{p.solved ? '✓' : ''}</span>
          <strong>{p.title}</strong>
          <span className="tag">{p.level}</span>
          <button className="secondary" style={{ border: 'none', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }} onClick={() => open(p)}>{t('solve', { defaultValue: 'Solve' })}</button>
        </div>
      ))}
    </div>
  );
}
