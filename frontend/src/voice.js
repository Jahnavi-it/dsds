const LANGS = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };

export const langCode = (l) => LANGS[(l || 'en').slice(0, 2)] || 'en-IN';

const SR = () => (typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null);

export const speechSupported = () => !!SR();

const ERRORS = {
  'not-allowed': 'Microphone permission is blocked. Click the lock icon in the address bar, allow Microphone, then reload.',
  'service-not-allowed': 'Microphone permission is blocked. Click the lock icon in the address bar, allow Microphone, then reload.',
  'no-speech': 'I did not hear anything. Press the mic and speak right away.',
  'audio-capture': 'No microphone found. Check that a mic is connected and not used by another app.',
  network: 'Voice recognition needs internet (Chrome sends audio to Google). Check your connection.',
  unsupported: 'Voice input works only in Chrome or Edge.',
  'start-failed': 'Could not start the microphone. Reload the page and try again.',
  'language-not-supported': 'This language is not supported for voice input in your browser.',
  aborted: ''
};

export const voiceErrorText = (e) => (e in ERRORS ? ERRORS[e] : 'Voice error: ' + e);

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
    if (onEnd) onEnd();
    return null;
  }
  const rec = new Rec();
  rec.lang = langCode(lang);
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = (e) => onResult && onResult(e.results[0][0].transcript);
  rec.onerror = (e) => onError && onError(e.error);
  rec.onend = () => onEnd && onEnd();
  try {
    rec.start();
  } catch (err) {
    if (onError) onError('start-failed');
    if (onEnd) onEnd();
    return null;
  }
  return rec;
}
