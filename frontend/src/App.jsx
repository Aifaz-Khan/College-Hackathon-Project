import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Simple Home Page Component
const Home = () => {
  return (
    <div className="auth-container" style={{ flexDirection: 'column', textAlign: 'center' }}>
      <h1>Welcome to the Hackathon Project!</h1>
      <p style={{ maxWidth: '600px', margin: '0 auto', color: '#94a3b8' }}>
        This is a premium-styled application built with React and Node.js.
        <br />
        Please login or register to continue.
      </p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;