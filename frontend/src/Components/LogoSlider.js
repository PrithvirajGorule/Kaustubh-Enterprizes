import React from 'react';
import './../CSS/Slider.css';

const LogoSlider = () => {
  const logos = [
    'easytranslate', 'dropsy', 'ucraft', 'ft', 'parlamentum', 
    'hoory', 'm7', 'yourbusinessnumber', 'reckitt', 'lokalise'
  ];

  return (
    <div className="logo-slider-container">
      <h2>Successful products delivered <span className="highlight">globally</span></h2>
      <div className="logo-slider">
        <div className="slider-track">
          {logos.map((logo, index) => (
            <div key={index} className="slide">
              <img src={`/images/${logo}.png`} alt={`${logo} logo`} />
            </div>
          ))}
          {logos.map((logo, index) => (
            <div key={index + logos.length} className="slide">
              <img src={`/images/${logo}.png`} alt={`${logo} logo`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
