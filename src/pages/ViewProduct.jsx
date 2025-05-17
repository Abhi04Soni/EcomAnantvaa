import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../utils/SupabaseClient'
import { useParams } from 'react-router-dom'
import image from '../assets/image1.jpg'

const ViewProduct = () => {
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('M')
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']

  const { id } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('Products')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) {
        setProduct(data)
      } else {
        console.error(error)
      }
    }

    fetchProduct()
  }, [id])

  async function handleAddToCart(event) {
    event.preventDefault()
    // implement your cart logic
    console.log('Added to cart:', { productId: product.id, quantity, size })
  }

  if (!product) return <p className="p-8 text-center">Loading...</p>

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto">
        {/* Product Image */}
        <img
          src={product.image_url || image}
          alt={product.name}
          className="rounded-xl shadow-md object-cover w-full max-h-[90vh]"
        />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-black">{product.name}</h1>
          <div className="flex items-center gap-4 mb-2">
            <span className="line-through text-gray-500">
              Rs. {product.original_price?.toFixed(2)}
            </span>
            <span className="text-xl font-semibold text-red-600">
              Rs. {product.sale_price?.toFixed(2)}
            </span>
            <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
              Sale
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-4">Taxes included.</p>

          {/* Size Options */}
          <div className="mb-4">
            <p className="mb-2 underline text-sm cursor-pointer">Size Chart</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
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
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="border w-8 h-8 flex items-center justify-center"
            >
              –
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="border w-8 h-8 flex items-center justify-center"
            >
              +
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <button
              className="w-full border border-black py-2 hover:bg-gray-100"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button className="w-full bg-black text-white py-2 hover:bg-gray-800">
              Buy it now
            </button>
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-700 text-sm">
            {product.description || 'No description available.'}
          </p>

          {/* Share */}
          <div className="mt-4 text-sm underline text-gray-500 cursor-pointer">
            Share
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ViewProduct
