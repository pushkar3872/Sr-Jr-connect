import React from 'react'

export default function LeaderBoard() {
  return (
    <div className="w-full md:w-1/4 bg-base-100 p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold text-primary mb-4">Leaderboard</h3>
      <div className="space-y-4">
        {[
          { name: "John Doe", points: "1200 pts", badge: "badge-primary" },
          { name: "Jane Smith", points: "1100 pts", badge: "badge-secondary" },
          { name: "Bob Johnson", points: "1000 pts", badge: "badge-accent" }
        ].map((leader, index) => (
          <div key={index} className="flex justify-between text-base-content">
            <span>{index + 1}. {leader.name}</span>
            <span className={`badge ${leader.badge}`}>{leader.points}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
