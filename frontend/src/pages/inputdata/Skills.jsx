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
    <div className="p-6 max-w-md mx-auto bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">Select Your Skills</h2>

      {/* Dropdown for Selecting Skills */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Choose a Skill:</label>
        <select
          className="select select-bordered w-full"
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
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill, index) => (
              <span key={index} className="badge badge-primary gap-2">
                {skill}
                <button
                  className="ml-1 text-red-500 hover:text-red-700"
                  onClick={() => removeSkill(skill)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No skills selected yet.</p>
        )}
      </div>

      {/* Save Button */}
      <button onClick={handleSave} className="w-full btn btn-primary mt-4">
        Save
      </button>
    </div>
  );
}
