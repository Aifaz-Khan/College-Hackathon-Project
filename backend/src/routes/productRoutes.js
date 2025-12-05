import express from "express";
import Product from "../models/product.js";
import mongoose from "mongoose";

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

// GET /api/products/:id → return single product
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("brand");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/editproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const updates = { ...req.body };

    // Convert images into array if it's a single string
    if (updates.images && !Array.isArray(updates.images)) {
      updates.images = [updates.images];
    }

    // Numeric conversions
    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.stock !== undefined) updates.stock = Number(updates.stock);

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,           // return updated doc
      runValidators: true  // validate against schema
    }).populate("brand");

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (err) {
    console.error("Edit product error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
