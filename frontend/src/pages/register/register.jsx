import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    userType: "",
    fullName: "",
    email: "",
    password: "",
    specialty: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/register",
        formData
      );
      if (response.data.message === "success") {
        alert("Registration successful");
      } else {
        alert("Registration failed. Please try again");
      }
    } catch (error) {
      alert("Registration failed. Please try again");
    }
  };

  return (
    <motion.div
      className="register-container"
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
        className="register-card"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#FF6B6B", marginBottom: "20px" }}>
          Register for Appointment
        </h1>
        <nav className="navBar">
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "0",
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/doctors">Doctors</Link>
            </li>
          </ul>
        </nav>

        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <motion.select
            id="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.05 }}
            style={{
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "80 px",
            }}
          >
            <option value="">Register as...</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </motion.select>
          {formData.userType === "doctor" && (
            <motion.select
              id="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.05 }}
              style={{
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "80px",
              }}
            >
              <option value="">--Select Specialty--</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Oncologist">Oncologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Radiologist">Radiologist</option>
              <option value="Endocrinologist">Endocrinologist</option>
              <option value="Allergist">Allergist</option>
              <option value="Dentist">Dentist</option>
              <option value="Geriatrician">Geriatrician</option>
            </motion.select>
          )}
          <motion.input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "60px",
              border: "5px solid #ccc",
            }}
            whileFocus={{ scale: 1.05, borderColor: "#007bff" }}
          />
          <motion.input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "60px",
              border: "5px solid #ccc",
            }}
            whileFocus={{ scale: 1.05, borderColor: "#007bff" }}
          />
          <motion.input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "60px",
              border: "5px solid #ccc",
            }}
            whileFocus={{ scale: 1.05, borderColor: "#007bff" }}
          />
          <motion.input
            type="submit"
            value="Register"
            style={{
              padding: "10px",
              background: "#FF6B6B",
              color: "#fff",
              border: "none",
              borderRadius: "80px",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.1, background: "#FF4757" }}
            whileTap={{ scale: 0.9 }}
          />
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Register;
