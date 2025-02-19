import React from 'react'
import Messageinput from '../components/Messageinput';

export default function GeneralUpdate() {
  return (
    <div className="w-full md:w-2/4 bg-base-100 p-6 shadow-lg rounded-lg flex flex-col justify-between h-[86vh] md:h-auto" style={{ scrollBehavior: 'smooth', scrollbarWidth: 'thin' }}>
      {/* <h3 className="text-xl font-semibold text-primary mb-4">Chat Area</h3> */}
      <div className="border-b border-base-300 mb-6 pb-4">
        <input
          type="text"
          placeholder="Search messages..."
          className="input input-bordered w-full"
        />
      </div>
      <div className="flex-1 overflow-auto space-y-4" style={{ scrollbarWidth: 'thin', scrollBehavior: 'smooth' }}>
        {/* Chat Messages */}
        {[
          { name: "Alice", time: "10:30 AM", message: "Hey! How are you doing?", type: "start" },
          { name: "You", time: "10:35 AM", message: "I'm good! Let's catch up soon.", type: "end" },
          { name: "Alice", time: "10:37 AM", message: "Sounds great! See you soon.", type: "start" }
        ].map((chat, index) => (
          <div key={index} className={`chat ${chat.type === 'start' ? 'chat-start' : 'chat-end'}`}>
            {/* avatar */}
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/avatar.png" alt={chat.name} />
              </div>
            </div>
            {/* chat header */}
            <div className="chat-header">
              {chat.name} <time className="text-xs opacity-50">{chat.time}</time>
            </div>
            {/* chat message */}
            <div className={`chat-bubble ${chat.type === 'start' ? 'bg-primary text-primary-content' : 'bg-secondary text-secondary-content'}`}>
              {chat.message}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <Messageinput />
      </div>
    </div>
  );
}
