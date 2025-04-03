import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { app, server } from "./lib/socket.js";

// Import routes
import authRouter from './routes/auth.route.js';
import usersRouter from './routes/users.route.js';
import messageRouter from './routes/message.route.js';

// Import middleware
import { protectroute } from './middleware/auth.middleware.js';

// Import config and utilities
import connectDB from './config/mongodb.js';
import updateLeetcodeStats from './lib/cronjobs.js';

// const app = express();
const PORT = process.env.PORT || 4005;
const IP_ADDRESS = process.env.IP_ADDRESS;

// Middleware setup
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || "http://localhost:5173",
        `http://${IP_ADDRESS}:5173`,  // Fix the incorrect `/`
    ],
    credentials: true, // Allow cookies & authentication
}));




// API routes
app.use("/api/auth", authRouter); // Auth routes are public

// Protected routes - apply protectroute middleware only to routes that need protection
app.use("/api/users", protectroute, usersRouter);
app.use("/api/messages", protectroute, messageRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error",
            status: err.status || 500
        }
    });
});

// 404 route handler for undefined routes
app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Database connection and server startup sequence
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log("MongoDB Connected");

        // Start cron jobs after successful DB connection
        updateLeetcodeStats();
        console.log("LeetCode stats update job scheduled");

        // Start the server //not in use  since using socket.io
        // app.listen(PORT, () => {
        //     console.log(`Server is running on http://localhost:${PORT}`);
        // });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

// Start the server
startServer();

// server.listen(PORT, () => {
//     console.log("server is running on port:" + PORT)
//     // connectDB();
// })

server.listen(PORT, () => {
    console.log(`Server running on http://${IP_ADDRESS}:${PORT}`);
});