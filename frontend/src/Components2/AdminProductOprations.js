// Import statements
import React, { useState, useEffect } from 'react';
import AdminProductService from '../Services2/AdminProductService';
import './../CSS/AdminProductList.css';

// ProductCard component for displaying product details


function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>URL: <a href={product.url}>{product.url}</a></p>
    </div>
  );
}







// Main component for admin product operations
function AdminProductOperations() {
  // State for storing products list
  const [products, setProducts] = useState([]);
  // State for managing the new product form input
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', url: '' });
  // State for toggling the add product form visibility
  const [showAddForm, setShowAddForm] = useState(false);
  // State for managing the currently selected product for detailed view
  const [selectedProduct, setSelectedProduct] = useState(null);
  // State for handling search query
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
   // State for managing the updated product details
   const [updatedProduct, setUpdatedProduct] = useState({ id: '', name: '', description: '', price: '', url: '' });

  // Effect hook for fetching products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await AdminProductService.delete(productId);
      // After deletion, fetch the updated list of products
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (id) => {
    try {
      await AdminProductService.update(id,updatedProduct);
      fetchProducts(); // Refresh the products list
      setUpdatedProduct({ id: '', name: '', description: '', price: '', url: '' }); // Reset form
      setShowUpdateForm(false); // Hide the form after updating
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  const setProductForUpdate = (product) => {
    setUpdatedProduct(product);
    setShowUpdateForm(true);
  };

  // Function to fetch products
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

  // Function to handle adding a new product
  const handleAddProduct = async () => {
    try {
      await AdminProductService.create(newProduct);
      fetchProducts(); // Refresh the products list
      setNewProduct({ name: '', description: '', price: '', url: '' }); // Reset form
      setShowAddForm(false); // Hide the form after adding
    } catch (error) {
      console.error('Error adding product:', error);
    }
    setIsAddModalOpen(false);
  };


  const handleUpdate = async () => {

  };

  

  // Functions to handle update and delete operations go here...

  // Filtering products based on search query
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
      {/* Main content area */}
      <aside className="sidebar">
      <button onClick={() => setIsAddModalOpen(true)}>Add Product</button>
      {/* Add more buttons as needed for other operations */}
    </aside>
    <main className="main-content">
      {/* Conditional rendering for the Add Product Form */}
      <AddProductModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onSubmit={handleAddProduct} 
          product={newProduct} 
          setProduct={setNewProduct}
        />

<UpdateProductModal
          isOpen={showUpdateForm}
          onClose={() => setShowUpdateForm(false)}
          onSubmit={handleUpdateProduct}
          product={updatedProduct}
          setProduct={setUpdatedProduct}
        />

      {/* Search section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products display grid */}
      {/* Products display grid */}
      <div className="products-grid">
          {products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product) => (
            <div className="product-card" key={product.id} onClick={() => setSelectedProduct(product)}>
              <img src={product.url} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}>Delete</button>
              <button onClick={(e) => { e.stopPropagation(); setProductForUpdate(product.id,product); }}>Update</button>
            </div>
          ))}
        </div>

      {/* Modal for viewing selected product details */}
      {selectedProduct && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={() => setSelectedProduct(null)}>&times;</span>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="product-image-modal" />
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <p>Price: ${selectedProduct.price}</p>
              {/* More details or actions for the selected product can be added here */}
            </div>
          </div>
        )}
    </main>
  </div>
);
}
export default AdminProductOperations;
