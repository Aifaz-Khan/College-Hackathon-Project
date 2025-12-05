import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // Auth check removed for testing
        // if (!userInfo) {
        //   navigate("/login");
        // } else {
        //   setUser(userInfo);
        // }

        // Mock user if not logged in
        setUser(userInfo || {
            name: "Test User",
            email: "test@example.com",
            role: "user"
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate("/login");
    };

    if (!user) return null;

    // Get initials for avatar
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div style={{ padding: "4rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
            <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>

                {/* Profile Avatar */}
                <div style={{
                    width: "100px",
                    height: "100px",
                    background: "linear-gradient(135deg, var(--primary-color), var(--accent-color))",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "white",
                    margin: "0 auto 2rem auto",
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                }}>
                    {getInitials(user.name)}
                </div>

                <h2 style={{ marginBottom: "0.5rem" }}>{user.name}</h2>
                <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>{user.email}</p>

                <div style={{ textAlign: "left", background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem" }}>
                    <p style={{ margin: "0.5rem 0" }}><strong>Role:</strong> <span style={{ textTransform: "capitalize" }}>{user.role}</span></p>
                    <p style={{ margin: "0.5rem 0" }}><strong>Member Since:</strong> {new Date().toLocaleDateString()} (Placeholder)</p>
                </div>

                <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor: "red", color: "red", width: "100%" }}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
