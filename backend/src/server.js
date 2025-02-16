import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRouter from './routes/auth.route.js';
import { protectroute } from './middleware/auth.middleware.js';

const app = express();

const PORT = process.env.PORT || 4005;
connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: " http://localhost:5173",
    credentials: true
}));

// API ENDPOINT
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/auth", authRouter)



// Routes
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});