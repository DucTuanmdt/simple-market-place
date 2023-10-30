import React from "react";
import { Placeholder } from "rsuite";

function ProductCardPlaceholder() {
  return (
    <div className="product-card-container place-holder">
      <Placeholder.Graph active />
      <Placeholder.Grid rows={3} columns={2} active />
    </div>
  );
}

export function ProductPlaceholderList({ count = 10 }) {
  const placeholderItems = new Array(count).fill(null);

  return placeholderItems.map((_, index) => (
    <ProductCardPlaceholder key={index} />
  ));
}

export default ProductCardPlaceholder;
