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
          description="Building on 5 years of Next.js focus, we are the industry leader in providing unmatched expertise and experience for headless web implementations, delivering top-notch solutions for businesses seeking a specialized partner."
        />
        <FeatureCard 
          icon={<span role="img" aria-label="consulting approach">👥</span>}
          title="Consulting approach"
          description="We understand that communication is key to any successful project. We not only excel at developing high-quality solutions, but we also offer extensive consulting expertise, helping our clients make more informed decisions."
        />
        <FeatureCard 
          icon={<span role="img" aria-label="speed and flexibility">⚡</span>}
          title="Speed & flexibility"
          description="We understand the importance of business value in software solutions. We fear no deadline. For urgent projects, we can flexibly scale our team to adapt to your timeline."
        />
        <FeatureCard 
          icon={<span role="img" aria-label="stability">⭐</span>}
          title="Stability"
          description="We prioritize lasting partnerships with our clients and maintain consistent team composition throughout the entire project to build trust and a deep understanding of your businesses."
        />
      </div>
    </div>
  );
};

export default WhyWorkWithUs;
