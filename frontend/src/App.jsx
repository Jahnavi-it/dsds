import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
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
import Interview from './pages/Interview.jsx';
import Resume from './pages/Resume.jsx';
import Passport from './pages/Passport.jsx';
import Coding from './pages/Coding.jsx';
import Notes from './pages/Notes.jsx';
import Verify from './pages/Verify.jsx';
import Sidebar from './Sidebar.jsx';
import Logo from './Logo.jsx';
import Mistakes from './pages/Mistakes.jsx';
import Growth from './pages/Growth.jsx';
import Simulator from './pages/Simulator.jsx';
import './i18nExtra.js';
import VoiceAssistant from './VoiceAssistant.jsx';

const langs = [
  { code: 'en', label: 'English' },
  { code: 'te', label: '\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41' },
  { code: 'hi', label: '\u0939\u093F\u0928\u094D\u0926\u0940' }
];

export default function App() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const loc = useLocation();
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

  // First page for visitors who are not logged in: the NEXORA home page, full width, no app header
  if (loc.pathname === '/' && !token) return <Landing />;

  return (
    <div>
      <header className="topbar">
        <strong className="topbrand"><Link to="/" className="topbrand-link"><Logo size={30} /><span>{t('appName')}</span></Link></strong>
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
        {token && <Sidebar />}
<Routes>
          <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
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
<Route path="/interview" element={<Interview />} /><Route path="/mistakes" element={<Mistakes />} /><Route path="/growth" element={<Growth />} /><Route path="/simulator" element={<Simulator />} />
        <Route path="/resume" element={<Resume />} /><Route path="/passport" element={<Passport />} /><Route path="/coding" element={<Coding />} /><Route path="/notes" element={<Notes />} /><Route path="/notes/:id" element={<Notes />} /><Route path="/verify/:code" element={<Verify />} /><Route path="/verify" element={<Verify />} />
        </Routes>
{token && <VoiceAssistant />}
      </main>
    </div>
  );
}

