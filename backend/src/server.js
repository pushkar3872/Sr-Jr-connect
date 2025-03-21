import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRouter from './routes/auth.route.js';
import bodyParser from 'body-parser';
import usersRouter from './routes/users.route.js';
import updateLeetcodeStats from './lib/cronjobs.js';
import mongoose from 'mongoose';
import messageRouter from './routes/message.route.js';

const app = express();
const PORT = process.env.PORT || 4005;

connectDB(); // Connect to MongoDB first

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// API ENDPOINTS
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/messages", messageRouter);

// ✅ Ensure updateLeetcodeStats runs only after MongoDB is connected
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected. Starting Leetcode stats update...");
    updateLeetcodeStats(); // Now it's safe to run
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
