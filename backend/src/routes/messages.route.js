import express from "express";
import { protectroute } from "../middleware/auth.middleware.js";
import { getUsersForLead } from "../controllers/LeaderboardController.js";


const MessageRoute = express.Router();

MessageRoute.get("/Users", protectroute, getUsersForLead);

export default MessageRoute;