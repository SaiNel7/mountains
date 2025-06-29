import React, { useRef } from 'react';
import './MountainGallery.css';

const MountainGallery = ({ mountains, onMountainClick }) => {
  const galleryRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Mouse events
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - galleryRef.current.offsetLeft;
    scrollLeft.current = galleryRef.current.scrollLeft;
    galleryRef.current.classList.add('dragging');
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

  // Touch events
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - galleryRef.current.offsetLeft;
    scrollLeft.current = galleryRef.current.scrollLeft;
    galleryRef.current.classList.add('dragging');
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    galleryRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    galleryRef.current.classList.remove('dragging');
  };

  return (
    <div
      className="mountain-gallery"
      ref={galleryRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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
            onClick={() => onMountainClick(mountain)}
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