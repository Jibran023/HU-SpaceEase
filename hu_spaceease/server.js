import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./Config/database.js";
import studentRoutes from "./routes/users.js";
import Room from "./routes/rooms.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();
connectDB();

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", studentRoutes);
app.use("/room-api", Room);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
