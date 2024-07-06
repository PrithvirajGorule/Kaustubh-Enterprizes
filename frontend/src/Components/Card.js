import React from 'react';
import './../CSS/Card.css';

const Card = ({ data }) => {
  return (
    <div className="gallery-item">
      <img src={data.url} alt={data.title} />
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <p>Price: ${data.price}</p>
      <p>Width: ${data.width} mm</p>
      <p>Thickness: ${data.thickness} mm</p>
      <p>Grade: ${data.grade}</p>
      
    </div>
  );
};

export default Card;