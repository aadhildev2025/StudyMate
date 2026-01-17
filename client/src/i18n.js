import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "home": "Home",
            "subjects": "Subjects",
            "practicalGuide": "Practical Guide",
            "profile": "Profile",
            "aiAssistant": "AI Assistant",
            "askNow": "Ask Now",
            "stuck": "Stuck on a question? Get instant explanations.",
            "designedBy": "Designed & Developed by",
            "openSource": "Open Source for A/L Bio Stream",
            "credits": "Credits",
            "welcome": "Welcome to StudyMate",
            "manageAccount": "Manage your account and view app info.",
            "student": "Student",
            "webDeveloper": "Web Developer",
            "profileAndCredits": "Profile & Credits",
            "appDescription": "StudyMate is a free, open-source project dedicated to the A/L Bio stream community."
        }
    },
    ta: {
        translation: {
            "home": "முகப்பு",
            "subjects": "பாடங்கள்",
            "practicalGuide": "செய்முறை வழிகாட்டி",
            "profile": "சுயவிவரம்",
            "aiAssistant": "AI உதவியாளர்",
            "askNow": "கேட்கவும்",
            "stuck": "கேள்விகள் உள்ளதா? உடனடி விளக்கங்களைப் பெறுங்கள்.",
            "designedBy": "வடிவமைப்பு & உருவாக்கம்",
            "openSource": "A/L உயிரியல் பிரிவுக்கான திறந்த மூலம்",
            "credits": "நன்றிகள்",
            "welcome": "StudyMate-க்கு வரவேற்கிறோம்",
            "manageAccount": "உங்கள் கணக்கை நிர்வகிக்கவும் மற்றும் செயலி விபரங்களைப் பார்க்கவும்.",
            "student": "மாணவர்",
            "webDeveloper": "இணைய உருவாக்குநர்",
            "profileAndCredits": "சுயவிவரம் & நன்றிகள்",
            "appDescription": "StudyMate என்பது A/L உயிரியல் பிரிவு சமூகத்திற்காக அர்ப்பணிக்கப்பட்ட ஒரு இலவச, திறந்த மூல திட்டம்."
        }
    },
    si: {
        translation: {
            "home": "මුල් පිටුව",
            "subjects": "විෂයයන්",
            "practicalGuide": "ප්‍රායෝගික මාර්ගෝපදේශය",
            "profile": "පැතිකඩ",
            "aiAssistant": "AI සහායක",
            "askNow": "විමසන්න",
            "stuck": "ප්‍රශ්නයක් තිබේද? ක්ෂණික පැහැදිලි කිරීම් ලබා ගන්න.",
            "designedBy": "නිර්මාණය සහ සංවර්ධනය",
            "openSource": "A/L ජීව විද්‍යා අංශය සඳහා විවෘත මූලාශ්‍ර",
            "credits": "ස්තූතිය",
            "welcome": "StudyMate වෙත සාදරයෙන් පිළිගනිමු",
            "manageAccount": "ඔබගේ ගිණුම කළමනාකරණය කරන්න සහ යෙදුම් තොරතුරු බලන්න.",
            "student": "ශිෂ්‍ය",
            "webDeveloper": "වෙබ් සංවර්ධක",
            "profileAndCredits": "පැතිකඩ සහ ස්තූතිය",
            "appDescription": "StudyMate යනු A/L ජීව විද්‍යා ප්‍රවාහයේ ප්‍රජාව සඳහා කැප වූ නිදහස්, විවෘත මූලාශ්‍ර ව්‍යාපෘතියකි."
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
