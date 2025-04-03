import React, { useState } from 'react';
import Messageinput from '../components/Messageinput';
import GeneralUpdate from "../containers/GeneralUpdate";
import LeaderBoard from "../containers/LeaderBoard";
import Profile from "../containers/Profile";
import { useAuthstore } from '../store/useAuthstore';
import { Navigate } from 'react-router-dom';
import { MessageSquare, Award, User } from 'lucide-react';

export default function HomePage() {
  const { authUser, checkAuth } = useAuthstore();
  const [activeTab, setActiveTab] = useState('updates');

  if (!authUser) {
    return <Navigate to="/" />;
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'leaderboard':
        return <LeaderBoard />;
      case 'updates':
      default:
        return <GeneralUpdate />;
    }
  };

  return (
    <>
      <div className='hidden md:flex md:min-h-[85vh] md:bg-base-200 md:flex-row  md:gap-4 md:justify-center p-4 relative'>
        <Profile />
        <GeneralUpdate />
        <LeaderBoard />
      </div>
      <div className="md:hidden min-h-[85vh] bg-base-200 flex flex-col md:flex-row lg:gap-4 md:justify-center p-4 relative">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <Profile />
        </div>

        <div className="hidden md:block">
          <GeneralUpdate />
        </div>

        <div className="hidden md:block">
          <LeaderBoard />
        </div>

        {/* Mobile Layout - Single Component View */}
        <div className="md:hidden w-full">
          {renderActiveComponent()}
        </div>

        {/* Floating Side Navigation for Small Screens */}
        <div className="fixed right-2 top-1/2 transform -translate-y-1/2 md:hidden z-50">
          <div className="flex flex-col gap-4 bg-base-100/70 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center justify-center p-2 rounded-full ${activeTab === 'profile' ? 'bg-primary text-primary-content' : 'bg-base-200/80 text-base-content/70'
                }`}
            >
              <User className="size-5" />
            </button>

            <button
              onClick={() => setActiveTab('updates')}
              className={`flex items-center justify-center p-2 rounded-full ${activeTab === 'updates' ? 'bg-primary text-primary-content' : 'bg-base-200/80 text-base-content/70'
                }`}
            >
              <MessageSquare className="size-5" />
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center justify-center p-2 rounded-full ${activeTab === 'leaderboard' ? 'bg-primary text-primary-content' : 'bg-base-200/80 text-base-content/70'
                }`}
            >
              <Award className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}