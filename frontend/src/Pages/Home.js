import React, { useState, useEffect } from 'react';
import './../CSS/Home.css'; // Import CSS file for homepage styling
import { DataService } from '../Services/DataService';
import Card from '../Components/Card';
import { Link } from 'react-router-dom';


const images = [ // Array of image URLs
  './../Assets/image1.jpg',
  './../Assets/image2.jpg',
  './../Assets/image3.jpg',
  './../Assets/image4.jpg',
  // Add more image URLs as needed
];

const data = DataService.getAllData();

// const slogan = 'Kaustubh Enterprize Pvt Ltd'; // Single slogan constant

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
                  <h2 className="slogan">Kaustubh Enterprize Pvt Ltd</h2>
                  <p>We provide high quality steel with quality and assurance</p>
                  <button className='sloganbtn'><Link to={`/sendquotation`}>Apply for Quotation</Link> </button>
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



            {/* cards */}
            <div>
      <h1>Image Gallery</h1>
      <div className="gallery-container">
        {data.map(item => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
      {/* Add more sections/components as needed */}
    </div>
  );
};

export default Homepage;
