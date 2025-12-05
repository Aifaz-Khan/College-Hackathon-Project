import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.route("/")
  .get(protect, getItems)
  .post(protect, createItem);

router.route("/:id")
  .put(protect, updateItem)
  .delete(protect, deleteItem);

export default router;