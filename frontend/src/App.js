import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/homepage.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Doctor from "./pages/doctor/Doctor.jsx";
import Appointment from "./pages/appointment/appointment.jsx";
import AppointmentList from "./pages/appointmentList/appointmentList.jsx";
import Logout from "./pages/logout.jsx";
import WhatsAppButton from "./components/Whatsapp.jsx";
import SOSButton from "./components/SOSButton.jsx";

function App() {
  return (
    <Router>
      <div>
        <SOSButton></SOSButton>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/appointmentList" element={<AppointmentList />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
