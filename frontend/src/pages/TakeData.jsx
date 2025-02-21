import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast"

const TakeData = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profilePic: null,
    bio: '',
    graduateYear: '',
    skills: [],
    socialLinks: '',
    dob: '',
    gender: '',
    phoneNo: '',
    collegeName: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSkillChange = (e) => {
    const { options } = e.target;
    const selectedSkills = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSkills.push(options[i].value);
      }
    }
    setFormData({ ...formData, skills: selectedSkills });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/home');
    onLogin(true);
  };

  return (
    <div className="pt-16 max-w-3xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="label">Profile Picture</label>
          <input type="file" name="profilePic" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full" />
        </div>

        <div className="mb-4">
          <label className="label">Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} className="textarea textarea-bordered w-full" rows="3"></textarea>
        </div>

        <div className="mb-4">
          <label className="label">Graduate Year</label>
          <select name="graduateYear" value={formData.graduateYear} onChange={handleChange} className="select select-bordered w-full">
            <option value="">Select Year</option>
            {[...Array(10).keys()].map((i) => (
              <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="label">Skills</label>
          <select name="skills" multiple value={formData.skills} onChange={handleSkillChange} className="select select-bordered w-full">
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="CSS">CSS</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="label">Linkedin</label>
          <input type="text" name="socialLinks" value={formData.socialLinks} onChange={handleChange} className="input input-bordered w-full" />
        </div>
        <div className="mb-4">
          <label className="label">Github</label>
          <input type="text" name="socialLinks" value={formData.socialLinks} onChange={handleChange} className="input input-bordered w-full" />
        </div>
        <div className="mb-4">
          <label className="label">Leetcode</label>
          <input type="text" name="socialLinks" value={formData.socialLinks} onChange={handleChange} className="input input-bordered w-full" />
        </div>
        <div className="mb-4">
          <label className="label">Codeforces</label>
          <input type="text" name="socialLinks" value={formData.socialLinks} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="mb-4">
          <label className="label">Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="mb-4">
          <label className="label">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="select select-bordered w-full">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4 flex flex-col">
          <label className="label">Phone No</label>
          <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none"><path d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z" fill="currentColor"></path></g></svg>
            <input type="tel" className="tabular-nums" required placeholder="Phone" pattern="[0-9]*" minlength="10" maxlength="10" title="Must be 10 digits" />
          </label>
          <p className="validator-hint">Must be 10 digits</p>
        </div>

        <div className="mb-4">
          <label className="label">College Name</label>
          <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="mb-4">
          <label className="label">Department</label>
          <select name="department" value={formData.department} onChange={handleChange} className="select select-bordered w-full">
            <option value="">Select Department</option>
            <option value="1">Computer Science</option>
            <option value="2">Mechanical Engineering</option>
            <option value="3">Electrical Engineering</option>
            <option value="4">Civil Engineering</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary w-full">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TakeData;