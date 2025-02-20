import React, { useState } from "react";

export default function ProfilePicture() {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (profilePicture) {
      console.log("Saved Profile Picture:", profilePicture);
      alert("Profile picture saved successfully!");
    } else {
      alert("Please upload a profile picture before saving.");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Profile Picture</h2>

      {/* Profile Picture Display */}
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>
      </div>

      {/* File Input */}
      <div className="flex flex-col items-center mb-4">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Choose Picture
        </label>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
