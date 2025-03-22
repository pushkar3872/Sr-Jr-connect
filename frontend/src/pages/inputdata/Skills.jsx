import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthstore } from "../../store/useAuthstore";
import { Code, PlusCircle, X, Save } from "lucide-react";

export default function Skills() {
  const { authUser, update, isUpdatingProfile } = useAuthstore();
  const [skills, setSkills] = useState(authUser?.skills || []);
  const [newSkill, setNewSkill] = useState("");

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
    "TypeScript",
    "Angular",
    "Vue.js",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Go",
    "Rust",
    "Data Science",
  ];

  const handleSkillChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !skills.includes(selectedValue)) {
      setSkills([...skills, selectedValue]);
      setNewSkill("");
      toast.success(`${selectedValue} added to your skills!`);
    }
  };

  const handleCustomSkillAdd = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      toast.success(`${newSkill.trim()} added to your skills!`);
    } else if (skills.includes(newSkill.trim())) {
      toast.error("This skill is already in your list!");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
    toast.success(`${skillToRemove} removed from your skills!`);
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      update({ skills });
      toast.success("Skills saved successfully!");
    } catch (error) {
      console.error("Failed to save skills:", error);
      toast.error("Failed to save skills. Please try again later.");
    }
  };

  return (
    <div className="bg-base-100">
      <div className="bg-primary/10 p-4">
        <h2 className="text-2xl font-bold text-primary flex items-center">
          <Code size={24} className="mr-2" />
          Professional Skills
        </h2>
      </div>
      
      <form onSubmit={handleSave} className="p-6">
        <div className="mb-5">
          <label className="block mb-2 font-medium text-base-content/80">Select from common skills:</label>
          <select
            className="select select-bordered w-full"
            onChange={handleSkillChange}
            value=""
          >
            <option value="" disabled>
              Choose a skill to add
            </option>
            {allSkills
              .filter(skill => !skills.includes(skill))
              .map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-medium text-base-content/80">Add a custom skill:</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered flex-1"
              placeholder="Enter a skill name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary btn-square"
              onClick={handleCustomSkillAdd}
              disabled={!newSkill.trim()}
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>

        <div className="mb-5">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Code size={18} className="mr-2" />
            Your Skills ({skills.length})
          </h3>
          
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="badge badge-lg h-8 flex items-center gap-1 bg-primary/10 text-primary">
                  {skill}
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle"
                    onClick={() => removeSkill(skill)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-base-200 rounded-lg text-center text-base-content/70">
              No skills selected yet. Add some skills to showcase your expertise!
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isUpdatingProfile || skills.length === 0} 
          className="w-full btn btn-primary flex items-center justify-center gap-2 mt-4"
        >
          {isUpdatingProfile ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <Save size={18} />
          )}
          Save Skills
        </button>
      </form>
    </div>
  );
}