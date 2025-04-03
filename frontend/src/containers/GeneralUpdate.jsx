import React, { useEffect, useState, useRef } from 'react';
import Messageinput from '../components/Messageinput';
import { useChatstore } from '../store/useChatstore';
import { useAuthstore } from '../store/useAuthstore';
import formatMessageTime from '../lib/utils';
import { X, Search, Send, Paperclip } from 'lucide-react';
import GeneralUpdateSkeleton from '../components/GeneralUpdateSkeleton';
import ChatBoxskeleton from '../components/ChatBoxskeleton';

export default function GeneralUpdate() {
  const { messages = [], isMessagesLoading, getchatmessages, subscribeToMessages, unsubscribeFromMessages } = useChatstore();
  const { authUser } = useAuthstore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Only load messages and set up subscriptions once
  useEffect(() => {
    getchatmessages();
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [getchatmessages, subscribeToMessages, unsubscribeFromMessages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Open image in modal
  const openImageModal = (imageUrl) => setSelectedImage(imageUrl);

  // Close modal
  const closeImageModal = () => setSelectedImage(null);

  // Filter messages based on search query
  const filteredMessages = messages.filter(message =>
    message.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.sender?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to check if a message is from the current user
  const isCurrentUserMessage = (message) => {
    // Use ID comparison rather than email for more reliability
    return message.sender?._id === authUser?._id;
  };

  // if (isMessagesLoading) {
  //   return <GeneralUpdateSkeleton />
  // }
  return (
    <>
      <div className="flex flex-col w-full md:w-svh lg:w-2/4 h-[85vh] bg-base-100 rounded-2xl shadow-2xl text-base-content overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-2 px-4">
          <h2 className="text-xl font-bold text-primary-content">General Updates</h2>
          <p className="text-xs text-primary-content/70">Team communication channel</p>
        </div>

        {/* Search Bar */}
        <div className="p-2 border-b border-base-300 flex justify-center">
          <div className="input input-bordered input-sm flex items-center gap-2 w-full max-w-md">
            <Search className="size-4 text-base-content/50" />
            <input
              type="text"
              placeholder="Search messages..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(156, 163, 175, 0.2) rgba(255, 255, 255, 0.5)' }}>
          {isMessagesLoading ? (
            <ChatBoxskeleton />
          ) : (
            filteredMessages.map((messg, index) => {
              const isMyMessage = isCurrentUserMessage(messg);
              // console.log(messg.sender.fullName+"    "+ messg.text)

              return (
                <div
                  key={messg._id || index}
                  className={`chat ${isMyMessage ? 'chat-end' : 'chat-start'}`}
                >
                  {/* Avatar */}
                  {!isMyMessage && (
                    <div className="chat-image avatar">
                      <div className="w-8 rounded-full">
                        <img src={`${messg.sender?.profilePicture !== null ? messg.sender?.profilePicture : "/avatar.png"}`} alt="Avatar" />
                      </div>
                    </div>
                  )}

                  {/* Chat Header */}
                  <div className="chat-header text-xs opacity-70">
                    {isMyMessage ? "You" : messg.sender?.fullName || "Unknown"} {formatMessageTime(messg.createdAt)}
                  </div>

                  {/* Chat Message */}
                  <div className={`chat-bubble ${isMyMessage ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                    {messg.image && (
                      <div className="mb-2" onClick={() => openImageModal(messg.image)}>
                        <img
                          src={messg.image}
                          alt="Shared content"
                          className="rounded max-h-40 w-auto object-cover cursor-pointer"
                        />
                      </div>
                    )}
                    {messg.text && (
                      <p>{messg.text}</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} /> {/* Empty div for auto-scrolling */}

          {filteredMessages.length === 0 && !isMessagesLoading && (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-2">
              <div className="btn btn-circle btn-ghost btn-lg no-animation">
                <Paperclip className="size-8 opacity-30" />
              </div>
              <p className="font-medium">No messages found</p>
              <p className="text-xs opacity-70">
                {searchQuery ? "Try a different search term" : "Start the conversation"}
              </p>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t border-base-300 p-4">
          <Messageinput />
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="modal modal-open backdrop-blur-sm transition-all duration-200"
          onClick={closeImageModal}
        >
          <div
            className="modal-middle max-w-[90vw] border-none shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn btn-sm btn-circle bg-transparent text-gray-200 absolute right-1 top-1 border-none shadow-md z-50"
              onClick={closeImageModal}
            >
              <X className="size-6" />
            </button>

            <div className="">
              <div className="overflow-hidden rounded">
                <img
                  src={selectedImage}
                  alt="Enlarged view"
                  className="max-h-[70vh] max-w-full mx-auto object-contain transition-all duration-300 hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-70">
              <div className="px-3 py-1 bg-base-300 rounded-full text-xs">
                Click outside to close
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}