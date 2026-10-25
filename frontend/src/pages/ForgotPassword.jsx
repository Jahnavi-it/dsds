import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';
import Logo from '../Logo.jsx';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const d = await api('/forgot-password', { method: 'POST', body: { email } });
      setMsg(d.message);
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  return (
    <div className="card">
      <div className="brand"><div className="brandlogo"><Logo size={56} /></div><h1>{t('appName')}</h1></div>
      <h2>{t('forgotTitle', { defaultValue: 'Forgot password' })}</h2>
      {msg ? (
        <div>
          <p>{msg}</p>
          <p className="muted small">{t('resetValid', { defaultValue: 'The link works once and expires in 30 minutes.' })}</p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <p className="muted small">{t('forgotIntro', { defaultValue: 'Enter the email you registered with. We will send you a link to choose a new password.' })}</p>
          <input placeholder={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {error && <div className="error">{error}</div>}
          <button className="primary" type="submit" disabled={busy}>{busy ? '...' : t('sendResetLink', { defaultValue: 'Send reset link' })}</button>
        </form>
      )}
      <p><Link to="/login">{t('backToLogin', { defaultValue: 'Back to login' })}</Link></p>
    </div>
  );
}
