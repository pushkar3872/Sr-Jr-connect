import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TakeData = ({onLogin}) => {


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

    // Handle file input separately (profilePic)
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],  // Only store the first selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
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
    setFormData({
      ...formData,
      skills: selectedSkills,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // This will log the form data

    // Navigate to the home page after submitting
    navigate('/home');
    
    onLogin(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        {/* Profile Picture Input */}
        <div className="mb-6">
          <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Bio Input */}
        <div className="mb-6">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
          ></textarea>
        </div>

        {/* Graduate Year Select */}
        <div className="mb-6">
          <label htmlFor="graduateYear" className="block text-sm font-medium text-gray-700">
            Graduate Year
          </label>
          <select
            name="graduateYear"
            value={formData.graduateYear}
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Year</option>
            {[...Array(10).keys()].map((i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        {/* Skills Select */}
        <div className="mb-6">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Skills
          </label>
          <select
            name="skills"
            multiple
            value={formData.skills}
            onChange={handleSkillChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="CSS">CSS</option>
          </select>
        </div>

        {/* Social Links Input */}
        <div className="mb-6">
          <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700">
            Social Links
          </label>
          <input
            type="text"
            name="socialLinks"
            value={formData.socialLinks}
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Date of Birth Input */}
        <div className="mb-6">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Gender Select */}
        <div className="mb-6">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Phone Number Input */}
        <div className="mb-6">
          <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
            Phone No
          </label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* College Name Input */}
        <div className="mb-6">
          <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
            College Name
          </label>
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Department Select */}
        <div className="mb-6">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Department</option>
            <option value="1">Computer Science</option>
            <option value="2">Mechanical Engineering</option>
            <option value="3">Electrical Engineering</option>
            <option value="4">Civil Engineering</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TakeData;
