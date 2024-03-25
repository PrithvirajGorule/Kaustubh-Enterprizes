import React from 'react';
import './../CSS/ContactUs.css'
const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div>
      <div id="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15122.501320846526!2d73.82877051738281!3d18.635914500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b8718f966ba1%3A0xd59bcd99f4e4c98!2sKaustubh%20Enterprises!5e0!3m2!1sen!2sin!4v1711392279842!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div id="contact">
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
