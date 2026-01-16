import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { API_BASE_URL } from '../config';

const AIChat = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am your AI Study Assistant. Ask me anything about Biology, Chemistry, or Physics.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Using the same note generation endpoint for now, or a dedicated chat endpoint
            // Ideally we should create a dedicated /chat endpoint on the backend
            const res = await fetch(`${API_BASE_URL}/ai/note`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: input, subject: 'General Science' }),
            });
            const data = await res.json();

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
                <form onSubmit={handleSend} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a doubt..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={loading}
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
