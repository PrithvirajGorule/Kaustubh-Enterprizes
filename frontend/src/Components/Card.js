import React from 'react';
import './../CSS/Card.css';

const Card = ({ data }) => {
  return (
    <div className="gallery-item">
      <img src={data.imageUrl} alt={data.title} />
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <ul>
        {data.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default Card;