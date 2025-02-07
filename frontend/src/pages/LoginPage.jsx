import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
export default function LoginPage() {
  const navigate = useNavigate();

  const handle = () => {
    navigate('/home');
  };

  // State for email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error('All fields are required!');
      return;
    }

    // Example verification (Replace with real API call)
    if (email === 'taklepushkar3872@gmail.com' && password === '123') {
      handle(); // Redirect to home
    } else {
      toast.error('Invalid email or password!');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-8">
        <h2 className="text-3xl font-bold text-primary text-center">Login</h2>

        {/* Error Message */}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-primary font-semibold">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
