// src/components/ProductCard/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const floatRating = parseFloat(rating || 0);

    // 1. Get the number of completely full stars (e.g., 4.6 -> 4 full stars)
    const fullStarsCount = Math.floor(floatRating);

    // 2. Check if the remaining decimal qualifies for a half-star (between 0.3 and 0.7)
    const decimalPart = floatRating - fullStarsCount;
    const hasHalfStar = decimalPart >= 0.3 && decimalPart <= 0.7;

    // 3. If the decimal is high (>= 0.8), it practically counts as another full star for display
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
        // Render Empty Gray Star
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

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-card-image-wrapper">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="product-card-info">
        <h4 className="product-card-title">{product.title}</h4>

        <div className="product-card-meta">
          <span className="product-card-price">${product.price}</span>

          <div className="product-card-rating">
            <div className="stars-row">{renderStars(product.rating)}</div>
            {/* .toFixed(1) forces 4.64 to show as 4.6 */}
            <span className="rating-value">
              ({Number(product.rating).toFixed(1)})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
