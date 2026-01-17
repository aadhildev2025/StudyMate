import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { API_BASE_URL } from '../config';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const AIChat = () => {
    const { t, i18n } = useTranslation();
    const { currentUser } = useAuth(); // Get current user
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am your AI Study Assistant. Ask me anything about Biology, Chemistry, or Physics.' }
    ]);
    const [input, setInput] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() && !image) return;

        // Prevent guests from sending images
        if (image && !currentUser) {
            setMessages(prev => [...prev, { role: 'user', text: input, image }]);
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    role: 'bot',
                    text: `🔒 **Sign In Required**\n\nPlease sign in with your Google account to use the AI Vision feature (uploading images).`
                }]);
            }, 500);
            setInput('');
            setImage(null);
            return;
        }

        const userMsg = { role: 'user', text: input, image };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setImage(null);
        setLoading(true);

        try {
            // Using the same note generation endpoint for now, or a dedicated chat endpoint
            // Ideally we should create a dedicated /chat endpoint on the backend
            const res = await fetch(`${API_BASE_URL}/ai/note`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: input,
                    subject: 'General Science', // Context is broad for general chat
                    language: i18n.language, // Send current language
                    image: image, // Send base64 image if valid
                    uid: currentUser ? currentUser.uid : null // Send User ID for rate limiting
                }),
            });
            const data = await res.json();

            if (res.status === 429) {
                // Rate limit exceeded
                setMessages(prev => [...prev, {
                    role: 'bot',
                    text: `⚠️ **Daily Limit Reached**\n\n${data.error || "You have reached your daily limit for image uploads. Please try again later."}`
                }]);
                return;
            }

            const botMsg = { role: 'bot', text: data.content || "I couldn't generate a response. Please check the API key." };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I encountered an error connecting to the server." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100dvh-140px)] md:h-[calc(100dvh-100px)] flex flex-col glass rounded-2xl overflow-hidden border border-white/10">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                    <Sparkles size={20} className="text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-white">AI Study Assistant</h2>
                    <p className="text-xs text-blue-300 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                            }`}>
                            {msg.role === 'bot' && (
                                <div className="flex items-center gap-2 mb-2 text-xs text-blue-300 font-bold uppercase tracking-wider">
                                    <Bot size={12} /> AI Assistant
                                </div>
                            )}
                            {msg.image && (
                                <img src={msg.image} alt="User upload" className="max-w-full rounded-lg mb-2 max-h-60 object-contain bg-black/20" />
                            )}
                            <div className="text-sm md:text-base leading-relaxed">
                                {msg.role === 'bot' ? (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                        components={{
                                            p: ({ node, ...props }) => <p className="mb-3 last:mb-0 leading-relaxed text-gray-200" {...props} />,
                                            strong: ({ node, ...props }) => <span className="block mt-4 mb-2 font-bold text-blue-300 text-sm tracking-wide uppercase" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-3 bg-white/5 p-3 rounded-lg border border-white/5" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-3 bg-white/5 p-3 rounded-lg border border-white/5" {...props} />,
                                            li: ({ node, ...props }) => <li className="text-gray-300 pl-1" {...props} />,
                                            code: ({ node, ...props }) => <code className="bg-black/30 px-1 py-0.5 rounded text-yellow-300 font-mono text-sm" {...props} />,
                                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-3 bg-blue-500/10 rounded-r-lg italic text-blue-200" {...props} />
                                        }}
                                    >
                                        {msg.text}
                                    </ReactMarkdown>
                                ) : (
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 rounded-2xl p-4 rounded-bl-none border border-white/5 flex items-center gap-2">
                            <Loader size={16} className="animate-spin text-blue-400" />
                            <span className="text-gray-400 text-sm">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
                {image && (
                    <div className="mb-4 relative inline-block">
                        <img src={image} alt="Preview" className="h-20 w-auto rounded-lg border border-white/20" />
                        <button
                            type="button"
                            onClick={() => setImage(null)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>
                )}
                <form onSubmit={handleSend} className="relative flex items-center gap-2">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 hover:text-white transition-colors"
                        title="Upload Image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a doubt or send a photo..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={loading || (!input.trim() && !image)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIChat;
