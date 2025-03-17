import React from 'react'
import { useAuthstore } from '../store/useAuthstore'
import { Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { authUser } = useAuthstore();
  const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(authUser.createdAt));

  return (
    <div className="hidden md:block w-full md:w-1/4 bg-base-100 p-6  shadow-2xl rounded-2xl">
      <h3 className="text-xl text-center font-semibold text-primary mb-4">User Profile</h3>
      <div className="flex flex-col items-center mb-6">
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2">
            <img src={authUser.profilePicture || "/avatar.png"} alt="Profile" />
          </div>
        </div>
        <div className="pt-2 mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <h4 className="text-center font-semibold text-base-content">{authUser.fullName}</h4>
          <p className="text-sm text-center text-base-content">{authUser.biodata}</p>
        </div>
        <div>
          <div className="flex space-x-4 justify-center items-center mt-5">
            <Link to={authUser.PlatformLinks.linkedin} className="btn btn-circle bg-primary text-black hover:bg-base-300 transition duration-300">
              <Linkedin size={24} />
            </Link>

            <Link to={authUser.PlatformLinks.github} className="btn btn-circle bg-primary text-black hover:bg-base-300 transition duration-300">
              <Github size={24} />
            </Link>

            <Link to={authUser.PlatformLinks.codeforces} className="btn btn-circle bg-primary p-2 flex items-center justify-center hover:bg-base-300 transition duration-300">
              <img src="/src/assets/codeforces.svg" alt="codeforces" className="w-6 h-6" />
            </Link>

            <Link to={authUser.PlatformLinks.leetcode} className="btn btn-circle bg-primary p-2 flex items-center justify-center hover:bg-base-300 transition duration-300">
              <img src="/src/assets/leetcode.svg" alt="LeetCode" className="w-6 h-6" />
            </Link>

            <Link to={authUser.PlatformLinks.codechef} className="btn btn-circle bg-primary p-2 flex items-center justify-center hover:bg-base-300 transition duration-300">
              <img src="/src/assets/codechef.svg" alt="CodeChef" className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-base-content text-center sm:text-left">
        <p className="text-center mb-2">{"Member Since :- " + formattedDate}</p>
      </div>
    </div>
  )
}
