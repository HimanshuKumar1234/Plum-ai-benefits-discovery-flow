import type { BenefitCategory } from '../services/aiService';

export interface Benefit {
    id: string;
    title: string;
    category: BenefitCategory;
    coverage: string;
    description: string;
    icon: string;
    color: string;
    features: string[];
}

export const benefitsDatabase: Benefit[] = [
    // Dental Benefits
    {
        id: 'dental-1',
        title: 'Comprehensive Dental Care',
        category: 'Dental',
        coverage: 'Up to $2,500/year',
        description: 'Complete dental coverage including preventive care, basic procedures, and major work. Includes cleanings, fillings, root canals, and crowns.',
        icon: '🦷',
        color: 'var(--health-dental)',
        features: [
            '2 free cleanings per year',
            '100% preventive care coverage',
            '80% basic procedures',
            '50% major procedures'
        ]
    },
    {
        id: 'dental-2',
        title: 'Orthodontic Care',
        category: 'Dental',
        coverage: 'Up to $3,000 lifetime',
        description: 'Coverage for braces, aligners, and other orthodontic treatments for both adults and children.',
        icon: '😁',
        color: 'var(--health-dental)',
        features: [
            'Traditional braces covered',
            'Clear aligners eligible',
            'Children & adult coverage',
            'Flexible payment plans'
        ]
    },
    {
        id: 'dental-3',
        title: 'Emergency Dental',
        category: 'Dental',
        coverage: '24/7 Coverage',
        description: '24/7 emergency dental care for urgent situations like severe pain, broken teeth, or infections.',
        icon: '🚨',
        color: 'var(--health-dental)',
        features: [
            '24/7 emergency hotline',
            'Same-day appointments',
            'Pain management included',
            'Network of providers'
        ]
    },

    // Mental Health Benefits
    {
        id: 'mental-1',
        title: 'Therapy & Counseling',
        category: 'Mental Health',
        coverage: 'Unlimited sessions',
        description: 'Access to licensed therapists and counselors for individual, couples, or family therapy with no session limits.',
        icon: '🧠',
        color: 'var(--health-mental)',
        features: [
            'Individual therapy',
            'Couples counseling',
            'Family therapy',
            'In-person & telehealth'
        ]
    },
    {
        id: 'mental-2',
        title: 'Wellness Programs',
        category: 'Mental Health',
        coverage: 'Included',
        description: 'Mindfulness, meditation, stress management workshops, and wellness coaching to support your mental wellbeing.',
        icon: '🧘',
        color: 'var(--health-mental)',
        features: [
            'Meditation sessions',
            'Stress management',
            'Wellness coaching',
            'Group workshops'
        ]
    },
    {
        id: 'mental-3',
        title: '24/7 Crisis Support',
        category: 'Mental Health',
        coverage: 'Always Available',
        description: 'Round-the-clock access to crisis counselors and mental health professionals for immediate support.',
        icon: '☎️',
        color: 'var(--health-mental)',
        features: [
            '24/7 crisis hotline',
            'Trained counselors',
            'Immediate support',
            'Confidential service'
        ]
    },

    // Vision Benefits
    {
        id: 'vision-1',
        title: 'Eye Exams & Glasses',
        category: 'Vision',
        coverage: '$300 for frames',
        description: 'Annual eye exams and allowance for frames and lenses. Wide selection of designer frames included.',
        icon: '👓',
        color: 'var(--health-vision)',
        features: [
            'Annual eye exam',
            'Designer frame options',
            'Lens upgrades available',
            'Scratch-resistant coating'
        ]
    },
    {
        id: 'vision-2',
        title: 'Contact Lenses',
        category: 'Vision',
        coverage: 'Up to $200/year',
        description: 'Coverage for contact lenses including fitting fees and follow-up visits.',
        icon: '👁️',
        color: 'var(--health-vision)',
        features: [
            'Fitting fees covered',
            'Multiple brand options',
            'Daily or monthly lenses',
            'Solution allowance'
        ]
    },
    {
        id: 'vision-3',
        title: 'LASIK Surgery',
        category: 'Vision',
        coverage: '15% discount',
        description: 'Discounted LASIK and corrective eye surgery through our network of certified ophthalmologists.',
        icon: '✨',
        color: 'var(--health-vision)',
        features: [
            '15% discount on LASIK',
            'Certified surgeons',
            'Free consultation',
            'Financing options'
        ]
    },

    // OPD Benefits
    {
        id: 'opd-1',
        title: 'General Consultations',
        category: 'OPD',
        coverage: 'Unlimited visits',
        description: 'Unlimited doctor consultations for general health concerns, preventive care, and routine check-ups.',
        icon: '👨‍⚕️',
        color: 'var(--health-opd)',
        features: [
            'Unlimited doctor visits',
            'Preventive care',
            'Routine check-ups',
            'Specialist referrals'
        ]
    },
    {
        id: 'opd-2',
        title: 'Diagnostic Tests',
        category: 'OPD',
        coverage: '100% coverage',
        description: 'Full coverage for diagnostic tests, lab work, X-rays, and medical imaging at network facilities.',
        icon: '🔬',
        color: 'var(--health-opd)',
        features: [
            'Blood tests covered',
            'X-rays & scans',
            'Lab work included',
            'Fast results'
        ]
    },
    {
        id: 'opd-3',
        title: 'Prescription Medications',
        category: 'OPD',
        coverage: '80% coverage',
        description: 'Substantial coverage for prescription medications at network pharmacies nationwide.',
        icon: '💊',
        color: 'var(--health-opd)',
        features: [
            'Generic drugs covered',
            'Brand name eligible',
            'Mail-order pharmacy',
            'Auto-refill option'
        ]
    },
    {
        id: 'opd-4',
        title: 'Preventive Care',
        category: 'OPD',
        coverage: '100% coverage',
        description: 'Complete coverage for annual physicals, vaccinations, screenings, and preventive health services.',
        icon: '💉',
        color: 'var(--health-opd)',
        features: [
            'Annual physicals',
            'Vaccinations',
            'Health screenings',
            'Wellness visits'
        ]
    }
];

/**
 * Get benefits by category
 */
export function getBenefitsByCategory(category: BenefitCategory): Benefit[] {
    if (category === 'Unknown') {
        return benefitsDatabase.slice(0, 4); // Return a mix
    }
    return benefitsDatabase.filter(benefit => benefit.category === category);
}

/**
 * Get benefit by ID
 */
export function getBenefitById(id: string): Benefit | undefined {
    return benefitsDatabase.find(benefit => benefit.id === id);
}

/**
 * Get random benefits (for fallback or suggestions)
 */
export function getRandomBenefits(count: number = 3): Benefit[] {
    const shuffled = [...benefitsDatabase].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
