import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const items = [
  ['/dashboard', 'navHome', 'Dashboard'],
  ['/assessment', 'takeAssessment', 'Assessment'],
  ['/result', 'viewRoadmap', 'Roadmap'],
  ['/learn', 'openLearning', 'Learning Hub'],
  ['/companies', 'companyPrep', 'Company prep'],
  ['/mock', 'mockTest', 'Mock test'],
  ['/interview', 'interviewTile', 'Interview'],
  ['/coding', 'codingPractice', 'Coding practice'],
  ['/notes', 'notesTile', 'Notes'],
  ['/resume', 'resumeTile', 'Resume'],
  ['/progress', 'progress', 'My progress'],
  ['/passport', 'passport', 'Placement passport'],
];

export default function Sidebar() {
  const { t } = useTranslation();
  return (
    <nav className="sidebar">
      {items.map(([to, key, def]) => (
        <NavLink key={to} to={to} className={({ isActive }) => 'sidelink' + (isActive ? ' active' : '')}>
          {t(key, { defaultValue: def })}
        </NavLink>
      ))}
    </nav>
  );
}
