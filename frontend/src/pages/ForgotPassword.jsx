import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';
import Logo from '../Logo.jsx';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [f, setF] = useState({ email: '', name: '', college: '', password: '', again: '' });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (f.password !== f.again) { setError(t('passMismatch', { defaultValue: 'The two passwords do not match' })); return; }
    setBusy(true);
    try {
      await api('/reset-password-by-details', { method: 'POST', body: { email: f.email, name: f.name, college: f.college, password: f.password } });
      setDone(true);
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  return (
    <div className="card">
      <div className="brand"><div className="brandlogo"><Logo size={56} /></div><h1>{t('appName')}</h1></div>
      <h2>{t('forgotTitle', { defaultValue: 'Forgot password' })}</h2>
      {done ? (
        <div>
          <p>{t('resetDone', { defaultValue: 'Your password was changed. You can log in with the new password now.' })}</p>
          <Link className="primary linkbtn" to="/login">{t('login')}</Link>
        </div>
      ) : (
        <form onSubmit={submit}>
          <p className="muted small">{t('forgotIntro', { defaultValue: 'Enter the details you used when you registered, then choose a new password.' })}</p>
          <input placeholder={t('email')} type="email" value={f.email} onChange={set('email')} required />
          <input placeholder={t('fullName', { defaultValue: 'Full name (as registered)' })} value={f.name} onChange={set('name')} required />
          <input placeholder={t('college', { defaultValue: 'College (as registered, empty if you left it blank)' })} value={f.college} onChange={set('college')} />
          <input placeholder={t('newPassword', { defaultValue: 'New password (at least 6 characters)' })} type="password" value={f.password} onChange={set('password')} required minLength={6} />
          <input placeholder={t('confirmPassword', { defaultValue: 'Confirm new password' })} type="password" value={f.again} onChange={set('again')} required minLength={6} />
          {error && <div className="error">{error}</div>}
          <button className="primary" type="submit" disabled={busy}>{busy ? '...' : t('savePassword', { defaultValue: 'Save new password' })}</button>
        </form>
      )}
      {!done && <p><Link to="/login">{t('backToLogin', { defaultValue: 'Back to login' })}</Link></p>}
    </div>
  );
}
