import React from 'react';
import { User, Mail, Code, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/layout/LanguageSwitcher';

const Profile = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 animate-fade-in-up">
            <header className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {t('profileAndCredits')}
                    </h1>
                    <p className="text-gray-400 mt-2">{t('manageAccount')}</p>
                </div>
                <LanguageSwitcher />
            </header>

            {/* User Info Placeholder */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                        <User />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white">{t('student')}</h2>
                        <p className="text-gray-400">{t('welcome')}</p>
                    </div>
                </div>
            </div>

            {/* Credits Section */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Code size={48} />
                </div>

                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Heart className="text-red-500 fill-red-500" size={18} /> {t('credits')}
                </h3>

                <div className="space-y-4 text-sm text-gray-300">
                    <p className="leading-relaxed">
                        {t('appDescription')}
                    </p>

                    <div className="border-t border-white/10 pt-4">
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{t('designedBy')}</p>
                        <p className="text-lg font-bold text-blue-400">Aadhil</p>
                        <p className="text-xs text-gray-400">{t('webDeveloper')}</p>
                    </div>

                    <div className="flex items-center gap-2 bg-black/30 p-3 rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors">
                        <Mail size={16} className="text-blue-400" />
                        <a href="mailto:aadhildev2025@gmail.com" className="text-blue-300 hover:text-white transition-colors">
                            aadhildev2025@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Spacer for Mobile Nav */}
            <div className="h-24 md:h-0"></div>
        </div>
    );
};

export default Profile;
