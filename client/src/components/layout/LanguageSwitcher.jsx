import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
            <Languages size={16} className="text-gray-400 ml-2" />
            <div className="flex">
                <button
                    onClick={() => toggleLanguage('en')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${i18n.language === 'en' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    EN
                </button>
                <button
                    onClick={() => toggleLanguage('ta')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${i18n.language === 'ta' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    TA
                </button>
                <button
                    onClick={() => toggleLanguage('si')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${i18n.language === 'si' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    SI
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
