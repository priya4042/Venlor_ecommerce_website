// src/components/AddProducts.jsx

import React, { useState, useEffect } from 'react';
import './AddProducts.css';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import AddProductForm from './AddProductForm';

function AddProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetched = [];
        querySnapshot.forEach(doc => {
          fetched.push({ id: doc.id, ...doc.data() });
        });
        setProducts(fetched);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDone = () => {
    setShowForm(false);
    setEditingProduct(null);
    window.location.reload(); // You can replace with a smarter update later
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    setActionLoading(true);
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Search by title instead of name
  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="add-products container mt-4">
      {(loading || actionLoading) && (
        <div className="velnor-loader-overlay">
          <div className="velnor-loader">VELNOR</div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="page-title">Manage Products</h2>
      </div>

      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddNew}>+ Add Product</button>
      </div>

      {!showForm && (
        <table className="table table-bordered table-striped product-table mt-3">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th style={{ width: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod, idx) => (
              <tr key={idx}>
                <td>
                  <img
                    src={prod.media?.[0] || 'https://via.placeholder.com/60'}
                    alt="product"
                    width="60"
                    className="product-image"
                  />
                </td>
                <td>{prod.title}</td>
                <td>{prod.category || 'N/A'}</td>
                <td>₹ {prod.price || 0}</td>
                <td>
                  {prod.seoDescription
                    ? prod.seoDescription.replace(/<[^>]+>/g, '').slice(0, 50) + '...'
                    : 'No description'}
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(prod)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(prod.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="text-center text-muted">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="form-popup">
          <AddProductForm
            existing={editingProduct}
            onDone={handleDone}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}

export default AddProducts;
