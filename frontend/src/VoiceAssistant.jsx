import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { listen, speak, speechSupported, stopSpeaking, voiceErrorText } from './voice.js';

// Order matters: first match wins (mock before interview).
const COMMANDS = [
  { path: '/mock', words: ['mock'] },
  { path: '/interview', words: ['interview'] },
  { path: '/resume', words: ['resume', 'cv'] },
  { path: '/passport', words: ['passport'] },
  { path: '/coding', words: ['coding', 'code'] },
  { path: '/notes', words: ['notes', 'note'] },
  { path: '/assessment', words: ['assessment', 'test', 'exam'] },
  { path: '/companies', words: ['company', 'companies', 'placement'] },
  { path: '/learn', words: ['learn', 'lesson', 'study', 'course'] },
  { path: '/progress', words: ['progress', 'report'] },
  { path: '/dashboard', words: ['dashboard', 'home'] }
];

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
    const said = text.toLowerCase();
    const hit = COMMANDS.find((c) => c.words.some((w) => said.includes(w)));
    if (hit) {
      const reply = t('voiceOpening', { defaultValue: 'Opening' });
      setMsg(reply + ': ' + text);
      speak(reply, i18n.language);
      nav(hit.path);
    } else {
      const reply = t('voiceNoMatch', { defaultValue: 'Sorry, I did not understand. Try: open dashboard, mock interview, resume, notes.' });
      setMsg(reply);
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
