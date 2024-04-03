import React from 'react';
import './../CSS/Footer.css';
import logo from './../Assects/logo.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faInfoCircle, faEnvelope, faLocation, faPhone, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <section className='info'>
          <img src={logo} alt="Logo" />
          <h2>Kaustubh Enterprise</h2>
          <p>We provide high-quality steel</p>
        </section>

        <section className='QuickLinks'>
          <h3>Quick Links</h3>
          <a href="/About"><FontAwesomeIcon icon={faHome} /> About</a>
          <a href="/Contact-us"><FontAwesomeIcon icon={faEnvelope} /> Contact</a>
          <a href="#"><FontAwesomeIcon icon={faBriefcase} /> Services</a>
        </section>

        <section className='Contactfooter'>
          <h3>Contact us</h3>
          <p><FontAwesomeIcon icon={faLocationPin}></FontAwesomeIcon> MIDC Bhosari, Pimpri Chinchwad, Pune 411026</p>
          <p><FontAwesomeIcon icon={faEnvelope} />  kaustubh.km@gmail.com</p>
          <p><FontAwesomeIcon icon={faPhone} /> +91 9970745450</p>
        </section>

        <section className="FollowUs">
          <h3>Follow us</h3>
          
            <a href="https://www.instagram.com/vasubiradar" className="footer__icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://in.linkedin.com/company/kaustubh-enterprises" className="footer__icon">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="footer__icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            
          
        </section>
      </div>
      
      <p>&copy; Kaustubh Enterprises Pvt Ltd. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
