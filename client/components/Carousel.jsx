import React, { useState, useEffect } from 'react';
import slides from '../lib/carousel-slides';
import './Carousel.css';

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prevIndex =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = index => {
    setActiveIndex(index);
  };

  return (
    <div className='carousel-container'>
      <h2 className="favs">Featured Favs</h2>
      <div className="carousel">
        {slides.map((slide, index) => (
          <div
          key={index}
          className={`slide ${index === activeIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        >
            <h2 className="title">{slide.title}</h2>
          </div>
        ))}
        <div className="dots">
          {slides.map((slide, index) => (
            <button
            key={index}
            className={`dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
          ))}
        </div>
      </div>
    </div>
  );
}
