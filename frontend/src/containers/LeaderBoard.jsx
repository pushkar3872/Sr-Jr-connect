import React from 'react';
import { Crown } from 'lucide-react';

export default function LeaderBoard() {
  const leaders = [
    { name: "John Doe", points: "1200 pts", badge: "badge badge-warning", icon: <Crown className="text-yellow-500" /> },
    { name: "Jane Smith", points: "1100 pts", badge: "badge badge-neutral" },
    { name: "Bob Johnson", points: "1000 pts", badge: "badge badge-secondary" }
  ];

  return (
    <div className="hidden bg-base-100 md:block w-full md:w-1/4  p-6 shadow-2xl rounded-2xl  text-base-content">
      <h3 className="text-2xl font-bold text-primary mb-4 text-center">Leaderboard</h3>
      <div className="space-y-4">
        {leaders.map((leader, index) => (
          <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-base-300 hover:bg-base-200 transition duration-300 shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{index + 1}.</span>
              {index === 0 && leader.icon}
              <span>{leader.name}</span>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${leader.badge}`}>{leader.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
