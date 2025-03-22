import React, { useState } from 'react';
import General from './inputdata/General';
import Bio from './inputdata/Bio';
import ChangePass from './inputdata/ChangePass';
import Skills from './inputdata/Skills';
import SocialLinks from './inputdata/SocialLinks';
import ProfilePicture from './inputdata/ProfilePicture';
import { useAuthstore } from '../store/useAuthstore';
import { User, FileText, KeyRound, Code, Link as LinkIcon, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import formattedDate from '../lib/utils';
import PersonalInfo from './inputdata/Personalinfo';

export default function ProfilePage() {
  const { authUser } = useAuthstore();
  const [activeComponent, setActiveComponent] = useState(0);

  // Define all profile information components with their icons and colors
  const profileComponents = [
    {
      title: "General Information",
      icon: <User size={24} />,
      component: <General />,
      color: "primary"
    },
    {
      title: "Personal Information",
      icon: <UserPlus size={24} />,
      component: <PersonalInfo />,
      color: "warning"
    },
    {
      title: "Bio",
      icon: <FileText size={24} />,
      component: <Bio />,
      color: "secondary"
    },
    {
      title: "Change Password",
      icon: <KeyRound size={24} />,
      component: <ChangePass />,
      color: "accent"
    },
    {
      title: "Skills",
      icon: <Code size={24} />,
      component: <Skills />,
      color: "info"
    },
    {
      title: "Social Links",
      icon: <LinkIcon size={24} />,
      component: <SocialLinks />,
      color: "success"
    }
  ];

  // Navigation handlers for mobile carousel
  const navigatePrev = () => {
    setActiveComponent((prev) =>
      prev === 0 ? profileComponents.length - 1 : prev - 1
    );
  };

  const navigateNext = () => {
    setActiveComponent((prev) =>
      prev === profileComponents.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 pt-20 pb-10 px-4 md:px-8">
      {/* Hero section with profile picture and welcome message */}
      <div className="max-w-7xl mx-auto mb-12 bg-primary/5 rounded-xl p-6 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0">
            <ProfilePicture />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-4xl font-bold text-primary mb-2">
              {authUser?.fullName || "Welcome Back!"}
            </h1>
            <p className="text-base-content/70 text-lg mb-4">
              {authUser?.shortBio || authUser?.bio || "Manage your profile information and account settings"}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="badge badge-primary badge-lg">{authUser?.academicDetails?.Department || authUser?.branch || "Student"}</span>
              <span className="badge badge-secondary badge-lg">{authUser?.graduationYear || "Class of 2025"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-primary flex items-center">
            <User size={28} className="mr-2" />
            Profile Settings
          </h2>
          <div className="text-sm text-base-content/60">
            Last updated: {formattedDate(authUser?.updatedAt)}
          </div>
        </div>

        {/* Desktop view: Component grid with improved layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* General Information */}
          <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-primary">
            <div className="absolute -mt-4 ml-4 bg-primary text-primary-content rounded-full p-2 shadow-md">
              <User size={24} />
            </div>
            <General />
          </div>

          {/* Personal Information */}
          <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-warning">
            <div className="absolute -mt-4 ml-4 bg-warning text-warning-content rounded-full p-2 shadow-md">
              <UserPlus size={24} />
            </div>
            <PersonalInfo />
          </div>

          {/* Bio Section */}
          <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-secondary">
            <div className="absolute -mt-4 ml-4 bg-secondary text-secondary-content rounded-full p-2 shadow-md">
              <FileText size={24} />
            </div>
            <Bio />
          </div>

          {/* Password Section */}
          <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-accent">
            <div className="absolute -mt-4 ml-4 bg-accent text-accent-content rounded-full p-2 shadow-md">
              <KeyRound size={24} />
            </div>
            <ChangePass />
          </div>

          {/* Skills Section */}
          <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-info">
            <div className="absolute -mt-4 ml-4 bg-info text-info-content rounded-full p-2 shadow-md">
              <Code size={24} />
            </div>
            <Skills />
          </div>

          {/* Social Links Section */}
          <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-success">
            <div className="absolute -mt-4 ml-4 bg-success text-success-content rounded-full p-2 shadow-md">
              <LinkIcon size={24} />
            </div>
            <SocialLinks />
          </div>
        </div>

        {/* Mobile view: Enhanced creative carousel */}
        <div className="md:hidden">
          {/* Title with animated gradient background */}
          <div className="relative overflow-hidden rounded-t-xl mb-1">
            <div className={`absolute inset-0 bg-gradient-to-r from-${profileComponents[activeComponent].color} to-${profileComponents[activeComponent].color}/60 opacity-20 animate-pulse`}></div>
            <div className="flex items-center justify-center p-4">
              <div className={`flex items-center bg-${profileComponents[activeComponent].color}/10 p-3 rounded-full`}>
                <div className={`p-2 mr-3 bg-${profileComponents[activeComponent].color} rounded-full text-${profileComponents[activeComponent].color}-content`}>
                  {profileComponents[activeComponent].icon}
                </div>
                <h3 className={`text-xl font-bold text-${profileComponents[activeComponent].color}`}>
                  {profileComponents[activeComponent].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Content area with floating navigation buttons */}
          <div className="relative">
            {/* Current component with custom border and shadow */}
            <div className={`bg-base-100 rounded-xl shadow-lg overflow-hidden border-${profileComponents[activeComponent].color} transition-all duration-300`}
              style={{ borderWidth: '1px', borderStyle: 'solid' }}>
              <div className="p-6">
                {profileComponents[activeComponent].component}
              </div>
            </div>

            {/* Floating navigation buttons */}
            <button
              onClick={navigatePrev}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-12 h-12 flex items-center justify-center rounded-full bg-base-100 border border-${profileComponents[activeComponent].color} shadow-lg hover:bg-${profileComponents[activeComponent].color} hover:text-${profileComponents[activeComponent].color}-content transition-all duration-300 z-10`}
              aria-label="Previous section"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={navigateNext}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-12 h-12 flex items-center justify-center rounded-full bg-base-100 border border-${profileComponents[activeComponent].color} shadow-lg hover:bg-${profileComponents[activeComponent].color} hover:text-${profileComponents[activeComponent].color}-content transition-all duration-300 z-10`}
              aria-label="Next section"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Enhanced indicator dots */}
          <div className="flex justify-center mt-8 gap-2">
            {profileComponents.map((comp, index) => (
              <button
                key={index}
                onClick={() => setActiveComponent(index)}
                className={`h-2 transition-all duration-300 rounded-full ${index === activeComponent
                  ? `w-8 bg-${comp.color}`
                  : `w-2 bg-base-content/30 hover:bg-${comp.color}/50`
                  }`}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer section */}
        <div className="mt-16 text-center text-sm text-base-content/60">
          <p>Update your profile information to make your account more personalized and secure.</p>
        </div>
      </div>
    </div>
  );
}