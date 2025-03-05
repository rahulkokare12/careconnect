import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const generateMeetLink = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return {
      link: `https://meet.google.com/${randomString}`,
      code: randomString,
    };
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === "doctor") {
        setDoctorId(parsedUser.id);
      } else {
        setPatientId(parsedUser.id);
      }
    }
  }, []);

  const fetchAppointments = async () => {
    try {
      let queryParams = {};
      if (patientId) queryParams.patientId = patientId;
      if (doctorId) queryParams.doctorId = doctorId;

      const response = await axios.get(
        "http://localhost:5000/appointmentList",
        { params: queryParams }
      );
      const updatedAppointments = response.data.map((appointment) => {
        const meetData = appointment.meetLink
          ? { link: appointment.meetLink, code: appointment.meetCode }
          : generateMeetLink();
        return { ...appointment, ...meetData };
      });
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (patientId || doctorId) {
      fetchAppointments();
    }
  }, [patientId, doctorId]);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      fetchAppointments();
    }
  };

  const handleReschedule = async (id, newDate, newTime) => {
    await axios.put(`http://localhost:5000/appointments/${id}`, {
      date: newDate,
      time: newTime,
    });
    fetchAppointments();
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Appointments
      </h1>

      <header>
        <nav className="navBar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/appointments">Book Appointment</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>

      <h2 style={{ textAlign: "center", marginTop: "30px" }}>
        Appointment List
      </h2>
      <hr />

      {appointments.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {appointments.map((appointment) => (
            <li
              key={appointment._id}
              style={{
                position: "relative",
                padding: "20px",
                margin: "20px 0",
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 6px 12px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div>
                <p>
                  <strong>Patient Name:</strong> {appointment.patient_name}
                </p>
                <p>
                  <strong>Doctor Name:</strong> {appointment.doctor_name}
                </p>
                <p>
                  <strong>Date:</strong> {appointment.date}
                </p>
                <p>
                  <strong>Time:</strong> {appointment.time}
                </p>
                <p>
  <strong>Meet Link:</strong>
  <a
    href={`https://meet.google.com/new`}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#007bff", textDecoration: "none" }}
  >
    Start Video Call
  </a>
</p>


                <p>
                  <strong>Meeting Code:</strong> {appointment.code}
                </p>
              </div>
              <div
                className="action-buttons"
                style={{ display: "flex", gap: "10px" }}
              >
                <button
                  className="reschedule-btn"
                  onClick={() =>
                    handleReschedule(appointment._id, "2025-03-05", "10:00")
                  }
                >
                  Reschedule
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(appointment._id)}
                >
                  Cancel  
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center" }}>No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentList;
