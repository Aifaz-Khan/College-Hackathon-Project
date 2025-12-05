import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
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
                    Hackathon<span style={{ color: "var(--primary-color)" }}>App</span>
                </Link>
            </div>
            <div className="nav-links">
                {userInfo ? (
                    <>
                        <span style={{ alignSelf: "center", color: "#94a3b8" }}>
                            Hi, {userInfo.name}
                        </span>
                        <button onClick={handleLogout} className="btn btn-outline">
                            Logout
                        </button>
                    </>
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
            </div>
        </nav>
    );
};

export default Navbar;
