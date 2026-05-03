import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Counter.css';

interface CounterProps {
  anniversaryDate?: Date;
}

const Counter: React.FC<CounterProps> = ({ 
  anniversaryDate = new Date(2026, 4, 14) // May 14, 2026
}) => {
  const navigate = useNavigate();
  
  // State for slideshow
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // State for next anniversary countdown
  const [nextAnniversary, setNextAnniversary] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      calculateNextAnniversary();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Slideshow timer
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 9);
    }, 4000);

    return () => clearInterval(slideTimer);
  }, []);

  const calculateNextAnniversary = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let nextAnnivDate = new Date(currentYear, anniversaryDate.getMonth(), anniversaryDate.getDate());
    
    if (now > nextAnnivDate) {
      nextAnnivDate = new Date(currentYear + 1, anniversaryDate.getMonth(), anniversaryDate.getDate());
    }
    
    const diffInSeconds = Math.floor((nextAnnivDate.getTime() - now.getTime()) / 1000);
    
    if (diffInSeconds > 0) {
      const days = Math.floor(diffInSeconds / (24 * 3600));
      const hours = Math.floor((diffInSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;
      
      setNextAnniversary({ days, hours, minutes, seconds });
    }
  };

  // 9 Years Journey Slideshow Data
  const journeySlides = [
    { year: "Year 1", title: "The Beginning", description: "Our love story began 💕", emoji: "💑", imageUrl: "/images/20170610_175339.jpg.jpg"  },
    { year: "Year 2", title: "Growing Together", description: "Building beautiful memories ✨", emoji: "🌱", imageUrl: "/images/2017-11-11-15-54-41-613.jpg" },
    { year: "Year 3", title: "Adventures", description: "Exploring the world together 🌍", emoji: "✈️", imageUrl: "/images/20180121_192535.jpg" },
    { year: "Year 4", title: "Laughter & Joy", description: "Filled with happiness 😊", emoji: "😂", imageUrl: "/images/20180224_140216.jpg" },
    { year: "Year 5", title: "Stronger Together", description: "Our bond grows stronger 💪", emoji: "💪", imageUrl: "/images/20180226_110326.jpg" },
    { year: "Year 6", title: "Cherished Moments", description: "Every moment is precious 💖", emoji: "📸", imageUrl: "/images/20180312_170222.jpg" },
    { year: "Year 7", title: "Dreams Together", description: "Building our future 🌟", emoji: "⭐", imageUrl: "/images/20180405_171435.jpg" },
    { year: "Year 8", title: "Endless Love", description: "Love that knows no bounds 💗", emoji: "💝", imageUrl: "/images/20180617_145329.jpg" },
    { year: "Year 9", title: "Forever Us", description: "9 years and counting! 🎉", emoji: "🎊", imageUrl: "/images/received_1693195894673236.jpeg" }
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 9);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 9) % 9);
  };

  return (
    <section id="counter-section" className="counter-section">
      <div className="counter-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate('/')}>
          <span className="back-arrow">←</span>
          <span>Back to Home</span>
        </button>

        <div className="counter-header">
          <h2 className="counter-title">
            <span className="title-icon">⏱️</span>
            Countdown to Our Anniversary
            <span className="title-icon">💕</span>
          </h2>
          <p className="counter-subtitle">May 14, 2026 - Our Special Day! 💜</p>
        </div>

        {/* Next Anniversary Countdown - Main Focus */}
        <div className="next-anniversary main-countdown">
          <h3 className="next-title">
            💜 Counting Down to Our Special Day 💙
          </h3>
          <div className="next-countdown">
            <div className="countdown-item">
              <span className="countdown-number">{nextAnniversary.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{nextAnniversary.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{nextAnniversary.minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{nextAnniversary.seconds}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
          <div className="celebration-message">
            <p>✨ Until we celebrate our love! ✨</p>
          </div>
        </div>

        {/* Our 9 Years of Journey - Slideshow */}
        <div className="journey-slideshow">
          <h3 className="journey-title">
            <span className="journey-icon">📖</span>
            Our 9 Years of Journey
            <span className="journey-icon">💕</span>
          </h3>
          
          <div className="slideshow-container">
            <button className="slide-nav prev" onClick={prevSlide}>
              ‹
            </button>
            
            <div className="slide-wrapper">
              {journeySlides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  <div className="slide-image">
                    <img src={slide.imageUrl} alt={slide.year} />
                    <div className="slide-overlay"></div>
                  </div>
                  <div className="slide-content">
                    <div className="slide-year">
                      <span className="year-emoji">{slide.emoji}</span>
                      <span className="year-text">{slide.year}</span>
                    </div>
                    <div className="slide-title">{slide.title}</div>
                    <div className="slide-description">{slide.description}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="slide-nav next" onClick={nextSlide}>
              ›
            </button>
          </div>
          
          <div className="slide-dots">
            {journeySlides.map((_, index) => (
              <button 
                key={index} 
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          
          <div className="slide-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${((currentSlide + 1) / 9) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="counter-navigation">
          <button className="nav-next-btn" onClick={() => navigate('/games')}>
            Next: Love Games → 🎮
          </button>
        </div>
      </div>
    </section>
  );
};

export default Counter;