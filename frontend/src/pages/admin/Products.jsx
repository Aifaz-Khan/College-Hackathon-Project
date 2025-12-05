import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Re-using the public products API for now
            const { data } = await axiosClient.get("/api/products");
            setProducts(data.products || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axiosClient.delete(`/api/deleteproduct/${id}`);
                // Remove from state immediately to update UI without re-fetch
                setProducts(products.filter(p => p._id !== id));
            } catch (err) {
                console.error("Delete failed", err);
                alert("Failed to delete product");
            }
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2>Manage Products</h2>
                <Link to="/admin/add-product" className="btn btn-primary" style={{ textDecoration: "none" }}>Add Product</Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", color: "#e2e8f0" }}>
                        <thead>
                            <tr style={{ textAlign: "left", background: "#1e293b" }}>
                                <th style={{ padding: "1rem" }}>Title</th>
                                <th style={{ padding: "1rem" }}>Brand</th>
                                <th style={{ padding: "1rem" }}>Price</th>
                                <th style={{ padding: "1rem" }}>Stock</th>
                                <th style={{ padding: "1rem" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    <td style={{ padding: "1rem" }}>{product.title}</td>
                                    <td style={{ padding: "1rem" }}>{product.brand?.title || "N/A"}</td>
                                    <td style={{ padding: "1rem" }}>${product.price}</td>
                                    <td style={{ padding: "1rem" }}>{product.stock}</td>
                                    <td style={{ padding: "1rem" }}>
                                        <Link
                                            to={`/admin/edit-product/${product._id}`}
                                            className="btn btn-outline"
                                            style={{
                                                padding: "0.25rem 0.5rem",
                                                fontSize: "0.8rem",
                                                marginRight: "0.5rem",
                                                textDecoration: "none",
                                                display: "inline-block"
                                            }}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn btn-outline"
                                            style={{ padding: "0.25rem 0.5rem", fontSize: "0.8rem", borderColor: "red", color: "red" }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
