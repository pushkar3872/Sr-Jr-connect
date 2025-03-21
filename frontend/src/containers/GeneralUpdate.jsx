import React, { useEffect, useState } from 'react'
import Messageinput from '../components/Messageinput';
import { useChatstore } from '../store/useChatstore';
import { useAuthstore } from '../store/useAuthstore';
import formatMessageTime from '../lib/utils';
import { CircleX, X } from 'lucide-react';

export default function GeneralUpdate() {
  const { messages, isMessagesLoading, getchatmessages, sendchatmessage } = useChatstore();
  const { authUser } = useAuthstore();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getchatmessages();
  }, []);

  // Function to open image in modal
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Function to close the modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="overflow-auto w-full md:w-svh lg:w-2/4 bg-base-100 p-6 shadow-2xl rounded-2xl flex flex-col justify-between h-[86vh] lg:h-[90vh]" style={{ scrollBehavior: 'smooth', scrollbarWidth: 'thin' }}>
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
          {isMessagesLoading ?
            <p>Loading...</p> :
            (messages.map((chat, index) => (
              <div key={chat._id}
                className={`chat ${chat.senderId === authUser._id ? 'chat-end' : 'chat-start'}`
                }>
                {/* avatar */}
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src="/avatar.png" alt={chat.name} />
                  </div>
                </div>
                {/* chat header */}
                <div className="chat-header">
                  {chat.name}
                  <time className="text-xs opacity-50">{formatMessageTime(chat.createdAt)}</time>
                </div>
                {/* chat message */}
                <div className={`chat-bubble ${chat.senderId === authUser._id ? 'bg-secondary text-primary-content' : 'bg-primary text-secondary-content'}`}>
                  {chat.image && (
                    <img
                      src={chat.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openImageModal(chat.image)}
                    />
                  )}
                  {chat.text && (
                    <p>{chat.text}</p>
                  )}
                </div>
              </div>
            )))
          }
        </div>
        <div className="mt-auto">
          <Messageinput />
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <div className="relative max-w-3xl max-h-[90vh] p-2">
            <button
              className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-all"
              onClick={closeImageModal}
            >
              <X size={25} className='cursor-pointer' />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>

      )}
    </>
  );
}