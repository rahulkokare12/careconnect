import React from "react";

const SOSButton = () => {
  const handleSOS = () => {
    alert("🚨 Emergency Alert Sent! Help is on the way.");
    window.location.href = "tel:+919619109199"; // Replace with your emergency contact
  };

  return (
    <button
      onClick={handleSOS}
      style={{
        position: "fixed",
        bottom: "27px",
        left: "30px",
        width: "60px",
        height: "60px",
        borderRadius: "50%", // Makes it a circle
        backgroundColor: "#FF0000",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
     SOS
    </button>
  );
};

export default SOSButton;
