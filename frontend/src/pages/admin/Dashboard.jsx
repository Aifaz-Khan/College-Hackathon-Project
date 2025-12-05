const Dashboard = () => {
    return (
        <div>
            <h2 style={{ marginBottom: "2rem" }}>Admin Dashboard</h2>
            <div className="admin-stats-grid">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p className="stat-number">12</p>
                </div>
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p className="stat-number">5</p>
                </div>
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p className="stat-number">3</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
