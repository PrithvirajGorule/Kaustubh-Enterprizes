import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './../CSS/Footer.css';

const Footer = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <footer className="footer">
      <div className="container">
        <h2 className="style">TRIP NEST</h2>
        <h6 className="light-text">Travel Explore, Celebrate Life</h6>
        
        <h3 className="title">Follow Us</h3>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="icon-style" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="icon-style" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon-style" />
          </a>
        </div>

        <div className="links-container">
          <div className="column">
            <h4 className="text-style">Discover Us</h4>
            <a
              href="/About"
              className={hovered ? 'link-style hovered' : 'link-style'}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              About
            </a>
            <br />
            <a
              href="/About"
              className={hovered ? 'link-style hovered' : 'link-style'}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Our Team
            </a>
            <br />
            <a
              href="/FAQ"
              className={hovered ? 'link-style hovered' : 'link-style'}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              FAQ
            </a>
          </div>

          <div className="column">
            <h4 className="text-style">Support</h4>
            <a
              href="/Contactus"
              className={hovered ? 'link-style hovered' : 'link-style'}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Contact Us
            </a>
            <br />
            <a
              href="/Reviewpage"
              className={hovered ? 'link-style hovered' : 'link-style'}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Guest Reviews
            </a>
            
            <a
              href="/TravelGuidelines"
              className={hovered ? 'link-style hovered' : 'link-style'}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Travel Guidelines
            </a>
          </div>
        </div>
       
        <div>
          <h6 className="light-text">*Caution: Beware of Fake Promotions or Offers
          *Please do not believe or engage with any promotional emails, SMS or Web-link which ask you to click on a link and fill in your details. All Veena World authorized email communications are delivered from domain @TripNest.com or @TripNest.in or SMS from VNAWLD or 741324.
          *TripNest bears no liability or responsibility whatsoever for any communication which is fraudulent or misleading in nature and not received from registered domain.
          </h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
