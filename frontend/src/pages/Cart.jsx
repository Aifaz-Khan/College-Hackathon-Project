import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, cartTotal } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="auth-container" style={{ flexDirection: "column", textAlign: "center" }}>
                <h2>Your cart is empty</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>Start Shopping</Link>
            </div>
        );
    }

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
            <h2 style={{ marginBottom: "2rem" }}>Shopping Cart ({cart.length} items)</h2>

            <div className="cart-list">
                {cart.map((item) => (
                    <div key={item._id} className="cart-item">
                        <div className="cart-item-info">
                            {item.images && item.images[0] && (
                                <img src={item.images[0]} alt={item.title} className="cart-item-img" />
                            )}
                            <div>
                                <h4 style={{ margin: 0 }}>{item.title}</h4>
                                <p style={{ margin: "0.25rem 0", color: "#94a3b8" }}>${item.price} x {item.qty}</p>
                            </div>
                        </div>
                        <div className="cart-item-actions">
                            <span style={{ fontWeight: "bold" }}>${item.price * item.qty}</span>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="btn btn-outline"
                                style={{ padding: "0.25rem 0.5rem", fontSize: "0.8rem", borderColor: "red", color: "red" }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h3>Total: ${cartTotal.toFixed(2)}</h3>
                <button className="btn btn-primary" style={{ fontSize: "1.1rem", padding: "0.75rem 2rem", marginTop: "1rem" }}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
