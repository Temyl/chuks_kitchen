import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import foodRoutes from "./route/food.route";
import userRoutes from "./route/user.route";


dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/foods", foodRoutes);
app.use("/api/users", userRoutes);


// Port & MongoDB URI
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env");
}

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));