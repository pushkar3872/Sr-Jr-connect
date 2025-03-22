// connections/Classmates.jsx
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

export default function Classmates() {
  const [loading, setLoading] = useState(true);
  const [classmates, setClassmates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');

  useEffect(() => {
    // Simulate fetching data from database
    const fetchClassmates = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generate mock data
      const years = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
      const courses = ['Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'Biology'];

      // Mock classmate data formatted to match UserCard props requirements
      const mockClassmates = Array.from({ length: 24 }, (_, i) => ({
        id: `classmate-${i + 1}`,
        name: `Classmate ${i + 1}`,
        avatar: `/api/placeholder/64/64`,
        role: years[Math.floor(Math.random() * years.length)], // Using year as role
        connectionDate: `${Math.floor(Math.random() * 12) + 1} months ago`,
        messageCount: Math.floor(Math.random() * 50),
        isOnline: Math.random() > 0.6,
        // Additional classmate-specific properties not used by UserCard
        year: years[Math.floor(Math.random() * years.length)],
        courses: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          () => courses[Math.floor(Math.random() * courses.length)]
        ),
        lastActive: Math.random() > 0.5 ? 'Just now' : `${Math.floor(Math.random() * 60)} min ago`
      }));

      setClassmates(mockClassmates);
      setLoading(false);
    };

    fetchClassmates();
  }, []);

  // Get all years for filter dropdown
  const years = ['all', ...new Set(classmates.map(classmate => classmate.year))].sort();
  
  // Get all unique courses for filter dropdown
  const allCourses = classmates.flatMap(classmate => classmate.courses || []);
  const uniqueCourses = ['all', ...new Set(allCourses)].sort();

  // Filter classmates based on search term, year, and course
  const filteredClassmates = classmates.filter(classmate => {
    const matchesSearch = classmate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (classmate.courses && classmate.courses.some(course =>
        course.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesYear = selectedYear === 'all' || classmate.year === selectedYear;
    
    const matchesCourse = selectedCourse === 'all' || 
      (classmate.courses && classmate.courses.some(course => course === selectedCourse));

    return matchesSearch && matchesYear && matchesCourse;
  });

  // Handle reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedYear('all');
    setSelectedCourse('all');
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Classmates</h2>
          <p className="text-gray-600 mt-1">Connect with students from your classes</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search classmates..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-10 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
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

          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="all">All Years</option>
            {years.filter(y => y !== 'all').map(year => (
              <option key={year} value={year}>{year} Year</option>
            ))}
          </select>

          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>
            {uniqueCourses.filter(c => c !== 'all').map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          
          {(searchTerm || selectedYear !== 'all' || selectedCourse !== 'all') && (
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500">Loading classmates...</p>
        </div>
      ) : (
        <>
          {/* Results Counter */}
          <p className="mb-4 text-sm text-gray-500">
            Showing {filteredClassmates.length} classmates
            {selectedYear !== 'all' && ` in ${selectedYear} year`}
            {selectedCourse !== 'all' && ` taking ${selectedCourse}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>

          {/* User Grid with overflow */}
          <div className="flex-1 overflow-y-auto" style={{scrollbarWidth: 'thin',scrollbarColor: 'rgba(156, 163, 175, 0.2) rgba(255, 255, 255, 0.5)'}}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
              {filteredClassmates.map(classmate => (
                <div key={classmate.id} className="relative">
                  {/* Using the UserCard component */}
                  <UserCard user={classmate} />
                  
                  {/* Course tags overlay */}
                  <div className="absolute top-0 right-0 p-2 z-10">
                    <div className="bg-white shadow-md rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-xs text-gray-500 mb-1">Courses:</p>
                      <div className="flex flex-wrap gap-1">
                        {classmate.courses.map((course, idx) => (
                          <span 
                            key={idx} 
                            className={`text-xs px-2 py-1 rounded-full cursor-pointer ${
                              selectedCourse === course 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            }`}
                            onClick={() => setSelectedCourse(course)}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredClassmates.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
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
              <h3 className="text-lg font-medium text-gray-900">No classmates found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your filters or search terms.</p>
              <button 
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}