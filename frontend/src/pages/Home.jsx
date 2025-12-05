import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchProducts = async (searchTerm = "") => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get(`/api/products?search=${searchTerm}`);
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts(search);
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "1rem", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem auto" }}>
                <input
                    type="text"
                    placeholder="Search for products or brands..."
                    className="form-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {loading ? (
                <p style={{ textAlign: "center" }}>Loading products...</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}

            {!loading && products.length === 0 && (
                <p style={{ textAlign: "center", color: "#94a3b8" }}>No products found.</p>
            )}
        </div>
    );
};

export default Home;
