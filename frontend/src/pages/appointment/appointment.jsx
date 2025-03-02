import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const patient = localStorage.getItem("user")
    const [patientId, setPatientId] = useState(JSON.parse(patient).id); 

    useEffect(() => {
        axios.get("http://localhost:5000/doctors")
            .then((response) => {
                setDoctors(response.data);
            })
            .catch((error) => {
                console.error("Error fetching doctors:", error);
            });
    }, []);

    const handleBooking = () => {
        if (!selectedDoctor || !date || !time || !patientId) {
            alert("Please fill in all fields!");
            return;
        }

        axios.post("http://localhost:5000/appointments", {
            doctor_id: selectedDoctor,
            patient_id: patientId,
            date: date,
            time: time,
        })
            .then((response) => {
                alert(response.data.message);
                setSelectedDoctor("");
                setDate("");
                setTime("");
            })
            .catch((error) => {
                console.error("Error booking appointment:", error);
                alert(error.response?.data?.error || "Failed to book appointment");
            });
    };

    const handleLogout = (navigate) => {
        localStorage.removeItem("user"); // Clear user data
        navigate("/"); // Redirect to home page
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
            <h1>Book an Appointment</h1>

            <header>
                <nav className="navBar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/appointmentList">Appointments</Link></li>
                    <li onClick={handleLogout} style={{"display": "block","padding":"10px 30px","color": "lightcoral"}}>Logout</li>
                    
                </ul>
                </nav>
            </header>

            <div style={{ marginBottom: "20px" }}>
                <label>Patient ID: </label>
                <input 
                    type="text" 
                    disabled
                    value={patientId} 
                    onChange={(e) => setPatientId(e.target.value)} 
                    placeholder="Enter your patient ID" 
                    style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
                />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label>Select Doctor: </label>
                <select 
                    value={selectedDoctor} 
                    onChange={(e) => setSelectedDoctor(e.target.value)} 
                    style={{ padding: "10px", width: "100%" }}
                >
                    <option value="">-- Choose a Doctor --</option>
                    {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                            {doctor.fullname} - {doctor.specialty}
                            {/* {doctor._id} */}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label>Select Date: </label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    style={{ padding: "10px", width: "100%" }}
                />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label>Select Time: </label>
                <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    style={{ padding: "10px", width: "100%" }}
                />
            </div>

            <button
                onClick={handleBooking} 
                style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}
            >
                Book Appointment
            </button>
        </div>
    );
};

export default Appointment;
