import React, { useState } from 'react';
import './../CSS/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'active' : ''}`}>
      <div className="nav__content">
        <div className="logo">
          <a href="#">Kaustubh Enterprize</a>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <div className="toggle-lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </button>
        <ul className={`nav__links ${isOpen ? 'active' : ''}`}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
