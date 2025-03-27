import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import AlluserStore from '../../store/AlluserStore';
import { useAuthstore } from '../../store/useAuthstore';

export default function Seniors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('fullName');

  // Zustand store
  const { users, getAllStudents, isUsersLoading } = AlluserStore();
  const { authUser } = useAuthstore(); // Get authenticated user data

  useEffect(() => {
    getAllStudents();
  }, []); // Fetch students only once on mount

  // Filter out seniors (graduation year < authUser)
  const seniors = users.filter(user => user.graduationYear < authUser.graduationYear);

  // Apply search filter
  const filteredSeniors = seniors.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply sorting logic
  const sortedSeniors = [...filteredSeniors].sort((a, b) => {
    if (sortBy === 'fullName') return a.fullName.localeCompare(b.fullName);
    return 0;
  });

  return (
    <div className="p-6 h-full flex flex-col bg-base-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-base-content">Seniors</h1>
        <div className="badge badge-primary badge-lg gap-2">
          Total Seniors: {seniors.length}
        </div>
      </div>

      {/* Search Input */}
      <div className="flex mb-6 gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search seniors..."
            className="input input-bordered w-full pl-10 focus:input-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-base-content opacity-60 absolute left-3 top-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Loader */}
      {isUsersLoading ? (
        <div className="flex items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {sortedSeniors.length === 0 ? (
            <div className="text-center py-12 text-base-content opacity-60">
              No seniors found matching your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 m-2">
              {sortedSeniors.map(user => (
                <UserCard key={user._id} fullName={user.fullName} domain={user.academicDetails.domain} avatar={user.profilePicture} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
