import React, { useState, useEffect } from 'react';
import AdminProductService from '../Services2/AdminProductService';
import Jumbotron from '../Components/Jumbotron';
import '../CSS/Product.css';

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchProducts();
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

  const fetchProducts = async () => {
    try {
      const response = await AdminProductService.getAllProducts();
      const productsData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSubcategoriesByCategory = async (category) => {
    try {
      const response = await AdminProductService.getSubcategoriesByCategory(category.id);
      const subcategoriesData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubcategories(subcategoriesData);
      setSelectedCategory(category);
      setSelectedSubcategory(null);
    } catch (error) {
      console.error('Error fetching subcategories by category:', error);
    }
  };

  const fetchProductsBySubcategory = async (subcategory) => {
    try {
      const response = await AdminProductService.getProductsBySubcategory(subcategory.id);
      const productsData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
      setSelectedSubcategory(subcategory);
    } catch (error) {
      console.error('Error fetching products by subcategory:', error);
    }
  };

  // Filter products or subcategories based on search query
  const filteredItems = selectedCategory && !selectedSubcategory
    ? subcategories.filter(subcategory =>
        subcategory.name && subcategory.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products.filter(product =>
        product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Handle search input change
  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='product-page'>
      <Jumbotron />
      {/* <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder={`Search ${selectedCategory ? 'subcategories' : 'products'}...`}
          // value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <i className="fas fa-search search-icon"></i>
      </div> */}



      {!selectedCategory && (
        <div className="gallery-container">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <h3>{category.name}</h3>
              <img src={category.image ?? 'default-image-url.jpg'} alt={category.name ?? 'Category Image'} className="category-img" />
              <p>{category.description}</p>
              <button onClick={() => fetchSubcategoriesByCategory(category)}>View grades</button>
            </div>
          ))}
        </div>
      )}
      {selectedCategory && !selectedSubcategory && (
        <div>
          <button onClick={() => setSelectedCategory(null)}>Back to Categories</button>
          <h2>{selectedCategory.name} Subcategories</h2>
          <div className="gallery-container">
            {filteredItems.map(subcategory => (
              <div key={subcategory.id} className="subcategory-card">
                <h4>{subcategory.name}</h4>
                <p>{subcategory.description}</p>
                
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedSubcategory && (
        <div>
          <button onClick={() => setSelectedSubcategory(null)}>Back to Subcategories</button>
          <h2>{selectedSubcategory.name} Products</h2>
          <div className="gallery-container">
            {filteredItems.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image ?? 'default-image-url.jpg'} alt={product.name ?? 'Product Image'} className="product-img" />
                <div className="product-body">
                  <h3 className="product-title">{product.name ?? 'Unnamed Product'}</h3>
                  <p className="product-text">{product.description ?? 'No description available.'}</p>
                  {product.price && <p className="product-price">Price: {product.price}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
