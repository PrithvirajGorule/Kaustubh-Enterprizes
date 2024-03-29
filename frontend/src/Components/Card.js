import React from 'react';
import './../CSS/Card.css';

const Card = ({ data }) => {
  return (
    <div className="gallery-item">
      <img src={data.url} alt={data.title} />
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      
    </div>
  );
};

export default Card;