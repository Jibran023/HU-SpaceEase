import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from './Config/database.js';
import studentRoutes from './routes/users.js';

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:5173' }));


// API routes
app.use('/api', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
