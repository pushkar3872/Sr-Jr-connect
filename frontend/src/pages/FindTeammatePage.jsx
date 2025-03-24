import React, { useEffect, useState } from "react";
import { Instagram, Linkedin, MessageCircle, FlipHorizontal, Link } from "lucide-react";
import AlluserStore from "../store/AlluserStore";

const Teammate = () => {
  const { users, getAllStudents } = AlluserStore();

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the flip state for the clicked card
    }));
  };

  // Filtering logic - fixed to properly filter and create a new array
  const filteredStudents = users.filter((student) => {
    const searchQuery = search.toLowerCase();
    switch (selectedCategory) {
      case "all":
        return (
          student.fullName?.toLowerCase().includes(searchQuery) ||
          student.domain?.toLowerCase().includes(searchQuery) ||
          student.age?.toString().includes(searchQuery) ||
          student.gender?.toLowerCase().includes(searchQuery) ||
          (Array.isArray(student.skills) && student.skills.some(skill => 
            skill.toLowerCase().includes(searchQuery)))
        );
      case "name":
        return student.fullName?.toLowerCase().includes(searchQuery);
      case "domain":
        return student.academicDetails.domain?.toLowerCase().includes(searchQuery);
      case "age":
        return student.age?.toString().includes(searchQuery);
      case "gender":
        return student.gender?.toLowerCase().includes(searchQuery);
      case "skills":
        return Array.isArray(student.skills) && student.skills.some(skill => 
          skill.toLowerCase().includes(searchQuery));
      default:
        return false;
    }
  });

  return (
    <div className="container mx-auto px-4 pt-2">
      {/* Instruction Text */}
      <div className="text-center mb-4">
        <p className="text-xl font-semibold text-primary">
          Find a teammate with your desired domain
        </p>
      </div>

      {/* Search Bar & Dropdown */}
      <div className="flex justify-center items-center mb-6 space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="domain">domain</option>
          <option value="age">Age</option>
          <option value="gender">Gender</option>
          <option value="skills">Skills</option>
        </select>
      </div>

      {/* Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 m-2">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student._id} className="flip-card h-72">
              <div
                className={`flip-card-inner h-full ${flippedCards[student._id] ? "flipped" : ""
                  }`}
              >
                {/* Front Side */}
                <div className="flip-card-front h-full bg-base-100 shadow-lg rounded-lg p-4 flex flex-col items-center border border-primary">
                  <img
                    className="w-24 h-24 rounded-full border-2 border-primary"
                    src={student.profilePicture || "/avatar.png"}
                    alt={student.fullName}
                  />
                  <h2 className="mt-4 text-lg font-bold text-primary text-center">
                    {student.fullName}
                  </h2>
                  <p className="text-secondary">{student.academicDetails.domain}</p>
                  <button
                    className="mt-3 btn btn-primary"
                    onClick={() => toggleFlip(student._id)}
                  >
                    Connect
                  </button>
                </div>

                {/* Back Side */}
                <div className="flip-card-back h-full bg-primary text-base-100 shadow-lg rounded-lg p-4 flex flex-col items-center justify-center">
                  <h2 className="text-lg font-bold">{student.fullName}</h2>
                  <h1 className="text-sm font-light">{student.academicDetails.Department}</h1>
                  
                  {/* View Profile Button */}
                  <a
                    href={`/profile/${student._id}`}
                    className="mt-4 btn btn-outline border-base-100 text-base-100 hover:bg-base-100 hover:text-primary"
                  >
                    View Full Profile
                  </a>

                  <p className="mt-4 text-lg font-medium">Contact</p>

                  {/* Social Icons */}
                  <div className="flex space-x-4 mt-3">
                    <a
                      href={student.PlatformLinks?.instagram || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-10 w-10 border-2 border-base-100 rounded-full hover:bg-base-100 hover:text-primary transition duration-300"
                    >
                      <Instagram />
                    </a>

                    <a
                      href={student.PlatformLinks?.Mobnum || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-10 w-10 border-2 border-base-100 rounded-full hover:bg-base-100 hover:text-primary transition duration-300"
                    >
                      <MessageCircle />
                    </a>
                    <a
                      href={student.PlatformLinks?.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-10 w-10 border-2 border-base-100 rounded-full hover:bg-base-100 hover:text-primary transition duration-300"
                    >
                      <Linkedin />
                    </a>
                  </div>

                  {/* Back to Front Button */}
                  <button
                    className="mt-4 cursor-pointer btn btn-ghost flex flex-row items-center justify-center"
                    onClick={() => toggleFlip(student._id)}
                  >
                    <FlipHorizontal className="mr-1" />Flip
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64 col-span-full">
            <p className="text-center text-error text-xl font-bold animate-bounce">
              Oops! Couldn't find your teammates.
            </p>
          </div>
        )}
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
          border-radius: 0.5rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Teammate;