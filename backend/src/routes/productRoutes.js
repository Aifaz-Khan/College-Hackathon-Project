import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Public route
router.route("/").get(getProducts);

// Protected routes
router.route("/").post(protect, createProduct);

router.route("/:id")
  .put(updateProduct)
  .delete(deleteProduct);

export default router;