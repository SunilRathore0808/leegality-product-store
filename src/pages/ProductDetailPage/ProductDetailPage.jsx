import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import { FaStar } from "react-icons/fa";

import Loader from "../../components/Loader/Loader";
import ErrorState from "../../components/ErrorState/ErrorState";
import Navbar from "../../components/Navbar/Navbar";

import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getProductById(id);
      setProduct(response.data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const floatRating = parseFloat(rating || 0);

    const fullStarsCount = Math.floor(floatRating);

    const decimalPart = floatRating - fullStarsCount;
    const hasHalfStar = decimalPart >= 0.3 && decimalPart <= 0.7;

    const effectiveFullStars =
      decimalPart >= 0.8 ? fullStarsCount + 1 : fullStarsCount;

    for (let i = 1; i <= 5; i++) {
      if (i <= effectiveFullStars) {
        // Render Full Golden Star
        stars.push(
          <FaStar
            key={i}
            className="star-icon full-star"
            style={{ color: "#ffa41c" }}
          />
        );
      } else if (i === effectiveFullStars + 1 && hasHalfStar) {
        // Render Half-Filled Star with CSS Layout Overlay
        stars.push(
          <div key={i} className="half-star-wrapper">
            <FaStar
              className="star-icon background-empty-star"
              style={{ color: "#e2e8f0" }}
            />
            <div className="half-star-fill">
              <FaStar
                className="star-icon foreground-filled-star"
                style={{ color: "#ffa41c" }}
              />
            </div>
          </div>
        );
      } else {
        stars.push(
          <FaStar
            key={i}
            className="star-icon empty-star"
            style={{ color: "#e2e8f0" }}
          />
        );
      }
    }
    return stars;
  };

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;
  if (!product) return null;

  return (
    <div className="app-window-frame">
      <Navbar onToggleSidebar={() => navigate("/")} />

      <div className="detail-layout-container">
        <div className="detail-left-column">
          <button className="detail-back-btn" onClick={() => navigate(-1)}>
            <span className="back-arrow-icon">←</span> Back
          </button>

          <div className="detail-image-box">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className="detail-mock-pagination">
            <button className="mock-pag-btn" disabled>
              ← Previous
            </button>
            <button className="mock-pag-btn active">1</button>
            <button className="mock-pag-btn">2</button>
            <button className="mock-pag-btn">3</button>
            <button className="mock-pag-btn">4</button>
            <button className="mock-pag-btn">5</button>
            <button className="mock-pag-btn">Next →</button>
          </div>
        </div>

        {/* Right Side: Information Panels */}
        <div className="detail-right-column">
          <h1 className="detail-main-title">{product.title}</h1>

          <div className="detail-pricing-row">
            <span className="detail-price-lbl">${product.price}</span>
            <div className="detail-rating-stars-inline">
              {renderStars(product.rating)}
              <span className="detail-rating-num">
                ({Number(product.rating).toFixed(1)})
              </span>
            </div>
          </div>

          <div className="detail-metadata-block">
            <p>
              <strong>Brand:</strong> {product.brand || "Generic"}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
          </div>

          <div className="detail-section-block">
            <h3 className="detail-section-title">Description</h3>
            <p className="detail-description-text">{product.description}</p>
          </div>

          <div className="detail-section-block">
            <h3 className="detail-section-title">Reviews</h3>
            <div className="detail-reviews-list-wrapper">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, index) => (
                  <div key={index} className="review-item-card">
                    <div className="review-header-row">
                      <span className="reviewer-name-txt">
                        {rev.reviewerName || "Anonymous"}
                      </span>
                      <div className="review-stars-row">
                        {renderStars(rev.rating)}
                        <span className="review-rating-subtext">
                          ({Number(rev.rating).toFixed(1)})
                        </span>
                      </div>
                    </div>
                    <p className="reviewer-comment-content">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="review-item-card">
                    <div className="review-header-row">
                      <span className="reviewer-name-txt">Emily</span>
                      <div className="review-stars-row">
                        {renderStars(4)}
                        <span className="review-rating-subtext">(4.0)</span>
                      </div>
                    </div>
                    <p className="reviewer-comment-content">
                      Excellent phone with great camera and battery life. Highly
                      recommended!
                    </p>
                  </div>
                  <div className="review-item-card">
                    <div className="review-header-row">
                      <span className="reviewer-name-txt">John</span>
                      <div className="review-stars-row">
                        {renderStars(4)}
                        <span className="review-rating-subtext">(4.0)</span>
                      </div>
                    </div>
                    <p className="reviewer-comment-content">
                      Very satisfied with the performance and features. It's a
                      great value for the money.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
