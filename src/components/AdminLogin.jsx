import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css"; // optional: for styling

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const user = res.data.user;

      if (user.role === "admin") {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", res.data.token);
        navigate("/admin-dashboard");
      } else {
        setError("Not an admin account.");
      }
    } catch (err) {
      // Fallback: Dummy login for development/testing
      const dummyAdmin = email === "admin@coderank.com" && password === "admin123";

      if (dummyAdmin) {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
        navigate("/admin-dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
