// src/components/ProductPage.jsx

import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import HeroSlider from './HeroSlider';
import CartModal from './CartModal';
import { useCart } from './context/CartContext';

import './ProductPage.css';
import 'animate.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const items = [];

        snapshot.forEach((doc) => {
          const data = doc.data();

          // ✅ Improved logic: case-insensitive check + fallback
          const isActive =
            (data?.status?.toLowerCase?.() === 'active') ||
            data?.inStock === true;

          console.log("🧪 Checking:", data.title, "| Status:", data.status, "| InStock:", data.inStock);

          if (isActive) {
            items.push({ id: doc.id, ...data });
          }
        });

        setProducts(items);
      } catch (err) {
        console.error("❌ Error loading products:", err);
        alert("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowModal(true);
  };

  return (
    <div className="product-page">
      <HeroSlider />

      {/* Show fallback if no products */}
      {products.length === 0 ? (
        <div className="no-products-wrapper">
          <div className="no-products-box animate__animated animate__fadeIn">
            <h2 className="no-products-title">😢 No Products Available</h2>
            <p className="no-products-sub">Start by adding your first product</p>
            <button className="add-product-btn" onClick={() => navigate('/add-products')}>
              ➕ Add Product
            </button>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="image-wrapper">
                <img
                  src={product.media?.[0] || 'https://via.placeholder.com/300'}
                  alt={product.title || 'Product Image'}
                  className="product-img"
                />
                <div className="quick-view-overlay" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </div>
                {product.badge && <div className="badge">{product.badge}</div>}
              </div>

              <div className="product-infoData">
                <div className="brand-name">Velnor</div>
                <h3>{product.title || 'Untitled Product'}</h3>

                <div className="price">
                  <span className="current">₹ {product.price}</span>
                  <span className="original">₹ {(product.price || 0) + 557}</span>
                  <span className="discount">(76% off)</span>
                </div>

                <div className="offer-price">
                  Offer Price: ₹ {(product.price || 0) - 197}
                </div>

                <button className="view-btn" onClick={() => navigate(`/product/${product.id}`)}>
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <CartModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductPage;
