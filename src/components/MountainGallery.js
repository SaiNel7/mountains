import React, { useRef, useEffect, useState } from 'react';
import './MountainGallery.css';

const MountainGallery = ({ mountains, onMountainClick }) => {
  const trackRef = useRef(null);
  const [mouseDownAt, setMouseDownAt] = useState("0");
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const handleOnDown = (e) => {
    setMouseDownAt(e.clientX.toString());
  };

  const handleOnUp = () => {
    setMouseDownAt("0");
    setPrevPercentage(percentage);
  };

  const handleOnMove = (e) => {
    if (mouseDownAt === "0") return;

    const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(prevPercentage) + percentage;
    
    // Calculate the maximum scroll limit
    if (trackRef.current) {
      const container = trackRef.current.querySelector('.gallery-container');
      if (container) {
        // Get all mountain cards
        const cards = container.querySelectorAll('.mountain-card');
        const lastCard = cards[cards.length - 1];
        
        if (lastCard) {
          // Get the position of the last card relative to the container
          const lastCardRect = lastCard.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          
          // Calculate the right edge of the last card relative to the viewport
          const lastCardRightEdge = lastCardRect.right;
          const viewportRightEdge = viewportWidth;
          
          // Calculate how much the last card extends beyond the viewport
          const overflow = lastCardRightEdge - viewportRightEdge;
          
          let nextPercentage;
          
          // If there's no overflow, we don't need to scroll
          if (overflow <= 0) {
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), 0);
          } else {
            // Calculate the percentage needed to bring the last card to the right edge
            const maxScrollPercentage = -(overflow / viewportWidth) * 100;
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), maxScrollPercentage);
          }

          setPercentage(nextPercentage);

          console.log('Debug:', {
            lastCardRightEdge,
            viewportRightEdge,
            overflow,
            nextPercentage,
            maxScrollPercentage: overflow <= 0 ? 0 : -(overflow / viewportWidth) * 100
          });

          trackRef.current.animate({
            transform: `translate(${nextPercentage}%, -50%)`
          }, { duration: 1200, fill: "forwards" });

          const images = trackRef.current.getElementsByClassName("mountain-image");
          for (const image of images) {
            image.animate({
              objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
          }
        }
      }
    }
  };

  useEffect(() => {
    const handleMouseDown = (e) => handleOnDown(e);
    const handleMouseUp = (e) => handleOnUp(e);
    const handleMouseMove = (e) => handleOnMove(e);
    const handleTouchStart = (e) => handleOnDown(e.touches[0]);
    const handleTouchEnd = (e) => handleOnUp(e);
    const handleTouchMove = (e) => handleOnMove(e.touches[0]);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mouseDownAt, prevPercentage, percentage]);

  return (
    <div 
      id="image-track"
      ref={trackRef}
      className="mountain-gallery"
      data-mouse-down-at={mouseDownAt}
      data-prev-percentage={prevPercentage}
      data-percentage={percentage}
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MountainGallery; 