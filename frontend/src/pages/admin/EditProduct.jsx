import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Loading initial data
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
        brand: "",
        status: "open"
    });

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await axiosClient.get(`/api/products/${id}`);
            setFormData({
                title: data.title || "",
                description: data.description || "",
                price: data.price || "",
                category: data.category || "",
                image: data.images && data.images.length > 0 ? data.images[0] : "",
                stock: data.stock || "",
                brand: data.brand?.name || data.brand || "", // Handle populated object or string
                status: data.status || "open"
            });
        } catch (err) {
            console.error(err);
            setError("Failed to fetch product details");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                images: [formData.image],
            };

            await axiosClient.put(`/api/editproduct/${id}`, payload);
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to update product");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div style={{ padding: "2rem", textAlign: "center" }}>Loading product...</div>;

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ marginBottom: "2rem" }}>Edit Product</h2>

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
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                        disabled={submitting}
                    >
                        {submitting ? "Saving..." : "Update Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
