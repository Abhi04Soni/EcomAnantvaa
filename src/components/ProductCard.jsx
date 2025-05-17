import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const { name, imageUrl, originalPrice, salePrice, isSoldOut } = product
  const navigate = useNavigate()
  const quantity = 1
  const size = 'M'
  const handleAddToCart = async (productId, quantity, size) => {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    const userId = userData?.user?.id

    if (!userId) {
      alert('Please log in to add items to your cart.')
      return
    }

    // Check if this product already exists in cart for this user
    const { data: existingItem, error: fetchError } = await supabase
      .from('Cart')
      .select('*')
      .eq('userId', userId)
      .eq('productId', productId)
      .eq('Quantity', quantity)
      .eq('Size', size)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error(fetchError)
      return
    }

    if (existingItem) {
      // If product already in cart with same size, update quantity
      const { error: updateError } = await supabase
        .from('Cart')
        .update({ Quantity: existingItem.quantity + quantity })
        .eq('userId', userId)
        .eq('productId', productId)
        .eq('Size', size)

      if (updateError) {
        console.error(updateError)
      } else {
        alert('Cart updated successfully!')
      }
    } else {
      const { error: insertError } = await supabase.from('Cart').insert([
        {
          userId: userId,
          productId: product.id,
          Quantity: quantity,
          Size: size
        }
      ])

      if (insertError) {
        console.error(insertError)
      } else {
        alert('Added to cart!')
      }
    }
  }


const handleBuyNow = () => {
  navigate(`/product/${product.id}`)
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
    <button
      onClick={handleAddToCart(product.id,quantity,size)}
      className={`w-full py-2 border text-sm rounded-md font-medium mb-2 ${
        isSoldOut
          ? 'border-gray-400 text-gray-400 cursor-not-allowed'
          : 'border-red-900 text-white-900 hover:bg-red-50'
      }`}
      disabled={isSoldOut}
    >
      Add to Cart
    </button>
    <button
      onClick={handleBuyNow}
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
