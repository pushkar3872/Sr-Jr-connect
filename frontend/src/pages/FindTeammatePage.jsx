import React, { useEffect, useState, useMemo } from "react";
import {
  Instagram,
  Linkedin,
  MessageCircle,
  FlipHorizontal,
  Search,
  X,
  Flame,
  Star,
  Award
} from "lucide-react";
import AlluserStore from "../store/AlluserStore";
import FindTeammatePageSkeleton from "../components/FindTeammatePageSkeleton";
import UserModal from "../components/UserModal"


const Teammate = () => {
  const { users, getAllStudents, isUsersLoading } = AlluserStore();

  // State Management
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [flippedCards, setFlippedCards] = useState({});
  const [sortBy, setSortBy] = useState("name");

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserCardClick = (user) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  // Fetch students on component mount
  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  // WhatsApp Redirect Utility
  const WhatsAppRedirect = (phoneNumber) => {
    if (!phoneNumber) return "#";

    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const defaultCountryCode = "91";

    let formattedNumber = cleanedNumber.length === 10
      ? defaultCountryCode + cleanedNumber
      : cleanedNumber;

    return formattedNumber.length >= 11 && formattedNumber.length <= 15
      ? `https://wa.me/${formattedNumber}`
      : "/";
  };

  // Toggle Card Flip
  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Advanced Filtering and Sorting
  const filteredAndSortedStudents = useMemo(() => {
    let result = users.filter(student => {
      const searchQuery = search.toLowerCase();

      // Comprehensive search across multiple fields
      const matchesSearch =
        student.fullName?.toLowerCase().includes(searchQuery) ||
        student.academicDetails?.domain?.toLowerCase().includes(searchQuery) ||
        student.age?.toString().includes(searchQuery) ||
        student.gender?.toLowerCase().includes(searchQuery) ||
        (Array.isArray(student.skills) &&
          student.skills.some(skill => skill.toLowerCase().includes(searchQuery)));

      // Category-based filtering
      const matchesCategory = selectedCategory === "all" ||
        (selectedCategory === "name" && student.fullName?.toLowerCase().includes(searchQuery)) ||
        (selectedCategory === "domain" && student.academicDetails?.domain?.toLowerCase().includes(searchQuery)) ||
        (selectedCategory === "age" && student.age?.toString().includes(searchQuery)) ||
        (selectedCategory === "gender" && student.gender?.toLowerCase().includes(searchQuery)) ||
        (selectedCategory === "skills" &&
          Array.isArray(student.skills) &&
          student.skills.some(skill => skill.toLowerCase().includes(searchQuery)));

      return matchesSearch && matchesCategory;
    });

    // Sorting logic
    return result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.fullName.localeCompare(b.fullName);
        case "domain":
          return a.academicDetails?.domain.localeCompare(b.academicDetails?.domain);
        case "age":
          return a.age - b.age;
        default:
          return 0;
      }
    });
  }, [users, search, selectedCategory, sortBy]);

  // Reset Search
  const clearSearch = () => {
    setSearch("");
    setSelectedCategory("all");
    setSortBy("name");
  };

  if (isUsersLoading) {
    return <FindTeammatePageSkeleton />
  }

  return (
    <div className="container mx-auto px-4 pt-7 h-[90vh] flex flex-col ">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search teammates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered input-primary w-full pl-10 pr-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary"
              >
                <X />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered select-primary w-full max-w-xs"
          >
            <option value="all">All Categories</option>
            <option value="name">Name</option>
            <option value="domain">Domain</option>
            <option value="age">Age</option>
            <option value="gender">Gender</option>
            <option value="skills">Skills</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-primary w-full max-w-xs"
          >
            <option value="name">Sort by Name</option>
            <option value="domain">Sort by Domain</option>
            <option value="age">Sort by Age</option>
          </select>
        </div>
      </div>

      {/* Students Grid with Scrollable Container */}
      <div className="flex-grow overflow-hidden">
        <div className="p-2 pt-4 h-full overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-6">
          {filteredAndSortedStudents.length > 0 ? (
            filteredAndSortedStudents.map((student) => (
              <div
                key={student._id}
                className="flip-card h-72 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`flip-card-inner h-full ${flippedCards[student._id] ? "flipped" : ""}`}
                >
                  {/* Front Side */}
                  <div className="flip-card-front h-full bg-base-100 shadow-lg rounded-xl p-5 flex flex-col items-center border-2 border-base-300 hover:border-primary transition-all">
                    <div className="relative">
                      <img
                        className="w-28 h-28 rounded-full border-3 border-primary/30 object-cover shadow-md"
                        src={student.profilePicture || "/avatar.png"}
                        alt={student.fullName.trim().split(" ")[0]}
                      />
                      {student.academicDetails?.gpa >= 9.5 && (
                        <div className="absolute bottom-0 right-0 bg-secondary text-secondary-content rounded-full p-1">
                          <Star className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <h2 className="mt-4 text-lg font-bold text-primary text-center line-clamp-2">
                      {student.fullName}
                    </h2>
                    <div className="flex items-center text-base-content/70 mt-2">
                      <Flame className="w-4 h-4 mr-2" />
                      <p className="text-sm">
                        {student.academicDetails?.domain || 'No Domain'}
                      </p>
                    </div>
                    <button
                      className="mt-4 btn btn-primary btn-outline"
                      onClick={() => toggleFlip(student._id)}
                    >
                      Connect
                    </button>
                  </div>

                  {/* Back Side */}
                  <div className="flip-card-back h-full bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-lg rounded-xl p-5 flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold mb-1 text-center line-clamp-2">
                      {student.fullName}
                    </h2>
                    <p className="text-sm font-light mb-3 flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      {student.academicDetails?.Department || 'No Department'}
                    </p>

                    <button
                      onClick={() => handleUserCardClick(student)}
                      className="mt-4 btn btn-outline border-base-100 text-base-100 hover:bg-base-100 hover:text-primary"
                    >
                      View Profile
                    </button>
                    <p className="mt-4 text-lg font-medium">Contact</p>

                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-3">
                      {student.PlatformLinks?.instagram && (
                        <a
                          href={student.PlatformLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center h-10 w-10 border-2 border-base-100 rounded-full hover:bg-base-100 hover:text-primary transition duration-300"
                        >
                          <Instagram />
                        </a>
                      )}

                      {student.Mobnum && (
                        <a
                          href={WhatsAppRedirect(student.Mobnum)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center h-10 w-10 border-2 border-base-100 rounded-full hover:bg-base-100 hover:text-primary transition duration-300"
                        >
                          <svg fill="currentColor"
                            version="1.1" id="Capa_1"
                            viewBox="0 0 30.667 30.667"
                            className="h-6 w-6"
                          >
                            {/* WhatsApp SVG Path */}
                            <g>
                              <path d="M30.667,14.939c0,8.25-6.74,14.938-15.056,14.938c-2.639,0-5.118-0.675-7.276-1.857L0,30.667l2.717-8.017
                                c-1.37-2.25-2.159-4.892-2.159-7.712C0.559,6.688,7.297,0,15.613,0C23.928,0.002,30.667,6.689,30.667,14.939z M15.61,2.382
                                c-6.979,0-12.656,5.634-12.656,12.56c0,2.748,0.896,5.292,2.411,7.362l-1.58,4.663l4.862-1.545c2,1.312,4.393,2.076,6.963,2.076
                                c6.979,0,12.658-5.633,12.658-12.559C28.27,8.016,22.59,2.382,15.61,2.382z M23.214,18.38c-0.094-0.151-0.34-0.243-0.708-0.427
                                c-0.367-0.184-2.184-1.069-2.521-1.189c-0.34-0.123-0.586-0.185-0.832,0.182c-0.243,0.367-0.951,1.191-1.168,1.437
                                c-0.215,0.245-0.43,0.276-0.799,0.095c-0.369-0.186-1.559-0.57-2.969-1.817c-1.097-0.972-1.838-2.169-2.052-2.536
                                c-0.217-0.366-0.022-0.564,0.161-0.746c0.165-0.165,0.369-0.428,0.554-0.643c0.185-0.213,0.246-0.364,0.369-0.609
                                c0.121-0.245,0.06-0.458-0.031-0.643c-0.092-0.184-0.829-1.984-1.138-2.717c-0.307-0.732-0.614-0.611-0.83-0.611
                                c-0.215,0-0.461-0.03-0.707-0.03S9.897,8.215,9.56,8.582s-1.291,1.252-1.291,3.054c0,1.804,1.321,3.543,1.506,3.787
                                c0.186,0.243,2.554,4.062,6.305,5.528c3.753,1.465,3.753,0.976,4.429,0.914c0.678-0.062,2.184-0.885,2.49-1.739
                                C23.307,19.268,23.307,18.533,23.214,18.38z"/>
                            </g>
                          </svg>
                        </a>
                      )}

                      {student.PlatformLinks?.linkedin && (
                        <a
                          href={student.PlatformLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center h-10 w-10 border-2 border-base-100 rounded-full hover:bg-base-100 hover:text-primary transition duration-300"
                        >
                          <Linkedin />
                        </a>
                      )}
                    </div>

                    {/* Back to Front Button */}
                    <button
                      className="mt-4 cursor-pointer btn btn-ghost text-base-100 hover:bg-base-100/20 flex flex-row items-center justify-center"
                      onClick={() => toggleFlip(student._id)}
                    >
                      <FlipHorizontal className="mr-1" />Flip
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center space-y-4 p-10">
              <img
                src="/no-results.svg"
                alt="No results found"
                className="w-64 h-64 opacity-70"
              />
              <p className="text-2xl font-bold text-base-content/70 animate-pulse">
                No teammates found
              </p>
              <button
                onClick={clearSearch}
                className="btn btn-primary"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Flip Card Styles */}
      <style jsx="true">{`
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 0.75rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: hsl(var(--b2));
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: hsl(var(--p));
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--p-focus));
        }
      `}</style>
      {isUserModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          isOpen={isUserModalOpen}
          onClose={() => setUserModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Teammate;