import React from 'react'
import Signup from '../src/pages/Signup'
import LoginPage from '../src/pages/Login'
import LandingPage from './pages/LandingPage'
import Story from './pages/Story'
import Cart from './pages/Cart'
import { BrowserRouter, Route , Router, Routes } from 'react-router-dom'
import Products from './pages/Products'

function App() {
  return (
    <div className='w-[99vw]'>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/story" element={<Story />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
