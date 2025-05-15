import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Cart = ({ items = [], onRemove }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    function handleCheckout() { 
        // for checkout
        alert('Checkout successful!')
    }


  return (
    <>
      <Navbar />
      <div className='w-full max-w-4xl mx-auto p-4 h-[70vh]'>
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
                  <div>
                    <h3 className='text-lg font-medium text-gray-900'>
                      {item.name}
                    </h3>
                    <p className='text-sm text-gray-500'>
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <p className='text-lg font-semibold text-gray-800'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      variant='destructive'
                      onClick={() => onRemove(item.id)}
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
              <button className='mt-4 px-6 py-3' onClick={handleCheckout}>Checkout</button>
            </div>
          )}
        </div>
          </div>
          <Footer />
    </>
  )
}

export default Cart
