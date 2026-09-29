import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api.js';

export default function Verify() {
  const { code } = useParams();
  const [d, setD] = useState(null);
  useEffect(() => { api('/verify/' + encodeURIComponent(code)).then(setD).catch(() => setD({ valid: false })); }, [code]);
  if (!d) return <p>...</p>;
  return (
    <div className="card">
      <h2>Certificate verification</h2>
      {d.valid
        ? <p style={{ color: '#2b8a3e' }}><strong>Valid.</strong> {d.name} earned "{d.title}" on {String(d.issued_at).slice(0, 10)}.</p>
        : <p className="error">No certificate found for code {code}.</p>}
    </div>
  );
}