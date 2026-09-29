import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';

const fmt = (s) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');

export default function Progress() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [data, setData] = useState(null);
  const tz = -new Date().getTimezoneOffset();

  const load = () =>
    api('/progress?tz=' + tz).then(setData).catch(() => nav('/login'));

  useEffect(() => { load(); }, []);

  const checkin = async () => {
    await api('/progress/checkin', { method: 'POST', body: {} });
    load();
  };

  if (!data) return <p>...</p>;

  return (
    <div>
      <div className="card">
        <h2>{t('progress')}</h2>
        <div className="streakrow">
          <div className="streakbox"><div className="big">{data.currentStreak}</div><div className="muted small">{t('currentStreak')} ({t('daysUnit')})</div></div>
          <div className="streakbox"><div className="big">{data.longestStreak}</div><div className="muted small">{t('longestStreak')} ({t('daysUnit')})</div></div>
          <div className="streakbox"><div className="big">{data.activeDays}</div><div className="muted small">{t('activeDays')}</div></div>
        </div>
        <button className="primary wide" disabled={data.activeToday} onClick={checkin}>
          {data.activeToday ? t('checkedIn') : t('checkin')}
        </button>
      </div>

      <div className="card">
        <h3>{t('last14')}</h3>
        <div className="days">
          {data.last14.map((d) => (
            <div key={d.date} className={d.active ? 'day on' : 'day'} title={d.date} />
          ))}
        </div>
      </div>

      <div className="card">
        <h3>{t('mockHistory')}</h3>
        {data.mocks.length === 0 && <p className="muted">{t('noMocks')}</p>}
        {data.mocks.map((m) => (
          <div key={m.id} className="row">
            <div className="rowhead">
              <span>{m.company ? m.company.toUpperCase() : t('general')}</span>
              <span>{m.score}/{m.total} | {fmt(m.seconds)}</span>
            </div>
            <div className="bar"><div className="fill" style={{ width: Math.round((m.score / m.total) * 100) + '%' }} /></div>
          </div>
        ))}
        <Link to="/mock" className="primary wide linkbtn">{t('mockTest')}</Link>
      </div>
    </div>
  );
}