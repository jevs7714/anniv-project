import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Hero from './component/Hero/Hero';
import Counter from './component/Counter/Counter';
import Games from './component/Games/Games';
import './App.css';
import Gallery from './component/Gallery/Gallery';
import Surprises from './component/Suprises/Surprises';
import Letters from './component/Letters/Letters';
import Dance from './component/Dance/Dance';

// Wrapper component for Hero with navigation
const HeroWithNavigation: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartCelebration = () => {
    navigate('/counter');
  };
  
  return <Hero partnerName="Langlinggg" onStartCelebration={handleStartCelebration} />;
};

// Main App component with Router
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HeroWithNavigation />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/games" element={<Games />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/surprises" element={<Surprises />} />
          <Route path="/letters" element={<Letters />} />
          <Route path="/dance" element={<Dance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;