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
      }}
    >
      <h1>Book an Appointment</h1>

      <header>
        <nav className="navBar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/appointmentList">Appointments</Link>
            </li>
            <li
              onClick={handleLogout}
              style={{
                display: "block",
                padding: "2px 30px",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                color: "white",
                cursor: "pointer",
                border: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                borderRadius: "20px",
                boxShadow: "0 2px 5px rgba(249, 249, 249, 0.1)",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Logout
            </li>
          </ul>
        </nav>
      </header>
      <br></br>

      <div style={{ marginBottom: "15px", position: "relative" }}>
        <label>Patient ID: </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            disabled
            value={patientId}
            placeholder="Your Patient ID"
            style={{
              padding: "10px",
              width: "100%",
              marginBottom: "10px",
              borderRadius: "10px",
              border: "2px solid #007bff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(patientId);
              alert("Patient ID copied to clipboard!");
            }}
            style={{
              marginLeft: "5px",
              right: "10px",
              padding: "4px",
              top: "20%",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "100px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            Copy
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "20px", position: "relative" }}>
        <label style={{ fontSize: "1.2em", fontWeight: "bold" }}>
          Select Doctor:{" "}
        </label>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            border: "2px solidrgb(19, 35, 106)",
            background: "linear-gradient(135deg, #82c3c5,rgb(163, 179, 234))",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            outline: "none",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <option value="">-- Choose a Doctor --</option>
          {doctors.map((doctor) => (
            <option
              key={doctor._id}
              value={doctor._id}
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                color: "#001F40",
                fontWeight: "bold",
                transition: "background 0.3s ease",
              }}
            >
              {doctor.fullname} - {doctor.specialty} 🩺
            </option>
          ))}
        </select>

        <div
          style={{
            position: "absolute",
            top: "62%",
            right: "20px",
            transform: "translateY(-50%)",
            animation: "spin 2s linear infinite",
          }}
        >
          🩺
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}
        >
          📅 Select Date:{" "}
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "10px",
            border: "2px solid #007bff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(135deg, #f3f3f3, #ffffff)",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%) rotate(0deg)",
            animation: "spin 10s linear infinite",
          }}
        ></div>
      </div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >

        
        <div style={{ marginBottom: "20px", position: "relative" }}>
          <label style={{ fontSize: "1.2em", fontWeight: "bold" }}>
            Select Time:{" "}
          </label>
          <div style={{ position: "relative", marginTop: "10px" }}>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                padding: "10px",
                width: "600x%",
                borderRadius: "10px",            
                border: "2px solid #007bff",
                boxShadow: "0 2px 10px rgba(43, 48, 100, 0.14)",
                fontSize: "1em",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#ff6b6b";
                e.target.style.boxShadow = "0 0 15px rgba(65, 60, 118, 0.5)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 2px 10px rgba(0, 123, 255, 0.2)";
              }}
            />
            <div
              
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(0, 123, 255, 0.3)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(0, 123, 255, 0.1)")
              }
            ></div>
          </div>
        </div>

        

        <div style={{ position: "relative", display: "inline-block" }}>
          <select
            value={ampm}
            onChange={(e) => setAmPm(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "100px",
              border: "2px solid #007bff",
              backgroundColor: "#fff",
              color: "#007bff",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <option value="AM">🔆 AM</option>
            <option value="PM">🌛 PM</option>
          </select>
          <div
            style={{
              position: "absolute",
              top: "500%",
              right: "-25px",
              transform: "translateY(-50%)",
              animation: "bounce 1.5s infinite",
            }}
          ></div>
        </div>
      </div>



      <button
        onClick={handleBooking}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "10px",
          fontWeight: "bold",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s, box-shadow 0.2s",
          animation: "pulse 2s infinite",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        }}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1.05)")}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default Appointment;  
