import React, { useState, useEffect } from 'react';
import AdminProductService from '../Services2/AdminProductService';

function AddSubcategory({ fetchSubcategories, categories }) {
  const [newSubcategory, setNewSubcategory] = useState({
    name: '',
    category: '',
    description: ''
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [subcategories, setSubcategories] = useState([]);

  const handleAddSubcategory = async () => {
    try {
      await AdminProductService.createSubcategory(newSubcategory);
      fetchSubcategories(); // Refresh subcategories list after adding
      resetForm(); // Reset form fields
      setIsAddModalOpen(false); // Close modal after adding
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  const resetForm = () => {
    setNewSubcategory({
      name: '',
      category: '',
      description: ''
    });
  };

  useEffect(() => {
    if (newSubcategory.category) {
      // Fetch subcategories based on selected category
      fetchSubcategories(newSubcategory.category);
    }
  }, [newSubcategory.category]);

  return (
    <>
      <button onClick={() => setIsAddModalOpen(true)}>Add Subcategory</button>
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsAddModalOpen(false)}>&times;</span>
            <h2>Add New Subcategory</h2>
            <input type="text" placeholder="Name" value={newSubcategory.name} onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })} />
            <select value={newSubcategory.category} onChange={(e) => setNewSubcategory({ ...newSubcategory, category: e.target.value })}>
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <input type="text" placeholder="Description" value={newSubcategory.description} onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })} />
            <button onClick={handleAddSubcategory}>Add Subcategory</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddSubcategory;
