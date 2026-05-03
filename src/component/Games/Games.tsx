import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Games.css';

const Games: React.FC = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<'thisorthat' | 'knowme' | 'wheel' | 'wouldyourather'>('knowme');
  
  // Game 1: This or That state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [player1Choice, setPlayer1Choice] = useState<string | null>(null);
  const [player2Choice, setPlayer2Choice] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1');
  
  // Game 2: How Well Do You Know Me state
  const [gameStage, setGameStage] = useState<'setup' | 'guessing' | 'results'>('setup');
  const [correctAnswers, setCorrectAnswers] = useState<number[]>(new Array(8).fill(-1));
  const [playerAnswers, setPlayerAnswers] = useState<number[]>(new Array(8).fill(-1));
  const [quizScore, setQuizScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [player1Name, setPlayer1Name] = useState<string>('My');
  
  // Game 3: Spin the Wheel state
  const [spinning, setSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState('');
  const [wheelChallenges] = useState([
    '💋 Kiss for 10 seconds', 
    '🗣️ Say 3 things you love about each other',
    '🎤 Sing one line of "your song"', 
    '📖 Dance any kind of dance',
    '🫂 Give a back massage (30 seconds)', 
    '😂 Share a funny memory',
    '🌟 Make a future promise', 
    '💝 Hug your partner for 1 minute and tell your partner how much you love her/him'
  ]);
  
  // Game 4: Would You Rather state
  const [wyQuestion, setWyQuestion] = useState(0);
  const [wyChoice1, setWyChoice1] = useState<string | null>(null);
  const [wyChoice2, setWyChoice2] = useState<string | null>(null);
  const [wyRevealed, setWyRevealed] = useState(false);
  const [wyCurrentPlayer, setWyCurrentPlayer] = useState<'player1' | 'player2'>('player1');
  
  const thisOrThatQuestions = [
    { option1: "🏖️ Beach Sunset", option2: "⛰️ Mountain Cabin", img1: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400", img2: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" },
    { option1: "🍕 Pizza Night", option2: "🍣 Sushi Date", img1: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400", img2: "https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=400" },
    { option1: "📺 Movie Marathon", option2: "🎲 Board Games", img1: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400", img2: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400" },
    { option1: "🌅 Sunrise Date", option2: "🌙 Late Night Talk", img1: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", img2: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400" },
    { option1: "✈️ Adventure Trip", option2: "🏨 Relaxing Resort", img1: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400", img2: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400" },
  ];
  
  // Questions for Player 1 (using "your")
  const knowMeQuestionsForPlayer1 = [
    { 
      question: "What's your favorite love language?", 
      options: ["Words of Affirmation", "Quality Time", "Acts of Service", "Physical Touch", "Receiving Gifts"]
    },
    { 
      question: "What's your favorite comfort food?", 
      options: ["Pizza", "Ice Cream", "Pasta", "Soup", "Chocolate"]
    },
    { 
      question: "What's your dream vacation destination?", 
      options: ["Paris", "Japan", "Hawaii", "Italy", "Maldives"]
    },
    { 
      question: "What makes you feel most loved?", 
      options: ["Hugs", "Kind Words", "Quality Time", "Surprises", "Acts of Service"]
    },
    { 
      question: "What's your favorite movie genre?", 
      options: ["Romance", "Comedy", "Action", "Drama", "Sci-Fi"]
    },
    { 
      question: "What's something you've always wanted to learn?", 
      options: ["Dance", "Cook", "Paint", "Play an Instrument", "A New Language"]
    },
    { 
      question: "What's your ideal date night?", 
      options: ["Candlelit Dinner", "Movie at Home", "Stargazing", "Dancing", "Adventure Activity"]
    },
    { 
      question: "What's the best gift you've ever received?", 
      options: ["A sentimental letter", "Jewelry", "An experience/trip", "Handmade gift", "Surprise party"]
    }
  ];
  
  // Questions for Player 2 (using "their" instead of "your")
  const knowMeQuestionsForPlayer2 = [
    { 
      question: "What's their favorite love language?", 
      options: ["Words of Affirmation", "Quality Time", "Acts of Service", "Physical Touch", "Receiving Gifts"]
    },
    { 
      question: "What's their favorite comfort food?", 
      options: ["Pizza", "Ice Cream", "Pasta", "Soup", "Chocolate"]
    },
    { 
      question: "What's their dream vacation destination?", 
      options: ["Paris", "Japan", "Hawaii", "Italy", "Maldives"]
    },
    { 
      question: "What makes them feel most loved?", 
      options: ["Hugs", "Kind Words", "Quality Time", "Surprises", "Acts of Service"]
    },
    { 
      question: "What's their favorite movie genre?", 
      options: ["Romance", "Comedy", "Action", "Drama", "Sci-Fi"]
    },
    { 
      question: "What's something they've always wanted to learn?", 
      options: ["Dance", "Cook", "Paint", "Play an Instrument", "A New Language"]
    },
    { 
      question: "What's their ideal date night?", 
      options: ["Candlelit Dinner", "Movie at Home", "Stargazing", "Dancing", "Adventure Activity"]
    },
    { 
      question: "What's the best gift they've ever received?", 
      options: ["A sentimental letter", "Jewelry", "An experience/trip", "Handmade gift", "Surprise party"]
    }
  ];

  const wouldYouRatherQuestions = [
    { option1: "Breakfast in bed", option2: "Candlelit dinner" },
    { option1: "Dance in the rain", option2: "Stargaze all night" },
    { option1: "Write a love song", option2: "Paint a portrait of us" },
    { option1: "Surprise weekend trip", option2: "Planned dream vacation" },
    { option1: "Live in a castle", option2: "Live on a beach" },
    { option1: "Have dinner with celebrities", option2: "Have dinner with family" }
  ];

  // Game 1: This or That handlers
  const handleThisOrThatChoice = (choice: string) => {
    if (showResult) return;
    
    if (currentPlayer === 'player1' && !player1Choice) {
      setPlayer1Choice(choice);
      setCurrentPlayer('player2');
    } else if (currentPlayer === 'player2' && !player2Choice && player1Choice) {
      setPlayer2Choice(choice);
      setShowResult(true);
      if (player1Choice === choice) {
        setScore(score + 1);
      }
    }
  };
  
  const resetThisOrThatRound = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setShowResult(false);
    setCurrentPlayer('player1');
  };
  
  const nextQuestion = () => {
    if (currentQuestion + 1 < thisOrThatQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      resetThisOrThatRound();
    } else {
      alert(`Game Complete! You matched on ${score} out of ${thisOrThatQuestions.length} questions! 💕`);
      setCurrentQuestion(0);
      resetThisOrThatRound();
      setScore(0);
    }
  };
  
  const resetGame = () => {
    setCurrentQuestion(0);
    resetThisOrThatRound();
    setScore(0);
  };
  
  // Game 2: Know Me handlers
  const handleCorrectAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...correctAnswers];
    newAnswers[questionIndex] = answerIndex;
    setCorrectAnswers(newAnswers);
  };
  
  const confirmAnswers = () => {
    if (correctAnswers.some(answer => answer === -1)) {
      alert("Please answer all questions before confirming! 💜");
      return;
    }
    setGameStage('guessing');
  };
  
  const handlePlayerAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...playerAnswers];
    newAnswers[questionIndex] = answerIndex;
    setPlayerAnswers(newAnswers);
  };
  
  const submitGuesses = () => {
    if (playerAnswers.some(answer => answer === -1)) {
      alert("Please answer all questions before submitting! 💜");
      return;
    }
    
    let correct = 0;
    playerAnswers.forEach((answer, idx) => {
      if (answer === correctAnswers[idx]) correct++;
    });
    setQuizScore(correct);
    setGameStage('results');
  };
  
  const resetQuiz = () => {
    setCorrectAnswers(new Array(8).fill(-1));
    setPlayerAnswers(new Array(8).fill(-1));
    setQuizScore(0);
    setGameStage('setup');
    setShowAnswers(false);
  };
  
  // Game 3: Spin the Wheel handlers
  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * wheelChallenges.length);
    setTimeout(() => {
      setWheelResult(wheelChallenges[randomIndex]);
      setSpinning(false);
    }, 2000);
  };
  
  // Game 4: Would You Rather handlers
  const handleWyChoice = (choice: string) => {
    if (wyRevealed) return;
    
    if (wyCurrentPlayer === 'player1' && !wyChoice1) {
      setWyChoice1(choice);
      setWyCurrentPlayer('player2');
    } else if (wyCurrentPlayer === 'player2' && !wyChoice2 && wyChoice1) {
      setWyChoice2(choice);
    }
  };
  
  const revealWyAnswers = () => {
    setWyRevealed(true);
  };
  
  const resetWyRound = () => {
    setWyChoice1(null);
    setWyChoice2(null);
    setWyRevealed(false);
    setWyCurrentPlayer('player1');
  };
  
  const nextWyQuestion = () => {
    if (wyQuestion + 1 < wouldYouRatherQuestions.length) {
      setWyQuestion(wyQuestion + 1);
      resetWyRound();
    } else {
      alert("Great game! You've completed all questions! 💕");
      setWyQuestion(0);
      resetWyRound();
    }
  };

  return (
    <section className="games-section" id="games-section">
      <div className="games-bg-decoration">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
        <div className="bg-circle-3"></div>
      </div>
      
      <div className="games-container">
        <div className="games-header">
          <div className="header-decoration">
            <span className="decoration-heart">💜</span>
            <span className="decoration-star">✨</span>
            <span className="decoration-heart">💙</span>
          </div>
          <h2 className="games-title">
            Date Night In: Love Games
          </h2>
          <p className="games-subtitle">Take turns playing these romantic games together!</p>
        </div>
        
        {/* Game Tabs */}
        <div className="game-tabs">
          <button className={`tab-btn ${activeGame === 'thisorthat' ? 'active' : ''}`} onClick={() => setActiveGame('thisorthat')}>
            <span className="tab-icon">🎯</span>
            <span>This or That?</span>
          </button>
          <button className={`tab-btn ${activeGame === 'knowme' ? 'active' : ''}`} onClick={() => setActiveGame('knowme')}>
            <span className="tab-icon">💭</span>
            <span>Know Me?</span>
          </button>
          <button className={`tab-btn ${activeGame === 'wheel' ? 'active' : ''}`} onClick={() => setActiveGame('wheel')}>
            <span className="tab-icon">🎡</span>
            <span>Spin the Wheel</span>
          </button>
          <button className={`tab-btn ${activeGame === 'wouldyourather' ? 'active' : ''}`} onClick={() => setActiveGame('wouldyourather')}>
            <span className="tab-icon">🤔</span>
            <span>Would You Rather?</span>
          </button>
        </div>
        
        {/* Game 1: This or That */}
        {activeGame === 'thisorthat' && (
          <div className="game-container">
            <div className="game-card glass-card">
              <div className="game-card-header">
                <span className="game-emoji">🎯</span>
                <h3>This or That?</h3>
                <span className="game-emoji">💕</span>
              </div>
              
              <div className="turn-indicator">
                <div className={`turn-badge ${currentPlayer === 'player1' && !showResult ? 'active' : ''}`}>
                  <span>👤 Player 1's Turn</span>
                </div>
                <div className={`turn-badge ${currentPlayer === 'player2' && !showResult ? 'active' : ''}`}>
                  <span>👤 Player 2's Turn</span>
                </div>
              </div>
              
              <div className="thisorthat-grid">
                <div className="option-card" onClick={() => handleThisOrThatChoice(thisOrThatQuestions[currentQuestion].option1)}>
                  <div className="option-image">
                    <img src={thisOrThatQuestions[currentQuestion].img1} alt={thisOrThatQuestions[currentQuestion].option1} />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="option-content">
                    <span className="option-emoji">{thisOrThatQuestions[currentQuestion].option1.split(' ')[0]}</span>
                    <span className="option-text">{thisOrThatQuestions[currentQuestion].option1}</span>
                  </div>
                </div>
                
                <div className="vs-divider">
                  <span className="vs-circle">VS</span>
                </div>
                
                <div className="option-card" onClick={() => handleThisOrThatChoice(thisOrThatQuestions[currentQuestion].option2)}>
                  <div className="option-image">
                    <img src={thisOrThatQuestions[currentQuestion].img2} alt={thisOrThatQuestions[currentQuestion].option2} />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="option-content">
                    <span className="option-emoji">{thisOrThatQuestions[currentQuestion].option2.split(' ')[0]}</span>
                    <span className="option-text">{thisOrThatQuestions[currentQuestion].option2}</span>
                  </div>
                </div>
              </div>
              
              {showResult && (
                <div className="result-card">
                  <div className="result-header">🎉 Results 🎉</div>
                  <div className="result-content">
                    <div className="result-player">
                      <span className="player-label">Player 1 chose:</span>
                      <span className="player-choice">{player1Choice}</span>
                    </div>
                    <div className="result-player">
                      <span className="player-label">Player 2 chose:</span>
                      <span className="player-choice">{player2Choice}</span>
                    </div>
                    <div className={`match-result ${player1Choice === player2Choice ? 'match' : 'no-match'}`}>
                      {player1Choice === player2Choice ? '🎉 Perfect Match! 🎉' : '💔 Different Choices! 💔'}
                    </div>
                  </div>
                  <button className="next-btn" onClick={nextQuestion}>Next Question <span>→</span></button>
                </div>
              )}
              
              <div className="score-display">
                <span className="score-label">Match Score</span>
                <span className="score-value">{score}</span>
                <span className="score-total">/{thisOrThatQuestions.length}</span>
                <button className="reset-game-btn" onClick={resetGame} title="Reset Game">🔄</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Game 2: How Well Do You Know Me - FIXED with different question text */}
        {activeGame === 'knowme' && (
          <div className="game-container">
            <div className="game-card glass-card">
              <div className="game-card-header">
                <span className="game-emoji">💭</span>
                <h3>How Well Do You Know Me?</h3>
                <span className="game-emoji">💖</span>
              </div>
              
              {/* Stage 1: First partner sets correct answers - uses "your" questions */}
              {gameStage === 'setup' && (
                <>
                  <div className="game-stage-indicator">
                    <div className="stage active">📝 Step 1: Set Your Answers</div>
                    <div className="stage">❓ Step 2: Partner Guesses</div>
                    <div className="stage">📊 Step 3: Results</div>
                  </div>
                  <div className="quiz-instructions">
                    <p>👤 Player 1: Answer these questions about YOURSELF</p>
                    <p>✨ Be honest! Player 2 will try to guess your answers</p>
                  </div>
                  <div className="quiz-progress">
                    <span>8 Questions</span>
                    <span>❤️ Tell us about you</span>
                  </div>
                  {knowMeQuestionsForPlayer1.map((q, idx) => (
                    <div key={idx} className="quiz-question-card">
                      <p className="quiz-question-text">{idx + 1}. {q.question}</p>
                      <div className="quiz-options-grid">
                        {q.options.map((opt, optIdx) => (
                          <label key={optIdx} className="quiz-option-label">
                            <input 
                              type="radio" 
                              name={`correct${idx}`} 
                              value={optIdx} 
                              checked={correctAnswers[idx] === optIdx}
                              onChange={() => handleCorrectAnswerSelect(idx, optIdx)} 
                            />
                            <span className="option-checkmark"></span>
                            <span className="option-text">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button className="submit-btn" onClick={confirmAnswers}>
                    <span>✓ Confirm My Answers</span>
                    <span>💜</span>
                  </button>
                </>
              )}
              
              {/* Stage 2: Second partner guesses - uses "their" questions */}
              {gameStage === 'guessing' && (
                <>
                  <div className="game-stage-indicator">
                    <div className="stage completed">✓ Step 1: Answers Set</div>
                    <div className="stage active">❓ Step 2: Partner Guesses</div>
                    <div className="stage">📊 Step 3: Results</div>
                  </div>
                  <div className="quiz-instructions">
                    <p>👤 Player 2: Guess what Player 1 answered!</p>
                    <p>✨ Try to get as many correct as possible</p>
                  </div>
                  <div className="quiz-progress">
                    <span>8 Questions</span>
                    <span>❤️ Test Your Knowledge</span>
                  </div>
                  {knowMeQuestionsForPlayer2.map((q, idx) => (
                    <div key={idx} className="quiz-question-card">
                      <p className="quiz-question-text">{idx + 1}. {q.question}</p>
                      <div className="quiz-options-grid">
                        {q.options.map((opt, optIdx) => (
                          <label key={optIdx} className="quiz-option-label">
                            <input 
                              type="radio" 
                              name={`guess${idx}`} 
                              value={optIdx} 
                              checked={playerAnswers[idx] === optIdx}
                              onChange={() => handlePlayerAnswerSelect(idx, optIdx)} 
                            />
                            <span className="option-checkmark"></span>
                            <span className="option-text">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button className="submit-btn" onClick={submitGuesses}>
                    <span>Submit My Guesses</span>
                    <span>💕</span>
                  </button>
                </>
              )}
              
              {/* Stage 3: Show Results */}
              {gameStage === 'results' && (
                <>
                  <div className="game-stage-indicator">
                    <div className="stage completed">✓ Step 1: Answers Set</div>
                    <div className="stage completed">✓ Step 2: Guesses Made</div>
                    <div className="stage active">📊 Step 3: Results</div>
                  </div>
                  
                  {!showAnswers ? (
                    <div className="quiz-result-card">
                      <div className="result-emoji">{quizScore >= 6 ? '🎉💖🎉' : '💗💪💗'}</div>
                      <div className="result-score">
                        <span className="score-number">{quizScore}</span>
                        <span className="score-out">/{knowMeQuestionsForPlayer1.length}</span>
                      </div>
                      <p className="result-message">
                        {quizScore >= 6 
                          ? 'Amazing! You really know your partner! 💖' 
                          : quizScore >= 4 
                          ? 'Good job! You know them pretty well! 💗' 
                          : 'Keep learning about each other! Every day is a chance to grow closer 💕'}
                      </p>
                      <div className="result-bar">
                        <div className="result-bar-fill" style={{ width: `${(quizScore / knowMeQuestionsForPlayer1.length) * 100}%` }}></div>
                      </div>
                      <button className="reveal-answers-btn" onClick={() => setShowAnswers(true)}>
                        <span>🔍</span> See What I Got Wrong
                      </button>
                      <button className="reset-btn" onClick={resetQuiz}>
                        <span>🔄</span> Play Again
                      </button>
                    </div>
                  ) : (
                    <div className="correct-answers-card">
                      <div className="result-header">📖 How Well Did You Know Your Partner?</div>
                      {knowMeQuestionsForPlayer1.map((q, idx) => (
                        <div key={idx} className="correct-answer-item">
                          <div className="correct-question">{idx + 1}. {q.question.replace('your', 'their')}</div>
                          <div className="correct-answer">
                            <span className="answer-label">✓ Their Answer:</span>
                            <span className="answer-text">{q.options[correctAnswers[idx]]}</span>
                          </div>
                          <div className={`user-answer ${playerAnswers[idx] === correctAnswers[idx] ? 'correct-user' : 'wrong-user'}`}>
                            Your guess: {q.options[playerAnswers[idx]]}
                            {playerAnswers[idx] === correctAnswers[idx] ? ' ✓ Correct!' : ' ✗ Wrong'}
                          </div>
                        </div>
                      ))}
                      <button className="reset-btn" onClick={resetQuiz}>
                        <span>🔄</span> Play Again
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Game 3: Spin the Wheel */}
        {activeGame === 'wheel' && (
          <div className="game-container">
            <div className="game-card glass-card wheel-game">
              <div className="game-card-header">
                <span className="game-emoji">🎡</span>
                <h3>Spin the Wheel of Romance</h3>
                <span className="game-emoji">✨</span>
              </div>
              
              <div className="wheel-container">
                <div className={`wheel ${spinning ? 'spinning' : ''}`}>
                  <div className="wheel-center">💜</div>
                </div>
                <div className="wheel-pointer">▼</div>
              </div>
              
              <button className="spin-btn" onClick={spinWheel} disabled={spinning}>
                {spinning ? '🎡 Spinning... 🎡' : '✨ Spin the Wheel! ✨'}
              </button>
              
              {wheelResult && (
                <div className="wheel-result-card">
                  <div className="result-header">✨ Your Romantic Challenge ✨</div>
                  <div className="challenge-text">{wheelResult}</div>
                  <button className="complete-btn" onClick={() => setWheelResult('')}>
                    <span>✓</span> Complete Challenge
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Game 4: Would You Rather */}
        {activeGame === 'wouldyourather' && (
          <div className="game-container">
            <div className="game-card glass-card">
              <div className="game-card-header">
                <span className="game-emoji">🤔</span>
                <h3>Would You Rather?</h3>
                <span className="game-emoji">💭</span>
              </div>
              
              <div className="turn-indicator">
                <div className={`turn-badge ${wyCurrentPlayer === 'player1' && !wyRevealed && !wyChoice2 ? 'active' : ''}`}>
                  <span>👤 Player 1's Turn</span>
                </div>
                <div className={`turn-badge ${wyCurrentPlayer === 'player2' && !wyRevealed && wyChoice1 && !wyChoice2 ? 'active' : ''}`}>
                  <span>👤 Player 2's Turn</span>
                </div>
              </div>
              
              <div className="wouldyourather-container">
                <div className="wy-options">
                  <button 
                    className="wy-option-btn" 
                    onClick={() => handleWyChoice(wouldYouRatherQuestions[wyQuestion].option1)} 
                    disabled={!!(wyChoice1 && wyChoice2) || wyRevealed}
                  >
                    <span className="wy-emoji">🌟</span>
                    <span className="wy-text">{wouldYouRatherQuestions[wyQuestion].option1}</span>
                  </button>
                  <div className="wy-vs"><span>OR</span></div>
                  <button 
                    className="wy-option-btn" 
                    onClick={() => handleWyChoice(wouldYouRatherQuestions[wyQuestion].option2)} 
                    disabled={!!(wyChoice1 && wyChoice2) || wyRevealed}
                  >
                    <span className="wy-emoji">💫</span>
                    <span className="wy-text">{wouldYouRatherQuestions[wyQuestion].option2}</span>
                  </button>
                </div>
                
                {wyChoice1 && !wyChoice2 && !wyRevealed && (
                  <div className="waiting-message">
                    <span className="waiting-spinner">⏳</span>
                    <span>Waiting for Player 2 to choose...</span>
                  </div>
                )}
                
                {wyChoice2 && !wyRevealed && (
                  <button className="reveal-btn" onClick={revealWyAnswers}>
                    <span>💕</span> Reveal Answers <span>💕</span>
                  </button>
                )}
                
                {wyRevealed && (
                  <div className="result-card">
                    <div className="result-content">
                      <div className="result-player">
                        <span className="player-label">Player 1 chose:</span>
                        <span className="player-choice">{wyChoice1}</span>
                      </div>
                      <div className="result-player">
                        <span className="player-label">Player 2 chose:</span>
                        <span className="player-choice">{wyChoice2}</span>
                      </div>
                      <div className={`match-result ${wyChoice1 === wyChoice2 ? 'match' : 'no-match'}`}>
                        {wyChoice1 === wyChoice2 ? '🎉 Perfect harmony! 🎉' : '💕 Different but both wonderful! 💕'}
                      </div>
                    </div>
                    <button className="next-btn" onClick={nextWyQuestion}>Next Question <span>→</span></button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="games-navigation">
          <button className="nav-back-btn" onClick={() => navigate('/counter')}>
            <span>←</span> Back to Counter
          </button>
          <button className="nav-next-btn" onClick={() => navigate('/gallery')}>
            Next: Love Gallery <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Games;