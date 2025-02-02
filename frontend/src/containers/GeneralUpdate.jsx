import React from 'react'

export default function GeneralUpdate() {
  return (
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
  )
}
