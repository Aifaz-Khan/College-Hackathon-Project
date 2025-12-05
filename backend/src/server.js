import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// test route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});
import { errorHandler } from "./middleware/errorHandler.js";
//Api Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
