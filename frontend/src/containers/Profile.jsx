import React from 'react'
import { useAuthstore } from '../store/useAuthstore'

export default function Profile() {
  const { authUser } = useAuthstore();
  return (
    <div className="hidden md:block w-full md:w-1/4 bg-base-100 p-6 border-b md:border-r border-base-300 shadow-lg rounded-lg">
      <h3 className="text-xl text-center font-semibold text-primary mb-4">User Profile</h3>
      <div className="flex flex-col items-center mb-6">
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={authUser.profilePicture ||"/avatar.png"} alt="Profile" />
          </div>
        </div>
        <div className="pt-2 mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <h4 className=" text-center font-semibold text-base-content">{authUser.fullName}</h4>
          <p className="text-sm text-center text-base-content">{authUser.biodata}</p>
        </div>
      </div>
      <div className=" text-base-content text-center sm:text-left">
        <p className="text-center mb-2">Joined: January 2022</p>
        <p className='text-center'>Location: San Francisco, CA</p>
      </div>
    </div>
  )
}
