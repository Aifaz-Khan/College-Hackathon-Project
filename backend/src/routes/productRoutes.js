import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// POST /api/addproduct
router.post("/addproduct", async (req, res) => {
  try {
    const { title, description, price, category, images, stock, brand, status } = req.body ?? {};

    // Basic validation
    if (!title || !price || !category || !images || !stock) {
      return res.status(400).json({
        error: "title, price, category, images, and stock are required fields.",
      });
    }

    const productData = {
      title: String(title).trim(),
      description: description?.trim() || "",
      price: Number(price),
      category: String(category).trim(),
      images: Array.isArray(images) ? images : [images],
      stock: Number(stock),
      brand: brand || null,
      status: status || "open",
    };

    const product = await Product.create(productData);

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});





// GET /api/products → return all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("brand");        // optional (returns full brand object)

    res.status(200).json({
      message: "All products fetched",
      products
    });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});




export default router;
