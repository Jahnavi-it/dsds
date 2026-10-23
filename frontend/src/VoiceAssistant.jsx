import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { listen, speak, speechSupported, stopSpeaking, voiceErrorText } from './voice.js';

// Order matters: first match wins (mock before interview).
const COMMANDS = [
  { path: '/mock', words: ['mock'] },
  { path: '/interview', words: ['interview'] },
  { path: '/resume', words: ['resume', 'cv', 'biodata'] },
  { path: '/passport', words: ['passport', 'certificate', 'certificates'] },
  { path: '/coding', words: ['coding', 'code', 'program', 'programming'] },
  { path: '/notes', words: ['notes', 'note'] },
  { path: '/mistakes', words: ['mistake', 'mistakes'] },
  { path: '/growth', words: ['growth', 'grow'] },
  { path: '/simulator', words: ['simulator', 'simulation', 'drive'] },
  { path: '/result', words: ['roadmap', 'result', 'results'] },
  { path: '/assessment', words: ['assessment', 'assess', 'test', 'exam', 'skill'] },
  { path: '/companies', words: ['company', 'companies', 'preparation', 'placement'] },
  { path: '/learn', words: ['learn', 'learning', 'hub', 'lesson', 'study', 'course'] },
  { path: '/progress', words: ['progress', 'report'] },
  { path: '/dashboard', words: ['dashboard', 'home', 'main'] }
];

// small edit distance so "coating" still matches "coding"
function close(a, b) {
  if (a === b) return true;
  if (b.length < 5 || Math.abs(a.length - b.length) > 1) return false;
  const m = [];
  for (let i = 0; i <= a.length; i++) { m[i] = [i]; }
  for (let j = 0; j <= b.length; j++) { m[0][j] = j; }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return m[a.length][b.length] <= 1;
}

function findCommand(text) {
  const said = text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ');
  const spoken = said.split(/\s+/).filter(Boolean);
  return COMMANDS.find((c) => c.words.some((w) => said.includes(w) || spoken.some((x) => close(x, w))));
}

export default function VoiceAssistant() {
  const nav = useNavigate();
  const loc = useLocation();
  const { t, i18n } = useTranslation();
  const [on, setOn] = useState(false);
  const [msg, setMsg] = useState('');
  const recRef = useRef(null);

  useEffect(() => () => {
    if (recRef.current) recRef.current.abort();
    stopSpeaking();
  }, []);

  if (!speechSupported() || ['/mock', '/interview', '/simulator'].includes(loc.pathname)) return null;

  function handle(text) {
    const hit = findCommand(text);
    if (hit) {
      const reply = t('voiceOpening', { defaultValue: 'Opening' });
      setMsg(reply + ': ' + text);
      speak(reply, i18n.language);
      nav(hit.path);
    } else {
      const reply = t('voiceNoMatch', { defaultValue: 'Sorry, I did not understand. Try: open dashboard, mock test, interview, coding practice, resume, notes, company preparation.' });
      setMsg(reply + ' (' + t('voiceHeard', { defaultValue: 'I heard' }) + ': ' + text + ')');
      speak(reply, i18n.language);
    }
  }

  function toggle() {
    if (on && recRef.current) {
      recRef.current.stop();
      return;
    }
    stopSpeaking();
    setMsg(t('voiceListening', { defaultValue: 'Listening...' }));
    setOn(true);
    // Commands are matched against English keywords, so listen in English.
    recRef.current = listen({
      lang: 'en',
      onResult: handle,
      onError: (e) => setMsg(voiceErrorText(e)),
      onEnd: () => setOn(false)
    });
  }

  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
      {msg && (
        <div style={{ background: '#12142B', color: '#fff', padding: '8px 12px', borderRadius: 10, fontSize: 13, maxWidth: 260 }}>{msg}</div>
      )}
      <button
        onClick={toggle}
        aria-label="Voice assistant"
        style={{ width: 52, height: 52, borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: 22, color: '#fff', background: on ? '#e03131' : '#5b5bd6' }}
      >
        {on ? '\u25A0' : '\u{1F3A4}'}
      </button>
    </div>
  );
}
