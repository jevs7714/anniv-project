import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Surprises.css';

const Surprises: React.FC = () => {
  const navigate = useNavigate();
  
  // Love Meter State
  const [loveLevel, setLoveLevel] = useState(85);
  const [loveMessage, setLoveMessage] = useState("You make my heart smile! 💕");
  
  // Mystery Gift Box State
  const [giftOpened, setGiftOpened] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  
  // Secret Love Note State
  const [noteRevealed, setNoteRevealed] = useState(false);
  const [customNote, setCustomNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  
  // Virtual Photo Booth State
  const [photoFrame, setPhotoFrame] = useState<'romantic' | 'funny' | 'vintage'>('romantic');
  
  const loveMessages = [
    { min: 0, max: 20, message: "Let's spark more romance! 💫", emoji: "🌱" },
    { min: 21, max: 40, message: "Growing stronger every day! 🌸", emoji: "🌷" },
    { min: 41, max: 60, message: "Love is blooming beautifully! 💗", emoji: "🌹" },
    { min: 61, max: 80, message: "You're deeply loved! 💖", emoji: "💕" },
    { min: 81, max: 100, message: "Endless, infinite love! 💯💜", emoji: "✨" }
  ];
  
  const giftMessages = [
    "🎁 A romantic dinner date! 💕",
    "🎁 A cozy movie night at home! 🍿",
    "🎁 A weekend getaway surprise! ✈️",
    "🎁 A handwritten love letter! 💌",
    "🎁 Your favorite dessert! 🍰",
    "🎁 A relaxing spa day! 🧖‍♀️",
    "🎁 A beautiful bouquet of flowers! 🌹",
    "🎁 A star named after us! ⭐"
  ];
  
  const loveQuotes = [
    "💜 Every love story is beautiful, but ours is my favorite. 💙",
    "💙 You are my today and all of my tomorrows. 💜",
    "💜 Together is my favorite place to be. 💙",
    "💙 In a sea of people, my eyes will always search for you. 💜",
    "💜 You make my world infinitely better. 💙",
    "💙 Your love is the greatest gift I've ever received. 💜",
    "💜 Every day with you feels like a fairytale. 💙",
    "💙 I love you more than all the stars in the sky. 💜"
  ];
  
  // Handle Love Meter Change
  const handleLoveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLoveLevel(value);
    const messageObj = loveMessages.find(m => value >= m.min && value <= m.max);
    if (messageObj) {
      setLoveMessage(`${messageObj.emoji} ${messageObj.message} ${messageObj.emoji}`);
    }
  };
  
  // Handle Gift Box Click
  const openGift = () => {
    if (!giftOpened) {
      const randomIndex = Math.floor(Math.random() * giftMessages.length);
      setGiftMessage(giftMessages[randomIndex]);
      setGiftOpened(true);
      
      for (let i = 0; i < 15; i++) {
        setTimeout(() => createFloatingEmoji('🎁', i * 100), i * 100);
      }
    }
  };
  
  // Handle Secret Love Note
  const saveLoveNote = () => {
    if (customNote.trim()) {
      setSavedNote(customNote);
      setNoteRevealed(true);
      createFloatingEmoji('💌', 0);
      createFloatingEmoji('💕', 100);
      createFloatingEmoji('💖', 200);
    }
  };
  
  // Handle Celebration - Fixed without showConfetti
  const celebrate = () => {
    createConfetti();
  };
  
  // Create floating emojis
  const createFloatingEmoji = (emoji: string, delay: number) => {
    const container = document.getElementById('floating-emojis-container');
    if (!container) return;
    
    const floatingEmoji = document.createElement('div');
    floatingEmoji.className = 'floating-emoji';
    floatingEmoji.textContent = emoji;
    floatingEmoji.style.left = Math.random() * 100 + '%';
    floatingEmoji.style.animationDelay = `${delay}ms`;
    floatingEmoji.style.fontSize = `${Math.random() * 20 + 20}px`;
    container.appendChild(floatingEmoji);
    
    setTimeout(() => {
      floatingEmoji.remove();
    }, 3000);
  };
  
  // Create confetti
  const createConfetti = () => {
    const colors = ['#a855f7', '#3b82f6', '#ec4899', '#f472b6', '#818cf8', '#c084fc'];
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = Math.random() * 10 + 5 + 'px';
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }
  };
  
  // Get random love quote
  const getRandomQuote = () => {
    return loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
  };
  
  // Show message on frame change
  useEffect(() => {
    createFloatingEmoji('📸', 0);
  }, [photoFrame]);

  return (
    <section className="surprises-section" id="surprises-section">
      <div id="floating-emojis-container"></div>
      
      <div className="surprises-bg-decoration">
        <div className="surprises-bg-circle-1"></div>
        <div className="surprises-bg-circle-2"></div>
        <div className="surprises-bg-circle-3"></div>
        <div className="surprises-bg-circle-4"></div>
      </div>

      <div className="surprises-container">
        <div className="surprises-header">
          <div className="header-decoration">
            <span className="decoration-heart">🎁</span>
            <span className="decoration-star">✨</span>
            <span className="decoration-heart">🎉</span>
          </div>
          <h2 className="surprises-title">Interactive Surprises</h2>
          <p className="surprises-subtitle">Magical moments just for you 💫</p>
        </div>

        <div className="surprises-grid">
          {/* 1. Love Meter */}
          <div className="surprise-card glass-card">
            <div className="card-icon">💖</div>
            <h3>Love Meter</h3>
            <p className="card-description">How much do you love me?</p>
            
            <div className="love-meter">
              <div className="meter-value">
                <span className="value-number">{loveLevel}%</span>
                <span className="value-emoji">{loveLevel >= 80 ? '💯' : loveLevel >= 50 ? '💕' : '💗'}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={loveLevel} 
                onChange={handleLoveChange}
                className="love-slider"
              />
              <div className="love-message">{loveMessage}</div>
              <div className="meter-hearts">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`heart ${i * 20 < loveLevel ? 'active' : ''}`}>
                    {i * 20 < loveLevel ? '❤️' : '🖤'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Mystery Gift Box */}
          <div className="surprise-card glass-card">
            <div className="card-icon">🎁</div>
            <h3>Mystery Gift Box</h3>
            <p className="card-description">Tap to reveal your surprise!</p>
            
            <div className="gift-box" onClick={openGift}>
              {!giftOpened ? (
                <div className="gift-closed">
                  <div className="gift-lid"></div>
                  <div className="gift-body"></div>
                  <div className="gift-ribbon"></div>
                  <div className="gift-bow"></div>
                  <span className="gift-hint">🎁 Tap to open! 🎁</span>
                </div>
              ) : (
                <div className="gift-opened">
                  <div className="gift-content">
                    <span className="gift-emoji">🎉</span>
                    <p className="gift-message">{giftMessage}</p>
                    <button className="reset-gift" onClick={(e) => {
                      e.stopPropagation();
                      setGiftOpened(false);
                      setGiftMessage("");
                    }}>
                      ✨ New Gift ✨
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. Secret Love Note Revealer */}
          <div className="surprise-card glass-card">
            <div className="card-icon">💌</div>
            <h3>Secret Love Note</h3>
            <p className="card-description">Write a secret message for your love</p>
            
            {!noteRevealed ? (
              <div className="love-note-creator">
                <textarea 
                  className="note-input"
                  placeholder="Write your secret love note here... 💕"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  rows={4}
                />
                <button className="note-save-btn" onClick={saveLoveNote}>
                  <span>💌</span> Save Secret Note
                </button>
              </div>
            ) : (
              <div className="love-note-revealed">
                <div className="note-envelope">
                  <div className="note-content">
                    <p className="note-text">{savedNote}</p>
                    <div className="note-heart">💜💙</div>
                  </div>
                </div>
                <button className="reset-note" onClick={() => {
                  setNoteRevealed(false);
                  setCustomNote("");
                  setSavedNote("");
                }}>
                  Write New Note 📝
                </button>
              </div>
            )}
          </div>

          {/* 4. Confetti Celebration */}
          <div className="surprise-card glass-card">
            <div className="card-icon">🎆</div>
            <h3>Celebration Time!</h3>
            <p className="card-description">Make it rain confetti!</p>
            
            <div className="confetti-section">
              <button className="confetti-btn" onClick={celebrate}>
                <span>🎉</span> Celebrate! <span>🎊</span>
              </button>
              <div className="quote-display">
                <p className="random-quote">{getRandomQuote()}</p>
              </div>
            </div>
          </div>

          {/* 5. Virtual Photo Booth */}
          <div className="surprise-card glass-card photo-booth">
            <div className="card-icon">📸</div>
            <h3>Virtual Photo Booth</h3>
            <p className="card-description">Choose your style!</p>
            
            <div className="photo-booth-container">
              <div className="frame-selector">
                <button 
                  className={`frame-btn ${photoFrame === 'romantic' ? 'active' : ''}`}
                  onClick={() => setPhotoFrame('romantic')}
                >
                  💜 Romantic
                </button>
                <button 
                  className={`frame-btn ${photoFrame === 'funny' ? 'active' : ''}`}
                  onClick={() => setPhotoFrame('funny')}
                >
                  😄 Funny
                </button>
                <button 
                  className={`frame-btn ${photoFrame === 'vintage' ? 'active' : ''}`}
                  onClick={() => setPhotoFrame('vintage')}
                >
                  📻 Vintage
                </button>
              </div>
              
              <div className={`photo-frame ${photoFrame}`}>
                <div className="photo-frame-inner">
                  <div className="frame-decoration">
                    {photoFrame === 'romantic' && '💖✨💖'}
                    {photoFrame === 'funny' && '😂✨😂'}
                    {photoFrame === 'vintage' && '📻✨📻'}
                  </div>
                  <div className="frame-message">
                    {photoFrame === 'romantic' && "You + Me = Perfect 💕"}
                    {photoFrame === 'funny' && "Best partners in crime! 😎"}
                    {photoFrame === 'vintage' && "Timeless Love ❤️"}
                  </div>
                  <div className="frame-placeholder">
                    <span className="camera-icon">📷</span>
                    <p>Say "I Love You!"</p>
                  </div>
                  <div className="frame-date">{new Date().toLocaleDateString()}</div>
                </div>
              </div>
              
              <button className="photo-btn" onClick={() => {
                createFloatingEmoji('📸', 0);
                createFloatingEmoji('💜', 100);
                createFloatingEmoji('💙', 200);
                setTimeout(celebrate, 500);
              }}>
                <span>📸</span> Capture Moment
              </button>
            </div>
          </div>

          {/* 6. Daily Love Fortune */}
          <div className="surprise-card glass-card">
            <div className="card-icon">🔮</div>
            <h3>Love Fortune</h3>
            <p className="card-description">Your daily love prediction</p>
            
            <div className="fortune-cookie">
              <div className="fortune-message">
                <p>{getRandomQuote()}</p>
              </div>
              <button className="fortune-btn" onClick={() => {
                const fortuneDiv = document.querySelector('.fortune-message p');
                if (fortuneDiv) {
                  fortuneDiv.innerHTML = getRandomQuote();
                }
                createFloatingEmoji('🔮', 0);
              }}>
                <span>🔮</span> New Fortune
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="surprises-navigation">
          <button className="nav-back-btn" onClick={() => navigate('/gallery')}>
            <span>←</span> Back to Gallery
          </button>
          <button className="nav-next-btn" onClick={() => navigate('/letters')}>
            Next: Love Letters <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Surprises;