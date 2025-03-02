import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    const response = await axios.post("http://127.0.0.1:5000/register",formData)
    console.log(response.data.message)
    if(response.data.message==="success"){
      alert("Registration successful")
    }
    else{
      alert("Registration failed. Please try again")
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

      <h1>Register Page</h1>
      <div className="allDetailRegister">
        <form onSubmit={handleSubmit} autoComplete="on">
          <select
            id="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="">Register as...</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>

          {formData.userType === "doctor" && (
            <div>
              <select
                id="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
              >
                <option value="">Select Specialty</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="General Physician">General Physician</option>
              </select>
            </div>
          )}

          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default Register;