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
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-base-300 rounded"></div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-base-300 p-2">
        <div className="h-10 bg-base-300 rounded"></div>
      </div>
    </div>
  );
}