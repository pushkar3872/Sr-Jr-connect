import express from "express";
import { register, login, updateProfile, logout, checkAuth, deleteSrJruser } from "../controllers/authController.js";
import { protectroute } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

// Register route
authRouter.post("/register", register);

// Login route
authRouter.post("/login", login);

// Logout route
authRouter.post("/logout", logout);

// Profile route
authRouter.get("/check", protectroute, checkAuth);

authRouter.delete("/delete", deleteSrJruser);

// Update profile route
authRouter.put("/update", protectroute, updateProfile);


export default authRouter;