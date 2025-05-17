import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import image1 from '../assets/image1.jpg'

export default function Story () {
  return (
    <>
      <Navbar />
      <img src={image1} className='w-full h-full' alt='' />
      <div>
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12'>
          <div className='max-w-3xl text-center'>
            <h1 className='text-4xl font-bold mb-6 text-gray-900'>
              Anantvaa — The Eternal Grace of Rajasthan
            </h1>
            <p className='text-lg text-gray-700 mb- 8 font-black'>
              Welcome to Anantvaa — a celebration of timeless Rajasthani
              tradition and elegance.
            </p>
            <br></br>
            <p className='text-black'>
              The name Anantvaa (अनंतवा) is inspired by the Sanskrit word
              “Anant”, meaning eternal or infinite. The poetic suffix “vaa” adds
              a graceful, feminine flow. Although written as Anantvaa, it is
              pronounced "Anantv" (अनन्तव) — reflecting the soul of strength,
              heritage, and boundless beauty.
            </p>
            <br></br>
            <p className='text-black'>
              At Anantvaa, we bring you handcrafted pieces that carry the
              essence of desert royalty, vibrant prints, and modern-day comfort.
              Our artisans pour their skill and stories into every thread. This
              isn’t just clothing — it’s a statement of culture, confidence, and
              class. you for being a part of our story.
            </p>
            <button
              className='mt-4 px-6 py-3 text-lg'
              onClick={() => (window.location.href = '/products')}
            >
              Shop Now
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
      <img src={image1} className='w-full h-full' alt='' />
      <Footer />
    </>
  )
}
