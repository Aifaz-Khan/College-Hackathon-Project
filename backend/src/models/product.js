import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: "open" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: { type: Array, required: true },
    stock: { type: Number, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;