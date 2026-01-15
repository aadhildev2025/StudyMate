import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lock, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { syllabusData } from '../data/syllabus';

const SubjectDetail = () => {
    const { id } = useParams();
    const subject = syllabusData[id];
    const [searchTerm, setSearchTerm] = useState('');

    if (!subject) {
        return <div className="text-center py-20 text-gray-400">Subject not found</div>;
    }

    const filteredUnits = subject.units.filter(unit =>
        unit.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className={`relative rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-r ${subject.color}`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <Link to="/subjects" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Subjects
                </Link>

                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">{subject.name}</h1>
                <p className="text-white/90 text-lg md:text-xl font-medium max-w-xl">{subject.description}</p>

                {/* Search Bar within Header */}
                <div className="mt-8 max-w-md relative">
                    <input
                        type="text"
                        placeholder={`Search ${subject.name} topics...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/30 transition-all shadow-lg"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                </div>
            </div>

            {/* Units Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {filteredUnits.length > 0 ? (
                    filteredUnits.map((unit, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={unit.id}
                            className={`glass-card p-6 flex flex-col justify-between group relative overflow-hidden ${!unit.unlocked ? 'opacity-70 grayscale-[0.5]' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl font-bold font-mono">
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
                                <h3 className="font-bold text-xl mb-1 group-hover:text-blue-400 transition-colors">{unit.title}</h3>
                                <p className="text-sm text-gray-400">{unit.lessons} Lessons • AI Notes Available</p>
                            </div>

                            {unit.unlocked && (
                                <Link
                                    to={`/subjects/${id}/${unit.title}`}
                                    className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/5 rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2"
                                >
                                    Start Learning
                                </Link>
                            )}
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-2 text-center py-10 text-gray-400">
                        No topics found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubjectDetail;
