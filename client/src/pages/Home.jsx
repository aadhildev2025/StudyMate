import React from 'react';
import { BookOpen, FlaskConical, Brain, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-br from-blue-600 to-purple-800 shadow-2xl">
                <div className="relative z-10 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >

                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                            Master Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">A/L Exams</span>
                        </h1>
                        <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed opacity-90 max-w-lg">
                            Comprehensive study material for Biology, Chemistry, and Physics.
                            Powered by AI to help you learn faster.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/subjects" className="px-8 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors text-center">
                                Start Learning
                            </Link>
                            <Link to="/quiz" className="px-8 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors backdrop-blur-md text-center">
                                Take a Quiz
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Abstract shapes */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            </section>

            {/* Quick Access */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Your Subjects</h2>
                        <p className="text-gray-400 text-sm mt-1">Select a subject to continue studying</p>
                    </div>
                    <Link to="/subjects" className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors">
                        View all <ChevronRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { id: 'biology', name: 'Biology', icon: <BookOpen size={24} />, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                        { id: 'chemistry', name: 'Chemistry', icon: <FlaskConical size={24} />, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
                        { id: 'physics', name: 'Physics', icon: <Brain size={24} />, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' }
                    ].map((sub, i) => (
                        <Link to={`/subjects/${sub.id}`} key={sub.id}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className={`glass-card p-6 flex flex-col items-center justify-center gap-4 group h-48`}
                            >
                                <div className={`p-4 rounded-full ${sub.bg} ${sub.color} transition-all group-hover:scale-110 duration-300`}>
                                    {sub.icon}
                                </div>
                                <span className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors">{sub.name}</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Practical */}
            <section className="glass rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                    <div className="p-4 bg-blue-500/20 rounded-2xl text-blue-400">
                        <FlaskConical size={32} />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="font-bold text-xl text-white">Master Practical (P6)</h3>
                        <p className="text-gray-400 mt-2">
                            Step-by-step guides for Titration, Electronics, and Food Tests.
                            Don't lose marks on procedures!
                        </p>
                    </div>
                    <Link to="/practical" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-blue-500/25">
                        Explore Guide
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
