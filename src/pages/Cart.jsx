import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../utils/SupabaseClient'

const Cart = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCart () {
      const {
        data: { user },
        error: userError
        } = await supabase.auth.getUser()
        console.log(user)

      if (userError || !user) {
        setError('Please log in to view your cart.')
        setLoading(false)
        return
      }

      const { data: cartItems, error: cartError } = await supabase
        .from('cart')
        .select(
          `*`
        )
            .eq('userId', user.id)
        console.log(cartItems)

      if (cartError) {
        setError('Failed to load cart.')
      } else {
        setItems(cartItems)
      }
      setLoading(false)
    }

    fetchCart()
  }, [])

  const handleRemove = async id => {
    await supabase.from('cart').delete().eq('id', id)
    setItems(items.filter(item => item.id !== id))
  }

  const total = items.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  )

  if (loading) return <p>Loading cart...</p>
  if (error) return <p className='text-red-500'>{error}</p>

  return (
    <>
      <Navbar />
      <div className='w-full max-w-4xl mx-auto p-4 min-h-[70vh]'>
        <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
        <div className='bg-white shadow rounded-lg p-4'>
          {items.length === 0 ? (
            <p className='text-gray-500'>Your cart is empty.</p>
          ) : (
            <ul className='divide-y divide-gray-200'>
              {items.map(item => (
                <li
                  key={item.id}
                  className='flex justify-between items-center py-4'
                >
                  <img
                    src={item.product?.image_url}
                    alt={item.product?.name}
                    className='w-18 h-18 rounded-xl object-cover'
                  />
                  <div>
                    <h3 className='text-lg font-medium text-gray-900'>
                      {item.product?.name}
                    </h3>
                    <p className='text-sm text-gray-500'>
                      {item.quantity} × ${item.product?.price.toFixed(2)}
                    </p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <p className='text-lg font-semibold text-gray-800'>
                      ${(item.product?.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className='text-red-600 hover:text-red-800'
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {items.length > 0 && (
            <div className='mt-6 text-right'>
              <p className='text-xl font-semibold'>
                Total: ${total.toFixed(2)}
              </p>
              <button
                className='mt-4 px-6 py-3 bg-blue-600 text-white rounded'
                onClick={() => alert('Checkout successful!')}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cart
