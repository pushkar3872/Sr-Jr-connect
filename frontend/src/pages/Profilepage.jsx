import React from 'react';

import General from './inputdata/General';
import Bio from './inputdata/Bio';
import ChangePass from './inputdata/ChangePass';
import Skills from './inputdata/Skills';
import SocialLinks from './inputdata/SocialLinks';
import ProfilePicture from './inputdata/ProfilePicture';
import { useAuthstore } from '../store/useAuthstore';

export default function Profilepage() {
  const { authUser, update } = useAuthstore();
  return (
    <div className="p-6 bg-base-200 pt-16">
      {/* Spacer at the top so pt-16 given above */}

      <ProfilePicture />
      <br />

      {/* Container with flex layout */}
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Each component wrapped in a styled div */}
        <div className="bg-base-100 p-4 shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
          <General fullName={authUser.fullName} email={authUser.email} />
        </div>

        <div className="bg-base-100 p-4 shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
          <Bio />
        </div>

        <div className="bg-base-100 p-4 shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
          <ChangePass />
        </div>

        <div className="bg-base-100 p-4 shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
          <Skills />
        </div>

        <div className="bg-base-100 p-4 shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
