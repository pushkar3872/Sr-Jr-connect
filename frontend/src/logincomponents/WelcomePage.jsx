import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg shadow-xl bg-base-100 p-8 text-center">
        <h2 className="text-4xl font-bold text-primary">Welcome!</h2>
        <p className="text-lg text-gray-600 mt-4">Welcome to our Alumni Portal:</p>

        <div className="mt-6 space-x-4">
          <button onClick={() => navigate('/login')} className="btn btn-primary">
            Login
          </button>
          <button onClick={() => navigate('/register')} className="btn btn-secondary">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
