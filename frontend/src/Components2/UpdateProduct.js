import React from 'react';
import AdminProductService from '../Services2/AdminProductService';

function UpdateProduct({ fetchProducts, showUpdateForm, setShowUpdateForm, updatedProduct, setUpdatedProduct }) {
  const handleUpdateProduct = async () => {
    try {
      await AdminProductService.update(updatedProduct.id, updatedProduct);
      fetchProducts(); // Refresh the products list
      setUpdatedProduct({ id: '', name: '', description: '', price: '', url: '', shape: '', application: '', width: '', thickness: '', grade: '', material: '', unitType: '' }); // Reset form
      setShowUpdateForm(false); // Hide the form after updating
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!showUpdateForm) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={() => setShowUpdateForm(false)}>&times;</span>
        <h2>Update Product</h2>
        <input type="text" placeholder="Name" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
        <input type="text" placeholder="Description" value={updatedProduct.description} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} />
        <input type="number" placeholder="Price" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) })} />
        <input type="text" placeholder="URL" value={updatedProduct.url} onChange={(e) => setUpdatedProduct({ ...updatedProduct, url: e.target.value })} />
        <select value={updatedProduct.shape} onChange={(e) => setUpdatedProduct({ ...updatedProduct, shape: e.target.value })}>
          <option value="">Select Shape</option>
          <option value="Flat">Flat</option>
          <option value="Round">Round</option>
          {/* Add more options as needed */}
        </select>
        <select value={updatedProduct.application} onChange={(e) => setUpdatedProduct({ ...updatedProduct, application: e.target.value })}>
          <option value="">Select Application</option>
          <option value="Infrastructure & Construction">Infrastructure & Construction</option>
          <option value="Other">Other</option>
          {/* Add more options as needed */}
        </select>
         <input type="number" placeholder="Width" value={updatedProduct.width} onChange={(e) => setUpdatedProduct({ ...updatedProduct, width: parseFloat(e.target.value) })} />
        <input type="number" placeholder="Thickness" value={updatedProduct.thickness} onChange={(e) => setUpdatedProduct({ ...updatedProduct, thickness: parseFloat(e.target.value) })} />
        <input type="text" placeholder="Grade" value={updatedProduct.grade} onChange={(e) => setUpdatedProduct({ ...updatedProduct, grade: e.target.value })} />
        <input type="text" placeholder="Material" value={updatedProduct.material} onChange={(e) => setUpdatedProduct({ ...updatedProduct, material: e.target.value })} />
        <input type="text" placeholder="Unit Type" value={updatedProduct.unitType} onChange={(e) => setUpdatedProduct({ ...updatedProduct, unitType: e.target.value })} />
        <button onClick={handleUpdateProduct}>Update Product</button>
      </div>
    </div>
  );
}

export default UpdateProduct;
