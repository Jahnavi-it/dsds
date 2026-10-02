import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

const EMPTY = {
  name: '', email: '', phone: '', college: '', branch: '', year: '', cgpa: '',
  summary: '', skills: '', projects: '', achievements: ''
};

const FIELDS = [
  ['name', 'Full name', 'input'], ['email', 'Email', 'input'], ['phone', 'Phone', 'input'],
  ['college', 'College', 'input'], ['branch', 'Branch', 'input'], ['year', 'Year', 'input'],
  ['cgpa', 'CGPA', 'input'], ['summary', 'Career objective', 'area'],
  ['skills', 'Skills (comma separated)', 'input'], ['projects', 'Projects (one per line)', 'area'],
  ['achievements', 'Achievements (one per line)', 'area']
];

const lines = (s) => String(s || '').split('\n').map((x) => x.trim()).filter(Boolean);

export default function Resume() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [f, setF] = useState(EMPTY);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api('/resume')
      .then((d) => { if (d.resume) setF({ ...EMPTY, ...d.resume }); })
      .catch(() => nav('/login'));
    // eslint-disable-next-line
  }, []);

  const set = (k) => (e) => { setMsg(''); setF({ ...f, [k]: e.target.value }); };

  const save = async () => {
    setError('');
    setMsg('');
    setBusy(true);
    try {
      await api('/resume', { method: 'POST', body: { data: f } });
      setMsg(t('saved', { defaultValue: 'Saved' }));
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  };

  const skills = String(f.skills || '').split(',').map((x) => x.trim()).filter(Boolean);
  const box = { width: '100%', boxSizing: 'border-box', padding: 10, border: '1px solid #c9cfe3', borderRadius: 8, fontSize: 15 };

  return (
    <div>
      <div className="card no-print">
        <h2>{t('resumeBuilder', { defaultValue: 'Resume builder' })}</h2>
        <div className="stack">
          {FIELDS.map(([k, label, kind]) => (
            <label key={k} className="small muted">
              {t('rf_' + k, { defaultValue: label })}
              {kind === 'area'
                ? <textarea rows={3} style={box} value={f[k]} onChange={set(k)} />
                : <input style={box} value={f[k]} onChange={set(k)} />}
            </label>
          ))}
        </div>
        {error && <p className="error">{error}</p>}
        {msg && <p className="muted">{msg}</p>}
        <button className="primary wide" onClick={save} disabled={busy}>{t('save', { defaultValue: 'Save' })}</button>
        <button className="secondary wide" style={{ padding: 11, border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }} onClick={() => window.print()}>
          {t('printPdf', { defaultValue: 'Print / Save as PDF' })}
        </button>
      </div>

      <div className="card" id="resume-preview">
        <h2 style={{ marginBottom: 4 }}>{f.name || t('yourName', { defaultValue: 'Your name' })}</h2>
        <p className="muted small">{[f.email, f.phone].filter(Boolean).join(' | ')}</p>
        {(f.college || f.branch) && (
          <p><strong>{t('education', { defaultValue: 'Education' })}:</strong> {[f.college, f.branch, f.year && ('Year ' + f.year), f.cgpa && ('CGPA ' + f.cgpa)].filter(Boolean).join(', ')}</p>
        )}
        {f.summary && <p>{f.summary}</p>}
        {skills.length > 0 && (
          <div>
            <strong>{t('skills', { defaultValue: 'Skills' })}</strong>
            <div className="chips" style={{ marginTop: 6 }}>{skills.map((s) => <span key={s} className="tag">{s}</span>)}</div>
          </div>
        )}
        {lines(f.projects).length > 0 && (
          <div style={{ marginTop: 12 }}>
            <strong>{t('projects', { defaultValue: 'Projects' })}</strong>
            <ul className="notes">{lines(f.projects).map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        )}
        {lines(f.achievements).length > 0 && (
          <div>
            <strong>{t('achievements', { defaultValue: 'Achievements' })}</strong>
            <ul className="notes">{lines(f.achievements).map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
