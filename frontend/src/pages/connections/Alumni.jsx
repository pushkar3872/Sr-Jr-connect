// connections/Alumni.jsx
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

export default function Alumni() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

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

  // Sort users based on sortBy option
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'recent') return new Date(b.connectionDate) - new Date(a.connectionDate);
    if (sortBy === 'messages') return b.messageCount - a.messageCount;
    return 0;
  });

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Alumni</h1>
        <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
          Total Alumni: {users.length}
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="flex mb-6 gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search alumni..."
            className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <select 
          className="p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="recent">Sort by Recent</option>
          <option value="messages">Sort by Messages</option>
        </select>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <>
          {sortedUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No alumni found matching your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {sortedUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}