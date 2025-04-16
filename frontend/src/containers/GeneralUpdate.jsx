import React, { useEffect, useState, useRef } from 'react';
import Messageinput from '../components/Messageinput';
import { useChatstore } from '../store/useChatstore';
import { useAuthstore } from '../store/useAuthstore';
import formatMessageTime from '../lib/utils';
import { X, Search, Send, Paperclip } from 'lucide-react';
import GeneralUpdateSkeleton from '../components/GeneralUpdateSkeleton';
import ChatBoxskeleton from '../components/ChatBoxskeleton';

export default function GeneralUpdate() {
  const {
    messages = [],
    isMessagesLoading,
    getchatmessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    deletechatmessage,
  } = useChatstore();
  const { authUser } = useAuthstore();

  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, messageId: null });
  const messagesEndRef = useRef(null);
  const contextMenuRef = useRef(null);

  useEffect(() => {
    getchatmessages();
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [getchatmessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const openImageModal = (imageUrl) => setSelectedImage(imageUrl);
  const closeImageModal = () => setSelectedImage(null);

  const filteredMessages = messages.filter((message) =>
    message.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.sender?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isCurrentUserMessage = (message) => {
    return message.sender?._id === authUser?._id;
  };

  const handleRightClick = (e, messageId, isMyMessage) => {
    e.preventDefault();
    if (!isMyMessage) return;

    // Adjust position to ensure menu stays within viewport
    const x = Math.min(e.pageX, window.innerWidth - 170);
    const y = Math.min(e.pageY, window.innerHeight - 100);

    setContextMenu({
      visible: true,
      x,
      y,
      messageId,
    });
  };

  return (
    <>
      <div className="flex flex-col w-full md:w-full lg:w-2/4 h-[85vh] bg-base-100 rounded-2xl shadow-2xl text-base-content overflow-hidden relative">
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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(156, 163, 175, 0.2) rgba(255, 255, 255, 0.5)' }}>
          {isMessagesLoading ? (
            <ChatBoxskeleton />
          ) : (
            filteredMessages.map((messg, index) => {
              const isMyMessage = isCurrentUserMessage(messg);
              return (
                <div
                  key={messg._id || index}
                  className={`chat ${isMyMessage ? 'chat-end' : 'chat-start'}`}
                  onContextMenu={(e) => handleRightClick(e, messg._id, isMyMessage)}
                >
                  {!isMyMessage && (
                    <div className="chat-image avatar">
                      <div className="w-8 rounded-full">
                        <img src={`${messg.sender?.profilePicture ?? "/avatar.png"}`} alt="Avatar" />
                      </div>
                    </div>
                  )}

                  <div className="chat-header text-xs opacity-70">
                    {isMyMessage ? "You" : messg.sender?.fullName || "Unknown"} {formatMessageTime(messg.createdAt)}
                  </div>

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
                    {messg.text && <p>{messg.text}</p>}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />

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

        {/* Context Menu */}
        {contextMenu.visible && (
          <div
            ref={contextMenuRef}
            className="fixed z-50 bg-base-200 shadow-md rounded-xl border border-base-300 overflow-hidden"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="flex items-center gap-2 w-full px-4 py-2 btn btn-ghost  transition-colors cursor-pointer"
              onClick={() => {
                deletechatmessage(contextMenu.messageId);
                setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              {/* Delete Message */}
            </button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm transition-all duration-200" onClick={closeImageModal}>
          <div className="max-w-[90vw] bg-base-100 border-none shadow-lg relative rounded-lg" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2 z-50"
              onClick={closeImageModal}
            >
              <X className="size-4" />
            </button>
            <div className="p-2 overflow-hidden rounded">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-h-[70vh] max-w-full mx-auto object-contain transition-all duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 