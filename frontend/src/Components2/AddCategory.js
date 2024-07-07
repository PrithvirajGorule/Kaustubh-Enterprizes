import React, { useState } from 'react';
import AdminProductService from '../Services2/AdminProductService';

function AddCategory({ fetchCategories }) {
  const [newCategory, setNewCategory] = useState({
    name: '',
    image: '',
    description: '',
    density: ''
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddCategory = async () => {
    try {
      await AdminProductService.createCategory(newCategory);
      fetchCategories(); // Refresh the categories list
      resetForm(); // Reset form
      setIsAddModalOpen(false); // Hide the form after adding
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const resetForm = () => {
    setNewCategory({
      name: '',
      image: '',
      description: '',
      density: ''
    });
  };

  return (
    <>
      <button onClick={() => setIsAddModalOpen(true)}>Add Category</button>
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsAddModalOpen(false)}>&times;</span>
            <h2>Add New Category</h2>
            <input type="text" placeholder="Name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
            <input type="text" placeholder="Image URL" value={newCategory.image} onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })} />
            <input type="text" placeholder="Description" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
            <input type="text" placeholder="Density" value={newCategory.density} onChange={(e) => setNewCategory({ ...newCategory, density: e.target.value })} />
            <button onClick={handleAddCategory}>Add Category</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddCategory;
