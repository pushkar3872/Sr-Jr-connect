import axios from "axios"
import SrJrUser from "../models/UserModel.js"

export const extractUsername = (platformUrl) => {
    try {
        const urlObj = new URL(platformUrl);
        const hostname = urlObj.hostname;
        let pathname = urlObj.pathname.replace(/\/$/, ''); // Remove trailing slash

        if (hostname.includes("codeforces.com")) {
            console.log(pathname.split('/').pop());
            return pathname.split('/').pop();
        }
        else if (hostname.includes("leetcode.com")) {
            const parts = pathname.split('/');
            // Handle cases like `/u/username` and `/username`
            const username = parts.includes("u") ? parts[parts.indexOf("u") + 1] : parts.pop();
            return username;
        }
        else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const fetchLeetcodeData = async function (platformUrl) {
    const username = extractUsername(platformUrl);
    try {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        const response = await axios.get(url);
        if (response.data.status) {
            console.log(
                {
                    username: username,
                    ranking: response.data.ranking || "N/A",
                    totalSolved: response.data.totalSolved || "N/A"
                }
            )
            return {
                username: username,
                ranking: response.data.ranking || "N/A",
                totalSolved: response.data.totalSolved || "N/A"
            };
        }
    } catch (error) {
        return null;
    }
}


// console.log(fetchLeetcodeData("https://leetcode.com/u/pushkar_3872/?form=MT00MG"))

export const getUsersForLead = async (req, res) => {
    try {
        const loggedUserId = req.user.id;
        const LoggedInUser = await SrJrUser.findById(loggedUserId);
        const AllColleagues = await SrJrUser.find({ graduationYear: LoggedInUser.graduationYear }).sort({ "Competitive_Programming.LeetcodeData.totalSolved": - 1 });
        if (!AllColleagues) {

        }

        res.status(200).json(AllColleagues);
    } catch (error) {
        console.log("Error in getusers in leaderboard");
        res.status(500).json({ message: "Internal server error" });
    }
}