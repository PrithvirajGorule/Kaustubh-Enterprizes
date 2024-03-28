import React, { useState } from 'react';
import AdminProductService from '../Services2/AdminProductService';

function AddProductForm() {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdminProductService.create(product);
      console.log('Product added successfully');
      // Optionally, you can redirect the user or perform other actions after adding the product
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProductForm;
