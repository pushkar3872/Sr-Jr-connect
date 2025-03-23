import React, { useEffect, useState } from 'react';
import { Check, Crown, Medal, Award, Trophy, Star, ArrowUpRight } from 'lucide-react';
import AlluserStore from "../store/AlluserStore.js";

export default function LeaderBoard() {
  const { sortedUsers, getUsersforleaderboard } = AlluserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getUsersforleaderboard();
      setIsLoading(false);
    };
    fetchData();
  }, [getUsersforleaderboard]);

  // Function to get appropriate rank icon
  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy className="size-6 text-warning" />;
      case 1:
        return <Medal className="size-6 text-base-content opacity-60" />;
      case 2:
        return <Medal className="size-6 text-warning opacity-70" />;
      default:
        return <span className="flex justify-center items-center size-6 rounded-full bg-base-200 font-bold text-sm">{index + 1}</span>;
    }
  };

  return (
    <div className="hidden bg-base-100 lg:block w-full lg:w-1/4 shadow-2xl rounded-2xl text-base-content h-[85vh] overflow-hidden border border-base-300">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-primary/80 to-secondary/80 p-4 rounded-t-2xl flex items-center justify-between">
        <h3 className="text-2xl font-bold text-primary-content flex items-center gap-2">
          <Crown className="size-6" /> Leaderboard
        </h3>
        <span className="badge badge-secondary text-xs font-medium">Top Coders</span>
      </div>

      {/* Stats summary */}
      <div className="flex justify-between px-6 py-3 bg-base-200/50 border-b border-base-300">
        <div className="text-center">
          <p className="text-xs text-base-content/70">Total Coders</p>
          <p className="font-bold text-lg">{sortedUsers?.length || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-base-content/70">Top Score</p>
          <p className="font-bold text-lg">{sortedUsers?.[0]?.Competitive_Programming?.LeetcodeData?.totalSolved || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-base-content/70">Avg Score</p>
          <p className="font-bold text-lg">
            {sortedUsers && sortedUsers.length
              ? Math.round(sortedUsers.reduce((acc, user) => acc + (user.Competitive_Programming?.LeetcodeData?.totalSolved || 0), 0) / sortedUsers.length)
              : 0}
          </p>
        </div>
      </div>

      {/* Leaderboard list */}
      <div
        className="p-4 space-y-3 max-h-[65vh] overflow-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(156, 163, 175, 0.2) rgba(255, 255, 255, 0.5)' }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="text-base-content/70">Loading top coders...</p>
          </div>
        ) : sortedUsers && sortedUsers.length > 0 ? (
          sortedUsers.map((leader, index) => (
            <div
              key={leader._id}
              className={`relative flex justify-between items-center p-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${index === 0
                  ? "bg-warning/10 border border-warning/30"
                  : index === 1
                    ? "bg-base-200/80 border border-base-300"
                    : index === 2
                      ? "bg-warning/5 border border-warning/20"
                      : "bg-base-200 hover:bg-base-300/50"
                }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {getRankIcon(index)}

                <div className="overflow-hidden">
                  <p className={`font-medium overflow-hidden text-ellipsis whitespace-nowrap w-40 ${index < 3 ? "text-base" : "text-sm"}`}>
                    {leader.fullName}
                  </p>
                  <p className="text-xs text-base-content/70 truncate">
                    {leader.domain || "Developer"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className={`flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-lg ${index === 0
                    ? "bg-warning/20 text-warning-content"
                    : index === 1
                      ? "bg-base-300"
                      : index === 2
                        ? "bg-warning/10"
                        : "bg-base-300"
                  }`}>
                  {leader.Competitive_Programming?.LeetcodeData?.totalSolved || 0}
                  <Check className="size-4" />
                </div>

                {leader.Competitive_Programming?.LeetcodeData?.ranking && (
                  <span className="text-xs text-base-content/70 mt-1 flex items-center">
                    Rank: {leader.Competitive_Programming.LeetcodeData.ranking.toLocaleString()}
                    <ArrowUpRight className="size-3 ml-1" />
                  </span>
                )}
              </div>

              {/* Position indicator for top 3 */}
              {index < 3 && (
                <div className="absolute -top-1 -right-1 size-6 flex items-center justify-center rounded-full bg-primary text-primary-content text-xs font-bold">
                  {index + 1}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-2">
            <Award className="size-12 text-base-content/30" />
            <p className="text-base-content/70">No users found</p>
            <p className="text-xs text-base-content/50">Check back later for updates</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-base-200 p-4 text-center">
        <p className="text-xs text-base-content/70 flex items-center justify-center gap-1">
          <Star className="size-3" /> Based on LeetCode solved problems
        </p>
      </div>
    </div>
  );
}