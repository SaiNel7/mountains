import React, { useEffect } from 'react';
import './MountainModal.css';

const MountainModal = ({ mountain, isOpen, onClose }) => {
  // Handle escape key press - must be before any early returns
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mountain) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={handleCloseClick}
          aria-label="Close modal"
          type="button"
        >
          &times;
        </button>
        
        <div className="mountain-info">
          <h2>{mountain.name}</h2>
          
          <div className="mountain-stats">
            <div className="stat">
              <span className="label">Height</span>
              <span className="value">{mountain.height}</span>
            </div>
            <div className="stat">
              <span className="label">First Summit</span>
              <span className="value">{mountain.firstSummit}</span>
            </div>
          </div>
          
          <p className="mountain-lore">{mountain.lore}</p>
        </div>
      </div>
    </div>
  );
};

export default MountainModal; 