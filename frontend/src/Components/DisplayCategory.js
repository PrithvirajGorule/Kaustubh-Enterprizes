import React from 'react';

const DisplayCategory = ({ category, isSelected, onSelect, onDelete, onUpdate }) => {
  return (
    <div className={`category-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <h3>{category.name}</h3>
      <p>Description: {category.description}</p>
      <p>Density: {category.density}</p>
      <img src={category.image} alt={category.name} />
      <div className="category-card-actions">
        <button onClick={onUpdate}>Update</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DisplayCategory;
