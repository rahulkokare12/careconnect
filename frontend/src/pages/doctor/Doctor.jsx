import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Doctor = () => {
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("https://b1rjr3dw-5000.inc1.devtunnels.ms/doctors", {
        params: { specialty },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <motion.div
      className="doctor-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
        padding: "20px",
      }}
    >
      <motion.div
        className="doctor-card"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "25px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "800px",
          textAlign: "center",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <motion.h1
          style={{ color: "#007BFF", marginBottom: "30px" }}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Find Your Doctor 🩺
        </motion.h1>
        <nav className="navBar">
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "0",
              marginBottom: "30px",
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

        <h2>Select Specialty</h2>
        <div className="searchDoctor" style={{ marginBottom: "20px" }}>
          <select
            id="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            style={{ padding: "12px", borderRadius: "80px", border: "3px solid #ccc" }}
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
          </select>
          <motion.button
            id="searchBtn"
            onClick={fetchDoctors}
            style={{
              padding: "12px",
              background: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
            whileHover={{ scale: 1.1, background: "#0056b3" }}
            whileTap={{ scale: 0.9 }}
          >
            Search
          </motion.button>
        </div>

        <div id="doctorContainer">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <motion.div
                key={index}
                className="doctor-card-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                }}
              >
                <h2>{doctor.fullname}</h2>
                <p>
                  <b>Specialty:</b> {doctor.specialty}
                </p>
              </motion.div>
            ))
          ) : (
            <p>No doctors found for this specialty.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Doctor;
