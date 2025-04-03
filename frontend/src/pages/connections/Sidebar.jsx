import React, { useState } from 'react';

export default function Sidebar({ navigationItems = [], activeTab, onTabChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative -top-4 -left-4 z-40">
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden">
        <button
          className="btn btn-circle btn-outline"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`
        ${isMobileMenuOpen ? 'relative top-0 z-50' : 'hidden'}
        md:block
        w-64 bg-base-100 border-r border-base-200 p-4
        flex flex-col h-full
      `}>
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-base-content mb-2">Connections</h2>
          <p className="text-xs text-base-content/70">Manage your network</p>
        </div>

        {/* Dashboard Button */}
        <button
          className={`btn btn-ghost w-full justify-start mb-4 ${
            activeTab === 'welcome' ? 'bg-base-200 text-base-content' : ''
          }`}
          onClick={() => {
            onTabChange('welcome');
            setIsMobileMenuOpen(false);
          }}
        >
          <span className="bg-neutral text-neutral-content w-8 h-8 rounded-full grid place-items-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </span>
          Dashboard
        </button>

        {/* Navigation Links */}
        <nav className="space-y-2 mb-6">
          {navigationItems && navigationItems.map((item) => (
            <button
              key={item.id}
              className={`btn btn-ghost w-full justify-start ${
                activeTab === item.id
                  ? 'bg-base-200 text-base-content'
                  : 'text-base-content/70 hover:bg-base-200'
              }`}
              onClick={() => {
                onTabChange(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <span className={`w-8 h-8 rounded-full grid place-items-center mr-3`}>
                {item.icon}
              </span>
              {item.name}
            </button>
          ))}
        </nav>

        {/* Connection Stats Card */}
        <div className="card bg-base-200 shadow-sm mt-auto">
          <div className="card-body p-4 space-y-3">
            <h3 className="card-title text-sm font-semibold opacity-80">Connection Insights</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-sm font-bold">86</div>
                <div className="text-xs opacity-60">Total</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold">24</div>
                <div className="text-xs opacity-60">Active</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold">12</div>
                <div className="text-xs opacity-60">New</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}