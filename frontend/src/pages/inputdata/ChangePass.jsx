import React, { useState } from "react";
import { Lock, CheckCircle, Key, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthstore } from "../../store/useAuthstore";

export default function ChangePass() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [isUpdatingProfile, setIsLoading] = useState(false);

  const { update, isUpdatingProfile } = useAuthstore();

  const handlesubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }
    try {
      const result = await update({
        currentPassword,
        newPassword,
      });
      if (result) {
        toast.success("Password changed successfully");
        // setIsPasswordChanged(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <div className="bg-base-100">
      <div className="bg-primary/10 p-4">
        <h2 className="text-2xl font-bold text-primary flex items-center">
          <Lock size={24} className="mr-2" />
          Change Password
        </h2>
      </div>

      <form onSubmit={handlesubmit} className="p-6 space-y-5">
        <div>
          <label className="block mb-2 font-medium text-base-content/80">Current Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
              <Key size={18} />
            </span>
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="w-full input input-bordered pl-10 pr-10"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-base-content/80">New Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
              <Key size={18} />
            </span>
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full input input-bordered pl-10 pr-10"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-base-content/80">Confirm New Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
              <Key size={18} />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full input input-bordered pl-10 pr-10"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary flex items-center justify-center gap-2"
          disabled={isUpdatingProfile}
        >
          {isUpdatingProfile ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <Lock size={18} />
          )}
          Change Password
        </button>

        {/* {isPasswordChanged && (
          <div className="mt-4 p-3 bg-success/10 rounded-lg flex items-center text-success">
            <CheckCircle className="mr-2" size={20} />
            <span>Your password has been successfully changed!</span>
          </div>
        )} */}
      </form>
      <style jsx="true">
        {
          `input::-ms-reveal,
        input::-ms-clear {
          display: none;
          }

        input::-webkit-credentials-auto-fill-button,
        input::-webkit-clear-button,
        input::-webkit-inner-spin-button,
        input::-webkit-outer-spin-button,
        input::-webkit-calendar-picker-indicator {
          display: none !important;
        -webkit-appearance: none;
        }`
        }

      </style>
    </div>
  );
}