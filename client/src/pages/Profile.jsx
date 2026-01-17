import { User, Mail, Code, Heart, LogOut, LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/layout/LanguageSwitcher';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { t } = useTranslation();
    const { currentUser, login, logout } = useAuth();

    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

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

            {/* User Info / Login Section */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                {currentUser ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {currentUser.photoURL ? (
                                <img src={currentUser.photoURL} alt="Profile" className="w-16 h-16 rounded-full border-2 border-blue-500" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                                    <User />
                                </div>
                            )}
                            <div>
                                <h2 className="text-xl font-semibold text-white">{currentUser.displayName || t('student')}</h2>
                                <p className="text-gray-400">{currentUser.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                            <LogOut size={18} /> {t('logout')}
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User size={32} className="text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">{t('guestUser')}</h2>
                        <p className="text-gray-400 mb-6">{t('signInDescription')}</p>
                        <button
                            onClick={handleLogin}
                            className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.799 L -6.734 42.379 C -8.804 40.439 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                                </g>
                            </svg>
                            {t('signInWithGoogle')}
                        </button>
                    </div>
                )}
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
