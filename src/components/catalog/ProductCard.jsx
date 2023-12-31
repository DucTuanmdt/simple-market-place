import React from "react";
import { IconButton } from "rsuite";
import { MdOutlineStar, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import useToggle from "../../hooks/useToggle";
import clsx from "clsx";
import { formatCurrency } from "../../utils/stringUtils";

const getThumbnailUrl = (id) => {
  const TOTAL_IMAGE = 12;
  const index = (id % TOTAL_IMAGE) + 1;

  return `/images/products/drone-${index}.png`;
};

function ProductCard({
  name,
  thumbnail,
  price,
  rating,
  reviewCount,
  originalPrice,
  className,
}) {
  const [isFavorite, toggleIsFavorite] = useToggle();

  return (
    <div className={clsx("product-card-container", className)}>
      <div className="product-thumbnail">
        <img src={getThumbnailUrl(thumbnail)} alt={name} loading="lazy" />
      </div>
      <div className="product-info shadow-sm">
        <p className="fw-500 mb-2">{name}</p>
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <span className="text-20 fw-500">{formatCurrency(price)} USD</span>
          {originalPrice > 0 ? (
            <small className="text-line-through text-muted ps-1">
              {formatCurrency(originalPrice)}
            </small>
          ) : null}
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-1">
            <MdOutlineStar className="star-icon" />
            <small className="fw-700">{rating.toFixed(1)}</small>
            <small className="fw-500 text-muted">({reviewCount} reviews)</small>
          </div>
          <IconButton
            circle
            size="sm"
            className="text-18 heart-icon"
            icon={isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
            onClick={toggleIsFavorite}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
