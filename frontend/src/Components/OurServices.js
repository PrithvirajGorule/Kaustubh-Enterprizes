import React from 'react';
import './../CSS/OurServices.css';

const OurServices = () => {
  return (
    <div className="services-container">
      <div className="services-left">
        <h2>Our services</h2>
        <p>We help enterprises transform their innovative ideas into successful products from scratch.</p>
        <p>
          From custom product and web development to migrating legacy systems to modern and efficient Jamstack architecture, we take care of the technical complexities, so your team can focus on what you do best.
        </p>
      </div>
      <div className="services-right">
        <div className="service-card">
          <h3>Next.js Development</h3>
          <p>
            Whether it's crafting Next.js web applications, conducting code audits, enterprise software development, or even providing professional training, we're here to help you achieve your business goals!
          </p>
          <button>Read More</button>
        </div>
        <div className="service-card">
          <h3>React development</h3>
          <p>
            Whether you need help with developing React web apps, code reviews, enterprise software creation, or just need some specialized training, we're here for you every step of the way!
          </p>
          <button>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
