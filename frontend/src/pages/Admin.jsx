import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

const levelOf = (p) => (p < 50 ? 'beginner' : p < 75 ? 'intermediate' : 'strong');

export default function Admin() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [data, setData] = useState(null);
  const [denied, setDenied] = useState(false);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    api('/admin/dashboard?branch=' + branch + '&year=' + year)
      .then((d) => { setDenied(false); setData(d); })
      .catch((e) => {
        if (e.message === 'Admins only') setDenied(true);
        else nav('/login');
      });
  }, [branch, year, nav]);

  if (denied) return <div className="card"><p className="error">{t('notAdmin')}</p></div>;
  if (!data) return <p>...</p>;

  const o = data.overview;
  const box = (label, value) => (
    <div className="streakbox"><div className="big">{value}</div><div className="muted small">{label}</div></div>
  );

  return (
    <div>
      <div className="card">
        <h2>{t('adminPanel')}</h2>
        <div style={{ display: 'flex', gap: 8, margin: '10px 0' }}>
          <select value={branch} onChange={(e) => setBranch(e.target.value)} style={{ flex: 1 }}>
            <option value="">{t('allBranches')}</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)} style={{ flex: 1 }}>
            <option value="">{t('allYears')}</option>
            {[1, 2, 3, 4].map((y) => <option key={y} value={y}>{t('year')} {y}</option>)}
          </select>
        </div>
        <div className="streakrow">
          {box(t('totalStudents'), o.total)}
          {box(t('assessedStudents'), o.assessed)}
          {box(t('active7'), o.active7)}
        </div>
        <div className="streakrow">
          {box(t('avgScore'), o.avgOverall === null ? '-' : o.avgOverall + '%')}
          {box(t('mockAvgLabel'), o.mockAvg === null ? '-' : o.mockAvg + '%')}
          {box(t('mocksTaken'), o.mockAttempts)}
        </div>
      </div>

      <div className="card">
        <h3>{t('categoryOverview')}</h3>
        {o.categories.length === 0 && <p className="muted">{t('noStudents')}</p>}
        {o.categories.map((c) => (
          <div key={c.category} className="row">
            <div className="rowhead">
              <span>{t('cat_' + c.category)}</span>
              <span className={'lvl ' + levelOf(c.avg)}>{c.avg}% | {c.weak}/{c.students} {t('weakStudents')}</span>
            </div>
            <div className="bar"><div className={'fill ' + levelOf(c.avg)} style={{ width: c.avg + '%' }} /></div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>{t('studentList')}</h3>
        {data.students.length === 0 && <p className="muted">{t('noStudents')}</p>}
        {data.students.map((s) => (
          <div key={s.id} className="row" style={{ cursor: 'pointer' }} onClick={() => setOpen(open === s.id ? null : s.id)}>
            <div className="rowhead">
              <strong>{s.name}</strong>
              {s.overall === null
                ? <span className="muted small">{t('notAssessed')}</span>
                : <span className={'lvl ' + levelOf(s.overall)}>{s.overall}%</span>}
            </div>
            <div className="muted small">
              {s.college} | {s.branch} | {t('year')} {s.year} | {t('lastActive')}: {s.lastActive ? s.lastActive.slice(0, 10) : t('never')}
            </div>
            {open === s.id && (
              <div style={{ marginTop: 8 }}>
                <div className="muted small">{s.email}</div>
                <div className="small">
                  {t('mocksTaken')}: {s.mocks}{s.mockAvg !== null ? ' (' + s.mockAvg + '%)' : ''}
                  {s.weakest && <span> | {t('weakestArea')}: {t('cat_' + s.weakest)}</span>}
                </div>
                {s.categories.map((c) => (
                  <div key={c.category} style={{ marginTop: 6 }}>
                    <div className="rowhead small"><span>{t('cat_' + c.category)}</span><span>{c.percent}%</span></div>
                    <div className="bar"><div className={'fill ' + levelOf(c.percent)} style={{ width: c.percent + '%' }} /></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}