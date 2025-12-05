import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLayout = () => {
    // Authentication check removed for development
    // const navigate = useNavigate();
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate("/login");
    };

    // if (!userInfo || userInfo.role !== "admin") { ... } removed

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    Mini<span style={{ color: "var(--primary-color)" }}>mart</span>
                    <span style={{ fontSize: "0.8rem", display: "block", color: "#94a3b8" }}>Admin Panel</span>
                </div>
                <nav className="admin-nav">
                    <Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
                    <Link to="/admin/products" className="admin-nav-link">Products</Link>
                    <Link to="/admin/users" className="admin-nav-link">Users</Link>
                </nav>
                <div className="admin-footer">
                    <button onClick={handleLogout} className="btn btn-outline" style={{ width: "100%" }}>
                        Logout
                    </button>
                </div>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};



export default AdminLayout;
