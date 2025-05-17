import React from 'react'
import { useNavigate,useParams } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, imageUrl, originalPrice, salePrice, isSoldOut } = product
  const navigate = useNavigate();
  


  const handleAddToCart = () => {
  
  }

  
  const handleBuyNow = () => {
    navigate(`/product/${product.id}`);
  }

  return (
    <div className='relative border rounded-lg p-4 text-center max-w-xs mx-auto shadow-sm'>
      {/* Sold Out Badge */}
      {isSoldOut && (
        <div className='absolute top-2 left-2 bg-white border border-red-500 text-red-500 text-sm px-3 py-1 rounded-full font-medium'>
          Sold out
        </div>
      )}

      {/* Product Image */}
      <img
        src={imageUrl}
        alt={name}
        className='rounded-md mb-4 object-cover w-full h-80'
      />

      {/* Product Name */}
      <h2 className='text-lg text-red-900 font-medium mb-2'>{name}</h2>

      {/* Pricing */}
      <div className='mb-4 text-md'>
        <span className='line-through text-gray-400 mr-2'>
          Rs.{' '}
          {typeof originalPrice === 'number' ? originalPrice.toFixed(2) : 'N/A'}
        </span>
        <span className='text-red-600 font-semibold'>
          Rs. {typeof salePrice === 'number' ? salePrice.toFixed(2) : 'N/A'}
        </span>
      </div>

      {/* Action Button */}
      <button onClick={handleAddToCart}
        className={`w-full py-2 border text-sm rounded-md font-medium mb-2 ${
          isSoldOut
            ? 'border-gray-400 text-gray-400 cursor-not-allowed'
            : 'border-red-900 text-white-900 hover:bg-red-50'
        }`}
        disabled={isSoldOut}
      >
        Add to Cart
      </button>
      <button onClick={handleBuyNow}
        className={`w-full py-2 border text-sm rounded-md font-medium ${
          isSoldOut
            ? 'border-gray-400 text-gray-400 cursor-not-allowed'
            : 'border-red-900 text-white-900 hover:bg-red-50'
        }`}
        disabled={isSoldOut}
      >
        Choose Option
      </button>
    </div>
  )
}

export default ProductCard
