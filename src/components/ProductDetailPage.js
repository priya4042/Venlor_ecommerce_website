import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import { motion } from "framer-motion";
import "./ProductDetailPage.css";

import { useCart } from "./context/CartContext"; // ✅ Cart context

import SizeChart from "../components/SizeChart";
import DeliveryInfo from "../components/DeliveryInfo";
import Reviews from "../components/Reviews";
import ModelInfo from "../components/ModelInfo";
import RelatedProducts from "../components/RelatedProducts";
import WishlistShare from "../components/WishlistShare";
import TrustBadges from "../components/TrustBadges";
import StockStatus from "../components/StockStatus";
import FabricInfo from "../components/FabricInfo";
import ProductTags from "../components/ProductTags";
import WhyChooseUs from "../components/WhyChooseUs";
import OffersDiscounts from "../components/OffersDiscounts";
import FAQsSection from "../components/FAQsSection";
import DeliveryCheck from "../components/DeliveryCheck";

const fallbackImage = "https://via.placeholder.com/500x500?text=No+Image";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState("#000000");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart(); // ✅ Get addToCart from context

  // 🔥 Fetch product from Firebase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const docSnap = await getDoc(productRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct(data);
          if (data.color) setBgColor(data.color);
        } else {
          console.error("Product not found in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 🔥 Loading + error states
  if (loading) return <div className="loader">Loading...</div>;
  if (!product) return <div className="error">Product not found</div>;

  // 🔥 Normalize images from `media` field in Firebase
  const rawImages = Array.isArray(product.media)
    ? product.media
    : product.media
    ? [product.media]
    : [];

  const images =
    rawImages.length > 0
      ? rawImages.map((img) =>
          img && img.startsWith("http") ? img : fallbackImage
        )
      : [fallbackImage];

  // ✅ Ensure Swiper always has at least 3 images for smooth UI
  while (images.length < 3) images.push(images[0]);

  // 🔥 Add to cart handler
  const handleAddToCart = () => {
    addToCart({
      id,
      name: product.title, // ✅ Firebase stores `title`
      image: product.media?.[0] || fallbackImage, // ✅ First media image
      price: product.price,
      quantity: quantity,
    });
  };

  return (
    <div
      className="product-detail-page"
      style={{
        backgroundBlendMode: "screen, screen, multiply, multiply",
        transition: "background 0.4s ease-in-out",
      }}
    >
      <div className="product-detail-container">
        {/* ✅ Thumbnail slider */}
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
                <img
                  src={img}
                  alt={`Thumb ${index}`}
                  className="thumb-image-vertical"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* ✅ Main image slider */}
        <motion.div
          className="main-image-column"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            navigation
            pagination={{ clickable: true }}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
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

        {/* ✅ Product info */}
        <motion.div
          className="product-info"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="visit-store">
            Visit the <strong>VELNOR</strong> Store
          </p>
          <h1 className="product-title">{product.title}</h1>
          <div className="rating">★ 3.5 out of 5 stars — 2,155 ratings</div>

          <div className="price-box">
            <span className="discount-percentage">-81%</span>
            <span className="discounted">₹{product.price}</span>
            <span className="original">
              M.R.P.: ₹{parseInt(product.price) + 1210}
            </span>
          </div>

          <div className="availability">✔ Fulfilled | Inclusive of all taxes</div>

          <div className="offers">
            <h4>Offers</h4>
            <ul>
              <li>
                <strong>Cashback:</strong> Upto ₹8 cashback with ICICI Bank Card
              </li>
              <li>
                <strong>Partner Offers:</strong> Buy 2 or more, get 3% off
              </li>
              <li>
                <strong>Bank Offer:</strong> Upto ₹750 off on select cards
              </li>
            </ul>
          </div>

          <div className="badges">
            <span>📦 10 days Return & Exchange</span>
            <span>💵 Cash on Delivery</span>
            <span>🚚 Free Shipping</span>
            <span>🏆 Top Brand</span>
            <span>🔐 Secure Transaction</span>
          </div>

          <div className="sizes">
            <label>Size:</label>
            <div className="size-options">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button key={size}>{size}</button>
              ))}
            </div>
            <SizeChart />
          </div>

          <div className="quantity-control">
            <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now">Buy Now</button>
          </div>

          <p className="description">{product.description}</p>
        </motion.div>
      </div>

      {/* ✅ Additional Sections */}
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
      </div>
    </div>
  );
};

export default ProductDetailPage;
