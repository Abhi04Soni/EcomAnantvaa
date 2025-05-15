import React from "react";

const ProductCard = ({ product }) => {
  const { name, imageUrl, originalPrice, salePrice, isSoldOut } = product;

  return (
    <div className="relative border rounded-lg p-4 text-center max-w-xs mx-auto shadow-sm">
      {/* Sold Out Badge */}
      {isSoldOut && (
        <div className="absolute top-2 left-2 bg-white border border-red-500 text-red-500 text-sm px-3 py-1 rounded-full font-medium">
          Sold out
        </div>
      )}

      {/* Product Image */}
      <img
        src={imageUrl}
        alt={name}
        className="rounded-md mb-4 object-cover w-full h-80"
      />

      {/* Product Name */}
      <h2 className="text-lg text-red-900 font-medium mb-2">{name} hello</h2>

      {/* Pricing */}
      <div className="mb-4 text-md">
        <span className="line-through text-gray-400 mr-2">
          Rs. {originalPrice.toFixed(2)}
        </span>
        <span className="text-red-600 font-semibold">
          Rs. {salePrice.toFixed(2)}
        </span>
      </div>

      {/* Action Button */}
      <button
        className={`w-full py-2 border text-sm rounded-md font-medium ${
          isSoldOut
            ? "border-gray-400 text-gray-400 cursor-not-allowed"
            : "border-red-900 text-red-900 hover:bg-red-50"
        }`}
        disabled={isSoldOut}
      >
        Choose options
      </button>
    </div>
  );
};

export default ProductCard;
