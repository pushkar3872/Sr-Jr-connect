import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthstore } from "../../store/useAuthstore";

export default function Skills() {
  const { authUser, update, isUpdatingProfile } = useAuthstore();
  const [skills, setskills] = useState(authUser.skills); // State to store selected skills

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
  ];

  const handleSkillChange = (e) => {
    const selectedValue = e.target.value;

    // Avoid duplicates in the selected skills list
    if (selectedValue && !skills.includes(selectedValue)) {
      setskills([...skills, selectedValue]);
    }
  };

  const removeSkill = (e, skill) => {
    e.preventDefault();
    // Remove a skill from the selected skills list
    setskills(skills.filter((s) => s !== skill));
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevent form from refreshing
    console.log("Saved Skills:", skills);
    try {
      update({ skills });
      toast.success("Skills saved successfully!");
    } catch (error) {
      console.error("Failed to save skills:", error);
      toast.error("Failed to save skills. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSave} className="p-6 max-w-md mx-auto bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">Select Your Skills</h2>

      {/* Dropdown for Selecting Skills */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Choose a Skill:</label>
        <select
          className="select select-bordered w-full cursor-pointer cursor-auto"
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
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="badge h-8 badge-ghost">
                {skill}
                <button
                  type="button" // Prevents form submission
                  className="btn h-4 w-2 bg-inherit border-none btn-sm text-sm text-base-content"
                  onClick={(e) => {
                    e.preventDefault(); // Stops unintended form submission
                    const updatedSkills = skills.filter((_, i) => i !== index);
                    setskills(updatedSkills);
                  }}
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
      <button type="submit" disabled={isUpdatingProfile} className="w-full btn btn-primary mt-4">
        Save
      </button>
    </form>
  );
}
