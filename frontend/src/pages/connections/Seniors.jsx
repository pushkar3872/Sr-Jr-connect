// connections/Seniors.jsx
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

export default function Seniors() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Simulate fetching seniors from database
  useEffect(() => {
    const fetchSeniors = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock seniors data that would come from your database
      const mockSeniors = Array.from({ length: 20 }, (_, i) => ({
        id: `senior-${i + 1}`,
        name: `Senior ${i + 1}`,
        avatar: `/api/placeholder/40/40`,
        role: `Senior Student`,
        connectionDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
        messageCount: Math.floor(Math.random() * 50),
        isOnline: Math.random() > 0.5,
        major: ['Computer Science', 'Electrical Engineering', 'Business', 'Mathematics', 'Physics'][Math.floor(Math.random() * 5)]
      }));

      setUsers(mockSeniors);
      setLoading(false);
    };

    fetchSeniors();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.major.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort users based on sortBy option
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'recent') return new Date(b.connectionDate) - new Date(a.connectionDate);
    if (sortBy === 'messages') return b.messageCount - a.messageCount;
    return 0;
  });

  return (
    <div className="p-6 h-full flex flex-col bg-base-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-base-content">Seniors</h1>
        <div className="badge badge-primary badge-lg gap-2">
          Total Seniors: {users.length}
        </div>
      </div>

      {/* Search and filters */}
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

        {/* Uncomment and update the select if needed
        <select
          className="select select-bordered focus:select-primary"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="recent">Sort by Recent</option>
          <option value="messages">Sort by Messages</option>
        </select>
        */}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {sortedUsers.length === 0 ? (
            <div className="text-center py-12 text-base-content opacity-60">
              No seniors found matching your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 m-2">
              {sortedUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}