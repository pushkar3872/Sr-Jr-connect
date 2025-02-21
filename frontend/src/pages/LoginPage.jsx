import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthstore } from '../store/useAuthstore';
import { Link } from "react-router-dom"
import { Loader2 } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { login, isLoggingIn } = useAuthstore();


  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email Is Required !");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format !");
    if (!formData.password.trim()) return toast.error("Password Is Required !");
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters !");
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() === true) {
      login(formData);
    }
  }
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

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full "
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )
              }
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/register" className=" link-primary hover:underline font-bold">
              register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
