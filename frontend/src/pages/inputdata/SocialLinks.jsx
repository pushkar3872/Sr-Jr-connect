import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthstore } from "../../store/useAuthstore";
import {
  Link, Save, Linkedin, Github, Code, Instagram
} from "lucide-react";

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
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_.]+\/?$/,
    github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/,
    leetcode: /^https:\/\/(www\.)?leetcode\.com\/(u\/)?[a-zA-Z0-9-_]+\/?$/,
    codechef: /^https:\/\/(www\.)?codechef\.com\/users\/[a-zA-Z0-9-_.]+$/,
    codeforces: /^https:\/\/(www\.)?codeforces\.com\/profile\/[a-zA-Z0-9-_.]+$/,
    instagram: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9-_.]+\/?$/,
  };

  // Platform display info
  const platformInfo = {
    linkedin: {
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
      placeholder: "https://linkedin.com/in/yourusername",
      color: "text-blue-600"
    },
    github: {
      icon: <Github size={18} />,
      label: "GitHub",
      placeholder: "https://github.com/yourusername",
      color: "text-gray-800"
    },
    leetcode: {
      icon: <Code size={18} />,
      label: "LeetCode",
      placeholder: "https://leetcode.com/yourusername",
      color: "text-yellow-600"
    },
    codechef: {
      icon: <Code size={18} />,
      label: "CodeChef",
      placeholder: "https://codechef.com/users/yourusername",
      color: "text-amber-700"
    },
    codeforces: {
      icon: <Code size={18} />,
      label: "Codeforces",
      placeholder: "https://codeforces.com/profile/yourusername",
      color: "text-red-600"
    },
    instagram: {
      icon: <Instagram size={18} />,
      label: "Instagram",
      placeholder: "https://instagram.com/yourusername",
      color: "text-pink-600"
    },
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  // Validate specific link
  const validateLink = (platform, url) => {
    if (!url) return true; // Empty links are valid (optional)
    return patterns[platform].test(url);
  };

  // Save Links to Backend
  const handleSave = async (e) => {
    e.preventDefault();

    // Validate all links
    let isValid = true;
    for (let platform in socialLinks) {
      if (socialLinks[platform] && !validateLink(platform, socialLinks[platform])) {
        toast.error(`Invalid ${platformInfo[platform].label} link format!`);
        isValid = false;
        break;
      }
    }

    if (!isValid) return;

    try {
      update({ PlatformLinks: socialLinks });
      toast.success("Social links saved successfully!");
    } catch (error) {
      console.error("Failed to save social links:", error);
      toast.error("Failed to save social links. Please try again later.");
    }
  };

  return (
    <div className="bg-base-100">
      <div className="bg-primary/10 p-4">
        <h2 className="text-2xl font-bold text-primary flex items-center">
          <Link size={24} className="mr-2" />
          Social Links
        </h2>
      </div>

      <form onSubmit={handleSave} className="p-6 space-y-5">
        {Object.entries(socialLinks).map(([platform, value]) => (
          <div key={platform}>
            <label className=" mb-2 font-medium text-base-content/80 flex items-center">
              <span className={`mr-2 ${platformInfo[platform].color}`}>
                {platformInfo[platform].icon}
              </span>
              {platformInfo[platform].label}
            </label>
            <input
              type="url"
              name={platform}
              className={`input input-bordered w-full ${value && !validateLink(platform, value) ? "input-error" : ""
                }`}
              placeholder={platformInfo[platform].placeholder}
              value={value}
              onChange={handleInputChange}
            />
            {value && !validateLink(platform, value) && (
              <p className="text-error text-sm mt-1">
                Invalid format. Example: {platformInfo[platform].placeholder}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isUpdatingProfile}
          className="w-full btn btn-primary flex items-center justify-center gap-2 mt-4"
        >
          {isUpdatingProfile ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <Save size={18} />
          )}
          Save Social Links
        </button>
      </form>
    </div>
  );
}