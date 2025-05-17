import React, { useState } from 'react'
import { supabase } from '../utils/SupabaseClient'
import { useNavigate } from 'react-router-dom'
import background from '../assets/background.jpg'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    setMessage(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Login successful!')
      navigate('/')
    }
  }

  return (
    <div
      className='flex items-center justify-center w-screen min-h-screen'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className=' bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-black poetsen-one-regular'>
          Log In
        </h1>

        <form onSubmit={handleLogin} className='space-y-4'>
          <input
            type='email'
            placeholder='Email'
            className='w-full p-[10px] border rounded-md  border-gray-700 text-[rgb(82,52,26)]'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type='password'
            placeholder='Password'
            className='w-full p-[10px] border rounded-md border-gray-700 text-[rgb(82,52,26)]'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200'
          >
            Log In
          </button>

          {message && (
            <p className='text-sm text-red-600 text-center'>{message}</p>
          )}

          <p className='text-sm text-center mt-4 text-black'>
            Don't have an account?{' '}
            <a href='/signup' className='text-blue-600 underline'>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
