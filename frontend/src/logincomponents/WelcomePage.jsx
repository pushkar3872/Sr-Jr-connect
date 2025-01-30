// src/logincomponents/WelcomePage.jsx
import React from 'react'
import {useNavigate} from 'react-router-dom';
export default function WelcomePage() {


    const navigate= useNavigate();

    const handle= ()=>
    {
        navigate('/login');
    }

    const handle1 = () => {
        navigate('/register');
    }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
          Welcome !
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to our  Alumni Portal:
        </p>
        <button onClick={handle} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
          Login
        </button>
        <button onClick={handle1} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
          Register
        </button>
      </div>
    </div>
  )
}
