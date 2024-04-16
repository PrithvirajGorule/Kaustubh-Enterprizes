import React from 'react';
import './../CSS/Footer.css';
import logo from './../Assects/logo.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faInfoCircle, faEnvelope, faLocation, faPhone, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (


< footerbody>
   
    <footer class="footer-distributed">

        <div class="footer-left">
            <h3>Kaustubh<span><br></br>Enterprise</span></h3>

            <p class="footer-links">
                <a href="/">Home</a>
                |
                <a href="/About">About</a>
                |
                <a href="Contact-us">Contact</a>
                |
                <a href="/Products">Products</a>
            </p>

            <p class="footer-company-name">Copyright © <strong>Kaustubh Enterprise</strong> All rights reserved</p>
        </div>

        <div class="footer-center">
            <div>
                <i class="fa fa-map-marker"></i>
                <p>W-265, MIDC, Bhosari, Pimpri-Chinchwad,<br></br>
Maharashtra 411026, India</p>
            </div>

            <div>
                <i class="fa fa-phone"></i>
                <p>+91 9970745450</p>
            </div>
            <div>
                <i class="fa fa-envelope"></i>
                <p><a href="kaustubh.km@gmail.com">kaustubh.km@gmail.com</a></p>
            </div>
        </div>
        <div class="footer-right">
            <p class="footer-company-about">
                <span>About the company</span>
                <strong>Kaustubh Enterprise</strong> provide all types of sheet metal
at wholesale rates CR, HR GR SS,
Aluminum, etc. Specialist in cut to size
and High Strength Alloy Sheets. We
deliver around the globe.
                
            </p>
            <div class="footer-icons">
            <a href="https://www.instagram.com/vasubiradar" className="footer__icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://in.linkedin.com/company/kaustubh-enterprises" className="footer__icon">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="footer__icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            </div>
        </div>
    </footer>
</footerbody>


        
  );
};

export default Footer;
