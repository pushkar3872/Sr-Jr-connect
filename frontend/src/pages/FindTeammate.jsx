FindTeammate.jsx

import React, { useState } from "react";

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Web Developer",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    email: "alice@example.com",
    more: "Loves React and Tailwind CSS",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    email: "bob@example.com",
    more: "Passionate about design and creativity",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "charlie@example.com",
    more: "Enjoys problem-solving and clean code",
  },
  {
    id: 4,
    name: "Diana Prince",
    role: "Data Scientist",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    email: "diana@example.com",
    more: "Expert in machine learning and AI",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    role: "Backend Developer",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    email: "ethan@example.com",
    more: "Focused on building scalable systems",
  },
  {
    id: 6,
    name: "Fiona Davis",
    role: "AI Specialist",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    email: "fiona@example.com",
    more: "Works on innovative AI projects",
  },
  {
    id: 7,
    name: "George Wilson",
    role: "Cybersecurity Expert",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    email: "george@example.com",
    more: "Protects systems from security threats",
  },
  {
    id: 8,
    name: "Hannah Lee",
    role: "Machine Learning Engineer",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    email: "hannah@example.com",
    more: "Develops ML models for various applications",
  },
  {
    id: 9,
    name: "Ian Wright",
    role: "Game Developer",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    email: "ian@example.com",
    more: "Passionate about interactive experiences",
  },
  {
    id: 10,
    name: "Jasmine Carter",
    role: "Cloud Engineer",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    email: "jasmine@example.com",
    more: "Specializes in cloud infrastructure and services",
  },
  // 10 more sample entries
  {
    id: 11,
    name: "Kevin Parker",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    email: "kevin@example.com",
    more: "Enjoys working with both front and back end",
  },
  {
    id: 12,
    name: "Laura Green",
    role: "Graphic Designer",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    email: "laura@example.com",
    more: "Creates stunning visuals and designs",
  },
  {
    id: 13,
    name: "Michael Scott",
    role: "DevOps Engineer",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    email: "michael@example.com",
    more: "Optimizes development processes and pipelines",
  },
  {
    id: 14,
    name: "Nancy Drew",
    role: "Digital Marketer",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    email: "nancy@example.com",
    more: "Expert in online marketing strategies",
  },
  {
    id: 15,
    name: "Oliver Queen",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    email: "oliver@example.com",
    more: "Leads teams and product vision",
  },
  {
    id: 16,
    name: "Pam Beesly",
    role: "Data Analyst",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    email: "pam@example.com",
    more: "Turns data into actionable insights",
  },
  {
    id: 17,
    name: "Quentin Tarantino",
    role: "Content Writer",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    email: "quentin@example.com",
    more: "Writes engaging and creative content",
  },
  {
    id: 18,
    name: "Rachel Green",
    role: "Software Tester",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    email: "rachel@example.com",
    more: "Ensures software quality and performance",
  },
  {
    id: 19,
    name: "Samuel Jackson",
    role: "Network Engineer",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    email: "samuel@example.com",
    more: "Maintains robust network infrastructure",
  },
  {
    id: 20,
    name: "Tina Turner",
    role: "Tech Support Specialist",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
    email: "tina@example.com",
    more: "Provides exceptional technical support",
  },
];

const Teammate = () => {
  const [search, setSearch] = useState("");

  // Filter students based on their role/domain
  const filteredStudents = students.filter((student) =>
    student.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Instruction Text */}
      <div className="text-center mb-4">
        <p className="text-xl font-semibold">
          Find a teammate with your desired domain
        </p>
      </div>
      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by domain..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.id} className="flip-card h-72">
              <div className="flip-card-inner h-full">
                {/* Front Side */}
                <div className="flip-card-front h-full bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  <img
                    className="w-24 h-24 rounded-full border-4 border-blue-500"
                    src={student.image}
                    alt={student.name}
                  />
                  <h2 className="mt-4 text-lg font-bold">{student.name}</h2>
                  <p className="text-gray-600">{student.role}</p>
                  <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg transform hover:scale-105 hover:bg-blue-600 transition duration-300">
                    Connect
                  </button>
                </div>
                {/* Back Side */}
                <div className="flip-card-back h-full bg-blue-500 text-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center">
                  <h2 className="text-lg font-bold">More Info</h2>
                  <p className="mt-2">{student.email}</p>
                  <p className="mt-2">{student.more}</p>
                  <button className="mt-3 px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64 col-span-full">
  <p className="text-center text-gray-600 text-xl font-bold animate-bounce">
    Oops! Couldn't find you teammates.
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
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
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
