import Item from "../models/product.js";

// POST /api/items
export const createItem = async (req, res, next) => {
  try {
    const item = await Item.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// GET /api/items
export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({ createdBy: req.user._id }).sort("-createdAt");
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// PUT /api/items/:id
export const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/items/:id
export const deleteItem = async (req, res, next) => {
  try {
    await Item.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};