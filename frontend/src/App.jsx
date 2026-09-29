import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Assessment from './pages/Assessment.jsx';
import Result from './pages/Result.jsx';
import Learn from './pages/Learn.jsx';
import Subject from './pages/Subject.jsx';
import Topic from './pages/Topic.jsx';
import Companies from './pages/Companies.jsx';
import Company from './pages/Company.jsx';
import Practice from './pages/Practice.jsx';
import Admin from './pages/Admin.jsx';
import Mock from './pages/Mock.jsx';
import Progress from './pages/Progress.jsx';

const langs = [
  { code: 'en', label: 'English' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'hi', label: 'हिन्दी' }
];

export default function App() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const token = localStorage.getItem('token');

  const setLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    document.documentElement.lang = code;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    nav('/login');
  };

  return (
    <div>
      <header className="topbar">
        <strong className="brand">{t('appName')}</strong>
        <div className="actions">
          {langs.map((l) => (
            <button
              key={l.code}
              className={i18n.language === l.code ? 'chip active' : 'chip'}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
          {token && <button className="chip" onClick={logout}>{t('logout')}</button>}
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/result" element={<Result />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:subject" element={<Subject />} />
          <Route path="/learn/:subject/:idx" element={<Topic />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<Company />} />
          <Route path="/companies/:id/practice" element={<Practice />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/mock" element={<Mock />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </main>
    </div>
  );
}