import mongoose from "mongoose";
import cron from "node-cron";
import axios from "axios";
import SrJrUser from "../models/UserModel.js";

const extractUsername = (platformUrl) => {
    try {
        if (!platformUrl || platformUrl == "") {
            return null;
        }
        const urlObj = new URL(platformUrl);
        const hostname = urlObj.hostname;
        let pathname = urlObj.pathname.replace(/\/$/, ''); // Remove trailing slash

        if (hostname.includes("codeforces.com")) {
            return pathname.split('/').pop();
        } else if (hostname.includes("leetcode.com")) {
            const parts = pathname.split('/');
            return parts.includes("u") ? parts[parts.indexOf("u") + 1] : parts.pop();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error extracting username:", error.message);
        return null;
    }
};

// Function to fetch Leetcode stats
const fetchLeetcodeStats = async (username) => {
    try {
        const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch Leetcode stats for ${username}:`, error.message);
        return null;
    }
};

// Function to update Leetcode stats for all users
const updateLeetcodeStats = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log("MongoDB not connected yet. Retrying...");
            return;
        }

        const users = await SrJrUser.find({ "PlatformLinks.leetcode": { $exists: true } });
        // debugg
        console.log(`Found ${users.length} users with Leetcode links.`);

        const bulkOps = [];
        const userswithnoleetcode = [];

        for (const user of users) {
            const username = extractUsername(user.PlatformLinks.leetcode);
            if (!username) {
                userswithnoleetcode.push({
                    updateOne: {
                        filter: { _id: user._id },
                        update: {
                            $set: {
                                "Competitive_Programming.LeetcodeData": {
                                    username: null,
                                    ranking: null,
                                    totalSolved: 0
                                }
                            }
                        }
                    }
                })
                continue;
            }

            // console.log(`Fetching Leetcode data for: ${username}`);
            const leetcodeData = await fetchLeetcodeStats(username);

            if (leetcodeData) {
                bulkOps.push({
                    updateOne: {
                        filter: { _id: user._id },
                        update: {
                            $set: {
                                "Competitive_Programming.LeetcodeData": {
                                    username: username,
                                    ranking: leetcodeData.ranking || "N/A",
                                    totalSolved: leetcodeData.totalSolved || 0
                                }
                            }
                        }
                    }
                });
            }
        }
        await SrJrUser.bulkWrite(userswithnoleetcode);
        if (bulkOps.length > 0) {
            await SrJrUser.bulkWrite(bulkOps);
            console.log("Leetcode stats updated successfully for all users.");
        } else {
            console.log("No updates were made.");
        }
    } catch (error) {
        console.error("Error updating Leetcode stats:", error.message);
    }
};

// Schedule the job to run every day at midnight
cron.schedule("0 */6 * * *", updateLeetcodeStats);

export default updateLeetcodeStats;
