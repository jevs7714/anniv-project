import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Letters.css';

const Letters: React.FC = () => {
  const navigate = useNavigate();
  
  // State for Love Letter Generator
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageType, setMessageType] = useState<'romantic' | 'funny' | 'deep'>('romantic');
  
  // State for Private Note
  const [privateNote, setPrivateNote] = useState("");
  const [savedPrivateNote, setSavedPrivateNote] = useState("");
  const [showSavedNote, setShowSavedNote] = useState(false);
  
  // State for 10 Reasons
  const [reasons, setReasons] = useState<string[]>([
    "Your beautiful smile lights up my day",
    "The way you make me laugh even when I'm down",
    "Your kind and caring heart",
    "The adventures we share together",
    "How you always know what to say",
    "Your strength and determination",
    "The little surprises you plan for me",
    "How you make everything better just by being there",
    "The way you look at me like I'm the only one",
    "Every single moment we spend together"
  ]);
  const [editingReason, setEditingReason] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  
  // State for Bible Verse of the Day
  const [dailyVerse, setDailyVerse] = useState("");
  const [verseReference, setVerseReference] = useState("");
  
  // State for Love Letter Archive
  const [savedLetters, setSavedLetters] = useState<{ id: number; message: string; date: string }[]>([]);
  
  // Special Anniversary Letter State
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  
  // YouTube Video State
  const [showVideo, setShowVideo] = useState(false);
  
  // Your Special Anniversary Letter
  const anniversaryLetter = `Happy Anniversary Langlingggg, akong pinalanggang asawa. 

I'm so happy, grateful and blessed na ikaw akong na uyab langlingggg. Dako jud kaayu ko pasalamat ni Lord Jesus Christ na ikaw akong na uyab ug ma asawa soon in God's will kay ge tagaan ko niyag uyab na gwapa, sexy, sweet, kind, loving and Christ centered na uyab.

Pasensya kaayu langlinggg kung na pa feel tika usahay nga dle ka importante, but wla jud nku to tuyoa. Ganahan jud ko na ma bag-o na akong style. Ganahan ko maka feel ka everyday kung unsa tika ka love. Please ayaw tawn ko bya-eh kay lisod jud kaayu. I'm willing to change kung unsa tong mga kuwang nku sa imo just don't leave me.

I pray to Lord Jesus Christ that he will guide us sa atong life and relationship. So that ma overcome nato atong mga obstacles sa atong relationship. And we will grow older together and I will sit in my chair tapad sa imoha and we will watch the sunset together and mag tabi-tabi ta about sa atong past lives and we laugh with each other sa atong kaagi. 

Happy Anniversary Langlingggg akong asawa, I hope nga ako ra gihapon imong pilion hantod ma tiguwang ta.

I love you so much baby norissa nku my wify mwwwuuaahh hmmmmm. 💜💙`;
  
  // Bible Verses about Love
  const bibleVerses = [
    { verse: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", reference: "1 Corinthians 13:4" },
    { verse: "Above all, love each other deeply, because love covers over a multitude of sins.", reference: "1 Peter 4:8" },
    { verse: "We love because he first loved us.", reference: "1 John 4:19" },
    { verse: "And now these three remain: faith, hope and love. But the greatest of these is love.", reference: "1 Corinthians 13:13" },
    { verse: "Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.", reference: "Proverbs 3:3" },
    { verse: "My command is this: Love each other as I have loved you.", reference: "John 15:12" },
    { verse: "There is no fear in love. But perfect love drives out fear.", reference: "1 John 4:18" },
    { verse: "Husbands, love your wives, just as Christ loved the church and gave himself up for her.", reference: "Ephesians 5:25" },
    { verse: "Be completely humble and gentle; be patient, bearing with one another in love.", reference: "Ephesians 4:2" },
    { verse: "And over all these virtues put on love, which binds them all together in perfect unity.", reference: "Colossians 3:14" },
    { verse: "Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God.", reference: "1 John 4:7" },
    { verse: "Hatred stirs up conflict, but love covers over all wrongs.", reference: "Proverbs 10:12" }
  ];
  
  // Predefined love messages
  const romanticMessages = [
    "Every love story is beautiful, but ours is my favorite. 💕",
    "You are my today and all of my tomorrows. 💖",
    "In a sea of people, my eyes will always search for you. 💗",
    "You make my world infinitely better just by being in it. ✨",
    "Loving you is the easiest thing I've ever done. 💜",
    "Every day with you feels like a fairytale. 🌟",
    "You're the reason my life is so beautiful. 💫",
    "I fall in love with you more every single day. 💝"
  ];
  
  const funnyMessages = [
    "I love you more than pizza... and that's saying a lot! 🍕",
    "You're the cheese to my macaroni! 🧀",
    "Thanks for putting up with my weirdness. Love you! 😜",
    "I love you like a fat kid loves cake! 🎂",
    "You're the only person I'd share my fries with! 🍟",
    "I love you more than coffee... and that's serious! ☕",
    "You're the peanut butter to my jelly! 🥜",
    "Thanks for being my favorite weirdo! 🤪"
  ];
  
  const deepMessages = [
    "Your love has taught me what it truly means to be alive. 🌅",
    "In your arms, I've found my home, my peace, and my forever. 🏠",
    "You are the poetry my heart never knew how to write. 📖",
    "Every heartbeat whispers your name. 💓",
    "Loving you isn't just a feeling, it's my entire existence. 🌌",
    "You're not just my love, you're my greatest adventure. 🗺️",
    "With you, I've discovered a love I never knew existed. 🌈",
    "You are the answer to every prayer I never dared to speak. 🙏"
  ];
  
  // Initialize random messages
  useEffect(() => {
    generateRandomMessage();
    setRandomBibleVerse();
    
    // Load saved letters from localStorage
    const stored = localStorage.getItem('loveLetters');
    if (stored) {
      setSavedLetters(JSON.parse(stored));
    }
    
    // Load saved private note
    const storedNote = localStorage.getItem('privateNote');
    if (storedNote) {
      setSavedPrivateNote(storedNote);
    }
  }, []);
  
  const generateRandomMessage = () => {
    let messages: string[];
    if (messageType === 'romantic') messages = romanticMessages;
    else if (messageType === 'funny') messages = funnyMessages;
    else messages = deepMessages;
    
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);
  };
  
  const setRandomBibleVerse = () => {
    const randomIndex = Math.floor(Math.random() * bibleVerses.length);
    setDailyVerse(bibleVerses[randomIndex].verse);
    setVerseReference(bibleVerses[randomIndex].reference);
  };
  
  const saveLoveLetter = () => {
    if (currentMessage) {
      const newLetter = {
        id: Date.now(),
        message: currentMessage,
        date: new Date().toLocaleDateString()
      };
      const updatedLetters = [newLetter, ...savedLetters];
      setSavedLetters(updatedLetters);
      localStorage.setItem('loveLetters', JSON.stringify(updatedLetters));
      createFloatingHeart();
    }
  };
  
  const savePrivateNoteToStorage = () => {
    if (privateNote.trim()) {
      setSavedPrivateNote(privateNote);
      localStorage.setItem('privateNote', privateNote);
      setShowSavedNote(true);
      createFloatingHeart();
    }
  };
  
  const deletePrivateNote = () => {
    setSavedPrivateNote("");
    setPrivateNote("");
    localStorage.removeItem('privateNote');
    setShowSavedNote(false);
  };
  
  const updateReason = (index: number) => {
    if (editText.trim()) {
      const newReasons = [...reasons];
      newReasons[index] = editText;
      setReasons(newReasons);
      setEditingReason(null);
      setEditText("");
      createFloatingHeart();
    }
  };
  
  const addNewReason = () => {
    setReasons([...reasons, "New reason I love you 💕"]);
  };
  
  const deleteReason = (index: number) => {
    const newReasons = reasons.filter((_, i) => i !== index);
    setReasons(newReasons);
  };
  
  const deleteLetter = (id: number) => {
    const updatedLetters = savedLetters.filter(letter => letter.id !== id);
    setSavedLetters(updatedLetters);
    localStorage.setItem('loveLetters', JSON.stringify(updatedLetters));
  };
  
  const createFloatingHeart = () => {
    const container = document.getElementById('floating-hearts-container');
    if (!container) return;
    
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart-letter';
      heart.textContent = ['💜', '💙', '💖', '💕', '💗'][Math.floor(Math.random() * 5)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDelay = `${i * 0.1}s`;
      heart.style.fontSize = `${Math.random() * 20 + 15}px`;
      container.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 3000);
    }
  };
  
  // Functions for letter
  const handleOpenLetter = () => {
    setIsLetterOpen(true);
    createFloatingHeart();
  };
  
  const handleCloseLetter = () => {
    setIsLetterOpen(false);
  };

  return (
    <section className="letters-section" id="letters-section">
      <div id="floating-hearts-container"></div>
      
      <div className="letters-bg-decoration">
        <div className="letters-bg-circle-1"></div>
        <div className="letters-bg-circle-2"></div>
        <div className="letters-bg-circle-3"></div>
      </div>

      <div className="letters-container">
        <div className="letters-header">
          <div className="header-decoration">
            <span className="decoration-heart">💌</span>
            <span className="decoration-star">✨</span>
            <span className="decoration-heart">💝</span>
          </div>
          <h2 className="letters-title">Love Letters & Messages</h2>
          <p className="letters-subtitle">Express your heart's deepest feelings 💖</p>
        </div>

        {/* Video Presentation Modal */}
        {showVideo && (
          <div className="video-modal" onClick={() => setShowVideo(false)}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-video-btn" onClick={() => setShowVideo(false)}>✕</button>
              <div className="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/E05FwDm8B3c?si=jIBlyPkxEc-XsM-1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Special Anniversary Letter - Main Feature */}
        <div className="special-letter-card glass-card">
          <div className="card-icon">💌</div>
          <h3>My Special Letter to You 💜</h3>
          <p className="card-description">Happy Anniversary Langlingggg ❤️</p>
          
          {!isLetterOpen ? (
            <div className="letter-preview">
              <div className="envelope-icon">✉️</div>
              <p className="preview-text">A special anniversary letter is waiting for you...</p>
              <button className="open-letter-btn" onClick={handleOpenLetter}>
                <span>💜</span> Open Letter <span>💙</span>
              </button>
            </div>
          ) : (
            <div className="full-letter">
              <div className="letter-content">
                {anniversaryLetter.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="letter-paragraph">{paragraph}</p>
                ))}
              </div>
              <button className="close-letter-btn" onClick={handleCloseLetter}>
                <span>💕</span> Close Letter
              </button>
            </div>
          )}
        </div>

        <div className="letters-grid">
          {/* 1. Video Presentation */}
          <div className="letter-card glass-card video-card">
            <div className="card-icon">🎥</div>
            <h3>Romantic Video Presentation For Langlinggg</h3>
            <p className="card-description">Watch our special video 💜</p>
            
            <div className="video-preview">
              <div className="video-thumbnail" onClick={() => setShowVideo(true)}>
                <img 
                  src="/images/20170610_175339.jpg.jpg" 
                  alt="Romantic Video"
                />
                <div className="play-overlay">
                  <div className="play-button">▶</div>
                </div>
              </div>
              <p className="video-caption">Click to play our romantic presentation</p>
            </div>
          </div>

          {/* 2. Love Note Generator */}
          <div className="letter-card glass-card">
            <div className="card-icon">💌</div>
            <h3>Love Note Generator</h3>
            <p className="card-description">Tap for a romantic message</p>
            
            <div className="message-type-selector">
              <button 
                className={`type-btn ${messageType === 'romantic' ? 'active' : ''}`}
                onClick={() => setMessageType('romantic')}
              >
                💖 Romantic
              </button>
              <button 
                className={`type-btn ${messageType === 'funny' ? 'active' : ''}`}
                onClick={() => setMessageType('funny')}
              >
                😄 Funny
              </button>
              <button 
                className={`type-btn ${messageType === 'deep' ? 'active' : ''}`}
                onClick={() => setMessageType('deep')}
              >
                🌊 Deep
              </button>
            </div>
            
            <div className="message-display">
              <p className="generated-message">{currentMessage}</p>
            </div>
            
            <div className="message-actions">
              <button className="generate-btn" onClick={generateRandomMessage}>
                <span>✨</span> New Message
              </button>
              <button className="save-letter-btn" onClick={saveLoveLetter}>
                <span>💾</span> Save to Archive
              </button>
            </div>
          </div>

          {/* 3. Private Note */}
          <div className="letter-card glass-card">
            <div className="card-icon">📝</div>
            <h3>Private Love Note</h3>
            <p className="card-description">Write a secret message just for you</p>
            
            {!showSavedNote ? (
              <div className="private-note-creator">
                <textarea 
                  className="private-note-input"
                  placeholder="Write your private love note here... Only you can see this 💕"
                  value={privateNote}
                  onChange={(e) => setPrivateNote(e.target.value)}
                  rows={4}
                />
                <button className="save-private-btn" onClick={savePrivateNoteToStorage}>
                  <span>🔒</span> Save Private Note
                </button>
              </div>
            ) : (
              <div className="private-note-display">
                <div className="note-card">
                  <div className="note-lock">🔒</div>
                  <p className="private-note-text">{savedPrivateNote}</p>
                  <div className="note-date">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="private-note-actions">
                  <button className="edit-private-btn" onClick={() => setShowSavedNote(false)}>
                    <span>✏️</span> Edit
                  </button>
                  <button className="delete-private-btn" onClick={deletePrivateNote}>
                    <span>🗑️</span> Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. 10 Reasons I Love You */}
          <div className="letter-card glass-card reasons-card">
            <div className="card-icon">⭐</div>
            <h3>10 Reasons I Love You</h3>
            <p className="card-description">Edit and customize your list</p>
            
            <div className="reasons-list">
              {reasons.map((reason, index) => (
                <div key={index} className="reason-item">
                  <div className="reason-number">{index + 1}</div>
                  {editingReason === index ? (
                    <div className="reason-edit">
                      <input 
                        type="text" 
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)}
                        className="reason-input"
                        autoFocus
                      />
                      <button className="save-reason-btn" onClick={() => updateReason(index)}>✓</button>
                      <button className="cancel-reason-btn" onClick={() => setEditingReason(null)}>✗</button>
                    </div>
                  ) : (
                    <>
                      <div className="reason-text">{reason}</div>
                      <div className="reason-actions">
                        <button className="edit-reason-btn" onClick={() => {
                          setEditingReason(index);
                          setEditText(reason);
                        }}>✏️</button>
                        <button className="delete-reason-btn" onClick={() => deleteReason(index)}>🗑️</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            
            <button className="add-reason-btn" onClick={addNewReason}>
              <span>➕</span> Add Another Reason
            </button>
          </div>

          {/* 5. Bible Verse of the Day */}
          <div className="letter-card glass-card bible-verse-card">
            <div className="card-icon">📖</div>
            <h3>Bible Verse of the Day</h3>
            <p className="card-description">God's Word on Love</p>
            
            <div className="bible-verse-display">
              <div className="verse-icon">✝️</div>
              <div className="verse-quote">"</div>
              <p className="daily-verse">{dailyVerse}</p>
              <div className="verse-reference">— {verseReference}</div>
              <button className="new-verse-btn" onClick={setRandomBibleVerse}>
                <span>🔄</span> New Verse
              </button>
            </div>
          </div>

          {/* 6. Love Letter Archive */}
          <div className="letter-card glass-card archive-card">
            <div className="card-icon">📚</div>
            <h3>Love Letter Archive</h3>
            <p className="card-description">Your saved messages</p>
            
            {savedLetters.length === 0 ? (
              <div className="empty-archive">
                <span className="empty-emoji">📭</span>
                <p>No saved letters yet</p>
                <p className="empty-hint">Generate and save a love note!</p>
              </div>
            ) : (
              <div className="archive-list">
                {savedLetters.slice(0, 5).map((letter) => (
                  <div key={letter.id} className="archive-item">
                    <div className="archive-date">{letter.date}</div>
                    <div className="archive-message">{letter.message}</div>
                    <button className="delete-archive-btn" onClick={() => deleteLetter(letter.id)}>🗑️</button>
                  </div>
                ))}
                {savedLetters.length > 5 && (
                  <div className="archive-more">+{savedLetters.length - 5} more</div>
                )}
              </div>
            )}
          </div>

          {/* 7. Send a Virtual Kiss */}
          <div className="letter-card glass-card kiss-card">
            <div className="card-icon">💋</div>
            <h3>Send a Virtual Kiss</h3>
            <p className="card-description">Blow a kiss to your love</p>
            
            <div className="kiss-container">
              <button className="kiss-btn" onClick={() => {
                createFloatingHeart();
                const kissEmojis = ['💋', '💏', '💑', '💖', '💕'];
                for (let i = 0; i < 20; i++) {
                  setTimeout(() => {
                    const container = document.getElementById('floating-hearts-container');
                    if (container) {
                      const kiss = document.createElement('div');
                      kiss.className = 'floating-heart-letter';
                      kiss.textContent = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];
                      kiss.style.left = Math.random() * 100 + '%';
                      kiss.style.fontSize = `${Math.random() * 25 + 20}px`;
                      container.appendChild(kiss);
                      setTimeout(() => kiss.remove(), 3000);
                    }
                  }, i * 100);
                }
              }}>
                <span>💋</span> Blow a Kiss <span>💨</span>
              </button>
              <div className="kiss-message">Click to send a virtual kiss!</div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="letters-navigation">
          <button className="nav-back-btn" onClick={() => navigate('/surprises')}>
            <span>←</span> Back to Surprises
          </button>
          <button className="nav-next-btn" onClick={() => navigate('/dance')}>
            Next: Dance Together <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Letters;
