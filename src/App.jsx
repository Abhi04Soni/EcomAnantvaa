import React from 'react'
import Signup from '../src/pages/Signup'
import LoginPage from '../src/pages/Login'
import LandingPage from './pages/LandingPage'
import Story from './pages/Story'
import { BrowserRouter, Route , Router, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='w-[99vw]'>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/story" element={<Story />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
