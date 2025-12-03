import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { getBenefitsByCategory } from '../data/benefitsData';
import { generateActionPlan } from '../services/aiService';
import type { Benefit } from '../data/benefitsData';
import './BenefitsScreen.css';

const BenefitsScreen: React.FC = () => {
    const navigate = useNavigate();
    const { category, userInput, setSelectedBenefit, setActionPlan, reset } = useAppState();
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (!category) {
            navigate('/');
            return;
        }

        const relevantBenefits = getBenefitsByCategory(category);
        setBenefits(relevantBenefits.slice(0, 4)); // Show max 4 benefits
    }, [category, navigate]);

    const handleBenefitSelect = async (benefit: Benefit) => {
        setSelectedBenefit(benefit);
        setIsGenerating(true);

        try {
            // Generate action plan
            const plan = await generateActionPlan(benefit.category, benefit.title);
            setActionPlan(plan.steps);

            // Navigate to action plan screen
            setTimeout(() => {
                navigate('/action-plan');
            }, 500);
        } catch (error) {
            console.error('Error generating action plan:', error);
            setIsGenerating(false);
        }
    };

    const handleBack = () => {
        reset();
        navigate('/');
    };

    const categoryEmojis: Record<string, string> = {
        'Dental': '🦷',
        'Mental Health': '🧠',
        'Vision': '👁️',
        'OPD': '🏥',
    };

    return (
        <div className="benefits-screen">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="benefits-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <button onClick={handleBack} className="back-button">
                        <ArrowLeft size={20} />
                        <span>Start Over</span>
                    </button>

                    <div className="category-badge">
                        <span className="category-emoji">{categoryEmojis[category || 'OPD']}</span>
                        <span className="category-name">{category}</span>
                    </div>
                </motion.div>

                {/* User Query Display */}
                <motion.div
                    className="query-display"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <p className="query-label">Your health need:</p>
                    <p className="query-text">"{userInput}"</p>
                </motion.div>

                {/* Results Section */}
                <motion.div
                    className="results-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="results-header">
                        <h2>
                            <CheckCircle2 size={32} className="check-icon" />
                            Recommended Benefits
                        </h2>
                        <p>We found {benefits.length} benefits that match your needs</p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.id}
                                className="benefit-card"
                                style={{ '--card-color': benefit.color } as React.CSSProperties}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                onClick={() => handleBenefitSelect(benefit)}
                            >
                                {/* Card Header */}
                                <div className="card-header">
                                    <div className="card-icon">{benefit.icon}</div>
                                    <div className="card-badge" style={{ background: benefit.color }}>
                                        {benefit.category}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="card-content">
                                    <h3 className="card-title">{benefit.title}</h3>
                                    <p className="card-coverage">{benefit.coverage}</p>
                                    <p className="card-description">{benefit.description}</p>
                                </div>

                                {/* Features List */}
                                <div className="card-features">
                                    {benefit.features.slice(0, 3).map((feature, idx) => (
                                        <div key={idx} className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="card-cta">
                                    <span>View Action Plan</span>
                                    <motion.span
                                        className="cta-arrow"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        →
                                    </motion.span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Loading Overlay when generating */}
                {isGenerating && (
                    <motion.div
                        className="generating-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="generating-content">
                            <div className="spinner"></div>
                            <p>Generating your personalized action plan...</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default BenefitsScreen;
