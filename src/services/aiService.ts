import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export type BenefitCategory = 'Dental' | 'Mental Health' | 'Vision' | 'OPD' | 'Unknown';

export interface ClassificationResult {
  category: BenefitCategory;
  confidence: number;
}

export interface ActionPlan {
  steps: string[];
  additionalInfo?: string;
}

/**
 * Classifies user input into a benefit category using AI
 * @param userInput - The health-related text from the user
 * @returns The classified category and confidence score
 */
export async function classifyHealthNeed(userInput: string): Promise<ClassificationResult> {
  if (!genAI) {
    // Fallback to mock classification if API key is not available
    return mockClassifyHealthNeed(userInput);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are a healthcare benefits classifier. Analyze the following text and return ONLY the category name from this exact list: {Dental, Mental Health, Vision, OPD}.

Rules:
- Return ONLY ONE category name, nothing else
- Choose the most relevant category based on the health concern
- Dental: tooth pain, dental care, orthodontics, gum issues
- Mental Health: stress, anxiety, depression, therapy, counseling
- Vision: eye problems, glasses, contacts, eye exams
- OPD: general health, fever, cold, flu, minor injuries, consultations

User text: "${userInput}"

Category:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Extract category from response
    const validCategories: BenefitCategory[] = ['Dental', 'Mental Health', 'Vision', 'OPD'];
    const foundCategory = validCategories.find(cat =>
      text.toLowerCase().includes(cat.toLowerCase())
    );

    return {
      category: foundCategory || 'Unknown',
      confidence: foundCategory ? 0.85 : 0.3
    };
  } catch (error) {
    console.error('AI Classification Error:', error);
    // Fallback to mock classification
    return mockClassifyHealthNeed(userInput);
  }
}

/**
 * Generates a step-by-step action plan for a specific benefit
 * @param category - The benefit category
 * @param benefitName - The specific benefit selected
 * @returns A structured action plan
 */
export async function generateActionPlan(
  category: BenefitCategory,
  benefitName: string
): Promise<ActionPlan> {
  if (!genAI) {
    return mockGenerateActionPlan(category, benefitName);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are a healthcare benefits advisor. Generate a clear, actionable 3-step plan for an employee to avail a specific benefit.

Benefit Category: ${category}
Benefit Name: ${benefitName}

Instructions:
- Provide EXACTLY 3 steps
- Each step should be clear and actionable
- Format: Return only the steps, numbered 1-3
- Keep each step concise (max 2 sentences)
- Focus on practical actions the employee must take

Example format:
1. [First step description]
2. [Second step description]
3. [Third step description]

Generate the action plan:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Parse the steps from the response
    const steps = parseStepsFromResponse(text);

    return {
      steps,
      additionalInfo: steps.length === 3 ? undefined : 'Plan generated with partial data'
    };
  } catch (error) {
    console.error('AI Action Plan Error:', error);
    return mockGenerateActionPlan(category, benefitName);
  }
}

/**
 * Mock classification for fallback when API is unavailable
 */
function mockClassifyHealthNeed(userInput: string): ClassificationResult {
  const input = userInput.toLowerCase();

  if (input.includes('tooth') || input.includes('dental') || input.includes('cavity') || input.includes('gum')) {
    return { category: 'Dental', confidence: 0.9 };
  }
  if (input.includes('stress') || input.includes('anxiety') || input.includes('mental') || input.includes('therapy') || input.includes('depres')) {
    return { category: 'Mental Health', confidence: 0.9 };
  }
  if (input.includes('eye') || input.includes('vision') || input.includes('glasses') || input.includes('see')) {
    return { category: 'Vision', confidence: 0.9 };
  }
  if (input.includes('fever') || input.includes('cold') || input.includes('flu') || input.includes('doctor') || input.includes('sick')) {
    return { category: 'OPD', confidence: 0.85 };
  }

  return { category: 'OPD', confidence: 0.5 };
}

/**
 * Mock action plan generator for fallback
 */
function mockGenerateActionPlan(category: BenefitCategory, _benefitName: string): ActionPlan {
  const plans: Record<BenefitCategory, string[]> = {
    'Dental': [
      'Log in to your employee benefits portal and navigate to the Dental section.',
      'Select your preferred dentist from the network or upload a pre-approval form if using an out-of-network provider.',
      'Book your appointment and present your benefits card at the time of service. Claims are typically processed automatically.'
    ],
    'Mental Health': [
      'Access the mental health services section in your benefits portal or call the 24/7 helpline listed on your benefits card.',
      'Complete the initial assessment questionnaire to be matched with a suitable counselor or therapist.',
      'Schedule your first session (typically available within 3-5 business days) either in-person or via telehealth.'
    ],
    'Vision': [
      'Review your vision benefits coverage limits and eligible services in your benefits documentation.',
      'Search for an in-network optometrist or ophthalmologist using the provider directory in your portal.',
      'Schedule an eye exam and bring your benefits ID card. Apply any eligible reimbursement for glasses or contacts after your visit.'
    ],
    'OPD': [
      'Check your OPD (Outpatient Department) coverage details and any co-pay requirements in your benefits summary.',
      'Choose a nearby hospital or clinic from the approved network list or request a referral from your primary care physician.',
      'Visit the facility with your benefits card and necessary medical documents. Most cashless claims are settled directly by the insurer.'
    ],
    'Unknown': [
      'Visit your employee benefits portal or contact HR to understand your available healthcare benefits.',
      'Identify the specific category that matches your health need (Dental, Mental Health, Vision, or OPD).',
      'Follow the specific process for that benefit category to avail the services.'
    ]
  };

  return {
    steps: plans[category] || plans['Unknown']
  };
}

/**
 * Parse steps from AI response
 */
function parseStepsFromResponse(text: string): string[] {
  const lines = text.split('\n').filter(line => line.trim());
  const steps: string[] = [];

  for (const line of lines) {
    // Match lines that start with numbers (1., 2., 3., etc.)
    const match = line.match(/^\d+\.\s*(.+)$/);
    if (match && steps.length < 3) {
      steps.push(match[1].trim());
    }
  }

  // If we didn't find exactly 3 steps, use fallback
  if (steps.length !== 3) {
    return [
      'Review your benefit documentation to understand coverage details.',
      'Contact the healthcare provider or service center to schedule an appointment.',
      'Present your benefits card and complete the claim process as directed.'
    ];
  }

  return steps;
}

/**
 * Retry logic wrapper for AI calls
 */
export async function retryAICall<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError || new Error('AI call failed after retries');
}
