import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import image1 from '../assets/image1.jpg'

export default function Story () {
  return (
    <>
      <Navbar />
      <img src={image1} className='w-screen h-full' alt='' />
      <div>
        {' '}
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12'>
          <div className='max-w-3xl text-center'>
            <h1 className='text-4xl font-bold mb-6 text-gray-900'>My Story</h1>
            <p className='text-lg text-gray-700 mb-8'>
              Welcome to our journey! Our store began with a simple idea: to
              bring unique, handcrafted products to people who appreciate
              quality and authenticity. From humble beginnings in a small
              workshop to a growing community of loyal customers, every item we
              offer tells a story of passion, creativity, and dedication. Thank
              you for being a part of our story.
            </p>
            <button
              className='mt-4 px-6 py-3 text-lg'
              onClick={() => (window.location.href = '/shop')}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <img src={image1} className='w-screen h-full' alt='' />
      <Footer />
    </>
  )
}
