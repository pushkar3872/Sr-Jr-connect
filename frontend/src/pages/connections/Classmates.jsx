import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import AlluserStore from '../../store/AlluserStore';
import { useAuthstore } from '../../store/useAuthstore.js';
import UserModal from '../../components/UserModal.jsx';

export default function Classmates() {
  const [searchTerm, setSearchTerm] = useState('');
  const { users, getAllStudents, isUsersLoading } = AlluserStore();
  const { authUser } = useAuthstore();

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserCardClick = (user) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  // Filter classmates (same graduation year as authUser)
  const classmates = users.filter(user => user.graduationYear === authUser.graduationYear);

  // Apply search filter
  const filteredClassmates = classmates.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 h-full flex flex-col bg-base-100">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Classmates</h2>
          <p className="text-base-content/70 mt-1">Connect with students from your class</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search classmates..."
            className="input input-bordered w-full pl-10 focus:input-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <p className="text-base-content/60">Loading classmates...</p>
        </div>
      ) : (
        <>
          {/* Results Counter */}
          <p className="mb-4 text-sm text-base-content/60">
            Showing {filteredClassmates.length} classmates
          </p>

          {/* User Grid */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filteredClassmates.length === 0 ? (
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
                <h3 className="text-lg font-medium text-base-content">No classmates found</h3>
                <p className="mt-1 text-base-content/60">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4 m-2">
                {filteredClassmates.map(user => (
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