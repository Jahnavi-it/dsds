import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Login() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api('/login', { method: 'POST', body: { email, password } });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nav('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>{t('login')}</h2>
      <form onSubmit={submit}>
        <input placeholder={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder={t('password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        <button className="primary" type="submit">{t('login')}</button>
      </form>
      <p>{t('noAccount')} <Link to="/register">{t('register')}</Link></p>
    </div>
  );
}
