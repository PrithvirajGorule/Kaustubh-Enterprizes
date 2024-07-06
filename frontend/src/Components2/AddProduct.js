import React, { useState } from 'react';
import AdminProductService from '../Services2/AdminProductService';

function AddProduct({ fetchProducts }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '0',
    url: '',
    application: '',
    grade: '',
    material: '',
    density: ''
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProduct = async () => {
    try {
      // Calculate density based on selected material
      const materialDensity = calculateDensity(newProduct.material);
      const productData = {
        ...newProduct,
        density: materialDensity
      };
      await AdminProductService.create(productData);
      fetchProducts(); // Refresh the products list
      resetForm(); // Reset form
      setIsAddModalOpen(false); // Hide the form after adding
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      url: '',
      application: '',
      grade: '',
      material: '',
      density: ''
    });
  };

  const calculateDensity = (material) => {
    // Simplified density calculation for demonstration
    if (material === 'Steel') {
      return '7.8'; // Example density for steel
    } else if (material === 'Iron') {
      return '7.87'; // Example density for iron
    } else {
      return ''; // Handle other materials as needed
    }
  };

  return (
    <>
      <button onClick={() => setIsAddModalOpen(true)}>Add Product</button>
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsAddModalOpen(false)}>&times;</span>
            <h2>Add New Product</h2>
            <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
            {/* <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} /> */}
            <input type="text" placeholder="URL" value={newProduct.url} onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })} />
            <select value={newProduct.material} onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}>
              <option value="">Select Material</option>
              <option value="Steel">Steel</option>
              <option value="Iron">Iron</option>
              {/* Add more options as needed */}
            </select>
            <select value={newProduct.application} onChange={(e) => setNewProduct({ ...newProduct, application: e.target.value })}>
              <option value="">Select Application</option>
              <option value="Infrastructure & Construction">Infrastructure & Construction</option>
              <option value="Other">Other</option>
              {/* Add more options as needed */}
            </select>
            <input type="text" placeholder="Grade" value={newProduct.grade} onChange={(e) => setNewProduct({ ...newProduct, grade: e.target.value })} />
            <input type="text" placeholder="Density" value={newProduct.density} readOnly />
            <button onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProduct;
