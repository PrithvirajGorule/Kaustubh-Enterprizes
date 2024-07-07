import React, { useState, useEffect } from 'react';
import AdminProductService from '../Services2/AdminProductService';
import './../CSS/AdminProductList.css';
import { useNavigate } from 'react-router-dom';
import QuotationList from './QuotationList';
import AddCategory from './AddCategory';
import AddSubcategory from './AddSubcategory';

function AdminProductOperations() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateCategoryForm, setShowUpdateCategoryForm] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState({ id: '', name: '', image: '', description: '', density: '' });
  const [showUpdateSubcategoryForm, setShowUpdateSubcategoryForm] = useState(false);
  const [updatedSubcategory, setUpdatedSubcategory] = useState({ id: '', name: '', categoryId: '', description: '' });
  const [displayType, setDisplayType] = useState('categories');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await AdminProductService.getAllCategories();
      const categoriesData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategoriesByCategory = async (category) => {
    try {
      const response = await AdminProductService.getSubcategoriesByCategory(category.id);
      const subcategoriesData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubcategories(subcategoriesData);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error fetching subcategories by category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await AdminProductService.deleteCategory(categoryId);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await AdminProductService.deleteSubcategory(subcategoryId);
      fetchSubcategoriesByCategory(selectedCategory);
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  const setCategoryForUpdate = (category) => {
    setUpdatedCategory(category);
    setShowUpdateCategoryForm(true);
  };

  const setSubcategoryForUpdate = (subcategory) => {
    setUpdatedSubcategory(subcategory);
    setShowUpdateSubcategoryForm(true);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubcategories = subcategories.filter(subcategory =>
    subcategory.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('lastActivity');
    navigate('/admin');
  };

  function AddCategoryModal({ isOpen, onClose, onSubmit, category, setCategory }) {
    if (!isOpen) return null;

    const handleCategorySubmit = async () => {
      try {
        await onSubmit(category);
        fetchCategories();
        setCategory({ id: '', name: '', image: '', description: '', density: '' });
        onClose();
      } catch (error) {
        console.error('Error adding category:', error);
      }
    };

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>&times;</span>
          <h2>Add New Category</h2>
          <input type="text" placeholder="Name" value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} />
          <input type="text" placeholder="Image URL" value={category.image} onChange={(e) => setCategory({ ...category, image: e.target.value })} />
          <input type="text" placeholder="Description" value={category.description} onChange={(e) => setCategory({ ...category, description: e.target.value })} />
          <input type="text" placeholder="Density" value={category.density} onChange={(e) => setCategory({ ...category, density: e.target.value })} />
          <button onClick={handleCategorySubmit}>Add Category</button>
        </div>
      </div>
    );
  }

  function AddSubcategoryModal({ isOpen, onClose, onSubmit, subcategory, setSubcategory }) {
    if (!isOpen) return null;

    const handleSubcategorySubmit = async () => {
      try {
        await onSubmit(subcategory);
        fetchSubcategoriesByCategory(selectedCategory);
        setSubcategory({ id: '', name: '', categoryId: '', description: '' });
        onClose();
      } catch (error) {
        console.error('Error adding subcategory:', error);
      }
    };

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>&times;</span>
          <h2>Add New Subcategory</h2>
          <input type="text" placeholder="Name" value={subcategory.name} onChange={(e) => setSubcategory({ ...subcategory, name: e.target.value })} />
          <select value={subcategory.categoryId} onChange={(e) => setSubcategory({ ...subcategory, categoryId: e.target.value })}>
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <input type="text" placeholder="Description" value={subcategory.description} onChange={(e) => setSubcategory({ ...subcategory, description: e.target.value })} />
          <button onClick={handleSubcategorySubmit}>Add Subcategory</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-product-operations">
      <aside className="sidebar">
        <button onClick={() => { setDisplayType('categories'); setSelectedCategory(null); }}>Display Categories</button>
        <AddCategory fetchCategories={fetchCategories} />
        <AddSubcategory fetchSubcategories={() => fetchSubcategoriesByCategory(selectedCategory)} categories={categories} />
        <button onClick={() => setDisplayType('orderList')}>Order List</button>
        <button onClick={handleLogout}>Logout</button>
      </aside>
      <main className="main-content">
        {displayType === 'categories' && !selectedCategory && (
          <div>
            <div className="search-section">
              <input
                type="text"
                placeholder="Search category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <br />
            <div className="categories-grid">
              {filteredCategories.map((category) => (
                <div key={category.id} className="category-card">
                  <h3>{category.name}</h3>
                  <img src={category.image} alt={category.name}></img>
                  <p>{category.description}</p>
                  <p>Density: {category.density}</p>
                  <div className="card-buttons">
                    <button onClick={() => fetchSubcategoriesByCategory(category)}>Show Subcategories</button>
                    <button onClick={() => setCategoryForUpdate(category)}>Update</button>
                    <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {displayType === 'categories' && selectedCategory && (
          <div>
            <button onClick={() => setSelectedCategory(null)}>Back to Categories</button>
            <div className="search-section">
              <input
                type="text"
                placeholder="Search subcategory"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <h2>{selectedCategory.name} Subcategories</h2>
            <br />
            <div className="subcategories-grid">
              {filteredSubcategories.map((subcategory) => (
                <div key={subcategory.id} className="subcategory-card">
                  <h4>{subcategory.name}</h4>
                  <p>{subcategory.description}</p>
                  <div className="card-buttons">
                    <button onClick={() => setSubcategoryForUpdate(subcategory)}>Update</button>
                    <button onClick={() => handleDeleteSubcategory(subcategory.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {displayType === 'orderList' && <QuotationList />}
      </main>
      <AddCategoryModal
        isOpen={showUpdateCategoryForm}
        onClose={() => setShowUpdateCategoryForm(false)}
        onSubmit={AdminProductService.updateCategory}
        category={updatedCategory}
        setCategory={setUpdatedCategory}
      />
      <AddSubcategoryModal
        isOpen={showUpdateSubcategoryForm}
        onClose={() => setShowUpdateSubcategoryForm(false)}
        onSubmit={AdminProductService.updateSubcategory}
        subcategory={updatedSubcategory}
        setSubcategory={setUpdatedSubcategory}
      />
    </div>
  );
}

export default AdminProductOperations;
