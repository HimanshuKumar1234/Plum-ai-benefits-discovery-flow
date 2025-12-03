# AI-Powered Benefits Discovery Flow

Healthcare-themed React app that helps employees discover health benefits using AI classification.

---

## 📦 Project Setup

```bash
# Install dependencies
npm install

# Add API key (optional - app works without it)
cp .env.example .env
# Add VITE_GEMINI_API_KEY=your_key to .env

# Start dev server
npm run dev

# Build for production
npm run build
```

**Get API Key**: https://makersuite.google.com/app/apikey

---


## 🏗️ Architecture

### Tech Stack
- React 18 + TypeScript + Vite
- React Router DOM (routing)
- Framer Motion (animations)
- Google Gemini AI (classification + plan generation)
- Lucide React (icons)

### Project Structure
```
src/
├── screens/          # 4 main screens (Input, Loading, Benefits, ActionPlan)
├── components/       # Reusable components (LoadingAnimation)
├── services/         # aiService.ts (Gemini integration + fallback)
├── data/             # benefitsData.ts (mock database)
├── context/          # AppContext.tsx (global state)
└── App.tsx           # Main app with routing
```

### Flow
```
Input Screen → AI Classification → Benefits Display → Action Plan
```

---

## 📱 Screens

### 1. Input Screen (`/`)
- User enters health need (e.g., "I have tooth pain")
- Animated healthcare icons, glassmorphism UI
- Example queries for guidance

**Screenshot**: 
![alt text](1page-2.png)



---

### 2. Loading Screen (`/loading`)
- AI processes input and classifies into category
- Custom loading animation with pulse effects
- Categories: 🦷 Dental | 🧠 Mental Health | 👁️ Vision | 🏥 OPD

**Screenshot**:
![alt text](2page-2.png)

---

### 3. Benefits Screen (`/benefits`)
- Shows 2-4 relevant benefit cards
- Category badges, coverage amounts (₹50,000)
- Click card to view action plan

**Screenshot**: 
![alt text](3page-2.png)

---

### 4. Action Plan Screen (`/action-plan`)
- Personalized 3-step guide to avail benefit
- Regenerate option for new plans
- Back button to explore more benefits

**Screenshot**: *(Add your screenshot here)*
![alt text](3page-2.png)

---

## 🤖 AI Prompt Strategy

### Classification Prompt (Model: `gemini-pro`)
```
You are a healthcare benefits classifier. Return ONLY the category name: {Dental, Mental Health, Vision, OPD}.

Rules:
- Return ONE category, nothing else
- Dental: tooth, gum, cavity
- Mental Health: stress, anxiety, therapy
- Vision: eye, glasses, contacts
- OPD: fever, cold, flu, general health

User text: "[input]"
Category:
```

**Fallback**: Keyword matching → Default to OPD  
**Confidence**: AI match (0.85) | Keyword (0.9) | Default (0.5)

---

### Action Plan Prompt (Model: `gemini-pro`)
```
Generate a 3-step plan for: [Benefit Name] in [Category]

Instructions:
- EXACTLY 3 steps, numbered 1-3
- Concise (max 2 sentences each)
- Actionable and practical

Format:
1. [Step description]
2. [Step description]
3. [Step description]
```

**Retry Logic**: 3 attempts with exponential backoff (1s, 2s, 3s)  
**Fallback**: Mock plans if AI fails

---

## 🐛 Known Issues

1. **Vague inputs** - "I feel tired" may be misclassified → Falls back to OPD
2. **No rate limiting** - Could hit API quota → Fallback system handles it
3. **Requires internet** - AI needs connection → Mock data works offline
4. **No input validation** - Accepts empty/short inputs → UX could improve

---

## 🚀 Improvements

### High Priority
- **Clarifying questions** when confidence < 0.6
- **Input validation** (min 10 characters, real-time feedback)
- **Better error UI** (retry button, network status)

### Medium Priority
- **Save favorites** to localStorage
- **PDF export** for action plans
- **Rate limiting** (10 requests/minute)

### Low Priority
- **Multi-language** support (English, Hindi, Spanish)
- **Voice input** for accessibility
- **Analytics** tracking

---

## 🎥 Demo Video Link

https://drive.google.com/file/d/1EYIyxhv3mjDAOpmX5g8gc1kVlmFawGDM/view?usp=sharing

---

## ✨ Bonus Features

✅ **Works without API key** - Intelligent fallback system  
✅ **Premium healthcare UI** - Glassmorphism, gradients, Framer Motion  
✅ **Performance optimized** - GPU animations, lazy loading, Vite  
✅ **Full TypeScript** - Type safety everywhere  
✅ **Retry logic** - Exponential backoff on failures  
✅ **Custom loading animation** - Branded healthcare theme  
✅ **Regenerate plans** - Get fresh AI-generated plans  
✅ **Trust indicators** - "Secure, Instant, AI-Powered" badges  
✅ **Example queries** - Quick-start suggestions  
✅ **Responsive design** - Mobile, tablet, desktop

---

**Built with ❤️ for better healthcare benefits discovery**
