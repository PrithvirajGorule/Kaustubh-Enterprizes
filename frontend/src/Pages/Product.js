import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import AdminProductService from '../Services2/AdminProductService';
import Jumbotron from '../Components/Jumbotron';
import '../CSS/Product.css';
import MainPage from '../Components2/DisplayCategory';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminProductService.getAll();
        const productsData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='hello'>
      <Jumbotron />
      <div className="product-page">
        <div className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <i className="fas fa-search search-icon"></i> {/* Search icon */}
        </div>
      </div>
      <MainPage />
    </div>
  );
};

export default Product;
