import React from 'react';
import './../CSS/Jumbotron.css'; // Import CSS for styling

const Jumbotron = () => {
  return (
    <div className="jumbotron" style={{backgroundImage: 'url("https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1368100647/image_1368100647.jpg?io=getty-c-w1280")'}}>
      <div className="container">
        <h1>Welcome to Our Website</h1>
        <p>Discover amazing products and services</p>
       
      </div>
    </div>
  );
};

export default Jumbotron;
