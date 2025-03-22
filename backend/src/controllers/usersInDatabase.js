import SrJrUser from "../models/UserModel.js"

export const getUsersForLead = async (req, res) => {
    try {
        // debugg
        // if (!req.SrJrUser) {
        //     console.error("Error: req.SrJrUser is undefined. Check authentication middleware.");
        //     return res.status(401).json({ message: "Unauthorized - User not found" });
        // }
        
        const loggedUserId = req.SrJrUser.id;
        const LoggedInUser = await SrJrUser.findById(loggedUserId);

        if (!LoggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const AllColleagues = await SrJrUser.find({
            graduationYear: LoggedInUser.graduationYear
        }).sort({ "Competitive_Programming.LeetcodeData.totalSolved": -1 }).select("-password");

        if (!AllColleagues.length) {
            return res.status(404).json({ message: "No colleagues found" });
        }
        res.status(200).json(AllColleagues);
    } catch (error) {
        console.error("Error in getUsersForLead:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const loggedUserId = req.SrJrUser.id;
        const LoggedInUser = await SrJrUser.findById(loggedUserId);

        if (!LoggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const AllColleagues = await SrJrUser.find({ _id: { $ne: loggedUserId } }).select("-password");

        if (!AllColleagues.length) {
            return res.status(404).json({ message: "No colleagues found" });
        }

        res.status(200).json(AllColleagues);
    } catch (error) {
        console.error("Error in getUsersForLead:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}