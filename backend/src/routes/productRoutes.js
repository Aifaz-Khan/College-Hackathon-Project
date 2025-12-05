import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(createProduct);

router.route("/:id")
  .put(updateProduct)
  .delete(deleteProduct);

export default router;