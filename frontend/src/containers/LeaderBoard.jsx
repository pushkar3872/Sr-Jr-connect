import React, { useEffect } from 'react';
import { Crown } from 'lucide-react';
import AlluserStore from "../store/AlluserStore.js";

export default function LeaderBoard() {
  const { sortedUsers, getUsersforleaderboard } = AlluserStore();

  useEffect(() => {
    getUsersforleaderboard();
  }, []); // ✅ Only fetch once when component mounts

  // console.log("Sorted Users:", sortedUsers); // ✅ Log after update

  return (
    <div className="hidden bg-base-100 lg:block w-full lg:w-1/4 p-6 shadow-2xl rounded-2xl text-base-content">
      <h3 className="text-2xl font-bold text-primary mb-4 text-center">Leaderboard</h3>

      <div className="space-y-4 scroll-auto">
        {sortedUsers && sortedUsers.length > 0 ? (
          sortedUsers.map((leader, index) => (

            <div
              key={leader._id} // ✅ Use unique `_id` from MongoDB instead of index
              className="flex justify-between items-center p-3 rounded-lg bg-base-300 hover:bg-base-200 transition duration-300 shadow-md"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {
                  index === 0 ? (< Crown className="text-yellow-500" />) : (
                    <span className="text-lg font-semibold whitespace-nowrap">{index + 1}.</span>
                  )
                }
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{leader.fullName}</span>
              </div>

              <span className="px-3 py-1 text-sm font-semibold rounded-lg bg-gray-300">
                {leader.Competitive_Programming?.LeetcodeData?.totalSolved || 0} solved
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading or No Users Found...</p> // ✅ Prevent crash when data is empty/null
        )}
      </div>
    </div>
  );
}
