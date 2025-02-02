import React from 'react'

export default function LeaderBoard() {
  return (
    <div>
      <div className="w-full md:w-1/4 bg-base-100 p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-primary mb-4">Leaderboard</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-base-content">
            <span>1. John Doe</span>
            <span className="badge badge-primary">1200 pts</span>
          </div>
          <div className="flex justify-between text-base-content">
            <span>2. Jane Smith</span>
            <span className="badge badge-secondary">1100 pts</span>
          </div>
          <div className="flex justify-between text-base-content">
            <span>3. Bob Johnson</span>
            <span className="badge badge-accent">1000 pts</span>
          </div>
        </div>
      </div>
      
    </div>
  )
}
