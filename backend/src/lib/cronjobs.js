import mongoose from "mongoose";
import cron from "node-cron";
import axios from "axios";
import SrJrUser from "../models/UserModel.js";

// Extract usernames from platform URLs
const extractUsername = (platformUrl) => {
    try {
        if (!platformUrl || platformUrl === "") return null;

        const urlObj = new URL(platformUrl);
        const hostname = urlObj.hostname;
        let pathname = urlObj.pathname.replace(/\/$/, '');

        if (hostname.includes("codeforces.com")) {
            return pathname.split('/').pop();
        } else if (hostname.includes("leetcode.com")) {
            const parts = pathname.split('/');
            return parts.includes("u") ? parts[parts.indexOf("u") + 1] : parts.pop();
        } else {
            console.log(`Unrecognized platform: ${hostname}`);
            return null;
        }
    } catch (error) {
        console.error("Error extracting username:", error);
        return null;
    }
};

// Fetch Leetcode Stats
const fetchLeetcodeStats = async (username) => {
    try {
        const LEETCODE_API_URLS = [
            `https://leetcode-stats-api.herokuapp.com/${username}`,
            `https://leetcode-api-faisalm.vercel.app/${username}`
        ];

        for (const apiUrl of LEETCODE_API_URLS) {
            try {
                const response = await axios.get(apiUrl, { timeout: 5000 });
                return response.data;
            } catch (apiError) {
                console.error(`Leetcode API failed: ${apiUrl}`, apiError.message);
            }
        }

        return {
            status: "error",
            message: "All Leetcode APIs failed"
        };
    } catch (error) {
        console.error("Leetcode fetch error:", error);
        return { status: "error", message: error.message };
    }
};

// 🔥 New: Fetch Codeforces Stats
const fetchCodeforcesStats = async (username) => {
    try {
        const url = `https://codeforces.com/api/user.info?handles=${username}`;
        const response = await axios.get(url, { timeout: 5000 });

        if (response.data && response.data.status === "OK") {
            const userInfo = response.data.result[0];
            return {
                username: userInfo.handle,
                rating: userInfo.rating || 0,
                rank: userInfo.rank || "Unrated",
                maxRating: userInfo.maxRating || 0
            };
        } else {
            console.error(`Invalid response for Codeforces: ${username}`);
            return null;
        }
    } catch (error) {
        console.error(`Codeforces fetch error for ${username}:`, error.message);
        return null;
    }
};

// Update stats for all users
const updateLeetcodeStats = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log("MongoDB not connected. Skipping...");
            return;
        }

        const users = await SrJrUser.find({
            $or: [
                { "PlatformLinks.leetcode": { $exists: true, $ne: "" } },
                { "PlatformLinks.codeforces": { $exists: true, $ne: "" } }
            ]
        });

        console.log(`Found ${users.length} users with platform links.`);

        const bulkOps = [];

        for (const user of users) {
            const updates = {};

            // Leetcode
            const leetcodeLink = user.PlatformLinks.leetcode;
            const leetcodeUsername = extractUsername(leetcodeLink);
            if (leetcodeUsername) {
                const leetData = await fetchLeetcodeStats(leetcodeUsername);
                if (leetData && leetData.totalSolved !== undefined) {
                    updates["Competitive_Programming.LeetcodeData"] = {
                        username: leetcodeUsername,
                        ranking: leetData.ranking || "N/A",
                        totalSolved: leetData.totalSolved || 0
                    };
                }
            }

            // Codeforces
            const codeforcesLink = user.PlatformLinks.codeforces;
            const codeforcesUsername = extractUsername(codeforcesLink);
            if (codeforcesUsername) {
                const cfData = await fetchCodeforcesStats(codeforcesUsername);
                if (cfData) {
                    updates["Competitive_Programming.CodeforcesData"] = {
                        username: cfData.username,
                        // rating: cfData.rating,
                        ranking: cfData.rank,
                        // maxRating: cfData.maxRating
                        rating: cfData.maxRating
                    };
                }
            }

            if (Object.keys(updates).length > 0) {
                bulkOps.push({
                    updateOne: {
                        filter: { _id: user._id },
                        update: { $set: updates }
                    }
                });
            }
        }

        if (bulkOps.length > 0) {
            await SrJrUser.bulkWrite(bulkOps);
            console.log(`✅ Stats updated for ${bulkOps.length} users`);
        } else {
            console.log("No updates needed");
        }

        return users;
    } catch (error) {
        console.error("Error in update job:", error);
    }
};

// ⏲️ Cron job (6-hour schedule)
cron.schedule("0 */6 * * *", () => {
    console.log("🔁 Running scheduled update job");
    updateLeetcodeStats().catch(err => {
        console.error("Scheduled update error:", err);
    });
});

// Uncomment this to run immediately
// updateLeetcodeStats().catch(err => console.error("Initial update error:", err));

export default updateLeetcodeStats;
