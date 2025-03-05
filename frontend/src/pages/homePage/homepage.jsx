import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './homepage.css';

const Homepage = () => {
    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
                padding: "20px",
            }}
        >
            <motion.div
                className="home-card"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                style={{
                    background: "#ffffff",
                    padding: "30px",
                    borderRadius: "25px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                    width: "100%",
                    maxWidth: "800px",
                    textAlign: "center",
                }}
            >
                <motion.h1
                    style={{ color: "#007BFF", marginBottom: "20px" }}
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Welcome to CareConnect👩‍⚕️
                </motion.h1>
                <nav className="navBar">
                    <ul style={{ display: "flex", justifyContent: "space-around", padding: "0", marginBottom: "20px" }}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/doctors">Doctors</Link></li>
                    </ul>
                </nav>
                
                <motion.div 
                    id="image" 
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <img 
                        src="https://mobisoftinfotech.com/resources/wp-content/uploads/2018/07/Banner-1.png" 
                        alt="Hospital Image" 
                        className="rounded-lg shadow-lg w-full max-w-4xl hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Homepage;
