import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dance.css';

const Dance: React.FC = () => {
  const navigate = useNavigate();
  
  // Dance Request State
  const [showRequest, setShowRequest] = useState(true);
  const [requestAnswer, setRequestAnswer] = useState<'pending' | 'yes' | 'no'>('pending');
  const [noCount, setNoCount] = useState(0);
  const [noMessage, setNoMessage] = useState("");
  const [showGif, setShowGif] = useState(false);
  const [currentGif, setCurrentGif] = useState("");
  
  // No button position and size state
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [buttonMoved, setButtonMoved] = useState(false);
  
  // State for music player
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVisualizer, setShowVisualizer] = useState(false);
  
  // State for dance tutorial
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  
  // State for ambiance
  const [candlelightMode, setCandlelightMode] = useState(false);
  
  // Audio element reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Working GIFs from reliable sources
  const reactionGifs = {
    sad: "https://media1.tenor.com/m/-hxW9E9VkgkAAAAC/puppy-sad.gif",
    crying: "https://media1.tenor.com/m/NE0zGknMheMAAAAC/sad-cat.gif",
    pleading: "https://media1.tenor.com/m/1e06I7gFZRYAAAAC/peach-goma.gif",
    dancing: "https://media1.tenor.com/m/-70gNhKnDL0AAAAC/dancing-heart-heart.gif",
    celebration: "https://media1.tenor.com/m/BQzDdCm5dfkAAAAC/happy-dance.gif",
    love: "https://media1.tenor.com/m/8eKvFnM_lbEAAAAd/cute-love.gif",
    happy: "https://media1.tenor.com/m/xYv0Vb2sKPUAAAAC/happy-dance-yay.gif",
    shy: "https://media1.tenor.com/m/V0WiWzdM0zQAAAAC/kiss-bear.gif"
  };
  
  // Romantic music
  const romanticMusic = {
    title: "Romantic Music",
    artist: "D.A.N.I.E.L J.A.N.G",
    url: "/music/romantic-music.mp3",
    duration: "4:30"
  };
  
  // Dance steps
  const danceSteps = [
    { name: "Step Together", emoji: "👫", description: "Face each other, step forward together" },
    { name: "Slow Turn", emoji: "💫", description: "Gentle turn while holding hands" },
    { name: "Side Step", emoji: "💃", description: "Step to the side and sway" },
    { name: "Spin", emoji: "🔄", description: "One partner spins under the arm" },
    { name: "Dip", emoji: "💕", description: "Romantic dip and kiss" }
  ];
  
  // Romantic messages
  const romanticMessages = [
    "Let the music guide your hearts 💜",
    "Dance like nobody's watching 💙",
    "Every step brings us closer 💕",
    "Lost in the rhythm of love ✨",
    "This moment is ours forever 💖"
  ];
  
  // No button messages
  const noMessages = [
    "Are you sure? 🥺",
    "Pretty please? 💜",
    "It'll be fun! ✨",
    "Just one dance? 💕",
    "You know you want to! 💙",
    "I promise it'll be magical 💫",
    "Dance with me? 🥰",
    "Say yes to love! 💖",
    "Let's create memories 💗",
    "You can't resist! 😘"
  ];
  
  // Function to get random position within container
  const getRandomPosition = () => {
    if (!containerRef.current || !noButtonRef.current) return { top: 0, left: 0 };
    
    const modalRect = document.querySelector('.dance-request-modal')?.getBoundingClientRect();
    const buttonRect = noButtonRef.current.getBoundingClientRect();
    
    if (!modalRect) return { top: 0, left: 0 };
    
    const maxTop = modalRect.height - buttonRect.height - 60;
    const maxLeft = modalRect.width - buttonRect.width - 40;
    
    const randomTop = Math.random() * maxTop;
    const randomLeft = Math.random() * maxLeft;
    
    return { top: Math.max(10, randomTop), left: Math.max(10, randomLeft) };
  };
  
  // Show GIF with timeout
  const showReactionGif = (gifType: keyof typeof reactionGifs, duration: number = 2000) => {
    const gifUrl = reactionGifs[gifType];
    if (gifUrl) {
      setCurrentGif(gifUrl);
      setShowGif(true);
      setTimeout(() => {
        setShowGif(false);
      }, duration);
    }
  };
  
  // Handle dance request
  const handleYes = () => {
    setRequestAnswer('yes');
    setShowRequest(false);
    setIsPlaying(true);
    createFloatingHearts();
    createConfetti();
    setShowTutorial(true);
    showReactionGif('celebration', 3000);
  };
  
  const handleNo = () => {
    const newCount = noCount + 1;
    setNoCount(newCount);
    setNoMessage(noMessages[Math.min(newCount - 1, noMessages.length - 1)]);
    setRequestAnswer('no');
    
    if (newCount === 1) {
      showReactionGif('sad', 1500);
    } else if (newCount === 2) {
      showReactionGif('crying', 1500);
    } else if (newCount >= 3) {
      showReactionGif('pleading', 1800);
    }
    
    const newSize = Math.max(0.3, 1 - (newCount * 0.12));
    setNoButtonSize(newSize);
    
    if (newCount >= 2) {
      const newPosition = getRandomPosition();
      setNoButtonPosition(newPosition);
      setButtonMoved(true);
    }
    
    setTimeout(() => {
      setRequestAnswer('pending');
      if (newCount >= 5) {
        setNoMessage("💜 Just say YES already! 💙");
        showReactionGif('shy', 2000);
      }
    }, 2000);
  };
  
  useEffect(() => {
    if (!showRequest) {
      setNoCount(0);
      setNoButtonSize(1);
      setButtonMoved(false);
      setNoMessage("");
      setShowGif(false);
    }
  }, [showRequest]);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        startVisualizer();
      } else {
        audioRef.current.pause();
        stopVisualizer();
      }
    }
  }, [isPlaying]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const startVisualizer = () => {
    setShowVisualizer(true);
    const container = document.querySelector('.music-visualizer');
    if (container) {
      container.innerHTML = '';
      for (let i = 0; i < 20; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.height = `${Math.random() * 80 + 20}px`;
        bar.style.animationDelay = `${i * 0.1}s`;
        container.appendChild(bar);
      }
    }
  };
  
  const stopVisualizer = () => {
    setShowVisualizer(false);
    const container = document.querySelector('.music-visualizer');
    if (container) {
      container.innerHTML = '';
    }
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleCandlelight = () => {
    setCandlelightMode(!candlelightMode);
    createFloatingSparkles();
    showReactionGif('love', 1500);
  };
  
  const celebrate = () => {
    createConfetti();
    createFloatingHearts();
    showReactionGif('happy', 2500);
  };
  
  const createConfetti = () => {
    const colors = ['#a855f7', '#3b82f6', '#ec4899', '#f472b6', '#818cf8', '#c084fc'];
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'dance-confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 12 + 6 + 'px';
      confetti.style.height = Math.random() * 12 + 6 + 'px';
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  };
  
  const createFloatingHearts = () => {
    const container = document.getElementById('floating-dance-hearts');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-dance-heart';
      heart.textContent = ['💜', '💙', '💖', '💕', '💗', '💝'][Math.floor(Math.random() * 6)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDelay = `${i * 0.1}s`;
      heart.style.fontSize = `${Math.random() * 25 + 20}px`;
      container.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 4000);
    }
  };
  
  const createFloatingSparkles = () => {
    const container = document.getElementById('floating-dance-hearts');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'floating-dance-heart';
      sparkle.textContent = '✨';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.animationDelay = `${i * 0.15}s`;
      sparkle.style.fontSize = `${Math.random() * 15 + 15}px`;
      container.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 3000);
    }
  };
  
  const nextStep = () => {
    if (currentStep + 1 < danceSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
      celebrate();
      showReactionGif('dancing', 2000);
    }
  };
  
  const getRandomMessage = () => {
    return romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
  };
  
  const resetRequest = () => {
    setShowRequest(true);
    setRequestAnswer('pending');
    setNoCount(0);
    setNoMessage("");
    setNoButtonSize(1);
    setButtonMoved(false);
    setIsPlaying(false);
    setShowTutorial(false);
    setCurrentStep(0);
    setShowGif(false);
  };

  const getNoButtonStyle = () => {
    const style: React.CSSProperties = {
      transform: `scale(${noButtonSize})`,
      transition: 'transform 0.3s ease, top 0.4s ease, left 0.4s ease',
    };
    
    if (buttonMoved && noButtonPosition) {
      style.position = 'absolute';
      style.top = `${noButtonPosition.top}px`;
      style.left = `${noButtonPosition.left}px`;
    }
    
    return style;
  };

  return (
    <section className={`dance-section ${candlelightMode ? 'candlelight' : ''}`} id="dance-section">
      <div id="floating-dance-hearts"></div>
      
      <div className="dance-bg-decoration">
        <div className="dance-bg-circle-1"></div>
        <div className="dance-bg-circle-2"></div>
        <div className="dance-bg-circle-3"></div>
        <div className="dance-bg-circle-4"></div>
      </div>
      
      {candlelightMode && (
        <div className="candlelight-overlay"></div>
      )}
      
      {showGif && currentGif && (
        <div className="gif-modal">
          <img 
            src={currentGif} 
            alt="reaction" 
            className="reaction-gif"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="dance-container">
        <div className="dance-header">
          <div className="header-decoration">
            <span className="decoration-heart">💃</span>
            <span className="decoration-star">✨</span>
            <span className="decoration-heart">🕺</span>
          </div>
          <h2 className="dance-title">Dance Together</h2>
          <p className="dance-subtitle">Let the rhythm of love guide your feet 💫</p>
        </div>
        
        {showRequest && (
          <div className="dance-request-overlay">
            <div className="dance-request-modal" ref={containerRef}>
              <div className="request-animation">
                <span className="request-emoji">💃</span>
                <span className="request-emoji">🕺</span>
                <span className="request-emoji">💑</span>
              </div>
              
              <h3 className="request-question">Will you dance with me?</h3>
              
              {requestAnswer === 'no' && (
                <div className="request-message">
                  <p>{noMessage}</p>
                </div>
              )}
              
              <div className="request-buttons" style={{ position: 'relative', minHeight: '120px' }}>
                <button 
                  className="request-yes"
                  onClick={handleYes}
                  disabled={requestAnswer !== 'pending'}
                >
                  <span>💜</span> Yes <span>💙</span>
                </button>
                <button 
                  ref={noButtonRef}
                  className="request-no"
                  onClick={handleNo}
                  disabled={requestAnswer !== 'pending'}
                  style={getNoButtonStyle()}
                >
                  <span>💔</span> No <span>💔</span>
                </button>
              </div>
              
              {noCount > 0 && requestAnswer === 'pending' && (
                <div className="request-hint">
                  <p>✨ Just say yes! It'll be magical ✨</p>
                </div>
              )}
              
              {noCount >= 3 && (
                <div className="request-persuasion">
                  <p>💜 The button is running away... just say YES! 💙</p>
                </div>
              )}
              
              {noCount >= 5 && (
                <div className="request-desperate">
                  <p>😘 I'll do anything! Please say YES! 😘</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {!showRequest && (
          <>
            <div className="dance-grid">
              <div className="dance-card glass-card music-player">
                <div className="card-icon">🎵</div>
                <h3>Our Romantic Music</h3>
                
                <div className="current-song">
                  <div className="song-artwork">
                    <span className="artwork-emoji">🎻</span>
                  </div>
                  <div className="song-details">
                    <div className="song-title">{romanticMusic.title}</div>
                    <div className="song-artist">{romanticMusic.artist}</div>
                  </div>
                </div>
                
                <div className="music-controls">
                  <button className={`control-btn play-pause ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
                    <span>{isPlaying ? '⏸' : '▶'}</span>
                  </button>
                  <div className="volume-control">
                    <span className="volume-icon">🔊</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume} 
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="volume-slider"
                    />
                  </div>
                </div>
                
                {showVisualizer && (
                  <div className="music-visualizer"></div>
                )}
                
                <audio ref={audioRef} src={romanticMusic.url} loop />
              </div>
              
              <div className="dance-card glass-card dance-tutorial">
                <div className="card-icon">💃</div>
                <h3>Simple Dance Tutorial</h3>
                <p className="card-description">Learn a romantic dance together</p>
                
                {!showTutorial ? (
                  <div className="tutorial-preview">
                    <div className="preview-animation">
                      <span className="preview-emoji">💑</span>
                      <div className="preview-steps">
                        <span>👫</span>
                        <span>💫</span>
                        <span>💃</span>
                        <span>🔄</span>
                        <span>💕</span>
                      </div>
                    </div>
                    <button className="start-tutorial-btn" onClick={() => setShowTutorial(true)}>
                      <span>✨</span> Start Dancing <span>✨</span>
                    </button>
                  </div>
                ) : (
                  <div className="tutorial-active">
                    <div className="step-counter">
                      Step {currentStep + 1} of {danceSteps.length}
                    </div>
                    <div className="current-step">
                      <div className="step-emoji">{danceSteps[currentStep].emoji}</div>
                      <div className="step-name">{danceSteps[currentStep].name}</div>
                      <div className="step-description">{danceSteps[currentStep].description}</div>
                    </div>
                    <div className="step-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${((currentStep + 1) / danceSteps.length) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="tutorial-actions">
                      <button className="next-step-btn" onClick={nextStep}>
                        {currentStep + 1 === danceSteps.length ? 'Complete Dance 🎉' : 'Next Step →'}
                      </button>
                      <button className="exit-tutorial-btn" onClick={() => setShowTutorial(false)}>
                        Exit Tutorial
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="dance-card glass-card atmosphere">
                <div className="card-icon">🕯️</div>
                <h3>Set the Mood</h3>
                
                <div className="atmosphere-controls">
                  <button className={`atmo-btn ${candlelightMode ? 'active' : ''}`} onClick={toggleCandlelight}>
                    <span>🕯️</span> Candlelight Mode
                  </button>
                  <button className="atmo-btn" onClick={celebrate}>
                    <span>🎉</span> Fireworks
                  </button>
                </div>
                
                <div className="romantic-message">
                  <p className="message-text">{getRandomMessage()}</p>
                </div>
              </div>
              
              <div className="dance-card glass-card dance-floor">
                <div className="card-icon">🪩</div>
                <h3>Virtual Dance Floor</h3>
                
                <div className="dance-floor-animation">
                  <div className="dance-floor-lights">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="light" style={{ animationDelay: `${i * 0.15}s` }}></div>
                    ))}
                  </div>
                  <div className="dancing-couple">
                    <div className="dancer dancer-left">
                      <span>💃</span>
                      <div className="dance-shadow"></div>
                    </div>
                    <div className="dancer dancer-right">
                      <span>🕺</span>
                      <div className="dance-shadow"></div>
                    </div>
                  </div>
                  <div className="dance-floor-text">
                    <p>You + Me = Perfect Rhythm</p>
                  </div>
                </div>
              </div>
              
              <div className="dance-card glass-card share-moment">
                <div className="card-icon">📸</div>
                <h3>Capture the Moment</h3>
                
                <div className="share-options">
                  <button className="share-btn" onClick={celebrate}>
                    <span>🎉</span> Celebrate Now!
                  </button>
                  <button className="reset-dance-btn" onClick={resetRequest}>
                    <span>🔄</span> Ask Again
                  </button>
                  <div className="moment-quote">
                    <p>"Dance is the hidden language of the soul"</p>
                    <span>- Martha Graham</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="final-celebration">
              <button className="final-celebrate-btn" onClick={() => {
                celebrate();
                createFloatingHearts();
                createConfetti();
                setIsPlaying(true);
                showReactionGif('dancing', 3000);
              }}>
                <span>💜</span> Let's Celebrate Our Love! <span>💙</span>
              </button>
            </div>
          </>
        )}
        
        <div className="dance-navigation">
          <button className="nav-back-btn" onClick={() => navigate('/letters')}>
            <span>←</span> Back to Letters
          </button>
          <button className="nav-home-btn" onClick={() => navigate('/')}>
            <span>🏠</span> Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dance;