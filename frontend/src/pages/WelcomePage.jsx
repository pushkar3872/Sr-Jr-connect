import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-[90vh] bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
        <figure className=" pt-4">
          <div className='flex items-center justify-center'>
            <svg fill="currentColor"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="256px"
              height="200px"
              viewBox="0 0 795.601 795.601"
              className="size-24">
              <g>
                <g>
                  <path d="M569,551.9L569,551.9L569,551.9c-0.2-1.6-0.6-3.199-1.1-4.6c-3.8-14.5-12.4-40.9-16.3-52.7c-0.4-2.1-1.101-4-2-5.899 V488.6l0,0c-2.4-5.1-6.301-9.399-11.101-12.3l0,0c-0.3-0.2-0.899-0.5-1.7-0.9c-0.3-0.199-0.699-0.3-1-0.5 c-9.5-4.5-38.6-16.1-38.6-16.1l0,0c-14.6-6.3-29.6-11.7-45-17.1l0,0l0,0l0,0l0,0c-2.7,11.399-28.8,87.3-33,97.8l-3.3-70.5 c1.1-1.7,1.899-3.601,2.7-5.4l10.899-21.5c-7.7,6.4-19.1,10.4-32,10.4c-12.5,0-23.8-3.9-31.399-10l10.6,21.1 c0.9,1.8,1.6,3.7,2.7,5.4l-3.3,70.5c-4.101-10.5-30.2-86.4-33-97.8l0,0l0,0l0,0l0,0c-15.4,5.5-30.5,10.899-45,17.1l0,0 c0,0-29.1,11.6-38.6,16.1c-0.3,0.2-0.7,0.301-1,0.5c-0.8,0.4-1.4,0.7-1.7,0.9l0,0c-4.8,2.9-8.7,7.2-11.1,12.3l0,0c0,0,0,0,0,0.101 c-0.9,1.899-1.5,3.899-2,5.899c-3.9,11.8-12.5,38.2-16.3,52.7c-0.5,1.5-0.9,3-1.1,4.6l0,0l0,0c-0.2,1.4-0.3,2.801-0.3,4.301 c0,15.5,12.6,28.1,28.1,28.1h287c15.5,0,28.1-12.6,28.1-28.1C569.4,554.701,569.2,553.3,569,551.9z"></path><path d="M471.101,311.1c0-5,1-23,1-27.1c0-40.2-32.601-72.7-72.7-72.7l0,0l0,0H399.3h-0.1l0,0l0,0c-0.5,0-0.9,0-1.4,0 s-0.899,0-1.399,0l0,0l0,0H396.3h-0.1l0,0l0,0c-40.2,0-72.7,32.6-72.7,72.7c0,4.1,1,22.1,1,27.1c-1.8,0.1-18-3.8-16.3,15.7 c3.7,41.4,19.5,33.3,19.9,33.3c7.8,24.9,19.8,40.8,31.6,51c18.4,15.8,36.3,17.5,36.6,17.5c0.5,0,1,0,1.5,0l0,0l0,0 c0.5,0,1,0,1.5,0c0.301,0,18.101-1.7,36.4-17.3c11.9-10.1,24-26.1,31.8-51.1c0.5,0,16.2,8,19.9-33.3 C489.101,307.3,472.9,311.2,471.101,311.1z"></path><path d="M203.4,550.4c0.1-1.1,0.5-3.199,0.7-4.3c0.3-1.8,0.9-3.5,1.4-5.3c4.3-14.4,11.6-38.5,16.2-52.4c0.7-2.8,1.6-5.6,2.8-8.3 l3.1-8.899c-10-4-20.2-7.7-30.6-11.4l0,0c-2.4,10-25.1,76.1-28.7,85.3l-2.9-61.5c1-1.5,1.6-3.1,2.4-4.7l9.5-18.8 c-6.7,5.601-16.7,9.101-27.9,9.101c-10.9,0-20.7-3.4-27.4-8.7l9.3,18.399c0.8,1.601,1.4,3.2,2.4,4.7l-2.9,61.5 c-3.6-9.2-26.4-75.3-28.7-85.3l0,0c-13.4,4.8-26.6,9.5-39.2,14.9l0,0c0,0-25.4,10.199-33.6,14c-0.3,0.1-0.6,0.3-0.9,0.399 c-0.7,0.4-1.2,0.601-1.5,0.8l0,0c-4.2,2.5-7.6,6.301-9.7,10.7l0,0c0,0,0,0,0,0.101c-0.8,1.6-1.3,3.399-1.7,5.199 c-3.4,10.301-10.9,33.301-14.2,45.9c-0.4,1.3-0.8,2.7-1,4l0,0l0,0C0.1,557,0,558.3,0,559.5C0,573,11,584,24.5,584h23.4 c33.5,0,67,0,100.4,0c0.4,0,0.9,0,1.3,0s0.9,0,1.3,0c20.2,0,40.5,0,60.7,0c-5.3-8.101-8.5-17.7-8.5-28.101 C203.1,554.3,203.1,552.3,203.4,550.4z"></path><path d="M88.7,388.9c6.8,21.7,17.3,35.6,27.6,44.4c16.1,13.8,31.7,15.3,31.9,15.3c0.4,0,0.9,0,1.3,0c0.4,0,0.9,0,1.3,0 c0.3,0,15.7-1.5,31.7-15.1c10.4-8.8,20.9-22.7,27.8-44.6c0.4,0,14.2,7,17.4-29.1c1.5-17-12.7-13.6-14.2-13.7 c0-4.3,0.8-20,0.8-23.6c0-35-28.4-63.4-63.4-63.4l0,0h-0.1h-0.1l0,0l0,0c-0.4,0-0.8,0-1.2,0c-0.4,0-0.8,0-1.2,0l0,0l0,0h-0.1h-0.1 l0,0l0,0c-35,0-63.4,28.4-63.4,63.4c0,3.6,0.9,19.3,0.9,23.6c-1.5,0.1-15.7-3.3-14.2,13.7C74.5,395.8,88.3,388.9,88.7,388.9z"></path><path d="M795.101,535.1c-0.2-2.3-0.5-4.6-0.801-6.8c0,0-1.3-7.4-1.6-8.5c-2.9-12.9-11-22.4-21.9-29.8c-2-1.4-4.1-2.601-6.3-3.7 c-2.8-1.5-45.399-15.5-46.5-15.8c0.3,1.5,0.4,3.1,0.5,4.8c5.9,4.2,23.4,19.2,15.5,47.3c0,0-12.5-14.899-25.3-16.899 c-12.2,21.199-32.9,48.1-44.1,55.199c-11.2-7.1-31.9-33.899-44.101-55.199c-12.8,1.899-25.3,16.899-25.3,16.899 c-7.9-28.1,9.5-43.1,15.5-47.3c0.1-1.7,0.2-3.4,0.5-4.8c-0.8,0.3-25.9,8.5-38.9,13c0.601,1.6,1.101,3.3,1.5,4.899 c4.601,13.9,12.4,37.9,16.2,52.4c0.2,0.6,1.7,7.2,2.101,9.6c0.3,1.9,0.3,3.9,0.3,5.801c0,10.399-3.101,20-8.5,28.1 c26.899,0,53.8,0,80.8,0c32.8,0,65.6,0,98.4,0c9.8,0,18.1-3,25-10.3c5.399-5.7,6.899-12.601,7.3-20c0.1-1.3,0.2-6.9,0.2-6.9 S795.101,535.201,795.101,535.1z"></path><path d="M587.4,401.3c1,3.7,1.7,7.1,1.6,10.4c0,1.1-0.1,2.199-0.3,3.199c-0.9,3.101-7.5,13.601-8.5,15.4 c11.6,12.5,26.8,15.3,41.9,18.5c4.5,0.9,9,1.5,13.8,2.1c1.6,0.301,3.1,0.601,4.7,0.9l-7.7,22.4c0,0-0.2,32.699,31.399,52.6h0.2 c31.601-19.9,31.4-52.6,31.4-52.6l-7.7-22.4c1.6-0.3,3.2-0.6,4.7-0.9c4.8-0.6,9.399-1.199,13.8-2.1c15.1-3.2,30.4-6.1,41.9-18.5 c-1-1.8-7.601-12.2-8.5-15.4c-0.2-1.1-0.301-2.1-0.301-3.199c0-3.301,0.601-6.801,1.601-10.4c1-3.5,2.1-7,3.1-10.5 c5.101-11.4,8-24,8-37.3c0-49.5-39.3-89.7-88.2-90.6l0,0h-0.1h-0.1l0,0c-48.9,0.9-88.2,41.1-88.2,90.6c0,13.3,2.8,25.9,8,37.3 C585.4,394.4,586.5,397.8,587.4,401.3z"></path></g></g></svg>
          </div>
        </figure>

        <div className="card-body sm:p-2">
          <h2 className="card-title text-2xl sm:text-3xl font-bold text-center mx-auto">Alumni Portal</h2>
          <p className="text-center text-base-content/70 pb-2 text-sm sm:text-base">Connect, collaborate, and grow with fellow graduates</p>

          <div className="divider"></div>

          <div className="mb-4 sm:mb-6">
            <div className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 flex items-center justify-center">
              {/* <span className="badge badge-primary badge-sm sm:badge-md mr-2">Welcome</span> */}
              Welcome Back!
            </div>
            <p className="text-base-content/70 text-xs sm:text-sm text-center">
              Access exclusive alumni benefits, networking opportunities, and stay updated with the latest events and news.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-base-200 hover:bg-base-300 transition-colors duration-300">
              <div className="card-body p-3 sm:p-4">
                <h4 className="font-medium text-primary flex items-center text-sm sm:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Already a member?
                </h4>
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-primary btn-outline btn-sm sm:btn-md w-full mt-1 sm:mt-2 hover:scale-105 transition-transform duration-200"
                >
                  Login
                </button>
              </div>
            </div>

            <div className="card bg-base-200 hover:bg-base-300 transition-colors duration-300">
              <div className="card-body p-3 sm:p-4">
                <h4 className="font-medium text-secondary flex items-center text-sm sm:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  New here?
                </h4>
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-secondary btn-outline btn-sm sm:btn-md w-full mt-1 sm:mt-2 hover:scale-105 transition-transform duration-200"
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-2 text-center">
            <div className="flex justify-center space-x-3 sm:space-x-4">
              <a href="/about" className="btn btn-circle btn-ghost btn-xs sm:btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </a>
              <a href="/faq" className="btn btn-circle btn-ghost btn-xs sm:btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </a>
              <a href="/support" className="btn btn-circle btn-ghost btn-xs sm:btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
            <p className="text-xs sm:text-sm text-base-content/60 mt-1 sm:mt-2">
              Need help? <a href="/support" className="link link-primary link-hover">Contact support</a>
            </p>
          </div>
        </div>

        <div className="card-footer p-2 sm:p-4 bg-base-200 text-center text-2xs sm:text-xs text-base-content/50">
          © 2025 Alumni Association • All Rights Reserved
        </div>
      </div>
    </div>
  );
}