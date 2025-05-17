import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/SupabaseClient'
import { Link } from 'react-router-dom'
import Addresses from '../components/Address'
import Dashboard from '../components/Dashboard'
import Orders from '../components/Orders'
import Profile from '../components/Profile'
import Navbar from '../components/Navbar'

const UserPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  if (!user) {
    return (
      <div className='text-center mt-10'>
        Please log in to access your panel.
      </div>
    )
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'orders':
        return <Orders />
      case 'addresses':
        return <Addresses />
      case 'profile':
        return <Profile />
      default:
        return <Dashboard />
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex h-screen overflow-hidden bg-[rgb(251,248,241)]'>
        {/*Left Sidebar */}
        <div className='w-64 bg-[rgb(82,52,26)] text-white p-6 flex flex-col space-y-6 fixed h-full'>
          <h2 className='text-2xl font-bold mb-4'>User Panel</h2>
          <button
            onClick={() => setActiveSection('profile')}
            className='text-left hover:text-yellow-300'
          >
            Profile Settings
          </button>
          <button
            onClick={() => setActiveSection('orders')}
            className='text-left hover:text-yellow-300'
          >
            My Orders
          </button>
          <button
            onClick={() => setActiveSection('addresses')}
            className='text-left hover:text-yellow-300'
          >
            Addresses
          </button>
        </div>

        {/*Content Area */}
        <div className='ml-64 w-full overflow-y-auto p-8'>
          {renderSection()}
        </div>
      </div>
    </>
  )
}

export default UserPanel
