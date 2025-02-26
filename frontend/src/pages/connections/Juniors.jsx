import React from 'react'

export default function Juniors() {
  return (
    <div className="pl-6 overflow-y-auto h-full">
    <h2 className="text-xl font-bold mb-4">Users</h2>
    <div className="grid grid-cols-3 gap-4">
      {/* Dummy users - Replace with dynamic data */}
      <h3>We are juniors</h3>
      {["User 1", "User 2", "User 3", "User 4", "User 5", "User 6", "User 7", "User 8", "User 9", "User 10", "User 11", "User 12", "User 13", "User 14", "User 15","User 16", "User 17", "User 18", "User 19","User 20"].map((user, index) => (
        <div key={index} className="p-8 bg-gray-200 rounded-lg text-center shadow-md">
          {user}
        </div>
      ))}
    </div>
  </div>
  )
}
