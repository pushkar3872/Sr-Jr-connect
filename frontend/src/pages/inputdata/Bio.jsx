import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthstore } from "../../store/useAuthstore.js";
import { FileText, Save } from "lucide-react";

const Bio = () => {
  const { authUser, update, isUpdatingProfile } = useAuthstore();

  const [bioData, setBioData] = useState({
    bio: authUser?.biodata || ""
  });

  const handleInputChange = (e) => {
    setBioData({ bio: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bioData.bio.trim()) {
      toast.error("Please provide a bio");
      return;
    }

    try {
      update(bioData);
      toast.success("Bio updated successfully!");
    } catch (error) {
      console.error("Failed to update bio:", error);
      toast.error("Failed to update bio. Please try again.");
    }
  };

  return (
    <div className="bg-base-100">
      <div className="bg-primary/10 p-4">
        <h2 className="text-2xl font-bold text-primary flex items-center">
          <FileText size={24} className="mr-2" />
          About You
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div>
          <label className="block mb-2 font-medium text-base-content/80">
            Bio
          </label>
          <textarea
            name="bio"
            className="w-full textarea textarea-bordered min-h-36"
            placeholder="Share a bit about yourself, your background, interests, and goals..."
            value={bioData.bio}
            onChange={handleInputChange}
            maxLength={500}
            required
          ></textarea>
          <p className="text-xs text-base-content/60 mt-1">
            {bioData.bio.length}/300 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={isUpdatingProfile}
          className="w-full btn btn-primary flex items-center justify-center gap-2 mt-2"
        >
          {isUpdatingProfile ? (
            <>
              <span className="loading loading-spinner"></span>
              <span>Updating...</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>Save Bio</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Bio;