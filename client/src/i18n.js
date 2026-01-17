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
            "appDescription": "StudyMate is a free, open-source project dedicated to the A/L Bio stream community.",
            "masterYour": "Master Your",
            "alExams": "A/L Exams",
            "heroDesc": "Comprehensive study material for Biology, Chemistry, and Physics. Powered by AI to help you learn faster.",
            "startLearning": "Start Learning",
            "takeQuiz": "Take a Quiz",
            "yourSubjects": "Your Subjects",
            "selectSubject": "Select a subject to continue studying",
            "viewAll": "View all",
            "biology": "Biology",
            "chemistry": "Chemistry",
            "physics": "Physics",
            "masterPractical": "Master Practical (P6)",
            "practicalDesc": "Step-by-step guides for Titration, Electronics, and Food Tests. Don't lose marks on procedures!",
            "exploreGuide": "Explore Guide",
            "bioDesc": "Explore the science of life, from cells to ecosystems.",
            "chemDesc": "Master matter, reactions, and the periodic table.",
            "physDesc": "Unlock the secrets of the universe, from forces to energy.",
            "aiStudyAssistant": "AI Study Assistant",
            "clickToGenerate": "Click below to generate comprehensive study notes, definitions, and exam tips for this topic instantly.",
            "generateNotes": "Generate Notes (Free)",
            "consultingAI": "Consulting the AI...",
            "regenerateAnswer": "Regenerate Answer",
            "backTo": "Back to",
            "subject": "Subject"
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
            "appDescription": "StudyMate என்பது A/L உயிரியல் பிரிவு சமூகத்திற்காக அர்ப்பணிக்கப்பட்ட ஒரு இலவச, திறந்த மூல திட்டம்.",
            "masterYour": "தேர்வுகளில்",
            "alExams": "சிறந்து விளங்க",
            "heroDesc": "உயிரியல், வேதியியல் மற்றும் இயற்பியலுக்கான முழுமையான கற்றல் வளங்கள். AI தொழில்நுட்பத்துடன் விரைவாகக் கற்கலாம்.",
            "startLearning": "கற்கத் தொடங்குங்கள்",
            "takeQuiz": "வினாடி வினா",
            "yourSubjects": "உங்கள் பாடங்கள்",
            "selectSubject": "தொடர ஒரு பாடத்தைத் தேர்ந்தெடுக்கவும்",
            "viewAll": "அனைத்தும்",
            "biology": "உயிரியல்",
            "chemistry": "வேதியியல்",
            "physics": "இயற்பியல்",
            "masterPractical": "செய்முறைப் பயிற்சி (P6)",
            "practicalDesc": "தரம்பார்த்தல், மின்னணுவியல் மற்றும் உணவு சோதனைகளுக்கான வழிகாட்டி. செய்முறைகளில் மதிப்பெண்களை இழக்காதீர்கள்!",
            "exploreGuide": "வழிகாட்டியைப் பார்க்க",
            "bioDesc": "உயிரணுக்கள் முதல் சுற்றுச்சூழல் வரை உயிரின் அறிவியலை ஆராயுங்கள்.",
            "chemDesc": "பொருட்கள், வினைகள் மற்றும் தனிம அட்டவணையைத் தேர்ந்து கொள்ளுங்கள்.",
            "physDesc": "விசைகள் முதல் ஆற்றல் வரை பிரபஞ்சத்தின் இரகசியங்களை அனுகுங்கள்.",
            "aiStudyAssistant": "AI கற்றல் உதவியாளர்",
            "clickToGenerate": "இந்தத் தலைப்பிற்கான குறிப்புகள், விளக்கங்கள் மற்றும் தேர்வு உதவிக்குறிப்புகளைப் பெற கீழே கிளிக் செய்யவும்.",
            "generateNotes": "குறிப்புகளை உருவாக்க (இலவசம்)",
            "consultingAI": "AI யோசிக்கிறது...",
            "regenerateAnswer": "மீண்டும் உருவாக்கவும்",
            "backTo": "திரும்பச் செல்ல",
            "subject": "பாடம்"
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
            "appDescription": "StudyMate යනු A/L ජීව විද්‍යා ප්‍රවාහයේ ප්‍රජාව සඳහා කැප වූ නිදහස්, විවෘත මූලාශ්‍ර ව්‍යාපෘතියකි.",
            "masterYour": "ඔබගේ විභාග",
            "alExams": "ජය ගන්න",
            "heroDesc": "ජීව විද්‍යාව, රසායන විද්‍යාව සහ භෞතික විද්‍යාව සඳහා පූර්ණ අධ්‍යයන ද්‍රව්‍ය. AI මඟින් වේගයෙන් ඉගෙන ගන්න.",
            "startLearning": "ඉගෙනීම අරඹන්න",
            "takeQuiz": "ප්‍රශ්නාවලිය",
            "yourSubjects": "ඔබේ විෂයයන්",
            "selectSubject": "ඉගෙනීම දිගටම කරගෙන යාමට විෂයයක් තෝරන්න",
            "viewAll": "සියල්ල",
            "biology": "ජීව විද්‍යාව",
            "chemistry": "රසායන විද්‍යාව",
            "physics": "භෞතික විද්‍යාව",
            "masterPractical": "ප්‍රායෝගික පුහුණුව (P6)",
            "practicalDesc": "අනුමාපන, ඉලෙක්ට්‍රොනික සහ ආහාර පරීක්ෂණ සඳහා පියවරෙන් පියවර මාර්ගෝපදේශ.",
            "exploreGuide": "මාර්ගෝපදේශය බලන්න",
            "bioDesc": "සෛලවල සිට පරිසර පද්ධති දක්වා ජීවයේ විද්‍යාව ගවේෂණය කරන්න.",
            "chemDesc": "පදාර්ථ, ප්‍රතික්‍රියා සහ ආවර්තිතා වගුව ප්‍රගුණ කරන්න.",
            "physDesc": "බලයේ සිට ශක්තිය දක්වා විශ්වයේ රහස් සොයා ගන්න.",
            "aiStudyAssistant": "AI අධ්‍යයන සහායක",
            "clickToGenerate": "මෙම මාතෘකාව සඳහා සටහන්, නිර්වචන සහ විභාග උපදෙස් ලබා ගැනීමට පහත ක්ලික් කරන්න.",
            "generateNotes": "සටහන් සාදන්න (නොමිලේ)",
            "consultingAI": "AI සිතමින් පවතී...",
            "regenerateAnswer": "නැවත සාදන්න",
            "backTo": "වෙත ආපසු",
            "subject": "විෂය"
        }
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
