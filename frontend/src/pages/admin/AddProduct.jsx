import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "", // We'll handle single image input for now and convert to array
        stock: "",
        brand: "",
        status: "open"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // payload matches backend expectation
            const payload = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                images: [formData.image], // Convert single URL to array
            };

            await axiosClient.post("/api/addproduct", payload);
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ marginBottom: "2rem" }}>Add New Product</h2>

            {error && (
                <div style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    color: "#f87171",
                    padding: "1rem",
                    borderRadius: "8px",
                    marginBottom: "1.5rem"
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-input"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                        <label className="form-label">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            className="form-input"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            className="form-input"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Category</label>
                    <input
                        type="text"
                        name="category"
                        className="form-input"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        className="form-input"
                        value={formData.brand}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        className="form-input"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-input"
                        style={{ minHeight: "100px", resize: "vertical" }}
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Status</label>
                    <select name="status" className="form-input" value={formData.status} onChange={handleChange}>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>

                <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => navigate("/admin/products")}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
