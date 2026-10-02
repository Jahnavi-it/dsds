const LANGS = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };

export const langCode = (l) => LANGS[(l || 'en').slice(0, 2)] || 'en-IN';

const SR = () => (typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null);

export const speechSupported = () => !!SR();

export function speak(text, lang) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = langCode(lang);
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
}

export function listen({ lang, onResult, onError, onEnd }) {
  const Rec = SR();
  if (!Rec) {
    if (onError) onError('unsupported');
    return null;
  }
  const rec = new Rec();
  rec.lang = langCode(lang);
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = (e) => onResult && onResult(e.results[0][0].transcript);
  rec.onerror = (e) => onError && onError(e.error);
  rec.onend = () => onEnd && onEnd();
  rec.start();
  return rec;
}
