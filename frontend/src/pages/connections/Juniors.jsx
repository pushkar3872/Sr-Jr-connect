// connections/Juniors.jsx
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

export default function Juniors() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching data from database
    const fetchUsers = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate departments
      const departments = ['CS', 'EE', 'ME', 'CE', 'BT'];
      
      // Mock user data - replace with actual API call
      const mockUsers = Array.from({ length: 20 }, (_, i) => ({
        id: `junior-${i + 1}`,
        name: `Junior ${i + 1}`,
        avatar: `/api/placeholder/64/64`,
        role: 'Junior Year',
        department: departments[Math.floor(Math.random() * departments.length)],
        messageCount: Math.floor(Math.random() * 30),
        isOnline: Math.random() > 0.5,
        interests: ['Programming', 'Design', 'Research', 'Projects', 'Labs']
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 1)
      }));
      
      setUsers(mockUsers);
      setLoading(false);
    };
    
    fetchUsers();
  }, []);

  // Filter users based on search term and department
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (user.interests && user.interests.some(interest => 
                            interest.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesSearch;
  });

  return (
    <div className="p-6 h-full flex flex-col bg-base-100">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Junior Students</h2>
          <p className="text-base-content/70 mt-1">Connect with junior students from your institution</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search juniors..."
              className="input input-bordered w-full pr-10 focus:input-secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute right-3 top-2.5 h-5 w-5 text-base-content/50" 
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
          
          {/* <select 
            className="select select-bordered focus:select-secondary w-full sm:w-auto"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.filter(d => d !== 'all').map(dept => (
              <option key={dept} value={dept}>{dept} Department</option>
            ))}
          </select> */}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg text-secondary mb-4"></span>
          <p className="text-base-content/60">Loading junior students...</p>
        </div>
      ) : (
        <>
          {/* Results Counter */}
          <p className="mb-4 text-sm text-base-content/60">
            Showing {filteredUsers.length} juniors
          </p>
          
          {/* User Grid with overflow */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4 m-2">
              {filteredUsers.map(user => (
                <UserCard key={user.id} user={{
                  ...user,
                  role: user.department ? `${user.department} ${user.role}` : user.role
                }} type="juniors" />
              ))}
            </div>
          </div>
          
          {/* Empty State */}
          {filteredUsers.length === 0 && (
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
          )}
        </>
      )}
    </div>
  );
}