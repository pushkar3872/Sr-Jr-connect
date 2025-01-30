// src/logincomponents/LoginPage.jsx
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'


export default function LoginPage() {


    const navigate = useNavigate();

    const handle = ()=>
    {
        navigate('/home');
    }
  // State for email, password, and error messages
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic form validation (you can enhance this with more complex logic)
    if (!email || !password) {
      setError('Both fields are required!')
      return
    }

    // Example of verifying the login (replace with real API call)
    if (email === 'taklepushkar3872@gmail.com' && password === '123') {
          handle();  //have call like this for the function outside the jsx
    } else {
      setError('Invalid email or password!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        {/* Display error message if any */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
