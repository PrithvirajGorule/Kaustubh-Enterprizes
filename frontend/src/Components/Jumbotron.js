import React from 'react';
import './../CSS/Jumbotron.css'; // Import CSS for styling

const Jumbotron = () => {
  return (
    <div className="jumbotron" style={{backgroundImage: 'url("background-image-url.jpg")'}}>
      <div className="container">
        <h1>Welcome to Our Website</h1>
        <p>Discover amazing products and services</p>
        <form className="search-form">
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Jumbotron;
