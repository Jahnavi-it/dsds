import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Register() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', password: '', college: '', branch: 'IT', year: 3 });
  const [error, setError] = useState('');

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api('/register', {
        method: 'POST',
        body: { ...f, year: Number(f.year), language: i18n.language }
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nav('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <div className="brand"><h1>{t('appName')}</h1><p className="tagline">{t('tagline', { defaultValue: 'Your Journey. Your Skills. Your Placement.' })}</p></div><h2>{t('register')}</h2>
      <form onSubmit={submit}>
        <input placeholder={t('name')} value={f.name} onChange={set('name')} required />
        <input placeholder={t('email')} type="email" value={f.email} onChange={set('email')} required />
        <input placeholder={t('password')} type="password" value={f.password} onChange={set('password')} required minLength={6} />
        <input placeholder={t('college')} value={f.college} onChange={set('college')} />
        <select value={f.branch} onChange={set('branch')}>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
        </select>
        <select value={f.year} onChange={set('year')}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        {error && <div className="error">{error}</div>}
        <button className="primary" type="submit">{t('register')}</button>
      </form>
      <p>{t('haveAccount')} <Link to="/login">{t('login')}</Link></p>
    </div>
  );
}