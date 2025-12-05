import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [formAppear, setFormAppear] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setFormAppear(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { data } = await axiosClient.post("/api/login", {
                email,
                password,
            });

            // Save token and user info
            localStorage.setItem("token", data.token);
            localStorage.setItem("userInfo", JSON.stringify(data));

            if (data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed. Please try again."
            );
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Welcome Back</h2>
                {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                        Sign In
                    </button>
                </form>
                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
