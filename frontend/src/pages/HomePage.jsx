import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col md:flex-row">
      {/* Left Section (User Profile) */}
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

      {/* Middle Section (Chat Area) */}
      <div className="w-full md:w-2/4 bg-base-100 p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-primary mb-4">Chat Area</h3>
        <div className="border-b border-base-300 mb-6 pb-4">
          <input
            type="text"
            placeholder="Search messages..."
            className="input input-bordered w-full"
          />
        </div>
        <div className="space-y-4">
          {/* Received Message (Chat Start) */}
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/avatar.png" alt="Alice" />
              </div>
            </div>
            <div className="chat-header">
              Alice <time className="text-xs opacity-50">10:30 AM</time>
            </div>
            <div className="chat-bubble bg-primary text-primary-content">Hey! How are you doing?</div>
          </div>

          {/* Sent Message (Chat End) */}
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/avatar.png" alt="You" />
              </div>
            </div>
            <div className="chat-header">
              You <time className="text-xs opacity-50">10:35 AM</time>
            </div>
            <div className="chat-bubble bg-secondary text-secondary-content">I'm good! Let's catch up soon.</div>
          </div>

          {/* Another Received Message (Chat Start) */}
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/avatar.png" alt="Alice" />
              </div>
            </div>
            <div className="chat-header">
              Alice <time className="text-xs opacity-50">10:37 AM</time>
            </div>
            <div className="chat-bubble bg-primary text-primary-content">Sounds great! See you soon.</div>
          </div>
        </div>
      </div>

      {/* Right Section (Leaderboard) */}
      <div className="w-full md:w-1/4 bg-base-100 p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-primary mb-4">Leaderboard</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-base-content">
            <span>1. John Doe</span>
            <span className="badge badge-primary">1200 pts</span>
          </div>
          <div className="flex justify-between text-base-content">
            <span>2. Jane Smith</span>
            <span className="badge badge-secondary">1100 pts</span>
          </div>
          <div className="flex justify-between text-base-content">
            <span>3. Bob Johnson</span>
            <span className="badge badge-accent">1000 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
