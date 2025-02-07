import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  // State for form fields and error messages
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error('All fields are required!');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    // Example: Replace this with an actual API call for registration
    toast.success('Registration successful!');

    // Clear the form
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-8">
        <h2 className="text-3xl font-bold text-primary text-center">Register</h2>

        {/* Error Message */}
        {/* {error && <div className="alert alert-error mt-4">{error}</div>} */}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Full Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div className="form-control mt-4">
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

          {/* Confirm Password Field */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Confirm your password"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-primary font-semibold">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
