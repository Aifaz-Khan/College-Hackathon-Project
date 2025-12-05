import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>
                    Mini<span style={{ color: "var(--primary-color)" }}>mart</span>
                </Link>
            </div>
            <div className="nav-links">
                {userInfo ? (
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <div style={{
                            width: "40px",
                            height: "40px",
                            background: "linear-gradient(135deg, var(--primary-color), var(--accent-color))",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            color: "white",
                            cursor: "pointer",
                            title: userInfo.name
                        }}>
                            {userInfo.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)}
                        </div>
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="btn">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-primary">
                            Register
                        </Link>
                    </>
                )}
                <Link to="/cart" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    Cart <span style={{ background: "var(--primary-color)", padding: "0.1rem 0.5rem", borderRadius: "10px", fontSize: "0.8rem", color: "white" }}>{cart.length}</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
