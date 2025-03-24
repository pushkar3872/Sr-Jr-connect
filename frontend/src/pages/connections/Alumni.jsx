// connections/Alumni.jsx
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

export default function Alumni() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate fetching alumni from database
  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock alumni data that would come from your database
      const mockAlumni = Array.from({ length: 20 }, (_, i) => ({
        id: `alumni-${i + 1}`,
        name: `Alumnus ${i + 1}`,
        avatar: `/api/placeholder/40/40`,
        role: `Class of ${2020 - Math.floor(Math.random() * 8)}`,
        connectionDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
        messageCount: Math.floor(Math.random() * 50),
        isOnline: Math.random() > 0.7,
        company: ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'IBM'][Math.floor(Math.random() * 7)]
      }));

      setUsers(mockAlumni);
      setLoading(false);
    };

    fetchAlumni();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort users by name by default
  const sortedUsers = [...filteredUsers].sort((a, b) => a.id > b.id);

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Alumni</h2>
          <p className="text-base-content/70 mt-1">Connect with alumni from your institution</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search alumni..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              className="absolute right-3 top-3 h-5 w-5 text-base-content/50" 
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
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
          <p className="text-base-content/60">Loading alumni...</p>
        </div>
      ) : (
        <>
          {/* Results Counter */}
          <p className="mb-4 text-sm text-base-content/60">
            Showing {filteredUsers.length} alumni
          </p>
          
          {/* User Grid with overflow */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4 m-2">
              {sortedUsers.map(user => (
                <UserCard key={user.id} user={user} type="alumni" />
              ))}
            </div>
          </div>
          
          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-base-content/50 mb-4">
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
              <h3 className="text-lg font-medium">No alumni found</h3>
              <p className="mt-1 text-base-content/60">Try adjusting your search terms.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}