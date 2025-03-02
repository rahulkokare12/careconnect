import React from 'react';
import './homepage.css';
import {Link} from "react-router-dom"

const Homepage = () => {
    return (
        <div className="app-container">
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
            <div id="image">
                <img 
                    src="https://mobisoftinfotech.com/resources/wp-content/uploads/2018/07/Banner-1.png" 
                    alt="Hospital Image" 
                />
            </div>
        </div>
    );
};

export default Homepage;