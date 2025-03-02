import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");

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
    }, []); // Run only once on component mount

    // Fetch appointments
    const fetchAppointments = async () => {
        try {
            let queryParams = {};
            if (patientId) queryParams.patientId = patientId;
            if (doctorId) queryParams.doctorId = doctorId;

            const response = await axios.get("http://localhost:5000/appointmentList", { params: queryParams });
            setAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    // Fetch appointments whenever patientId or doctorId changes
    useEffect(() => {
        if (patientId || doctorId) {
            fetchAppointments();
        }
    }, [patientId, doctorId]);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Appointments</h1>

            <header>
                <nav className="navBar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/appointments">Book Appointment</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                    
                </ul>
                </nav>
            </header>

            <h2 style={{"textAlign":"center", marginTop:"20px", marginTop:"20px"}}>Appointment List</h2>
            <hr/>
            {appointments.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {appointments.map((appointment) => (
                        <>
                            <li key={appointment._id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                                <p><strong>Patient Name:</strong> {appointment.patient_name}</p>
                                <p><strong>Doctor Name:</strong> {appointment.doctor_name}</p>
                                <p><strong>Date:</strong> {(appointment.date)}</p>
                                <p><strong>Time:</strong> {(appointment.time)}</p>
                                
                            </li>
                            <hr/>
                        </>
                    ))}
                </ul>
            ) : (
                <p style={{"textAlign":"center"}}>No appointments found.</p>
            )}
        </div>
    );
};

export default AppointmentList;
