import './i18n.js';
import i18n from 'i18next';

const tr = {
  en: {
    passport: 'Placement passport', readiness: 'Placement readiness', certificates: 'Certificates',
    interviewTile: 'Interview', codingPractice: 'Coding practice', resumeTile: 'Resume', notesTile: 'Notes',
    navHome: 'Dashboard', quickActions: 'Quick actions',
    tileAssess: 'Find your skill gaps', tileLearn: 'Videos and lessons', tileMock: 'Timed practice tests', tileInterview: 'Technical and HR practice',
    goodMorning: 'Good morning', goodAfternoon: 'Good afternoon', goodEvening: 'Good evening'
  },
  te: {
    passport: 'ప్లేస్‌మెంట్ పాస్‌పోర్ట్', readiness: 'ప్లేస్‌మెంట్ సన్నద్ధత', certificates: 'సర్టిఫికెట్లు',
    interviewTile: 'ఇంటర్వ్యూ', codingPractice: 'కోడింగ్ ప్రాక్టీస్', resumeTile: 'రెజ్యూమ్', notesTile: 'నోట్స్',
    navHome: 'డాష్‌బోర్డ్', quickActions: 'త్వరిత చర్యలు',
    tileAssess: 'మీ నైపుణ్య లోపాలను తెలుసుకోండి', tileLearn: 'వీడియోలు మరియు పాఠాలు', tileMock: 'సమయ పరిమితితో ప్రాక్టీస్ టెస్టులు', tileInterview: 'టెక్నికల్ మరియు HR ప్రాక్టీస్',
    goodMorning: 'శుభోదయం', goodAfternoon: 'శుభ మధ్యాహ్నం', goodEvening: 'శుభ సాయంత్రం'
  },
  hi: {
    passport: 'प्लेसमेंट पासपोर्ट', readiness: 'प्लेसमेंट तैयारी', certificates: 'प्रमाणपत्र',
    interviewTile: 'इंटरव्यू', codingPractice: 'कोडिंग अभ्यास', resumeTile: 'रिज्यूमे', notesTile: 'नोट्स',
    navHome: 'डैशबोर्ड', quickActions: 'त्वरित कार्य',
    tileAssess: 'अपनी स्किल गैप जानें', tileLearn: 'वीडियो और पाठ', tileMock: 'समयबद्ध अभ्यास टेस्ट', tileInterview: 'टेक्निकल और HR अभ्यास',
    goodMorning: 'सुप्रभात', goodAfternoon: 'शुभ दोपहर', goodEvening: 'शुभ संध्या'
  }
};

Object.keys(tr).forEach((l) => i18n.addResourceBundle(l, 'translation', tr[l], true, true));