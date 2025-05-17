import React, { useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { supabase } from '../utils/SupabaseClient'

export default function Products() {
  const [product, setProduct] = useState(null)
  const fetchProduct = async () => {
        const { data, error } = await supabase
          .from('Products')
          .select('*')
  
        if (!error) {
          setProduct(data)
        } else {
          console.error(error)
        }
  }
  
  useEffect(() => {
    fetchProduct()
  },[])
  return (
    <>
      <Navbar />
      <ProductCard product ={product}
      />
      <Footer />
    </>
  )
}
