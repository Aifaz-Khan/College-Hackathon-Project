import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,

    },
    { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;