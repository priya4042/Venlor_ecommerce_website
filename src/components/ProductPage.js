// src/components/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import HeroSlider from './HeroSlider';
import CartModal from './CartModal';
import { useCart } from './context/CartContext';
import FeaturesCarousel from "./FeaturesCarousel";
import './ProductPage.css';
import 'animate.css';

const ProductPage = () => {
  // ✅ States
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const items = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const isActive =
            (data?.status?.toLowerCase?.() === 'active') ||
            data?.inStock === true;

          if (isActive) items.push({ id: doc.id, ...data });
        });

        setProducts(items);
      } catch (err) {
        console.error("❌ Error loading products:", err);
        alert("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const goPrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowModal(true);
  };

  // ✅ Render dynamic page numbers with ellipses
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            className={`page-number ${i === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        );
      } else if (
        i === currentPage - 2 || 
        i === currentPage + 2
      ) {
        pages.push(<span key={i} className="dots">...</span>);
      }
    }
    return pages;
  };

  return (
    <div className="product-page">
      <HeroSlider />
      <FeaturesCarousel />

      {/* ✅ Section Heading */}
      <h2 className="section-heading">Latest Arrival</h2>

      {/* ✅ No products fallback */}
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
        <>
          {/* ✅ Product Grid */}
          <div className="product-grid">
            {currentProducts.map((product) => (
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

          {/* ✅ Pagination (exactly like image) */}
<div className="pagination" role="navigation" aria-label="Products pagination">
  <button 
    className="page-btn" 
    onClick={goPrev} 
    disabled={currentPage === 1}
  >
    &lt;
  </button>

  {/* ✅ Show "1/5" format */}
  <span className="page-count">
    {currentPage}/{totalPages}
  </span>

  <button 
    className="page-btn" 
    onClick={goNext} 
    disabled={currentPage === totalPages}
  >
    &gt;
  </button>
</div>

          {/* ✅ Moving Ribbon */}
          <div className="bottom-ticker" aria-hidden="true">
            <div className="ticker-inner">
              <span>💡 Welcome to VELNOR — Where the Brand Becomes You.</span>
              <span>💡 Latest Drops Available Now!</span>
              <span>💡 Free Shipping on Your First Order!</span>
            </div>
          </div>
        </>
      )}

      {showModal && <CartModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductPage;
