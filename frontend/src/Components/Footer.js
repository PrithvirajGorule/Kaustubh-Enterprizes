import React from 'react';
import './../CSS/Footer.css';
import logo from './../Assects/logo.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faInfoCircle, faEnvelope, faLocation, faPhone, faLocationPin } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className='info'>
          <img src={logo} alt="Logo" />
          <h2>Kaustubh Enterprise</h2>
          <p>We provide high-quality steel</p>
        </span>

        <span className='QuickLinks'>
          <h3>Quick Links</h3>
          <a href="#"><FontAwesomeIcon icon={faHome} /> About</a>
          <a href="#"><FontAwesomeIcon icon={faEnvelope} /> Contact</a>
          <a href="#"><FontAwesomeIcon icon={faBriefcase} /> Services</a>
        </span>

        <span className='Contactfooter'>
          <h3>Contact us</h3>
          <p><FontAwesomeIcon icon={faLocationPin}></FontAwesomeIcon> MIDC, Pimpri Chinchwad, Pune 412105</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> example@gmail.com</p>
          <p><FontAwesomeIcon icon={faPhone} /> 8765432907</p>
        </span>

        <span>
          <h3>Follow us</h3>
        
    <div className="footer__social">
    
      <a href="https://www.instagram.com/vasubiradar" className="footer__iconr">
        <i className="bx bxl-instagram" />
      </a>
      <a
        href="https://in.linkedin.com/company/kaustubh-enterprises"
        className="footer__icon"
      >
        <i className="bx bxl-linkedin" />
      </a>
      
      

    </div>
        </span>
      </div>
      
      <p>&copy; 2024 Your Company Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
