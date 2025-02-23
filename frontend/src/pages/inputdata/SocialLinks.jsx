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
              placeholder={
                key === "email" ? "example@email.com" : `https://${key}.com/username`
              }
              value={value}
              onChange={handleInputChange}
            />
          </div>
        ))}
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
      <button onClick={handleSave} className="w-full btn btn-primary mt-4">
        Save
      </button>
    </div>
  );
}
