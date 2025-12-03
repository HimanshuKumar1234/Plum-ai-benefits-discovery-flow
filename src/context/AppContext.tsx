import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { BenefitCategory } from '../services/aiService';
import type { Benefit } from '../data/benefitsData';

interface AppState {
    userInput: string;
    setUserInput: (input: string) => void;

    category: BenefitCategory | null;
    setCategory: (category: BenefitCategory | null) => void;

    selectedBenefit: Benefit | null;
    setSelectedBenefit: (benefit: Benefit | null) => void;

    actionPlan: string[] | null;
    setActionPlan: (plan: string[] | null) => void;

    reset: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [userInput, setUserInput] = useState('');
    const [category, setCategory] = useState<BenefitCategory | null>(null);
    const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
    const [actionPlan, setActionPlan] = useState<string[] | null>(null);

    const reset = () => {
        setUserInput('');
        setCategory(null);
        setSelectedBenefit(null);
        setActionPlan(null);
    };

    return (
        <AppContext.Provider
            value={{
                userInput,
                setUserInput,
                category,
                setCategory,
                selectedBenefit,
                setSelectedBenefit,
                actionPlan,
                setActionPlan,
                reset,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
}
