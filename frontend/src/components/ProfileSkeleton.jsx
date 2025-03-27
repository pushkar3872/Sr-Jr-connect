import React from 'react';

export default function ProfileSkeleton() {
  return (
    <div className="hidden lg:block w-1/4 h-[85vh] bg-base-100 rounded-2xl shadow-2xl overflow-hidden animate-pulse">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4">
        <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-1/2"></div>
      </div>

      {/* Profile Content */}
      <div className="p-4">
        {/* Profile Image and Basic Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 bg-base-300 rounded-full"></div>
          <div className="h-6 bg-base-300 rounded w-3/4 mt-4"></div>
          <div className="h-4 bg-base-300 rounded w-1/2 mt-2"></div>
        </div>

        {/* Bio Section */}
        <div className="bg-base-200 p-4 rounded-lg mb-4">
          <div className="h-4 bg-base-300 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
        </div>

        {/* Details Section */}
        <div className="space-y-4 mb-6">
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-full"></div>
        </div>

        {/* Platform Links */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-10 bg-base-300 rounded"></div>
          ))}
        </div>

        {/* Stats */}
        <div className="stats stats-vertical shadow w-full">
          <div className="stat">
            <div className="h-4 bg-base-300 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-base-300 rounded w-3/4"></div>
          </div>
          <div className="stat">
            <div className="h-4 bg-base-300 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-base-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}