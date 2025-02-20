import React, { useState } from "react";

export default function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    leetcode: "",
    codechef: "",
    codeforces: "",
    instagram: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log("Saved Social Links:", socialLinks);
    alert("Social links saved successfully!");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Enter Your Social Links</h2>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">LinkedIn:</label>
          <input
            type="url"
            name="linkedin"
            className="w-full border rounded px-3 py-2"
            placeholder="https://linkedin.com/in/username"
            value={socialLinks.linkedin}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">LeetCode:</label>
          <input
            type="url"
            name="leetcode"
            className="w-full border rounded px-3 py-2"
            placeholder="https://leetcode.com/username"
            value={socialLinks.leetcode}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">CodeChef:</label>
          <input
            type="url"
            name="codechef"
            className="w-full border rounded px-3 py-2"
            placeholder="https://www.codechef.com/users/username"
            value={socialLinks.codechef}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">CodeForces:</label>
          <input
            type="url"
            name="codeforces"
            className="w-full border rounded px-3 py-2"
            placeholder="https://codeforces.com/profile/username"
            value={socialLinks.codeforces}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Instagram:</label>
          <input
            type="url"
            name="instagram"
            className="w-full border rounded px-3 py-2"
            placeholder="https://instagram.com/username"
            value={socialLinks.instagram}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2"
            placeholder="example@email.com"
            value={socialLinks.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Display the Links */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Your Social Links:</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {Object.entries(socialLinks).map(([key, value]) =>
            value ? (
              <li key={key}>
                <strong className="capitalize">{key}:</strong>{" "}
                <a
                  href={value.includes("http") ? value : `mailto:${value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {value}
                </a>
              </li>
            ) : (
              <li key={key} className="text-gray-500 capitalize">
                {key}: Not provided
              </li>
            )
          )}
        </ul>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
}
