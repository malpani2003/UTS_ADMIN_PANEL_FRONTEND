import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Slider.css'
const SliderComponent = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("https://backend-uts.vercel.app/api/sliders/slides")
      .then((response) => response.json())
      .then((data) => setSlides(data))
      .catch((error) => console.error("Error fetching slides:", error));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        >
          <div className="slide-overlay"></div>
          <div className="slide-content">
            <h2>{slide.heading}</h2>
            <p>{slide.subheading}</p>
            <a href={slide.buttonLink} className="btn">
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}
      <button className="arrow left" onClick={goToPrevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="arrow right" onClick={goToNextSlide}>
        <ChevronRight size={24} />
      </button>
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;