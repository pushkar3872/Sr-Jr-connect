import React, { useEffect, useState } from 'react';
import { Check, Crown, Medal, Award, Trophy, Star, ArrowUpRight, ChevronDown, Code } from 'lucide-react';
import AlluserStore from "../store/AlluserStore.js";
import LeaderBoardSkeleton from '../components/LeaderBoardSkeleton.jsx';
import UserModal from '../components/UserModal.jsx'; // Import the UserModal component

export default function LeaderBoard() {
  const { sortedUsers, getUsersforleaderboard, isUsersLoading } = AlluserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState('leetcode'); // Default to LeetCode
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  
  // State for UserModal
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getUsersforleaderboard();
      setIsLoading(false);
    };
    fetchData();
  }, [getUsersforleaderboard]);

  // Function to handle user selection and open modal
  const handleOpenUserModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  // Function to get user score based on selected platform
  const getUserScore = (user) => {
    if (selectedPlatform === 'leetcode') {
      return user.Competitive_Programming?.LeetcodeData?.totalSolved || 0;
    } else {
      return user.Competitive_Programming?.CodeforcesData?.rating || 0;
    }
  };

  // Function to get user rank based on selected platform
  const getUserRank = (user) => {
    if (selectedPlatform === 'leetcode') {
      return user.Competitive_Programming?.LeetcodeData?.ranking;
    } else {
      return user.Competitive_Programming?.CodeforcesData?.ranking;
    }
  };

  // Sort users based on the selected platform
  const getSortedUsers = () => {
    if (!sortedUsers) return [];

    // Create a copy to avoid modifying the original data
    const usersCopy = [...sortedUsers];

    // Sort based on selected platform
    if (selectedPlatform === 'leetcode') {
      return usersCopy.sort((a, b) =>
        (b.Competitive_Programming?.LeetcodeData?.totalSolved || 0) -
        (a.Competitive_Programming?.LeetcodeData?.totalSolved || 0)
      );
    } else {
      return usersCopy.sort((a, b) =>
        (b.Competitive_Programming?.CodeforcesData?.rating || 0) -
        (a.Competitive_Programming?.CodeforcesData?.rating || 0)
      );
    }
  };

  // Get platform-specific stats

  // Platform data
  const platforms = [
    { id: 'leetcode', name: 'LeetCode', metric: 'solved problems' },
    { id: 'codeforces', name: 'CodeForces', metric: 'rating' }
  ];

  if (isUsersLoading) {
    return <LeaderBoardSkeleton />;
  }

  const displayUsers = getSortedUsers();
  const currentPlatform = platforms.find(p => p.id === selectedPlatform);

  return (
    <>
      <div className="bg-base-100 md:w-lg lg:block w-full lg:w-1/4 shadow-2xl rounded-2xl text-base-content h-[85vh] overflow-hidden border border-base-300">
        {/* Header with gradient background and platform selector */}
        <div className="bg-gradient-to-r from-primary/80 to-secondary/80 p-3 px-4 rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-primary-content flex items-center gap-2">
              <Crown className="size-6" /> Leaderboard
            </h3>
            <span className="badge badge-secondary text-xs font-medium">{`Total: ${displayUsers.length}`}</span>
          </div>

          {/* Platform Selector */}
          <div className="relative w-full">
            <div
              className="flex items-center justify-between w-full p-2 px-3 rounded-lg bg-primary-content/20 text-primary-content border border-primary-content/30 cursor-pointer"
              onClick={() => setIsSelectorOpen(!isSelectorOpen)}
            >
              <div className="flex items-center gap-2">
                {selectedPlatform === 'leetcode' ? (
                  <div className="size-5 rounded-full bg-warning flex items-center justify-center">
                    <Code className="size-3 text-warning-content" />
                  </div>
                ) : (
                  <div className="size-5 rounded-full bg-info flex items-center justify-center">
                    <Code className="size-3 text-info-content" />
                  </div>
                )}
                <span className="font-medium">{platforms.find(p => p.id === selectedPlatform).name}</span>
              </div>
              <ChevronDown className={`size-4 transition-transform duration-300 ${isSelectorOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isSelectorOpen && (
              <div className="absolute z-10 w-full mt-1 py-1 bg-base-100 border border-base-300 rounded-lg shadow-lg">
                {platforms.map(platform => (
                  <div
                    key={platform.id}
                    className={`flex items-center gap-2 px-3 py-2 hover:bg-base-200 cursor-pointer ${selectedPlatform === platform.id ? 'bg-base-200' : ''}`}
                    onClick={() => {
                      setSelectedPlatform(platform.id);
                      setIsSelectorOpen(false);
                    }}
                  >
                    {platform.id === 'leetcode' ? (
                      <div className="size-5 rounded-full bg-warning flex items-center justify-center">
                        <Code className="size-3 text-warning-content" />
                      </div>
                    ) : (
                      <div className="size-5 rounded-full bg-info flex items-center justify-center">
                        <Code className="size-3 text-info-content" />
                      </div>
                    )}
                    <span className={`${selectedPlatform === platform.id ? 'font-medium' : ''}`}>
                      {platform.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className="p-4 space-y-3 max-h-[67vh] overflow-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(156, 163, 175, 0.2) rgba(255, 255, 255, 0.5)' }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="loading loading-bars loading-lg text-primary"></div>
              <p className="text-base-content/70">Loading top coders...</p>
            </div>
          ) : displayUsers && displayUsers.length > 0 ? (
            displayUsers.map((leader, index) => (
              <div
                key={leader._id}
                className={`relative flex gap-2 justify-between items-center p-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${
                  index === 0
                    ? "bg-warning/10 border border-warning/30"
                    : index === 1
                      ? "bg-base-200/80 border border-base-300"
                      : index === 2
                        ? "bg-warning/5 border border-warning/20"
                        : "bg-base-200 hover:bg-base-300/50"
                }`}
              >
                <div 
                  className="flex items-center gap-3 overflow-hidden cursor-pointer" 
                  onClick={() => handleOpenUserModal(leader)}
                >
                  {getRankIcon(index)}

                  <div className="overflow-hidden">
                    <p className={`font-medium overflow-hidden text-ellipsis whitespace-nowrap ${index < 3 ? "text-base" : "text-sm"}`}>
                      {leader.fullName}
                    </p>
                    <p className="text-xs text-base-content/70 truncate">
                      {leader.academicDetails.Department || "Student"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className={`flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-lg ${
                    index === 0
                      ? "bg-warning/20 text-warning-content"
                      : index === 1
                        ? "bg-base-300"
                        : index === 2
                          ? "bg-warning/10"
                          : "bg-base-300"
                    }`}>
                    {getUserScore(leader)}
                    <Check className="size-4" />
                  </div>

                  {getUserRank(leader) && (
                    <span className="text-xs text-base-content/70 mt-1 flex items-center">
                      {getUserRank(leader).toLocaleString()}
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
        <div className="border-t border-base-200 p-1 text-center">
          <p className="text-xs text-base-content/70 flex items-center justify-center gap-1">
            <Star className="size-3" /> Based on {currentPlatform.name} {currentPlatform.metric}
          </p>
        </div>
      </div>

      {/* User Modal Component */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isOwnProfile={false}
          onSave={() => {}} // Empty function as users can't edit others' profiles
        />
      )}
    </>
  );
}