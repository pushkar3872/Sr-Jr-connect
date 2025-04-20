import React, { useState, useEffect } from 'react';
import UserCard from './UserCard.jsx';
import AlluserStore from '../../store/AlluserStore.js';
import { useAuthstore } from '../../store/useAuthstore.js';
import UserModal from '../../components/UserModal.jsx'; // Make sure to import UserModal

export default function Juniors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Zustand store
  const { users, getAllStudents, isUsersLoading } = AlluserStore();
  const { authUser } = useAuthstore(); // Get authenticated user data

  useEffect(() => {
    getAllStudents();
  }, []); // Fetch students only once on mount

  // Filter out juniors (graduation year > authUser)
  const juniors = users.filter(user => user.graduationYear > authUser.graduationYear);

  // Apply search filter
  const filteredJuniors = juniors.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler to open user modal
  const handleUserCardClick = (user) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  return (
    <div className="p-6 h-full flex flex-col bg-base-100">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Junior Students</h2>
          <p className="text-base-content/70 mt-1">Connect with junior students from your institution</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search juniors..."
            className="input input-bordered w-full pl-10 focus:input-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-base-content opacity-60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Loading State */}
      {isUsersLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg text-secondary mb-4"></span>
          <p className="text-base-content/60">Loading junior students...</p>
        </div>
      ) : (
        <>
          {/* Results Counter */}
          <p className="mb-4 text-sm text-base-content/60">
            Showing {filteredJuniors.length} juniors
          </p>

          {/* User Grid */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filteredJuniors.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-base-content/40 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-base-content">No junior students found</h3>
                <p className="mt-1 text-base-content/60">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4 m-2">
                {filteredJuniors.map(user => (
                  <div 
                    key={user._id} 
                    onClick={() => handleUserCardClick(user)}
                    className="cursor-pointer"
                  >
                    <UserCard 
                      fullName={user.fullName} 
                      domain={user.academicDetails.domain} 
                      avatar={user.profilePicture} 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* User Modal */}
      {isUserModalOpen && selectedUser && (
        <UserModal 
          user={selectedUser} 
          isOpen={isUserModalOpen} 
          onClose={() => setUserModalOpen(false)} 
        />
      )}
    </div>
  );
}