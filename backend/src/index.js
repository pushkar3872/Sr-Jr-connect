import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { app, server } from "./lib/socket.js"; // Importing server from socket.js
import path from "path";

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
const __dirname = path.resolve();
const PORT = process.env.PORT || 4005;
const IP_ADDRESS = process.env.IP_ADDRESS;

// Middleware setup
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cookieParser());

// Allow all origins for CORS (adjust as necessary for production)
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true); // Allow all origins
    },
    credentials: true,
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

// Serve static files (your frontend app)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Fallback route for any other requests (catch-all for React)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

// Database connection 
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log("MongoDB Connected");

        // Start cron jobs after successful DB connection
        updateLeetcodeStats();
        console.log("LeetCode stats update job scheduled");
    } catch (error) {
        console.error("Failed in connectdb  :", error);
        process.exit(1);
    }
};

// Start the server
startServer();

// Listen for HTTPS requests and Socket.IO connections
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
