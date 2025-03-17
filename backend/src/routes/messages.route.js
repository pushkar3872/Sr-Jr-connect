import express from "express";
import { protectroute } from "../middleware/auth.middleware.js";
import { getAllUsers, getUsersForLead } from "../controllers/LeaderboardController.js";


const MessageRoute = express.Router();

MessageRoute.get("/competusers", protectroute, getUsersForLead);
MessageRoute.get("/allusers", protectroute, getAllUsers);
export default MessageRoute;