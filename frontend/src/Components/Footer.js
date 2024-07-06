import React from 'react';
import './../CSS/Footer.css';
import logo from './../Assects/logo.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faInfoCircle, faEnvelope, faLocation, faPhone, faLocationPin, faMapMarked, faMapLocation } from '@fortawesome/free-solid-svg-icons';
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
                <i class="fa-map-marker"><FontAwesomeIcon icon={faLocationPin}  /></i>
                <p><a href="https://www.google.com/maps/place/Kaustubh+Enterprises/@18.635874,73.839027,14z/data=!4m6!3m5!1s0x3bc2b8718f966ba1:0xd59bcd99f4e4c98!8m2!3d18.6359145!4d73.8390702!16s%2Fg%2F1pp2x5_f5?hl=en&entry=ttu">  W-265, MIDC, Bhosari, Pimpri-Chinchwad,<br></br>
Maharashtra 411026, India</a></p>
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
            <a href="#" className="footer__icon">
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
