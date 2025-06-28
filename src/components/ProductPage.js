<<<<<<< HEAD
// src/components/ProductPage.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroSlider from './HeroSlider';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Background Image Section */}
      <div className="background-banner" />

      {/* Product Grid */}
      <div className="product-grid">
        {products.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "40px" }}>Loading products...</p>
        ) : (
          products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="image-wrapper">
                <img src={product.image} alt={product.title} />
                <div className="badge">Sale</div>
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <div className="price">
                  <span className="current">INR {(product.price * 83).toFixed(2)}</span>
                  <span className="original">INR {((product.price + 10) * 83).toFixed(2)}</span>
                </div>
                <Link to={`/product/${product.id}`} className="view-btn">Shop Now</Link>
              </div>
            </div>
          ))
        )}
      </div>
=======
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import HeroSlider from './HeroSlider';
import CartDrawer from './CartDrawer';
import { useCart } from './context/CartContext'; // ✅ Import cart context
import './ProductPage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Use addToCart from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = [];
        querySnapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product); // ✅ Add item to global cart
    setCartItem(product); // ✅ Show drawer
  };

  const handleCloseCart = () => {
    setCartItem(null);
  };

  return (
    <div className="product-page">
      <HeroSlider />
      <div className="background-banner" />

      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <div className="image-wrapper">
              <img src={product.image} alt={product.name} />
              <div className="quick-view-overlay" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </div>
              <div className="badge">Sale</div>
            </div>

            <div className="product-infoData">
              <div className="brand-name">Velnor</div>
              <h3>{product.name}</h3>

              <div className="rating-box">
                <span className="rating">3.3 ★</span>
                <span className="rating-count">| 694</span>
              </div>

              <div className="price">
                <span className="current">₹ {product.price}</span>
                <span className="original">₹ {product.price + 557}</span>
                <span className="discount">(76% off)</span>
              </div>

              <div className="offer-price">Offer Price: ₹{product.price - 197}</div>

              <button className="view-btn" onClick={() => handleView(product.id)}>
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Show cart drawer */}
      <CartDrawer cartItem={cartItem} onClose={handleCloseCart} />
>>>>>>> a7b10ae (Updated files and added new changes)
    </div>
  );
};

export default ProductPage;
