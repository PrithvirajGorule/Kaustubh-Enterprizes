import React, { useState, useEffect } from 'react';
import AdminProductService from '../Services2/AdminProductService';
import './../CSS/AdminProductList.css';
function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px' }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>URL: <a href={product.url}>{product.url}</a></p>
    </div>
  );
}

function AdminProductOprations() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', url: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleAddProduct = async () => {
    try {
      await AdminProductService.create(newProduct);
      fetchProducts();
      setNewProduct({ name: '', description: '', price: '', url: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdate = async (id, field, value) => {
    try {
      await AdminProductService.update(id, { [field]: value });
      setProducts(products.map(product =>
        product.id === id ? { ...product, [field]: value } : product
      ));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await AdminProductService.delete(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseView = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="URL"
          value={newProduct.url}
          onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseView}>&times;</span>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>Price: ${selectedProduct.price}</p>
            <img src={selectedProduct.url} alt={selectedProduct.name} />
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleUpdate(product.id, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={product.description}
                  onChange={(e) => handleUpdate(product.id, 'description', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleUpdate(product.id, 'price', parseFloat(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={product.url}
                  onChange={(e) => handleUpdate(product.id, 'url', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
                <button onClick={() => handleViewProduct(product)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductOprations;
