import mongoose from "mongoose";
import cron from "node-cron";
import axios from "axios";
import SrJrUser from "../models/UserModel.js";

const extractUsername = (platformUrl) => {
    try {
        if (!platformUrl || platformUrl === "") {
            return null;
        }
        // Add more logging for debugging
        // console.log(`Extracting username from: ${platformUrl}`);
        
        const urlObj = new URL(platformUrl);
        const hostname = urlObj.hostname;
        let pathname = urlObj.pathname.replace(/\/$/, ''); // Remove trailing slash
        
        // console.log(`Hostname: ${hostname}, Pathname: ${pathname}`);
        
        if (hostname.includes("codeforces.com")) {
            const username = pathname.split('/').pop();
            // console.log(`Extracted Codeforces username: ${username}`);
            return username;
        } else if (hostname.includes("leetcode.com")) {
            const parts = pathname.split('/');
            const username = parts.includes("u") ? parts[parts.indexOf("u") + 1] : parts.pop();
            // console.log(`Extracted Leetcode username: ${username}`);
            return username;
        } else {
            console.log(`Unrecognized platform: ${hostname}`);
            return null;
        }
    } catch (error) {
        console.error("Error extracting username:", error);
        return null;
    }
};

// Function to fetch Leetcode stats with better error handling
const fetchLeetcodeStats = async (username) => {
    try {
        console.log(`Fetching Leetcode stats for: ${username}`);
        
        // Test alternative APIs if the Heroku one fails
        const LEETCODE_API_URLS = [
            `https://leetcode-stats-api.herokuapp.com/${username}`,
            `https://leetcode-api-faisalm.vercel.app/${username}`,
            // Add more alternative APIs if available
        ];
        
        // Try each API endpoint until one works
        for (const apiUrl of LEETCODE_API_URLS) {
            try {
                // console.log(`Trying API endpoint: ${apiUrl}`);
                const response = await axios.get(apiUrl, { 
                    timeout: 5000,  // Set a reasonable timeout
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });
                // console.log(`Success from: ${apiUrl}`);
                return response.data;
            } catch (apiError) {
                console.error(`API ${apiUrl} failed:`, apiError.message);
                // Continue to the next API endpoint
            }
        }
        
        // If we get here, all API attempts failed
        console.error(`All API endpoints failed for username: ${username}`);
        return {
            status: "error",
            message: "All API endpoints failed"
        };
    } catch (error) {
        console.error(`Failed to fetch Leetcode stats for ${username}:`, error);
        return {
            status: "error", 
            message: error.message,
            username: username
        };
    }
};

// Function to update Leetcode stats for all users
const updateLeetcodeStats = async () => {
    try {
        // console.log("Starting Leetcode stats update job...");
        
        if (mongoose.connection.readyState !== 1) {
            console.log("MongoDB not connected yet. Retrying...");
            return;
        }
        
        const users = await SrJrUser.find({ "PlatformLinks.leetcode": { $exists: true, $ne: "" } });
        console.log(`Found ${users.length} users with Leetcode links.`);
        
        // Commented out all checking except fetching users
        const bulkOps = [];
        const usersWithNoLeetcode = [];
        let successCount = 0;
        let errorCount = 0;
        
        for (const user of users) {
            try {
                // console.log(`Processing user: ${user.email || user._id}`);
                const username = extractUsername(user.PlatformLinks.leetcode);
                
                if (!username) {
                    // console.log(`No valid username extracted for user: ${user.email || user._id}`);
                    usersWithNoLeetcode.push({
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
                    });
                    continue;
                }
                
                const leetcodeData = await fetchLeetcodeStats(username);
                
                if (leetcodeData && leetcodeData.totalSolved !== undefined) {
                    console.log(`Successfully fetched data for ${username}: ${leetcodeData.totalSolved} problems solved`);
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
                    successCount++;
                } else {
                    console.log(`Failed to fetch valid data for ${username}`);
                    errorCount++;
                }
            } catch (userError) {
                console.error(`Error processing user ${user.email || user._id}:`, userError);
                errorCount++;
            }
        }
        
        // Update users with no valid Leetcode username
        if (usersWithNoLeetcode.length > 0) {
            console.log(`Updating ${usersWithNoLeetcode.length} users with no valid Leetcode usernames`);
            await SrJrUser.bulkWrite(usersWithNoLeetcode);
        }
        
        // Update users with valid Leetcode data
        if (bulkOps.length > 0) {
            // console.log(`Updating ${bulkOps.length} users with Leetcode data`);
            await SrJrUser.bulkWrite(bulkOps);
            console.log("Leetcode stats updated successfully.");
        } else {
            console.log("No Leetcode data updates were made.");
        }
        
        // console.log(`Update job completed. Success: ${successCount}, Errors: ${errorCount}`);
       
        // Only keeping the user fetching part
        console.log("Users fetched successfully");
        return users;
    } catch (error) {
        console.error("Error in Leetcode update job:", error);
    }
};

// Commenting out cron job
// Schedule the job to run every 6 hours
cron.schedule("0 */6 * * *", () => {
    console.log("Running scheduled Leetcode stats update");
    updateLeetcodeStats().catch(err => {
        console.error("Scheduled job error:", err);
    });
});

// // Run immediately on module import
// console.log("Initializing Leetcode stats module");
// updateLeetcodeStats().catch(err => {
//     console.error("Initial update error:", err);
// });

export default updateLeetcodeStats;