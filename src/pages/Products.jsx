import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

export default function Products () {
  return (
    <>
      <Navbar />
      <ProductCard
        product={{
          name: "Blue halter neck top",
          imageUrl: "/blue-top.jpg", // place this image in `public/`
          originalPrice: 999,
          salePrice: 499,
          isSoldOut: false,
        }}
      />
      <Footer />
    </>
  )
}
