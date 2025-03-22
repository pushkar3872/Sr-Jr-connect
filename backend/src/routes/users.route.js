import express from "express";
import { protectroute } from "../middleware/auth.middleware.js";
import { getAllUsers, getUsersForLead } from "../controllers/usersInDatabase.js";


const usersRouter = express.Router();

usersRouter.get("/batchusers", protectroute, getUsersForLead);
usersRouter.get("/allusers", protectroute, getAllUsers);

export default usersRouter;