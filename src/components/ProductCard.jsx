import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const { name, image_url, original_price, sale_price, is_sold_out } = product
  const navigate = useNavigate();
  const handleAddToCart = () => {
  
  }

const handleBuyNow = () => {
  navigate(`/product/${product.id}`)
}
  
  return (
    <div className='relative border rounded-lg p-4 text-center max-w-xs mx-auto shadow-sm'>
      {/* Sold Out Badge */}
      {is_sold_out && (
        <div className='absolute top-2 left-2 bg-white border border-red-500 text-red-500 text-sm px-3 py-1 rounded-full font-medium'>
          Sold out
        </div>
      )}

    {/* Product Image */}
    <img
      src={image_url}
      alt={name}
      className='rounded-md mb-4 object-cover w-full h-80'
    />
      {/* Product Image */}
      <img
        src={JSON.parse(image_url)[0]}
        alt={name}
        className='rounded-md mb-4 object-cover w-full h-80'
      />

    {/* Product Name */}
    <h2 className='text-lg text-red-900 font-medium mb-2'>{name}</h2>

      {/* Pricing */}
      <div className='mb-4 text-md'>
        <span className='line-through text-gray-400 mr-2'>
          Rs.{' '}
          {typeof original_price === 'number' ? original_price.toFixed(2) : 'N/A'}
        </span>
        <span className='text-red-600 font-semibold'>
          Rs. {typeof sale_price === 'number' ? sale_price.toFixed(2) : 'N/A'}
        </span>
      </div>

      {/* Action Button */}
      <button onClick={handleAddToCart}
        className={`w-full py-2 border text-sm rounded-md font-medium mb-2 ${
          is_sold_out
            ? 'border-gray-400 text-gray-400 cursor-not-allowed'
            : 'border-red-900 text-white-900 hover:bg-red-50'
        }`}
        disabled={is_sold_out}
      >
        Add to Cart
      </button>
      <button onClick={handleBuyNow}
        className={`w-full py-2 border text-sm rounded-md font-medium ${
          is_sold_out
            ? 'border-gray-400 text-gray-400 cursor-not-allowed'
            : 'border-red-900 text-white-900 hover:bg-red-50'
        }`}
        disabled={is_sold_out}
      >
        Choose Option
      </button>
    </div>
  )
}

export default ProductCard
