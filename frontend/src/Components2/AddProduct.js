import React, { useState } from 'react';
import AdminProductService from '../Services2/AdminProductService';

function AddProduct({ fetchProducts }) {
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', url: '',
    shape: '', application: '', width: '', thickness: '',
    grade: '', material: '', unitType: ''
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProduct = async () => {
    try {
      await AdminProductService.create(newProduct);
      fetchProducts(); // Refresh the products list
      setNewProduct({
        name: '', description: '', price: '', url: '',
        shape: '', application: '', width: '', thickness: '',
        grade: '', material: '', unitType: ''
      }); // Reset form
      setIsAddModalOpen(false); // Hide the form after adding
    } catch (error) {
      console.error('Error adding product:', error);
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
            <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
            <input type="text" placeholder="URL" value={newProduct.url} onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })} />
            <select value={newProduct.shape} onChange={(e) => setNewProduct({ ...newProduct, shape: e.target.value })}>
              <option value="">Select Shape</option>
              <option value="Flat">Flat</option>
              <option value="Round">Round</option>
              {/* Add more options as needed */}
            </select>
            <select value={newProduct.application} onChange={(e) => setNewProduct({ ...newProduct, application: e.target.value })}>
              <option value="">Select Application</option>
              <option value="Infrastructure & Construction">Infrastructure & Construction</option>
              <option value="Other">Other</option>
              {/* Add more options as needed */}
            </select>
            <input type="number" placeholder="Width" value={newProduct.width} onChange={(e) => setNewProduct({ ...newProduct, width: parseFloat(e.target.value) })} />
            <input type="number" placeholder="Thickness" value={newProduct.thickness} onChange={(e) => setNewProduct({ ...newProduct, thickness: parseFloat(e.target.value) })} />
            <input type="text" placeholder="Grade" value={newProduct.grade} onChange={(e) => setNewProduct({ ...newProduct, grade: e.target.value })} />
            <input type="text" placeholder="Material" value={newProduct.material} onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })} />
            <input type="text" placeholder="Unit Type" value={newProduct.unitType} onChange={(e) => setNewProduct({ ...newProduct, unitType: e.target.value })} />
            <button onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProduct;
