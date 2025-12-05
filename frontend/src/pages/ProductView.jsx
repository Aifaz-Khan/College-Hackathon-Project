import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import CartContext from "../context/CartContext";

const ProductView = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");

    const { cart, addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axiosClient.get(`/api/products/${id}`);
                setProduct(data);
                if (data.images && data.images.length > 0) {
                    setMainImage(data.images[0]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div style={{ padding: "4rem", textAlign: "center" }}>Loading...</div>;
    if (!product) return <div style={{ padding: "4rem", textAlign: "center" }}>Product not found</div>;

    const isInCart = cart.some((item) => item._id === product._id);

    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", color: "var(--text-color)" }}>
            <Link to="/" style={{ display: "inline-block", marginBottom: "2rem", color: "#94a3b8" }}>&larr; Back to Products</Link>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>
                {/* Left: Images */}
                <div className="product-gallery">
                    <div style={{
                        height: "400px",
                        background: "#1e293b",
                        borderRadius: "12px",
                        overflow: "hidden",
                        marginBottom: "1rem",
                        border: "1px solid rgba(255,255,255,0.1)"
                    }}>
                        <img
                            src={mainImage || "https://via.placeholder.com/400"}
                            alt={product.title}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                    </div>
                    {product.images && product.images.length > 1 && (
                        <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
                            {product.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${product.title} ${idx}`}
                                    onClick={() => setMainImage(img)}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        border: mainImage === img ? "2px solid var(--primary-color)" : "1px solid rgba(255,255,255,0.1)",
                                        opacity: mainImage === img ? 1 : 0.6
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Details */}
                <div className="product-details">
                    {product.brand && (
                        <span style={{
                            color: "var(--primary-color)",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            fontSize: "0.9rem",
                            fontWeight: "bold"
                        }}>
                            {product.brand.name || product.brand}
                        </span>
                    )}
                    <h1 style={{ fontSize: "2.5rem", margin: "0.5rem 0 1rem 0" }}>{product.title}</h1>

                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#60a5fa", marginBottom: "1.5rem" }}>
                        ${product.price}
                    </div>

                    <div style={{ marginBottom: "2rem", lineHeight: "1.6", color: "#cbd5e1" }}>
                        {product.description}
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <p style={{ margin: "0.5rem 0" }}><strong>Category:</strong> {product.category}</p>
                        <p style={{ margin: "0.5rem 0" }}>
                            <strong>Availability:</strong>
                            <span style={{ color: product.stock > 0 ? "#4ade80" : "#f87171", marginLeft: "0.5rem" }}>
                                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                            </span>
                        </p>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className={`btn ${isInCart ? "btn-outline" : "btn-primary"}`}
                        style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}
                        disabled={isInCart || product.stock <= 0}
                    >
                        {isInCart ? "In Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
