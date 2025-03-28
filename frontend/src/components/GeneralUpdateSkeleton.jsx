import React from 'react';

export default function GeneralUpdateSkeleton() {
  return (
    <div className="w-full md:w-svh lg:w-2/4 h-[85vh] bg-base-100 rounded-2xl shadow-2xl overflow-hidden animate-pulse">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4">
        <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-1/2"></div>
      </div>

      {/* Search Bar */}
      <div className="p-2 border-b border-base-300 flex justify-center">
        <div className="h-8 bg-base-300 rounded w-full max-w-md"></div>
      </div>

      {/* Messages Container */}
      <div className="p-3 space-y-3">
        {[...Array(5)].map((_, idx) => {
          return (
            <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"} items-center`}>
              {idx % 2 == 0 ? (
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full">
                    <div className="skeleton w-full h-full rounded-full"></div>
                  </div>
                </div>
              ) : null}

              <div className="chat-header mb-1">
                <div className="skeleton h-4 w-16" />
              </div>

              <div className="chat-bubble p-0 skeleton">
                <div className="h-12" style={{ width: `${200}px` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="border-t border-base-300 p-2">
        <div className="h-10 bg-base-300 rounded"></div>
      </div>
    </div>
  );
}