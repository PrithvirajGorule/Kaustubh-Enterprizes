import React, { useState, useEffect } from 'react';
import AdminProductService from '../Services2/AdminProductService';
import './../CSS/AdminProductList.css';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import DisplayProduct from './DisplayProduct';
import { Link } from 'react-router-dom';
import QuotationList from './QuotationList';

function AdminProductOperations() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ id: '', name: '', description: '', price: '', url: '', shape: '', application: '', width: '', thickness: '', grade: '', material: '', unitType: '' });
  const [displayType, setDisplayType] = useState('products'); // State to manage what to display

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await AdminProductService.getAll();
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await AdminProductService.delete(productId);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const setProductForUpdate = (product) => {
    setUpdatedProduct(product);
    setShowUpdateForm(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function AddProductModal({ isOpen, onClose, onSubmit, product, setProduct }) {
    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>&times;</span>
          <h2>Add New Product</h2>
          <input type="text" placeholder="Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
          <input type="text" placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
          <input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} />
          <input type="text" placeholder="URL" value={product.url} onChange={(e) => setProduct({ ...product, url: e.target.value })} />
          <button onClick={onSubmit}>Add Product</button>
        </div>
       
      </div>
    );
  }

  function UpdateProductModal({ isOpen, onClose, onSubmit, product, setProduct }) {
    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>&times;</span>
          <h2>Update Product</h2>
          <input type="text" placeholder="Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
          <input type="text" placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
          <input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} />
          <input type="text" placeholder="URL" value={product.url} onChange={(e) => setProduct({ ...product, url: e.target.value })} />
          <button onClick={onSubmit}>Update Product</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-product-operations">
      <aside className="sidebar">
        {/* Buttons to switch between display types */}
        <button onClick={() => setDisplayType('products')}>Display Products</button>
        <AddProduct fetchProducts={fetchProducts} />
        <button onClick={() => setDisplayType('orderList')}>Order List</button>
      </aside>
      <main className="main-content">
        {/* Content based on the displayType state */}
        {displayType === 'products' && (
          <div>
            <div className="search-section">
              <input
                type="text"
                placeholder="Search product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <DisplayProduct
                  key={product.id}
                  product={product}
                  handleDelete={handleDelete}
                  setProductForUpdate={setProductForUpdate}
                />
              ))}
            </div>
          </div>
        )}
        {/* {displayType === 'addProduct' && <AddProduct fetchProducts={fetchProducts} />} */}
        {displayType === 'orderList' && <QuotationList />}
        {showUpdateForm && (
          <UpdateProduct
            fetchProducts={fetchProducts}
            showUpdateForm={showUpdateForm}
            setShowUpdateForm={setShowUpdateForm}
            updatedProduct={updatedProduct}
            setUpdatedProduct={setUpdatedProduct}
          />
        )}
      </main>
    </div>
  );
}

export default AdminProductOperations;
