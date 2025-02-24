import React, { useEffect, useState } from "react";
import { useAuthstore } from "../../store/useAuthstore";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function ProfilePicture() {
  const { authUser, isUpdatingProfile, update } = useAuthstore();
  const [selectedImg, setSelectedImg] = useState(null);


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
    }
  }



  const handleSave = async () => {
    if (!selectedImg) {
      toast.error("Please upload a profile picture before saving.");
      return;
    }

    try {
      await update({ profilePicture: selectedImg });
    } catch (error) {
      toast.error("Failed to update profile picture.");
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">Profile</h2>

      {/* Profile Picture Display */}
      <div className="flex justify-center mb-4">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-28 rounded-full ring ring-offset-2">
            <img
              src={selectedImg || authUser.profilePicture || "/avatar.png"} alt="Profile"
            // className="size-36 rounded-full object-cover  border-x-2"
            />
          </div>
        </div>
      </div>

      {/* File Input */}
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="selectedImg" className="cursor-pointer btn btn-primary">
          Choose Picture
        </label>
        <input
          id="selectedImg"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="btn btn-success flex items-center"
          disabled={isUpdatingProfile}
        >
          {isUpdatingProfile ? <Loader className="animate-spin mr-2" /> : "Save"}
        </button>
      </div>
    </div>
  );
}
