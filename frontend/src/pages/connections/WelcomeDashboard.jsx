// connections/WelcomeDashboard.jsx
import React from 'react';

export default function WelcomeDashboard() {
  // Sample data for the dashboard
  const stats = [
    { category: 'Seniors', count: 32, color: 'bg-blue-500' },
    { category: 'Juniors', count: 19, color: 'bg-green-500' },
    { category: 'Classmates', count: 27, color: 'bg-purple-500' },
    { category: 'Alumni', count: 8, color: 'bg-orange-500' }
  ];

  const recentMessages = [
    { id: 1, name: 'Sarah Chen', category: 'Seniors', time: '2 hours ago', message: 'Thanks for the help with the project!' },
    { id: 2, name: 'James Wilson', category: 'Classmates', time: '5 hours ago', message: 'When is the assignment due?' },
    { id: 3, name: 'Emma Rodriguez', category: 'Juniors', time: 'Yesterday', message: 'Could you mentor me on the database course?' }
  ];

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Connections</h1>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          Total Connections: 86
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.category} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div className={`h-2 ${stat.color}`}></div>
            <div className="p-4">
              <h3 className="text-gray-500 text-sm">{stat.category}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Messages</h2>
        <div className="space-y-4">
          {recentMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {msg.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-800">{msg.name}</h4>
                  <span className="text-xs text-gray-500">({msg.category})</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                <span className="text-xs text-gray-400 mt-1 block">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <button className="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Start Chat
          </button>
          <button className="p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" x2="19" y1="8" y2="14"/>
              <line x1="22" x2="16" y1="11" y2="11"/>
            </svg>
            Add Connection
          </button>
          <button className="p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <line x1="3" x2="21" y1="9" y2="9"/>
              <line x1="9" x2="9" y1="21" y2="9"/>
            </svg>
            View Calendar
          </button>
        </div>
      </div>
    </div>
  );
}