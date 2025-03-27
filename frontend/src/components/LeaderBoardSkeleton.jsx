import React from 'react';

export default function LeaderBoardSkeleton() {
  return (
    <div className="hidden lg:block w-1/4 h-[85vh] bg-base-100 rounded-2xl shadow-2xl overflow-hidden animate-pulse">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4">
        <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
      </div>

      {/* Stats Summary */}
      <div className="flex justify-between px-6 py-3 bg-base-200/50 border-b border-base-300">
        <div className="h-6 bg-base-300 rounded w-1/4"></div>
        <div className="h-6 bg-base-300 rounded w-1/4"></div>
        <div className="h-6 bg-base-300 rounded w-1/4"></div>
      </div>

      {/* Leaderboard List */}
      <div className="p-4 space-y-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-base-300 rounded"></div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-base-200 p-4">
        <div className="h-4 bg-base-300 rounded w-full"></div>
      </div>
    </div>
  );
}