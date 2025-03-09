import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ampm, setAmPm] = useState("AM");
  const navigate = useNavigate();

  const patient = localStorage.getItem("user");
  const [patientId, setPatientId] = useState(() => {
    try {
      return patient ? JSON.parse(patient)?.id || "" : "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        alert("Failed to load doctor list. Please try again later.");
      });
  }, []);

  const handleBooking = () => {
    if (!selectedDoctor || !date || !time || !patientId) {
      alert("Please fill in all fields!");
      return;
    }

    const formattedTime = `${time} ${ampm}`;

    axios
      .post("http://localhost:5000/appointments", {
        doctor_id: selectedDoctor,
        patient_id: patientId,
        date: date,
        time: formattedTime,
      })
      .then((response) => {
        alert(response.data.message || "Appointment booked successfully!");
        setSelectedDoctor("");
        setDate("");
        setTime("");
        setAmPm("AM");
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        alert(
          error.response?.data?.error ||
            "Failed to book appointment. Please try again."
        );
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "auto",
        background: "linear-gradient(135deg,rgb(213, 151, 142),rgb(73, 184, 165))",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Book an Appointment 🩺</h1>

      <header style={{ marginBottom: "20px" }}>
        <nav className="navBar">
          <ul style={{ display: "flex", justifyContent: "space-around", padding: 0 }}>
            <li><Link to="/">🏠 Home</Link></li>
            <li><Link to="/appointmentList">📅 Appointments</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </header>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }}>👤 Patient ID:</label>
        <input
          type="text"
          disabled
          value={patientId}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "10px",
            border: "2px solid #007bff",
            background: "#fff",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }}>🩺 Select Doctor:</label>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          style={{ padding: "10px", width: "100%", borderRadius: "10px" }}
        >
          <option value="">-- Choose a Doctor --</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.fullname} - {doctor.specialty}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }}>📅 Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "10px", width: "100%", borderRadius: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }}>⏰ Select Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ padding: "10px", borderRadius: "10px", width: "500px", marginRight: "30px" }}
        />
        <select
          value={ampm}
          onChange={(e) => setAmPm(e.target.value)}
          style={{ padding: "10px", borderRadius: "10px", width: "100px" }}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      <button
        onClick={handleBooking}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          borderRadius: "10px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ✅ Book Appointment
      </button>
    </div>
  );
};

export default Appointment;
