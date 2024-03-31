import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import AdminProductService from '../Services2/AdminProductService';
import Jumbotron from '../Components/Jumbotron';
const Product = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="product-page">
        <Jumbotron></Jumbotron>
      <h1>Products</h1>
      <div className="gallery-container">
        {products.map(item => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Product;
