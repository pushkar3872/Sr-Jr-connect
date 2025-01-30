import React from 'react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Section (1/4) - User Profile */}
      <div className="w-1/4 bg-white p-6 border-r border-gray-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">User Profile</h3>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-300 mb-4"></div> {/* Profile image */}
          <div className="ml-4">
            <h4 className="font-semibold text-gray-800">John Doe</h4>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
        <div>
          <p className="text-gray-700 mb-2">Joined: January 2022</p>
          <p className="text-gray-700">Location: San Francisco, CA</p>
        </div>
      </div>

      {/* Middle Section (2/4) - Chat Area */}
      <div className="w-2/4 bg-white p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Chat Area</h3>
        <div className="border-b border-gray-300 mb-6 pb-4">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="bg-blue-100 p-3 rounded-lg max-w-xs">
              <p className="text-sm text-gray-700">Hey! How are you doing?</p>
            </div>
            <div className="text-xs text-gray-400">10:30 AM</div>
          </div>
          <div className="flex justify-between">
            <div className="bg-green-100 p-3 rounded-lg max-w-xs">
              <p className="text-sm text-gray-700">I'm good! Let's catch up soon.</p>
            </div>
            <div className="text-xs text-gray-400">10:35 AM</div>
          </div>
          {/* Add more messages as needed */}
        </div>
      </div>

      {/* Right Section (1/4) - Leaderboard */}
      <div className="w-1/4 bg-white p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Leaderboard</h3>
        <div className="space-y-4">
          {/* Example leaderboard entries */}
          <div className="flex justify-between text-gray-800">
            <span>1. John Doe</span>
            <span>1200 pts</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>2. Jane Smith</span>
            <span>1100 pts</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>3. Bob Johnson</span>
            <span>1000 pts</span>
          </div>
          {/* Add more leaderboard entries as needed */}
        </div>
      </div>
    </div>
  )
}
