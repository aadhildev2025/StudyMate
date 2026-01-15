import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, FlaskConical, User, Sparkles } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: <Home size={22} />, label: 'Home', path: '/' },
        { icon: <BookOpen size={22} />, label: 'Subjects', path: '/subjects' },
        { icon: <FlaskConical size={22} />, label: 'Practical Guide', path: '/practical' },
        { icon: <User size={22} />, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="hidden md:flex flex-col w-72 fixed inset-y-0 left-0 glass border-r-0 z-50">
            <div className="h-24 flex items-center px-8">
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    StudyMate
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-blue-600 shadow-lg shadow-blue-500/30 text-white font-semibold'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <div className={`mr-4 transition-transform group-hover:scale-110 ${item.label === 'Subjects' ? '' : ''}`}>
                            {item.icon}
                        </div>
                        <span className="tracking-wide">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10">
                <div className="flex items-center gap-2 mb-2 text-blue-300 font-semibold">
                    <Sparkles size={16} /> AI Assistant
                </div>
                <p className="text-xs text-gray-400 mb-3">Stuck on a question? Get instant explanations.</p>
                <NavLink to="/chat" className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all">
                    Ask Now
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
