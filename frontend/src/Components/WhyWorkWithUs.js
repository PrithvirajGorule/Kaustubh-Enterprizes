import React from 'react';
import './../CSS/WhyWorkWithUs.css';
import FeatureCard from './FeatureCard';

const WhyWorkWithUs = () => {
  return (
    <div className="why-work-with-us-container">
      <h2>Why work with us</h2>
      <div className="features-grid">
        <FeatureCard 
          icon={<span role="img" aria-label="specialization">🔧</span>}
          title="Specialization"
          description="Kaustubh Enterprises specializes in providing Metal Solutions to industries such as Automobile, Chemical, Pharmaceutical, and Oil & Gas, with over 40 years of experience. We ensure cost-competitive prices and just-in-time delivery, minimizing wastage through precise sizing. Our strong service center partnerships enable us to meet the exact needs of our customers efficiently."
        />
        <FeatureCard 
          icon={<span role="img" aria-label="consulting approach">👥</span>}
          title="Consulting approach"
          description="Kaustubh Enterprises consulting approach focuses on understanding industry-specific needs, leveraging 40+ years of expertise to provide tailored Metal Solutions We prioritize cost optimization and timely delivery, working closely with service centers to minimize wastage through precise sizing. Continuous feedback and innovation ensure we exceed customer expectations."
        />
        <FeatureCard 
          icon={<span role="img" aria-label="speed and flexibility">⚡</span>}
          title="Speed & flexibility"
          description="Kaustubh Enterprises excels in delivering rapid and flexible Metal Solutions tailored to diverse industry needs. Our agile processes and strong service center partnerships ensure quick adaptation to customer requirements while maintaining cost efficiency and just-in-time delivery. We continuously innovate to provide precise sizing and reduce wastage, ensuring swift and effective responses to market demands."
        />
        <FeatureCard 
          icon={<span role="img" aria-label="stability">⭐</span>}
          title="Stability"
          description="With over 40 years of experience, Kaustubh Enterprises offers stable and reliable Metal Solutions across various industries. Our long-term service center partnerships and customer-centric approach ensure consistent quality, precise sizing, and dependable just-in-time delivery. We focus on building enduring relationships and maintaining high standards to meet our customers' evolving needs."
        />
      </div>
    </div>
  );
};

export default WhyWorkWithUs;