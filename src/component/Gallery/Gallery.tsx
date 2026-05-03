import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

interface Memory {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  emoji: string;
}

const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<Memory | null>(null);
  const [filter, setFilter] = useState<'all' | 'recent' | 'favorite'>('all');
  
  // Sample memories - Replace these with your actual photos and memories!
  const memories: Memory[] = [
    {
      id: 1,
      imageUrl: "/images/20170610_175339.jpg.jpg",
      title: "Our First Date",
      date: "June 10, 2017",
      description: "Sa panahong dugay kaayu ta maka selfie kay naay taw sa plaza. Haha",
      emoji: "☕"
    },
    {
      id: 2,
      imageUrl: "/images/20170618_180954.jpg.jpg",
      title: "Date sa Bugsay",
      date: "June 18, 2017",
      description: "First date nato sa bugsay ug 1st kiss natong duha.",
      emoji: "🌅"
    },
    {
      id: 3,
      imageUrl: "/images/20170821_145934.jpg",
      title: "Date sa Bugsay part 2",
      date: "June 21, 2017",
      description: "Ge sul-ob nimo akong jersey ngari",
      emoji: "🎂"
    },
    {
      id: 4,
      imageUrl: "/images/20180224_140216.jpg",
      title: "Date sa Wild Geese",
      date: "February 24, 2018",
      description: "Best place ever, naa jud dre lugara ang majority sa atong memories hahaha",
      emoji: "🚗"
    },
    {
      id: 5,
      imageUrl: "/images/20180405_170948.jpg",
      title: "Lipay gamay, selos dako",
      date: "April 05, 2018",
      description: "Na pugos rakog smile dre, selos ko ninyong Ian gud hahaha",
      emoji: "🎆"
    },
    {
      id: 6,
      imageUrl: "/images/20180617_145329.jpg",
      title: "First Attempt",
      date: "July 17, 2028",
      description: "You know what I mean. Wink hahahha",
      emoji: "🍷"
    },
    {
      id: 7,
      imageUrl: "/images/IMG_20220728_224025.jpg",
      title: "Nambok natag sugod",
      date: "July 28, 2022",
      description: "Samut ka nindot eh sa imoha kay tungod sa imong fats.",
      emoji: "⛰️"
    },
    {
      id: 8,
      imageUrl: "/images/FB_IMG_1740752003410.jpg",
      title: "Unli sa Twinz",
      date: "unknown kay wla ma record",
      description: "Kaon maayo, hibog sa sauce later hahahha",
      emoji: "🎵"
    },
    {
      id: 9,
      imageUrl: "/images/IMG20201129124257.jpg",
      title: "Gwapa jud sa akong langlinggg ouyyy",
      date: "September 12, 2023",
      description: "First higda sa akong room.",
      emoji: "🛏️"
    },
    {
      id: 10,
      imageUrl: "/images/IMG20210327142115.jpg",
      title: "Bisita ta sa akong asawa",
      date: "March 27, 2021",
      description: "Gwapaha jud sa akong asawa ouyyyy.",
      emoji: "💝"
    },
    {
      id: 11,
      imageUrl: "/images/IMG20250409140711.jpg",
      title: "Approaching to adulthood",
      date: "November 18, 2024",
      description: "Dalia ra sa panahon, I hope ako gihapon imong pilion as your partner hantod ma tiguwang ta.",
      emoji: "⭐"
    },
    {
      id: 12,
      imageUrl: "/images/IMG20250728182024.jpg",
      title: "Teacher and student",
      date: "July 28, 2025",
      description: "Hi maam!, pwede ko OJT sa imoha? hahahha",
      emoji: "🎄"
    },
    {
      id: 13,
      imageUrl: "/images/Messenger_creation_96A83315-60D9-42DD-A339-BB4F4D9A6A4E.jpeg",
      title: "Many more journeys with you asawa ko",
      date: "Unknown",
      description: "Hi maam!, pwede ko OJT sa imoha? hahahha",
      emoji: "🎄"
    },
    {
      id: 14,
      imageUrl: "/images/Messenger_creation_688BC30B-EC58-4657-83CF-C60C107A2F9F.jpeg",
      title: "Humana sa jud tawn",
      date: "Unkwown",
      description: "Ako nasad ang mo take care sa imoha asawa ko",
      emoji: "🎄"
    },
  ];

  // Filter memories
  const getFilteredMemories = () => {
    if (filter === 'recent') {
      return [...memories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
    }
    if (filter === 'favorite') {
      return memories.slice(0, 6); // For demo, first 6 are favorites
    }
    return memories;
  };

  const openLightbox = (memory: Memory) => {
    setSelectedImage(memory);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = memories.findIndex(m => m.id === selectedImage.id);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : memories.length - 1;
    } else {
      newIndex = currentIndex < memories.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedImage(memories[newIndex]);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateGallery('prev');
        if (e.key === 'ArrowRight') navigateGallery('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const filteredMemories = getFilteredMemories();

  return (
    <section className="gallery-section" id="gallery-section">
      <div className="gallery-bg-decoration">
        <div className="gallery-bg-circle-1"></div>
        <div className="gallery-bg-circle-2"></div>
        <div className="gallery-bg-circle-3"></div>
      </div>

      <div className="gallery-container">
        <div className="gallery-header">
          <div className="header-decoration">
            <span className="decoration-heart">📸</span>
            <span className="decoration-star">✨</span>
            <span className="decoration-heart">💕</span>
          </div>
          <h2 className="gallery-title">Love Gallery</h2>
          <p className="gallery-subtitle">Our beautiful memories together 💖</p>
        </div>

        {/* Filter Bar */}
        <div className="gallery-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <span>📷</span> All Memories
          </button>
          <button 
            className={`filter-btn ${filter === 'recent' ? 'active' : ''}`}
            onClick={() => setFilter('recent')}
          >
            <span>🕒</span> Most Recent
          </button>
          <button 
            className={`filter-btn ${filter === 'favorite' ? 'active' : ''}`}
            onClick={() => setFilter('favorite')}
          >
            <span>⭐</span> Favorites
          </button>
        </div>

        {/* Memory Counter */}
        <div className="memory-counter">
          <span className="counter-text">
            📸 {filteredMemories.length} Beautiful Memories
          </span>
        </div>

        {/* Photo Grid */}
        <div className="gallery-grid">
          {filteredMemories.map((memory) => (
            <div 
              key={memory.id} 
              className="gallery-item"
              onClick={() => openLightbox(memory)}
            >
              <div className="gallery-item-image">
                <img src={memory.imageUrl} alt={memory.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="view-icon">🔍</span>
                </div>
              </div>
              <div className="gallery-item-info">
                <div className="item-header">
                  <span className="item-emoji">{memory.emoji}</span>
                  <h3 className="item-title">{memory.title}</h3>
                </div>
                <div className="item-date">{memory.date}</div>
                <p className="item-description">{memory.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>✕</button>
              <button className="lightbox-prev" onClick={() => navigateGallery('prev')}>‹</button>
              <button className="lightbox-next" onClick={() => navigateGallery('next')}>›</button>
              
              <div className="lightbox-image">
                <img src={selectedImage.imageUrl} alt={selectedImage.title} />
              </div>
              
              <div className="lightbox-info">
                <div className="lightbox-header">
                  <span className="lightbox-emoji">{selectedImage.emoji}</span>
                  <h3 className="lightbox-title">{selectedImage.title}</h3>
                </div>
                <div className="lightbox-date">{selectedImage.date}</div>
                <p className="lightbox-description">{selectedImage.description}</p>
                <div className="lightbox-heart">💜💙</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="gallery-navigation">
          <button className="nav-back-btn" onClick={() => navigate('/games')}>
            <span>←</span> Back to Games
          </button>
          <button className="nav-next-btn" onClick={() => navigate('/surprises')}>
            Next: Interactive Surprises <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;