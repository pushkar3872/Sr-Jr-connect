import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthstore } from '../store/useAuthstore';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, isregistering } = useAuthstore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name Is Required !");
    if (!formData.email.trim()) return toast.error("Email Is Required !");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format !");
    if (!formData.password.trim()) return toast.error("Password Is Required !");
    if (formData.password != formData.confirmPassword) {
      toast.error("password does not match")
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters !");
    }
    return true;
  };

  // Use navigate hook outside of handleSubmit
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      register(formData);
      // toast.success('Registration successful!');
    }
    navigate('/');
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
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="input input-bordered w-full"
              placeholder="Confirm your password"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isregistering}
            >
              {isregistering ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )
              }
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
