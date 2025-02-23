import React, { useState } from "react";
import { useAuthstore } from "../../store/useAuthstore";

export default function ProfilePicture() {
  const { authUser, update, isUpdatingProfile } = useAuthstore();
  const [profilePicture, setProfilePicture] = useState(authUser.profilePicture || null);

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
    <div className="p-4 max-w-sm mx-auto bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">Upload Profile Picture</h2>

      {/* Profile Picture Display */}
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 rounded-full bg-base-300 flex items-center justify-center overflow-hidden">
          {profilePicture ? (
            <img src={profilePicture} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-neutral-content">No Image</span>
          )}
        </div>
      </div>

      {/* File Input */}
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="profilePicture" className="cursor-pointer btn btn-secondary">
          Choose Picture
        </label>
        <input id="profilePicture" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button onClick={handleSave} className="btn btn-success">
          Save
        </button>
      </div>
    </div>
  );
}
