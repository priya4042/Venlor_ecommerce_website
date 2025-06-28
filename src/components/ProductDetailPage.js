<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailPage.css';

const getColorFromId = (id) => {
  const colors = ['#f97316', '#10b981', '#3b82f6', '#9333ea', '#ef4444', '#eab308'];
  return colors[id % colors.length];
};
=======
import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import { motion } from 'framer-motion';
import './ProductDetailPage.css';

import SizeChart from '../components/SizeChart.js';
import DeliveryInfo from '../components/DeliveryInfo.js';
import Reviews from '../components/Reviews.js';
import ModelInfo from '../components/ModelInfo.js';
import RelatedProducts from '../components/RelatedProducts.js';
import WishlistShare from '../components/WishlistShare.js';
import TrustBadges from '../components/TrustBadges.js';
import StockStatus from '../components/StockStatus.js';
import FabricInfo from '../components/FabricInfo.js';
import ProductTags from '../components/ProductTags.js';
import WhyChooseUs from '../components/WhyChooseUs.js';
import OffersDiscounts from '../components/OffersDiscounts.js';
import FAQsSection from '../components/FAQsSection.js';
import DeliveryCheck from '../components/DeliveryCheck.js';

const fallbackImage = 'https://via.placeholder.com/500x500?text=No+Image';
>>>>>>> a7b10ae (Updated files and added new changes)

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
<<<<<<< HEAD
  const [bgColor, setBgColor] = useState('#f97316');
  const [relatedProducts, setRelatedProducts] = useState([]);
=======
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState('#000000');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
>>>>>>> a7b10ae (Updated files and added new changes)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
<<<<<<< HEAD
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setBgColor(getColorFromId(data.id));
      } catch (error) {
        console.error('Failed to fetch product:', error);
=======
        const productRef = doc(db, 'products', id);
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('Fetched product:', data);
          setProduct(data);
          if (data.color) setBgColor(data.color);
        } else {
          console.error('Product not found in database.');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
>>>>>>> a7b10ae (Updated files and added new changes)
      }
    };
    fetchProduct();
  }, [id]);

<<<<<<< HEAD
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setRelatedProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      }
    };
    fetchRelatedProducts();
  }, []);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-page" style={{ backgroundColor: bgColor }}>
      <div className="product-detail-container">
        {/* LEFT IMAGE SECTION */}
        <div className="product-images-layout">
          <div className="large-image-card">
            <img src={product.image} alt="Main view" />
          </div>
          <div className="small-image-row">
            {[...Array(4)].map((_, i) => (
              <div className="image-card" key={i}>
                <img src={product.image} alt={`View ${i + 2}`} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT INFO SECTION */}
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="category">{product.category}</p>
          <div className="price-box">
            <span className="price-original">Rs. {(product.price * 100).toFixed(2)}</span>
            <span className="price-current">Rs. {(product.price * 83).toFixed(2)}</span>
          </div>

          <div className="ratings">★★★★☆ 4.5 (245 reviews)</div>

          <div className="size-selector">
            <strong>Size:</strong>
            <div className="size-options">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button key={size}>{size}</button>
              ))}
            </div>
          </div>

          <div className="quantity-control">
            <strong>Quantity:</strong>
            <div>
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>

          <div className="button-group">
            <button className="add-to-cart">Add to cart</button>
            <button className="buy-now">Buy it now</button>
          </div>

          <p className="description">{product.description}</p>
        </div>
      </div>

      <div className="you-may-also-like">
        <h2>You May Also Like</h2>
        <div className="related-products">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="related-product">
              <img src={relatedProduct.image} alt={relatedProduct.title} />
              <p className="related-title">{relatedProduct.title}</p>
              <span className="related-price">Rs. {(relatedProduct.price * 83).toFixed(2)}</span>
            </div>
          ))}
        </div>
=======
  if (loading) return <div className="loader">Loading...</div>;
  if (!product) return <div className="error">Product not found</div>;

  const images =
    (product.images && product.images.length > 0
      ? product.images
      : [product.image || fallbackImage]
    ).map((img) =>
      img?.startsWith('http') ? img : fallbackImage
    );

  return (
    <div
      className="product-detail-page"
      style={{ background: `linear-gradient(to bottom, ${bgColor}, #000000)` }}
    >
      <div className="product-detail-container" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <motion.div
          className="thumbnail-column"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            slidesPerView={4}
            spaceBetween={10}
            className="thumb-slider-vertical"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Thumb ${index}`} className="thumb-image-vertical" />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          className="main-image-column"
          style={{ marginRight: '1rem' }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            navigation
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            spaceBetween={10}
            className="main-slider"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Product ${index}`} className="main-image" />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          className="product-info"
          style={{ flexGrow: 1, maxWidth: '800px', marginLeft: '3rem' }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="visit-store">Visit the <strong>VELNOR</strong> Store</p>
          <h1 className="product-title">{product.name}</h1>
          <div className="rating">★ 3.5 out of 5 stars — 2,155 ratings</div>

          <div className="price-box">
            <span className="discount-percentage">-81%</span>
            <span className="discounted">₹{product.price}</span>
            <span className="original">M.R.P.: ₹{parseInt(product.price) + 1210}</span>
          </div>

          <div className="availability">✔ Fulfilled | Inclusive of all taxes</div>

          <div className="offers">
            <h4>Offers</h4>
            <ul>
              <li><strong>Cashback:</strong> Upto ₹8 cashback with Amazon Pay ICICI Bank Card</li>
              <li><strong>Partner Offers:</strong> Buy 2 or more, get 3% off</li>
              <li><strong>Bank Offer:</strong> Upto ₹750 off on select Credit Cards</li>
            </ul>
          </div>

          <div className="badges">
            <span>📦 10 days Return & Exchange</span>
            <span>💵 Cash/Pay on Delivery</span>
            <span>🚚 Free Delivery</span>
            <span>🏆 Top Brand</span>
            <span>✅ Amazon Delivered</span>
            <span>🔐 Secure Transaction</span>
          </div>

          <div className="color-options">
            <label>Colour: <strong>Metal Black</strong></label>
            <div className="color-swatches">
              {(product.colorOptions || []).map((option, idx) => (
                <div key={idx} className="color-swatch-wrapper">
                  <img
                    src={option.image}
                    alt={option.name}
                    title={option.name}
                    className="color-swatch-image"
                    onClick={() => {
                      // optionally setProduct() with new product variant
                    }}
                  />
                  <span className="color-label">{option.name}</span>
                </div>
              ))}
            </div>

          </div>

          <div className="sizes">
            <label>Size:</label>
            <div className="size-options">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button key={size}>{size}</button>
              ))}
            </div>
            <SizeChart />
          </div>

          <div className="quantity-control">
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>

          <p className="description">{product.description}</p>
        </motion.div>
      </div>

      <div className="product-extra-info">
        <Suspense fallback={<div>Loading sections…</div>}>
          <DeliveryInfo />
          <TrustBadges />
          <StockStatus />
          <FabricInfo />
          <DeliveryCheck />
          <WishlistShare />
          <OffersDiscounts />
          <ProductTags />
          <WhyChooseUs />
          <FAQsSection />
          <ModelInfo />
          <Reviews />
          <RelatedProducts />
        </Suspense>
>>>>>>> a7b10ae (Updated files and added new changes)
      </div>
    </div>
  );
};

export default ProductDetailPage;
