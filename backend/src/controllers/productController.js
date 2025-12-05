import Product from "../models/product.js";

// POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ createdBy: req.user._id }).sort("-createdAt");
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};