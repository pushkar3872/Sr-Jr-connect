import React from 'react'

export default function Profile() {
  return (

     <div className="w-full md:w-1/4 bg-base-100 p-6 border-b md:border-r border-base-300 shadow-lg">
        <h3 className="text-xl font-semibold text-primary mb-4">User Profile</h3>
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="/avatar.png" alt="Profile" />
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <h4 className="font-semibold text-base-content">John Doe</h4>
            <p className="text-sm text-base-content">john.doe@example.com</p>
          </div>
        </div>
        <div className="text-base-content text-center sm:text-left">
          <p className="mb-2">Joined: January 2022</p>
          <p>Location: San Francisco, CA</p>
        </div>
      </div>
  )
}
