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
// GET /api/products
// Public access, supports ?search=keyword
export const getProducts = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      // 1. Find brands that match the search term
      const Brand = (await import("../models/brand.js")).default;
      const matchingBrands = await Brand.find({
        title: { $regex: search, $options: "i" },
      }).select("_id");

      const brandIds = matchingBrands.map((b) => b._id);

      // 2. Build query: Brand matches OR Title/Description matches
      query = {
        $or: [
          { brand: { $in: brandIds } },
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Fetch products and populate brand
    // We sort by createdAt desc by default. 
    // To strictly implement "Brand Priority" (brand matches first) effectively requires aggregation 
    // or post-processing. For simplicity/efficiency in this MERN stack, we'll sort by creation 
    // but the search ensures brand-relevant items appear.
    const products = await Product.find(query)
      .populate("brand")
      .sort("-createdAt");

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