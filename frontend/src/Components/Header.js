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
          <i className="fas fa-bars"></i>
        </button>
        <ul className={`nav__links ${isOpen ? 'active' : ''}`}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">products</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact us</a>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
