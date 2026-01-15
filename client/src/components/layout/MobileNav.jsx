import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, FlaskConical, User, Sparkles } from 'lucide-react';

const MobileNav = () => {
    const navItems = [
        { icon: <Home size={24} />, label: 'Home', path: '/' },
        { icon: <BookOpen size={24} />, label: 'Subjects', path: '/subjects' },
        { icon: <Sparkles size={24} />, label: 'Ask AI', path: '/chat' },
        { icon: <FlaskConical size={24} />, label: 'Practicals', path: '/practical' },
        { icon: <User size={24} />, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 glass border-t-0 md:hidden z-50 backdrop-blur-2xl bg-black/80">
            <div className="flex justify-around items-center h-20 px-2 pb-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${isActive
                                ? 'text-blue-400'
                                : 'text-gray-500 hover:text-gray-300'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={isActive ? 'transform scale-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : ''}>
                                    {item.icon}
                                </div>
                                <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                    {item.label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default MobileNav;
