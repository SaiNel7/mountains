import React from 'react';
import './MountainModal.css';

const MountainModal = ({ mountain, isOpen, onClose }) => {
  if (!isOpen || !mountain) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
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