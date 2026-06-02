import React, { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lock, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { syllabusData } from '../data/syllabus';
import { useTranslation } from 'react-i18next';

const SubjectDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const subject = syllabusData[id];
    const [searchParams, setSearchParams] = useSearchParams();
    
    const defaultTab = searchParams.get('tab') === 'practicals' ? 'practicals' : 'theory';
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [searchTerm, setSearchTerm] = useState('');

    if (!subject) {
        return <div className="text-center py-20 text-gray-400">Subject not found</div>;
    }

    const filteredUnits = subject.units.filter(unit =>
        unit.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPracticals = (subject.practicals || []).filter(prac =>
        prac.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prac.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className={`relative rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-r ${subject.color}`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <Link to="/subjects" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> {t('backToSubjects')}
                </Link>

                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">{t(subject.id)}</h1>
                <p className="text-white/90 text-lg md:text-xl font-medium max-w-xl">{t(subject.id + 'Desc')}</p>

                {/* Search Bar within Header */}
                <div className="mt-8 max-w-md relative">
                    <input
                        type="text"
                        placeholder={activeTab === 'theory' ? `${t('searchTopics')}` : `${t('searchPracticals')}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/30 transition-all shadow-lg"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl max-w-xs md:max-w-sm">
                <button
                    onClick={() => {
                        setActiveTab('theory');
                        setSearchParams({ tab: 'theory' });
                    }}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-center relative ${
                        activeTab === 'theory'
                            ? 'text-white'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    {activeTab === 'theory' && (
                        <motion.div
                            layoutId="activeTabBg"
                            className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/25 -z-10"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                    )}
                    {t('theory')}
                </button>
                <button
                    onClick={() => {
                        setActiveTab('practicals');
                        setSearchParams({ tab: 'practicals' });
                    }}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-center relative ${
                        activeTab === 'practicals'
                            ? 'text-white'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    {activeTab === 'practicals' && (
                        <motion.div
                            layoutId="activeTabBg"
                            className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/25 -z-10"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                    )}
                    {t('practicals')}
                </button>
            </div>

            {searchTerm.trim() && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
                            <Sparkles size={20} className="animate-pulse" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-base leading-tight">{t('learnCustomTopic')}</h4>
                            <p className="text-xs text-gray-400 mt-1">{t('generateNotesFor')} <span className="text-blue-300 font-semibold">"{searchTerm}"</span></p>
                        </div>
                    </div>
                    <Link
                        to={`/subjects/${id}/${encodeURIComponent(searchTerm.trim())}?type=custom&tab=${activeTab}`}
                        className="py-2.5 px-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm text-center transition-all shadow-md shadow-blue-500/10 whitespace-nowrap self-start sm:self-auto"
                    >
                        {t('askAI')}
                    </Link>
                </motion.div>
            )}

            {/* Content displaying either Units or Practicals */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'theory' ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {filteredUnits.length > 0 ? (
                                filteredUnits.map((unit, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        key={unit.id}
                                        className={`glass-card p-6 flex flex-col justify-between group relative overflow-hidden ${!unit.unlocked ? 'opacity-70 grayscale-[0.5]' : ''}`}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl font-bold font-mono text-white">
                                                {unit.id.toString().padStart(2, '0')}
                                            </div>
                                            {unit.unlocked ? (
                                                <div className="p-2 bg-green-500/20 text-green-400 rounded-full">
                                                    <BookOpen size={18} />
                                                </div>
                                            ) : (
                                                <div className="p-2 bg-gray-500/20 text-gray-400 rounded-full">
                                                    <Lock size={18} />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-xl mb-1 text-white group-hover:text-blue-400 transition-colors">{unit.title}</h3>
                                            <p className="text-sm text-gray-400">{unit.lessons} {t('lessons')} • {t('aiNotesAvailable')}</p>
                                        </div>

                                        {unit.unlocked && (
                                            <Link
                                                to={`/subjects/${id}/${unit.title}`}
                                                className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/5 rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2 text-white"
                                            >
                                                {t('startLearning')}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-2 text-center py-10 text-gray-400">
                                    {t('noTopicsFound')} "{searchTerm}"
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {filteredPracticals.length > 0 ? (
                                filteredPracticals.map((prac, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        key={prac.id}
                                        className="glass-card p-6 flex flex-col justify-between group relative overflow-hidden"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl font-bold font-mono text-white">
                                                {prac.id.toString().padStart(2, '0')}
                                            </div>
                                            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-full">
                                                <BookOpen size={18} />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-xl mb-1 text-white group-hover:text-blue-400 transition-colors">{prac.title}</h3>
                                            <p className="text-sm text-gray-400 leading-relaxed mb-4">{prac.description}</p>
                                        </div>

                                        <Link
                                            to={`/subjects/${id}/${prac.title}?type=practical`}
                                            className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/5 rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2 text-white"
                                        >
                                            {t('exploreExperiment')}
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-2 text-center py-10 text-gray-400">
                                    {t('noPracticalsFound')} "{searchTerm}"
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SubjectDetail;

