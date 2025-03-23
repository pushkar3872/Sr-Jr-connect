import Messageinput from '../components/Messageinput';
import React from 'react';
import GeneralUpdate from "../containers/GeneralUpdate";
import LeaderBoard from "../containers/LeaderBoard";
import Profile from "../containers/Profile";
import { useAuthstore } from '../store/useAuthstore';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomePage() {
  const { authUser, checkAuth } = useAuthstore();
  if (!authUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className="min-h-[85vh] bg-base-200 flex md:flex-row lg:gap-4 md:justify-center p-4">
      {/* Left Section (User Profile) */}
      <Profile />

      {/* Middle Section (Chat Area) */}
      <GeneralUpdate />

      {/* Right Section (Leaderboard) */}
      <LeaderBoard />
    </div>
  );
}
