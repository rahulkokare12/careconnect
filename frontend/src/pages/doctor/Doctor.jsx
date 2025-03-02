import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Doctor.css";

const Doctor = () => {

  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from your Flask backend
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/doctors", {
        params: {specialty },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []); // Fetch doctors on page load

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

      <h1>All Doctors</h1>
      <div className="searchDoctor">
        
        <select
          id="specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">--Select Specialty--</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Oncologist">Oncologist</option>
          <option value="Dermatologist">Dermatologist</option>
        </select>
        <button id="searchBtn" onClick={fetchDoctors}>Search</button>
      </div>

      <div id="doctorContainer">
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <div key={index}>
              <h2>{doctor.fullname}</h2>
              <p><b>Specialty:</b> {doctor.specialty}</p>
              
            </div>
          ))
        ) : (
          <p>No doctors found. Try a different search!</p>
        )}
      </div>
    </div>
  );
};

export default Doctor;
