import React from 'react';

const DisplaySubcategory = ({ subcategory, onDelete, onUpdate }) => {
  return (
    <div className="subcategory-card">
      <h4>{subcategory.name}</h4>
      <p>Description: {subcategory.description}</p>
      <div className="subcategory-card-actions">
        <button onClick={onUpdate}>Update</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DisplaySubcategory;
