import React from 'react';

function DisplayProduct({ product, handleDelete, setProductForUpdate }) {
  return (
    <div className="product-card" key={product.id} onClick={() => setProductForUpdate(product)}>
      <img src={product.url} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}>Delete</button>
      <button onClick={(e) => { e.stopPropagation(); setProductForUpdate(product); }}>Update</button>
    </div>
  );
}

export default DisplayProduct;
