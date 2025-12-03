import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import InputScreen from './screens/InputScreen';
import LoadingScreen from './screens/LoadingScreen';
import BenefitsScreen from './screens/BenefitsScreen';
import ActionPlanScreen from './screens/ActionPlanScreen';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<InputScreen />} />
            <Route path="/loading" element={<LoadingScreen />} />
            <Route path="/benefits" element={<BenefitsScreen />} />
            <Route path="/action-plan" element={<ActionPlanScreen />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
