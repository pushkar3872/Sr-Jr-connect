import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';

const app = express();

const PORT = process.env.PORT || 4005;
connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Routes
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});