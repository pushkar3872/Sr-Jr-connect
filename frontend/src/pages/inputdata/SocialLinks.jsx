import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthstore } from "../../store/useAuthstore";

export default function SocialLinks() {
  const { authUser, update, isUpdatingProfile } = useAuthstore();
  const [socialLinks, setSocialLinks] = useState({
    linkedin: authUser.PlatformLinks?.linkedin || "",
    github: authUser.PlatformLinks?.github || "",
    leetcode: authUser.PlatformLinks?.leetcode || "",
    codechef: authUser.PlatformLinks?.codechef || "",
    codeforces: authUser.PlatformLinks?.codeforces || "",
    instagram: authUser.PlatformLinks?.instagram || "",
  });

  // Regular Expressions for Validation
  const patterns = {
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_.]+\/$/,
    github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/,
    leetcode: /^https:\/\/(www\.)?leetcode\.com\/(u\/)?[a-zA-Z0-9-_]+\/?$/,
    codechef: /^https:\/\/(www\.)?codechef\.com\/users\/[a-zA-Z0-9-_.]+$/,
    codeforces: /^https:\/\/(www\.)?codeforces\.com\/profile\/[a-zA-Z0-9-_.]+$/,
    instagram: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9-_.]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  // Validate Links
  const validateLinks = () => {
    for (let key in socialLinks) {
      if (socialLinks[key] && !patterns[key].test(socialLinks[key])) {
        toast.error(`Invalid ${key} link!`);
        return false;
      }
    }
    return true;
  };

  // Save Links to Backend
  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateLinks()) return;
    try {
      update({ PlatformLinks: socialLinks });
      toast.success("Social Links saved successfully!");
    } catch (error) {
      console.error("Failed to save social links:", error);
      toast.error("Failed to save social links. Please try again later.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">Enter Your Social Links</h2>

      {/* Input Fields */}
      <div className="space-y-4">
        {Object.entries(socialLinks).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-2 font-medium capitalize">{key}:</label>
            <input
              type={key === "email" ? "email" : "url"}
              name={key}
              className="input input-bordered w-full"
              placeholder={key === "email" ? "example@email.com" : `https://${key}.com/username`}
              value={value}
              onChange={handleInputChange}
            />
          </div>
        )
        )
        }
      </div>

      {/* Save Button */}
      <button onClick={handleSave} disabled={isUpdatingProfile} className="w-full btn btn-primary mt-4">
        Save
      </button>
    </div>
  );
}
