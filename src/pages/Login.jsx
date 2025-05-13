import React, { useState } from 'react'
import { supabase } from '../utils/SupabaseClient'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Signup successful! Check your email to confirm your account.')
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  )
}

export default Signup
