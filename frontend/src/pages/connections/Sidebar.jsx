// components/Sidebar.jsx
import React from 'react';

export default function Sidebar({ navigationItems, activeTab, onTabChange }) {
  return (
    <div className="w-1/4 border-r pr-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Connections</h2>
      
      <button 
        className={`w-full p-3 mb-3 rounded-lg text-left flex items-center gap-2 transition-all ${
          activeTab === 'welcome' 
            ? 'bg-gray-200 text-gray-800 font-medium' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => onTabChange('welcome')}
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </span>
        Dashboard
      </button>
      
      <ul className="space-y-3">
        {navigationItems.map((item) => (
          <li key={item.id} className={`rounded-lg overflow-hidden transition-all`}>
            <button 
              className={`w-full p-3 flex items-center gap-2 text-white cursor-pointer ${
                activeTab === item.id 
                  ? item.color.split(' ')[0] 
                  : item.color
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-30">
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Connection Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Total Connections</span>
            <span className="text-sm font-semibold">86</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Active Today</span>
            <span className="text-sm font-semibold">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">New This Week</span>
            <span className="text-sm font-semibold">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}