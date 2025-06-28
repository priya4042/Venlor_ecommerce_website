import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import HeroSlider from './HeroSlider';
import CartDrawer from './CartDrawer';
import { useCart } from './context/CartContext';
import './ProductPage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

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
    addToCart(product);
    setCartItem(product);
  };

  const handleCloseCart = () => {
    setCartItem(null);
  };

  return (
    <div className="product-page">
      <HeroSlider />
      <div className="background-banner" />

      <div className="product-grid">
        {products.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "40px" }}>Loading products...</p>
        ) : (
          products.map(product => (
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
          ))
        )}
      </div>

      <CartDrawer cartItem={cartItem} onClose={handleCloseCart} />
    </div>
  );
};

export default ProductPage;
