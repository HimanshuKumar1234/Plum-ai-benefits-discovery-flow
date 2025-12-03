import React from 'react';
import { motion } from 'framer-motion';
import './LoadingAnimation.css';

interface LoadingAnimationProps {
    message?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
    message = 'Analyzing your health needs...'
}) => {
    return (
        <motion.div
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="loading-content">
                {/* Animated Pulse Circles */}
                <div className="pulse-container">
                    <motion.div
                        className="pulse-circle pulse-1"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.1, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="pulse-circle pulse-2"
                        animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.2, 0.05, 0.2],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="pulse-circle pulse-3"
                        animate={{
                            scale: [1, 2.1, 1],
                            opacity: [0.1, 0.02, 0.1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Healthcare Icon Animation */}
                <motion.div
                    className="icon-container"
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="healthcare-icon">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <motion.path
                                d="M40 10C40 10 20 20 20 35C20 50 32 60 40 70C48 60 60 50 60 35C60 20 40 10 40 10Z"
                                stroke="url(#gradient1)"
                                strokeWidth="3"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.circle
                                cx="40"
                                cy="35"
                                r="8"
                                fill="url(#gradient2)"
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                            />
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="var(--primary-teal)" />
                                    <stop offset="100%" stopColor="var(--accent-blue)" />
                                </linearGradient>
                                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="var(--primary-teal)" />
                                    <stop offset="100%" stopColor="var(--accent-purple)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    className="loading-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3>{message}</h3>

                    {/* Animated Dots */}
                    <div className="loading-dots">
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        >.</motion.span>
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        >.</motion.span>
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        >.</motion.span>
                    </div>
                </motion.div>

                {/* Progress Bar */}
                <div className="progress-bar-container">
                    <motion.div
                        className="progress-bar"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingAnimation;
