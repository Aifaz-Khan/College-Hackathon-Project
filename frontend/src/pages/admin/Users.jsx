import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get("/api/allusers");
            setUsers(data.users || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: "2rem" }}>Manage Users</h2>

            {error && (
                <div style={{ color: "#f87171", marginBottom: "1rem" }}>{error}</div>
            )}

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", color: "#e2e8f0" }}>
                        <thead>
                            <tr style={{ textAlign: "left", background: "#1e293b" }}>
                                <th style={{ padding: "1rem" }}>Name</th>
                                <th style={{ padding: "1rem" }}>Email</th>
                                <th style={{ padding: "1rem" }}>Role</th>
                                <th style={{ padding: "1rem" }}>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    <td style={{ padding: "1rem" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                            <div style={{
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                background: "var(--primary-color)",
                                                color: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "0.8rem",
                                                fontWeight: "bold"
                                            }}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            {user.name}
                                        </div>
                                    </td>
                                    <td style={{ padding: "1rem" }}>{user.email}</td>
                                    <td style={{ padding: "1rem" }}>
                                        <span style={{
                                            padding: "0.25rem 0.5rem",
                                            borderRadius: "4px",
                                            background: user.role === "admin" ? "rgba(244, 63, 94, 0.2)" : "rgba(59, 130, 246, 0.2)",
                                            color: user.role === "admin" ? "#fb7185" : "#60a5fa",
                                            fontSize: "0.85rem",
                                            textTransform: "capitalize"
                                        }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: "1rem", color: "#94a3b8" }}>
                                        {new Date(user.createdAt).toLocaleDateString()}
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

export default AdminUsers;
