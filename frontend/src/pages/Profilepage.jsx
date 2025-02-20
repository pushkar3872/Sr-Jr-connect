import React from 'react';

import General from './inputdata/General';
import Bio from './inputdata/Bio';
import ChangePass from './inputdata/ChangePass';
import Skills from './inputdata/Skills';
import SocialLinks from './inputdata/SocialLinks';
import ProfilePicture from './inputdata/ProfilePicture';

export default function Profilepage() {
  return (
    <div className="p-6">
      {/* Spacer at the top */}
      <div className="h-8"></div>

      <ProfilePicture/>
      <br></br>

      {/* Container with flex layout */}
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Each component wrapped in a styled div */}
        <div className="bg-white p-4 shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
          <General />
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
          <Bio />
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
          <ChangePass />
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
          <Skills />
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
