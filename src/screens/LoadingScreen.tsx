import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../components/LoadingAnimation';
import { useAppState } from '../context/AppContext';

const LoadingScreen: React.FC = () => {
    const navigate = useNavigate();
    const { category } = useAppState();

    useEffect(() => {
        // If no category is set after a few seconds, redirect to input
        const timeout = setTimeout(() => {
            if (!category) {
                navigate('/');
            }
        }, 10000);

        return () => clearTimeout(timeout);
    }, [category, navigate]);

    return <LoadingAnimation message="Analyzing your health needs with AI..." />;
};

export default LoadingScreen;
