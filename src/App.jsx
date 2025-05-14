import React from 'react'
import Signup from '../src/pages/Signup'
import LoginPage from '../src/pages/Login'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Route , Router, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
