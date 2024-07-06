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
          <h3>Premium Quality Products & Customized Solutions</h3>
          <p>
          Kaustubh Enterprises Pvt Ltd offers high-quality steel sheets meeting industry standards for durability. Our experienced team provides tailored solutions, aligning with clients' unique needs for satisfaction.          </p>
          <button>Read More</button>
        </div>
        <div className="service-card">
          <h3>Timely Delivery & Technical Support</h3>
          <p>
          We prioritize efficiency and reliability, ensuring timely project completion. Our prompt delivery minimizes downtime, ensuring client satisfaction. Additionally, our knowledgeable staff offers comprehensive technical support, addressing inquiries promptly.          </p>
          <button>Read More</button>
        </div>
        <div className="service-card">
          <h3>Exceptional Customer Service
          </h3>
          <p>
          At Kaustubh Enterprises Pvt Ltd, exceptional customer service is our hallmark. We ensure a seamless and positive experience, fostering long-lasting client relationships built on trust and satisfaction. Our dedication guarantees outstanding support at every stage, surpassing mere product excellence</p>          <button>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
