import React, { useState, useRef } from "react";
import { useAuthstore } from "../../store/useAuthstore";
import toast from "react-hot-toast";
import { Loader, Upload, Camera, X, Check } from "lucide-react";

export default function ProfilePicture() {
  const { authUser, isUpdatingProfile, update } = useAuthstore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, GIF, WEBP)");
      toast.error("Invalid file type. Please upload an image.");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB");
      toast.error("File too large. Maximum size is 2MB.");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      setSelectedImg(reader.result);
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      setError("Failed to read file");
      toast.error("Failed to process image.");
      setIsLoading(false);
    };
  };

  const handleReset = () => {
    setSelectedImg(null);
    setError(null);
    // Reset the file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!selectedImg) {
      toast.error("Please upload a profile picture before saving.");
      return;
    }

    try {
      await update({ profilePicture: selectedImg });
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile picture.");
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary flex items-center justify-center">
        <Camera size={24} className="mr-2" />
        Profile Picture
      </h2>

      {/* Profile Picture Display */}
      <div className="flex justify-center mb-4 relative">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-32 h-32 rounded-full ring ring-offset-2 relative overflow-hidden">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-base-300">
                <Loader className="animate-spin text-primary" size={28} />
              </div>
            ) : (
              <img
                src={selectedImg || authUser?.profilePicture || "/avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        
        {/* Reset button that appears when an image is selected */}
        {selectedImg && !isLoading && (
          <button
            onClick={handleReset}
            className="absolute top-0 right-0 bg-error text-white rounded-full p-1 shadow-md hover:bg-error/80 transition-colors cursor-pointer"
            title="Remove selected image"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="text-error text-sm text-center mb-4">
          {error}
        </div>
      )}

      {/* Image controls */}
      <div className="flex flex-col gap-4">
        {/* File Input */}
        <div className="flex flex-col items-center">
          <label 
            htmlFor="profileImage" 
            className="cursor-pointer btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <Upload size={18} />
            {selectedImg ? "Change Picture" : "Choose Picture"}
          </label>
          <input
            id="profileImage"
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/png, image/gif, image/webp"
            className="hidden"
            onChange={handleImageUpload}
          />
          <p className="text-xs text-base-content/60 mt-1">
            Recommended: Square image, max 2MB
          </p>
        </div>

        {/* Save Button - Only show when an image is selected */}
        {selectedImg && (
          <button
            onClick={handleSave}
            className="btn btn-success flex items-center justify-center gap-2 w-full"
            disabled={isUpdatingProfile || isLoading}
          >
            {isUpdatingProfile ? (
              <>
                <Loader className="animate-spin" size={18} />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check size={18} />
                <span>Save</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}