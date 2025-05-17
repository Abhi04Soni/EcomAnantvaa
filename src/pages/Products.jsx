import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import image1 from '../assets/image1.jpg'

export default function Products () {
  return (
    <>
      <Navbar />
      <ProductCard
        product={{
          name: "Blue halter neck top",
          imageUrl: image1,
          originalPrice: 999,
          salePrice: 499,
          isSoldOut: false,
        }}
      />
      <Footer />
    </>
  )
}
