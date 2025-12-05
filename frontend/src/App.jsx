import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminUsers from "./pages/admin/Users";

function App() {
  return (

    <Router>
      <CartProvider>
        <Routes>
          {/* Public Routes with Navbar */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/product/:id" element={<><Navbar /><ProductView /></>} />
          <Route path="/cart" element={<><Navbar /><Cart /></>} />
          <Route path="/profile" element={<><Navbar /><Profile /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/register" element={<><Navbar /><Register /></>} />

          {/* Admin Routes (Sidebar Layout) */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Redirect /admin to /admin/dashboard */}
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;