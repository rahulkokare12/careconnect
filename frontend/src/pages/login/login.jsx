import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://b1rjr3dw-5000.inc1.devtunnels.ms/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        alert("Login successful!");
        navigate("/appointmentList");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
        padding: "50px",
      }}
    >
      <motion.div
        className="login-card"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "25px",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <motion.h1
          style={{ color: "#007BFF", marginBottom: "15px" }}
          initial={{ y: -20 }}
          animate={{ y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Welcome Back! 👋
        </motion.h1>
        <nav className="navBar">
          <ul style={{ display: "flex", justifyContent: "space-around", padding: "0", marginBottom: "20px" }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
          </ul>
        </nav>

        <form onSubmit={handleLogin} autoComplete="on" style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
          <motion.input
            type="text"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "12px", borderRadius: "80px", border: "5px solid #ccc" }}
            whileFocus={{ scale: 1.05, borderColor: "#007bff" }}
          />
          <motion.input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "12px", borderRadius: "80px", border: "5px solid #ccc" }}
            whileFocus={{ scale: 1.05, borderColor: "#007bff" }}
          />
          <motion.input
            type="submit"
            value="Login"
            style={{ padding: "12px", background: "#007BFF", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
            whileHover={{ scale: 1.1, background: "#0056b3" }}
            whileTap={{ scale: 0.9 }}
          />
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
