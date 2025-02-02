import React from 'react';

//importing the containers on the home page
import Profile from '../containers/Profile';
import GeneralUpdate from '../containers/GeneralUpdate';
import LeaderBoard from '../containers/LeaderBoard';

import NavBar from '../NavBar';
export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col md:flex-row">


      {/*Here we are going to keep the NavBar page*/}

      


      {/* Left Section (User Profile) */}
      
     <Profile/>

      {/* Middle Section (Chat Area) */}
      <GeneralUpdate/>

      {/* Right Section (Leaderboard) */}
      <LeaderBoard/>

    </div>
  );
}
