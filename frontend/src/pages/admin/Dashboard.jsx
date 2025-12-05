import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalOrders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axiosClient.get("/api/stats");
                setStats(data);
            } catch (err) {
                console.error("Failed to fetch stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: "2rem" }}>Admin Dashboard</h2>
            {loading ? (
                <p>Loading stats...</p>
            ) : (
                <div className="admin-stats-grid">
                    <div className="stat-card">
                        <h3>Total Products</h3>
                        <p className="stat-number">{stats.totalProducts}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <p className="stat-number">{stats.totalUsers}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Orders</h3>
                        <p className="stat-number">{stats.totalOrders}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
