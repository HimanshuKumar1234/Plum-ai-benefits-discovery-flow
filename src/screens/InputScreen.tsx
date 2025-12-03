import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Sparkles, Activity } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { classifyHealthNeed } from '../services/aiService';
import './InputScreen.css';

const InputScreen: React.FC = () => {
    const navigate = useNavigate();
    const { setUserInput: setGlobalInput, setCategory } = useAppState();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const exampleQueries = [
        { icon: '🦷', text: 'I have tooth pain, what can I do?', category: 'dental' },
        { icon: '🧠', text: 'Feeling stressed and anxious lately', category: 'mental' },
        { icon: '👁️', text: 'My vision is getting blurry', category: 'vision' },
        { icon: '🤒', text: 'I have a persistent fever', category: 'opd' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        setGlobalInput(input);
        setIsLoading(true);

        // Navigate to loading screen
        navigate('/loading');

        try {
            // Simulate minimum loading time for better UX
            const [result] = await Promise.all([
                classifyHealthNeed(input),
                new Promise(resolve => setTimeout(resolve, 2000))
            ]);

            setCategory(result.category);

            // Navigate to benefits screen
            setTimeout(() => {
                navigate('/benefits');
            }, 500);
        } catch (error) {
            console.error('Classification error:', error);
            setIsLoading(false);
        }
    };

    const handleExampleClick = (exampleText: string) => {
        setInput(exampleText);
    };

    return (
        <div className="input-screen">
            {/* Animated Background Elements */}
            <div className="floating-elements">
                <motion.div
                    className="float-icon"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    💊
                </motion.div>
                <motion.div
                    className="float-icon"
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                >
                    ❤️
                </motion.div>
                <motion.div
                    className="float-icon"
                    animate={{
                        y: [0, -25, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
                >
                    🩺
                </motion.div>
            </div>

            <div className="container">
                <motion.div
                    className="input-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <motion.div
                        className="header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="logo-icon">
                            <Activity size={40} strokeWidth={2.5} />
                        </div>
                        <h1>AI-Powered Benefits Discovery</h1>
                        <p className="subtitle">
                            Tell us about your health needs, and we'll help you find the perfect benefits
                        </p>
                    </motion.div>

                    {/* Main Input Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="input-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="input-wrapper">
                            <Sparkles className="input-icon" size={24} />
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="I have tooth pain, what can I do?"
                                className="main-input"
                                rows={4}
                                disabled={isLoading}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="btn btn-primary submit-btn"
                            disabled={!input.trim() || isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Discover Benefits</span>
                            <Send size={20} />
                        </motion.button>
                    </motion.form>

                    {/* Example Queries */}
                    <motion.div
                        className="examples-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <p className="examples-label">Or try one of these examples:</p>
                        <div className="examples-grid">
                            {exampleQueries.map((example, index) => (
                                <motion.button
                                    key={index}
                                    className="example-card"
                                    onClick={() => handleExampleClick(example.text)}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                >
                                    <span className="example-icon">{example.icon}</span>
                                    <span className="example-text">{example.text}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        className="trust-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="trust-items">
                            <div className="trust-item">
                                <span className="trust-icon">🔒</span>
                                <span>Secure & Private</span>
                            </div>
                            <div className="trust-item">
                                <span className="trust-icon">⚡</span>
                                <span>Instant Results</span>
                            </div>
                            <div className="trust-item">
                                <span className="trust-icon">🎯</span>
                                <span>AI-Powered</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default InputScreen;
