import React, { useState } from "react";

export default function Skills() {
  const [selectedSkills, setSelectedSkills] = useState([]); // State to store selected skills

  const allSkills = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "Java",
    "C++",
    "SQL",
    "Machine Learning",
  ]; // List of available skills

  const handleSkillChange = (e) => {
    const selectedValue = e.target.value;

    // Avoid duplicates in the selected skills list
    if (selectedValue && !selectedSkills.includes(selectedValue)) {
      setSelectedSkills([...selectedSkills, selectedValue]);
    }
  };

  const removeSkill = (skill) => {
    // Remove a skill from the selected skills list
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    console.log("Saved Skills:", selectedSkills);
    alert("Skills saved successfully!");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Your Skills</h2>

      {/* Dropdown for Selecting Skills */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Choose a Skill:</label>
        <select
          className="w-full border rounded px-3 py-2"
          onChange={handleSkillChange}
          defaultValue=""
        >
          <option value="" disabled>
            Select a skill...
          </option>
          {allSkills.map((skill, index) => (
            <option key={index} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected Skills */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Your Selected Skills:</h3>
        {selectedSkills.length > 0 ? (
          <ul className="list-disc pl-5">
            {selectedSkills.map((skill, index) => (
              <li key={index} className="text-gray-700 flex items-center space-x-2">
                <span>{skill}</span>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => removeSkill(skill)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No skills selected yet.</p>
        )}
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
