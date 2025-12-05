import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { cart, addToCart } = useContext(CartContext);
    const isInCart = cart.some((item) => item._id === product._id);
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="product-card">
            {/* Image Container with fixed height - clickable */}
            <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                <Link to={`/product/${product._id}`}>
                    {product.images && product.images[0] && (
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            style={{
                                width: "100%",
                                height: "100%", // Changed to 100% to fit the container
                                objectFit: "cover",
                                borderRadius: "8px",
                                marginBottom: "0.5rem"
                            }}
                        />
                    )}
                </Link>
            </div>
            <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{product.title}</h3>
            {product.brand && (
                <span style={{ fontSize: "0.8rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {product.brand.name}
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
