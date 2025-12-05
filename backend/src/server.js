import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

import Brand from "./models/brand.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
connectDB();

// Middlewares
app.use(cors());                    // allow frontend to connect
app.use(express.json());            // parse JSON body
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.use("/api", productRoutes);

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});






app.post("/api/addbrand", async (req, res) => {
  try {
    const { name, priority } = req.body;

    const brand = await Brand.create({
      name,
      priority: priority || 0
    });

    res.status(201).json({
      message: "Brand created",
      brand
    });
  } catch (err) {
    console.error("Brand error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});






import User from "./models/User.js";
import Product from "./models/product.js";

// GET /api/stats
app.get("/api/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = 0; // Mock for now

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------- SERVER -----------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
