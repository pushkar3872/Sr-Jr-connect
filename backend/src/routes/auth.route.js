import express from "express";
import { register, login, updateProfile, logout, checkAuth } from "../controllers/authController.js";

const authRouter = express.Router();

// Register route
authRouter.post("/register", register);

// Login route
authRouter.post("/login", login);

// Logout route
authRouter.post("/logout", logout);

// Profile route
// authRouter.get("/profile", checkAuth);

export default authRouter;