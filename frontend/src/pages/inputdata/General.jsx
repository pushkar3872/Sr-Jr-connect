import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthstore } from "../../store/useAuthstore.js";
import { Loader, Save, GraduationCap, BookOpen, Building, Code, BarChart } from 'lucide-react';

const General = () => {
  const { authUser, update, isUpdatingProfile } = useAuthstore();

  const [formdata, setFormData] = useState({
    graduationYear: authUser?.graduationYear || "",
    branch: authUser.academicDetails?.Department || "", // Keep using Department from authUser
    college: authUser.academicDetails?.college || "",
    gpa: authUser.academicDetails?.gpa || "",
    domain: authUser.academicDetails?.domain || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formdata.graduationYear === "" || formdata.branch === "" || formdata.college === "") {
      toast.error("Please fill all required fields");
      return;
    } else {
      update(formdata);
      toast.success("Academic information updated successfully!");
    }
  };

  return (
    <div className="bg-base-100">
      <div className="bg-primary/10 p-4">
        <h2 className="text-2xl font-bold text-primary flex items-center">
          <BookOpen size={24} className="mr-2" />
          Academic Information
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div>
          <label className="block mb-2 font-medium text-base-content/80">College <span className="text-error">*</span></label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
              <Building size={18} />
            </span>
            <input
              type="text"
              value={formdata?.college || ""}
              onChange={(e) => setFormData({ ...formdata, college: e.target.value })}
              className="w-full input input-bordered pl-10"
              placeholder="Enter your college name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-base-content/80">Branch <span className="text-error">*</span></label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
              <BookOpen size={18} />
            </span>
            <select
              value={formdata.branch}
              onChange={(e) => setFormData({ ...formdata, branch: e.target.value })}
              className="w-full select select-bordered pl-10"
              required
            >
              <option value="" disabled>Select your branch</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-base-content/80">Graduation Year <span className="text-error">*</span></label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
              <GraduationCap size={18} />
            </span>
            <select
              value={formdata?.graduationYear || ""}
              onChange={(e) => setFormData({ ...formdata, graduationYear: e.target.value })}
              className="w-full select select-bordered pl-10"
              required
            >
              <option value="" disabled>Select your graduation year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-base-content/80">GPA</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
              <BarChart size={18} />
            </span>
            <input
              type="number"
              value={formdata?.gpa || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value) || value >= 0 && value <= 10) {
                  setFormData({ ...formdata, gpa: e.target.value });
                }
              }}
              className="w-full input input-bordered pl-10"
              placeholder="Enter your GPA (0-10)"
              step="0.01"
              min="0"
              max="10"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-base-content/80">Domain of Interest</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
              <Code size={18} />
            </span>
            <select
              value={formdata?.domain || ""}
              onChange={(e) => setFormData({ ...formdata, domain: e.target.value })}
              className="w-full select select-bordered pl-10"
            >
              <option value="" disabled>Select your domain of interest</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Data Science">Data Science</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="DevOps">DevOps</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Game Development">Game Development</option>
              <option value="IoT">Internet of Things (IoT)</option>
              <option value="Robotics">Robotics</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdatingProfile}
          className="w-full btn btn-primary flex items-center justify-center gap-2 mt-2"
        >
          {isUpdatingProfile ? (
            <>
              <Loader className="animate-spin" size={20} />
              <span>Updating...</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>Save Information</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default General;