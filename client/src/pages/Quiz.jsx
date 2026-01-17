import React, { useState } from 'react';
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle, XCircle, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../config';
import { useTranslation } from 'react-i18next';

const Quiz = () => {
    const { i18n } = useTranslation();
    const [topic, setTopic] = useState('');
    const [subject, setSubject] = useState('Biology');
    const [difficulty, setDifficulty] = useState('Medium');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    const startQuiz = async (e) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/ai/quiz`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic,
                    subject,
                    difficulty,
                    language: i18n.language
                }),
            });
            const data = await res.json();

            if (data.quiz && Array.isArray(data.quiz)) {
                setQuestions(data.quiz);
                setCurrentQuestion(0);
                setScore(0);
                setShowResult(false);
                setIsAnswerChecked(false);
                setSelectedAnswer(null);
            } else {
                alert("Failed to generate quiz. Try a different topic.");
            }
        } catch (error) {
            console.error(error);
            alert("Error connecting to AI.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerClick = (index) => {
        if (isAnswerChecked) return;
        setSelectedAnswer(index);
        setIsAnswerChecked(true);

        const correctIndex = parseInt(questions[currentQuestion].correctAnswer.replace('index_', ''));
        if (index === correctIndex) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswerChecked(false);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setQuestions([]);
        setTopic('');
        setScore(0);
        setShowResult(false);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            {!questions.length && (
                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        AI Quiz Generator
                    </h1>
                    <p className="text-gray-400 max-w-lg mx-auto">
                        Test your knowledge on any A/L topic. Just type it in and let the AI challenge you!
                    </p>
                </div>
            )}

            {/* Setup Form */}
            {!questions.length && !loading && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8"
                >
                    <form onSubmit={startQuiz} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                            <select
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="Biology" className="bg-gray-900 text-white">Biology</option>
                                <option value="Chemistry" className="bg-gray-900 text-white">Chemistry</option>
                                <option value="Physics" className="bg-gray-900 text-white">Physics</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Topic</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., Photosynthesis, Newton's Laws..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Difficulty</label>
                            <div className="flex gap-4">
                                {['Easy', 'Medium', 'Hard'].map((diff) => (
                                    <button
                                        key={diff}
                                        type="button"
                                        onClick={() => setDifficulty(diff)}
                                        className={`flex-1 py-3 rounded-xl font-medium transition-all ${difficulty === diff
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {diff}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Sparkles size={20} /> Generate Quiz
                        </button>
                    </form>
                </motion.div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-xl font-bold text-white mb-2">Generating Questions...</h3>
                    <p className="text-gray-400">The AI is crafting a unique quiz for you.</p>
                </div>
            )}

            {/* Quiz Interface */}
            {questions.length > 0 && !showResult && (
                <div className="glass-card p-8">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-sm font-medium text-gray-400">Question {currentQuestion + 1} of {questions.length}</span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold">{score} Correct</span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-8 leading-snug">
                        {questions[currentQuestion].question}
                    </h2>

                    <div className="space-y-4 mb-8">
                        {questions[currentQuestion].options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const correctIndex = parseInt(questions[currentQuestion].correctAnswer.replace('index_', ''));
                            const isCorrect = index === correctIndex;

                            let bgClass = "bg-white/5 border-white/10 hover:bg-white/10";
                            if (isAnswerChecked) {
                                if (isCorrect) bgClass = "bg-green-500/20 border-green-500/50 text-green-200";
                                else if (isSelected) bgClass = "bg-red-500/20 border-red-500/50 text-red-200";
                                else bgClass = "bg-white/5 border-white/10 opacity-50";
                            } else if (isSelected) {
                                bgClass = "bg-blue-600 border-blue-500 text-white";
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(index)}
                                    disabled={isAnswerChecked}
                                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${bgClass}`}
                                >
                                    <span>{option}</span>
                                    {isAnswerChecked && isCorrect && <CheckCircle className="text-green-400" size={20} />}
                                    {isAnswerChecked && isSelected && !isCorrect && <XCircle className="text-red-400" size={20} />}
                                </button>
                            );
                        })}
                    </div>

                    {isAnswerChecked && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-6 p-4 rounded-xl bg-blue-900/20 border border-blue-500/20"
                        >
                            <p className="text-blue-200 text-sm">
                                <span className="font-bold">Explanation: </span>
                                {questions[currentQuestion].explanation || "Correct answer is indicated above."}
                            </p>
                        </motion.div>
                    )}

                    <div className="flex justify-end">
                        {isAnswerChecked && (
                            <button
                                onClick={nextQuestion}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors"
                            >
                                {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Results */}
            {showResult && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-card p-12 text-center"
                >
                    <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                        <Brain size={48} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-2">Quiz Completed!</h2>
                    <p className="text-gray-400 mb-8">You scored <span className="text-white font-bold text-xl">{score} / {questions.length}</span></p>

                    <button
                        onClick={resetQuiz}
                        className="px-8 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
                    >
                        Try Another Topic
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Quiz;
