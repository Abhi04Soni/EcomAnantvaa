import React, { useState, useEffect} from 'react'
import Signup from '../src/pages/Signup'
import LoginPage from '../src/pages/Login'
import LandingPage from './pages/LandingPage'
import Story from './pages/Story'
import Cart from './pages/Cart'
import { Navigate , BrowserRouter, Route , Router, Routes } from 'react-router-dom'
import Products from './pages/Products'
import ViewProduct from './pages/ViewProduct'
import AdminDashboard from './pages/AdminDashboard'
import AddProduct from './pages/AddNewProduct'
import RefundPolicy from './pages/RefundPolicy'
import { supabase } from './utils/SupabaseClient'
import UserPanel from './pages/UserPanel'



function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
      setLoading(false)
    }

    checkUser()
  }, [])

  if (loading) return <div className='text-center py-20'>Loading...</div>

  return authenticated ? children : <Navigate to="/login" replace />
}
function App() {
  return (
    <div className='w-[99vw]'>
      <BrowserRouter>
        <Routes>
            <Route path="/"  element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }/>
            <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/story" element={<Story />} />
          <Route path="/cart" element={  <ProtectedRoute>
                <Cart />
              </ProtectedRoute>} />
          <Route path="/products" element={<Products />} />
          <Route path="/view-product" element={<ViewProduct />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
