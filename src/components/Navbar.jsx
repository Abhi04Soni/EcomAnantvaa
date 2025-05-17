import React, { useEffect, useState, useRef } from 'react'
import { data, Link } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import logo from '../assets/logoAnantvaa.jpg'
import { Contact } from 'lucide-react'
import { supabase } from '../utils/SupabaseClient'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const dropdownRef = useRef()
  const toggleMenu = () => setIsOpen(!isOpen)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const getUser = async () => {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()
    if (!error) {
      console.log(user)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <nav className='bg-[rgb(239,215,167)] shadow-md sticky top-0 z-50 w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-8'>
            <Link to='/' className='text-2xl font-bold text-indigo-600'>
              <img src={logo} alt='Logo' className='h-16' />
            </Link>
            <div className='hidden md:flex space-x-6'>
              <Link to='/' className='text-gray-700 hover:text-indigo-600'>
                Home
              </Link>
              <Link
                to='/products'
                className='text-gray-700 hover:text-indigo-600'
              >
                Products
              </Link>
              {/* <Link
                to='/categories'
                className='text-gray-700 hover:text-indigo-600'
              >
                Category
              </Link> */}
              <Link to='/story' className='text-gray-700 hover:text-indigo-600'>
                Story
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className='hidden md:flex items-center space-x-6'>
            {/* <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            /> */}
            <Link
              to='/cart'
              className='text-gray-700 hover:text-indigo-600 flex items-center'
            >
              <ShoppingCart size={20} />
            </Link>
            <div className='relative inline-block text-left' ref={dropdownRef}>
              {/* Contact icon as dropdown trigger */}
              <div
                className='cursor-pointer p-2 rounded-full hover:bg-gray-200'
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Contact size={24} className='text-gray-800' />
              </div>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-40 border border-gray-200 rounded-md shadow-lg z-50 bg-[rgb(82,52,26)]'>
                  <Link
                    to='/user-panel'
                    className='block px-4 py-2 text-sm  hover:bg-gray-100 text-white  hover:text-gray-700'
                  >
                    User Panel
                  </Link>
                  <div
                    onClick={handleLogout}
                    
                    className='w-full text-left cursor-pointer block px-4 py-2 text-sm text-white  hover:text-gray-700 hover:bg-gray-100'
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='text-gray-700 focus:outline-none'
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='md:hidden px-4 pb-4'>
          <div className='space-y-2'>
            <Link to='/' className='block text-gray-700 hover:text-indigo-600'>
              Home
            </Link>
            <Link
              to='/products'
              className='block text-gray-700 hover:text-indigo-600'
            >
              Products
            </Link>
            <Link
              to='/categories'
              className='block text-gray-700 hover:text-indigo-600'
            >
              Category
            </Link>
            <Link
              to='/story'
              className='block text-gray-700 hover:text-indigo-600'
            >
              Story
            </Link>
            <input
              type='text'
              placeholder='Search...'
              className='mt-2 w-full border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            <div className='flex items-center justify-between mt-2'>
              <Link
                to='/cart'
                className='text-gray-700 hover:text-indigo-600 flex items-center'
              >
                <ShoppingCart size={20} />
              </Link>
              <div
                className='relative inline-block text-left'
                ref={dropdownRef}
              >
                {/* Contact icon as dropdown trigger */}
                <div
                  className='cursor-pointer p-2 rounded-full hover:bg-gray-200'
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Contact size={24} className='text-gray-800' />
                </div>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50'>
                    <Link
                      to='/user-panel'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      User Panel
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
