import { useContext } from "react";
import CartContext from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { cart, addToCart } = useContext(CartContext);
    const isInCart = cart.some((item) => item._id === product._id);

    return (
        <div className="product-card" style={{
            background: "#1e293b",
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
        }}>
            {product.images && product.images[0] && (
                <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "0.5rem"
                    }}
                />
            )}
            <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{product.title}</h3>
            {product.brand && (
                <span style={{ fontSize: "0.8rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {product.brand.title}
                </span>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "1rem" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#60a5fa" }}>${product.price}</span>
                <button
                    onClick={() => addToCart(product)}
                    className={`btn ${isInCart ? "btn-outline" : "btn-primary"}`}
                    disabled={isInCart}
                >
                    {isInCart ? "Added" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
