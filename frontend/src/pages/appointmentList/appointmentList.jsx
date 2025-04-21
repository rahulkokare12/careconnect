import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PrescriptionModal = ({ isOpen, onClose, appointmentId }) => {
  const [prescription, setPrescription] = useState("");

  const handleSave = async () => {
    
    try {
      console.log(prescription)
      const response = await axios.post("https://b1rjr3dw-5000.inc1.devtunnels.ms/prescriptions", {
        appointmentId,
        prescriptionText:prescription,
      });
  
      if (response.status === 200) {
        alert("Prescription added successfully!");
      }
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert(error.response?.data?.detail || "Failed to save prescription");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2>Add Prescription</h2>
        <textarea
          placeholder="Enter prescription details..."
          style={{ width: "100%", height: "100px", marginBottom: "10px", borderRadius: '5px' }}
          value={prescription} 
          onChange={(e) => setPrescription(e.target.value)} 
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={onClose}
            style={{
              background: "#dc3545",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <button
            onClick={handleSave}
            style={{
              background: "#28a745",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
      parsedUser.role === "doctor" ? setDoctorId(parsedUser.id) : setPatientId(parsedUser.id);
    }
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      let queryParams = {};
      if (patientId) queryParams.patientId = patientId;
      if (doctorId) queryParams.doctorId = doctorId;

      const response = await axios.get("https://b1rjr3dw-5000.inc1.devtunnels.ms/appointmentList", { params: queryParams });
      const updatedAppointments = response.data.map((appointment) => {
        const meetData = appointment.meetLink
          ? { link: appointment.meetLink, code: appointment.meetCode }
          : generateMeetLink();
        return { ...appointment, ...meetData };
      });
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId || doctorId) fetchAppointments();
  }, [patientId, doctorId]);

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await axios.delete(`https://b1rjr3dw-5000.inc1.devtunnels.ms/delete-appointment/${appointmentId}`);
        fetchAppointments();
      } catch (error) {
        console.error("Error canceling appointment:", error);
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(false);

  const handlePrescription = (id) => {
    setSelectedAppointmentId(id);
    setIsModalOpen(true);
  };

  const filterAppointments = appointments.filter((appointment) =>
    appointment.patient_name.toLowerCase().includes(search.toLowerCase()) ||
    appointment.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
    appointment.date.includes(search)
  );

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto", marginBottom: "100px" }}>
      <header style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ textAlign: "center" }}>Appointments</h1>
        <nav className="navBar">
          <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointments">Book Appointment</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </header>

      <input
        type="text"
        placeholder="Search by patient, doctor, or date"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "15px", marginBottom: "20px", borderRadius: "5px" }}
      />

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading appointments...</p>
      ) : filterAppointments.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filterAppointments.map((appointment) => (
            <li key={appointment._id} style={{ padding: "20px", margin: "20px 0", border: "3px solid #53557c", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#f9f9f9" }}>
              <div>
                <h3>{appointment.patient_name} &rarr; {appointment.doctor_name}</h3>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p>
                  <strong>Meet Link:</strong>
                  <a href="https://meet.google.com/bhm-wazc-snn" target="_blank" rel="noopener noreferrer" style={{ marginLeft: "10px", color: "#007bff" }}>
                    Join Call
                  </a>
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {
                  doctorId ?
                    <button 
                      onClick={() => handlePrescription(appointment._id)}
                      style={{ background: "#007bff", color: "#fff", padding: "10px 15px", borderRadius: "5px", border: "none", cursor: "pointer", margin:"5px 0px" }}
                    >
                      Add Prescription
                    </button>
                  :
                  <div><b>Prescription :</b> {appointment.prescription? appointment.prescription : 'Will be added by doctor after appointment'}</div>
                }
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button 
                  onClick={() => handleCancel(appointment._id)}
                  style={{ background: "#e74c3c", color: "#fff", padding: "10px 15px", borderRadius: "5px", border: "none", cursor: "pointer" }}
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

    <PrescriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} appointmentId={selectedAppointmentId} />
    </div>
  );
};

export default AppointmentList;
