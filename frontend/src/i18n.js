import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: {
    appName: 'DSDS.edu',
    login: 'Login', register: 'Register', logout: 'Logout',
    email: 'Email', password: 'Password', name: 'Name',
    college: 'College', branch: 'Branch', year: 'Year',
    noAccount: "Don't have an account?", haveAccount: 'Already have an account?',
    welcome: 'Welcome', dashboard: 'Your placement journey starts here'
  } },
  te: { translation: {
    appName: 'DSDS.edu',
    login: 'లాగిన్', register: 'నమోదు చేసుకోండి', logout: 'లాగౌట్',
    email: 'ఇమెయిల్', password: 'పాస్వర్డ్', name: 'పేరు',
    college: 'కళాశాల', branch: 'బ్రాంచ్', year: 'సంవత్సరం',
    noAccount: 'ఖాతా లేదా?', haveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    welcome: 'స్వాగతం', dashboard: 'మీ ప్లేస్మెంట్ ప్రయాణం ఇక్కడ మొదలవుతుంది'
  } },
  hi: { translation: {
    appName: 'DSDS.edu',
    login: 'लॉगिन', register: 'रजिस्टर करें', logout: 'लॉगआउट',
    email: 'ईमेल', password: 'पासवर्ड', name: 'नाम',
    college: 'कॉलेज', branch: 'ब्रांच', year: 'वर्ष',
    noAccount: 'खाता नहीं है?', haveAccount: 'पहले से खाता है?',
    welcome: 'स्वागत है', dashboard: 'आपकी प्लेसमेंट यात्रा यहाँ से शुरू होती है'
  } }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
