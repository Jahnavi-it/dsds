import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';
import Logo from '../Logo.jsx';

export default function ResetPassword() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [again, setAgain] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== again) { setError(t('passMismatch', { defaultValue: 'The two passwords do not match' })); return; }
    setBusy(true);
    try {
      await api('/reset-password', { method: 'POST', body: { token, password } });
      setDone(true);
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  return (
    <div className="card">
      <div className="brand"><div className="brandlogo"><Logo size={56} /></div><h1>{t('appName')}</h1></div>
      <h2>{t('resetTitle', { defaultValue: 'Choose a new password' })}</h2>
      {done ? (
        <div>
          <p>{t('resetDone', { defaultValue: 'Your password was changed. We also sent you a confirmation email.' })}</p>
          <Link className="primary linkbtn" to="/login">{t('login')}</Link>
        </div>
      ) : !token ? (
        <div>
          <p className="error">{t('noToken', { defaultValue: 'This link is not complete. Please open the link from your email, or request a new one.' })}</p>
          <Link to="/forgot-password">{t('forgotTitle', { defaultValue: 'Forgot password' })}</Link>
        </div>
      ) : (
        <form onSubmit={submit}>
          <input placeholder={t('newPassword', { defaultValue: 'New password (at least 6 characters)' })} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          <input placeholder={t('confirmPassword', { defaultValue: 'Confirm new password' })} type="password" value={again} onChange={(e) => setAgain(e.target.value)} required minLength={6} />
          {error && <div className="error">{error}</div>}
          <button className="primary" type="submit" disabled={busy}>{busy ? '...' : t('savePassword', { defaultValue: 'Save password' })}</button>
        </form>
      )}
      {error && !token && null}
      {!done && token && error && (
        <p className="small"><Link to="/forgot-password">{t('requestNew', { defaultValue: 'Request a new link' })}</Link></p>
      )}
    </div>
  );
}
