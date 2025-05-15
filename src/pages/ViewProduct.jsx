import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import image1 from '../assets/image1.jpg'
import { supabase } from '../utils/SupabaseClient'
  // import { useUser } from '@supabase/auth-helpers-react'


const ViewProduct = () => {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('M')

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']
  const productId = 'Gulnaar Kurti (Classic Floral Pink)'
 

  async function handleAddToCart (event) {
    event.preventDefault()
    addToCart(productId, quantity, size)  
    
  }

  return (
    <>
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto'>
        {/* Product Image */}
        <img
          src={image1}
          alt='Gulnaar Kurti'
          className='rounded-xl shadow-md h-screen'
        />

        {/* Product Details */}
        <div>
          <h1 className='text-3xl font-bold mb-2 text-black'>{productId}</h1>
          <div className='flex items-center gap-4 mb-2'>
            <span className='line-through text-gray-500'>Rs. 1,499.00</span>
            <span className='text-xl font-semibold text-red-600'>
              Rs. 699.00
            </span>
            <span className='text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full'>
              Sale
            </span>
          </div>

          <p className='text-sm text-gray-600 mb-4'>Taxes included.</p>

          {/* Size Options */}
          <div className='mb-4'>
            <p className='mb-2 underline text-sm cursor-pointer'>Size Chart</p>
            <div className='flex gap-2 flex-wrap'>
              {sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-1 border rounded-full ${
                    s === size
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className='flex items-center gap-4 mb-6'>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className='border w-8 h-8 flex items-center justify-center'
            >
              –
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className='border w-8 h-8 flex items-center justify-center'
            >
              +
            </button>
          </div>

          {/* Actions */}
          <div className='flex flex-col gap-4'>
            <button
              className='w-full border border-black py-2 hover:bg-gray-100'
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button className='w-full bg-black text-white py-2 hover:bg-gray-800'>
              Buy it now
            </button>
          </div>

          {/* Description */}
          <p className='mt-6 text-gray-700 text-sm'>
            Radiating vibrancy, the Gulnaar Kurti is a striking blend of
            tradition and boldness. The fiery red base, decorated with oversized
            white floral motifs, makes a statement wherever you go. The bell
            sleeves, trimmed with dainty lace, lend a touch of romance, while
            the breathable cotton fabric keeps you at ease. Perfect for those
            who love to stand out, this kurti pairs beautifully with denim or
            classic white trousers.
          </p>

          {/* Share */}
          <div className='mt-4 text-sm underline text-gray-500 cursor-pointer'>
            Share
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ViewProduct
