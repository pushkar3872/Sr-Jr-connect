import React from "react";

const FindTeammatePageSkeleton = () => {
  const skeletonItems = Array(10).fill(null);

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Instruction Text Skeleton */}
      <div className="text-center mb-4">
        <div className="h-8 bg-base-300 rounded w-96 mx-auto animate-pulse"></div>
      </div>

      {/* Search Bar & Dropdown Skeleton */}
      <div className="flex justify-center items-center mb-6 space-x-4">
        <div className="h-12 bg-base-300 rounded w-full max-w-md animate-pulse"></div>
        <div className="h-12 bg-base-300 rounded w-32 animate-pulse"></div>
      </div>

      {/* Flip Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {skeletonItems.map((_, index) => (
          <div key={index} className="h-72 bg-base-200 rounded-lg p-4 animate-pulse shadow-lg">
            <div className="flex flex-col items-center">
              {/* Avatar circle */}
              <div className="w-24 h-24 rounded-full bg-base-300 mb-4"></div>
              {/* Name */}
              <div className="h-5 bg-base-300 rounded w-32 mb-2"></div>
              {/* Domain */}
              <div className="h-4 bg-base-300 rounded w-24 mb-4"></div>
              {/* Button */}
              <div className="h-10 bg-base-300 rounded w-24 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTeammatePageSkeleton;
