import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="min-h-screen text-white pb-24 md:pb-0 md:pl-72 transition-all duration-300 relative">
            {/* Background Glow Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <Sidebar />

            {/* Main Content Area */}
            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <Outlet />
            </main>

            <MobileNav />
        </div>
    );
};

export default Layout;
