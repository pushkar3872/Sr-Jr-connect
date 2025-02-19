import React, { useState } from 'react';

const Profilepage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [profilePic, setProfilePic] = useState('https://i.imgur.com/4Hbw7hj.png');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [branch, setBranch] = useState('');
  const [bio, setBio] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    leetcode: '',
    codeforces: '',
    linkedin: '',
    codechef: '',
    instagram: '',
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setProfilePic('https://i.imgur.com/4Hbw7hj.png');
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Save changes logic here
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">⚙ Profilepage Profilepage</h1>
      <div className="flex">
        <div className="w-1/4 bg-blue-600 text-white rounded-l-lg p-4">
          <ul className="space-y-4">
            <li
              onClick={() => handleTabClick('general')}
              className={`cursor-pointer p-3 rounded-md ${activeTab === 'general' ? 'bg-blue-500' : ''}`}
            >
              <i className="fas fa-user mr-2"></i> General
            </li>
            <li
              onClick={() => handleTabClick('change-password')}
              className={`cursor-pointer p-3 rounded-md ${activeTab === 'change-password' ? 'bg-blue-500' : ''}`}
            >
              <i className="fas fa-lock mr-2"></i> Change Password
            </li>
            <li
              onClick={() => handleTabClick('bio')}
              className={`cursor-pointer p-3 rounded-md ${activeTab === 'bio' ? 'bg-blue-500' : ''}`}
            >
              <i className="fas fa-pencil-alt mr-2"></i> Bio
            </li>
            <li
              onClick={() => handleTabClick('social-links')}
              className={`cursor-pointer p-3 rounded-md ${activeTab === 'social-links' ? 'bg-blue-500' : ''}`}
            >
              <i className="fas fa-share-alt mr-2"></i> Social Links
            </li>
            <li
              onClick={() => handleTabClick('skills')}
              className={`cursor-pointer p-3 rounded-md ${activeTab === 'skills' ? 'bg-blue-500' : ''}`}
            >
              <i className="fas fa-star mr-2"></i> Skills
            </li>
          </ul>
        </div>

        <div className="w-3/4 p-4">
          <div className={activeTab === 'general' ? 'block' : 'hidden'}>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">General Information</h2>
            <div className="flex gap-8">
              <div className="w-2/3">
                <form onSubmit={handleSaveChanges}>
                  <div className="mb-4">
                    <label className="block font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="full-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium text-gray-700">Graduation Year</label>
                    <select
                      id="graduation-year"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 131 }, (_, index) => 1900 + index).map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium text-gray-700">Branch</label>
                    <select
                      id="branch"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Branch</option>
                      <option value="computer">Computer</option>
                      <option value="it">IT</option>
                      <option value="aids">AIDS</option>
                      <option value="ece">ECE</option>
                      <option value="entc">ENTC</option>
                    </select>
                  </div>
                  <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                    Save Changes
                  </button>
                </form>
              </div>

              <div className="w-1/3 text-center">
                <img
                  id="profile-picture"
                  src={profilePic}
                  alt="Profilepage"
                  className="w-36 h-36 rounded-full object-cover shadow-md mb-4"
                />
                <div className="mb-4">
                  <label htmlFor="upload-photo" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Upload New Photo
                  </label>
                  <input
                    type="file"
                    id="upload-photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <button
                  id="reset-photo"
                  onClick={handleResetPhoto}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                  Reset Photo
                </button>
              </div>
            </div>
          </div>

          {/* Other Sections: Change Password, Bio, Social Links, Skills */}
          {/* Implement other sections similarly... */}
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
