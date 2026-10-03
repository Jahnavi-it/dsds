import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LEVEL_LABEL = { low: 'Needs attention', mid: 'Improving', high: 'Strong' };

export default function ActionEngine({ result }) {
  const { t } = useTranslation();
  if (!result || !result.categories || !result.categories.length) return null;

  const sorted = [...result.categories].sort((a, b) => a.percent - b.percent);
  const weak = sorted.filter((c) => c.percent < 70).slice(0, 3);

  return (
    <div className="card">
      <h3>{t('actionEngine', { defaultValue: 'Priority actions' })}</h3>
      {weak.length === 0 && <p className="muted">{t('allStrong', { defaultValue: 'All areas look strong. Keep practicing with mock tests.' })}</p>}
      {weak.map((c, i) => (
        <div key={c.category} className="actionrow">
          <div className="rowhead">
            <span><strong>{i + 1}. {t('cat_' + c.category, { defaultValue: c.category })}</strong></span>
            <span className={'lvl ' + c.level}>{c.percent}%</span>
          </div>
          <div className="bar"><div className={'fill ' + c.level} style={{ width: c.percent + '%' }} /></div>
          <div className="actionlinks">
            <Link to="/learn" className="actionbtn">{t('actLearn', { defaultValue: 'Learn' })}</Link>
            <Link to="/mock" className="actionbtn">{t('actPractice', { defaultValue: 'Practice' })}</Link>
            <Link to="/assessment" className="actionbtn">{t('actRecheck', { defaultValue: 'Re-assess' })}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
