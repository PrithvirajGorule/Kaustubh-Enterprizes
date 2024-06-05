import React, { useState, useEffect } from 'react';
import './../CSS/Home.css'; // Import CSS file for homepage styling
import { Link } from 'react-router-dom';
import AdminProductService from '../Services2/AdminProductService'; // Import the AdminProductService
import Card from '../Components/Card';
// import Images from './Images';
const images = [ // Array of image URLs
  './../Assets/image1.jpg',
  './../Assets/image2.jpg',
  './../Assets/image3.jpg',
  './../Assets/image4.jpg',
  // Add more image URLs as needed
];

const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  
  const welcomeMessage = 'Weelcome to\nKaustubh Enterprise'; // Using newline character for line break
  const [welcomeText, setWelcomeText] = useState('');

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < welcomeMessage.length-1) {
        setWelcomeText(prevText => prevText + welcomeMessage[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust typing speed here
  
    return () => clearInterval(typingInterval);
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminProductService.getAll();
        const productsData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

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
            <h2 className="slogan">
              {welcomeText.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            <h1 className="slogan"></h1>
            <p className="sloganpara">
              We provide all types of sheet metal at wholesale rates CR, HR, GR
              SS, Aluminum, etc. Specialist in cut to size and High Strength
              Alloy Sheets. We deliver around the globe.
            </p>
            <button className="sloganbtn">
              <Link to={`/sendquotation`} className="sloganlink">
                Apply for Quotation
              </Link>{" "}
            </button>
          </div>
          <div className="slider">
            {images.map((image, index) => (
              <div
                key={index}
                className={`slider-item ${
                  index === currentIndex
                    ? 'current-slide'
                    : index === prevIndex
                    ? 'prev-slide'
                    : 'next-slide'
                }`}
              >
                <img src={image} alt={`Slide ${index}`} />
                <div className="slider-overlay"></div> {/* Overlay */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* cards */}
      <div>
      <br>
      
      </br>
      <images></images>
      <br></br>
        <div className="gallery-container">
          {products.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      </div>
      {/* Add more sections/components as needed */}
    </div>
  );
};

export default Homepage;
