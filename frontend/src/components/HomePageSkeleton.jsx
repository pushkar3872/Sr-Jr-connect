import React from 'react';
import ProfileSkeleton from './ProfileSkeleton';
import GeneralUpdateSkeleton from './GeneralUpdateSkeleton';
import LeaderBoardSkeleton from './LeaderBoardSkeleton';

export default function HomePageSkeleton() {
  return (
    <div className="min-h-[85vh] bg-base-200 flex md:flex-row lg:gap-4 md:justify-center p-4">
      {/* Left Section (Profile Skeleton) */}
      <ProfileSkeleton />

      {/* Middle Section (General Update Skeleton) */}
      <GeneralUpdateSkeleton />

      {/* Right Section (Leaderboard Skeleton) */}
      <LeaderBoardSkeleton />
    </div>
  );
}