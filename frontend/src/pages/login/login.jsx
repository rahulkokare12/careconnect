import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem("user",JSON.stringify(response.data))
        alert("Login successful!");
        navigate("/appointmentList")
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Doctor Patient Appointment Booking</h1>
      <header>
        <nav className="navBar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            
          </ul>
        </nav>
      </header>

      <h1>Login Page</h1>
      <div className="allDetailLogin">
        <form onSubmit={handleLogin} autoComplete="on">
          <input
            type="text"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;