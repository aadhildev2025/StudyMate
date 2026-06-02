import React from 'react';
import { FlaskConical, ClipboardList, PenTool, ArrowRight, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { syllabusData } from '../data/syllabus';

const practicals = [
    {
        id: 1,
        title: 'Biology Practicals',
        subjectId: 'biology',
        icon: <ClipboardList className="text-green-400" size={32} />,
        color: 'from-green-500/20 to-emerald-500/20',
        borderColor: 'border-green-500/30'
    },
    {
        id: 2,
        title: 'Chemistry Practicals',
        subjectId: 'chemistry',
        icon: <FlaskConical className="text-purple-400" size={32} />,
        color: 'from-purple-500/20 to-indigo-500/20',
        borderColor: 'border-purple-500/30'
    },
    {
        id: 3,
        title: 'Physics Practicals',
        subjectId: 'physics',
        icon: <PenTool className="text-orange-400" size={32} />,
        color: 'from-orange-500/20 to-red-500/20',
        borderColor: 'border-orange-500/30'
    },
];

const commonExperiments = [
    { name: 'Titration Procedure', subject: 'chemistry' },
    { name: 'Food Tests (Starch, Sugar, Protein)', subject: 'biology' },
    { name: 'Vernier Caliper Usage', subject: 'physics' },
    { name: 'Simple Pendulum', subject: 'physics' },
    { name: 'Spherometer', subject: 'physics' },
];

const Practical = () => {
    const { t } = useTranslation();

    const getCount = (subjectId) => {
        return syllabusData[subjectId]?.practicals?.length || 0;
    };

    return (
        <div className="space-y-8">
            <section className="relative rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-r from-blue-900 to-indigo-900 shadow-2xl">
                <div className="relative z-10">
                    <h1 className="text-4xl font-extrabold text-white mb-4">{t('practicalGuideP6')}</h1>
                    <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
                        {t('practicalGuideDesc')}
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            </section>

            <div className="grid gap-6 md:grid-cols-3">
                {practicals.map((p, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={p.id}
                        className={`glass-card p-6 flex flex-col justify-between group bg-gradient-to-br ${p.color}`}
                    >
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${p.borderColor}`}>
                                    {p.icon}
                                </div>
                                <span className="text-xs font-bold px-2 py-1 bg-white/10 rounded-lg text-gray-300">
                                    {getCount(p.subjectId)} {t('exp')}
                                </span>
                            </div>
                            <h3 className="font-bold text-xl text-white mb-2">{t(p.subjectId)} {t('practicalGuide')}</h3>
                        </div>

                        <Link
                            to={`/subjects/${p.subjectId}?tab=practicals`}
                            className="mt-6 flex items-center justify-between py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group-hover:border-white/20"
                        >
                            <span className="text-sm font-semibold text-gray-300 group-hover:text-white">{t('viewExperiments')}</span>
                            <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Common Experiments */}
            <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <Microscope size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{t('frequentExperiments')}</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {commonExperiments.map((exp, i) => (
                        <Link
                            key={i}
                            to={`/subjects/${exp.subject}/${exp.name}?type=practical`}
                            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${exp.subject === 'biology' ? 'bg-green-500' :
                                    exp.subject === 'chemistry' ? 'bg-purple-500' : 'bg-orange-500'
                                    } shadow-[0_0_8px_currentColor]`} />
                                <span className="font-medium text-gray-200 group-hover:text-white transition-colors">{exp.name}</span>
                            </div>
                            <span className="text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                {t('readGuide')} <ArrowRight size={12} />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Practical;

