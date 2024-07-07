import React from 'react';
import './../CSS/OurServices.css';

const OurServices = () => {
  return (
    <div className="services-container">
      <div className="services-left">
        <h2>Our services</h2>
        <p> We, Kaustubh Enterprises, is a professionally managed company with a core team have rich experience in Metal Industries. The Mission of our organization is to provide "Metal Solutions" to our
 esteemed customers at a very 'Cost Competitive' price along with 'Just-in-Time' delivery.
 Presently, we are catering the requirements of most of the industries like ; Automobile, Chemical Industries,
 Pharmaceutical, Oil & Gas, Power, Lifts & Elevators, Food Industry, Pulp & Paper, Sugar Industry and etc.
 We always strive to provide exact sizes, in order to minimize the wastages, to end users through the Service
 Centre route where we are having tie-up</p>
      </div>
      <div className="services-right">
        <div className="service-card">
          <h3>Premium Quality Products & Customized Solutions</h3>
     
         <p>Kaustubh Enterprises is committed to providing premium quality metal products, adhering to the highest industry standards. We offer customized solutions tailored to the specific needs of each client, ensuring precise sizing and optimal performance. Our dedication to quality and customization ensures that we meet and exceed customer expectations in every project.</p>  
        </div>
        <div className="service-card">
          <h3>Timely Delivery & Technical Support</h3>
          <p>Kaustubh Enterprises ensures prompt delivery by leveraging a robust logistics network and efficient supply chain management. Our commitment to just-in-time delivery minimizes downtime and enhances productivity for our customers. Additionally, our dedicated technical support team offers expert guidance and assistance, ensuring seamless integration and optimal performance of our metal solutions.
         </p>
        </div>
        <div className="service-card">
          <h3>Exceptional Customer Service
          </h3>
          <p>
          At Kaustubh Enterprises, we prioritize exceptional customer service by offering personalized support and maintaining open communication channels. Our experienced team is dedicated to addressing customer needs promptly and efficiently, ensuring satisfaction at every stage. We build lasting relationships through reliability, responsiveness, and a commitment to exceeding expectations.
          </p>        </div>
      </div>
    </div>
  );
};

export default OurServices;