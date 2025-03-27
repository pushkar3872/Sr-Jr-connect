import React from 'react';

export default function ProfilePageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 pt-20 pb-10 px-4 md:px-8">
      {/* Hero section skeleton */}
      <div className="max-w-7xl mx-auto mb-12 bg-primary/5 rounded-xl p-6 backdrop-blur-sm shadow-xl animate-pulse">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-base-300 rounded-full"></div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <div className="h-8 bg-base-300 rounded w-3/4 mx-auto md:mx-0 mb-4"></div>
            <div className="h-6 bg-base-300 rounded w-5/6 mx-auto md:mx-0 mb-4"></div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="h-6 bg-base-300 rounded w-24"></div>
              <div className="h-6 bg-base-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content section skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 bg-base-300 rounded w-48"></div>
          <div className="h-4 bg-base-300 rounded w-32"></div>
        </div>

        {/* Desktop view: Component grid skeleton */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
              <div className="absolute -mt-4 ml-4 bg-base-300 rounded-full p-2 shadow-md w-12 h-12"></div>
              <div className="p-6">
                <div className="h-6 bg-base-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view: Carousel skeleton */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-t-xl mb-1">
            <div className="absolute inset-0 bg-base-300 opacity-20 animate-pulse"></div>
            <div className="flex items-center justify-center p-4">
              <div className="flex items-center bg-base-300/10 p-3 rounded-full">
                <div className="p-2 mr-3 bg-base-300 rounded-full w-12 h-12"></div>
                <div className="h-6 bg-base-300 rounded w-32"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden border-base-300 transition-all duration-300">
              <div className="p-6">
                <div className="h-6 bg-base-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-2 w-2 bg-base-300 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Footer section skeleton */}
        <div className="mt-16 text-center text-sm text-base-content/60">
          <div className="h-4 bg-base-300 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}