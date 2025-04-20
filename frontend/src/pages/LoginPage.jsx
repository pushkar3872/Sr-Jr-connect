import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthstore } from '../store/useAuthstore.js';
import { Link } from "react-router-dom";
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { login, isLoggingIn, checkAuth } = useAuthstore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format!");
    if (!formData.password.trim()) return toast.error("Password is required!");
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() === true) {
      login(formData);
    }
  };

  return (
    <div className="min-h-[85vh] bg-base-200 flex flex-col md:flex-row items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-content p-6 text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="opacity-80 mt-2">Sign in to continue to your dashboard</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Mail className="size-4" />
                  Email Address
                </span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Lock className="size-4" />
                  Password
                </span>
                <Link to="/forgot-password" className="label-text-alt link link-hover text-primary">
                  Forgot password?
                </Link>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="divider my-6">OR</div>

          <div className="text-center">
            <p className="mb-4">Don't have an account yet?</p>
            <Link
              to="/register"
              className="btn btn-outline btn-primary w-full"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Info Panel - Only visible on medium screens and up */}
      <div className="hidden md:block w-full max-w-md p-8 text-center">
        <h3 className="text-2xl font-bold text-primary mb-4">Connect With Your Community</h3>
        <p className="mb-6">Join discussions, track your progress, and compete on the leaderboard with friends.</p>
        <div className="flex justify-center gap-4">
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Active Users</div>
            <div className="stat-value text-primary">2.4K</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Daily Posts</div>
            <div className="stat-value text-secondary">400+</div>
          </div>
        </div>
      </div>
    </div>
  );
}