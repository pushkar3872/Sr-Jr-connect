import React, { useState } from 'react';

export default function ChangePass() {
  const [currentPassword, setCurrentPassword] = useState(""); // State for current password
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [isPasswordChanged, setIsPasswordChanged] = useState(false); // State to track password change status

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value); // Update current password
    setIsPasswordChanged(false); // Reset status if input is modified
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value); // Update new password
    setIsPasswordChanged(false); // Reset status if input is modified
  };

  const handleChangePassword = () => {
    if (currentPassword && newPassword) {
      setIsPasswordChanged(true); // Indicate that the password is changed
      setCurrentPassword(""); // Clear inputs after action
      setNewPassword("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Change Your Password</h2>
      
      {/* Current Password Input */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Current Password:</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="Enter your current password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          required
        />
      </div>
      
      {/* New Password Input */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">New Password:</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
        />
      </div>
      
      {/* Change Password Button */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={handleChangePassword}
      >
        Change Password
      </button>

      {/* Success Message */}
      {isPasswordChanged && (
        <p className="mt-4 text-green-500 font-medium">
          Your password has been successfully changed!
        </p>
      )}
    </div>
  );
}
