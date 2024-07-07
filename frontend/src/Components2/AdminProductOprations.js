import React, { useState, useEffect } from 'react';
import AdminProductService from '../Services2/AdminProductService';
import './../CSS/AdminProductList.css';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import DisplayProduct from './DisplayProduct';
import { Link, useNavigate } from 'react-router-dom';
import QuotationList from './QuotationList';
import AddCategory from './AddCategory';
import AddSubcategory from './AddSubcategory'; // Import AddSubcategory component here

function AdminProductOperations() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateCategoryForm, setShowUpdateCategoryForm] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState({ id: '', name: '', image: '', description: '', density: '' });
  const [showUpdateSubcategoryForm, setShowUpdateSubcategoryForm] = useState(false);
  const [updatedSubcategory, setUpdatedSubcategory] = useState({ id: '', name: '', categoryId: '', description: '' });
  const [displayType, setDisplayType] = useState('categories'); // State to manage what to display
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
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

  const fetchSubcategories = async () => {
    try {
      const response = await AdminProductService.getAllSubcategories();
      const subcategoriesData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubcategories(subcategoriesData);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchSubcategoriesByCategory = async (categoryId) => {
    try {
      const response = await AdminProductService.getSubcategoriesByCategory(categoryId);
      const subcategoriesData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(subcategoriesData);
      setSubcategories(subcategoriesData);
      setSelectedCategory(categoryId);
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
      fetchSubcategories();
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
        setCategory({ id: '', name: '', image: '', description: '', density: '' }); // Clear form fields
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
        fetchSubcategories();
        setSubcategory({ id: '', name: '', categoryId: '', description: '' }); // Clear form fields
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
        {/* Buttons to switch between display types */}
        <button onClick={() => setDisplayType('categories')}>Display Categories</button>
        <AddCategory fetchCategories={fetchCategories} />
        <AddSubcategory fetchSubcategories={fetchSubcategories} categories={categories} /> {/* AddSubcategory component usage */}
        <button onClick={() => setDisplayType('orderList')}>Order List</button>
        <button onClick={handleLogout}>Logout</button>
      </aside>
      <main className="main-content">
        {/* Content based on the displayType state */}
        {displayType === 'categories' && (
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
                  <img src={category.image}></img>
                  <p>{category.description}</p>
                  <p>Density: {category.density}</p>
                  <div className="card-buttons">
                    <button onClick={() => fetchSubcategoriesByCategory(category.id)}>Show Subcategories</button>
                    <button onClick={() => setCategoryForUpdate(category)}>Update</button>
                    <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                  </div>
                  {selectedCategory == category.id && (

                    <div className="subcategories-grid">
                      <h1>sub-categories</h1>
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
                  )}
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
