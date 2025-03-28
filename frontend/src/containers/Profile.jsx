import React, { useState } from 'react';
import { useAuthstore } from '../store/useAuthstore';
import { Github, Linkedin, Mail, MapPin, Calendar, Edit, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formattedDate } from '../lib/utils';
import UserModal from '../components/UserModal';

export default function Profile() {
  const { authUser, update } = useAuthstore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formdata, setFormdata] = useState({
    fullName: authUser?.fullName || "",
    biodata: authUser?.biodata || "",
  });

  // Platform links with labels for better readability
  const platformLinks = [
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: authUser?.PlatformLinks?.linkedin || "#" },
    { name: 'GitHub', icon: <Github size={20} />, url: authUser?.PlatformLinks?.github || "#" },
    {
      name: 'CodeForces',
      icon:
        <svg
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Codeforces icon</title>
          <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
        </svg>,
      url: authUser?.PlatformLinks?.codeforces || "#"
    },
    {
      name: 'LeetCode',
      icon:
        <svg
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>LeetCode icon</title>
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>,
      url: authUser?.PlatformLinks?.leetcode || "#"
    },
    {
      name: 'CodeChef', icon: <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>CodeChef icon</title>
        <path d="M11.007 0c-.787.031-1.515.37-2.222.685a12.27 12.27 0 01-1.864.703c-.635.176-1.3.354-1.814.788-.222.18-.356.439-.529.662-.309.486-.448 1.067-.457 1.638.036.61.216 1.2.376 1.786.368 1.262.807 2.503 1.197 3.759.366 1.161.703 2.344 1.294 3.416.197.394.35.808.535 1.206.027.067.052.158.142.149.136-.012.243-.115.368-.164.828-.414 1.74-.642 2.655-.749.708-.074 1.43-.078 2.131.054.72.163 1.417.426 2.092.724.36.172.719.348 1.088.498.048.04.135.058.16-.016.219-.327.469-.635.667-.976.495-1.061.522-2.279 1.038-3.331.358-.721.892-1.337 1.266-2.048.175-.266.431-.467.588-.747.437-.669.78-1.398 1.05-2.15.102-.293.172-.612.09-.919-.06-.299-.202-.57-.318-.848a2.481 2.481 0 00-.278-.66c-.407-.676-1.07-1.149-1.743-1.536-1.045-.59-2.196-.969-3.351-1.28A20.733 20.733 0 0011.426.01a5.005 5.005 0 00-.42-.01zm-.889.606c-.261.223-.363.569-.468.883-.168.568-.263 1.163-.207 1.756.064 1.062.197 2.12.33 3.175.18 1.352.387 2.7.677 4.034.026.165.064.347.05.51-.115-.175-.182-.383-.258-.58-.25-.765-.432-1.549-.604-2.334a26.008 26.008 0 01-.562-4.317c-.025-.843-.004-1.726.37-2.501.118-.226.259-.46.48-.597a.411.411 0 01.218-.049l-.026.02zM6.516 1.77c.128 0 .139.159.168.252.266.798.422 1.628.679 2.428.174.649.238 1.323.308 1.991.097 1.039.108 2.085.246 3.12.026.199.082.393.119.59.01.067-.059.049-.083.014-.148-.161-.183-.391-.246-.592-.16-.645-.242-1.305-.334-1.962-.174-1.316-.287-2.64-.529-3.945-.158-.612-.356-1.215-.46-1.838.006-.051.093-.048.132-.058zM4.589 3.607c.229.056.365.268.512.434.4.535.54 1.204.695 1.843.283 1.265.446 2.553.725 3.82.131.666.293 1.326.507 1.971.014.051.035.133.038.17-.233-.43-.393-.896-.565-1.353-.598-1.698-.823-3.496-1.3-5.228-.133-.478-.308-.95-.596-1.358-.047-.088-.08-.204-.037-.297.006-.004.014-.003.02-.002zm12.646 13.196c-.136.007-.31.11-.276.267.094.218.334.308.526.416.441.216.938.29 1.358.546.092.06.149.197.064.287-.18.266-.47.44-.723.634-.372.266-.777.51-1.057.879-.066.107-.041.267.082.32.109.079.243.018.338-.051.518-.294.995-.654 1.478-1.002.32-.239.644-.477.926-.76.085-.135-.03-.274-.118-.371-.273-.285-.62-.487-.965-.67a4.959 4.959 0 00-1.458-.495 1.251 1.251 0 00-.175 0zM5.96 16.83c-.527.134-.997.42-1.474.673-.425.243-.854.496-1.205.841a.699.699 0 00-.172.488c.065.108.2.14.301.206.852.442 1.735.822 2.63 1.168.132.042.265.113.406.107.158-.02.309-.204.213-.356-.146-.243-.42-.361-.65-.506-.547-.303-1.154-.512-1.636-.918-.046-.091.094-.128.142-.18.549-.395 1.229-.593 1.713-1.077.089-.09.164-.259.048-.358-.086-.073-.206-.087-.316-.088zm8.115.793c-.43.027-.835.431-.774.876.032.259.089.525.228.749.12.18.33.286.546.287.273.031.59-.059.726-.318.137-.237.212-.514.205-.787-.038-.46-.466-.845-.93-.807zm-4.49.01c-.464.028-.807.505-.77.953.011.444.315.902.765.994.352.06.71-.19.803-.53.125-.35.132-.761-.044-1.095-.157-.25-.478-.327-.754-.322zm.112.653c.241.064.294.47.045.558-.141.034-.239-.12-.234-.244-.008-.127.05-.287.189-.314zm4.437.143c.097 0 .226.071.19.187-.013.171-.215.333-.377.226-.132-.07-.172-.296-.02-.368a.418.418 0 01.207-.045zm-3.518 2.977c-.553.051-1.044.335-1.542.559-.304.156-.662.312-1.005.187-.377-.12-.707-.35-1.059-.52-.075-.013-.061.077-.047.122.081.53.129 1.102.454 1.55.338.437.902.618 1.433.667.797.072 1.642-.118 2.271-.629.309-.262.571-.631.585-1.049-.006-.324-.244-.596-.524-.734a1.085 1.085 0 00-.566-.153zm2.58.008c-.396.052-.815.262-.972.65-.129.358.034.748.272 1.02.426.509 1.07.793 1.718.884.577.078 1.186.014 1.714-.24.438-.225.767-.655.85-1.142.064-.291.081-.59.124-.884-.066-.078-.148.038-.218.052-.337.142-.647.367-1.01.435-.363.024-.687-.172-1.015-.293-.43-.178-.851-.403-1.315-.478a1.21 1.21 0 00-.147-.004z" />
      </svg>, url: authUser?.PlatformLinks?.codechef || "#"
    },
  ];

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update(formdata);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Optionally, you could add error handling here, like showing an error message
    }
  };

  return (
    <div className="w-full hidden lg:block md:w-svh lg:w-1/4 h-[85vh] bg-base-100 rounded-2xl shadow-2xl text-base-content overflow-hidden">
      {/* ... (previous code remains the same) */}
      {/* <div className="hidden w-full lg:block  lg:w-1/4 bg-base-100 p-6  shadow-2xl rounded-2xl h-[85vh] lg:h-[85vh]:"></div> */}
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-2 px-4">
        <h2 className="text-xl font-bold text-primary-content">Profile</h2>
        <p className="text-xs text-primary-content/70">Your personal information</p>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-auto p-4 h-[78vh]" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(156, 163, 175, 0.2) rgba(255, 255, 255, 0.5)' }}>
        {/* Profile Image and Basic Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="avatar">
              <div className="w-28 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2">
                <img src={authUser?.profilePicture || "/avatar.png"} alt="Profile" />
              </div>
            </div>
            <button
              className="btn btn-circle btn-sm btn-primary absolute bottom-0 right-0"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit size={16} />
            </button>
          </div>

          <div className="mt-4 text-center">
            <h4 className="text-xl font-semibold text-base-content">{authUser?.fullName || "User Name"}</h4>
            <p className="text-sm opacity-70">{authUser?.email || "user@example.com"}</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-base-200 p-4 rounded-lg mb-4">
          <h3 className="text-sm font-semibold uppercase opacity-70 mb-2">About</h3>
          <p className="text-sm whitespace-pre-wrap">
            {formdata.biodata || "No bio information available. Edit your profile to add a bio."}
          </p>
        </div>

        {/* Details Section */}
        <div className="space-y-2 mb-2">
          {/* Member Since */}


          {/* Location (if available) */}
          {/* {authUser?.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={18} className="opacity-70" />
              <span>{authUser.location}</span>
            </div>
          )} */}

          {/* Contact (if available) */}
          {authUser?.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail size={18} className="opacity-70" />
              <span>{authUser.email}</span>
            </div>
          )}
        </div>

        {/* Platform Links */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold uppercase opacity-70 mb-3">Connect</h3>
          <div className="grid grid-cols-2 gap-2">
            {platformLinks.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className="btn btn-sm btn-outline gap-2 flex-nowrap overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <span className="flex-shrink-0">{link.icon}</span> */}
                <span className="flex-shrink-0">{link.icon}</span>
                <span className="truncate">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm mb-4">
          <Calendar size={18} className="opacity-70" />
          <span>Member since {formattedDate(authUser?.createdAt ? new Date(authUser.createdAt) : new Date())}</span>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box max-w-md" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsEditModalOpen(false)}
            >
              <X className="size-4" />
            </button>
            <h3 className="font-bold text-lg mb-4">Edit Profile</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="input input-bordered"
                  value={formdata.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  name="biodata"
                  className="textarea textarea-bordered"
                  rows="3"
                  value={formdata.biodata}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}