import React, { useEffect, useState } from 'react';
import { data, Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import logo from '../assets/logoAnantvaa.jpg';
import { Contact } from 'lucide-react';
import { supabase } from '../utils/SupabaseClient';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    
    const getUser = async() => {
        const { data: { user }, error } = await supabase.auth.getUser();
      console.log(data, error);
    }
    useEffect(() => {
      getUser();
    }, []);


  return (
      <nav className="bg-[rgb(239,215,167)] shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-indigo-600"><img src={logo} alt="Logo" className='h-16' /></Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-indigo-600">Products</Link>
              <Link to="/categories" className="text-gray-700 hover:text-indigo-600">Category</Link>
              <Link to="/story" className="text-gray-700 hover:text-indigo-600">Story</Link>
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            /> */}
            <Link to="/cart" className="text-gray-700 hover:text-indigo-600 flex items-center">
              <ShoppingCart size={20} />
            </Link>
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/products" className="block text-gray-700 hover:text-indigo-600">Products</Link>
            <Link to="/categories" className="block text-gray-700 hover:text-indigo-600">Category</Link>
            <Link to="/story" className="block text-gray-700 hover:text-indigo-600">Story</Link>
            <input
              type="text"
              placeholder="Search..."
              className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex items-center justify-between mt-2">
              <Link to="/cart" className="text-gray-700 hover:text-indigo-600 flex items-center">
                <ShoppingCart size={20} />
                          </Link>
                          { user ? <Contact size={20}/> : <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </Link>}
             
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
