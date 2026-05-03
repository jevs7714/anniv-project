import React, { useState, useEffect } from 'react';
import './Hero.css';

interface HeroProps {
  partnerName?: string;
  onStartCelebration?: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  partnerName = "Langlinggg",
  onStartCelebration
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Hardcoded anniversary date: May 14, 2026
  const ANNIVERSARY_DATE = new Date(2026, 4, 14); // Month 4 = May

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Hardcoded display date - May 14, 2026
  const displayDate = "May 14, 2026";

  const getAnniversaryBadge = () => {
    const today = new Date();
    const anniversary = ANNIVERSARY_DATE;
    
    // Check if today is the anniversary
    if (today.getMonth() === anniversary.getMonth() && 
        today.getDate() === anniversary.getDate() &&
        today.getFullYear() === anniversary.getFullYear()) {
      return "🎉 TODAY IS THE DAY! 🎉";
    }
    
    // Calculate days until anniversary
    const daysUntil = Math.ceil((anniversary.getTime() - today.getTime()) / (1000 * 3600 * 24));
    if (daysUntil > 0 && daysUntil <= 30) {
      return `💝 ${daysUntil} days until our special day 💝`;
    } else if (daysUntil > 0) {
      return `💜 ${daysUntil} days until we celebrate 💙`;
    }
    
    // If anniversary has passed
    const daysSince = Math.ceil((today.getTime() - anniversary.getTime()) / (1000 * 3600 * 24));
    if (daysSince > 0) {
      return `✨ ${daysSince} days of love and counting ✨`;
    }
    
    return "✨ Every day is a celebration with you ✨";
  };

  const scrollToCounter = () => {
    if (onStartCelebration) {
      onStartCelebration();
      return;
    }
    
    const element = document.getElementById('counter-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      const counterElement = document.querySelector('.counter-section');
      if (counterElement) {
        counterElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <section className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
      {/* Animated background hearts */}
      <div className="hero-bg-animation">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="floating-heart-bg"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 8 + 6}s`
            }}
          >
            {['❤️', '💖', '💗', '💕', '💞', '🌸', '🌹', '💜', '💙'][Math.floor(Math.random() * 9)]}
          </div>
        ))}
      </div>

      <div className="hero-container">
        {/* Decorative rings */}
        <div className="hero-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>

        <div className="hero-content">
          {/* Anniversary Badge */}
          <div className="hero-badge">
            <span className="badge-icon">💜</span>
            <span className="badge-text">{getAnniversaryBadge()}</span>
            <span className="badge-icon">💙</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            <span className="title-line">Happy Anniversary</span>
            <div className="title-main">
              <span className="title-prefix">To My Dearest</span>
              <span className="pink-name">{partnerName}</span>
            </div>
          </h1>

          {/* Date and Celebration Info - Hardcoded Date */}
          <div className="hero-subtitle">
            <div className="date-display">
              <span className="date-icon">📅</span>
              <span className="date-text">{displayDate}</span>
            </div>
            <div className="divider">✦</div>
            <div className="celebration-badge">
              <span>Celebrating Our Love Story</span>
            </div>
          </div>

          {/* Romantic Tagline Rotator */}
          <div className="tagline-rotator">
            <RomanticTagline partnerName={partnerName} />
          </div>

          {/* Call to Action Button */}
          <div className="hero-cta">
            <button 
              className="cta-button"
              onClick={scrollToCounter}
            >
              <span>Start Our Celebration</span>
              <span className="button-icon">💜</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Romantic Tagline Rotator Component
const RomanticTagline: React.FC<{ partnerName: string }> = ({ partnerName }) => {
  const taglines = [
    `💜 ${partnerName}, every love story is beautiful, but ours is my favorite 💙`,
    `💙 ${partnerName}, you are my today and all of my tomorrows 💜`,
    `💜 ${partnerName}, together is my favorite place to be 💙`,
    `💙 In a sea of people, my eyes will always search for you, ${partnerName} 💜`,
    `💜 ${partnerName}, you make my world infinitely better 💙`,
    `💙 ${partnerName}, your love is the greatest gift I've ever received 💜`,
    `💜 Every day with you, ${partnerName}, feels like a fairytale 💙`,
    `💙 ${partnerName}, I love you more than all the stars in the sky 💜`,
    `💜 ${partnerName}, you are my sunshine on a cloudy day 💙`,
    `💙 ${partnerName}, meeting you was the best thing that ever happened to me 💜`
  ];

  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <div className="tagline-container">
      <div className="tagline-text">{taglines[currentTagline]}</div>
      <div className="tagline-dots">
        {taglines.map((_, idx) => (
          <span 
            key={idx} 
            className={`dot ${idx === currentTagline ? 'active' : ''}`}
            onClick={() => setCurrentTagline(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;