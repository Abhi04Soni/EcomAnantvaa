import React, { useState } from 'react'
import { supabase } from '../utils/SupabaseClient'

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async e => {
    e.preventDefault()
    const { email, password } = form

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName
        }
      }
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email to confirm your account.')
    }
  }

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-900 p-5px">
      <div className=" bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Sign up</h1>
        <form onSubmit={handleSignup} className="space-y-4 bg-yellow-500">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name*"
              className="rounded-md p-[10px]"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name*"
              className="rounded-md p-[10px] pl-[5px]"
              required
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="E-mail*"
            className="border w-full rounded p-[10px]"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Create password*"
            className="border w-full rounded p-[10px]"
            required
            onChange={handleChange}
            minLength={8}
          />
          <p className="text-sm text-gray-600">
            Password must be at least 8 characters long.
          </p>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
          >
            Sign up
          </button>
          {message && <p className="text-sm text-red-600">{message}</p>}
          <p className="text-sm mt-2 text-center">
            Already a member?{' '}
            <a href="/login" className="underline text-blue-600">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  )

}

export default Signup
