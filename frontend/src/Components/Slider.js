import React, { useState , useEffect } from 'react';
import './../CSS/Slider.css'; // Import CSS file for styling

const images = [ // Array of image URLs
  './../Assets/image1.jpg',
  './../Assets/image2.jpg',
  './../Assets/image3.jpg',
  './../Assets/image4.jpg',
  // Add more image URLs as needed
];

const Slider = () => {
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
    <div className="carousel-container">
      <div className="carousel">
        <img
          className="prev"
          src={images[prevIndex]}
          alt={`Previous Slide`}
        />
        <img
          className="current"
          src={images[currentIndex]}
          alt={`Current Slide`}
        />
        <img
          className="next"
          src={images[nextIndex]}
          alt={`Next Slide`}
        />
        <button className="prev-button" onClick={goToPrev}>
         <h1>{'<'}</h1>
        </button>
        <button className="next-button" onClick={goToNext}>
        <h1>{'>'}</h1>
        </button>
      </div>
    </div>
  );
  
      };
      


export default Slider;
