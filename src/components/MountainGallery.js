import React, { useRef, useEffect } from 'react';
import './MountainGallery.css';

const MountainGallery = ({ mountains, onMountainClick }) => {
  const galleryRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragThreshold = useRef(10); // Minimum distance to trigger drag

  // Mouse events
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - galleryRef.current.offsetLeft;
    scrollLeft.current = galleryRef.current.scrollLeft;
    galleryRef.current.classList.add('dragging');
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // drag speed
    galleryRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    galleryRef.current.classList.remove('dragging');
  };

  // Touch events with improved handling
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - galleryRef.current.offsetLeft;
    scrollLeft.current = galleryRef.current.scrollLeft;
    galleryRef.current.classList.add('dragging');
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    galleryRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;
    
    // Check if it was a tap vs drag
    const endX = e.changedTouches[0].pageX - galleryRef.current.offsetLeft;
    const distance = Math.abs(endX - startX.current);
    
    if (distance < dragThreshold.current) {
      // It was a tap, not a drag
      isDragging.current = false;
      galleryRef.current.classList.remove('dragging');
      return;
    }
    
    isDragging.current = false;
    galleryRef.current.classList.remove('dragging');
  };

  // Handle mountain card click with drag detection
  const handleMountainClick = (mountain, e) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onMountainClick(mountain);
  };

  // Cleanup on unmount
  useEffect(() => {
    const gallery = galleryRef.current;
    
    const handleMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        gallery.classList.remove('dragging');
      }
    };

    if (gallery) {
      gallery.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (gallery) {
        gallery.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      className="mountain-gallery"
      ref={galleryRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
    >
      <div className="gallery-container">
        {mountains.map((mountain) => (
          <div
            key={mountain.id}
            className="mountain-card"
            onClick={(e) => handleMountainClick(mountain, e)}
            onTouchEnd={(e) => {
              if (!isDragging.current) {
                handleMountainClick(mountain, e);
              }
            }}
          >
            <img
              src={mountain.image}
              alt={mountain.name}
              className="mountain-image"
              draggable="false"
              style={{ pointerEvents: isDragging.current ? 'none' : 'auto' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MountainGallery; 