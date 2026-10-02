import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

export default function Dashboard() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(undefined);
  const [pp, setPp] = useState(null);

  useEffect(() => {
    api('/me')
      .then((d) => setUser(d.user))
      .catch(() => {
        localStorage.removeItem('token');
        nav('/login');
      });
    api('/assessment/result')
      .then((d) => setResult(d.result))
      .catch(() => setResult(null));
    api('/passport').then(setPp).catch(() => setPp(null));
  }, [nav]);

  if (!user) return <p>...</p>;

  const avg = result && result.categories.length
    ? Math.round(result.categories.reduce((s, c) => s + c.percent, 0) / result.categories.length)
    : null;
  const certs = pp && pp.certs ? pp.certs.filter((c) => c.code).length : 0;

  const tiles = [
    { to: '/assessment', title: t('takeAssessment'), sub: t('tileAssess', { defaultValue: 'Find your skill gaps' }) },
    { to: '/result', title: t('viewRoadmap'), sub: t('tileRoadmap', { defaultValue: 'Your personalised plan' }) },
    { to: '/learn', title: t('openLearning'), sub: t('tileLearn', { defaultValue: 'Videos and lessons' }) },
    { to: '/companies', title: t('companyPrep'), sub: t('tileCompany', { defaultValue: 'Company-wise preparation' }) },
    { to: '/mock', title: t('mockTest'), sub: t('tileMock', { defaultValue: 'Timed practice tests' }) },
    { to: '/progress', title: t('progress'), sub: t('tileProgress', { defaultValue: 'Track your growth' }) },
    { to: '/interview', title: t('interviewTile', { defaultValue: 'Interview' }), sub: t('tileInterview', { defaultValue: 'Technical and HR practice' }) },
    { to: '/coding', title: t('codingPractice', { defaultValue: 'Coding practice' }), sub: t('tileCoding', { defaultValue: 'Solve and run tests' }) },
    { to: '/resume', title: t('resumeTile', { defaultValue: 'Resume' }), sub: t('tileResume', { defaultValue: 'Build and print' }) },
    { to: '/passport', title: t('passport', { defaultValue: 'Placement passport' }), sub: t('tilePassport', { defaultValue: 'Readiness and certificates' }) },
  ];
  if (user.role === 'admin') tiles.push({ to: '/admin', title: t('adminPanel'), sub: 'Admin' });

  return (
    <div>
      <div className="hero">
        <div>
          <h2>{t('welcome')}, {user.name}!</h2>
          <p className="herosub">{[user.college, user.branch, user.year ? t('year') + ' ' + user.year : ''].filter(Boolean).join(' | ')}</p>
        </div>
        <Link to="/passport" className="herobtn">{t('passport', { defaultValue: 'Placement passport' })}</Link>
      </div>

      <div className="stats">
        <div className="stat"><div className="statnum">{pp ? pp.readiness + '%' : '--'}</div><div className="statlbl">{t('readiness', { defaultValue: 'Placement readiness' })}</div></div>
        <div className="stat"><div className="statnum">{avg === null ? '--' : avg + '%'}</div><div className="statlbl">{t('avgScore', { defaultValue: 'Assessment average' })}</div></div>
        <div className="stat"><div className="statnum">{certs}</div><div className="statlbl">{t('certificates', { defaultValue: 'Certificates' })}</div></div>
      </div>

      <div className="tiles">
        {tiles.map((x) => (
          <Link key={x.to} to={x.to} className="tile">
            <strong>{x.title}</strong>
            <span>{x.sub}</span>
          </Link>
        ))}
      </div>

      <div className="card">
        <h3>{t('gapChart')}</h3>
        {result === undefined && <p>...</p>}
        {result === null && <p className="muted">{t('noAssessmentYet')}</p>}
        {result && result.categories.map((c) => (
          <div key={c.category} className="row">
            <div className="rowhead">
              <span>{t('cat_' + c.category)}</span>
              <span className={'lvl ' + c.level}>{c.percent}%</span>
            </div>
            <div className="bar"><div className={'fill ' + c.level} style={{ width: c.percent + '%' }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
