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
i18n.addResourceBundle('en', 'translation', { tagline: 'Your Journey. Your Skills. Your Placement.' }, true, true);
i18n.addResourceBundle('te', 'translation', { tagline: 'మీ ప్రయాణం. మీ నైపుణ్యాలు. మీ ప్లేస్‌మెంట్.' }, true, true);
i18n.addResourceBundle('hi', 'translation', { tagline: 'आपकी यात्रा। आपके कौशल। आपका प्लेसमेंट।' }, true, true);
i18n.addResourceBundle('en', 'translation', {
  takeAssessment: 'Take Assessment', action_learn: 'Start Learning', action_practice: 'Practice Now',
  cat_reasoning: 'Reasoning', cat_aptitude: 'Aptitude', cat_verbal: 'Verbal Ability',
  cat_cn: 'Computer Networks', cat_os: 'Operating Systems', focusTopics: 'Focus Topics'
}, true, true);
i18n.addResourceBundle('te', 'translation', {
  takeAssessment: 'అసెస్‌మెంట్ తీసుకోండి', action_learn: 'నేర్చుకోవడం ప్రారంభించండి', action_practice: 'ఇప్పుడే ప్రాక్టీస్ చేయండి',
  cat_reasoning: 'రీజనింగ్', cat_aptitude: 'అప్టిట్యూడ్', cat_verbal: 'వెర్బల్ ఎబిలిటీ',
  cat_cn: 'కంప్యూటర్ నెట్‌వర్క్స్', cat_os: 'ఆపరేటింగ్ సిస్టమ్స్', focusTopics: 'ముఖ్య అంశాలు'
}, true, true);
i18n.addResourceBundle('hi', 'translation', {
  takeAssessment: 'असेसमेंट दें', action_learn: 'सीखना शुरू करें', action_practice: 'अभी अभ्यास करें',
  cat_reasoning: 'रीज़निंग', cat_aptitude: 'एप्टीट्यूड', cat_verbal: 'वर्बल एबिलिटी',
  cat_cn: 'कंप्यूटर नेटवर्क', cat_os: 'ऑपरेटिंग सिस्टम', focusTopics: 'मुख्य विषय'
}, true, true);
i18n.addResourceBundle('en', 'translation', {
  whyReadiness: 'Why this readiness score?', nextAction: 'Next recommended action', potential: 'Up to +{{n}}% readiness', goNow: 'Start now',
  part_assessment: 'Assessment', part_mock: 'Mock test', part_tech: 'Technical interview', part_hr: 'HR interview',
  part_coding: 'Coding', part_activity: 'Activity', part_resume: 'Resume'
}, true, true);
i18n.addResourceBundle('te', 'translation', {
  whyReadiness: 'ఈ రెడినెస్ స్కోరు ఎందుకు?', nextAction: 'తదుపరి సిఫార్సు చర్య', potential: 'రెడినెస్ +{{n}}% వరకు పెరుగుతుంది', goNow: 'ఇప్పుడే ప్రారంభించండి',
  part_assessment: 'అసెస్‌మెంట్', part_mock: 'మాక్ టెస్ట్', part_tech: 'టెక్నికల్ ఇంటర్వ్యూ', part_hr: 'HR ఇంటర్వ్యూ',
  part_coding: 'కోడింగ్', part_activity: 'యాక్టివిటీ', part_resume: 'రెజ్యూమ్'
}, true, true);
i18n.addResourceBundle('hi', 'translation', {
  whyReadiness: 'यह तैयारी स्कोर क्यों?', nextAction: 'अगली अनुशंसित कार्रवाई', potential: 'तैयारी +{{n}}% तक बढ़ेगी', goNow: 'अभी शुरू करें',
  part_assessment: 'असेसमेंट', part_mock: 'मॉक टेस्ट', part_tech: 'टेक्निकल इंटरव्यू', part_hr: 'HR इंटरव्यू',
  part_coding: 'कोडिंग', part_activity: 'गतिविधि', part_resume: 'रिज्यूमे'
}, true, true);
i18n.addResourceBundle('en', 'translation', {
  missionTitle: "Today's Placement Mission", missionPriority: 'Priority', missionLearn: 'Learn: {{name}} (20 min)', missionAssess: 'Take the placement assessment',
  missionPractice: 'Practice: attempt a mock test', missionCoding: 'Coding: solve 1 easy problem', missionInterview: 'Interview: answer 2 HR questions',
  missionProgress: '{{done}}/{{total}} completed', missionOpen: 'Open'
}, true, true);
i18n.addResourceBundle('te', 'translation', {
  missionTitle: 'నేటి ప్లేస్‌మెంట్ మిషన్', missionPriority: 'ప్రాధాన్యత', missionLearn: 'నేర్చుకోండి: {{name}} (20 నిమిషాలు)', missionAssess: 'ప్లేస్‌మెంట్ అసెస్‌మెంట్ తీసుకోండి',
  missionPractice: 'ప్రాక్టీస్: ఒక మాక్ టెస్ట్ రాయండి', missionCoding: 'కోడింగ్: 1 సులభమైన సమస్య పరిష్కరించండి', missionInterview: 'ఇంటర్వ్యూ: 2 HR ప్రశ్నలకు సమాధానం ఇవ్వండి',
  missionProgress: '{{done}}/{{total}} పూర్తయ్యాయి', missionOpen: 'తెరవండి'
}, true, true);
i18n.addResourceBundle('hi', 'translation', {
  missionTitle: 'आज का प्लेसमेंट मिशन', missionPriority: 'प्राथमिकता', missionLearn: 'सीखें: {{name}} (20 मिनट)', missionAssess: 'प्लेसमेंट असेसमेंट दें',
  missionPractice: 'अभ्यास: एक मॉक टेस्ट दें', missionCoding: 'कोडिंग: 1 आसान समस्या हल करें', missionInterview: 'इंटरव्यू: 2 HR प्रश्नों के उत्तर दें',
  missionProgress: '{{done}}/{{total}} पूरे', missionOpen: 'खोलें'
}, true, true);
i18n.addResourceBundle('en', 'translation', {
  matrixTitle: '{{name}} readiness matrix', matrixNotAssessed: 'Not assessed', matrixGap: 'Your preparation gap', matrixPrepare: 'Prepare for {{name}}'
}, true, true);
i18n.addResourceBundle('te', 'translation', {
  matrixTitle: '{{name}} సన్నద్ధత మ్యాట్రిక్స్', matrixNotAssessed: 'అంచనా వేయలేదు', matrixGap: 'మీ ప్రిపరేషన్ లోపం', matrixPrepare: '{{name}} కోసం సిద్ధం అవ్వండి'
}, true, true);
i18n.addResourceBundle('hi', 'translation', {
  matrixTitle: '{{name}} तैयारी मैट्रिक्स', matrixNotAssessed: 'आकलन नहीं हुआ', matrixGap: 'आपकी तैयारी की कमी', matrixPrepare: '{{name}} की तैयारी करें'
}, true, true);
i18n.addResourceBundle('en', 'translation', {
  mistakeBook: 'Mistake book', noMistakes: 'No mistakes saved yet. Wrong answers from your mock tests appear here, and disappear once you answer them correctly.', filterAll: 'All', practiceMore: 'Practice more in a mock test'
}, true, true);
i18n.addResourceBundle('te', 'translation', {
  mistakeBook: 'తప్పుల పుస్తకం', noMistakes: 'ఇంకా తప్పులు సేవ్ కాలేదు. మాక్ టెస్ట్‌లో తప్పు సమాధానాలు ఇక్కడ కనిపిస్తాయి, సరిగ్గా రాసిన తర్వాత తొలగిపోతాయి.', filterAll: 'అన్నీ', practiceMore: 'మాక్ టెస్ట్‌లో మరింత ప్రాక్టీస్ చేయండి'
}, true, true);
i18n.addResourceBundle('hi', 'translation', {
  mistakeBook: 'गलतियों की किताब', noMistakes: 'अभी कोई गलती सेव नहीं हुई। मॉक टेस्ट के गलत उत्तर यहाँ दिखेंगे और सही करने पर हट जाएंगे।', filterAll: 'सभी', practiceMore: 'मॉक टेस्ट में और अभ्यास करें'
}, true, true);
i18n.addResourceBundle('en', 'translation', {
  growthTitle: 'My growth', achievements: 'Achievements', progressHistory: 'Mock test progress', interviewReadiness: 'Interview readiness', learningPath: 'Learning path',
  simTitle: 'Placement simulator', simReport: 'Simulation report', simTarget: 'Target company', simOverall: 'Overall', simNeeds: 'Needs improvement', simNext: 'Recommended next step',
  navGrowth: 'My growth', navSim: 'Simulator'
}, true, true);
i18n.addResourceBundle('te', 'translation', {
  growthTitle: 'నా పురోగతి', achievements: 'విజయాలు', progressHistory: 'మాక్ టెస్ట్ పురోగతి', interviewReadiness: 'ఇంటర్వ్యూ సన్నద్ధత', learningPath: 'లెర్నింగ్ పాత్',
  simTitle: 'ప్లేస్‌మెంట్ సిమ్యులేటర్', simReport: 'సిమ్యులేషన్ నివేదిక', simTarget: 'లక్ష్య కంపెనీ', simOverall: 'మొత్తం', simNeeds: 'మెరుగుపరచాల్సినవి', simNext: 'తదుపరి సిఫార్సు',
  navGrowth: 'నా పురోగతి', navSim: 'సిమ్యులేటర్'
}, true, true);
i18n.addResourceBundle('hi', 'translation', {
  growthTitle: 'मेरी प्रगति', achievements: 'उपलब्धियाँ', progressHistory: 'मॉक टेस्ट प्रगति', interviewReadiness: 'इंटरव्यू तैयारी', learningPath: 'लर्निंग पाथ',
  simTitle: 'प्लेसमेंट सिमुलेटर', simReport: 'सिमुलेशन रिपोर्ट', simTarget: 'लक्ष्य कंपनी', simOverall: 'कुल', simNeeds: 'सुधार चाहिए', simNext: 'अगला सुझाव',
  navGrowth: 'मेरी प्रगति', navSim: 'सिमुलेटर'
}, true, true);