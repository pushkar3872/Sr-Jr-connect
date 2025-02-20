import React, { useState } from 'react';

export default function Bio() {
  const [bio, setBio] = useState(""); // State to store the user's bio
  const [savedBio, setSavedBio] = useState(""); // State to store the saved bio
  const [isSaved, setIsSaved] = useState(false); // State to track if the bio is saved

  const handleInputChange = (e) => {
    setBio(e.target.value); // Update state as the user types
    setIsSaved(false); // Reset saved status when the bio is being edited
  };

  const handleSave = () => {
    setSavedBio(bio); // Save the bio
    setIsSaved(true); // Indicate that the bio is saved
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tell us about yourself</h2>

      {/* Input Container */}
      <textarea
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Write your bio here..."
        value={bio}
        onChange={handleInputChange}
        rows="5"
        required
      ></textarea>

      {/* Save Button */}
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={handleSave}
      >
        Save
      </button>

      {/* Display the Saved Bio */}
      <div className="mt-4 p-4 bg-gray-50 border rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2">Your Saved Bio:</h3>
        <p className="text-gray-700">{savedBio || "Your saved bio will appear here..."}</p>
      </div>

      {/* Confirmation Message */}
      {isSaved && (
        <p className="mt-2 text-green-500 font-medium">
          Your bio has been successfully saved!
        </p>
      )}
    </div>
  );
}
