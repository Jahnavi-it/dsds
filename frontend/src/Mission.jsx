import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Mission({ user, result }) {
  const { t } = useTranslation();
  const today = new Date().toLocaleDateString('en-CA');
  const key = 'mission_' + (user.id || user.email) + '_' + today;
  const [done, setDone] = useState({});

  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(key)) || {}); } catch (e) { setDone({}); }
  }, [key]);

  if (result === undefined) return null;

  const toggle = (id) => {
    const next = { ...done, [id]: !done[id] };
    setDone(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch (e) { /* ignore */ }
  };

  const cats = result && result.categories ? [...result.categories].sort((a, b) => a.percent - b.percent) : [];
  const weak = cats[0];
  const weakName = weak ? t('cat_' + weak.category, { defaultValue: weak.category }) : '';

  const tasks = [
    weak
      ? { id: 'learn', to: '/learn', text: t('missionLearn', { name: weakName, defaultValue: 'Learn: {{name}} (20 min)' }) }
      : { id: 'assess', to: '/assessment', text: t('missionAssess', { defaultValue: 'Take the placement assessment' }) },
    { id: 'practice', to: '/mock', text: t('missionPractice', { defaultValue: 'Practice: attempt a mock test' }) },
    { id: 'coding', to: '/coding', text: t('missionCoding', { defaultValue: 'Coding: solve 1 easy problem' }) },
    { id: 'interview', to: '/interview', text: t('missionInterview', { defaultValue: 'Interview: answer 2 HR questions' }) },
  ];
  const count = tasks.filter((x) => done[x.id]).length;

  return (
    <div className="card mission">
      <h3>{t('missionTitle', { defaultValue: "Today's Placement Mission" })}</h3>
      {weak && <p className="muted small">{t('missionPriority', { defaultValue: 'Priority' })}: <strong>{weakName}</strong> ({weak.percent}%)</p>}
      {tasks.map((x) => (
        <div key={x.id} className={'missiontask' + (done[x.id] ? ' done' : '')}>
          <input type="checkbox" checked={!!done[x.id]} onChange={() => toggle(x.id)} />
          <span className="missiontext">{x.text}</span>
          <Link to={x.to} className="actionbtn">{t('missionOpen', { defaultValue: 'Open' })}</Link>
        </div>
      ))}
      <div className="rowhead"><span className="muted small">{t('missionProgress', { done: count, total: tasks.length, defaultValue: '{{done}}/{{total}} completed' })}</span></div>
      <div className="bar"><div style={{ width: (count / tasks.length) * 100 + '%', height: '100%', borderRadius: 'inherit', background: '#3b5bdb' }} /></div>
    </div>
  );
}
