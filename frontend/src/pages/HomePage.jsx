import Messageinput from '../components/Messageinput';
import React from 'react';

import GeneralUpdate from "../containers/GeneralUpdate";
import LeaderBoard from "../containers/LeaderBoard";
import Profile from "../containers/Profile";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col md:flex-row gap-4 p-4">
      {/* Left Section (User Profile) */}
      <Profile />

      {/* Middle Section (Chat Area) */}
      <GeneralUpdate />

      {/* Right Section (Leaderboard) */}
      <LeaderBoard />
    </div>
  );
}
