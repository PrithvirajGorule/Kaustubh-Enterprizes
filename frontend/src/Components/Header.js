import React, { useState } from 'react';
import './../CSS/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from'./../Assects/logo.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'active' : ''}`}>
      <div className='content'>
        <div className="logo">
          <img src={logo} className='logoimg' alt="Logo" />
          <a href="/">Kaustubh Enterprize</a>
        </div>
        <div className="nav__content">
          <button className="menu-toggle" onClick={toggleMenu}>
            <div className="toggle-lines">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </button>
          <ul className={`nav__links ${isOpen ? 'active' : ''}`}>
            <li>
              <FontAwesomeIcon icon={faHome} />
              <a href="/">Home</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faBriefcase} />
              <a href="/Products">Products</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faInfoCircle} />
              <a href="/About">About</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="Contact-us">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
