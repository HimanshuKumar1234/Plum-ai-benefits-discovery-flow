import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, RefreshCw, ExternalLink } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { generateActionPlan } from '../services/aiService';
import './ActionPlanScreen.css';

const ActionPlanScreen: React.FC = () => {
    const navigate = useNavigate();
    const { selectedBenefit, actionPlan, setActionPlan, reset } = useAppState();
    const [isRegenerating, setIsRegenerating] = useState(false);

    if (!selectedBenefit || !actionPlan) {
        // Redirect if no benefit is selected
        navigate('/');
        return null;
    }

    const handleRegenerate = async () => {
        if (!selectedBenefit) return;

        setIsRegenerating(true);

        try {
            const plan = await generateActionPlan(selectedBenefit.category, selectedBenefit.title);
            setActionPlan(plan.steps);
        } catch (error) {
            console.error('Error regenerating plan:', error);
        } finally {
            setIsRegenerating(false);
        }
    };

    const handleBack = () => {
        navigate('/benefits');
    };

    const handleStartOver = () => {
        reset();
        navigate('/');
    };

    return (
        <div className="action-plan-screen">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="plan-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <button onClick={handleBack} className="back-button">
                        <ArrowLeft size={20} />
                        <span>Back to Benefits</span>
                    </button>
                </motion.div>

                {/* Benefit Summary Card */}
                <motion.div
                    className="benefit-summary"
                    style={{ '--card-color': selectedBenefit.color } as React.CSSProperties}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="summary-icon">{selectedBenefit.icon}</div>
                    <div className="summary-content">
                        <h2>{selectedBenefit.title}</h2>
                        <p className="summary-category">
                            <span className="category-dot" style={{ background: selectedBenefit.color }}></span>
                            {selectedBenefit.category}
                        </p>
                        <p className="summary-coverage">{selectedBenefit.coverage}</p>
                    </div>
                </motion.div>

                {/* Action Plan Section */}
                <motion.div
                    className="action-plan-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="plan-header-content">
                        <div>
                            <h3>
                                <CheckCircle2 size={28} className="plan-icon" />
                                Your Personalized Action Plan
                            </h3>
                            <p>Follow these steps to avail your benefit</p>
                        </div>
                        <button
                            onClick={handleRegenerate}
                            className="regenerate-button"
                            disabled={isRegenerating}
                        >
                            <RefreshCw size={18} className={isRegenerating ? 'spinning' : ''} />
                            <span>Regenerate</span>
                        </button>
                    </div>

                    {/* Steps */}
                    <div className="steps-container">
                        {actionPlan.map((step, index) => (
                            <motion.div
                                key={index}
                                className="step-card"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <div className="step-number" style={{ background: selectedBenefit.color }}>
                                    {index + 1}
                                </div>
                                <div className="step-content">
                                    <h4>Step {index + 1}</h4>
                                    <p>{step}</p>
                                </div>
                                <div className="step-check">
                                    <motion.div
                                        className="checkbox"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <CheckCircle2 size={24} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Additional Resources */}
                <motion.div
                    className="resources-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h4>Additional Resources</h4>
                    <div className="resources-grid">
                        <div className="resource-card">
                            <ExternalLink size={24} className="resource-icon" />
                            <div>
                                <h5>Benefits Portal</h5>
                                <p>Access your complete benefits information</p>
                            </div>
                        </div>
                        <div className="resource-card">
                            <ExternalLink size={24} className="resource-icon" />
                            <div>
                                <h5>Provider Directory</h5>
                                <p>Find healthcare providers in your network</p>
                            </div>
                        </div>
                        <div className="resource-card">
                            <ExternalLink size={24} className="resource-icon" />
                            <div>
                                <h5>Support Center</h5>
                                <p>Get help from our benefits team</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    className="plan-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <button onClick={handleStartOver} className="btn btn-secondary">
                        Discover More Benefits
                    </button>
                    <button className="btn btn-primary">
                        <span>Download Plan</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 3v10m0 0l4-4m-4 4L6 9m11 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default ActionPlanScreen;
