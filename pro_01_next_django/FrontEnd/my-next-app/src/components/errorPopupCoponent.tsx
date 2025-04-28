import React, { useState, useEffect } from "react";

// Define the props for the Popup component
interface PopupProps {
  message: string | null; // The message to display
  onClose: () => void; // Function to close the popup
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  // Early return if there is no message to show
  if (!message) return null;

  return (
    <div
      className="popup-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        className="popup-container"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h5 style={{ color: "#d9534f", fontWeight: "bold" }}>Error</h5>
        <p style={{ color: "#333" }}>{message}</p>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#d9534f",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
