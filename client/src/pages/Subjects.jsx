import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FlaskConical, Brain, ChevronRight } from 'lucide-react';

const subjects = [
    {
        id: 'biology',
        name: 'Biology',
        description: 'Explore the science of life, from cells to ecosystems.',
        icon: <BookOpen size={32} />,
        color: 'from-green-500/20 to-emerald-500/20',
        iconColor: 'text-green-400',
        borderColor: 'border-green-500/30',
    },
    {
        id: 'chemistry',
        name: 'Chemistry',
        description: 'Master matter, reactions, and the periodic table.',
        icon: <FlaskConical size={32} />,
        color: 'from-purple-500/20 to-indigo-500/20',
        iconColor: 'text-purple-400',
        borderColor: 'border-purple-500/30',
    },
    {
        id: 'physics',
        name: 'Physics',
        description: 'Unlock the secrets of the universe, from forces to energy.',
        icon: <Brain size={32} />,
        color: 'from-orange-500/20 to-red-500/20',
        iconColor: 'text-orange-400',
        borderColor: 'border-orange-500/30',
    },
];

const Subjects = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Select a Subject</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject) => (
                    <Link
                        key={subject.id}
                        to={`/subjects/${subject.id}`}
                        className={`glass-card p-6 flex flex-col items-start gap-4 group bg-gradient-to-br ${subject.color}`}
                    >
                        <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${subject.iconColor} shadow-inner`}>
                            {subject.icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">{subject.name}</h2>
                            <p className="text-gray-400 text-sm mt-2 leading-relaxed">{subject.description}</p>
                        </div>
                        <div className={`mt-auto flex items-center gap-2 font-semibold text-sm ${subject.iconColor} opacity-80 group-hover:opacity-100`}>
                            Start Learning <ChevronRight size={16} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Subjects;
