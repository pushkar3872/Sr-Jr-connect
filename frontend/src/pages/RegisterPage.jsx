import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthstore } from '../store/useAuthstore.js';
import { Link } from "react-router-dom";
import { Loader2, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, isregistering } = useAuthstore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name Is Required!");
    if (!formData.email.trim()) return toast.error("Email Is Required!");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format!");
    if (!formData.password.trim()) return toast.error("Password Is Required!");
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
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
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-[85vh] bg-base-200 flex flex-col md:flex-row items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-content p-6 text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="opacity-80 mt-2">Join our community today</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <User className="size-4" />
                  Full Name
                </span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>

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
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Enter your password (min. 6 characters)"
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Lock className="size-4" />
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isregistering}
              >
                {isregistering ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="divider my-2">OR</div>

          <div className="text-center">
            <p className="">Already have an account?</p>
            <Link
              to="/login"
              className="link"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Info Panel - Only visible on medium screens and up */}
      <div className="hidden md:block w-full max-w-md p-8 text-center">
        <h3 className="text-2xl font-bold text-primary mb-4">Benefits of Joining</h3>
        <ul className="space-y-4 text-left">
          <li className="flex items-center gap-2">
            <div className="badge badge-primary badge-sm">1</div>
            <span>Connect with other members in the community</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="badge badge-primary badge-sm">2</div>
            <span>Track your progress on the leaderboard</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="badge badge-primary badge-sm">3</div>
            <span>Get exclusive access to community updates</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="badge badge-primary badge-sm">4</div>
            <span>Personalize your profile and share your journey</span>
          </li>
        </ul>
        <div className="mt-8 p-4 bg-base-100 rounded-box shadow-md">
          <p className="text-sm italic">
            "Joining this community was one of the best decisions I've made this year. The connections and support are amazing!"
          </p>
          <p className="text-right text-sm mt-2 font-semibold">— Satisfied Member</p>
        </div>
      </div>
    </div>
  );
}