import React, { useState, useEffect } from 'react';
import './../CSS/Home.css'; // Import CSS file for homepage styling


const images = [ // Array of image URLs
  './../Assets/image1.jpg',
  './../Assets/image2.jpg',
  './../Assets/image3.jpg',
  './../Assets/image4.jpg',
  // Add more image URLs as needed
];

const slogan = 'Kaustubh Enterprize Pvt Ltd'; // Single slogan constant

const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Clean up the interval
  }, []); // Run only once on component mount

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  const goToPrev = () => {
    setCurrentIndex(prevIndex);
  };

  const goToNext = () => {
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="homepage">
      <div className="hero-section">
      
        <div className="slider-container">
        <div className="slogan-box">
                  <h2 className="slogan">{slogan}</h2>
                  <p>We provide high quality steel with quality and assurance</p>
                  <button className='sloganbtn'>See our Products </button>
                </div>
          <div className="slider">
         
            {images.map((image, index) => (
              <div
                key={index}
                className={`slider-item ${index === currentIndex ? 'current-slide' : (index === prevIndex ? 'prev-slide' : 'next-slide')}`}
              >
                <img src={image} alt={`Slide ${index}`} />
               
              </div>
            ))}
            {/* <button className="slider-prev" onClick={goToPrev}>
              {'<'}
            </button>
            <button className="slider-next" onClick={goToNext}>
              {'>'}
            </button> */}
          </div>
        </div>
      </div>
      {/* Add more sections/components as needed */}
    </div>
  );
};

export default Homepage;
