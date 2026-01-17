import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, BookOpen, Loader, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { API_BASE_URL } from '../config';
import { useTranslation } from 'react-i18next';

const LessonView = () => {
    const { t, i18n } = useTranslation();
    const { subjectId, topicId } = useParams();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateNotes = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/ai/note`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: topicId,
                    subject: subjectId,
                    language: i18n.language // Send current language code (en, ta, si)
                }),
            });
            const data = await res.json();
            setContent(data.content);
        } catch (error) {
            console.error("Error fetching notes:", error);
            setContent("Failed to generate notes. Please ensure the backend is running with a valid Gemini API Key.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Link to={`/subjects/${subjectId}`} className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={18} className="mr-2" /> {t('backTo')} {subjectId}
            </Link>

            <div className="glass-card p-8 min-h-[60vh]">
                <div className="border-b border-white/10 pb-6 mb-6">
                    <h1 className="text-3xl font-bold text-white capitalize mb-2">{topicId}</h1>
                    <p className="text-gray-400">{t('subject')}: <span className="capitalize text-blue-400">{subjectId}</span></p>
                </div>

                {!content && !loading && (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                            <Sparkles className="text-blue-400" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{t('aiStudyAssistant')}</h3>
                        <p className="text-gray-400 mb-8 max-w-md">
                            {t('clickToGenerate')}
                        </p>
                        <button
                            onClick={generateNotes}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all flex items-center gap-3"
                        >
                            <Sparkles size={20} /> {t('generateNotes')}
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader className="animate-spin text-blue-500 mb-4" size={48} />
                        <p className="font-medium text-blue-300 text-lg animate-pulse">{t('consultingAI')}</p>
                    </div>
                )}

                {content && (
                    <>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={generateNotes}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 rounded-lg text-sm font-medium transition-colors border border-white/5"
                            >
                                <Sparkles size={16} /> {t('regenerateAnswer')}
                            </button>
                        </div>
                        <div className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:text-blue-400 prose-p:leading-relaxed prose-li:text-gray-300 prose-strong:text-white">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LessonView;
